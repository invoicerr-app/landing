import { Moon, Sun } from 'lucide-react'

import { useTheme } from '@/lib/theme'

import { Button } from './ui/button'

interface ThemeToggleProps {
    className?: string
    /** What the button says it does, in the page's language. */
    labels?: { light: string; dark: string }
}

export function ThemeToggle({ className, labels = { light: 'Switch to light theme', dark: 'Switch to dark theme' } }: ThemeToggleProps) {
    const { theme, toggle } = useTheme()
    return (
        <Button variant="ghost" size="icon" onClick={toggle} className={className} aria-label={theme === 'dark' ? labels.light : labels.dark}>
            {theme === 'dark' ? <Sun /> : <Moon />}
        </Button>
    )
}
