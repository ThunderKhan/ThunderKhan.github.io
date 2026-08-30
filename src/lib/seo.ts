export type SeoMeta = {
  title: string
  description: string
  canonicalUrl: string
  robots?: string
  ogType?: 'website' | 'article'
  ogTitle?: string
  ogDescription?: string
  ogUrl?: string
  ogImage?: string
  ogImageAlt?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  twitterImageAlt?: string
}

type Restore = () => void

function setMeta(attribute: 'name' | 'property', key: string, content: string): Restore {
  const selector = `meta[${attribute}="${key}"]`
  let element = document.querySelector<HTMLMetaElement>(selector)
  const created = !element
  const previousContent = element?.content

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.content = content

  return () => {
    if (created) {
      element?.remove()
    } else if (element && previousContent !== undefined) {
      element.content = previousContent
    }
  }
}

function setCanonical(href: string): Restore {
  let element = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  const created = !element
  const previousHref = element?.href

  if (!element) {
    element = document.createElement('link')
    element.rel = 'canonical'
    document.head.appendChild(element)
  }

  element.href = href

  return () => {
    if (created) {
      element?.remove()
    } else if (element && previousHref !== undefined) {
      element.href = previousHref
    }
  }
}

export function applySeo({
  title,
  description,
  canonicalUrl,
  robots,
  ogType = 'website',
  ogTitle = title,
  ogDescription = description,
  ogUrl = canonicalUrl,
  ogImage,
  ogImageAlt,
  twitterTitle = ogTitle,
  twitterDescription = ogDescription,
  twitterImage = ogImage,
  twitterImageAlt = ogImageAlt,
}: SeoMeta): Restore {
  const previousTitle = document.title
  const restore = [
    setMeta('name', 'description', description),
    setMeta('property', 'og:type', ogType),
    setMeta('property', 'og:title', ogTitle),
    setMeta('property', 'og:description', ogDescription),
    setMeta('property', 'og:url', ogUrl),
    setCanonical(canonicalUrl),
  ]

  if (robots) restore.push(setMeta('name', 'robots', robots))
  if (ogImage) restore.push(setMeta('property', 'og:image', ogImage))
  if (ogImageAlt) restore.push(setMeta('property', 'og:image:alt', ogImageAlt))
  if (twitterTitle) restore.push(setMeta('name', 'twitter:title', twitterTitle))
  if (twitterDescription) restore.push(setMeta('name', 'twitter:description', twitterDescription))
  if (twitterImage) restore.push(setMeta('name', 'twitter:image', twitterImage))
  if (twitterImageAlt) restore.push(setMeta('name', 'twitter:image:alt', twitterImageAlt))

  document.title = title

  return () => {
    document.title = previousTitle
    restore.reverse().forEach((restoreValue) => restoreValue())
  }
}
