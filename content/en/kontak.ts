import type { ContactContent } from '@/content/types'

export const enKontak: ContactContent = {
  head: {
    guideLabel: 'Mention in your message',
    guide: [
      'what you are making, and who it is for',
      'a deadline or release date, if you have one',
      'a budget range, if it is already set',
    ],
    footLeft: 'Independent creative studio',
    footRight: 'Semarang, ID',
  },
  title: 'Contact',
  lead: 'Tell us about your project and we will get back to you.',
  meta: {
    label: 'Z / CONTACT',
    subtitle: '06 / TALK TO US',
  },
  intro:
    'We take on a limited number of projects each quarter. Tell us what you are making, and our team reads every message.',
  email: 'hello@zoolkr.com',
  directEmailLabel: 'Email',
  place: 'Semarang, Indonesia',
  directPlaceLabel: 'Location',
  privacy:
    'We use your name, email, and message only to reply to this conversation. It is not shared with anyone else.',
  form: {
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailLabel: 'Email',
    emailPlaceholder: 'name@company.com',
    messageLabel: 'Message',
    messagePlaceholder: 'Tell us about your project...',
    submitLabel: 'Send message',
    submittingLabel: 'Sending...',
    successTitle: 'Thank you.',
    successBody: 'Your message is sent. We will reply by email.',
    errorTitle: 'Something went wrong.',
    errorBody: 'Your message was not sent. Please try again.',
    messages: {
      nameRequired: 'Enter your name.',
      nameMin: 'Name must be at least 2 characters.',
      emailRequired: 'Enter your email address.',
      emailInvalid: 'Email address is not valid.',
      messageRequired: 'Write your message.',
      messageMin: 'Message must be at least 10 characters.',
    },
  },
}
