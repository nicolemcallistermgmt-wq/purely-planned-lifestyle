interface Env {
  WEB3FORMS_ACCESS_KEY: string;
}

interface IntakePayload {
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
  // Honeypot field — should be empty
  website?: string;
}

const ALLOWED_SERVICES = [
  "Lifestyle Consulting",
  "Home Organizing",
  "Concierge Services",
  "Snow Bird Services",
  "Relocation Assistance",
  "Event Hospitality",
  "Move Management",
  "Downsizing",
];

function sanitize(str: string, maxLen: number): string {
  return str.replace(/<[^>]*>/g, "").trim().slice(0, maxLen);
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255;
}

function validatePhone(phone: string): boolean {
  if (!phone) return true;
  return /^[\d\s()\-+.]{0,30}$/.test(phone);
}

function validateZip(zip: string): boolean {
  if (!zip) return true;
  return /^[\dA-Za-z\s\-]{0,15}$/.test(zip);
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  try {
    const data: IntakePayload = await request.json();

    // Honeypot check — bots fill this hidden field
    if (data.website) {
      // Pretend success to not tip off the bot
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }

    // Required field validation
    const firstName = sanitize(data.firstName || "", 100);
    const lastName = sanitize(data.lastName || "", 100);
    const email = (data.email || "").trim().slice(0, 255);

    if (!firstName || !lastName || !email) {
      return new Response(
        JSON.stringify({ success: false, message: "Name and email are required." }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (!validateEmail(email)) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid email address." }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (!validatePhone(data.phone || "")) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid phone number." }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (!validateZip(data.zip || "")) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid ZIP code." }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate services
    const services = (data.services || []).filter((s) => ALLOWED_SERVICES.includes(s));
    if (services.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "At least one service is required." }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Build the submission
    const submission = {
      access_key: env.WEB3FORMS_ACCESS_KEY,
      subject: `New Client Intake: ${firstName} ${lastName}`,
      from_name: `${firstName} ${lastName}`,
      replyto: email,
      // Structured body
      "First Name": firstName,
      "Last Name": lastName,
      Email: email,
      Phone: sanitize(data.phone || "", 30) || "Not provided",
      "Preferred Contact": sanitize(data.preferredContact || "email", 20),
      Address: sanitize(data.address || "", 200) || "Not provided",
      City: sanitize(data.city || "", 100) || "Not provided",
      State: sanitize(data.state || "", 50) || "Not provided",
      ZIP: sanitize(data.zip || "", 15) || "Not provided",
      "Services Requested": services.join(", "),
      Timeline: sanitize(data.timeline || "", 50) || "Not specified",
      "Budget Range": sanitize(data.budget || "", 50) || "Not specified",
      "Referral Source": sanitize(data.referralSource || "", 200) || "Not specified",
      "Additional Information": sanitize(data.additionalInfo || "", 2000) || "None provided",
    };

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
    });

    const result = await response.json();

    return new Response(JSON.stringify(result), {
      status: response.ok ? 200 : 500,
      headers: corsHeaders,
    });
  } catch {
    return new Response(
      JSON.stringify({ success: false, message: "Server error. Please try again." }),
      { status: 500, headers: corsHeaders }
    );
  }
};
