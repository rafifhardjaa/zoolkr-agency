import React from 'react'

export interface PageCoverItem {
  label: string
  meta?: string
  href?: string
}

export interface PageCoverAside {
  label: string
  items: PageCoverItem[]
}

export interface PageCoverProps {
  label: string
  meta: string
  title: React.ReactNode
  lead: string
  aside?: PageCoverAside
  footLeft: string
  footRight: string
}

export function PageCover({
  label,
  meta,
  title,
  lead,
  aside,
  footLeft,
  footRight,
}: PageCoverProps): React.JSX.Element {
  return (
    <header className="cover">
      <p className="cover-line">
        <span>
          <b className="section-mark" aria-hidden="true">
            ✱
          </b>
          {label}
        </span>
        <span>{meta}</span>
      </p>

      <div className="cover-body">
        <h1 className="cover-title">{title}</h1>

        <div className="cover-aside">
          <p className="cover-lead">{lead}</p>

          {aside ? (
            <div className="cover-index">
              <p className="cover-index-label">{aside.label}</p>
              <ul>
                {aside.items.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <a className="cover-index-row" href={item.href}>
                        <span className="cover-index-meta">{item.meta}</span>
                        <span className="cover-index-text">{item.label}</span>
                        <span className="cover-index-plus" aria-hidden="true">
                          +
                        </span>
                      </a>
                    ) : (
                      <span className="cover-index-row">
                        {item.meta ? (
                          <span className="cover-index-meta">{item.meta}</span>
                        ) : null}
                        <span className="cover-index-text">{item.label}</span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      <p className="cover-foot">
        <span>{footLeft}</span>
        <span>{footRight}</span>
      </p>
    </header>
  )
}
