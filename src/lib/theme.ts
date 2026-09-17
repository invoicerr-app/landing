import { useCallback, useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'invoicerr-theme'
const listeners = new Set<() => void>()

function read(): Theme {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function apply(theme: Theme) {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    listeners.forEach((listener) => listener())
}

// The initial class is set by the inline script in index.html, before first paint. From there the
// page follows the OS scheme until the visitor picks a side with the toggle.
if (typeof window !== 'undefined') {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
        try {
            if (localStorage.getItem(STORAGE_KEY)) return
        } catch {
            /* storage unavailable: keep following the OS */
        }
        apply(event.matches ? 'dark' : 'light')
    })
}

function subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
}

export function useTheme() {
    const theme = useSyncExternalStore(subscribe, read, () => 'light' as Theme)
    const toggle = useCallback(() => {
        const next: Theme = read() === 'dark' ? 'light' : 'dark'
        try {
            localStorage.setItem(STORAGE_KEY, next)
        } catch {
            /* storage unavailable: the choice lasts for this page view only */
        }
        apply(next)
    }, [])
    return { theme, toggle }
}
