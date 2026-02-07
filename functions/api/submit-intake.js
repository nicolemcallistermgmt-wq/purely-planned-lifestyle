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

function sanitize(str, maxLen) {
  return String(str || "").replace(/<[^>]*>/g, "").trim().slice(0, maxLen);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255;
}

function validatePhone(phone) {
  if (!phone) return true;
  return /^[\d\s()\-+.]{0,30}$/.test(phone);
}

function validateZip(zip) {
  if (!zip) return true;
  return /^[\dA-Za-z\s\-]{0,15}$/.test(zip);
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  // Debug: check if access key is configured
  if (!env.WEB3FORMS_ACCESS_KEY) {
    console.error("WEB3FORMS_ACCESS_KEY is not set in environment variables");
    return jsonResponse({ success: false, message: "Server configuration error." }, 500);
  }

  try {
    const data = await request.json();

    // Honeypot check
    if (data.website) {
      return jsonResponse({ success: true });
    }

    const firstName = sanitize(data.firstName, 100);
    const lastName = sanitize(data.lastName, 100);
    const email = String(data.email || "").trim().slice(0, 255);

    if (!firstName || !lastName || !email) {
      return jsonResponse({ success: false, message: "Name and email are required." }, 400);
    }

    if (!validateEmail(email)) {
      return jsonResponse({ success: false, message: "Invalid email address." }, 400);
    }

    if (!validatePhone(data.phone || "")) {
      return jsonResponse({ success: false, message: "Invalid phone number." }, 400);
    }

    if (!validateZip(data.zip || "")) {
      return jsonResponse({ success: false, message: "Invalid ZIP code." }, 400);
    }

    const services = (data.services || []).filter((s) => ALLOWED_SERVICES.includes(s));
    if (services.length === 0) {
      return jsonResponse({ success: false, message: "At least one service is required." }, 400);
    }

    // Use FormData format (Web3Forms primary format)
    const formData = new FormData();
    formData.append("access_key", env.WEB3FORMS_ACCESS_KEY);
    formData.append("subject", `New Client Intake: ${firstName} ${lastName}`);
    formData.append("from_name", `${firstName} ${lastName}`);
    formData.append("replyto", email);
    formData.append("First Name", firstName);
    formData.append("Last Name", lastName);
    formData.append("Email", email);
    formData.append("Phone", sanitize(data.phone, 30) || "Not provided");
    formData.append("Preferred Contact", sanitize(data.preferredContact || "email", 20));
    formData.append("Address", sanitize(data.address, 200) || "Not provided");
    formData.append("City", sanitize(data.city, 100) || "Not provided");
    formData.append("State", sanitize(data.state, 50) || "Not provided");
    formData.append("ZIP", sanitize(data.zip, 15) || "Not provided");
    formData.append("Services Requested", services.join(", "));
    formData.append("Timeline", sanitize(data.timeline, 50) || "Not specified");
    formData.append("Budget Range", sanitize(data.budget, 50) || "Not specified");
    formData.append("Referral Source", sanitize(data.referralSource, 200) || "Not specified");
    formData.append("Additional Information", sanitize(data.additionalInfo, 2000) || "None provided");

    console.log("Using access key starting with:", env.WEB3FORMS_ACCESS_KEY?.substring(0, 8) + "...");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const responseData = await response.json();
    return jsonResponse(responseData, response.ok ? 200 : 500);
  } catch (err) {
    console.error("Function error:", err);
    return jsonResponse({ success: false, message: "Server error. Please try again." }, 500);
  }
}
