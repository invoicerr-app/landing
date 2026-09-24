import { ArrowRight, CalendarClock, CircleCheck, FileText, Landmark, ShieldCheck } from 'lucide-react'

import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'
import { links } from '@/lib/links'

// Third of the content pages that started with e-invoicing-guide-fr.tsx: same structure, same
// discipline (who is concerned, from when, what changes concretely, what to check before choosing a
// tool, one short paragraph where Invoicerr appears as one way to comply, then sources). No
// competitor named anywhere. Every legal or administrative claim carries its own citation; the PR
// description lists them again in one table, with the date each one was read, for a reviewer who
// does not read Portuguese to check one by one.
//
// Portugal, unlike France or Poland, imposes no single mandatory clearance platform for a domestic
// invoice: electronic transmission itself stays subject to the recipient's acceptance (Decreto-Lei
// n.º 28/2019, art. 12.º n.º 1, quoted below). What is mandatory is the content and the software:
// the ATCUD on every invoice, certified software above a turnover threshold, and a monthly report to
// the tax authority. Getting this distinction right is the whole point of the page.
//
// European Portuguese only: this page is written for a Portuguese business owner reading about
// Portuguese law, so like the French and Polish guides it does not get an English variant.
export function EInvoicingGuidePt() {
    return (
        <>
            <section className="mx-auto max-w-3xl px-5 pb-4 pt-28 sm:pt-36">
                <h1 className="enter text-balance text-4xl font-semibold tracking-tight [animation-delay:90ms] sm:text-5xl">
                    Faturação eletrónica em Portugal: quem é abrangido e desde quando
                </h1>
                <p className="enter mt-6 text-pretty text-lg leading-relaxed text-muted-foreground [animation-delay:180ms]">
                    Este texto explica o regime tal como está escrito na lei e publicado pela Autoridade
                    Tributária e Aduaneira (AT): quem é abrangido, desde quando, o que muda concretamente na
                    emissão de uma fatura e o que verificar antes de escolher uma ferramenta. Nenhum
                    fornecedor de software é aqui comparado a outro.
                </p>
            </section>

            <section className="mx-auto max-w-3xl px-5 py-12">
                <Reveal>
                    <h2 className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight">
                        <FileText className="size-6 shrink-0 text-primary" aria-hidden="true" />
                        Quem é abrangido
                    </h2>
                    <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
                        <p>
                            Ao contrário de França ou da Polónia, Portugal não impõe uma plataforma única de envio
                            para a fatura eletrónica: a emissão por via eletrónica continua sujeita à aceitação do
                            destinatário.
                        </p>
                        <blockquote className="border-l-2 border-primary/40 pl-4 text-foreground/90 italic">
                            «As faturas e demais documentos fiscalmente relevantes podem, mediante aceitação pelo
                            destinatário, ser emitidos por via eletrónica.»
                        </blockquote>
                        <p className="text-sm">Decreto-Lei n.º 28/2019, de 15 de fevereiro, art. 12.º n.º 1.</p>
                        <p>
                            O que a lei portuguesa impõe, a toda a empresa sujeita a IVA com sede, estabelecimento
                            estável ou domicílio em território nacional, incide sobre o conteúdo da fatura e sobre o
                            software usado para a emitir, não sobre o canal de envio:
                        </p>
                        <ul className="ml-1 list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
                            <li>
                                O <strong className="font-medium text-foreground">ATCUD</strong> é obrigatório em toda
                                a fatura, independentemente do volume de negócios ou do regime de tributação de quem
                                a emite.
                            </li>
                            <li>
                                O uso de <strong className="font-medium text-foreground">software certificado</strong>{' '}
                                pela AT só é obrigatório acima de determinado volume de negócios (secção seguinte).
                            </li>
                            <li>
                                A <strong className="font-medium text-foreground">comunicação mensal dos elementos das
                                faturas</strong> à AT é obrigatória para quem pratica operações sujeitas a IVA sob as
                                regras de faturação em território português.
                            </li>
                        </ul>
                    </div>
                </Reveal>
            </section>

            <section className="mx-auto max-w-3xl px-5 py-12">
                <Reveal>
                    <h2 className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight">
                        <CalendarClock className="size-6 shrink-0 text-primary" aria-hidden="true" />
                        Desde quando
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                        Ao contrário do calendário polaco ou francês, o regime português não tem uma data futura de
                        entrada em vigor a aguardar: as três obrigações abaixo já estão em vigor há vários anos, com
                        uma exceção sobre a qual vale a pena ser preciso, o ATCUD.
                    </p>

                    <h3 className="mt-8 text-lg font-semibold tracking-tight">ATCUD: obrigatório desde 1 de janeiro de 2023</h3>
                    <div className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
                        <p>
                            A Portaria n.º 195/2020 tornou o ATCUD obrigatório a partir de 1 de janeiro de 2021, mas
                            um despacho do Secretário de Estado Adjunto e dos Assuntos Fiscais suspendeu essa
                            obrigatoriedade durante todo o ano de 2022:
                        </p>
                        <blockquote className="border-l-2 border-primary/40 pl-4 text-foreground/90 italic">
                            «Em 2022 fique suspensa, quanto à comunicação de séries e à obrigação de aposição do
                            código único de documento (ATCUD) [...], sendo a aposição do ATCUD em todas as faturas e
                            outros documentos fiscalmente relevantes considerada facultativa.»
                        </blockquote>
                        <p className="text-sm">Despacho n.º 351/2021-XXII, de 10 de novembro de 2021, alínea e).</p>
                        <p>
                            A data efetivamente aplicada desde então, e ainda hoje em vigor, é portanto 1 de janeiro
                            de 2023, não a data de 2021 que uma leitura isolada da portaria sugeriria.
                        </p>
                    </div>

                    <h3 className="mt-8 text-lg font-semibold tracking-tight">Software certificado: obrigatório acima de 50 000 euros</h3>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                        O Decreto-Lei n.º 28/2019 obriga ao uso exclusivo de um programa certificado pela AT quando
                        três condições se verificam cumulativamente (secção seguinte). É uma obrigação permanente,
                        ligada ao volume de negócios do ano anterior, não uma data única a aguardar.
                    </p>

                    <h3 className="mt-8 text-lg font-semibold tracking-tight">Comunicação mensal (SAF-T (PT)): até ao dia 5 do mês seguinte</h3>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                        O prazo atualmente em vigor para comunicar os elementos das faturas emitidas num mês é o dia
                        5 do mês seguinte. Este prazo já foi mais longo no passado; o que se descreve aqui é a
                        versão em vigor hoje, lida diretamente na fonte (secção seguinte e Fontes).
                    </p>
                </Reveal>
            </section>

            <section className="mx-auto max-w-3xl px-5 py-12">
                <Reveal>
                    <h2 className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight">
                        <ShieldCheck className="size-6 shrink-0 text-primary" aria-hidden="true" />
                        O que muda na prática
                    </h2>

                    <h3 className="mt-6 text-lg font-semibold tracking-tight">O código ATCUD em cada fatura</h3>
                    <div className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
                        <p>O ATCUD (código único do documento) segue um formato fixo, definido pela portaria que o rege:</p>
                        <blockquote className="border-l-2 border-primary/40 pl-4 text-foreground/90 italic">
                            «O ATCUD, com o formato «ATCUD:CodigodeValidação-NumeroSequencial», deve constar
                            obrigatoriamente em todas as faturas e outros documentos fiscalmente relevantes.»
                        </blockquote>
                        <p className="text-sm">Portaria n.º 195/2020, de 13 de agosto, art. 4.º n.º 1.</p>
                        <p>
                            O código de validação da série que compõe o ATCUD é obtido junto da AT, por série
                            documental, antes da emissão do primeiro documento dessa série.
                        </p>
                    </div>

                    <h3 className="mt-8 text-lg font-semibold tracking-tight">Código QR: só para software certificado</h3>
                    <div className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
                        <p>O ATCUD e o código QR não têm o mesmo âmbito, e a própria AT distingue os dois na sua página de perguntas frequentes:</p>
                        <blockquote className="border-l-2 border-primary/40 pl-4 text-foreground/90 italic">
                            «As faturas e demais documentos fiscalmente relevantes emitidos por qualquer meio de
                            processamento [...] têm de exibir o código único de documento (ATCUD) [...],
                            independentemente do volume de negócios ou regime de tributação do emitente. O código QR
                            apenas é exigível a documentos emitidos por programas informáticos de faturação
                            certificados.»
                        </blockquote>
                        <p className="text-sm">Autoridade Tributária e Aduaneira, Perguntas frequentes, item 4307.</p>
                    </div>

                    <h3 className="mt-8 text-lg font-semibold tracking-tight">Software certificado acima de 50 000 euros</h3>
                    <div className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
                        <p>Três condições cumulativas obrigam ao uso exclusivo de um programa certificado pela AT:</p>
                        <blockquote className="border-l-2 border-primary/40 pl-4 text-foreground/90 italic">
                            «[...] estão obrigados a utilizar, exclusivamente, programas informáticos que tenham sido
                            objeto de prévia certificação pela AT, sempre que: a) Tenham tido, no ano civil anterior,
                            um volume de negócios superior a € 50 000 [...]; b) Utilizem programas informáticos de
                            faturação; c) Sejam obrigados a dispor de contabilidade organizada ou por ela tenham
                            optado.»
                        </blockquote>
                        <p className="text-sm">Decreto-Lei n.º 28/2019, de 15 de fevereiro, art. 4.º n.º 1.</p>
                    </div>

                    <h3 className="mt-8 text-lg font-semibold tracking-tight">Comunicação mensal à AT (SAF-T (PT))</h3>
                    <div className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
                        <p>A lei prevê três vias equivalentes para cumprir esta obrigação:</p>
                        <ul className="ml-1 list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
                            <li>transmissão eletrónica de dados em tempo real,</li>
                            <li>envio de um ficheiro estruturado no formato SAF-T (PT),</li>
                            <li>inserção direta no Portal das Finanças,</li>
                        </ul>
                        <p>cada uma até ao dia 5 do mês seguinte ao da emissão das faturas em causa.</p>
                        <p className="text-sm">Decreto-Lei n.º 198/2012, de 24 de agosto, art. 3.º n.os 1 e 2.</p>
                    </div>

                    <h3 className="mt-8 text-lg font-semibold tracking-tight">Quanto tempo guardar as faturas</h3>
                    <div className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
                        <p>O prazo, na sua redação atual, conta-se a partir do fim do ano civil da fatura, não da própria data de emissão:</p>
                        <blockquote className="border-l-2 border-primary/40 pl-4 text-foreground/90 italic">
                            «Os sujeitos passivos são obrigados a arquivar e conservar em boa ordem durante os 10 anos
                            civis subsequentes todos os registos e respetivos documentos de suporte [...].»
                        </blockquote>
                        <p className="text-sm">
                            Código do IVA, art. 52.º n.º 1, na redação do Decreto-Lei n.º 49/2025, de 27 de março, em
                            vigor desde 1 de julho de 2025.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="mx-auto max-w-3xl px-5 py-12">
                <Reveal>
                    <h2 className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight">
                        <CircleCheck className="size-6 shrink-0 text-primary" aria-hidden="true" />
                        O que verificar antes de escolher uma ferramenta
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                        Este texto não compara nenhum fornecedor. Eis as perguntas que vale a pena colocar a
                        qualquer ferramenta, incluindo a que já utiliza:
                    </p>
                    <ul className="mt-5 space-y-3">
                        {[
                            'Insere um ATCUD válido, obtido junto da AT por série documental, em cada fatura?',
                            'Se o volume de negócios ultrapassa os 50 000 euros e há obrigação de contabilidade organizada, o programa está certificado pela AT?',
                            'Comunica os elementos das faturas à AT dentro do prazo, por uma das três vias legais?',
                            'Gera um ficheiro SAF-T (PT) na versão em vigor, caso essa seja a via escolhida?',
                            'Arquiva as faturas pelo prazo legal, com prova de integridade ao longo do tempo?',
                            'Os seus dados continuam recuperáveis se mudar de ferramenta mais tarde?',
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
                            Uma forma de responder a isto
                        </h2>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                            O Invoicerr é uma das formas de responder a estas obrigações: um software de faturação
                            de código aberto que atribui um ATCUD a cada fatura e comunica os seus elementos à AT.
                            Não é a única forma possível, e este parágrafo não procura convencer do contrário: as
                            perguntas acima aplicam-se a qualquer ferramenta, incluindo esta. A versão alojada abre em
                            novembro de 2026 e até lá existe apenas a lista de espera.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                            <Button size="lg" asChild className="h-11 px-6 text-base active:scale-[0.98]">
                                <a href={links.app}>
                                    Entrar na lista de espera
                                    <ArrowRight />
                                </a>
                            </Button>
                            <a
                                href={links.selfHost}
                                className="text-sm font-medium text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                            >
                                ou alojá-lo por conta própria, gratuitamente
                            </a>
                        </div>
                    </div>
                </Reveal>
            </section>

            <section className="mx-auto max-w-3xl px-5 pb-24">
                <Reveal>
                    <h2 className="text-lg font-semibold tracking-tight">Fontes</h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        Cada afirmação nesta página remete para o texto ou a página que a sustenta. Verificado
                        diretamente nestes endereços a 23 de setembro de 2026.
                    </p>
                    <dl className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
                        <div>
                            <dt className="font-medium text-foreground">Emissão eletrónica sujeita a aceitação do destinatário, software certificado</dt>
                            <dd>
                                Decreto-Lei n.º 28/2019, de 15 de fevereiro, art. 4.º e art. 12.º.{' '}
                                <a
                                    href="https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/legislacao/diplomas_legislativos/Documents/Decreto_Lei_28_2019.pdf"
                                    className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                                >
                                    portaldasfinancas.gov.pt
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-medium text-foreground">Formato do ATCUD</dt>
                            <dd>
                                Portaria n.º 195/2020, de 13 de agosto, art. 4.º.{' '}
                                <a
                                    href="https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/legislacao/diplomas_legislativos/Documents/Portaria_195_2020.pdf"
                                    className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                                >
                                    portaldasfinancas.gov.pt
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-medium text-foreground">Suspensão do ATCUD em 2022, data efetiva de 1 de janeiro de 2023</dt>
                            <dd>
                                Despacho n.º 351/2021-XXII, de 10 de novembro de 2021, alínea e).{' '}
                                <a
                                    href="https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/legislacao/Despachos_SEAF/Documents/Despacho_SEAAF_351_2021_XXII.pdf"
                                    className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                                >
                                    portaldasfinancas.gov.pt
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-medium text-foreground">ATCUD obrigatório em qualquer caso, código QR só para software certificado</dt>
                            <dd>
                                Autoridade Tributária e Aduaneira, Perguntas frequentes, «Séries/ATCUD, Âmbito de
                                Aplicação», item 4307.{' '}
                                <a
                                    href="https://info.portaldasfinancas.gov.pt/pt/apoio_contribuinte/questoes_frequentes/Pages/faqs-00883.aspx"
                                    className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                                >
                                    portaldasfinancas.gov.pt
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-medium text-foreground">Comunicação mensal SAF-T (PT), prazo do dia 5</dt>
                            <dd>
                                Decreto-Lei n.º 198/2012, de 24 de agosto, art. 3.º.{' '}
                                <a
                                    href="https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1782&tabela=leis"
                                    className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                                >
                                    pgdlisboa.pt
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-medium text-foreground">Conservação de dez anos civis subsequentes</dt>
                            <dd>
                                Código do IVA, art. 52.º n.º 1.{' '}
                                <a
                                    href="https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/Cod_download/Documents/CIVA.pdf"
                                    className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                                >
                                    portaldasfinancas.gov.pt
                                </a>
                            </dd>
                        </div>
                    </dl>
                </Reveal>
            </section>
        </>
    )
}
