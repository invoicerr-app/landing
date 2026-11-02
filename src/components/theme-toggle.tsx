import { Moon, Sun } from 'lucide-react'

import { useTheme } from '@/lib/theme'

import { Button } from './ui/button'

export function ThemeToggle({ className }: { className?: string }) {
    const { theme, toggle } = useTheme()
    const next = theme === 'dark' ? 'light' : 'dark'
    return (
        <Button variant="ghost" size="icon" onClick={toggle} className={className} aria-label={`Switch to ${next} theme`}>
            {theme === 'dark' ? <Sun /> : <Moon />}
        </Button>
    )
}
