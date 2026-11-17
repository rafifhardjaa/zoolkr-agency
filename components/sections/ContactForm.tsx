'use client'

import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createContactSchema } from '@/lib/contact'
import type { ContactInput } from '@/lib/contact'
import type { ContactContent } from '@/content/types'

interface ContactFormProps {
  form: ContactContent['form']
}

type FormStatus = { kind: 'success' | 'error'; title: string; body: string } | null

export function ContactForm({ form }: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>(null)
  const schema = useMemo(() => createContactSchema(form.messages), [form.messages])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
  })

  async function onSubmit(values: ContactInput) {
    setStatus(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!res.ok) {
        setStatus({ kind: 'error', title: form.errorTitle, body: form.errorBody })
        return
      }

      reset()
      setStatus({ kind: 'success', title: form.successTitle, body: form.successBody })
    } catch {
      setStatus({ kind: 'error', title: form.errorTitle, body: form.errorBody })
    }
  }

  return (
    <form
      className="contact-form reveal-stagger"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      data-reveal-el=""
    >
      <div className="contact-field">
        <label className="contact-label" htmlFor="contact-name">
          {form.nameLabel}
        </label>
        <input
          id="contact-name"
          className="contact-input"
          type="text"
          autoComplete="name"
          placeholder={form.namePlaceholder}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          {...register('name')}
        />
        {errors.name ? (
          <p id="contact-name-error" className="contact-error">
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div className="contact-field">
        <label className="contact-label" htmlFor="contact-email">
          {form.emailLabel}
        </label>
        <input
          id="contact-email"
          className="contact-input"
          type="email"
          autoComplete="email"
          placeholder={form.emailPlaceholder}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          {...register('email')}
        />
        {errors.email ? (
          <p id="contact-email-error" className="contact-error">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="contact-field">
        <label className="contact-label" htmlFor="contact-message">
          {form.messageLabel}
        </label>
        <textarea
          id="contact-message"
          className="contact-input contact-textarea"
          rows={5}
          placeholder={form.messagePlaceholder}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          {...register('message')}
        />
        {errors.message ? (
          <p id="contact-message-error" className="contact-error">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      <button className="solid-button" type="submit" disabled={isSubmitting}>
        <span>{isSubmitting ? form.submittingLabel : form.submitLabel}</span>
        <span aria-hidden="true">+</span>
      </button>

      <div className="contact-status" role="status" aria-live="polite" data-kind={status?.kind}>
        {status ? (
          <p>
            <strong>{status.title}</strong> {status.body}
          </p>
        ) : null}
      </div>
    </form>
  )
}
