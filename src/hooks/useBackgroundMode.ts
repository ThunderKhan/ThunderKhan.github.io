import { useCallback, useState } from 'react'

export type BackgroundMode = 'aurora' | 'blueprint' | 'quiet'

/**
 * Temporary shader-validation mode.
 *
 * We force Aurora so the WebGL halftone canvas is always mounted while we
 * evaluate the new background. This deliberately ignores any old persisted
 * Blueprint/Quiet selection; once the shader direction is approved we can
 * restore persistence for the alternate background modes.
 */
export function useBackgroundMode() {
  const [mode, setMode] = useState<BackgroundMode>('aurora')

  const selectMode = useCallback((next: BackgroundMode) => {
    // Keep the UI state responsive, but the initial page load is guaranteed
    // to start on the shader rather than a stale localStorage preference.
    setMode(next)
  }, [])

  return { mode, selectMode }
}
