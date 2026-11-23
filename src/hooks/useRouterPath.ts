import { useEffect, useState } from 'react'

function normalizePath(pathname: string) {
  return pathname.replace(/\/+$/, '') || '/'
}

function scrollToHash(hash: string) {
  let id: string

  try {
    id = decodeURIComponent(hash.slice(1))
  } catch {
    return
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView()
    })
  })
}

export function useRouterPath() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname))

  useEffect(() => {
    const syncPath = () => setPath(normalizePath(window.location.pathname))

    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const target = event.target
      if (!(target instanceof Element)) return

      const anchor = target.closest<HTMLAnchorElement>('a[href]')
      if (
        !anchor ||
        (anchor.target && anchor.target !== '_self') ||
        anchor.hasAttribute('download')
      ) {
        return
      }

      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) return

      const sameDocument =
        url.pathname === window.location.pathname && url.search === window.location.search
      if (sameDocument) return

      event.preventDefault()
      window.history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`)
      setPath(normalizePath(url.pathname))

      if (url.hash) scrollToHash(url.hash)
      else window.scrollTo({ top: 0, left: 0 })
    }

    window.addEventListener('popstate', syncPath)
    document.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('popstate', syncPath)
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return path
}
