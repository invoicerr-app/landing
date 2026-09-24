import { ArrowRight, CalendarClock, CircleCheck, FileText, Landmark, ShieldCheck } from 'lucide-react'

import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'
import { links } from '@/lib/links'

// Second of three planned content pages (see e-invoicing-guide-fr.tsx for the first). Explicitly not
// a product page: it teaches the reform as it is written in the UStG/AO and published by the German
// tax authorities, and names no competitor anywhere. Invoicerr appears exactly once, in the closing
// section, as one way to meet the obligation rather than as the point of the page. Every legal or
// administrative claim below carries its own citation; the PR that introduced this file lists them
// again in one place, in English, for a non-technical reviewer who does not read German to check one
// by one.
//
// German only: this page is written for a German business owner reading about a German law, so like
// e-invoicing-guide-fr.tsx it does not get an English variant.
export function EInvoicingGuideDe() {
    return (
        <>
            <section className="mx-auto max-w-3xl px-5 pb-4 pt-28 sm:pt-36">
                <h1 className="enter text-balance text-4xl font-semibold tracking-tight [animation-delay:90ms] sm:text-5xl">
                    E-Rechnung in Deutschland: Wer ist betroffen, und ab wann
                </h1>
                <p className="enter mt-6 text-pretty text-lg leading-relaxed text-muted-foreground [animation-delay:180ms]">
                    Dieser Text erklärt die Reform so, wie sie im Umsatzsteuergesetz steht und von den
                    Finanzbehörden angewendet wird: wer sie erfüllen muss, ab welchem Datum, was sich beim
                    Versand einer Rechnung konkret ändert, und was vor der Wahl eines Werkzeugs zu prüfen
                    ist. Kein Softwareanbieter wird hier mit einem anderen verglichen.
                </p>
            </section>

            <section className="mx-auto max-w-3xl px-5 py-12">
                <Reveal>
                    <h2 className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight">
                        <FileText className="size-6 shrink-0 text-primary" aria-hidden="true" />
                        Wer ist betroffen
                    </h2>
                    <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
                        <p>
                            Die Reform betrifft inländische B2B-Umsätze: eine Lieferung oder sonstige
                            Leistung eines Unternehmers an einen anderen Unternehmer für dessen Unternehmen,
                            wenn beide im Inland oder in einem der nach § 1 Absatz 3 UStG gleichgestellten
                            Gebiete ansässig sind. Sie gilt nicht für den Verkauf an Privatpersonen (B2C) und
                            nicht für grenzüberschreitende Umsätze.
                        </p>
                        <p>Zwei unterschiedliche Pflichten, die nicht zu verwechseln sind:</p>
                        <ul className="ml-1 list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
                            <li>
                                <strong className="font-medium text-foreground">Empfangen</strong> zu können
                                betrifft praktisch jedes betroffene Unternehmen unabhängig von seiner Größe:
                                Sobald für inländische B2B-Umsätze eine Pflicht nach § 14 Absatz 2 Satz 2
                                Nummer 1 UStG besteht, entfällt die Zustimmung des Empfängers zur
                                elektronischen Übermittlung (§ 14 Absatz 1 Satz 5 UStG); das genaue Datum
                                steht im nächsten Abschnitt.
                            </li>
                            <li>
                                <strong className="font-medium text-foreground">Ausstellen</strong> zu müssen
                                betrifft Unternehmer, die andere Unternehmer im Inland beliefern; ab wann
                                diese Pflicht für ein konkretes Unternehmen gilt, hängt von einer
                                Übergangsregelung ab, die bis Ende 2027 läuft (nächster Abschnitt).
                            </li>
                        </ul>
                        <p>
                            Rechnungen an die öffentliche Hand (B2G) folgen einer eigenen, bereits seit
                            Längerem geltenden Regel über die Plattformen ZRE und OZG-RE im Format
                            XRechnung; dieser Leitfaden behandelt die B2B-Reform, nicht diese gesonderte
                            Pflicht.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="mx-auto max-w-3xl px-5 py-12">
                <Reveal>
                    <h2 className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight">
                        <CalendarClock className="size-6 shrink-0 text-primary" aria-hidden="true" />Ab wann
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                        Zwei Zeitpläne, nicht einer: der Empfang ist an keine eigene Übergangsfrist
                        gebunden, die Ausstellung wird stufenweise bis 2028 verpflichtend.
                    </p>

                    <h3 className="mt-8 text-lg font-semibold tracking-tight">Empfang: grundsätzlich bereits seit dem 1. Januar 2025</h3>
                    <div className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
                        <p>
                            Das Gesetz formuliert keine gesondert ausformulierte "Empfangspflicht" als
                            eigenen Satz. Es hebt lediglich das Zustimmungserfordernis für die elektronische
                            Übermittlung auf, sobald eine Pflicht nach § 14 Absatz 2 Satz 2 Nummer 1 UStG
                            besteht:
                        </p>
                        <blockquote className="border-l-2 border-primary/40 pl-4 text-foreground/90 italic">
                            „Die Übermittlung einer elektronischen Rechnung oder einer sonstigen Rechnung in
                            einem elektronischen Format bedarf der Zustimmung des Empfängers, soweit keine
                            Verpflichtung nach Absatz 2 Satz 2 Nummer 1 besteht."
                        </blockquote>
                        <p className="text-sm">§ 14 Absatz 1 Satz 5 UStG.</p>
                        <p>
                            Diese Pflicht nach Absatz 2 Satz 2 Nummer 1 besteht für inländische B2B-Umsätze
                            seit dem 1. Januar 2025, unabhängig von der Übergangsregelung für Aussteller
                            weiter unten, die nur die Ausstellung, nie den Empfang, betrifft. In der Praxis
                            heißt das: Ein Rechnungsempfänger kann eine strukturierte elektronische Rechnung
                            seit diesem Datum nicht mehr allein deshalb zurückweisen, weil er ihr nicht
                            zugestimmt hat. Diese Lesart folgt aus dem Zusammenspiel der beiden Vorschriften,
                            nicht aus einem eigenen, isolierten Wortlaut "ab 2025 muss jeder empfangen können";
                            wer hier ganz sichergehen will, sollte sie an einem konkreten Fall mit einem
                            Steuerberater prüfen.
                        </p>
                    </div>

                    <h3 className="mt-8 text-lg font-semibold tracking-tight">
                        Ausstellung: Übergangsregelung bis Ende 2027, volle Pflicht ab dem 1. Januar 2028
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                        § 27 Absatz 38 UStG erlaubt Ausstellern, abweichend von § 14 Absatz 1 und 2, unter
                        drei Bedingungen noch auf Papier oder in einem nicht-konformen elektronischen Format
                        zu bleiben:
                    </p>

                    <div className="mt-5 overflow-x-auto rounded-2xl border border-border">
                        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                            <thead>
                                <tr className="border-b border-border bg-muted/50">
                                    <th scope="col" className="px-4 py-3 font-medium sm:px-6">
                                        Übergangsregelung
                                    </th>
                                    <th scope="col" className="px-4 py-3 font-medium sm:px-6">
                                        Bedingung
                                    </th>
                                    <th scope="col" className="px-4 py-3 font-medium text-primary sm:px-6">
                                        Nutzbar bis
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                <tr>
                                    <th scope="row" className="px-4 py-4 align-top font-medium sm:px-6">
                                        Allgemeine Frist
                                    </th>
                                    <td className="px-4 py-4 align-top leading-relaxed text-muted-foreground sm:px-6">
                                        Jeder Umsatz vor dem 1. Januar 2027, unabhängig vom Umsatz des
                                        Unternehmens; mit Zustimmung des Empfängers
                                    </td>
                                    <td className="px-4 py-4 align-top font-medium sm:px-6">31. Dezember 2026</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="px-4 py-4 align-top font-medium sm:px-6">
                                        Kleinere Unternehmen
                                    </th>
                                    <td className="px-4 py-4 align-top leading-relaxed text-muted-foreground sm:px-6">
                                        Gesamtumsatz (§ 19 Abs. 2 UStG) im Vorjahr ≤ 800 000 €, für Umsätze
                                        2027; mit Zustimmung des Empfängers
                                    </td>
                                    <td className="px-4 py-4 align-top font-medium sm:px-6">31. Dezember 2027</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="px-4 py-4 align-top font-medium sm:px-6">
                                        EDI-Nutzer
                                    </th>
                                    <td className="px-4 py-4 align-top leading-relaxed text-muted-foreground sm:px-6">
                                        Übermittlung per EDI nach Empfehlung 94/820/EG, für Umsätze 2027,
                                        unabhängig vom Umsatz; mit Zustimmung des Empfängers
                                    </td>
                                    <td className="px-4 py-4 align-top font-medium sm:px-6">31. Dezember 2027</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-5 space-y-3 text-base leading-relaxed text-muted-foreground">
                        <p>
                            Die drei Fälle stammen wörtlich aus § 27 Absatz 38 Nummer 1 bis 3 UStG. Ab dem 1.
                            Januar 2028 gilt die Pflicht zur strukturierten elektronischen Rechnung ohne
                            Ausnahme für jeden erfassten inländischen B2B-Umsatz. Ein Unternehmen, das noch
                            nicht zur Ausstellung verpflichtet ist, darf freiwillig früher auf das
                            elektronische Format umstellen.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="mx-auto max-w-3xl px-5 py-12">
                <Reveal>
                    <h2 className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight">
                        <ShieldCheck className="size-6 shrink-0 text-primary" aria-hidden="true" />
                        Was sich konkret ändert
                    </h2>

                    <h3 className="mt-6 text-lg font-semibold tracking-tight">Ein Format, kein vorgeschriebener Übertragungsweg</h3>
                    <div className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
                        <p>
                            Anders als in Frankreich oder Italien schreibt das deutsche Recht keine
                            bestimmte Plattform oder keinen bestimmten Übertragungskanal vor. Das Gesetz
                            verlangt nur ein strukturiertes Format:
                        </p>
                        <blockquote className="border-l-2 border-primary/40 pl-4 text-foreground/90 italic">
                            „Eine elektronische Rechnung ist eine Rechnung, die in einem strukturierten
                            elektronischen Format ausgestellt, übermittelt und empfangen wird und eine
                            elektronische Verarbeitung ermöglicht."
                        </blockquote>
                        <p className="text-sm">§ 14 Absatz 1 Satz 3 UStG.</p>
                        <p>
                            Wie die Datei danach beim Empfänger ankommt (E-Mail, Kundenportal, EDI oder ein
                            anderer Weg) bestimmt das Gesetz nicht. Für inländische B2B-Umsätze schreibt es
                            lediglich vor, dass die Rechnung „als elektronische Rechnung nach Absatz 1 Satz 3
                            und 6 auszustellen [ist]" (§ 14 Absatz 2 Satz 2 Nummer 1 UStG).
                        </p>
                    </div>

                    <h3 className="mt-8 text-lg font-semibold tracking-tight">Die anerkannten Formate: XRechnung und ZUGFeRD</h3>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                        Beide bauen auf der europäischen semantischen Norm EN 16931 auf (Richtlinie
                        2014/55/EU): XRechnung ist ein reines XML-Format, ZUGFeRD (ab Version 2.x) ein für
                        Menschen lesbares PDF mit eingebetteter, maschinenlesbarer XML-Datei, nach derselben
                        Logik wie das französische Factur-X, mit dem es technisch verwandt ist. Die Wahl des
                        Formats übernimmt in der Regel die Rechnungssoftware.
                    </p>

                    <h3 className="mt-8 text-lg font-semibold tracking-tight">
                        Wie lange Rechnungen aufzubewahren sind, und was sich 2025 geändert hat
                    </h3>
                    <div className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
                        <p>Zwei Vorschriften verlangen seit dem 1. Januar 2025 dieselbe, verkürzte Frist von acht statt zehn Jahren:</p>
                        <blockquote className="border-l-2 border-primary/40 pl-4 text-foreground/90 italic">
                            „Der Unternehmer hat ein Doppel der Rechnung, die er selbst […] ausgestellt hat,
                            sowie alle Rechnungen, die er erhalten […] hat, acht Jahre aufzubewahren."
                        </blockquote>
                        <p className="text-sm">§ 14b Absatz 1 Satz 1 UStG.</p>
                        <blockquote className="border-l-2 border-primary/40 pl-4 text-foreground/90 italic">
                            „Die in Absatz 1 Nummer 1 und 4a aufgeführten Unterlagen sind zehn Jahre, die in
                            Absatz 1 Nummer 4 aufgeführten Unterlagen acht Jahre […] aufzubewahren."
                        </blockquote>
                        <p className="text-sm">
                            Abgabenordnung, § 147 Absatz 3 Satz 1. Eine Rechnung ist ein Buchungsbeleg (Absatz
                            1 Nummer 4), keine zehnjährige Kategorie.
                        </p>
                        <p>
                            Vor 2025 lag die Frist bei zehn Jahren. Der Gesetzgeber hat die Verkürzung auch
                            auf laufende Fälle erstreckt, nicht nur auf neue Rechnungen:
                        </p>
                        <blockquote className="border-l-2 border-primary/40 pl-4 text-foreground/90 italic">
                            „§ 14b Absatz 1 Satz 1 in der ab dem 1. Januar 2025 geltenden Fassung ist auf
                            alle Rechnungen anzuwenden, deren Aufbewahrungsfrist am 31. Dezember 2024 noch
                            nicht abgelaufen ist."
                        </blockquote>
                        <p className="text-sm">§ 27 Absatz 40 Satz 1 UStG.</p>
                        <p>
                            Für eine Rechnung, deren alte zehnjährige Frist am 31. Dezember 2024 noch lief,
                            gilt damit rückwirkend die neue, kürzere Acht-Jahres-Frist.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="mx-auto max-w-3xl px-5 py-12">
                <Reveal>
                    <h2 className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight">
                        <CircleCheck className="size-6 shrink-0 text-primary" aria-hidden="true" />
                        Was vor der Wahl eines Werkzeugs zu prüfen ist
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                        Dieser Leitfaden vergleicht keine Anbieter. Hier sind die Fragen, die sich lohnen, bei
                        jedem Werkzeug, auch bei dem, das Sie bereits nutzen:
                    </p>
                    <ul className="mt-5 space-y-3">
                        {[
                            'Erstellt es Rechnungen im XRechnung- oder ZUGFeRD-Format, konform mit der europäischen Norm EN 16931?',
                            'Da kein Übertragungsweg gesetzlich vorgeschrieben ist: unterstützt es zumindest die gängigen Wege (E-Mail, Kundenportal, EDI)?',
                            'Wendet es die Übergangsregelung korrekt an, also die allgemeine Frist, die 800 000-€-Schwelle und die EDI-Ausnahme, falls Ihr Unternehmen sie noch in Anspruch nehmen will?',
                            'Kann es bereits jetzt elektronische Rechnungen empfangen, unabhängig davon, wann Ihre eigene Ausstellungspflicht beginnt?',
                            'Archiviert es Ihre Rechnungen für die gesetzliche Frist von acht Jahren, mit einem Nachweis der Unveränderbarkeit über die Zeit?',
                            'Bleiben Ihre Daten abrufbar, wenn Sie das Werkzeug später wechseln?',
                        ].map((question) => (
                            <li key={question} className="flex gap-3 text-base leading-relaxed text-muted-foreground">
                                <CircleCheck className="mt-0.5 size-4.5 shrink-0 text-primary" aria-hidden="true" />
                                {question}
                            </li>
                        ))}
                    </ul>
                </Reveal>
            </section>

            <section className="mx-auto max-w-3xl px-5 py-12">
                <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-12 sm:px-10 sm:py-14">
                    <div className="relative">
                        <h2 className="flex items-center gap-2.5 text-xl font-semibold tracking-tight">
                            <Landmark className="size-5 shrink-0 text-primary" aria-hidden="true" />
                            Eine Möglichkeit, dem nachzukommen
                        </h2>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                            Invoicerr ist eine der Möglichkeiten, diesen Pflichten nachzukommen: eine
                            Open-Source-Rechnungssoftware, die Rechnungen im XRechnung- oder
                            Factur-X/ZUGFeRD-Format erstellt und sich über den Übertragungsweg Ihrer Wahl
                            versenden lässt, da das Gesetz keinen bestimmten Kanal vorschreibt. Das ist nicht
                            der einzige Weg, und dieser Absatz will Sie vom Gegenteil nicht überzeugen: Die
                            obigen Fragen gelten für jedes Werkzeug, auch für dieses. Die gehostete Version startet im
                            November 2026: bis dahin gibt es nur die Warteliste.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                            <Button size="lg" asChild className="h-11 px-6 text-base active:scale-[0.98]">
                                <a href={links.app}>
                                    Auf die Warteliste
                                    <ArrowRight />
                                </a>
                            </Button>
                            <a
                                href={links.selfHost}
                                className="text-sm font-medium text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                            >
                                oder selbst kostenlos hosten
                            </a>
                        </div>
                    </div>
                </Reveal>
            </section>

            <section className="mx-auto max-w-3xl px-5 pb-24">
                <Reveal>
                    <h2 className="text-lg font-semibold tracking-tight">Quellen</h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        Jede Aussage dieser Seite ist mit dem Text oder der Seite verknüpft, die sie trägt.
                        Direkt unter diesen Adressen geprüft am 23. September 2026.
                    </p>
                    <dl className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
                        <div>
                            <dt className="font-medium text-foreground">Elektronische Rechnung, Zustimmungserfordernis, B2B-Pflicht</dt>
                            <dd>
                                Umsatzsteuergesetz, § 14 Absatz 1 und Absatz 2 Satz 2 Nummer 1.{' '}
                                <a
                                    href="https://www.gesetze-im-internet.de/ustg_1980/__14.html"
                                    className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                                >
                                    gesetze-im-internet.de
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-medium text-foreground">Übergangsregelung 2025–2027 für die Ausstellung</dt>
                            <dd>
                                Umsatzsteuergesetz, § 27 Absatz 38.{' '}
                                <a
                                    href="https://www.gesetze-im-internet.de/ustg_1980/__27.html"
                                    className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                                >
                                    gesetze-im-internet.de
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-medium text-foreground">Aufbewahrungsfrist von acht Jahren (Rechnungen)</dt>
                            <dd>
                                Umsatzsteuergesetz, § 14b Absatz 1 Satz 1.{' '}
                                <a
                                    href="https://www.gesetze-im-internet.de/ustg_1980/__14b.html"
                                    className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                                >
                                    gesetze-im-internet.de
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-medium text-foreground">Aufbewahrungsfrist von acht Jahren (Buchungsbelege)</dt>
                            <dd>
                                Abgabenordnung, § 147 Absatz 1 Nummer 4 und Absatz 3 Satz 1.{' '}
                                <a
                                    href="https://www.gesetze-im-internet.de/ao_1977/__147.html"
                                    className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                                >
                                    gesetze-im-internet.de
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-medium text-foreground">Verkürzung der Frist von zehn auf acht Jahre, Übergang ab 2025</dt>
                            <dd>
                                Umsatzsteuergesetz, § 27 Absatz 40 Satz 1.{' '}
                                <a
                                    href="https://www.gesetze-im-internet.de/ustg_1980/__27.html"
                                    className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                                >
                                    gesetze-im-internet.de
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-medium text-foreground">Europäischer Standard EN 16931 für die elektronische Rechnung</dt>
                            <dd>
                                Richtlinie 2014/55/EU des Europäischen Parlaments und des Rates.{' '}
                                <a
                                    href="https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32014L0055"
                                    className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                                >
                                    eur-lex.europa.eu
                                </a>
                            </dd>
                        </div>
                    </dl>
                </Reveal>
            </section>
        </>
    )
}
