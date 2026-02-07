interface Env {
  WEB3FORMS_ACCESS_KEY: string;
}

interface ContactPayload {
  type: "contact";
  name: string;
  email: string;
  phone?: string;
  message: string;
  "h-captcha-response": string;
}

interface IntakePayload {
  type: "intake";
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  preferredContact?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  services: string[];
  timeline?: string;
  budget?: string;
  referralSource?: string;
  additionalInfo?: string;
  "h-captcha-response": string;
}

type SubmitPayload = ContactPayload | IntakePayload;

function sanitize(value: string, maxLength: number): string {
  return value.trim().slice(0, maxLength);
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "content-type",
    "Content-Type": "application/json",
  };

  try {
    const payload: SubmitPayload = await context.request.json();
    const captchaToken = payload["h-captcha-response"];

    if (!captchaToken || typeof captchaToken !== "string") {
      return new Response(JSON.stringify({ success: false, message: "Captcha required" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const formData = new FormData();
    formData.append("access_key", context.env.WEB3FORMS_ACCESS_KEY);
    formData.append("h-captcha-response", captchaToken);

    if (payload.type === "contact") {
      const name = sanitize(payload.name || "", 100);
      const email = sanitize(payload.email || "", 255);
      const message = sanitize(payload.message || "", 2000);
      const phone = sanitize(payload.phone || "", 30);

      if (!name || !email || !message) {
        return new Response(JSON.stringify({ success: false, message: "Name, email, and message are required" }), {
          status: 400,
          headers: corsHeaders,
        });
      }
      if (!validateEmail(email)) {
        return new Response(JSON.stringify({ success: false, message: "Invalid email address" }), {
          status: 400,
          headers: corsHeaders,
        });
      }

      formData.append("subject", `Quick Inquiry from ${name}`);
      formData.append("from_name", name);
      formData.append("replyto", email);
      formData.append("Name", name);
      formData.append("Email", email);
      formData.append("Phone", phone || "Not provided");
      formData.append("Message", message);
    } else if (payload.type === "intake") {
      const firstName = sanitize(payload.firstName || "", 100);
      const lastName = sanitize(payload.lastName || "", 100);
      const email = sanitize(payload.email || "", 255);

      if (!firstName || !lastName || !email) {
        return new Response(JSON.stringify({ success: false, message: "First name, last name, and email are required" }), {
          status: 400,
          headers: corsHeaders,
        });
      }
      if (!validateEmail(email)) {
        return new Response(JSON.stringify({ success: false, message: "Invalid email address" }), {
          status: 400,
          headers: corsHeaders,
        });
      }

      formData.append("subject", `New Client Intake: ${firstName} ${lastName}`);
      formData.append("from_name", `${firstName} ${lastName}`);
      formData.append("replyto", email);
      formData.append("First Name", firstName);
      formData.append("Last Name", lastName);
      formData.append("Email", email);
      formData.append("Phone", sanitize(payload.phone || "", 30) || "Not provided");
      formData.append("Preferred Contact", sanitize(payload.preferredContact || "email", 50));
      formData.append("Address", sanitize(payload.address || "", 200) || "Not provided");
      formData.append("City", sanitize(payload.city || "", 100) || "Not provided");
      formData.append("State", sanitize(payload.state || "", 50) || "Not provided");
      formData.append("ZIP", sanitize(payload.zip || "", 20) || "Not provided");
      formData.append("Services Requested", (payload.services || []).map(s => sanitize(s, 100)).join(", "));
      formData.append("Timeline", sanitize(payload.timeline || "", 100) || "Not specified");
      formData.append("Budget Range", sanitize(payload.budget || "", 100) || "Not specified");
      formData.append("Referral Source", sanitize(payload.referralSource || "", 100) || "Not specified");
      formData.append("Additional Information", sanitize(payload.additionalInfo || "", 2000) || "None provided");
    } else {
      return new Response(JSON.stringify({ success: false, message: "Invalid form type" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.text();
    return new Response(data, {
      status: response.status,
      headers: corsHeaders,
    });
  } catch {
    return new Response(JSON.stringify({ success: false, message: "Server error" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "content-type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
    },
  });
};
