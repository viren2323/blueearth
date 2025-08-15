import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  console.log("send-quote function called");

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const quoteData = await req.json();
    console.log("Quote data received:", quoteData);

    const bottleTypeNames = {
      plastic: "Eco Plastic",
      steel: "Stainless Steel",
      copper: "Pure Copper",
      glass: "Borosilicate Glass",
    };

    const adminEmailResponse = await resend.emails.send({
      from: "BlueEarth <onboarding@resend.dev>",
      to: [quoteData.adminEmail],
      subject: `New Quote Request from ${quoteData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891b2;">New Quote Request - BlueEarth</h2>
          <p><strong>Name:</strong> ${quoteData.name}</p>
          <p><strong>Phone:</strong> ${quoteData.phone}</p>
          <p><strong>Email:</strong> ${quoteData.email}</p>
          <p><strong>Event Type:</strong> ${quoteData.eventType}</p>
          <p><strong>Event Date:</strong> ${quoteData.eventDate || "Not specified"}</p>
          <p><strong>Bottle Type:</strong> ${bottleTypeNames[quoteData.bottleType]}</p>
          <p><strong>Quantity:</strong> ${quoteData.quantity}</p>
          <p><strong>Estimated Price:</strong> ₹${quoteData.estimatedPrice.toLocaleString()}</p>
          ${quoteData.customization ? `<p><strong>Customization:</strong> ${quoteData.customization}</p>` : ""}
          <p><a href="https://wa.me/${quoteData.whatsappNumber}">WhatsApp: ${quoteData.whatsappNumber}</a></p>
        </div>
      `,
    });

    const customerEmailResponse = await resend.emails.send({
      from: "BlueEarth <onboarding@resend.dev>",
      to: [quoteData.email],
      subject: "Quote Request Received - BlueEarth",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891b2;">Thanks, ${quoteData.name}!</h2>
          <p>We’ve received your quote request and will get back within 24 hours.</p>
          <p><strong>Quantity:</strong> ${quoteData.quantity}</p>
          <p><strong>Estimated Price:</strong> ₹${quoteData.estimatedPrice.toLocaleString()}</p>
          <p><a href="https://wa.me/${quoteData.whatsappNumber}">WhatsApp: ${quoteData.whatsappNumber}</a></p>
        </div>
      `,
    });

    return new Response(JSON.stringify({
      success: true,
      adminEmail: adminEmailResponse,
      customerEmail: customerEmailResponse,
    }), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });

  } catch (error) {
    console.error("Error in send-quote:", error);
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : "Unknown error",
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  }
});
