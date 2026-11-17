'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useNavSticky } from '@/hooks/useNavSticky'
import { PlusLink } from '@/components/ui/PlusLink'
import { localePath } from '@/lib/i18n'
import type { HomepageContent, Locale } from '@/content/types'

interface NavBarProps {
  locale: Locale
  content: HomepageContent['nav']
}

const languageCodes = ['en', 'id'] as const

export function NavBar({ locale, content }: NavBarProps) {
  const pathname = usePathname()
  const { isStuck } = useNavSticky(pathname)
  const isSolid = pathname !== localePath(locale)

  // Keep the reader on the same page when they switch language.
  const switchLocalePath = (code: Locale) => {
    const [, first, ...rest] = pathname.split('/')
    return first === locale ? ['', code, ...rest].join('/') : localePath(code)
  }

  const dialogRef = useRef<HTMLDialogElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('menu-open', isMenuOpen)
    return () => {
      document.body.classList.remove('menu-open')
    }
  }, [isMenuOpen])

  const openMenu = () => {
    const dialog = dialogRef.current
    if (!dialog || dialog.open) return
    dialog.showModal()
    setIsMenuOpen(true)
  }

  const closeMenu = () => {
    dialogRef.current?.close()
  }

  const className = [
    'nav',
    isSolid ? 'nav--solid' : '',
    !isSolid && isStuck ? 'is-stuck' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <a className="skip-link" href="#main">
        {content.skipLabel}
      </a>

      <header className={className}>
        <Link className="brand" href={localePath(locale)} aria-label={content.brand}>
          <span className="brand-mark" aria-hidden="true">
            *
          </span>
          <span>{content.brand}</span>
        </Link>

        {content.links.length > 0 ? (
          <nav className="nav-links" aria-label={content.primaryLabel}>
            {content.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                <span>{link.label}</span>
                <span aria-hidden="true">{link.label}</span>
              </Link>
            ))}
          </nav>
        ) : null}

        <div className="nav-actions">
          <nav className="lang-switch" aria-label={content.languageLabel}>
            {languageCodes.map((code, index) => (
              <Fragment key={code}>
                {index > 0 ? (
                  <span className="lang-sep" aria-hidden="true">
                    /
                  </span>
                ) : null}
                <Link href={switchLocalePath(code)} aria-current={code === locale ? 'page' : undefined}>
                  {code.toUpperCase()}
                </Link>
              </Fragment>
            ))}
          </nav>

          <PlusLink className="nav-cta" href={content.cta.href} label={content.cta.label} />

          <button
            className="menu-toggle"
            type="button"
            aria-label={content.menu.openLabel}
            aria-expanded={isMenuOpen}
            aria-controls="menu-dialog"
            onClick={openMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <dialog
        ref={dialogRef}
        id="menu-dialog"
        className="menu-dialog"
        aria-label={content.menu.dialogLabel}
        onClose={() => setIsMenuOpen(false)}
      >
        <div className="menu-top">
          <span className="brand">
            <span className="brand-mark" aria-hidden="true">
              *
            </span>
            <span>{content.brand}</span>
          </span>
          <button className="menu-close" type="button" onClick={closeMenu}>
            <span>{content.menu.closeLabel}</span>
            <span className="menu-close-mark" aria-hidden="true">
              ×
            </span>
          </button>
        </div>

        <nav className="menu-nav" aria-label={content.menu.dialogLabel}>
          {content.links.map((link, index) => (
            <Link key={link.href} href={link.href} onClick={closeMenu}>
              <small aria-hidden="true">{String(index + 1).padStart(2, '0')}</small>
              <span>{link.label}</span>
            </Link>
          ))}
          <Link href={content.cta.href} onClick={closeMenu}>
            <small aria-hidden="true">{String(content.links.length + 1).padStart(2, '0')}</small>
            <span>{content.menu.contactLabel}</span>
          </Link>
        </nav>

        <div className="menu-bottom">
          <span>{content.menu.footLeft}</span>
          <span>{content.menu.footRight}</span>
        </div>
      </dialog>
    </>
  )
}
