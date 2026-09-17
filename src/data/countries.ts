// Read from the app's own country catalogues (backend/src/modules/documents/*/data/<country>.json) on
// 2026-09-17. A row is only listed when the catalogue holds it: the uneven shape is the point.
export interface CountryFacts {
    code: string
    name: string
    identifiers: { label: string; required?: boolean; hint?: string }[]
    vatRates: number[]
    format?: string
    channel: { name: string; detail: string }
    retention?: { years: number; source: string }
}

export const countries: CountryFacts[] = [
    {
        code: 'FR',
        name: 'France',
        identifiers: [
            { label: 'SIREN / SIRET', required: true, hint: '9 or 14 digits' },
            { label: 'N° TVA intracommunautaire' },
        ],
        vatRates: [20, 10, 5.5, 2.1, 0],
        format: 'Factur-X',
        channel: { name: 'PDP', detail: 'Accredited platform, mandatory since September 2026. Chorus Pro for public buyers.' },
        retention: { years: 10, source: 'C. com. art. L123-22' },
    },
    {
        code: 'DE',
        name: 'Germany',
        identifiers: [{ label: 'USt-IdNr.', hint: 'DE + 9 digits' }, { label: 'Handelsregisternummer' }],
        vatRates: [19, 7, 0],
        format: 'XRechnung',
        channel: { name: 'E-mail', detail: 'PDF with the e-invoice XML attached.' },
        retention: { years: 8, source: 'UStG § 14b' },
    },
    {
        code: 'IT',
        name: 'Italy',
        identifiers: [{ label: 'Partita IVA' }, { label: 'Codice Fiscale' }, { label: 'Codice Destinatario (SdI)' }],
        vatRates: [22, 10, 5, 4, 0],
        format: 'FatturaPA',
        channel: { name: 'SdI', detail: 'National clearance, by web service or certified e-mail (PEC).' },
    },
    {
        code: 'PL',
        name: 'Poland',
        identifiers: [{ label: 'NIP' }],
        vatRates: [23, 8, 5, 0],
        format: 'FA(3)',
        channel: { name: 'KSeF', detail: 'National clearance: the tax office returns the invoice number.' },
        retention: { years: 5, source: 'Ustawa o VAT art. 112' },
    },
    {
        code: 'PT',
        name: 'Portugal',
        identifiers: [{ label: 'NIF / NIPC', required: true }, { label: 'NIF para efeitos de IVA' }],
        vatRates: [23, 13, 6, 0],
        channel: { name: 'E-mail', detail: 'PDF with the e-invoice XML attached.' },
        retention: { years: 10, source: 'CIVA art. 52.º' },
    },
]
