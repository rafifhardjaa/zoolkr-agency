interface ComingSoonProps {
  title: string
  note: string
}

export function ComingSoon({ title, note }: ComingSoonProps) {
  return (
    <div className="page">
      <div className="page-head">
        {/* TODO: build the real page content */}
        <h1 className="page-title">{title}</h1>
        <p className="page-lead">{note}</p>
      </div>
    </div>
  )
}
