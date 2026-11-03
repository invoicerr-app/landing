import { addDays, addYears } from '@/lib/today'

/**
 * The one sample story the home page tells, dated from today: an invoice issued twelve days ago,
 * paid and matched to the bank today, due in eighteen days, and archived for ten years from today.
 * The hero's invoice, the phone's notifications and the flow's folders all read it from here, so
 * they always agree with each other and with the calendar. Illustrative, not a customer's.
 */
export function sampleStory(now: Date) {
    const issued = addDays(now, -12)
    const year = issued.getFullYear()
    return {
        issued,
        due: addDays(issued, 30),
        paid: now,
        archivedUntil: addYears(now, 10),
        invoice: `F-${year}-0142`,
        quote: `D-${year}-031`,
    }
}
