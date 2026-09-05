import { useCallback, useState } from 'react'

export type BackgroundMode = 'aurora' | 'blueprint' | 'quiet'

// Bump the key whenever the site's default background experience changes.
// This intentionally ignores older saved selections once so the new halftone
// Aurora actually becomes visible after deployment instead of restoring a
// previously selected Blueprint/Quiet mode from localStorage.
const STORAGE_KEY = 'portfolio-background-v2'
const MODES: BackgroundMode[] = ['aurora', 'blueprint', 'quiet']

function getInitialMode(): BackgroundMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && MODES.includes(stored as BackgroundMode)) {
      return stored as BackgroundMode
    }
  } catch {
    // localStorage unavailable — fall through to default.
  }
  return 'aurora'
}

/** Ambient background mode with localStorage persistence. Defaults to the halftone Aurora. */
export function useBackgroundMode() {
  const [mode, setMode] = useState<BackgroundMode>(getInitialMode)

  const selectMode = useCallback((next: BackgroundMode) => {
    setMode(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Persistence is best-effort.
    }
  }, [])

  return { mode, selectMode }
}
