import { Blocks, CalendarClock, FileCheck2, Landmark, Layers, Ruler } from 'lucide-react'

import { A, Closing, GuideHero, GuideSection, H3, List, Quote, Sources, Strong, Table } from '@/components/guide-parts'

// About the invoice as a document: what the European standard defines, the syntaxes it is written in,
// how national formats narrow or extend it, and who must accept it. How the document travels (access
// points, identifiers, networks) is /e-invoicing/peppol's subject and stays out of this page.
//
// The 2017 edition is the one the Official Journal still cites; CEN published a 2026 edition this
// year. Both facts are stated as their sources state them, including where the two sources disagree
// on a date, rather than rounded into one.
export function En16931Guide() {
    return (
        <>
            <GuideHero title="EN 16931: what makes an electronic invoice compliant">
                EN 16931 is the European standard for electronic invoices. This page explains what it
                defines and what it does not, the two ways it can be written, how national formats build
                on it, who must accept it today, and what changes in 2030. Every statement is quoted from
                the EU texts or the European Commission. No software vendor is compared to another.
            </GuideHero>

            <GuideSection icon={Ruler} title="What the standard is">
                <p>
                    The EU asked for it in Directive 2014/55/EU on electronic invoicing in public procurement,
                    which defines an electronic invoice as one
                </p>
                <Quote cite="Directive 2014/55/EU, Article 2, point (1).">
                    “that has been issued, transmitted and received in a structured electronic format which
                    allows for its automatic and electronic processing”.
                </Quote>
                <p>and rules out the simplest case in its recitals:</p>
                <Quote cite="Directive 2014/55/EU, recital (7).">
                    “A mere image file should not be considered to be an electronic invoice for the purpose of
                    this Directive.”
                </Quote>
                <p>
                    A PDF sent by e-mail, however neat, is therefore not an electronic invoice in this sense.
                    The standard itself was issued by the European Committee for Standardisation (CEN) on 28
                    June 2017, and its reference published in the Official Journal by Commission Implementing
                    Decision (EU) 2017/1870:
                </p>
                <Quote cite="Commission Implementing Decision (EU) 2017/1870, Article 1.">
                    “‘EN 16931-1:2017, Electronic invoicing — Part 1: Semantic data model of the core elements
                    of an electronic invoice’ and the list of syntaxes with reference ‘CEN/TS 16931-2:2017,
                    Electronic invoicing — Part 2: List of syntaxes that comply with EN 16931-1’”
                </Quote>
            </GuideSection>

            <GuideSection icon={Layers} title="A data model, written in one of two syntaxes">
                <H3>The semantic data model</H3>
                <p>
                    The heart of the standard is a list of the information an invoice carries, what each item
                    means, and the rules between them. It does not say how the file is laid out:
                </p>
                <Quote cite="European Commission, “Compliance with eInvoicing standard”.">
                    “The EN does not define the technical structure (syntax) of the electronic invoice but
                    instead uses two international XML message standards to carry the information defined in
                    the core invoice data model.”
                </Quote>

                <H3>The two syntaxes</H3>
                <Table
                    head={['Syntax', 'As the Official Journal names it']}
                    rows={[
                        ['CII', 'UN/CEFACT Cross Industry Invoice XML message, as specified in XML Schemas 16B'],
                        ['UBL', 'UBL invoice and credit note messages as defined in ISO/IEC 19845:2015 (UBL 2.1)'],
                    ]}
                />
                <p className="text-sm">Commission Implementing Decision (EU) 2017/1870, Annex.</p>
                <p>A public buyer in the EU has to accept an invoice in either of the two, as the section on who must accept it shows below.</p>
            </GuideSection>

            <GuideSection icon={Blocks} title="How national formats build on it: CIUS and extensions">
                <p>
                    A country or a sector often needs more precision than the core model, or more data. The
                    standard provides two tools for that, and they are not equally compliant:
                </p>
                <List>
                    <li>
                        <Strong>A CIUS</Strong> (Core Invoice Usage Specification) narrows the core, for example
                        by restricting how its items may be filled in. It stays inside the standard.
                    </li>
                    <li>
                        <Strong>An extension</Strong> adds items the core does not have. It leaves the standard.
                    </li>
                </List>
                <Quote cite="European Commission, “Navigating the eInvoicing standard documentation”.">
                    “Because it is documented within the standard, the use of a CIUS is a compliant
                    implementation of the eInvoicing standard while an extension is not.”
                </Quote>
                <Quote cite="European Commission, “CIUS and Extension, What is allowed”.">
                    “An extended invoice is not compliant to the eInvoicing standard […] The use of extended
                    invoices must be based on bilateral agreement between buyer and seller.”
                </Quote>
                <p>
                    The German XRechnung is a worked example of both. Its publisher describes it as a CIUS
                    and an extension together:
                </p>
                <Quote cite="KoSIT, xeinkauf.de, “XRechnung”.">
                    <span lang="de">„Dabei besteht der Standard XRechnung aus der CIUS XRechnung sowie der Extension XRechnung.“</span>{' '}
                    The XRechnung standard consists of the XRechnung CIUS and the XRechnung extension.
                </Quote>
                <p>
                    Which German format to send to which recipient is a separate, practical question, answered
                    in German on{' '}
                    <A href="/e-rechnung/xrechnung/" lang="de">
                        XRechnung oder ZUGFeRD?
                    </A>
                </p>
            </GuideSection>

            <GuideSection icon={FileCheck2} title="Compliant with the standard is not the same as a valid VAT invoice">
                <p>
                    The standard describes the structure. What an invoice must say for VAT purposes comes from
                    the VAT Directive, Article 226, which opens:
                </p>
                <Quote cite="Council Directive 2006/112/EC, Article 226, consolidated version of 14 April 2025.">
                    “Without prejudice to the particular provisions laid down in this Directive, only the
                    following details are required for VAT purposes on invoices issued pursuant to Articles 220
                    and 221: (1) the date of issue; (2) a sequential number, based on one or more series, which
                    uniquely identifies the invoice; (3) the VAT identification number […]”
                </Quote>
                <p>
                    The two conditions are separate, and from 1 July 2030 the VAT Directive says so in as many
                    words: Member States must ensure that electronic invoices “(a) include the information
                    required by this Directive; and (b) comply with the required technical standards on
                    electronic invoicing” (new Article 218(4), inserted by{' '}
                    <A href="/europe/vida/">Directive (EU) 2025/516</A>). A file can pass every rule of the
                    standard and still be a defective invoice, and the reverse.
                </p>
            </GuideSection>

            <GuideSection icon={CalendarClock} title="Who must accept it, and from when">
                <H3>Public buyers: since 2019</H3>
                <Quote cite="Directive 2014/55/EU, Article 7.">
                    “Member States shall ensure that contracting authorities and contracting entities receive
                    and process electronic invoices which comply with the European standard on electronic
                    invoicing whose reference has been published pursuant to Article 3(2) and with any of the
                    syntaxes on the list published pursuant to Article 3(2).”
                </Quote>
                <p>
                    The deadline for central public buyers is set by the implementing decision: “18 April 2019
                    is the final date for bringing into force of the measures referred to in the first
                    subparagraph of Article 11(2) of Directive 2014/55/EU” (Article 2). Member States could
                    postpone it for sub-central buyers until 30 months after the reference was
                    published (Directive 2014/55/EU, Article 11(2)).
                </p>

                <H3>Businesses: the default from 1 July 2030</H3>
                <p>
                    ViDA makes the standard the default for invoices between businesses across the EU, with
                    room for national standards for domestic supplies:
                </p>
                <Quote cite="Directive 2006/112/EC, Article 218(3), as replaced by Directive (EU) 2025/516, Article 5, point (5).">
                    “Electronic invoices shall comply with the European standard on electronic invoicing and
                    the list of its syntaxes pursuant to Directive 2014/55/EU […]. Member States may allow the
                    use of other standards for electronic invoices relating to supplies of goods and services
                    within their territory, other than those referred to in Article 262 of this Directive.”
                </Quote>
                <p>
                    Of the five countries this site covers, France and Germany already base the formats they
                    accept on it, as their guides set out; Italy and Poland require FatturaPA and FA(3). The{' '}
                    <A href="/europe/e-invoicing-mandates/">table of national mandates</A> shows which format
                    each country requires today.
                </p>

                <H3>What the standard does not decide</H3>
                <List>
                    <li>
                        <Strong>How the invoice travels.</Strong> E-mail, a platform, a national clearance
                        system or a network such as <A href="/e-invoicing/peppol/">Peppol</A>: the standard is
                        silent on the channel.
                    </li>
                    <li>
                        <Strong>Whether it is mandatory.</Strong> That comes from each country's law, and from
                        2030 from the VAT Directive.
                    </li>
                </List>
            </GuideSection>

            <GuideSection icon={Layers} title="The 2026 edition">
                <p>
                    CEN has published a new edition of part 1. Its catalogue lists EN 16931-1:2026 as
                    published, ratified on 13 March 2026 and made available on 18 March 2026, superseding the
                    2017 edition and its amendment, which it lists as withdrawn. Its entry for the Official
                    Journal reads “Citation expected for Directive 2014/55/EU”: the Official Journal still
                    cites the 2017 edition through Implementing Decision (EU) 2017/1870.
                </p>
                <p>
                    The Commission states that the 2017 edition stays usable in the meantime: “The 2017 version
                    will, however, remain compliant during the migration period.” The same Commission page
                    dates the new edition to May 2026, where CEN gives March; this page reports both rather
                    than choose.
                </p>
                <p>
                    The Commission also announces a change of instrument for public procurement: “replacing
                    the current Directive with a Regulation that makes the European standard mandatory for
                    public procurement (Q4 2026)”. That is a plan, not yet a text.
                </p>

                <H3>Reading the standard</H3>
                <p>
                    Parts 1 and 2 of the 2017 edition can be obtained free of charge: “On 18 December 2018,
                    the European Commission and CEN signed a License Agreement allowing cost-free access to the
                    parts 1 and 2 of the eInvoicing standard”. The Commission marks that page as under review,
                    and does not say whether the arrangement covers the 2026 edition. The other parts are sold
                    by the national standards bodies.
                </p>
            </GuideSection>

            <Closing icon={Landmark} title="One way to produce it" cta="Use Invoicerr now" selfHost="or host it yourself, for free">
                Invoicerr is one way to produce invoices on this standard: open-source invoicing software
                that builds Factur-X, XRechnung, ZUGFeRD, UBL and CII invoices. It is not the only way, and
                this paragraph does not try to convince you otherwise: whatever tool you use, the test is
                whether its output passes the standard's rules and carries the VAT particulars.
            </Closing>

            <Sources
                title="Sources"
                intro="Every claim on this page links to the text that carries it. Checked at these addresses on 24 September 2026."
                sources={[
                    {
                        claim: 'Definition of an electronic invoice, image files excluded, obligation of public buyers, transposition',
                        reference: 'Directive 2014/55/EU of 16 April 2014, Articles 2, 3, 7 and 11, recital (7).',
                        href: 'https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32014L0055',
                    },
                    {
                        claim: 'Reference of EN 16931-1:2017 and CEN/TS 16931-2:2017, the two syntaxes, 18 April 2019',
                        reference: 'Commission Implementing Decision (EU) 2017/1870 of 16 October 2017, Articles 1 and 2, Annex, recital (3).',
                        href: 'https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32017D1870',
                    },
                    {
                        claim: 'Mandatory particulars of an invoice',
                        reference: 'Council Directive 2006/112/EC, Article 226, consolidated version of 14 April 2025.',
                        href: 'https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:02006L0112-20250414',
                    },
                    {
                        claim: 'EN 16931 as the default from 1 July 2030, new Article 218(3) and (4)',
                        reference: 'Council Directive (EU) 2025/516, Article 5, point (5), and Article 6(5).',
                        href: 'https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32025L0516',
                    },
                    {
                        claim: 'The standard does not define the syntax; UBL 2.1 and CII',
                        reference: 'European Commission, Digital Building Blocks, “Compliance with eInvoicing standard”.',
                        href: 'https://ec.europa.eu/digital-building-blocks/sites/spaces/DIGITAL/pages/467108926/Compliance+with+eInvoicing+standard',
                    },
                    {
                        claim: 'CIUS compliant, extension not',
                        reference: 'European Commission, “Navigating the eInvoicing standard documentation” and “CIUS and Extension, What is allowed”.',
                        href: 'https://ec.europa.eu/digital-building-blocks/sites/spaces/DIGITAL/pages/467108937/CIUS+and+Extension+-+What+is+allowed',
                    },
                    {
                        claim: 'XRechnung as CIUS and extension',
                        reference: 'KoSIT, “XRechnung”.',
                        href: 'https://xeinkauf.de/xrechnung/',
                    },
                    {
                        claim: 'EN 16931-1:2026: dates, 2017 edition withdrawn, OJ citation expected',
                        reference: 'CEN, project page for EN 16931-1:2026.',
                        href: 'https://standards.cencenelec.eu/ords/f?p=CEN:110:::::FSP_PROJECT,FSP_ORG_ID:79850,1883209&cs=1C2B8A12D2A09619B007DB1E98A5B7AB1',
                    },
                    {
                        claim: '2017 edition compliant during migration, free access to parts 1 and 2',
                        reference: 'European Commission, “Obtaining a copy of the European standard on eInvoicing”.',
                        href: 'https://ec.europa.eu/digital-building-blocks/sites/spaces/DIGITAL/pages/467108971/Obtaining+a+copy+of+the+European+standard+on+eInvoicing',
                    },
                    {
                        claim: 'Planned regulation replacing Directive 2014/55/EU',
                        reference: 'European Commission, Digital Building Blocks, “eInvoicing”.',
                        href: 'https://ec.europa.eu/digital-building-blocks/sites/spaces/DIGITAL/pages/467108637/eInvoicing',
                    },
                ]}
            />
        </>
    )
}
