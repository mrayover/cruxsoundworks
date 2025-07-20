import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { name, email, experience, styles, other } = req.body;
  const allStyles = [...styles, other].filter(Boolean).join(', ');

  try {
    await resend.emails.send({
      from: 'CruxSoundworks Lessons <info@cruxsoundworks.com>',
      to: 'lessons@cruxsoundworks.com',
      subject: 'New Lessons Waitlist Signup',
      html: `
        <h2>New Waitlist Signup</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Experience:</strong> ${experience}</p>
        <p><strong>Styles:</strong> ${allStyles}</p>
      `,
    });


    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email send failed:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
