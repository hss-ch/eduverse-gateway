import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface EmailRequest {
  to: string;
  subject: string;
  message: string;
  name: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Function invoked with method:", req.method);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { 
      headers: corsHeaders,
      status: 204
    });
  }

  try {
    console.log("Parsing request body");
    const { to, subject, message, name }: EmailRequest = await req.json();

    console.log("Request data:", { to, subject, name });
    
    if (!to || !subject || !message || !name) {
      console.error("Missing required fields");
      throw new Error("Missing required fields");
    }

    console.log("Sending email to:", to);
    const emailResponse = await resend.emails.send({
      from: "Lovable <onboarding@resend.dev>",
      to: [to],
      subject: subject,
      html: `
        <h1>Hello ${name},</h1>
        <p>${message}</p>
        <p>Best regards,<br>The Team</p>
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
      JSON.stringify({ 
        error: error.message,
        details: error.toString()
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        },
      }
    );
  }
};

serve(handler);