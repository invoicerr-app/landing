// Read from the app's transports (backend/src/modules/documents/transports/) and operator catalogue
// (backend/src/modules/documents/operators/data/). Only channels the app can send through are listed.
export interface PlatformGroup {
    id: string
    title: string
    detail: string
    names: string[]
}

export const platformGroups: PlatformGroup[] = [
    {
        id: 'fr-approved',
        title: 'France, approved platforms',
        detail: 'Plateformes agréées registered by the French tax administration, for invoices between businesses.',
        names: ['SUPER PDP', 'Iopole', 'Billit', 'Invopop'],
    },
    {
        id: 'fr-public',
        title: 'France, public sector',
        detail: 'The state portal for invoices to French public bodies.',
        names: ['Chorus Pro'],
    },
    {
        id: 'it',
        title: 'Italy',
        detail: 'The Sistema di Interscambio, reached by certified e-mail.',
        names: ['SdI over PEC'],
    },
    {
        id: 'pl',
        title: 'Poland',
        detail: 'The national e-invoicing system, which returns the invoice number.',
        names: ['KSeF'],
    },
    {
        id: 'email',
        title: 'Everywhere else',
        detail: "The invoice PDF, sent to the client's own address.",
        names: ['E-mail'],
    },
]

export const allChannels = platformGroups.flatMap((group) => group.names)
