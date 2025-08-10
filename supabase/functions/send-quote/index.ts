import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
// const resend = new Resend();

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface QuoteRequest {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  bottleType: string;
  quantity: string;
  customization: string;
  estimatedPrice: number;
  adminEmail: string;
  whatsappNumber: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("send-quote function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const quoteData: QuoteRequest = await req.json();
    console.log("Quote data received:", quoteData);

    const bottleTypeNames = {
      plastic: "Eco Plastic",
      steel: "Stainless Steel", 
      copper: "Pure Copper",
      glass: "Borosilicate Glass"
    };

    // Send email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "BlueEarth <onboarding@resend.dev>",
      to: [quoteData.adminEmail],
      subject: `New Quote Request from ${quoteData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891b2;">New Quote Request - BlueEarth</h2>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0891b2; margin-top: 0;">Customer Information</h3>
            <p><strong>Name:</strong> ${quoteData.name}</p>
            <p><strong>Phone:</strong> ${quoteData.phone}</p>
            <p><strong>Email:</strong> ${quoteData.email}</p>
          </div>

          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0891b2; margin-top: 0;">Order Details</h3>
            <p><strong>Event Type:</strong> ${quoteData.eventType}</p>
            <p><strong>Event Date:</strong> ${quoteData.eventDate || 'Not specified'}</p>
            <p><strong>Bottle Type:</strong> ${bottleTypeNames[quoteData.bottleType as keyof typeof bottleTypeNames]}</p>
            <p><strong>Quantity:</strong> ${quoteData.quantity} pieces</p>
            <p><strong>Estimated Price:</strong> ₹${quoteData.estimatedPrice.toLocaleString()}</p>
          </div>

          ${quoteData.customization ? `
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0891b2; margin-top: 0;">Customization Requirements</h3>
            <p>${quoteData.customization}</p>
          </div>
          ` : ''}

          <div style="background: #0891b2; color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Quick Actions:</strong></p>
            <p style="margin: 5px 0;"><a href="https://wa.me/${quoteData.whatsappNumber}" style="color: white;">Contact via WhatsApp: ${quoteData.whatsappNumber}</a></p>
          </div>

          <p style="color: #64748b; font-size: 14px;">
            This quote request was submitted through the BlueEarth website contact form.
          </p>
        </div>
      `,
    });

    console.log("Admin email sent:", adminEmailResponse);

    // Send confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "BlueEarth <onboarding@resend.dev>",
      to: [quoteData.email],
      subject: "Quote Request Received - BlueEarth",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891b2;">Thank you for your quote request, ${quoteData.name}!</h2>
          
          <p>We've received your request for customized water bottles and will get back to you within 24 hours with a detailed quote.</p>

          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0891b2; margin-top: 0;">Your Request Summary</h3>
            <p><strong>Event Type:</strong> ${quoteData.eventType}</p>
            <p><strong>Event Date:</strong> ${quoteData.eventDate || 'Not specified'}</p>
            <p><strong>Bottle Type:</strong> ${bottleTypeNames[quoteData.bottleType as keyof typeof bottleTypeNames]}</p>
            <p><strong>Quantity:</strong> ${quoteData.quantity} pieces</p>
            <p><strong>Estimated Price:</strong> ₹${quoteData.estimatedPrice.toLocaleString()}</p>
          </div>

          <div style="background: #0891b2; color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Need immediate assistance?</strong></p>
            <p style="margin: 5px 0;"><a href="https://wa.me/${quoteData.whatsappNumber}" style="color: white;">WhatsApp us at ${quoteData.whatsappNumber}</a></p>
          </div>

          <p>Thank you for choosing BlueEarth for your event!</p>
          
          <p style="color: #64748b; font-size: 14px;">
            Best regards,<br>
            The BlueEarth Team<br>
            Pure Water for a Pure Planet
          </p>
        </div>
      `,
    });

    console.log("Customer email sent:", customerEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        adminEmail: adminEmailResponse,
        customerEmail: customerEmailResponse 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: unknown) {
   console.error("Error in send-quote function:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(
      JSON.stringify({ error: message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);