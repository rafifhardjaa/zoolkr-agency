import { Fragment } from 'react'

export function Accent({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g)
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith('*') && part.endsWith('*') ? (
          <em key={index}>{part.slice(1, -1)}</em>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  )
}
