import { CalendarClock, FileText, Globe, Landmark, Radar, Scale } from 'lucide-react'

import { A, Closing, GuideHero, GuideSection, H3, List, Quote, Sources, Strong, Table } from '@/components/guide-parts'

// Read from the text of Council Directive (EU) 2025/516 itself, article by article, not from a summary
// of it. Only its invoicing and reporting provisions are covered: Article 1 points 2 and 3 (in force
// now) and Article 5 (1 July 2030). Articles 2 to 4 amend other parts of the VAT Directive and are
// named but not described, because nobody behind this page has read them closely enough to.
//
// The words "without authorisation" or "without derogation" appear nowhere in the directive, and so
// they appear nowhere here either: the page quotes what the new paragraphs of Articles 218 and 232
// actually say.
export function VidaGuide() {
    return (
        <>
            <GuideHero title="ViDA: what VAT in the Digital Age changes for invoices, and when">
                VAT in the Digital Age, ViDA for short, is an EU directive that rewrites the VAT
                Directive's rules on invoices in two steps: one already in force, one on 1 July 2030. This
                page reads the directive itself, quotes the articles, and gives the date each one applies
                from. No software vendor is compared to another.
            </GuideHero>

            <GuideSection icon={FileText} title="The text">
                <p>
                    ViDA is Council Directive (EU) 2025/516 of 11 March 2025 amending Directive 2006/112/EC
                    as regards VAT rules for the digital age, published in the Official Journal on 25 March
                    2025. It entered into force twenty days later (Article 7), on 14 April 2025.
                </p>
                <p>
                    It is a directive, not a regulation: it binds the Member States, which then change their
                    own law. A business is bound by its country's transposition, not by the directive
                    directly. The directive sets the latest date by which that must happen.
                </p>
                <p>Its amending articles are grouped by the date they take effect:</p>
                <Table
                    head={['Article', 'Takes effect', 'What this page says about it']}
                    rows={[
                        ['Article 1', 'Entry into force; points 2 and 3 may be applied from 14 April 2025', 'Domestic e-invoicing, below.'],
                        ['Article 2', '1 January 2027', 'Other VAT rules; not covered here.'],
                        ['Article 3', '1 July 2028', 'Other VAT rules; not covered here.'],
                        ['Article 4', '1 July 2029', 'Other VAT rules; not covered here.'],
                        ['Article 5', '1 July 2030', 'Invoices and reporting, below.'],
                    ]}
                />
                <p className="text-sm">Dates from Article 6 (transposition) and Article 7 (entry into force) of Directive (EU) 2025/516.</p>
            </GuideSection>

            <GuideSection icon={CalendarClock} title="Already in force: a Member State may require e-invoices at home">
                <p>
                    Until ViDA, the VAT Directive left an electronic invoice to the recipient's acceptance. A
                    country that wanted to make e-invoicing mandatory needed an exception to that rule. Two
                    paragraphs added by Article 1 of ViDA changed this, and Member States may apply them since
                    14 April 2025 (Article 6(1)).
                </p>
                <Quote cite="Directive 2006/112/EC, Article 218, second paragraph, added by Directive (EU) 2025/516, Article 1, point (2).">
                    “By way of derogation from the first paragraph of this Article, Member States may, in
                    accordance with the conditions they lay down, require taxable persons established within
                    their territory to issue electronic invoices for supplies of goods and services within
                    their territory, other than those referred to in Article 262.”
                </Quote>
                <Quote cite="Directive 2006/112/EC, Article 232, second paragraph, added by Directive (EU) 2025/516, Article 1, point (3).">
                    “By way of derogation from the first paragraph of this Article, Member States which
                    exercise the option set out in Article 218, second paragraph, may provide that the use of
                    electronic invoices issued by taxable persons established within their territory is not to
                    be subject to the acceptance of the recipient established in their territory.”
                </Quote>
                <p>Two limits sit in the wording itself:</p>
                <List>
                    <li>
                        <Strong>Domestic only.</Strong> The option covers supplies within the Member State's
                        territory, and excludes those referred to in Article 262, which are the intra-EU
                        transactions.
                    </li>
                    <li>
                        <Strong>An option, not an obligation.</Strong> Nothing in these two paragraphs requires a
                        Member State to use it. Whether and when a business must e-invoice at home still comes
                        from its national law.
                    </li>
                </List>
                <p>
                    Of the five countries this site covers, what each one currently requires is in the{' '}
                    <A href="/europe/e-invoicing-mandates/">table of national mandates</A>.
                </p>
            </GuideSection>

            <GuideSection icon={Scale} title="From 1 July 2030: the invoice itself changes">
                <p>
                    Article 5 rewrites the invoicing chapter of the VAT Directive. Member States must apply it
                    from 1 July 2030 (Article 6(5)).
                </p>

                <H3>An electronic invoice means a structured one</H3>
                <p>The current definition accepts any electronic format:</p>
                <Quote cite="Directive 2006/112/EC, Article 217, as in force until 30 June 2030.">
                    “‘electronic invoice’ means an invoice that contains the information required in this
                    Directive, and which has been issued and received in any electronic format.”
                </Quote>
                <p>The new one does not:</p>
                <Quote cite="Directive 2006/112/EC, Article 217, as replaced by Directive (EU) 2025/516, Article 5, point (4).">
                    “‘electronic invoice’ means an invoice that contains the information required by this
                    Directive, and which, at least in relation to the data referred to in Articles 262 and
                    271b, has been issued, transmitted and received in a structured electronic format which
                    allows for its automated and electronic processing.”
                </Quote>
                <p>
                    A PDF alone will no longer be an electronic invoice in the sense of the directive. A PDF
                    carrying structured data can be, if the structured part holds everything that must be
                    reported:
                </p>
                <Quote cite="Directive (EU) 2025/516, recital (9).">
                    “hybrid invoices combining data embedded in a structured format and data embedded in an
                    unstructured, human-readable format should be covered by the definition if such invoices
                    include all the data to be reported in a structured format.”
                </Quote>

                <H3>E-invoices become the rule, to the European standard</H3>
                <Quote cite="Directive 2006/112/EC, Article 218(2) and (3), as replaced by Directive (EU) 2025/516, Article 5, point (5).">
                    “For the purposes of this Directive, invoices shall be issued as electronic invoices.
                    However, Member States may accept documents or messages on paper or in electronic formats
                    other than electronic invoices for transactions not subject to the reporting obligations
                    laid down in Chapter 6.” […] “Electronic invoices shall comply with the European standard
                    on electronic invoicing and the list of its syntaxes pursuant to Directive 2014/55/EU […].
                    Member States may allow the use of other standards for electronic invoices relating to
                    supplies of goods and services within their territory, other than those referred to in
                    Article 262 of this Directive.”
                </Quote>
                <p>
                    That standard is EN 16931. What it contains, and what a national format adds to it:{' '}
                    <A href="/e-invoicing/en-16931/">EN 16931</A>.
                </p>

                <H3>Acceptance by the recipient ends for standard invoices</H3>
                <Quote cite="Directive 2006/112/EC, Article 232, as replaced by Directive (EU) 2025/516, Article 5, point (9).">
                    “The issuance, to a taxable person or a non-taxable legal person, of an electronic invoice
                    which complies with the European standard on electronic invoicing and the list of its
                    syntaxes pursuant to Directive 2014/55/EU shall not be subject to acceptance by the
                    recipient.”
                </Quote>
                <p>
                    An invoice in another standard, or in a format that is not an electronic invoice, still
                    needs the recipient's acceptance under the same article, subject to the options it leaves
                    to Member States.
                </p>

                <H3>Ten days to invoice an intra-EU supply</H3>
                <Table
                    minWidth={620}
                    head={['', 'Until 30 June 2030', 'From 1 July 2030']}
                    rows={[
                        [
                            'Intra-EU supply of goods, or reverse-charge supply (Article 222)',
                            'No later than the 15th day of the month following the chargeable event',
                            'No later than 10 days following the chargeable event',
                        ],
                        [
                            'Summary invoice for those supplies (Article 223)',
                            'Member States may allow one to cover a period longer than one calendar month',
                            'No later than 10 days following the end of the calendar month it covers; Member States may exclude it in fraud-sensitive sectors',
                        ],
                    ]}
                />

                <H3>Two new mandatory particulars</H3>
                <p>
                    Article 226, the list of what an invoice must contain, gains two points: for a corrective
                    invoice, the sequential number of the invoice it corrects (point 16), and the supplier's
                    bank account numbers, virtual account numbers or other identifiers of the accounts into which the invoice can be paid (point 17).
                </p>
            </GuideSection>

            <GuideSection icon={Radar} title="From 1 July 2030: intra-EU transactions are reported, one by one">
                <p>
                    For intra-EU supplies and acquisitions, the invoice data goes to the tax authority
                    transaction by transaction, replacing the periodic recapitulative statement.
                </p>
                <Quote cite="Directive 2006/112/EC, Article 262(1), as replaced by Directive (EU) 2025/516, Article 5, point (15).">
                    “Every taxable person identified for VAT purposes shall submit the data referred to in
                    Article 264 in respect of the following transactions: (a) supplies and transfers of goods
                    carried out in accordance with Article 138(1) and Article 138(2), point (c); (b)
                    intra-Community acquisitions […]”
                </Quote>
                <List>
                    <li>
                        The supplier transmits the data “at the time when the invoice is issued or should have
                        been issued” (Article 263(1)).
                    </li>
                    <li>The acquirer transmits “no later than 5 days after the invoice is received” (Article 263(2)).</li>
                    <li>“Articles 265 to 271 are deleted”: the recapitulative statement goes (Article 5, point (18)).</li>
                </List>
                <p>
                    Member States may also require domestic transactions to be reported, under new Articles
                    271a and 271b; they must then accept data taken from invoices that follow the European
                    standard.
                </p>
            </GuideSection>

            <GuideSection icon={Globe} title="Until 2035: the national systems already in place">
                <p>
                    Countries that already ran a real-time domestic reporting system before 2024 are given
                    longer to bring it into line with the EU model:
                </p>
                <Quote cite="Directive (EU) 2025/516, Article 6(5), third subparagraph.">
                    “Member States having a domestic digital real-time transaction-based reporting obligation
                    in place on 1 January 2024 or having been granted an authorisation on the basis of Article
                    395 before 1 January 2024 allowing them to put such an obligation in place, or where such
                    authorisation was not necessary, having adopted national legislation before 1 January 2024
                    providing for the introduction of such a domestic digital real-time transaction-based
                    reporting obligation, shall apply the measures regarding Article 5, point (5), related to
                    Article 218, and the measures regarding Article 5, point (19), related to Articles 271a and
                    271b, by 1 January 2035, in so far as domestic electronic invoicing and reporting are
                    concerned.”
                </Quote>
                <p>
                    The same subparagraph lets the Commission propose a later deadline if its interim
                    evaluation report, due by 31 March 2033 under new Article 271c, finds shortcomings. The
                    directive does not list which Member States fall under this paragraph, and this page does
                    not guess.
                </p>
            </GuideSection>

            <GuideSection icon={CalendarClock} title="The dates, in one place">
                <Table
                    head={['Date', 'What happens', 'Where']}
                    rows={[
                        ['25 March 2025', 'Published in the Official Journal', 'OJ L, 2025/516'],
                        ['14 April 2025', 'In force. Member States may require domestic e-invoices, without the recipient’s acceptance', 'Art. 7; Art. 6(1); Art. 1, points 2 and 3'],
                        ['30 June 2030', 'Latest date to adopt and publish the national law for Article 5', 'Art. 6(5)'],
                        ['1 July 2030', 'Structured e-invoice by default, EN 16931, 10-day deadline, intra-EU reporting per transaction', 'Art. 5; Art. 6(5)'],
                        ['31 March 2033', 'Commission interim evaluation report', 'New Art. 271c'],
                        ['1 January 2035', 'Latest date for pre-2024 national real-time systems to converge', 'Art. 6(5), third subparagraph'],
                    ]}
                />
            </GuideSection>

            <Closing icon={Landmark} title="One way to prepare" cta="Use Invoicerr now" selfHost="or host it yourself, for free">
                Invoicerr is one way to prepare for this: open-source invoicing software that already
                builds structured invoices on the European standard (Factur-X, XRechnung, ZUGFeRD, UBL and
                CII) alongside the national formats of Italy and Poland. It is not the only way, and this
                paragraph does not try to convince you otherwise: the dates above apply whatever tool you
                use.
            </Closing>

            <Sources
                title="Sources"
                intro="Every claim on this page links to the text that carries it. Checked at these addresses on 24 September 2026."
                sources={[
                    {
                        claim: 'Directive (EU) 2025/516: all articles and recitals quoted above',
                        reference: 'Council Directive (EU) 2025/516 of 11 March 2025, OJ L, 2025/516, 25.3.2025.',
                        href: 'https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32025L0516',
                    },
                    {
                        claim: 'Publication and entry into force dates',
                        reference: 'EUR-Lex, document information for CELEX 32025L0516 (date of effect 14/04/2025).',
                        href: 'https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX:32025L0516',
                    },
                    {
                        claim: 'Articles 217, 222, 223 and 232 as in force until 30 June 2030',
                        reference: 'Council Directive 2006/112/EC, consolidated version of 14 April 2025.',
                        href: 'https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:02006L0112-20250414',
                    },
                    {
                        claim: 'The Commission’s own timeline',
                        reference: 'European Commission, Taxation and Customs Union, “VAT in the Digital Age (ViDA)”.',
                        href: 'https://taxation-customs.ec.europa.eu/taxation/vat/vat-digital-age-vida_en',
                    },
                ]}
            />
        </>
    )
}
