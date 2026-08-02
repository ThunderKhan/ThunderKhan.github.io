import type { LucideIcon } from 'lucide-react'

type SocialKeyProps = {
  href: string
  label: string
  Icon: LucideIcon
  external?: boolean
}

/**
 * Dimensional "keyboard key" social link. The 3D lift/press lives in
 * CSS (.social-key) so reduced-motion users get a flat, static button.
 * Label is always visible — no hover-only information.
 */
export function SocialKey({ href, label, Icon, external = true }: SocialKeyProps) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="social-key group flex min-h-11 items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-muted-foreground hover:border-accent/50 hover:text-foreground [--key-edge:rgba(0,0,0,0.12)] dark:[--key-edge:rgba(0,0,0,0.6)]"
    >
      <Icon
        size={16}
        aria-hidden="true"
        className="text-muted-foreground transition-colors group-hover:text-accent"
      />
      <span>{label}</span>
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  )
}
