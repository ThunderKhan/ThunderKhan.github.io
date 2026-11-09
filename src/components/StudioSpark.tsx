/** Original eight-spoke mark; SVG avoids platform-specific emoji rendering. */
export function StudioSpark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M24 4v40M4 24h40M10 10l28 28M10 38l28-28"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
