import { ArrowRight, CalendarClock, CircleCheck, FileText, Landmark, ShieldCheck } from 'lucide-react'

import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'
import { links } from '@/lib/links'

// The first of three planned content pages (see the PR that introduced this file). Explicitly not a
// product page: it teaches the reform as it is written and published by the tax administration, and
// names no competitor anywhere. Invoicerr appears exactly once, in the closing section, as one way to
// meet the obligation rather than as the point of the page. Every legal or administrative claim below
// carries its own citation; the PR description lists them again in one place for a non-technical
// reviewer to check one by one.
//
// French only: this page is written for a French business owner reading about a French law, so unlike
// the rest of this English-language site it does not get an English variant.
export function EInvoicingGuideFr() {
    return (
        <>
            <section className="mx-auto max-w-3xl px-5 pb-4 pt-28 sm:pt-36">
                <h1 className="enter text-balance text-4xl font-semibold tracking-tight [animation-delay:90ms] sm:text-5xl">
                    La facturation électronique en France : qui est concerné, et à partir de quand
                </h1>
                <p className="enter mt-6 text-pretty text-lg leading-relaxed text-muted-foreground [animation-delay:180ms]">
                    Ce texte explique la réforme telle qu'elle est écrite dans la loi et présentée par
                    l'administration fiscale : qui doit s'y conformer, à partir de quelle date, ce qui
                    change concrètement dans l'envoi d'une facture, et ce qu'il faut vérifier avant de
                    choisir un outil. Aucun éditeur de logiciel n'y est comparé à un autre.
                </p>
            </section>

            <section className="mx-auto max-w-3xl px-5 py-12">
                <Reveal>
                    <h2 className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight">
                        <FileText className="size-6 shrink-0 text-primary" aria-hidden="true" />
                        Qui est concerné
                    </h2>
                    <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
                        <p>
                            La réforme touche toute entreprise assujettie à la TVA, établie ou domiciliée en
                            France, dès lors qu'elle facture une autre entreprise elle aussi assujettie et
                            établie en France : c'est une obligation entre professionnels (B2B domestique), pas
                            une règle qui s'applique à une vente à un particulier ou à un client situé à
                            l'étranger.
                        </p>
                        <p>Deux obligations distinctes, à ne pas confondre :</p>
                        <ul className="ml-1 list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
                            <li>
                                <strong className="font-medium text-foreground">Recevoir</strong> une facture
                                électronique concerne toutes les entreprises assujetties, sans exception de
                                taille ni de régime de TVA, y compris celles qui bénéficient de la franchise en
                                base et ne facturent pas la TVA elles-mêmes.
                            </li>
                            <li>
                                <strong className="font-medium text-foreground">Émettre</strong> une facture
                                électronique concerne les entreprises qui facturent d'autres entreprises en
                                France ; la date à laquelle cette obligation s'applique dépend de la taille de
                                l'entreprise (section suivante).
                            </li>
                        </ul>
                        <p>
                            Vendre à une administration publique (B2G) obéit à une règle plus ancienne et déjà en
                            vigueur, via Chorus Pro : ce guide porte sur la réforme B2B, pas sur cette
                            obligation-là. Vendre à un particulier ou exporter reste soumis à une obligation
                            séparée, l'e-reporting (transmission à l'administration des données de la vente, pas
                            de la facture elle-même), que ce guide ne détaille pas.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="mx-auto max-w-3xl px-5 py-12">
                <Reveal>
                    <h2 className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight">
                        <CalendarClock className="size-6 shrink-0 text-primary" aria-hidden="true" />À partir de quand
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                        Deux dates, et un principe à retenir : la date de réception est la même pour tout le
                        monde, la date d'émission dépend de la taille de l'entreprise.
                    </p>

                    <h3 className="mt-8 text-lg font-semibold tracking-tight">Réception : le 1er septembre 2026, pour toutes les entreprises</h3>
                    <div className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
                        <p>
                            Depuis cette date, toute entreprise assujettie établie en France doit être en
                            mesure de recevoir une facture électronique, quelle que soit sa taille. Le guide
                            pratique de l'administration fiscale le formule ainsi :
                        </p>
                        <blockquote className="border-l-2 border-primary/40 pl-4 text-foreground/90 italic">
                            « À compter du 1er septembre 2026, toutes les entreprises concernées par la réforme
                            doivent avoir la capacité de recevoir des factures électroniques. »
                        </blockquote>
                        <p>
                            Ne pas avoir encore choisi de plateforme ne dispense pas de traiter les factures
                            reçues entre-temps par un autre canal : l'administration demande d'engager la
                            démarche sans attendre, pas d'interrompre l'activité.
                        </p>
                    </div>

                    <h3 className="mt-8 text-lg font-semibold tracking-tight">
                        Émission : à partir de 2026 pour les grandes entreprises et les ETI, 2027 pour le reste
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                        L'obligation d'émettre en électronique arrive en deux temps, selon la taille de
                        l'entreprise qui facture :
                    </p>

                    <div className="mt-5 overflow-x-auto rounded-2xl border border-border">
                        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                            <thead>
                                <tr className="border-b border-border bg-muted/50">
                                    <th scope="col" className="px-4 py-3 font-medium sm:px-6">
                                        Catégorie
                                    </th>
                                    <th scope="col" className="px-4 py-3 font-medium sm:px-6">
                                        Seuils (dernier exercice clos)
                                    </th>
                                    <th scope="col" className="px-4 py-3 font-medium text-primary sm:px-6">
                                        Émission obligatoire
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                <tr>
                                    <th scope="row" className="px-4 py-4 align-top font-medium sm:px-6">
                                        Grande entreprise
                                    </th>
                                    <td className="px-4 py-4 align-top leading-relaxed text-muted-foreground sm:px-6">
                                        Au-delà des seuils de l'ETI
                                    </td>
                                    <td className="px-4 py-4 align-top font-medium sm:px-6">1er septembre 2026</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="px-4 py-4 align-top font-medium sm:px-6">
                                        ETI
                                    </th>
                                    <td className="px-4 py-4 align-top leading-relaxed text-muted-foreground sm:px-6">
                                        &lt; 5 000 salariés, et CA ≤ 1 500 M€ ou bilan ≤ 2 000 M€
                                    </td>
                                    <td className="px-4 py-4 align-top font-medium sm:px-6">1er septembre 2026</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="px-4 py-4 align-top font-medium sm:px-6">
                                        PME
                                    </th>
                                    <td className="px-4 py-4 align-top leading-relaxed text-muted-foreground sm:px-6">
                                        &lt; 250 salariés, et CA ≤ 50 M€ ou bilan ≤ 43 M€
                                    </td>
                                    <td className="px-4 py-4 align-top font-medium sm:px-6">1er septembre 2027</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="px-4 py-4 align-top font-medium sm:px-6">
                                        Microentreprise / TPE
                                    </th>
                                    <td className="px-4 py-4 align-top leading-relaxed text-muted-foreground sm:px-6">
                                        &lt; 10 salariés, et CA ou bilan ≤ 2 M€
                                    </td>
                                    <td className="px-4 py-4 align-top font-medium sm:px-6">1er septembre 2027</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-5 space-y-3 text-base leading-relaxed text-muted-foreground">
                        <p>
                            Les seuils viennent du Code de commerce (décret n° 2008-1354). Le classement se fait
                            sur le dernier exercice clos, en retenant le critère (effectif, chiffre d'affaires ou
                            bilan) le plus favorable à l'entreprise.
                        </p>
                        <p>
                            Précision utile, pour ne pas prêter à la loi plus qu'elle ne dit : l'article 289 bis
                            du Code général des impôts, qui fonde l'obligation, ne détaille pas lui-même ce
                            calendrier par taille ; il renvoie à un arrêté du ministre chargé du budget. Le
                            calendrier ci-dessus est celui que l'administration fiscale publie et applique, dans
                            son guide pratique et sur impots.gouv.fr. Une entreprise qui n'est pas encore soumise
                            à l'obligation d'émission peut, si elle le souhaite, émettre volontairement en
                            électronique avant sa propre date.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="mx-auto max-w-3xl px-5 py-12">
                <Reveal>
                    <h2 className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight">
                        <ShieldCheck className="size-6 shrink-0 text-primary" aria-hidden="true" />
                        Ce qui change concrètement
                    </h2>

                    <h3 className="mt-6 text-lg font-semibold tracking-tight">Une facture ne circule plus par simple email</h3>
                    <div className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
                        <p>
                            Pour les opérations concernées, la facture n'est plus un PDF joint à un email ou
                            envoyé par courrier : elle doit être émise, transmise et reçue par l'intermédiaire
                            d'une plateforme accréditée par l'administration. Le texte de loi le dit sans
                            détour :
                        </p>
                        <blockquote className="border-l-2 border-primary/40 pl-4 text-foreground/90 italic">
                            « L'émission, la transmission et la réception des factures électroniques s'effectuent
                            en recourant à une plateforme agréée. »
                        </blockquote>
                        <p className="text-sm">Code général des impôts, art. 289 bis, I.</p>
                    </div>

                    <h3 className="mt-8 text-lg font-semibold tracking-tight">Qu'est-ce qu'une PDP</h3>
                    <div className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
                        <p>
                            Une PDP, Plateforme de Dématérialisation Partenaire, est ce que la loi appelle une
                            plateforme agréée. L'administration fiscale la définit comme
                        </p>
                        <blockquote className="border-l-2 border-primary/40 pl-4 text-foreground/90 italic">
                            « un opérateur de dématérialisation qui a fait l'objet d'une procédure
                            d'immatriculation par l'administration. »
                        </blockquote>
                        <p>
                            Cette immatriculation est valable trois ans, renouvelable. Une PDP est une société
                            privée, choisie et payée par l'entreprise ; la liste des plateformes immatriculées
                            est publiée par la DGFiP. Le portail public (le PPF, adossé à Chorus Pro) n'a plus
                            vocation à servir de solution d'émission universelle et gratuite : chaque entreprise
                            doit passer par une plateforme accréditée, la sienne ou celle de son prestataire.
                        </p>
                    </div>

                    <h3 className="mt-8 text-lg font-semibold tracking-tight">Pourquoi ce n'est pas une simple formalité</h3>
                    <div className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
                        <p>Ne pas émettre une facture concernée dans la forme électronique attendue est sanctionné :</p>
                        <blockquote className="border-l-2 border-primary/40 pl-4 text-foreground/90 italic">
                            « Le non-respect par l'assujetti de l'obligation d'émission d'une facture sous une
                            forme électronique dans les conditions prévues à l'article 289 bis donne lieu à
                            l'application d'une amende de 50 € par facture, sans que le total des amendes
                            appliquées au titre d'une même année civile puisse être supérieur à 15 000 €. »
                        </blockquote>
                        <p className="text-sm">Code général des impôts, art. 1737, III.</p>
                        <p>
                            Pour l'entreprise qui persiste à ne pas passer par une plateforme accréditée après
                            mise en demeure, l'amende grimpe à 500 € puis 1 000 € par trimestre de manquement
                            constaté (même article, IV bis).
                        </p>
                    </div>

                    <h3 className="mt-8 text-lg font-semibold tracking-tight">Les formats acceptés</h3>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                        Trois formats sont admis, tous construits sur le socle sémantique européen EN 16931
                        (directive 2014/55/UE) : Factur-X (un PDF lisible par un humain, avec un fichier XML
                        intégré, lisible par une machine), UBL et CII (deux formats XML purs, sans PDF). Le choix
                        du format est presque toujours pris en charge par l'outil de facturation ou par la
                        plateforme elle-même ; ce n'est pas quelque chose à saisir à la main.
                    </p>

                    <h3 className="mt-8 text-lg font-semibold tracking-tight">Combien de temps garder ses factures</h3>
                    <div className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
                        <p>
                            Deux obligations distinctes s'appliquent en même temps, pas l'une à la place de
                            l'autre :
                        </p>
                        <ul className="ml-1 list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
                            <li>
                                Six ans à compter de la date de la facture, pour les besoins du contrôle fiscal
                                (Livre des procédures fiscales, art. L102 B) : les documents « doivent être
                                conservés pendant un délai de six ans à compter de la date de la dernière
                                opération mentionnée sur les livres ou registres ou de la date à laquelle les
                                documents ou pièces ont été établis. »
                            </li>
                            <li>
                                Dix ans pour les documents comptables (Code de commerce, art. L123-22) : « Les
                                documents comptables et les pièces justificatives sont conservés pendant dix
                                ans. »
                            </li>
                        </ul>
                        <p>
                            Comme les deux obligations coexistent, la durée à respecter en pratique est la plus
                            longue des deux : dix ans.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="mx-auto max-w-3xl px-5 py-12">
                <Reveal>
                    <h2 className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight">
                        <CircleCheck className="size-6 shrink-0 text-primary" aria-hidden="true" />
                        Ce qu'il faut vérifier avant de choisir un outil
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                        Ce guide ne compare aucun éditeur. Voici les questions qui valent la peine d'être posées
                        à n'importe quel outil, y compris celui que vous utilisez déjà :
                    </p>
                    <ul className="mt-5 space-y-3">
                        {[
                            "Est-il réellement connecté à une plateforme immatriculée par la DGFiP, ou renvoie-t-il vers une plateforme que vous devez choisir et payer vous-même ?",
                            'Génère-t-il les factures dans un des trois formats acceptés (Factur-X, UBL ou CII), conformes au socle EN 16931 ?',
                            "Gère-t-il la numérotation continue des factures et les documents de correction (facture rectificative, avoir) que la loi impose en cas d'erreur ?",
                            "Archive-t-il vos factures pour la durée légale, avec une preuve d'intégrité dans le temps ?",
                            'Si vous facturez une administration, sait-il router la facture vers Chorus Pro, dans le bon format ?',
                            "Si votre obligation d'émission ne commence qu'en 2027, pouvez-vous déjà recevoir des factures électroniques, et émettre volontairement plus tôt si vous le souhaitez ?",
                            'Vos données restent-elles récupérables si vous changez d\'outil plus tard ?',
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
                            Une façon d'y répondre
                        </h2>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                            Invoicerr est l'une des façons de répondre à ces obligations : un logiciel de
                            facturation open source qui génère la facture au format Factur-X, se connecte à la
                            plateforme accréditée de votre choix, et applique la bascule vers le canal
                            électronique à la date que porte votre facture. Ce n'est pas la seule façon de faire,
                            et ce paragraphe ne cherche pas à vous convaincre du contraire : les questions
                            ci-dessus valent pour n'importe quel outil, y compris celui-ci.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                            <Button size="lg" asChild className="h-11 px-6 text-base active:scale-[0.98]">
                                <a href={links.app}>
                                    Utiliser Invoicerr dès maintenant
                                    <ArrowRight />
                                </a>
                            </Button>
                            <a
                                href={links.selfHost}
                                className="text-sm font-medium text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                            >
                                ou l'héberger vous-même, gratuitement
                            </a>
                        </div>
                    </div>
                </Reveal>
            </section>

            <section className="mx-auto max-w-3xl px-5 pb-24">
                <Reveal>
                    <h2 className="text-lg font-semibold tracking-tight">Sources</h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        Chaque affirmation de cette page est reliée au texte ou à la page qui la porte. Vérifiée
                        directement sur ces adresses le 23 septembre 2026.
                    </p>
                    <dl className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
                        <div>
                            <dt className="font-medium text-foreground">Obligation de recourir à une plateforme agréée, formats acceptés</dt>
                            <dd>
                                Code général des impôts, art. 289 bis, I.{' '}
                                <a
                                    href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000046195635"
                                    className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                                >
                                    legifrance.gouv.fr
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-medium text-foreground">Amendes pour non-respect de l'obligation d'émission électronique</dt>
                            <dd>
                                Code général des impôts, art. 1737, III et IV bis.{' '}
                                <a
                                    href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000046869201"
                                    className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                                >
                                    legifrance.gouv.fr
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-medium text-foreground">Définition d'une plateforme agréée (PDP), immatriculation de trois ans</dt>
                            <dd>
                                DGFiP, « Facturation électronique et plateformes agréées ».{' '}
                                <a
                                    href="https://www.impots.gouv.fr/facturation-electronique-et-plateformes-agreees"
                                    className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                                >
                                    impots.gouv.fr
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-medium text-foreground">Généralisation de la réception au 1er septembre 2026</dt>
                            <dd>
                                DGFiP, « Facturation électronique : guide pratique de démarrage au 1er septembre
                                2026 » (PDF).{' '}
                                <a
                                    href="https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/guide_pratique_facturation_electronique.pdf"
                                    className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                                >
                                    impots.gouv.fr
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-medium text-foreground">Conservation de six ans (contrôle fiscal)</dt>
                            <dd>
                                Livre des procédures fiscales, art. L102 B.{' '}
                                <a
                                    href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000041471233"
                                    className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                                >
                                    legifrance.gouv.fr
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-medium text-foreground">Conservation de dix ans (documents comptables)</dt>
                            <dd>
                                Code de commerce, art. L123-22.{' '}
                                <a
                                    href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006219327"
                                    className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                                >
                                    legifrance.gouv.fr
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-medium text-foreground">Seuils grande entreprise / ETI / PME / microentreprise (décret n° 2008-1354)</dt>
                            <dd>
                                INSEE, définitions des catégories d'entreprise.{' '}
                                <a
                                    href="https://www.insee.fr/fr/metadonnees/definition/c1057"
                                    className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                                >
                                    insee.fr
                                </a>
                            </dd>
                        </div>
                    </dl>
                </Reveal>
            </section>
        </>
    )
}
