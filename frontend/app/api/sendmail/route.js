import { sendMail } from '@/lib/mailer';


export async function POST(req, res) {
  if (req.method === 'POST') {
    const { to, subject, html } = await req.json();

    try {
      const info = await sendMail(
        to,
        subject,
        html,
      );

      console.log('Message sent: %s', info.messageId);
      return new Response('Email sent');
    } catch (e) {
        return new Response('Error sending email', { status: 500 });
    }
  }
}