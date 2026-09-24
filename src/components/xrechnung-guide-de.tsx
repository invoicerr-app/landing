import { Building2, CircleCheck, Landmark, Route, Signpost, Store } from 'lucide-react'

import { A, Closing, GuideHero, GuideSection, H3, List, Quote, Sources, Strong, Table } from '@/components/guide-parts'

// A decision path, not a format description: who receives the invoice (a business, the federal
// administration, a Land or a municipality), whether a Leitweg-ID is needed, and which submission route
// applies. What XRechnung and ZUGFeRD contain field by field is deliberately absent. A future page on
// Factur-X/ZUGFeRD as a format would own that; if this page ever grows a field list, it has become that
// page and the two should be merged rather than both published.
//
// Two facts changed since the German guide was written and are stated here as the sources now put
// them: the federal ZRE platform was merged into OZG-RE in September 2025, and a second BMF letter of
// 15 October 2025 amended the first one. No software vendor is named.
export function XRechnungGuideDe() {
    return (
        <>
            <GuideHero title="XRechnung oder ZUGFeRD: welches Format Sie senden">
                Welches Format eine E-Rechnung haben muss, hängt in Deutschland zuerst davon ab, wer sie
                empfängt: ein Unternehmen, eine Stelle des Bundes, ein Land oder eine Kommune. Diese Seite
                führt Schritt für Schritt durch diese Unterscheidung, bis zur Leitweg-ID und zum
                Einreichungsweg. Jede Aussage ist mit Gesetz, Verordnung oder Verwaltungsanweisung belegt.
                Kein Softwareanbieter wird mit einem anderen verglichen.
            </GuideHero>

            <GuideSection icon={Signpost} title="Schritt 1: Wer empfängt die Rechnung?">
                <p>
                    Für Rechnungen an Unternehmen gilt das Umsatzsteuergesetz, für Rechnungen an öffentliche
                    Auftraggeber zusätzlich das Vergabe- und E-Government-Recht. Das Bundesfinanzministerium
                    stellt klar, dass keines das andere verdrängt:
                </p>
                <Quote cite="BMF, FAQ „E-Rechnung“, Frage 4a.">
                    „Es besteht kein Rangverhältnis zwischen dem UStG und der ERechV. Beide Vorschriften sind
                    nebeneinander für ihren jeweiligen Geltungsbereich zu beachten.“
                </Quote>
                <Table
                    minWidth={640}
                    head={['Empfänger', 'Rechtsgrundlage', 'Weiter bei']}
                    rows={[
                        ['Ein Unternehmen im Inland', '§ 14 UStG', <A href="#unternehmen">Schritt 2a</A>],
                        ['Eine Stelle des Bundes', 'E-Rechnungsverordnung (ERechV)', <A href="#bund">Schritt 2b</A>],
                        ['Ein Land oder eine Kommune', 'Recht des jeweiligen Landes', <A href="#laender">Schritt 2c</A>],
                    ]}
                />
            </GuideSection>

            <GuideSection id="unternehmen" icon={Store} title="Schritt 2a: Empfänger ist ein Unternehmen">
                <p>
                    Ob und ab wann Sie an ein anderes Unternehmen im Inland eine E-Rechnung ausstellen
                    müssen, und welche Übergangsregeln bis Ende 2027 gelten, steht im{' '}
                    <A href="/e-rechnung/">Leitfaden zur E-Rechnung</A>. Hier geht es um die Frage danach:
                    welches Format, und über welchen Weg.
                </p>

                <H3>Das Format: jedes, das der EN 16931 entspricht</H3>
                <p>Das Gesetz lässt zwei Wege zu:</p>
                <Quote cite="§ 14 Absatz 1 Satz 6 UStG.">
                    „Das strukturierte elektronische Format einer elektronischen Rechnung 1. muss der
                    europäischen Norm für die elektronische Rechnungsstellung und der Liste der
                    entsprechenden Syntaxen gemäß der Richtlinie 2014/55/EU […] entsprechen oder 2. kann
                    zwischen Rechnungsaussteller und Rechnungsempfänger vereinbart werden. Voraussetzung ist,
                    dass das Format die richtige und vollständige Extraktion der nach diesem Gesetz
                    erforderlichen Angaben aus der elektronischen Rechnung in ein Format ermöglicht, das der
                    Norm nach Nummer 1 entspricht oder mit dieser interoperabel ist.“
                </Quote>
                <p>Welche Formate das konkret sind, sagt die Finanzverwaltung:</p>
                <List>
                    <li>
                        <Strong>XRechnung</Strong>: „Der Standard XRechnung entspricht der Normenreihe EN 16931
                        und den Anforderungen des § 14 Abs. 1 Satz 6 Nr. 1 UStG“ (UStAE, Abschnitt 14.1 Abs.
                        13).
                    </li>
                    <li>
                        <Strong>ZUGFeRD</Strong>, ein PDF mit eingebetteter XML-Datei: „das hybride Format
                        ZUGFeRD ab der Version 2.0.1 – ausgenommen die Profile MINIMUM und BASIC-WL – beruht auf
                        der Normenreihe EN 16931 und fällt somit unter die zulässigen E-Rechnungs-Formate“
                        (UStAE, Abschnitt 14.1 Abs. 14).
                    </li>
                </List>
                <p>
                    Die beiden ausgenommenen Profile gelten auch nach Angaben des FeRD, das ZUGFeRD
                    herausgibt, in Deutschland nicht als vollständige Rechnung nach dem UStG. Welches der
                    zulässigen Formate Sie verwenden, legt nicht der Staat fest:
                </p>
                <Quote cite="UStAE, Abschnitt 14.1 Abs. 12 Satz 5, in der Fassung des BMF-Schreibens vom 15. Oktober 2025.">
                    „Welches – zulässige – Format verwendet wird, ist eine zivilrechtliche Frage, die nur
                    zwischen den Vertragsparteien zu entscheiden ist.“
                </Quote>

                <H3>Bei ZUGFeRD zählt die XML-Datei, nicht das PDF</H3>
                <Quote cite="UStAE, Abschnitt 14.4 Abs. 3, in der Fassung des BMF-Schreibens vom 15. Oktober 2025.">
                    „Bei einem hybriden Format bilden die im strukturierten Teil vorliegenden Rechnungsdaten
                    den führenden Teil. Im Fall von Abweichungen zwischen den strukturierten Rechnungsdaten
                    und den sonstigen Informationen im Bildteil gehen die Daten des strukturierten Teils denen
                    der Bilddatei vor.“
                </Quote>
                <p>
                    Ein Betrag, der im PDF anders lautet als in der eingebetteten XML-Datei, gilt also so, wie
                    er in der XML-Datei steht.
                </p>

                <H3>Der Weg: frei vereinbar</H3>
                <Quote cite="UStAE, Abschnitt 14.1 Abs. 4 Sätze 6 und 7, in der Fassung des BMF-Schreibens vom 15. Oktober 2025.">
                    „E-Rechnungen können z. B. per E-Mail, per Download über ein Internetportal oder per EDI,
                    per Bereitstellung der Daten mittels einer elektronischen Schnittstelle oder durch
                    gemeinsamen Zugriff auf einen zentralen Speicherort übermittelt werden. Auf welches
                    zulässige elektronische Rechnungsformat […] und welchen zulässigen Übermittlungsweg sich
                    die Vertragsparteien einigen, ist zivilrechtlich zwischen ihnen zu klären.“
                </Quote>
                <p>
                    Eine Leitweg-ID verlangt das Umsatzsteuerrecht nicht; sie ist die Adresse öffentlicher
                    Auftraggeber (Schritt 2b).
                </p>

                <H3>Die Frage an Ihren Kunden</H3>
                <p>
                    Weil Format und Weg Sache der Vertragsparteien sind, entscheidet am Ende, was die
                    Software Ihres Kunden verarbeitet. Fragen Sie ihn, ob er XRechnung oder ZUGFeRD erwartet,
                    in welchem Profil, und ob per E-Mail, Portal oder Schnittstelle. Beide Formate erfüllen
                    das Umsatzsteuerrecht gleichermaßen.
                </p>
            </GuideSection>

            <GuideSection id="bund" icon={Landmark} title="Schritt 2b: Empfänger ist eine Stelle des Bundes">
                <H3>Die Pflicht</H3>
                <Quote cite="E-Rechnungsverordnung (ERechV), § 3 Absatz 1.">
                    „Rechnungssteller müssen Rechnungen gegenüber Rechnungsempfängern in elektronischer Form
                    ausstellen und übermitteln.“
                </Quote>
                <p>
                    Diese Pflicht gilt seit dem 27. November 2020 (§ 11 Absatz 3 ERechV). Ausgenommen sind
                    nach § 3 Absatz 3 unter anderem Rechnungen, „die nach Erfüllung eines Direktauftrags bis
                    zu einem Betrag von 1 000 Euro gestellt werden“, sowie die Sonderfälle der §§ 8 und 9
                    ERechV.
                </p>
                <p>
                    Die Pflicht hat auch eine zivilrechtliche Folge: Eine Rechnung, die elektronisch hätte
                    gestellt werden müssen, es aber nicht ist, gilt für den Zahlungsverzug nach § 286 Absatz 3
                    BGB nicht als Rechnung (E-Government-Gesetz, § 4a Absatz 4).
                </p>

                <H3>Das Format: grundsätzlich XRechnung</H3>
                <Quote cite="ERechV, § 4 Absatz 1.">
                    „Für die Ausstellung von elektronischen Rechnungen haben Rechnungssteller und
                    Rechnungssender grundsätzlich den Datenaustauschstandard XRechnung vom 29. September 2017
                    […] in der jeweils aktuellen Fassung zu verwenden. Es kann auch ein anderer
                    Datenaustauschstandard verwendet werden, wenn er den Anforderungen der europäischen Norm
                    für die elektronische Rechnungsstellung entspricht.“
                </Quote>
                <p>
                    Die aktuelle Fassung ist XRechnung 3.0; laut KoSIT bleibt sie „bis mindestens 31.07.2027
                    in Kraft“. ZUGFeRD nimmt die Rechnungseingangsplattform des Bundes nur in einer bestimmten
                    Form an:
                </p>
                <Quote cite="E-Rechnung Bund, FAQ, „Wird der Standard XRechnung obsolet mit dem Release von ZUGFeRD 2.2.0?“.">
                    „Bei der Verwendung des ZUGFeRD Profils XRECHNUNG ist jedoch zu beachten, dass dies nur
                    und ausschließlich als rein strukturierte XML-Datei ohne Sichtformat angenommen wird.“
                </Quote>
                <p>
                    Das hybride ZUGFeRD-PDF, das zwischen Unternehmen zulässig ist, nennt die Plattform des
                    Bundes nicht als angenommenes Format. Ein einfaches PDF ist nach ihren Angaben ohnehin
                    „keine E-Rechnung“. Für den Bund heißt die Antwort also: XRechnung, oder ZUGFeRD im Profil
                    XRECHNUNG als reine XML-Datei.
                </p>

                <H3>Die Leitweg-ID</H3>
                <p>
                    Neben den umsatzsteuerlichen Angaben muss die Rechnung an den Bund mindestens enthalten
                    (§ 5 Absatz 1 ERechV): eine Leitweg-ID, die Bankverbindung, die Zahlungsbedingungen und
                    eine E-Mail- oder De-Mail-Adresse des Rechnungsstellers; dazu Lieferanten- und
                    Bestellnummer, wenn der Auftraggeber sie mitgeteilt hat (Absatz 2).
                </p>
                <p>Die Leitweg-ID ist die Adresse des Empfängers, nicht Ihre:</p>
                <Quote cite="E-Rechnung Bund, „Rechnungssteller“, Abschnitt „Die Leitweg-ID“.">
                    „Grundsätzlich wird die Leitweg-ID dem Rechnungssteller vom Auftraggeber mitgeteilt oder
                    kann bei diesem erfragt werden.“ […] „Bitte beachten Sie, dass Rechnungssteller keine
                    eigene Leitweg-ID benötigen!“
                </Quote>
                <p>
                    In der XRechnung steht sie im Feld „Käuferreferenz“ (BT-10). Sie besteht aus einer
                    Grobadressierung, einer optionalen Feinadressierung und einer Prüfziffer, zum Beispiel
                    04011000-1234512345-06 (KoSIT, Formatspezifikation Leitweg-ID 2.0.2). Die ersten zwei
                    Ziffern nennen Bund oder Land: 99 steht für den Bund, 01 bis 16 für die Länder. Beim
                    Bund zeigen die ersten drei Ziffern zugleich den Weg:
                </p>
                <Table
                    minWidth={560}
                    head={['Beginnt mit', 'Empfänger', 'Einreichung']}
                    rows={[
                        ['991', 'Unmittelbare Bundesverwaltung oder Verfassungsorgan', 'OZG-RE'],
                        ['992', 'Mittelbare Bundesverwaltung', 'OZG-RE'],
                        ['993', 'Mittelbare Bundesverwaltung', 'Eigene Lösung der Stelle, nicht die OZG-RE'],
                    ]}
                />
                <p className="text-sm">E-Rechnung Bund, FAQ, „Wie ist eine Leitweg-ID aufgebaut?“.</p>

                <H3>Der Weg: die OZG-RE</H3>
                <p>
                    Der Bund hat seine zwei Plattformen zusammengelegt: Mit dem Abschluss der Migration am 19.
                    September 2025 wurden alle Empfänger der früheren ZRE auf die OZG-RE überführt, und die
                    ZRE wurde zum Jahresende 2025 abgeschaltet. Für Stellen mit einer Leitweg-ID ab 991 oder
                    992 gibt es damit nur noch die OZG-RE, mit vier Übertragungskanälen:
                </p>
                <Table
                    minWidth={560}
                    head={['Kanal', 'Was zu beachten ist']}
                    rows={[
                        ['Weberfassung', 'Die Rechnungsdaten werden im Portal von Hand erfasst.'],
                        ['Upload', 'Eine anderswo erzeugte E-Rechnung wird im Portal hochgeladen.'],
                        [
                            'E-Mail',
                            '„Es darf immer nur eine E-Rechnung pro E-Mail versendet werden.“ Anhänge, die keine strukturierte E-Rechnung sind, führen zum Verwerfen der ganzen E-Mail.',
                        ],
                        [
                            'Peppol',
                            <>
                                Empfängeradresse 0204 gefolgt von der Leitweg-ID. Die Leitweg-ID muss zusätzlich
                                in der Rechnung selbst stehen. Was Peppol ist:{' '}
                                <A href="/e-invoicing/peppol/" lang="en">
                                    Peppol (englisch)
                                </A>
                                .
                            </>,
                        ],
                    ]}
                />
                <p>
                    Für jeden Kanal ist vorher eine Registrierung an der OZG-RE nötig; sie ist kostenlos. Das
                    hat einen Grund, den die Verordnung selbst nennt:
                </p>
                <Quote cite="ERechV, § 4 Absatz 4.">
                    „Erhält ein Rechnungsempfänger eine elektronische Rechnung, die keinem Nutzerkonto
                    zugeordnet werden kann, so hat der Rechnungsempfänger die elektronische Rechnung
                    abzulehnen. In diesem Fall erhalten die Rechnungssteller oder die Rechnungssender keine
                    Information über die Ablehnung.“
                </Quote>
                <p>Ohne Registrierung geht eine Rechnung an den Bund also verloren, ohne dass Sie davon erfahren.</p>
            </GuideSection>

            <GuideSection id="laender" icon={Building2} title="Schritt 2c: Empfänger ist ein Land oder eine Kommune">
                <p>Hier gibt es keine bundeseinheitliche Antwort:</p>
                <Quote cite="E-Rechnung Bund, „Umsetzung der E-Rechnung in den Bundesländern“.">
                    „Die Bundesländer setzen die E-Rechnung in eigener Kompetenz um, somit kann es abweichende
                    und teils sehr unterschiedliche Anforderungen für Sie als Lieferant an den elektronischen
                    Rechnungsaustausch geben. Diese Anforderungen ergeben sich aus den jeweiligen gesetzlichen
                    Bestimmungen der Bundesländer.“
                </Quote>
                <p>Die Schritte bleiben dieselben, die Antworten kommen vom Auftraggeber:</p>
                <List>
                    <li>
                        <Strong>Leitweg-ID erfragen.</Strong> Ihre ersten zwei Ziffern nennen das Land (01 bis
                        16). Vergeben wird sie von Bund und Ländern, nicht vom Rechnungssteller.
                    </li>
                    <li>
                        <Strong>Portal und Kanal erfragen.</Strong> Über welchen Weg eine Stelle des Landes
                        oder der Kommune empfängt, ergibt sich aus dem Landesrecht; der Auftraggeber nennt ihn
                        Ihnen.
                    </li>
                    <li>
                        <Strong>Format erfragen.</Strong> XRechnung „setzt die Richtlinie 2014/55/EU in
                        Deutschland maßgeblich um“ (KoSIT); ob ein Land daneben weitere Formate annimmt,
                        regelt sein eigenes Recht.
                    </li>
                </List>
                <p className="text-sm">
                    Diese Seite beschreibt die sechzehn Landesregelungen bewusst nicht einzeln: Sie ändern
                    sich unabhängig voneinander, und eine veraltete Angabe wäre hier schlimmer als keine.
                </p>
            </GuideSection>

            <GuideSection icon={Route} title="Der ganze Weg auf einen Blick">
                <Table
                    minWidth={720}
                    head={['Empfänger', 'Format', 'Leitweg-ID', 'Weg']}
                    rows={[
                        [
                            'Unternehmen im Inland',
                            'Jedes EN-16931-konforme Format, etwa XRechnung oder ZUGFeRD ab 2.0.1 (nicht MINIMUM, BASIC-WL); nach Vereinbarung auch andere',
                            'Nein',
                            'Frei vereinbar: E-Mail, Portal, EDI, Schnittstelle',
                        ],
                        [
                            'Bund (Leitweg-ID 991, 992)',
                            'XRechnung, oder ZUGFeRD im Profil XRECHNUNG als reine XML-Datei',
                            'Ja, vom Auftraggeber',
                            'OZG-RE nach Registrierung: Weberfassung, Upload, E-Mail, Peppol',
                        ],
                        [
                            'Bund (Leitweg-ID 993)',
                            'Wie oben',
                            'Ja, vom Auftraggeber',
                            'Eigene Lösung der Stelle',
                        ],
                        ['Land, Kommune', 'Nach Landesrecht', 'Ja, vom Auftraggeber', 'Nach Landesrecht'],
                    ]}
                />
            </GuideSection>

            <GuideSection icon={CircleCheck} title="Was vor der Wahl eines Werkzeugs zu prüfen ist">
                <p>
                    Diese Seite vergleicht keine Anbieter. Diese Fragen lohnen sich bei jedem Werkzeug, auch
                    bei dem, das Sie bereits nutzen:
                </p>
                <ul className="space-y-3">
                    {[
                        'Erzeugt es XRechnung in der aktuell gültigen Version 3.0, und ZUGFeRD in einem zulässigen Profil?',
                        'Kann es ZUGFeRD für den Bund im Profil XRECHNUNG als reine XML-Datei ausgeben, ohne PDF?',
                        'Fragt es die Leitweg-ID ab und setzt sie in das Feld Käuferreferenz (BT-10)?',
                        'Prüft es die Prüfziffer der Leitweg-ID, bevor die Rechnung versendet wird?',
                        'Versendet es über den Weg, den Ihr Kunde oder Auftraggeber verlangt, einschließlich Peppol?',
                        'Bleiben Ihre Rechnungen und deren XML-Dateien abrufbar, wenn Sie das Werkzeug wechseln?',
                    ].map((question) => (
                        <li key={question} className="flex gap-3">
                            <CircleCheck className="mt-0.5 size-4.5 shrink-0 text-primary" aria-hidden="true" />
                            {question}
                        </li>
                    ))}
                </ul>
            </GuideSection>

            <Closing
                icon={Landmark}
                title="Eine Möglichkeit, dem nachzukommen"
                cta="Invoicerr jetzt nutzen"
                selfHost="oder selbst kostenlos hosten"
            >
                Invoicerr ist eine der Möglichkeiten: eine Open-Source-Rechnungssoftware, die Rechnungen im
                XRechnung- oder ZUGFeRD-Format erstellt und sie per E-Mail oder über Peppol versendet. Das
                ist nicht der einzige Weg, und dieser Absatz will Sie vom Gegenteil nicht überzeugen: Die
                obigen Fragen gelten für jedes Werkzeug, auch für dieses.
            </Closing>

            <Sources
                title="Quellen"
                intro="Jede Aussage dieser Seite ist mit dem Text verknüpft, der sie trägt. Direkt unter diesen Adressen geprüft am 24. September 2026."
                sources={[
                    {
                        claim: 'Strukturiertes Format, EN 16931 oder vereinbartes Format, B2B-Pflicht',
                        reference: 'Umsatzsteuergesetz, § 14 Absatz 1 Satz 6 und Absatz 2 Satz 2 Nummer 1.',
                        href: 'https://www.gesetze-im-internet.de/ustg_1980/__14.html',
                    },
                    {
                        claim: 'XRechnung und ZUGFeRD ab 2.0.1 (ohne MINIMUM, BASIC-WL), freie Wahl von Format und Weg, XML führend',
                        reference: 'BMF-Schreiben vom 15. Oktober 2025 (III C 2 - S 7287-a/00019/007/243), UStAE Abschnitt 14.1 Abs. 4, 12 bis 14 und 14.4 Abs. 3.',
                        href: 'https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Steuerarten/Umsatzsteuer/Umsatzsteuer-Anwendungserlass/2025-10-15-einfuehrung-obligatorische-e-rechnung.pdf?__blob=publicationFile&v=5',
                    },
                    {
                        claim: 'Kein Rangverhältnis zwischen UStG und ERechV',
                        reference: 'Bundesministerium der Finanzen, FAQ „E-Rechnung“, Frage 4a.',
                        href: 'https://www.bundesfinanzministerium.de/Content/DE/FAQ/e-rechnung.html',
                    },
                    {
                        claim: 'Pflicht gegenüber dem Bund, Ausnahmen, Format, Portal und Nutzerkonto, Pflichtangaben, Inkrafttreten',
                        reference: 'E-Rechnungsverordnung, §§ 3, 4, 5 und 11.',
                        href: 'https://www.gesetze-im-internet.de/erechv/',
                    },
                    {
                        claim: 'Folge für den Zahlungsverzug',
                        reference: 'E-Government-Gesetz, § 4a Absatz 4.',
                        href: 'https://www.gesetze-im-internet.de/egovg/__4a.html',
                    },
                    {
                        claim: 'ZUGFeRD beim Bund nur im Profil XRECHNUNG als reine XML-Datei; PDF keine E-Rechnung; Aufbau der Leitweg-ID nach 991, 992, 993',
                        reference: 'E-Rechnung Bund (Beschaffungsamt des BMI), FAQ.',
                        href: 'https://www.e-rechnung-bund.de/faq',
                    },
                    {
                        claim: 'Leitweg-ID vom Auftraggeber, Feld BT-10, keine eigene Leitweg-ID nötig',
                        reference: 'E-Rechnung Bund, „Rechnungssteller“.',
                        href: 'https://www.e-rechnung-bund.de/rechnungssteller',
                    },
                    {
                        claim: 'Zusammenlegung von ZRE und OZG-RE, Abschaltung der ZRE',
                        reference: 'E-Rechnung Bund, „Ein Jahr nach der Konsolidierung von ZRE und OZG-RE“, 25. Juni 2026.',
                        href: 'https://www.e-rechnung-bund.de/ein-jahr-erfolgreiche-konsolidierung',
                    },
                    {
                        claim: 'Vier Übertragungskanäle, E-Mail-Regeln, Peppol-Adresse, kostenlose Registrierung',
                        reference: 'E-Rechnung Bund, „Übertragungskanäle“, „E-Mail“, „Peppol“.',
                        href: 'https://www.e-rechnung-bund.de/ubertragungskanale',
                    },
                    {
                        claim: 'Länder setzen die E-Rechnung in eigener Kompetenz um',
                        reference: 'E-Rechnung Bund, „Umsetzung der E-Rechnung in den Bundesländern“.',
                        href: 'https://www.e-rechnung-bund.de/e-rechnung/umsetzung-der-e-rechnung-in-den-bundeslaendern',
                    },
                    {
                        claim: 'Aufbau, Prüfziffer und Beispiel der Leitweg-ID, Länderkennzahlen',
                        reference: 'KoSIT, Leitweg-ID Format-Spezifikation, Version 2.0.2 vom 28.07.2021.',
                        href: 'https://xeinkauf.de/app/uploads/2022/11/Leitweg-ID-Formatspezifikation-v2-0-2-1.pdf',
                    },
                    {
                        claim: 'ZUGFeRD-Profile MINIMUM und BASIC WL keine vollständige Rechnung nach UStG',
                        reference: 'FeRD, „ZUGFeRD FAQ“.',
                        href: 'https://www.ferd-net.de/standards/zugferd-faq',
                    },
                    {
                        claim: 'XRechnung als Umsetzung der Richtlinie 2014/55/EU',
                        reference: 'KoSIT, „XRechnung“.',
                        href: 'https://xeinkauf.de/xrechnung/',
                    },
                    {
                        claim: 'XRechnung 3.0 gültig bis mindestens 31.07.2027',
                        reference: 'KoSIT, „Versionen und Bundles“.',
                        href: 'https://xeinkauf.de/xrechnung/versionen-und-bundles/',
                    },
                ]}
            />
        </>
    )
}
