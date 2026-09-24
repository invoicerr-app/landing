import { Coins, Compass, Landmark, Network, Search, Share2 } from 'lucide-react'

import { A, Closing, GuideHero, GuideSection, H3, List, Quote, Sources, Strong, Table } from '@/components/guide-parts'

// About the network only: who carries an invoice, how the receiver is found, who governs it and what
// it costs. What goes inside the message (the Peppol BIS invoice, its fields and rules) is a profile of
// EN 16931 and belongs to /e-invoicing/en-16931; keeping it out of here is what keeps the two pages
// from answering the same question twice. If this page ever needs a field list, merge the two instead.
//
// Every claim comes from OpenPeppol's own documents (statutes, agreements, the eDelivery
// specifications, the code list) or from the German federal e-invoicing portal. No Peppol member,
// service provider or software vendor is named.
export function PeppolGuide() {
    return (
        <>
            <GuideHero title="Peppol: what the network is, and whether you need it">
                Peppol is a network for exchanging business documents, invoices among them, between
                organisations that use different providers. This page is about the network: who carries
                the invoice, how the receiver is found, who governs it and what it costs, and whether the
                law in France, Germany, Italy, Poland or Portugal asks you to use it. What an invoice must
                contain is a separate question, answered on the{' '}
                <A href="/e-invoicing/en-16931/">EN 16931</A> page.
            </GuideHero>

            <GuideSection icon={Share2} title="What Peppol is, and what it is not">
                <p>OpenPeppol separates the name of the framework from the name of the organisation behind it:</p>
                <Quote cite="OpenPeppol, “About”.">“Peppol is the name of our Interoperability Framework. OpenPeppol is the name of our organisation.”</Quote>
                <p>
                    OpenPeppol is an international non-profit association under Belgian law, with its seat
                    in Brussels. It took over the network in 2012 from a pilot the European Commission had
                    co-financed since 2008. It does not carry invoices itself:
                </p>
                <Quote cite="OpenPeppol, “About”.">
                    “Peppol is not a portal, or a provider of exchange services. Peppol is an enabler. Any
                    organisation can send and receive business documents across the Peppol Network via their
                    chosen Peppol-accredited Service Provider.”
                </Quote>
                <p>
                    In practice, a business does not connect to Peppol. It connects to one provider, and that
                    provider is connected to every other one.
                </p>
            </GuideSection>

            <GuideSection icon={Network} title="The four-corner model">
                <p>The idea that sets Peppol apart from an ordinary e-invoicing service is that sender and receiver do not need the same provider:</p>
                <Quote cite="OpenPeppol, “About”.">
                    “At the heart of Peppol is the four-corner model, which enables buyers and suppliers to
                    connect via any Peppol-accredited Service Provider. Before Peppol, eProcurement networks
                    were closed) or ‘three-corner’, requiring buyers and suppliers to connect through the same
                    provider.”
                </Quote>
                <p>The four corners, as OpenPeppol's own policies number them:</p>
                <Table
                    head={['Corner', 'Who', 'What it does']}
                    rows={[
                        ['C1', 'The sender', 'The business issuing the invoice, from its own software.'],
                        ['C2', 'The sender’s access point', 'Its provider. Checks the invoice, finds the receiver, sends it.'],
                        ['C3', 'The receiver’s access point', 'The receiver’s provider. Takes delivery.'],
                        ['C4', 'The receiver', 'The business the invoice is for, in its own software.'],
                    ]}
                />
                <p>
                    Only C2 and C3 speak Peppol to each other, using a transport protocol called AS4. The
                    sending side is also responsible for checking what it sends:
                </p>
                <Quote cite="OpenPeppol, “Peppol Interoperability Framework”, Technical model.">
                    “Sending Access Points are required to validate outgoing messages before sending,
                    ensuring compliance with the Peppol Business Interoperability Specifications (Peppol
                    BIS).”
                </Quote>
            </GuideSection>

            <GuideSection icon={Search} title="How the receiver is found">
                <H3>A participant identifier: a scheme, then a value</H3>
                <p>
                    Every receiver on Peppol has an address, called a participant identifier. It is made of a
                    four-digit code naming the identifier scheme, then the identifier itself in that scheme.
                    OpenPeppol's own example uses a French company number:
                </p>
                <Quote cite="Peppol Policy for use of Identifiers, version 4.4.0, Policy 8, example 2.">
                    “numeric value of 0002 meaning that the party has a French SIRENE identifier with the
                    value of 542034942.” The full identifier is written 0002:542034942.
                </Quote>
                <p>
                    Only schemes on OpenPeppol's code list can be used. For the five countries this site
                    covers, the active schemes in version 9.7 of that list, in force since 2 July 2026, are
                    these:
                </p>
                <Table
                    minWidth={600}
                    head={['Country', 'Code', 'Scheme']}
                    rows={[
                        ['France', '0002', 'SIRENE (SIREN or SIRET number)'],
                        ['France', '0009', 'SIRET code'],
                        ['France', '0225', 'FRCTC electronic address'],
                        ['France', '9957', 'French VAT number'],
                        ['Germany', '0204', 'Leitweg-ID, the routing identifier of German public buyers'],
                        ['Germany', '0246', 'German Electronic Business Address'],
                        ['Germany', '9930', 'German VAT number'],
                        ['Italy', '0201', 'Codice Univoco Unità Organizzativa iPA'],
                        ['Italy', '0205', 'Codice destinatario (listed, but cannot be registered as a receiver)'],
                        ['Italy', '0210', 'Codice fiscale'],
                        ['Italy', '0211', 'Partita IVA'],
                        ['Poland', '9945', 'Polish VAT number'],
                        ['Portugal', '9946', 'Portuguese VAT number'],
                    ]}
                />
                <p className="text-sm">
                    Three older Italian schemes (0097, 0135, 0142) are still active but marked for
                    deprecation in the list, and are left out above. Poland and Portugal have no scheme on
                    the list other than their VAT number.
                </p>

                <H3>Two lookups: SML, then SMP</H3>
                <p>Before sending, C2 has to learn where the receiver's provider is, and what the receiver can accept:</p>
                <Quote cite="OpenPeppol, “Peppol Interoperability Framework”, Addressing and Capability Lookup Services.">
                    “C2 connects to the SML to look up the address of the SMP used by C3, and then connects to
                    the SMP used by C3 to look up the capabilities of the receiver.”
                </Quote>
                <List>
                    <li>
                        <Strong>The SML</Strong> (Service Metadata Locator) is the single central registry. It
                        works on the Domain Name System, the way a browser finds a website from its name, and
                        answers one question: which SMP holds this participant.
                    </li>
                    <li>
                        <Strong>The SMP</Strong> (Service Metadata Publisher) is kept by the receiver's
                        provider. It says which documents that receiver accepts, and at which access point.
                        “Each participant identifier is registered with one and only one SMP” (Peppol SML
                        specification 1.3.0, section 2.1).
                    </li>
                </List>
                <p>
                    Only receivers are registered. A business that only sends needs no registration of its
                    own, as the German federal e-invoicing portal puts it: “There is no need for invoice
                    senders to register the Peppol ID with an SMP as long as they only want to send.”
                </p>
                <p>
                    The SML has so far been operated by the European Commission. OpenPeppol presents it as its
                    own service, and a Commission post of 16 May 2026 says the two are “aiming to complete the
                    migration in the second half of 2026”. For a business this changes nothing: the lookup is
                    its provider's job.
                </p>

                <H3>The Peppol Directory is not the address book</H3>
                <p>
                    OpenPeppol also runs a public, searchable directory of participants. It is useful, but it
                    is not complete, and an absence from it proves nothing:
                </p>
                <Quote cite="OpenPeppol, “Peppol Directory”.">
                    “Please note that updating of the Peppol Directory is the responsibility of Peppol SMP
                    service providers and this process is not currently mandatory. Consequently, not every
                    registered Peppol receiver can be found in the Directory.”
                </Quote>
            </GuideSection>

            <GuideSection icon={Landmark} title="Who governs it">
                <p>
                    Providers do not simply switch on an access point. Before offering Peppol services, a
                    provider must have
                </p>
                <Quote cite="OpenPeppol, “Peppol Interoperability Framework”, Peppol Service Provider Agreement.">
                    “signed a Peppol Service Provider Agreement with a Peppol Authority, and successfully
                    completed Peppol Conformance Testing.”
                </Quote>
                <p>
                    The agreement comes with a Peppol certificate, which is what the other access points
                    check, and which can be revoked if the provider breaches the agreement. The provider also
                    has to remain a member of OpenPeppol for as long as the agreement runs (Service Provider
                    Agreement 4.0.2, clause 9.3).
                </p>
                <p>
                    A Peppol Authority governs the network within its country. Where there is none,
                    OpenPeppol plays the part itself. Each of the five countries has one, under these names
                    in OpenPeppol's list:
                </p>
                <Table
                    head={['Country', 'Peppol Authority']}
                    rows={[
                        ['France', 'Directorate General of Public Finances (DGFIP)'],
                        ['Germany', 'Koordinierungsstelle für IT Standards (KoSIT)'],
                        ['Italy', 'Agenzia per l’Italia Digitale (AGID)'],
                        ['Poland', 'Ministry of Economic Development (MRiT)'],
                        ['Portugal', 'Government Shared Services Entity (eSPap)'],
                    ]}
                />
                <p className="text-sm">
                    A Peppol Authority governs the network. It is not the same thing as a rule that obliges
                    anyone to use it: that is the next section.
                </p>
            </GuideSection>

            <GuideSection icon={Coins} title="What it costs">
                <List>
                    <li>
                        <Strong>Joining OpenPeppol is not required to send or receive.</Strong> “End Users are
                        not required to become members of OpenPeppol to send or receive Peppol-based messages”
                        (OpenPeppol, “Join”).
                    </li>
                    <li>
                        <Strong>The provider sets its own price.</Strong> “The Peppol Service Provider shall
                        freely and independently determine its business model and pricing towards the End
                        Users” (Service Provider Agreement 4.0.2, clause 14.5).
                    </li>
                    <li>
                        <Strong>The authority cannot charge for access.</Strong> “The Peppol Authority cannot
                        charge the Peppol Service Providers or End Users for connecting to or using the Peppol
                        Network” (same agreement, clause 14.3).
                    </li>
                </List>
                <p>
                    Running an access point of one's own is possible, but means becoming a provider:
                    membership fees, a certification fee, conformance testing and the agreement above. For a
                    business that only wants to send and receive its own invoices, the usual route is a
                    provider.
                </p>
            </GuideSection>

            <GuideSection icon={Compass} title="Do you need it?">
                <p>
                    Not because the law of any of the five countries says so for invoices between businesses.
                    Each of them either names another channel or names none:
                </p>
                <Table
                    minWidth={620}
                    head={['Country', 'Domestic B2B channel set by law', 'Where Peppol fits']}
                    rows={[
                        [
                            <A href="/facturation-electronique/" lang="fr">
                                France
                            </A>,
                            'An approved platform (plateforme agréée)',
                            'Not the required channel. The obligation is to go through an approved platform.',
                        ],
                        [
                            <A href="/e-rechnung/" lang="de">
                                Germany
                            </A>,
                            'None: only the format is prescribed',
                            'One way among others to deliver a compliant invoice. Accepted by the federal public buyers’ platform (below).',
                        ],
                        [
                            <A href="/fatturazione-elettronica/" lang="it">
                                Italy
                            </A>,
                            'The Sistema di Interscambio (SdI)',
                            'The SdI is the required channel: an invoice issued any other way counts as not issued.',
                        ],
                        [
                            <A href="/ksef/" lang="pl">
                                Poland
                            </A>,
                            'KSeF',
                            'KSeF is the required channel: a structured invoice is issued on the day it is sent to KSeF.',
                        ],
                        [
                            <A href="/faturacao-eletronica/" lang="pt">
                                Portugal
                            </A>,
                            'None: electronic sending needs the recipient’s acceptance',
                            'One possible way to send, if the recipient accepts it.',
                        ],
                    ]}
                />

                <H3>Where you will meet it: German federal public buyers</H3>
                <p>The federal government's invoice portal lists Peppol as a submission channel in its own right:</p>
                <Quote cite="E-Rechnung Bund, FAQ (English), “How does the transmission route via Peppol work through the OZG-RE?”.">
                    “As an additional transmission channel, the OZG-RE provides the option of sending invoices
                    from the originating software through a transmission via the Peppol network.”
                </Quote>
                <p>
                    There, the receiver's Peppol address is the buyer's Leitweg-ID behind the code 0204: “the
                    Peppol receiver ID corresponds to the buyer reference (Leitweg-ID) preceded by the prefix
                    0204 (e.g. 0204:99661-WEBSERVICEOZG-28)”. Which format to send to that buyer, and the
                    other ways to submit it, are on the German page{' '}
                    <A href="/e-rechnung/xrechnung/" lang="de">
                        XRechnung oder ZUGFeRD?
                    </A>
                    .
                </p>

                <H3>So, in short</H3>
                <p>
                    You need Peppol when the business or the public buyer you invoice receives through it, or
                    asks you to send through it. You do not need it to meet the domestic rules of these five
                    countries, which either name another channel or leave the choice to you.
                </p>
            </GuideSection>

            <Closing icon={Landmark} title="One way to use it" cta="Use Invoicerr now" selfHost="or host it yourself, for free">
                Invoicerr is one way to send invoices over Peppol, alongside the national channels it also
                supports: open-source invoicing software that builds the invoice and hands it to the
                network. It is not the only way, and this paragraph does not try to convince you
                otherwise: whatever tool you use, what matters is the provider it connects to and the
                receivers that provider can reach.
            </Closing>

            <Sources
                title="Sources"
                intro="Every claim on this page links to the text that carries it. Checked at these addresses on 24 September 2026."
                sources={[
                    {
                        claim: 'Peppol and OpenPeppol, not a portal, four-corner model, Belgian non-profit, 2008 and 2012',
                        reference: 'OpenPeppol, “About”.',
                        href: 'https://peppol.org/about/',
                    },
                    {
                        claim: 'Access points validate before sending, SML and SMP lookups, conditions to operate as a provider, Peppol Authorities',
                        reference: 'OpenPeppol, “Peppol Interoperability Framework”.',
                        href: 'https://peppol.org/learn-more/peppol-interoperability-framework/',
                    },
                    {
                        claim: 'Corners C1 to C4',
                        reference: 'OpenPeppol, Peppol Network Policy 1.0.0, 2 July 2026, section 1.4.',
                        href: 'https://docs.peppol.eu/edelivery/policies/Peppol%20Network%20Policy%201.0.0%202026-07-02.pdf',
                    },
                    {
                        claim: 'AS4 between corner 2 and corner 3',
                        reference: 'OpenPeppol, Peppol AS4 Profile 2.0.3, section 1.',
                        href: 'https://docs.peppol.eu/edelivery/as4/specification/',
                    },
                    {
                        claim: 'Participant identifiers, scheme and value, the 0002 example, only receivers published',
                        reference: 'OpenPeppol, Policy for use of Identifiers 4.4.0, sections 2.1.1 and 3.2, policies 3 to 8.',
                        href: 'https://docs.peppol.eu/edelivery/policies/Peppol-EDN-Policy-for-use-of-identifiers-4.4.0-2025-02-06.pdf',
                    },
                    {
                        claim: 'Identifier schemes for France, Germany, Italy, Poland and Portugal',
                        reference: 'OpenPeppol, Code Lists, Participant identifier schemes, version 9.7.',
                        href: 'https://docs.peppol.eu/edelivery/codelists/v9.7/Peppol%20Code%20Lists%20-%20Participant%20identifier%20schemes%20v9.7.json',
                    },
                    {
                        claim: 'One SMP per participant, DNS-based lookup',
                        reference: 'OpenPeppol, Service Metadata Locator specification 1.3.0, sections 2 and 2.1.',
                        href: 'https://docs.peppol.eu/edelivery/sml/Peppol-EDN-Service-Metadata-Locator-1.3.0-2025-02-06.pdf',
                    },
                    {
                        claim: 'SML operated by the Commission, migration to OpenPeppol in the second half of 2026',
                        reference: 'European Commission, Digital Building Blocks blog, 16 May 2026.',
                        href: 'https://ec.europa.eu/digital-building-blocks/sites/spaces/DIGITAL/blog/2026/05/16/967115567/Peppol+moves+its+eDelivery+SML+domain+to+an+in-house+service+what+is+changing+and+when',
                    },
                    {
                        claim: 'The Directory is incomplete',
                        reference: 'OpenPeppol, “Peppol Directory”.',
                        href: 'https://peppol.org/tools-support/peppol-directory/',
                    },
                    {
                        claim: 'Peppol Authority for each country',
                        reference: 'OpenPeppol, “Peppol Authorities”.',
                        href: 'https://peppol.org/members/peppol-authorities/',
                    },
                    {
                        claim: 'OpenPeppol membership, pricing, no charge by the authority',
                        reference: 'Peppol Service Provider Agreement 4.0.2, 28 May 2025, clauses 9.3, 14.3 and 14.5.',
                        href: 'https://openpeppol.atlassian.net/wiki/download/attachments/2889089036/PeppolServiceProviderAgreement_v4.0.2%20APPROVED%202025.05.28.pdf?api=v2',
                    },
                    {
                        claim: 'End users need not join OpenPeppol',
                        reference: 'OpenPeppol, “Join”.',
                        href: 'https://peppol.org/join/',
                    },
                    {
                        claim: 'German federal buyers: Peppol as a channel, 0204 plus Leitweg-ID, senders need no SMP registration',
                        reference: 'E-Rechnung Bund, FAQ (English).',
                        href: 'https://e-rechnung-bund.de/en/faq/',
                    },
                ]}
            />
        </>
    )
}
