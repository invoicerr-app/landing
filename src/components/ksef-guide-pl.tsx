import { ArrowRight, CalendarClock, CircleCheck, FileText, Landmark, ShieldCheck } from 'lucide-react'

import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'
import { links } from '@/lib/links'

// Second of the content pages that started with e-invoicing-guide-fr.tsx: same structure, same
// discipline (who is concerned, from when, what changes concretely, what to check before choosing a
// tool, one short paragraph where Invoicerr appears as one way to comply, then sources). No
// competitor named anywhere. Every legal or administrative claim carries its own citation; the PR
// description lists them again in one table, with the date each one was read, for a reviewer who
// does not read Polish to check one by one.
//
// KSeF's own mandatory calendar has already been rewritten once by the legislator (see the note in
// the "Od kiedy" section): the dates below are read directly from the current text and from the
// Ministry of Finance's own KSeF portal, not carried over from an earlier summary.
//
// Polish only: this page is written for a Polish business owner reading about a Polish law, so like
// the French guide (and unlike the rest of this English-language site) it does not get an English
// variant.
export function KsefGuidePl() {
    return (
        <>
            <section className="mx-auto max-w-3xl px-5 pb-4 pt-28 sm:pt-36">
                <h1 className="enter text-balance text-4xl font-semibold tracking-tight [animation-delay:90ms] sm:text-5xl">
                    KSeF w Polsce: kogo dotyczy obowiązkowe fakturowanie i od kiedy
                </h1>
                <p className="enter mt-6 text-pretty text-lg leading-relaxed text-muted-foreground [animation-delay:180ms]">
                    Ten tekst wyjaśnia Krajowy System e-Faktur tak, jak jest zapisany w ustawie o VAT i
                    przedstawiany przez Ministerstwo Finansów: kogo obejmuje obowiązek, od kiedy realnie
                    obowiązuje (stan na dziś), co się zmienia w wystawianiu faktury i co sprawdzić przed
                    wyborem narzędzia. Żaden dostawca oprogramowania nie jest tu porównywany z innym.
                </p>
            </section>

            <section className="mx-auto max-w-3xl px-5 py-12">
                <Reveal>
                    <h2 className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight">
                        <FileText className="size-6 shrink-0 text-primary" aria-hidden="true" />
                        Kogo dotyczy
                    </h2>
                    <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
                        <p>
                            Obowiązek wystawiania faktur ustrukturyzowanych przy użyciu KSeF dotyczy podatników VAT
                            posiadających siedzibę działalności gospodarczej lub stałe miejsce prowadzenia działalności
                            gospodarczej w Polsce. Ustawa mówi to wprost:
                        </p>
                        <blockquote className="border-l-2 border-primary/40 pl-4 text-foreground/90 italic">
                            „Podatnicy są obowiązani wystawiać faktury ustrukturyzowane przy użyciu Krajowego Systemu
                            e-Faktur.”
                        </blockquote>
                        <p className="text-sm">Ustawa o VAT, art. 106ga ust. 1.</p>
                        <p>Ten sam artykuł, w ust. 2, wyłącza z obowiązku sześć sytuacji:</p>
                        <ul className="ml-1 list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
                            <li>podatnika bez siedziby ani stałego miejsca prowadzenia działalności w Polsce,</li>
                            <li>
                                podatnika bez siedziby w Polsce, który ma tu stałe miejsce prowadzenia działalności,
                                jeśli to miejsce nie uczestniczy w danej dostawie lub usłudze,
                            </li>
                            <li>
                                podatnika korzystającego ze szczególnych procedur (m.in. OSS/IOSS) dla czynności
                                rozliczanych w tych procedurach,
                            </li>
                            <li>sprzedaż na rzecz osoby fizycznej nieprowadzącej działalności gospodarczej (B2C),</li>
                            <li>przypadki szczególnie udokumentowanych dostaw, określone odrębnym rozporządzeniem,</li>
                            <li>
                                podatnika korzystającego ze zwolnienia dla małych przedsiębiorstw zagranicznych w
                                unijnej procedurze SME (art. 113a ust. 1), nie z krajowego zwolnienia podmiotowego.
                            </li>
                        </ul>
                        <p>
                            Dwie pierwsze z tych kategorii (podatnicy zagraniczni) mogą mimo to wystawiać faktury
                            ustrukturyzowane dobrowolnie, jeśli tego chcą (art. 106ga ust. 4). Dla pozostałych czterech
                            kategorii wystawia się fakturę elektroniczną lub papierową, na zasadach ogólnych (ust. 3).
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="mx-auto max-w-3xl px-5 py-12">
                <Reveal>
                    <h2 className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight">
                        <CalendarClock className="size-6 shrink-0 text-primary" aria-hidden="true" />
                        Od kiedy
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                        Stan na dziś, 23 września 2026 roku: obowiązek już obowiązuje dla większości firm objętych
                        reformą. Zostaje jedna ulga przejściowa, wygasająca z końcem tego roku.
                    </p>

                    <div className="mt-5 overflow-x-auto rounded-2xl border border-border">
                        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                            <thead>
                                <tr className="border-b border-border bg-muted/50">
                                    <th scope="col" className="px-4 py-3 font-medium sm:px-6">
                                        Grupa
                                    </th>
                                    <th scope="col" className="px-4 py-3 font-medium sm:px-6">
                                        Próg
                                    </th>
                                    <th scope="col" className="px-4 py-3 font-medium text-primary sm:px-6">
                                        Obowiązek KSeF od
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                <tr>
                                    <th scope="row" className="px-4 py-4 align-top font-medium sm:px-6">
                                        Najwięksi podatnicy
                                    </th>
                                    <td className="px-4 py-4 align-top leading-relaxed text-muted-foreground sm:px-6">
                                        sprzedaż wraz z VAT &gt; 200 000 000 zł w 2024 r.
                                    </td>
                                    <td className="px-4 py-4 align-top font-medium sm:px-6">1 lutego 2026</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="px-4 py-4 align-top font-medium sm:px-6">
                                        Pozostali podatnicy objęci obowiązkiem
                                    </th>
                                    <td className="px-4 py-4 align-top leading-relaxed text-muted-foreground sm:px-6">
                                        bez progu obrotu
                                    </td>
                                    <td className="px-4 py-4 align-top font-medium sm:px-6">1 kwietnia 2026</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="px-4 py-4 align-top font-medium sm:px-6">
                                        Ulga dla drobnej sprzedaży (wszyscy)
                                    </th>
                                    <td className="px-4 py-4 align-top leading-relaxed text-muted-foreground sm:px-6">
                                        sprzedaż poza KSeF udokumentowana w danym miesiącu ≤ 10 000 zł
                                    </td>
                                    <td className="px-4 py-4 align-top font-medium sm:px-6">do 31 grudnia 2026</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="px-4 py-4 align-top font-medium sm:px-6">
                                        Pełny obowiązek, bez ulgi
                                    </th>
                                    <td className="px-4 py-4 align-top leading-relaxed text-muted-foreground sm:px-6">
                                        dotyczy każdego objętego obowiązkiem
                                    </td>
                                    <td className="px-4 py-4 align-top font-medium sm:px-6">1 stycznia 2027</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-5 space-y-3 text-base leading-relaxed text-muted-foreground">
                        <p>Ustawa formułuje to tak:</p>
                        <blockquote className="border-l-2 border-primary/40 pl-4 text-foreground/90 italic">
                            „Art. 145l. W okresie od dnia 1 lutego 2026 r. do dnia 31 marca 2026 r. podatnicy
                            obowiązani do wystawiania faktur ustrukturyzowanych mogą wystawiać faktury elektroniczne
                            lub faktury w postaci papierowej, jeżeli łączna wartość sprzedaży wraz z kwotą podatku u
                            tych podatników nie przekroczyła w 2024 r. kwoty 200 000 000 zł.”
                        </blockquote>
                        <blockquote className="border-l-2 border-primary/40 pl-4 text-foreground/90 italic">
                            „Art. 145m. 1. W okresie od dnia 1 kwietnia 2026 r. do dnia 31 grudnia 2026 r. podatnicy
                            obowiązani do wystawiania faktur ustrukturyzowanych mogą wystawiać faktury elektroniczne
                            lub faktury w postaci papierowej, jeżeli łączna wartość sprzedaży wraz z kwotą podatku u
                            tych podatników udokumentowana tymi fakturami wystawionymi w danym miesiącu jest
                            mniejsza lub równa 10 000 zł.”
                        </blockquote>
                        <p className="text-sm">Ustawa o VAT, art. 145l i art. 145m, w brzmieniu nadanym ustawą z dnia 5 sierpnia 2025 r.</p>
                        <p>
                            Ten harmonogram był już raz zmieniany: te same artykuły 145l i 145m, w wersji ustawy
                            ogłoszonej 16 czerwca 2025 r., dotyczyły zupełnie innej kwestii (paragonów fiskalnych
                            uznanych za faktury). Obecną, opartą na progu obrotu wersję wprowadziła dopiero nowelizacja
                            z 5 sierpnia 2025 r. Poniższe daty to stan przeczytany bezpośrednio w tym tekście i na
                            portalu KSeF 23 września 2026 roku; przed decyzją warto sprawdzić je jeszcze raz pod
                            adresami wskazanymi w źródłach.
                        </p>
                        <p>
                            Kara pieniężna za niewystawienie wymaganej faktury ustrukturyzowanej, do 100% kwoty VAT
                            wykazanej na fakturze wystawionej poza KSeF (art. 106ni ust. 1), obowiązuje dopiero od 1
                            sierpnia 2026 r., już po starcie samego obowiązku dla największych podatników. Ten sam
                            artykuł, w ust. 4, wyłącza jednocześnie odpowiedzialność karną skarbową za to samo
                            uchybienie.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="mx-auto max-w-3xl px-5 py-12">
                <Reveal>
                    <h2 className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight">
                        <ShieldCheck className="size-6 shrink-0 text-primary" aria-hidden="true" />
                        Co się zmienia konkretnie
                    </h2>

                    <h3 className="mt-6 text-lg font-semibold tracking-tight">Faktura przechodzi przez KSeF, nie tylko przez skrzynkę mailową</h3>
                    <div className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
                        <p>Dla podatnika objętego obowiązkiem faktura liczy się jako wystawiona dopiero w momencie przesłania jej do systemu:</p>
                        <blockquote className="border-l-2 border-primary/40 pl-4 text-foreground/90 italic">
                            „Fakturę ustrukturyzowaną uznaje się za wystawioną w dniu jej przesłania do Krajowego
                            Systemu e-Faktur.”
                        </blockquote>
                        <p className="text-sm">Ustawa o VAT, art. 106na ust. 1.</p>
                        <p>Sam system odpowiada też za autentyczność i integralność faktury, bez dodatkowego mechanizmu po stronie podatnika:</p>
                        <blockquote className="border-l-2 border-primary/40 pl-4 text-foreground/90 italic">
                            „Krajowy System e-Faktur zapewnia autentyczność pochodzenia, integralność treści oraz
                            czytelność faktury ustrukturyzowanej.”
                        </blockquote>
                        <p className="text-sm">Ustawa o VAT, art. 106m ust. 1(1).</p>
                    </div>

                    <h3 className="mt-8 text-lg font-semibold tracking-tight">Format FA(3)</h3>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                        FA(3) to struktura logiczna faktury ustrukturyzowanej obowiązująca od 1 lutego 2026 r., wraz z
                        przejściem na KSeF 2.0, zastępująca wcześniejszą wersję FA(2). Budowa faktury w tym formacie
                        jest zwykle zadaniem narzędzia do fakturowania, nie czymś wpisywanym ręcznie.
                    </p>

                    <h3 className="mt-8 text-lg font-semibold tracking-tight">Ile trzymać faktury</h3>
                    <div className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
                        <p>Dwa niezależne okresy nakładają się na siebie:</p>
                        <ul className="ml-1 list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
                            <li>
                                KSeF sam przechowuje faktury ustrukturyzowane przez 10 lat, licząc od końca roku, w
                                którym zostały wystawione (ustawa o VAT, art. 112aa ust. 1): „Faktury ustrukturyzowane
                                są przechowywane w Krajowym Systemie e-Faktur przez okres 10 lat, licząc od końca roku,
                                w którym zostały wystawione.”
                            </li>
                            <li>
                                Ogólny obowiązek przechowywania dokumentów rozliczeniowych trwa do upływu terminu
                                przedawnienia zobowiązania podatkowego, czyli pięciu lat liczonych od końca roku
                                kalendarzowego, w którym upłynął termin płatności podatku, a nie od daty samej faktury
                                (ustawa o VAT art. 112, w powiązaniu z Ordynacją podatkową art. 70 § 1).
                            </li>
                        </ul>
                        <p>
                            W praktyce dziesięcioletnie przechowywanie w samym KSeF (art. 112aa) z zapasem pokrywa
                            krótszy, ruchomy pięcioletni termin przedawnienia. Po upływie 10 lat w systemie podatnik ma
                            obowiązek przechowywać fakturę poza KSeF, jeśli termin przedawnienia jeszcze nie minął
                            (art. 112aa ust. 2).
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="mx-auto max-w-3xl px-5 py-12">
                <Reveal>
                    <h2 className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight">
                        <CircleCheck className="size-6 shrink-0 text-primary" aria-hidden="true" />
                        Co sprawdzić przed wyborem narzędzia
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                        Ten tekst nie porównuje żadnego dostawcy. Poniższe pytania warto zadać każdemu narzędziu,
                        łącznie z tym, którego już używasz:
                    </p>
                    <ul className="mt-5 space-y-3">
                        {[
                            'Czy rzeczywiście łączy się z produkcyjnym środowiskiem KSeF, czy tylko przekierowuje do systemu, który musisz obsługiwać samodzielnie?',
                            'Czy buduje fakturę w strukturze FA(3), zgodnej ze schematem publikowanym przez Ministerstwo Finansów?',
                            'Czy pilnuje progu 200 000 000 zł i miesięcznego limitu 10 000 zł, żeby nie zablokować faktury, która wciąż może zgodnie z prawem wyjść poza KSeF w okresie przejściowym?',
                            'Jeśli jesteś w grupie zwolnionej z obowiązku, na przykład sprzedajesz wyłącznie osobom prywatnym, czy narzędzie i tak pozwala wystawiać faktury ustrukturyzowane dobrowolnie?',
                            'Czy archiwizuje faktury przez wymagany okres, z dowodem integralności w czasie?',
                            'Czy Twoje dane pozostają odzyskiwalne, jeśli zmienisz narzędzie później?',
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
                            Jeden ze sposobów, żeby to spełnić
                        </h2>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                            Invoicerr to jeden ze sposobów spełnienia tych obowiązków: otwartoźródłowe oprogramowanie
                            do fakturowania, które buduje fakturę w formacie FA(3) i łączy się z Krajowym Systemem
                            e-Faktur. To nie jedyny możliwy sposób, i ten akapit nie próbuje przekonać Cię, że jest
                            inaczej: pytania powyżej dotyczą każdego narzędzia, również tego.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                            <Button size="lg" asChild className="h-11 px-6 text-base active:scale-[0.98]">
                                <a href={links.app}>
                                    Użyj Invoicerr już teraz
                                    <ArrowRight />
                                </a>
                            </Button>
                            <a
                                href={links.selfHost}
                                className="text-sm font-medium text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                            >
                                lub hostuj je sam, za darmo
                            </a>
                        </div>
                    </div>
                </Reveal>
            </section>

            <section className="mx-auto max-w-3xl px-5 pb-24">
                <Reveal>
                    <h2 className="text-lg font-semibold tracking-tight">Źródła</h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        Każde twierdzenie na tej stronie odsyła do tekstu lub strony, która je potwierdza. Sprawdzone
                        bezpośrednio pod tymi adresami 23 września 2026 roku.
                    </p>
                    <dl className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
                        <div>
                            <dt className="font-medium text-foreground">Obowiązek KSeF, wyjątki, skutki prawne, kary, archiwizacja w systemie</dt>
                            <dd>
                                Ustawa o VAT, tekst jednolity (Dz.U. 2025 poz. 775), art. 106ga, 106m, 106na, 106ni,
                                112aa.{' '}
                                <a
                                    href="https://api.sejm.gov.pl/eli/acts/DU/2025/775/text.pdf"
                                    className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                                >
                                    api.sejm.gov.pl
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-medium text-foreground">Harmonogram przejściowy: 200 mln zł, 1 lutego / 1 kwietnia 2026, ulga do 10 000 zł/mies.</dt>
                            <dd>
                                Ustawa z dnia 5 sierpnia 2025 r. o zmianie ustawy o podatku od towarów i usług (Dz.U.
                                2025 poz. 1203), art. 1 pkt 34 (art. 145l i 145m).{' '}
                                <a
                                    href="https://api.sejm.gov.pl/eli/acts/DU/2025/1203/text.pdf"
                                    className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                                >
                                    api.sejm.gov.pl
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-medium text-foreground">Przedawnienie zobowiązania podatkowego (pięć lat)</dt>
                            <dd>
                                Ordynacja podatkowa, tekst jednolity (Dz.U. 2026 poz. 622), art. 70 § 1.{' '}
                                <a
                                    href="https://api.sejm.gov.pl/eli/acts/DU/2026/622/text.pdf"
                                    className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                                >
                                    api.sejm.gov.pl
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-medium text-foreground">Daty wejścia w życie przedstawione przez administrację, etapy KSeF 2.0</dt>
                            <dd>
                                Ministerstwo Finansów, portal KSeF, „Od kiedy trzeba wystawiać faktury w KSeF” i
                                „Etapy wdrożenia KSeF”.{' '}
                                <a
                                    href="https://ksef.podatki.gov.pl/od-kiedy-trzeba-wystawiac-faktury-w-ksef/"
                                    className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                                >
                                    ksef.podatki.gov.pl
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-medium text-foreground">Format FA(3) obowiązujący od 1 lutego 2026 r.</dt>
                            <dd>
                                Ministerstwo Finansów, portal KSeF, „Pytania i odpowiedzi KSeF 2.0”.{' '}
                                <a
                                    href="https://ksef.podatki.gov.pl/pytania-i-odpowiedzi-ksef-20/"
                                    className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                                >
                                    ksef.podatki.gov.pl
                                </a>
                            </dd>
                        </div>
                    </dl>
                </Reveal>
            </section>
        </>
    )
}
