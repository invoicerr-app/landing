// Cloud pricing, per company and per month, in USD. Yearly billing charges ten months for twelve.
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
