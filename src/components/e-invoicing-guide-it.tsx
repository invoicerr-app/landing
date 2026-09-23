import { ArrowRight, CalendarClock, CircleCheck, FileText, Landmark, ShieldCheck } from 'lucide-react'

import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'
import { links } from '@/lib/links'

// Third of three planned content pages (see e-invoicing-guide-fr.tsx and e-invoicing-guide-de.tsx).
// Explicitly not a product page: it teaches the rule as it is written in the decreto legislativo and
// applied by the Agenzia delle Entrate, and names no competitor anywhere. Invoicerr appears exactly
// once, in the closing section, as one way to meet the obligation rather than as the point of the
// page. Every legal or administrative claim below carries its own citation; the PR that introduced
// this file lists them again in one place, in English, for a non-technical reviewer who does not
// read Italian to check one by one.
//
// Italian only: this page is written for an Italian business owner reading about an Italian rule, so
// like the other two guides it does not get an English variant.
export function EInvoicingGuideIt() {
    return (
        <>
            <section className="mx-auto max-w-3xl px-5 pb-4 pt-28 sm:pt-36">
                <h1 className="enter text-balance text-4xl font-semibold tracking-tight [animation-delay:90ms] sm:text-5xl">
                    Fatturazione elettronica in Italia: chi è interessato, e da quando
                </h1>
                <p className="enter mt-6 text-pretty text-lg leading-relaxed text-muted-foreground [animation-delay:180ms]">
                    Questo testo spiega la normativa così come è scritta nel decreto legislativo e
                    applicata dall'Agenzia delle Entrate: chi deve rispettarla, da quale data, cosa cambia
                    concretamente nell'invio di una fattura, e cosa verificare prima di scegliere uno
                    strumento. Nessun fornitore di software viene qui messo a confronto con un altro.
                </p>
            </section>

            <section className="mx-auto max-w-3xl px-5 py-12">
                <Reveal>
                    <h2 className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight">
                        <FileText className="size-6 shrink-0 text-primary" aria-hidden="true" />
                        Chi è interessato
                    </h2>
                    <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
                        <p>
                            L'obbligo riguarda le cessioni di beni e le prestazioni di servizi effettuate tra
                            soggetti residenti o stabiliti in Italia. A differenza della riforma francese o
                            tedesca, che riguardano solo i rapporti tra imprese (B2B), quella italiana copre
                            anche le vendite al consumatore finale (B2C): la legge non distingue tra le due.
                        </p>
                        <blockquote className="border-l-2 border-primary/40 pl-4 text-foreground/90 italic">
                            «Per le cessioni di beni e le prestazioni di servizi effettuate tra soggetti
                            residenti o stabiliti nel territorio dello Stato […] sono emesse esclusivamente
                            fatture elettroniche utilizzando il Sistema di Interscambio e secondo il formato
                            di cui al comma 2.»
                        </blockquote>
                        <p className="text-sm">Decreto legislativo 5 agosto 2015, n. 127, art. 1, comma 3.</p>
                        <p>Restano esclusi dall'obbligo generale, ma per ragioni diverse tra loro:</p>
                        <ul className="ml-1 list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
                            <li>
                                i soggetti già esonerati per legge dalla fatturazione in generale (anche
                                cartacea), come i piccoli produttori agricoli (art. 34, comma 6, DPR
                                633/1972), o chi ha ottenuto la dispensa per operazioni esenti (art. 36-bis,
                                DPR 633/1972);
                            </li>
                            <li>
                                le prestazioni sanitarie verso il consumatore finale, per le quali vige un
                                vero e proprio <strong className="font-medium text-foreground">divieto</strong>{' '}
                                di emissione tramite il Sistema di Interscambio, a tutela dei dati sanitari
                                particolarmente sensibili che la fattura conterrebbe.
                            </li>
                        </ul>
                        <p>
                            Il regime forfettario, un tempo esonerato, non lo è più (sezione successiva). Le
                            cessioni verso l'estero e gli acquisti restano soggetti a regole proprie che
                            questa guida non tratta.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="mx-auto max-w-3xl px-5 py-12">
                <Reveal>
                    <h2 className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight">
                        <CalendarClock className="size-6 shrink-0 text-primary" aria-hidden="true" />Da quando
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                        Una data generale, e due date successive per il regime forfettario, che è stato
                        incluso nell'obbligo in due tempi.
                    </p>

                    <div className="mt-5 overflow-x-auto rounded-2xl border border-border">
                        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                            <thead>
                                <tr className="border-b border-border bg-muted/50">
                                    <th scope="col" className="px-4 py-3 font-medium sm:px-6">
                                        Categoria
                                    </th>
                                    <th scope="col" className="px-4 py-3 font-medium sm:px-6">
                                        Condizione
                                    </th>
                                    <th scope="col" className="px-4 py-3 font-medium text-primary sm:px-6">
                                        Obbligo dal
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                <tr>
                                    <th scope="row" className="px-4 py-4 align-top font-medium sm:px-6">
                                        Generalità dei soggetti IVA
                                    </th>
                                    <td className="px-4 py-4 align-top leading-relaxed text-muted-foreground sm:px-6">
                                        Operazioni verso altri soggetti residenti o stabiliti in Italia
                                    </td>
                                    <td className="px-4 py-4 align-top font-medium sm:px-6">1° gennaio 2019</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="px-4 py-4 align-top font-medium sm:px-6">
                                        Regime forfettario
                                    </th>
                                    <td className="px-4 py-4 align-top leading-relaxed text-muted-foreground sm:px-6">
                                        Ricavi o compensi dell'anno precedente, ragguagliati ad anno, superiori
                                        a 25 000 €
                                    </td>
                                    <td className="px-4 py-4 align-top font-medium sm:px-6">1° luglio 2022</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="px-4 py-4 align-top font-medium sm:px-6">
                                        Regime forfettario
                                    </th>
                                    <td className="px-4 py-4 align-top leading-relaxed text-muted-foreground sm:px-6">
                                        Tutti gli altri soggetti in regime forfettario
                                    </td>
                                    <td className="px-4 py-4 align-top font-medium sm:px-6">1° gennaio 2024</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-5 space-y-3 text-base leading-relaxed text-muted-foreground">
                        <p>
                            La data generale del 1° gennaio 2019 risulta dall'aggiornamento ufficiale
                            riportato su Normattiva a margine dell'art. 1 del D.Lgs. 127/2015: legge 27
                            dicembre 2017, n. 205, art. 1, comma 916. Le due date del regime forfettario
                            vengono dall'art. 18, comma 3, del decreto-legge 30 aprile 2022, n. 36, che ha
                            eliminato l'esonero in due tempi in base alla soglia di ricavi dell'anno precedente.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="mx-auto max-w-3xl px-5 py-12">
                <Reveal>
                    <h2 className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight">
                        <ShieldCheck className="size-6 shrink-0 text-primary" aria-hidden="true" />
                        Cosa cambia in pratica
                    </h2>

                    <h3 className="mt-6 text-lg font-semibold tracking-tight">Una fattura non è più un semplice PDF via email</h3>
                    <div className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
                        <p>
                            Per le operazioni interessate, la fattura non può più circolare per posta
                            elettronica ordinaria o su carta: deve transitare attraverso il Sistema di
                            Interscambio (SdI), nel formato FatturaPA, un file XML strutturato. La norma non
                            lascia margini di interpretazione:
                        </p>
                        <blockquote className="border-l-2 border-primary/40 pl-4 text-foreground/90 italic">
                            «In caso di emissione di fattura, tra soggetti residenti o stabiliti nel
                            territorio dello Stato, con modalità diverse da quelle previste dal comma 3, la
                            fattura si intende non emessa e si applicano le sanzioni previste dall'articolo 6
                            del decreto legislativo 18 dicembre 1997, n. 471.»
                        </blockquote>
                        <p className="text-sm">Decreto legislativo 127/2015, art. 1, comma 6.</p>
                        <p>
                            Una fattura emessa fuori dal SdI non è quindi solo irregolare: per la legge è come
                            se non fosse mai stata emessa, con le sanzioni amministrative che ne conseguono.
                        </p>
                    </div>

                    <h3 className="mt-8 text-lg font-semibold tracking-tight">Come si accede al Sistema di Interscambio</h3>
                    <div className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
                        <p>
                            Il canale più diffuso è il servizio web accreditato SDICoop, ma esiste
                            un'alternativa che non richiede alcun accreditamento preventivo: una casella di
                            posta elettronica certificata (PEC). La documentazione ufficiale lo dice
                            direttamente:
                        </p>
                        <blockquote className="border-l-2 border-primary/40 pl-4 text-foreground/90 italic">
                            «L'utilizzo del canale PEC non presuppone alcun tipo di accreditamento preventivo
                            presso il Sistema di Interscambio.»
                        </blockquote>
                        <p className="text-sm">Fatturapa.gov.it, «Inviare la FatturaPA».</p>
                    </div>

                    <h3 className="mt-8 text-lg font-semibold tracking-tight">Correggere una fattura già accettata dal SdI</h3>
                    <div className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
                        <p>
                            Una fattura già accettata dal Sistema di Interscambio non si corregge
                            riscrivendola: la legge non prevede alcuno strumento di rettifica per riferimento
                            sullo stesso documento. La correzione passa sempre da un documento distinto, e i
                            due casi non hanno lo stesso statuto giuridico:
                        </p>
                        <ul className="ml-1 list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
                            <li>
                                <strong className="font-medium text-foreground">Aumentare</strong> l'importo
                                dovuto è un obbligo, tramite una nota di debito (art. 26, comma 1, DPR
                                633/1972: «devono essere osservate»).
                            </li>
                            <li>
                                <strong className="font-medium text-foreground">Diminuire</strong> l'importo
                                dovuto resta una facoltà, tramite una nota di credito (art. 26, comma 2, DPR
                                633/1972: «ha diritto di portare in detrazione»), mai un obbligo.
                            </li>
                        </ul>
                    </div>

                    <h3 className="mt-8 text-lg font-semibold tracking-tight">Conservazione</h3>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                        Le fatture trasmesse tramite il SdI restano consultabili sul portale «Fatture e
                        Corrispettivi» dell'Agenzia delle Entrate, ma questo non sostituisce l'obbligo del
                        contribuente di conservare la propria documentazione contabile (conservazione
                        sostitutiva, D.Lgs. 82/2005 e relative regole tecniche). A differenza della Francia
                        o della Germania, la durata non è un numero fisso di anni a partire dalla data della
                        fattura: per l'IVA, l'obbligo di conservazione corre fino alla chiusura dei termini
                        di accertamento fiscale (DPR 600/1973), una scadenza che dipende dall'anno
                        d'imposta e non da una durata uniforme.
                    </p>
                </Reveal>
            </section>

            <section className="mx-auto max-w-3xl px-5 py-12">
                <Reveal>
                    <h2 className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight">
                        <CircleCheck className="size-6 shrink-0 text-primary" aria-hidden="true" />
                        Cosa verificare prima di scegliere uno strumento
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                        Questa guida non confronta alcun fornitore. Ecco le domande che vale la pena porre a
                        qualsiasi strumento, incluso quello che state già usando:
                    </p>
                    <ul className="mt-5 space-y-3">
                        {[
                            'È davvero collegato al Sistema di Interscambio, tramite SDICoop o PEC, o si limita a indicare un canale che dovete configurare e gestire voi stessi?',
                            'Genera la fattura nel formato FatturaPA, conforme allo schema XML ufficiale?',
                            "Se siete in regime forfettario e avete superato la soglia, emette già fatture tramite SdI, come richiesto dal 2022 o dal 2024 a seconda dei casi?",
                            'Gestisce correttamente nota di credito e nota di debito, rispettando la diversa natura giuridica dei due strumenti, facoltà contro obbligo?',
                            'Conserva le vostre fatture in modo conforme, con una prova di integrità nel tempo?',
                            'I vostri dati restano recuperabili se in futuro cambiate strumento?',
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
                            Un modo per rispondere
                        </h2>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                            Invoicerr è uno dei modi per rispondere a questi obblighi: un software di
                            fatturazione open source che genera la fattura nel formato FatturaPA e la
                            instrada verso il Sistema di Interscambio tramite il canale accreditato SDICoop.
                            Non è l'unico modo di procedere, e questo paragrafo non cerca di convincervi del
                            contrario: le domande qui sopra valgono per qualsiasi strumento, compreso questo.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                            <Button size="lg" asChild className="h-11 px-6 text-base active:scale-[0.98]">
                                <a href={links.app}>
                                    Usa Invoicerr subito
                                    <ArrowRight />
                                </a>
                            </Button>
                            <a
                                href={links.selfHost}
                                className="text-sm font-medium text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                            >
                                oppure ospitalo tu stesso, gratuitamente
                            </a>
                        </div>
                    </div>
                </Reveal>
            </section>

            <section className="mx-auto max-w-3xl px-5 pb-24">
                <Reveal>
                    <h2 className="text-lg font-semibold tracking-tight">Fonti</h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        Ogni affermazione di questa pagina è collegata al testo o alla pagina che la
                        supporta. Verificata direttamente su questi indirizzi il 23 settembre 2026.
                    </p>
                    <dl className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
                        <div>
                            <dt className="font-medium text-foreground">Obbligo generale di fatturazione elettronica via SdI, sanzioni</dt>
                            <dd>
                                Decreto legislativo 5 agosto 2015, n. 127, art. 1, commi 3 e 6.{' '}
                                <a
                                    href="https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2015-08-05;127~art1"
                                    className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                                >
                                    normattiva.it
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-medium text-foreground">Decorrenza dell'obbligo generale (1° gennaio 2019)</dt>
                            <dd>
                                Legge 27 dicembre 2017, n. 205, art. 1, comma 916 (aggiornamento ufficiale a
                                margine del D.Lgs. 127/2015, art. 1).{' '}
                                <a
                                    href="https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2015-08-05;127~art1"
                                    className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                                >
                                    normattiva.it
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-medium text-foreground">Estensione dell'obbligo al regime forfettario (2022, 2024)</dt>
                            <dd>
                                Decreto-legge 30 aprile 2022, n. 36, art. 18, comma 3.{' '}
                                <a
                                    href="https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto-legge:2022-04-30;36"
                                    className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                                >
                                    normattiva.it
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-medium text-foreground">Nota di credito (facoltà) e nota di debito (obbligo)</dt>
                            <dd>
                                DPR 26 ottobre 1972, n. 633, art. 26, commi 1 e 2.{' '}
                                <a
                                    href="https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.del.presidente.della.repubblica:1972-10-26;633~art26"
                                    className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                                >
                                    normattiva.it
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-medium text-foreground">Accesso al SdI via PEC senza accreditamento preventivo</dt>
                            <dd>
                                Fatturapa.gov.it, «Inviare la FatturaPA».{' '}
                                <a
                                    href="https://www.fatturapa.gov.it/it/comefare/operatori-economici/inviare-la-fatturapa/"
                                    className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                                >
                                    fatturapa.gov.it
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-medium text-foreground">
                                Conservazione della documentazione contabile fino alla chiusura dei termini di accertamento
                            </dt>
                            <dd>
                                DPR 29 settembre 1973, n. 600 (caratterizzazione generale, non riverificata
                                oggi articolo per articolo).{' '}
                                <a
                                    href="https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.del.presidente.della.repubblica:1973-09-29;600"
                                    className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                                >
                                    normattiva.it
                                </a>
                            </dd>
                        </div>
                    </dl>
                </Reveal>
            </section>
        </>
    )
}
