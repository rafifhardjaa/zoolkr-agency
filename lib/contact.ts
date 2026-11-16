import { z } from 'zod'
import type { ContactMessages } from '@/content/types'

export const contactLimits = {
  nameMin: 2,
  nameMax: 100,
  messageMin: 10,
  messageMax: 2000,
} as const

const fallbackMessages: ContactMessages = {
  nameRequired: 'Name is required',
  nameMin: 'Name must be at least 2 characters',
  emailRequired: 'Email is required',
  emailInvalid: 'Email is not valid',
  messageRequired: 'Message is required',
  messageMin: 'Message must be at least 10 characters',
}

export function createContactSchema(messages: ContactMessages = fallbackMessages) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, messages.nameRequired)
      .min(contactLimits.nameMin, messages.nameMin)
      .max(contactLimits.nameMax, messages.nameMin),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, messages.emailRequired)
      .pipe(z.email(messages.emailInvalid)),
    message: z
      .string()
      .trim()
      .min(1, messages.messageRequired)
      .min(contactLimits.messageMin, messages.messageMin)
      .max(contactLimits.messageMax, messages.messageMin),
  })
}

export type ContactInput = {
  name: string
  email: string
  message: string
}
