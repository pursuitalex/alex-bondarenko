import { Resend } from "resend";
import { brand } from "@/lib/brand";

/**
 * Brief form → inbox, via Resend.
 *
 * Env (see .env.example):
 *   RESEND_API_KEY  required — without it the route answers 503 and the form
 *                   says so, rather than pretending the brief was sent.
 *   BRIEF_TO        optional — defaults to the address in brand.ts.
 *   BRIEF_FROM      optional — defaults to Resend's shared sender, which may
 *                   only deliver to the account owner. Point it at a verified
 *                   domain once there is one.
 *
 * `replyTo` carries the sender's address, so replying from the inbox reaches
 * the client directly instead of the shared Resend sender.
 */
const MAX = { name: 120, email: 160, type: 60, budget: 40, message: 4000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Некоректний запит." }, { status: 400 });
  }

  const data = (body ?? {}) as Record<string, unknown>;

  // Honeypot: a real person never sees this field, so anything in it is a bot.
  // Answer 200 so the bot logs a success and does not retry.
  if (clean(data.company, 100)) return Response.json({ ok: true });

  const name = clean(data.name, MAX.name);
  const email = clean(data.email, MAX.email);
  const type = clean(data.type, MAX.type);
  const budget = clean(data.budget, MAX.budget);
  const message = clean(data.message, MAX.message);

  if (!name || !email || !type) {
    return Response.json(
      { error: "Заповніть ім'я, email і тип проєкту." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "Перевірте email." }, { status: 400 });
  }

  // Config is checked after validation: bad input is the client's error whether
  // or not the server happens to be configured, and 400s stay testable without
  // a key present.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[brief] RESEND_API_KEY is not set");
    return Response.json(
      { error: "Пошта тимчасово недоступна. Напишіть напряму на " + brand.email },
      { status: 503 },
    );
  }

  const lines = [
    `Ім'я:    ${name}`,
    `Email:   ${email}`,
    `Тип:     ${type}`,
    `Бюджет:  ${budget || "—"}`,
    "",
    "Про проєкт:",
    message || "—",
  ];

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: process.env.BRIEF_FROM ?? "Заявка з сайту <onboarding@resend.dev>",
      to: process.env.BRIEF_TO ?? brand.contacts.email,
      replyTo: email,
      subject: `Заявка: ${name} — ${type}`,
      text: lines.join("\n"),
    });

    if (error) {
      console.error("[brief] resend rejected the message:", error);
      return Response.json(
        { error: "Не вдалося надіслати. Напишіть напряму на " + brand.email },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[brief] resend request failed:", err);
    return Response.json(
      { error: "Не вдалося надіслати. Напишіть напряму на " + brand.email },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
