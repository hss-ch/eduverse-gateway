import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  subject: string;
  message: string;
  name: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send-email function");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling CORS preflight request");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, message, name }: EmailRequest = await req.json();
    console.log("Parsed email request:", { to, subject, name });

    if (!to || !subject || !message) {
      console.error("Missing required fields");
      throw new Error("Missing required fields: to, subject, and message are required");
    }

    // For testing, we'll send from and to the same email address
    const emailResponse = await resend.emails.send({
      from: "hss_ch@yahoo.com",
      to: ["hss_ch@yahoo.com"], // During testing, we can only send to this email
      reply_to: to, // Add the original recipient as reply-to
      subject: `[From: ${name}] ${subject}`,
      html: `
        <h1>New Message from ${name} (${to})</h1>
        <div>${message}</div>
        <p>Best regards,<br>The Team</p>
        <hr>
        <p><small>This email was sent to you because ${name} (${to}) tried to contact you through the website.</small></p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);