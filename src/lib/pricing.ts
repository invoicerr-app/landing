// Cloud pricing, per company and per month, in euros excluding VAT. Yearly billing charges ten months for twelve.
export const FIRST_SEAT = 15
export const NEXT_THREE_SEATS = 4
export const FURTHER_SEATS = 3
export const TRIAL_DAYS = 14
export const YEARLY_MONTHS_CHARGED = 10

export function monthlyPrice(seats: number): number {
    const count = Math.max(1, Math.floor(seats))
    const nextThree = Math.min(Math.max(count - 1, 0), 3)
    const further = Math.max(count - 4, 0)
    return FIRST_SEAT + nextThree * NEXT_THREE_SEATS + further * FURTHER_SEATS
}

export function yearlyPrice(seats: number): number {
    return monthlyPrice(seats) * YEARLY_MONTHS_CHARGED
}

/** What yearly billing saves, as a fraction of twelve monthly payments: 2 months of 12, 0.1667. */
export const YEARLY_DISCOUNT = 1 - YEARLY_MONTHS_CHARGED / 12

/** The seat bands of a given count, for the breakdown under the counter. */
export function seatBands(seats: number) {
    const count = Math.max(1, Math.floor(seats))
    return [
        { band: 'first', count: 1, unit: FIRST_SEAT },
        { band: 'next', count: Math.min(Math.max(count - 1, 0), 3), unit: NEXT_THREE_SEATS },
        { band: 'further', count: Math.max(count - 4, 0), unit: FURTHER_SEATS },
    ] as const
}
