import { CalendarClock, Globe, Landmark, Network, Scale } from 'lucide-react'

import { A, Closing, GuideHero, GuideSection, H3, List, Quote, Sources, Strong, Table } from '@/components/guide-parts'

// The hub the country guides hang from. It restates, side by side, what each of the five guides
// establishes in its own language, and adds only the EU layer above them. Every national fact below
// is the one its guide already cites, to the same text; nothing here is a sixth country's law.
//
// Deliberately limited to France, Germany, Italy, Poland and Portugal, the five countries the product
// implements. Other Member States have mandates of their own; this page says so and stops there,
// rather than publish rules nobody behind this site has read at the source.
export function EInvoicingMandatesEu() {
    return (
        <>
            <GuideHero title="E-invoicing mandates in France, Germany, Italy, Poland and Portugal">
                Which of the five countries requires what, from which date, and through which channel,
                read from each country's law and tax administration. One table first, then what the table
                cannot show: the three different ideas of what an obligation to e-invoice means, and the
                EU rules above them. No software vendor is compared to another.
            </GuideHero>

            <GuideSection icon={CalendarClock} title="The five countries at a glance">
                <p>
                    Domestic business-to-business invoices only, as of 24 September 2026. Each row is a
                    summary of the country guide it links to, where every date is quoted from the text that
                    sets it.
                </p>
                <Table
                    minWidth={720}
                    head={['Country', 'What is mandatory', 'From when', 'Through what']}
                    rows={[
                        [
                            <A href="/facturation-electronique/" lang="fr">
                                France
                            </A>,
                            'Receiving electronic invoices, for every company. Issuing them, by company size.',
                            <>
                                Receiving: 1 September 2026, all companies.
                                <br />
                                Issuing: 1 September 2026 for large companies and ETIs, 1 September 2027 for
                                SMEs and micro-enterprises.
                            </>,
                            'An approved platform (plateforme agréée). Formats: Factur-X, UBL or CII.',
                        ],
                        [
                            <A href="/e-rechnung/" lang="de">
                                Germany
                            </A>,
                            'Issuing and receiving a structured electronic invoice.',
                            <>
                                Receiving: since 1 January 2025.
                                <br />
                                Issuing: paper or other formats remain allowed for supplies up to the end of
                                2026, and up to the end of 2027 for companies with a prior-year turnover of
                                at most €800,000 or on EDI. Mandatory for every covered supply from 1
                                January 2028.
                            </>,
                            'No channel prescribed. Formats conforming to EN 16931, such as XRechnung or ZUGFeRD.',
                        ],
                        [
                            <A href="/fatturazione-elettronica/" lang="it">
                                Italy
                            </A>,
                            'Issuing every invoice between parties established in Italy electronically, consumers included.',
                            <>
                                1 January 2019.
                                <br />
                                Flat-rate regime (forfettario): 1 July 2022 above €25,000 of revenue, 1
                                January 2024 for all others.
                            </>,
                            'The Sistema di Interscambio (SdI), in the FatturaPA format.',
                        ],
                        [
                            <A href="/ksef/" lang="pl">
                                Poland
                            </A>,
                            'Issuing structured invoices through the national system, KSeF.',
                            <>
                                1 February 2026 for taxpayers whose 2024 sales, VAT included, exceeded PLN 200
                                million; 1 April 2026 for all others.
                                <br />
                                Until 31 December 2026, invoices outside KSeF remain allowed up to PLN 10,000
                                a month.
                            </>,
                            'KSeF, in the FA(3) structure.',
                        ],
                        [
                            <A href="/faturacao-eletronica/" lang="pt">
                                Portugal
                            </A>,
                            'No obligation to send the invoice electronically between businesses. Mandatory: the ATCUD code on every invoice, certified software above a threshold, and a monthly report of invoice data.',
                            <>
                                ATCUD: 1 January 2023.
                                <br />
                                Certified software: above €50,000 of prior-year turnover, among other
                                conditions.
                                <br />
                                Monthly report: by the 5th of the following month.
                            </>,
                            'The tax authority (AT), by SAF-T (PT) file, real-time transmission or the tax portal.',
                        ],
                    ]}
                />
                <p className="text-sm">
                    The table covers invoices between businesses. Invoices to public bodies follow rules
                    of their own, which the French and German guides point out, and invoices to consumers
                    are outside the mandate in every country here except Italy, whose rule makes no
                    difference between a business and a consumer.
                </p>
            </GuideSection>

            <GuideSection icon={Scale} title="Three different ideas of what the obligation is">
                <p>
                    The table puts five rules in one grid, which hides how differently they work. The
                    question each country answers is not the same one.
                </p>

                <H3>The state system is where the invoice comes into existence: Italy and Poland</H3>
                <p>
                    In Italy and in Poland the invoice legally exists only once it has gone through the
                    national system. Italy's decree says that an invoice issued any other way between
                    parties established in Italy
                </p>
                <Quote cite="Decreto legislativo 5 agosto 2015, n. 127, art. 1, comma 6.">
                    <span lang="it">«si intende non emessa»</span>, that is, is treated as not issued.
                </Quote>
                <p>Poland's VAT act fixes the date of issue at the moment of transmission:</p>
                <Quote cite="Ustawa o podatku od towarów i usług, art. 106na ust. 1.">
                    <span lang="pl">„Fakturę ustrukturyzowaną uznaje się za wystawioną w dniu jej przesłania do Krajowego Systemu e-Faktur.”</span>{' '}
                    A structured invoice is considered issued on the day it is sent to KSeF.
                </Quote>

                <H3>A platform of the company's choice carries it: France</H3>
                <p>
                    France does not route invoices through the state. It requires a private platform,
                    approved by the tax administration, chosen and paid for by the company:
                </p>
                <Quote cite="Code général des impôts, art. 289 bis, I.">
                    <span lang="fr">« L'émission, la transmission et la réception des factures électroniques s'effectuent en recourant à une plateforme agréée. »</span>{' '}
                    Issuing, transmitting and receiving electronic invoices is done through an approved
                    platform.
                </Quote>
                <p>
                    What that means for a company in practice, and how to check that a platform is
                    approved, is on its own page:{' '}
                    <A href="/facturation-electronique/plateforme-agreee/" lang="fr">
                        choisir sa plateforme agréée
                    </A>{' '}
                    (in French).
                </p>

                <H3>Only the format is prescribed: Germany</H3>
                <p>
                    German law defines an electronic invoice by its structure, and says nothing about how
                    it travels:
                </p>
                <Quote cite="Umsatzsteuergesetz, § 14 Absatz 1 Satz 3.">
                    <span lang="de">„Eine elektronische Rechnung ist eine Rechnung, die in einem strukturierten elektronischen Format ausgestellt, übermittelt und empfangen wird und eine elektronische Verarbeitung ermöglicht.“</span>{' '}
                    An electronic invoice is one issued, transmitted and received in a structured
                    electronic format that allows electronic processing.
                </Quote>
                <p>
                    E-mail, a customer portal or EDI all remain possible. Which of the two common formats
                    to send, and when a public buyer's routing identifier is needed, is on its own page:{' '}
                    <A href="/e-rechnung/xrechnung/" lang="de">
                        XRechnung oder ZUGFeRD?
                    </A>{' '}
                    (in German).
                </p>

                <H3>The data is reported, the invoice is not cleared: Portugal</H3>
                <p>
                    Portugal leaves electronic sending to the recipient's acceptance, and puts the
                    obligation on the software and on the data sent to the tax authority instead:
                </p>
                <Quote cite="Decreto-Lei n.º 28/2019, de 15 de fevereiro, art. 12.º, n.º 1.">
                    <span lang="pt">«As faturas e demais documentos fiscalmente relevantes podem, mediante aceitação pelo destinatário, ser emitidos por via eletrónica.»</span>{' '}
                    Invoices may be issued electronically, subject to the recipient's acceptance.
                </Quote>
            </GuideSection>

            <GuideSection icon={Globe} title="The EU rules above the five">
                <H3>Public buyers: EN 16931, everywhere, already</H3>
                <p>
                    Since Directive 2014/55/EU, every public buyer in the EU must accept an electronic
                    invoice that follows the European standard:
                </p>
                <Quote cite="Directive 2014/55/EU, Article 7.">
                    “Member States shall ensure that contracting authorities and contracting entities
                    receive and process electronic invoices which comply with the European standard on
                    electronic invoicing whose reference has been published pursuant to Article 3(2) and
                    with any of the syntaxes on the list published pursuant to Article 3(2).”
                </Quote>
                <p>
                    That standard is EN 16931, and the French and German formats in the table above are
                    built on it, as their two guides set out. What it defines, and what it leaves to each
                    country:{' '}
                    <A href="/e-invoicing/en-16931/">EN 16931, the European invoice standard</A>.
                </p>

                <H3>Between businesses: ViDA</H3>
                <p>
                    The VAT in the Digital Age package, Council Directive (EU) 2025/516, changes the frame
                    the five national rules sit in: what a Member State may impose at home without asking
                    Brussels first, and what every business will have to do for invoices to another
                    Member State. The dates and the articles:{' '}
                    <A href="/europe/vida/">ViDA, VAT in the Digital Age</A>.
                </p>

                <H3>The network some of them use: Peppol</H3>
                <p>
                    None of the five countries' B2B rules names Peppol as the required channel. It appears
                    beside them, as a network public buyers and businesses use to exchange invoices.
                    What it is, and whether a business needs it:{' '}
                    <A href="/e-invoicing/peppol/">Peppol, the network</A>.
                </p>
            </GuideSection>

            <GuideSection icon={Network} title="What this page does not cover">
                <List>
                    <li>
                        <Strong>Other Member States.</Strong> Several have mandates of their own, in force or
                        announced. This site covers the five countries above and nothing else; for any other
                        country, the only reliable source is its own tax administration.
                    </li>
                    <li>
                        <Strong>Tax advice.</Strong> Each rule here is quoted from its text, with a link. Whether
                        and how it applies to a particular business is a question for that business's
                        adviser.
                    </li>
                </List>
            </GuideSection>

            <Closing
                icon={Landmark}
                title="One way to meet them"
                cta="Use Invoicerr now"
                selfHost="or host it yourself, for free"
            >
                Invoicerr is one way to meet these five sets of rules: open-source invoicing software that
                builds Factur-X, XRechnung, ZUGFeRD, FatturaPA, FA(3), UBL and CII invoices, and sends them
                through a French approved platform, Chorus Pro, the SdI, KSeF or Peppol. It is not the
                only way, and this paragraph does not try to convince you otherwise: the questions each
                country guide asks apply to any tool, this one included.
            </Closing>

            <Sources
                title="Sources"
                intro="Every national fact on this page is the one its country guide quotes, and links to the same text. Checked at these addresses on 24 September 2026, except where the note on a line says otherwise."
                sources={[
                    {
                        claim: 'France: approved platform, dates of the obligation',
                        reference:
                            'Code général des impôts, art. 289 bis, I; DGFiP, practical guide to e-invoicing at 1 September 2026 (PDF).',
                        href: 'https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/guide_pratique_facturation_electronique.pdf',
                    },
                    {
                        claim: 'Germany: definition of an electronic invoice, no prescribed channel',
                        reference: 'Umsatzsteuergesetz, § 14 Absatz 1 Satz 3 und Absatz 2 Satz 2 Nummer 1.',
                        href: 'https://www.gesetze-im-internet.de/ustg_1980/__14.html',
                    },
                    {
                        claim: 'Germany: transition to 2028, €800,000 threshold, EDI',
                        reference: 'Umsatzsteuergesetz, § 27 Absatz 38.',
                        href: 'https://www.gesetze-im-internet.de/ustg_1980/__27.html',
                    },
                    {
                        claim: 'Italy: SdI obligation, invoice treated as not issued, 2019 start',
                        reference:
                            'Decreto legislativo 5 agosto 2015, n. 127, art. 1, commi 3 e 6; legge 27 dicembre 2017, n. 205, art. 1, comma 916. Not re-read on 24 September 2026: Normattiva serves article text only to a full browser. Quoted as the Italian guide read it on 23 September 2026.',
                        href: 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2015-08-05;127~art1',
                    },
                    {
                        claim: 'Italy: flat-rate regime, 2022 and 2024',
                        reference: 'Decreto-legge 30 aprile 2022, n. 36, art. 18, comma 3. Same note as the line above.',
                        href: 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto-legge:2022-04-30;36',
                    },
                    {
                        claim: 'Poland: dates, PLN 200 million threshold, PLN 10,000 relief',
                        reference: 'Ministry of Finance, KSeF portal, “Od kiedy trzeba wystawiać faktury w KSeF”; VAT act, art. 145l and 145m.',
                        href: 'https://ksef.podatki.gov.pl/od-kiedy-trzeba-wystawiac-faktury-w-ksef/',
                    },
                    {
                        claim: 'Poland: invoice issued on the day it is sent to KSeF',
                        reference: 'Ustawa o podatku od towarów i usług, tekst jednolity Dz.U. 2025 poz. 775, art. 106na ust. 1.',
                        href: 'https://api.sejm.gov.pl/eli/acts/DU/2025/775/text.pdf',
                    },
                    {
                        claim: 'Portugal: electronic issuance subject to acceptance, certified software above €50,000',
                        reference: 'Decreto-Lei n.º 28/2019, de 15 de fevereiro, art. 4.º e art. 12.º.',
                        href: 'https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/legislacao/diplomas_legislativos/Documents/Decreto_Lei_28_2019.pdf',
                    },
                    {
                        claim: 'Portugal: ATCUD mandatory from 1 January 2023',
                        reference: 'Despacho n.º 351/2021-XXII, de 10 de novembro de 2021, alínea e).',
                        href: 'https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/legislacao/Despachos_SEAF/Documents/Despacho_SEAAF_351_2021_XXII.pdf',
                    },
                    {
                        claim: 'Portugal: monthly report by the 5th',
                        reference: 'Decreto-Lei n.º 198/2012, de 24 de agosto, art. 3.º.',
                        href: 'https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1782&tabela=leis',
                    },
                    {
                        claim: 'EU: public buyers must accept invoices conforming to the European standard',
                        reference: 'Directive 2014/55/EU of the European Parliament and of the Council, Article 7.',
                        href: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32014L0055',
                    },
                ]}
            />
        </>
    )
}
