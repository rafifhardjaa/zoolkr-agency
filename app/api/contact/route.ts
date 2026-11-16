import { createContactSchema } from '@/lib/contact'
import type { ContactInput } from '@/lib/contact'

const contactSchema = createContactSchema()

const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60_000

// In-memory per-IP rate limit. Best-effort on serverless: each isolate keeps its
// own map, so this is a first line of defense, not a hard guarantee across instances.
const hits = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)

  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent)
    return true
  }

  recent.push(now)
  hits.set(ip, recent)
  return false
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'

  if (isRateLimited(ip)) {
    return Response.json({ error: 'Too many requests' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid input' }, { status: 400 })
  }

  const result = contactSchema.safeParse(body)
  if (!result.success) {
    return Response.json({ error: 'Invalid input' }, { status: 400 })
  }

  const data = result.data as ContactInput

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_FORM_EMAIL

  // Email is only sent when both values are configured. Without them the message is
  // validated and accepted but not delivered anywhere, so the repo stays runnable
  // before the transactional sender is set up.
  if (apiKey && to) {
    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)

    const { error } = await resend.emails.send({
      // `from` must be a sender verified in Resend; using CONTACT_FORM_EMAIL keeps it
      // to a single address for both sender and recipient.
      from: `Zoolkr <${to}>`,
      to,
      replyTo: data.email,
      subject: `New contact message from ${data.name}`,
      text: `${data.name} <${data.email}>\n\n${data.message}`,
    })

    if (error) {
      console.error('Contact email failed to send:', error.name, error.message)
      return Response.json({ error: 'Failed to send' }, { status: 500 })
    }
  }

  return Response.json({ ok: true })
}
