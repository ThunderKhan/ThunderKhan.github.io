import { useCallback, useState } from 'react'

export type BackgroundMode = 'aurora' | 'blueprint' | 'quiet'

/** The quiet canvas keeps the work in focus. Alternate backgrounds remain available in the command palette. */
export function useBackgroundMode() {
  const [mode, setMode] = useState<BackgroundMode>('quiet')

  const selectMode = useCallback((next: BackgroundMode) => {
    setMode(next)
  }, [])

  return { mode, selectMode }
}
