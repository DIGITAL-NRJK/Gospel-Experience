"use server";

export async function sendContactMessage(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, error: "Nom, email et message sont requis." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return { success: false, error: "Service email non configuré." };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "Formulaire Contact <contact@fourvieregospelexperience.com>",
      to: process.env.CONTACT_EMAIL || "goslym69@gmail.com",
      replyTo: email,
      subject: `[Gospel Expérience] ${subject || "Message"} de ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#2B1B5E;padding:24px;border-radius:12px 12px 0 0">
            <h1 style="color:#C8A24E;font-size:20px;margin:0">Gospel Expérience — Nouveau message</h1>
          </div>
          <div style="background:#FFF8F0;padding:24px;border:1px solid #eee;border-radius:0 0 12px 12px">
            <p style="margin:0 0 12px"><strong>De :</strong> ${name}</p>
            <p style="margin:0 0 12px"><strong>Email :</strong> ${email}</p>
            <p style="margin:0 0 12px"><strong>Sujet :</strong> ${subject || "Non précisé"}</p>
            <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
            <p style="margin:0;white-space:pre-wrap">${message}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: "Erreur lors de l'envoi." };
    }

    return { success: true, error: null };
  } catch (err) {
    console.error("Contact action error:", err);
    return { success: false, error: "Erreur serveur." };
  }
}