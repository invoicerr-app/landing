import { ArrowRight, CircleCheck, Loader2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { WaitlistCopy } from '@/waitlist/copy'
import { waitlistEndpoint } from '@/waitlist/endpoint'
import { COMPANY_SIZE_VALUES, COUNTRY_VALUES, type Language } from '@/waitlist/languages'

// Same shape the Worker validates against, so a field that passes here passes there. The Worker
// validates again regardless: this one only exists to answer the visitor without a round trip.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type Status = 'idle' | 'sending' | 'sent'

type FieldError = 'email' | 'country' | 'companySize' | null

const selectClass =
    'h-11 w-full rounded-md border border-input bg-background px-3 text-base text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40'

export function WaitlistForm({ copy, language }: { copy: WaitlistCopy; language: Language }) {
    const [email, setEmail] = useState('')
    const [country, setCountry] = useState('')
    const [companySize, setCompanySize] = useState('')
    // A bot fills every field it finds. A human never sees this one, so anything in it is a bot.
    const [honeypot, setHoneypot] = useState('')
    const [status, setStatus] = useState<Status>('idle')
    const [fieldError, setFieldError] = useState<FieldError>(null)
    const [failed, setFailed] = useState(false)
    // The Worker's 429. Kept apart from `failed` because it is not a fault the visitor can fix by
    // trying again straight away, and the message it shows says so.
    const [rateLimited, setRateLimited] = useState(false)

    async function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setFailed(false)
        setRateLimited(false)

        if (!EMAIL.test(email.trim())) return setFieldError('email')
        if (!country) return setFieldError('country')
        if (!companySize) return setFieldError('companySize')
        setFieldError(null)

        setStatus('sending')
        try {
            const response = await fetch(waitlistEndpoint(), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email.trim(),
                    country,
                    companySize,
                    language,
                    // What the visitor was reading when they clicked through. The Worker reads the
                    // Referer header too; this covers the case where the browser sends none.
                    source: typeof document === 'undefined' ? '' : document.referrer,
                    website: honeypot,
                }),
            })
            if (!response.ok) {
                if (response.status === 429) {
                    setRateLimited(true)
                    setStatus('idle')
                    return
                }
                const body = (await response.json().catch(() => null)) as { field?: string } | null
                if (body?.field === 'email' || body?.field === 'country' || body?.field === 'companySize') {
                    setFieldError(body.field)
                } else {
                    setFailed(true)
                }
                setStatus('idle')
                return
            }
            setStatus('sent')
        } catch {
            setFailed(true)
            setStatus('idle')
        }
    }

    if (status === 'sent') {
        return (
            <div
                role="status"
                className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8"
                data-testid="waitlist-success"
            >
                <CircleCheck className="size-8 text-primary" aria-hidden="true" />
                <h2 className="mt-4 text-xl font-semibold tracking-tight">{copy.success.title}</h2>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{copy.success.body}</p>
            </div>
        )
    }

    const message = rateLimited
        ? copy.errors.rateLimited
        : failed
          ? copy.errors.network
          : fieldError
            ? copy.errors[fieldError]
            : null

    return (
        <form
            onSubmit={submit}
            noValidate
            className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8"
            data-testid="waitlist-form"
        >
            <h2 className="text-xl font-semibold tracking-tight">{copy.form.heading}</h2>

            <div className="mt-6 space-y-5">
                <div>
                    <label htmlFor="waitlist-email" className="block text-sm font-medium">
                        {copy.form.emailLabel}
                    </label>
                    <input
                        id="waitlist-email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder={copy.form.emailPlaceholder}
                        aria-invalid={fieldError === 'email' || undefined}
                        aria-describedby={message ? 'waitlist-error' : undefined}
                        className={cn(
                            'mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
                            fieldError === 'email' && 'border-destructive ring-destructive/20 dark:ring-destructive/40',
                        )}
                    />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label htmlFor="waitlist-country" className="block text-sm font-medium">
                            {copy.form.countryLabel}
                        </label>
                        <select
                            id="waitlist-country"
                            name="country"
                            required
                            value={country}
                            onChange={(event) => setCountry(event.target.value)}
                            aria-invalid={fieldError === 'country' || undefined}
                            aria-describedby={message ? 'waitlist-error' : undefined}
                            className={cn('mt-2', selectClass, fieldError === 'country' && 'border-destructive')}
                        >
                            <option value="">{copy.form.countryPlaceholder}</option>
                            {COUNTRY_VALUES.map((value) => (
                                <option key={value} value={value}>
                                    {copy.form.countries[value]}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="waitlist-size" className="block text-sm font-medium">
                            {copy.form.sizeLabel}
                        </label>
                        <select
                            id="waitlist-size"
                            name="companySize"
                            required
                            value={companySize}
                            onChange={(event) => setCompanySize(event.target.value)}
                            aria-invalid={fieldError === 'companySize' || undefined}
                            aria-describedby={message ? 'waitlist-error' : undefined}
                            className={cn('mt-2', selectClass, fieldError === 'companySize' && 'border-destructive')}
                        >
                            <option value="">{copy.form.sizePlaceholder}</option>
                            {COMPANY_SIZE_VALUES.map((value) => (
                                <option key={value} value={value}>
                                    {copy.form.sizes[value]}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Off screen rather than display:none, which some bots skip. Never announced, never tabbed to. */}
                <div aria-hidden="true" className="pointer-events-none absolute left-[-9999px] h-px w-px overflow-hidden">
                    <label htmlFor="waitlist-website">Leave this field empty</label>
                    <input
                        id="waitlist-website"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(event) => setHoneypot(event.target.value)}
                    />
                </div>
            </div>

            {message && (
                <p id="waitlist-error" role="alert" className="mt-5 text-sm font-medium text-destructive">
                    {message}
                </p>
            )}

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{copy.form.whyRequired}</p>

            <Button
                type="submit"
                size="lg"
                disabled={status === 'sending'}
                className="mt-6 h-11 w-full px-6 text-base active:scale-[0.99] sm:w-auto"
            >
                {status === 'sending' ? (
                    <>
                        <Loader2 className="animate-spin" aria-hidden="true" />
                        {copy.form.submitting}
                    </>
                ) : (
                    <>
                        {copy.form.submit}
                        <ArrowRight aria-hidden="true" />
                    </>
                )}
            </Button>
        </form>
    )
}
