import { z } from 'zod'

// NEXT_PUBLIC_SITE_URL falls back to the project's single dev/prod origin so the
// app builds and runs without a .env file, then validates the value as a real URL
// whenever it is set.
const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
})

export type Env = z.infer<typeof envSchema>

let cachedEnv: Env | null = null

export function validateEnv(): Env {
  if (cachedEnv) return cachedEnv

  const parsed = envSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  })

  if (!parsed.success) {
    throw new Error(
      `Invalid environment variables: ${parsed.error.issues
        .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
        .join('; ')}`,
    )
  }

  cachedEnv = parsed.data
  return cachedEnv
}