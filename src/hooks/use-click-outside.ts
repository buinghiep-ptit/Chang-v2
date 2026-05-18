import { useEffect, type RefObject } from 'react'

export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: () => void,
  enabled = true,
): void {
  useEffect(() => {
    if (!enabled) return
    function onPointerDown(e: PointerEvent): void {
      const el = ref.current
      if (!el || el.contains(e.target as Node)) return
      handler()
    }
    function onKey(e: KeyboardEvent): void {
      if (e.key === 'Escape') handler()
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [ref, handler, enabled])
}
