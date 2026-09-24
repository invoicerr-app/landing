import { ArrowRightLeft, BadgeCheck, CircleCheck, Landmark, ListChecks, Plug, Workflow } from 'lucide-react'

import { A, Closing, GuideHero, GuideSection, H3, List, Quote, Sources, Strong, Table } from '@/components/guide-parts'

// Companion to e-invoicing-guide-fr.tsx: that page says who must use an approved platform and from
// when; this one says what such a platform is, how to check that one is approved, and what connecting
// to it involves. Same discipline: no platform, software vendor or competitor is named, and the
// official list is linked rather than reproduced.
//
// The texts were rewritten this year (loi n° 2026-103 de finances pour 2026, art. 123; décret
// n° 2026-677 and arrêté of 27 July 2026), which is also when "PDP" gave way to "plateforme agréée" in
// the code. Légifrance refuses automated reads, so the consolidated articles were read from DILA's
// official LEGI and JORF open-data files, which carry the same text; the Légifrance links below are
// built from the official article identifiers.
export function PlateformeAgreeeGuideFr() {
    return (
        <>
            <GuideHero title="Plateforme agréée : la choisir et s’y raccorder">
                Depuis le 1er septembre 2026, toute entreprise concernée par la réforme doit pouvoir
                recevoir ses factures électroniques par une plateforme agréée. Cette page explique ce
                qu'est une telle plateforme selon les textes en vigueur, comment vérifier qu'elle est bien
                immatriculée, ce que change le fait de s'y raccorder, et comment en changer. Aucune
                plateforme ni aucun éditeur n'y est cité ni comparé.
            </GuideHero>

            <GuideSection icon={Landmark} title="Ce qu'est une plateforme agréée">
                <p>
                    C'est le seul intermédiaire par lequel une facture électronique entre entreprises peut
                    circuler en France :
                </p>
                <Quote cite="Code général des impôts, art. 289 bis, I, deuxième alinéa.">
                    « L'émission, la transmission et la réception des factures électroniques s'effectuent en
                    recourant à une plateforme agréée. »
                </Quote>
                <p>
                    Le terme a remplacé celui de « plateforme de dématérialisation partenaire » (PDP) dans le
                    code général des impôts avec la loi de finances pour 2026 (loi n° 2026-103 du 19 février
                    2026, art. 123), puis dans ses annexes avec le décret n° 2026-677 et l'arrêté du 27 juillet
                    2026. Ce sont les mêmes opérateurs : les documents plus anciens, et le{' '}
                    <A href="/facturation-electronique/">guide général</A> de ce site, parlent encore de PDP.
                </p>
                <p>L'administration la définit ainsi :</p>
                <Quote cite="impots.gouv.fr, « Je consulte la liste des plateformes agréées ».">
                    « Une plateforme agréée est un opérateur de dématérialisation immatriculé par l'État. »
                </Quote>

                <H3>L'État ne transmet pas les factures</H3>
                <p>
                    À la question « Pourquoi n'y a-t-il pas de plateforme gratuite de l'État ? »,
                    l'administration répond : « La France a fait le choix de ne pas créer de portail public
                    unique » (DGFiP, « Tout savoir sur la facturation électronique »). Le rôle de l'État se
                    limite à tenir l'annuaire qui dit à quelle plateforme adresser la facture de chaque
                    destinataire :
                </p>
                <Quote cite="Code général des impôts, art. 289 bis, III.">
                    « l'Etat met un annuaire central à la disposition des plateformes agréées. Cet annuaire
                    est constitué et mis à jour à partir des informations transmises par ces plateformes et
                    recense les informations nécessaires à l'adressage des factures électroniques aux
                    plateformes agréées des destinataires de ces factures. »
                </Quote>

                <H3>Votre logiciel n'est pas forcément une plateforme</H3>
                <p>
                    Un logiciel de facturation ou de comptabilité peut préparer vos factures sans être une
                    plateforme agréée. L'administration appelle ces outils des « solutions compatibles » et
                    fixe deux conditions cumulatives :
                </p>
                <Quote cite="DGFiP, FAQ « Je découvre la facturation électronique », version du 01/09/2026, question 2.3.">
                    « mettre à disposition des fonctionnalités compatibles avec les attendus de la réforme et
                    être connecté à au moins une plateforme agréée. »
                </Quote>
                <p>
                    Seule la plateforme peut remettre la facture à la plateforme du client : les
                    spécifications externes de la DGFiP précisent que ces solutions « ne peuvent pas
                    transmettre directement les factures électroniques à leurs destinataires ».
                </p>
            </GuideSection>

            <GuideSection icon={Workflow} title="Ce que la plateforme fait pour vous">
                <p>
                    La liste des services qu'une plateforme agréée est tenue de proposer figure à l'article
                    242 nonies E de l'annexe II du code général des impôts. En substance :
                </p>
                <List>
                    <li>
                        <Strong>Émettre</Strong> vos factures, après les contrôles réglementaires, et les
                        transmettre à la plateforme choisie par chaque client (4°).
                    </li>
                    <li>
                        <Strong>Recevoir</Strong> les factures que les autres plateformes vous adressent, et
                        vous les mettre à disposition (5°).
                    </li>
                    <li>
                        <Strong>Tenir à jour votre inscription</Strong> dans l'annuaire central (3°).
                    </li>
                    <li>
                        <Strong>Suivre les statuts</Strong> de chaque facture et les transmettre à
                        l'administration et à la plateforme de l'autre partie (6°).
                    </li>
                    <li>
                        <Strong>Transmettre à l'administration</Strong> les données de facturation, et les
                        données de transaction et de paiement de l'e-reporting (7° et 8°).
                    </li>
                </List>

                <H3>Les quatre statuts obligatoires</H3>
                <p>
                    Parmi les statuts de traitement qu'une facture traverse, quatre sont obligatoires
                    (annexe IV du CGI, art. 41 septies G, I) : « Dépôt », l'acceptation de la facture par la
                    plateforme de l'émetteur ; « Rejet », par l'une des deux plateformes, si le format ou les
                    contrôles ne sont pas conformes ; « Refus », par le destinataire ; « Encaissée », qui porte
                    les données de paiement. Les autres statuts prévus par les spécifications sont
                    facultatifs.
                </p>
            </GuideSection>

            <GuideSection icon={BadgeCheck} title="Vérifier qu'une plateforme est bien agréée">
                <H3>Un numéro d'immatriculation, pour trois ans</H3>
                <Quote cite="Code général des impôts, art. 290 B, deuxième alinéa.">
                    « l'administration fiscale attribue aux plateformes agréées un numéro d'immatriculation
                    pour une durée de trois ans renouvelable. Cette attribution peut être assortie de
                    réserves. »
                </Quote>
                <p>
                    Pour l'obtenir, l'opérateur dépose un dossier dont le contenu est fixé à l'article 242
                    nonies B de l'annexe II. Parmi les pièces exigées :
                </p>
                <List>
                    <li>
                        une certification ISO/IEC 27001 en cours de validité de son système d'information,
                        avec l'engagement de l'exploiter depuis un État membre de l'Union européenne et de
                        s'assurer « qu'aucun transfert en-dehors de l'Union européenne des données hébergées
                        du service qu'elle opère n'est possible » (I, 5°) ;
                    </li>
                    <li>
                        s'il recourt à un hébergeur en nuage, la qualification « SecNumCloud » délivrée par
                        l'ANSSI (I, 4°) ;
                    </li>
                    <li>
                        un rapport d'audit de conformité dans l'année qui suit l'immatriculation, puis un audit
                        de surveillance au plus tard à la fin de la deuxième année (I, 6°) ;
                    </li>
                    <li>
                        des tests d'interopérabilité avec l'annuaire central, avec la solution de
                        l'administration et avec une autre plateforme agréée (I, 7°) ;
                    </li>
                    <li>l'identité des personnes qui la contrôlent (I, 8°).</li>
                </List>
                <p>
                    L'administration se prononce dans les deux mois qui suivent un dossier complet (III). Le
                    renouvellement se demande au plus tard cinq mois avant l'expiration (art. 242 nonies C).
                </p>

                <H3>La liste officielle</H3>
                <p>
                    La DGFiP publie la liste des plateformes sur impots.gouv.fr, en deux parties. À sa mise à
                    jour du 22 septembre 2026, la première, celle des opérateurs « satisfaisant à l'ensemble
                    des conditions, incluant les tests d'interopérabilité », comptait 149 entrées ; la
                    seconde, celle des opérateurs dont le dossier est complet mais qui attendent encore
                    l'issue de ces tests, en comptait 14. La distinction compte :
                </p>
                <Quote cite="impots.gouv.fr, « Je consulte la liste des plateformes agréées ».">
                    « L'immatriculation définitive n'est accordée qu'après réussite des tests
                    d'interopérabilité en conditions réelles. »
                </Quote>
                <p>
                    Avant de signer, vérifiez donc sur{' '}
                    <A href="https://www.impots.gouv.fr/je-consulte-la-liste-des-plateformes-agreees">
                        la liste de l'administration
                    </A>{' '}
                    dans laquelle des deux figure la plateforme, et non sur le seul site de l'opérateur. Si
                    vous passez par votre logiciel habituel, demandez-lui à quelle plateforme il est
                    raccordé, puis vérifiez celle-ci.
                </p>
            </GuideSection>

            <GuideSection icon={ListChecks} title="La choisir">
                <Quote cite="DGFiP, FAQ « Je découvre la facturation électronique », version du 01/09/2026, question 2.1.">
                    « Le choix de la plateforme est totalement libre et relève d'une décision de gestion du
                    chef d'entreprise ; une entreprise peut choisir une ou plusieurs plateforme(s)
                    agréée(s). »
                </Quote>
                <p>Trois conséquences pratiques, toutes écrites par l'administration :</p>
                <List>
                    <li>
                        <Strong>Pas besoin de la même plateforme que vos clients.</Strong> Les plateformes sont
                        tenues de s'échanger les factures entre elles : « Les plateformes agréées assurent
                        l'interopérabilité des échanges entre elles en recourant à une convention
                        d'interopérabilité bilatérale ou un protocole d'échange d'information en réseau »
                        (annexe II du CGI, art. 242 nonies I).
                    </li>
                    <li>
                        <Strong>Émission et réception peuvent être séparées.</Strong> Une entreprise « peut
                        avoir recours à des plateformes différentes pour l'émission et la réception de ses
                        factures » (FAQ, question 2.2).
                    </li>
                    <li>
                        <Strong>Le choix n'est pas définitif.</Strong> « Un changement de plateforme agréée
                        est possible, à tout moment » (FAQ, question 2.1). La section suivante dit comment.
                    </li>
                </List>
                <p>
                    Le « protocole d'échange d'information en réseau » peut être Peppol : la DGFiP indique
                    être devenue « Autorité Peppol pour la France ». Ce que recouvre ce réseau est expliqué,
                    en anglais, sur <A href="/e-invoicing/peppol/" lang="en">la page Peppol</A>.
                </p>
            </GuideSection>

            <GuideSection icon={Plug} title="S'y raccorder">
                <H3>1. Signer un accord formel</H3>
                <p>
                    Le raccordement passe par un accord écrit entre l'entreprise et la plateforme qu'elle
                    désigne pour recevoir ses factures. Sans lui, la plateforme ne peut pas vous inscrire :
                </p>
                <Quote cite="Annexe II du CGI, art. 242 nonies H, III.">
                    « La plateforme agréée désignée pour la réception des factures électroniques doit disposer
                    de l'accord formel de l'assujetti destinataire des factures pour actualiser les
                    informations d'adressage des factures concernant ce dernier dans l'annuaire central. »
                </Quote>

                <H3>2. Choisir à quelle adresse recevoir</H3>
                <p>
                    L'accord précise à quel niveau vos factures sont adressées (annexe IV du CGI, art. 41
                    septies A bis, I, 4°) : une adresse principale au niveau de l'entreprise (SIREN), des
                    adresses secondaires par établissement (SIRET), des adresses additionnelles par code de
                    routage à l'intérieur d'un établissement, ou des adresses fonctionnelles par suffixe.
                    C'est ce choix qui détermine si chaque site ou chaque service reçoit ses propres
                    factures.
                </p>

                <H3>3. Vérifier son inscription à l'annuaire</H3>
                <p>
                    C'est la plateforme, pas l'entreprise, qui inscrit l'adresse dans l'annuaire central. Tant
                    que l'inscription n'y figure pas, aucun fournisseur ne peut vous adresser de facture
                    électronique :
                </p>
                <Quote cite="DGFiP, « Tout savoir sur la facturation électronique » (PDF).">
                    « Si une entreprise cliente n'a pas encore choisi de plateforme agréée de réception, il
                    est impossible de lui faire parvenir la facture en format électronique car son adresse ne
                    figurera pas dans l'annuaire des destinataires. […] À titre exceptionnel, la facture
                    pourra alors être transmise par e-mail ou courrier. »
                </Quote>

                <H3>Et si ce n'est pas encore fait</H3>
                <p>La démarche est attendue sans délai, par le canal que l'entreprise utilise déjà :</p>
                <Quote cite="DGFiP, « Facturation électronique : guide pratique de démarrage au 1er septembre 2026 », question 1.">
                    « L'entreprise qui n'a pas encore désigné de plateforme doit donc engager cette démarche
                    sans attendre, directement auprès d'une plateforme agréée ou par l'intermédiaire de sa
                    solution habituelle : logiciel de gestion, logiciel de comptabilité, expert-comptable,
                    banque ou autre prestataire. »
                </Quote>
                <p>
                    Le même guide annonce qu'en phase de démarrage les sanctions ne seront pas appliquées aux
                    entreprises « engagées dans une trajectoire sérieuse de mise en conformité », et précise
                    aussitôt : « Cette approche ne constitue ni un report ni une suspension de l'obligation. »
                </p>
            </GuideSection>

            <GuideSection icon={ArrowRightLeft} title="Changer de plateforme">
                <p>
                    La loi exige que le changement soit organisé, et que l'ancienne plateforme continue à
                    fournir un service minimal pendant au moins un an (CGI, art. 289 bis, III). Les délais
                    sont fixés à l'article 242 nonies E ter de l'annexe II :
                </p>
                <Table
                    minWidth={520}
                    head={['Étape', 'Qui', 'Délai']}
                    rows={[
                        ['Signaler l’accord formel à l’ancienne plateforme', 'La nouvelle plateforme', '2 jours ouvrables'],
                        ['S’opposer au changement, le cas échéant', 'L’ancienne plateforme', '5 jours ouvrables'],
                        ['Inscrire la nouvelle adresse dans l’annuaire', 'La nouvelle plateforme', '15 jours ouvrables après l’accord de l’ancienne'],
                    ]}
                />
                <p>
                    Après le changement, la gestion des statuts de traitement des factures est maintenue par
                    l'ancienne plateforme « durant une période d'un an » (art. 242 nonies E quater).
                </p>
            </GuideSection>

            <GuideSection icon={CircleCheck} title="Les questions à poser avant de signer">
                <p>
                    Cette page ne compare aucune plateforme. Voici les questions qui valent pour n'importe
                    laquelle, y compris celle que votre logiciel vous propose déjà :
                </p>
                <ul className="space-y-3">
                    {[
                        'Dans laquelle des deux listes de la DGFiP figure-t-elle : immatriculation définitive, ou en attente des tests d’interopérabilité ?',
                        'Son immatriculation est-elle assortie de réserves ?',
                        'Si je passe par mon logiciel habituel, à quelle plateforme est-il raccordé exactement ?',
                        'À quel niveau propose-t-elle de m’inscrire à l’annuaire : SIREN, SIRET, code de routage, suffixe ?',
                        'Gère-t-elle aussi mon e-reporting, ou seulement l’échange de factures ?',
                        'Que prévoit le contrat si je change de plateforme, au-delà du minimum légal d’un an ?',
                        'Mes factures et leurs statuts restent-ils récupérables, dans un format ouvert, si je pars ?',
                    ].map((question) => (
                        <li key={question} className="flex gap-3">
                            <CircleCheck className="mt-0.5 size-4.5 shrink-0 text-primary" aria-hidden="true" />
                            {question}
                        </li>
                    ))}
                </ul>
            </GuideSection>

            <GuideSection title="Un texte en cours de déplacement">
                <p className="text-sm">
                    Les articles 289 bis, 290 A et 290 B du code général des impôts cités ici sont en vigueur
                    aujourd'hui, mais l'ordonnance n° 2025-1247 du 17 décembre 2025 transfère les règles de
                    TVA vers le code des impositions sur les biens et services. La note officielle jointe à
                    ces articles indique que leurs dispositions sont « abrogées à compter du 1er janvier
                    2027 », à l'exception de celles « maintenues en vigueur jusqu'à leur reprise » par les
                    mesures réglementaires prévues par ce nouveau code. Les références d'articles changeront
                    donc ; le fond cité ici reste celui des textes en vigueur au 24 septembre 2026.
                </p>
            </GuideSection>

            <Closing
                icon={Landmark}
                title="Une façon d'y répondre"
                cta="Utiliser Invoicerr dès maintenant"
                selfHost="ou l'héberger vous-même, gratuitement"
            >
                Invoicerr est l'une des façons de s'y préparer : un logiciel de facturation open source,
                qui construit la facture au format Factur-X et la transmet par la plateforme agréée de
                votre choix. Ce n'est pas la seule façon de faire, et ce paragraphe ne cherche pas à vous
                convaincre du contraire : les questions ci-dessus valent pour n'importe quel outil, y
                compris celui-ci.
            </Closing>

            <Sources
                title="Sources"
                intro="Chaque affirmation de cette page est reliée au texte qui la porte. Vérifiées le 24 septembre 2026. Légifrance refusant la lecture automatisée, les articles de code ont été lus dans les données ouvertes officielles de la DILA (bases LEGI et JORF), qui publient le même texte ; les liens ci-dessous mènent à l'article sur Légifrance."
                sources={[
                    {
                        claim: 'Recours obligatoire à une plateforme agréée, annuaire central, changement de plateforme',
                        reference: 'Code général des impôts, art. 289 bis, I et III, version en vigueur depuis le 21 février 2026.',
                        href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000053546660',
                    },
                    {
                        claim: 'Immatriculation pour trois ans renouvelable, réserves',
                        reference: 'Code général des impôts, art. 290 B.',
                        href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000053546682',
                    },
                    {
                        claim: 'Changement de dénomination en « plateformes agréées »',
                        reference: 'Loi n° 2026-103 du 19 février 2026 de finances pour 2026, art. 123.',
                        href: 'https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000053508878',
                    },
                    {
                        claim: 'Mise à jour des annexes au CGI',
                        reference: 'Décret n° 2026-677 du 27 juillet 2026 ; arrêté du 27 juillet 2026.',
                        href: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000054499487',
                    },
                    {
                        claim: "Conditions d'immatriculation : ISO/IEC 27001, SecNumCloud, Union européenne, audits, interopérabilité, contrôle",
                        reference: 'Annexe II au CGI, art. 242 nonies B.',
                        href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000054552495',
                    },
                    {
                        claim: 'Renouvellement cinq mois avant expiration',
                        reference: 'Annexe II au CGI, art. 242 nonies C.',
                        href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000054552503',
                    },
                    {
                        claim: 'Services obligatoires des plateformes',
                        reference: 'Annexe II au CGI, art. 242 nonies E.',
                        href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000054552509',
                    },
                    {
                        claim: 'Délais de changement de plateforme, services maintenus un an',
                        reference: 'Annexe II au CGI, art. 242 nonies E ter et E quater.',
                        href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000054543966',
                    },
                    {
                        claim: 'Annuaire central, accord formel',
                        reference: 'Annexe II au CGI, art. 242 nonies H.',
                        href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000054552531',
                    },
                    {
                        claim: 'Interopérabilité entre plateformes',
                        reference: 'Annexe II au CGI, art. 242 nonies I.',
                        href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000054552548',
                    },
                    {
                        claim: "Niveaux d'adressage dans l'accord formel",
                        reference: 'Annexe IV au CGI, art. 41 septies A bis.',
                        href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000054543499',
                    },
                    {
                        claim: 'Statuts de traitement obligatoires',
                        reference: 'Annexe IV au CGI, art. 41 septies G.',
                        href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000054606169',
                    },
                    {
                        claim: 'Définition, listes des plateformes, immatriculation définitive après tests',
                        reference: 'DGFiP, « Je consulte la liste des plateformes agréées », mise à jour du 22/09/2026.',
                        href: 'https://www.impots.gouv.fr/je-consulte-la-liste-des-plateformes-agreees',
                    },
                    {
                        claim: 'Libre choix, plusieurs plateformes, changement à tout moment, solutions compatibles',
                        reference: 'DGFiP, FAQ « Je découvre la facturation électronique », version du 01/09/2026, questions 2.1 à 2.3.',
                        href: 'https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/faq---fe_je-decouvre-la-facturation-electronique.pdf',
                    },
                    {
                        claim: 'Engager la démarche sans attendre, phase de démarrage',
                        reference: 'DGFiP, « Facturation électronique : guide pratique de démarrage au 1er septembre 2026 », juillet 2026.',
                        href: 'https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/guide_pratique_facturation_electronique.pdf',
                    },
                    {
                        claim: "Client absent de l'annuaire",
                        reference: 'DGFiP, « Tout savoir sur la facturation électronique ».',
                        href: 'https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/faq_tout_savoir_facturation-electronique.pdf',
                    },
                    {
                        claim: 'Les solutions compatibles ne transmettent pas directement',
                        reference: 'AIFE, Dossier de spécifications externes de la facturation électronique, document général, version 3.2 du 30/04/2026, § 2.3.4.',
                        href: 'https://www.impots.gouv.fr/specifications-externes-b2b',
                    },
                    {
                        claim: 'DGFiP, Autorité Peppol pour la France',
                        reference: 'DGFiP, « Rejoindre le réseau Peppol ».',
                        href: 'https://www.impots.gouv.fr/rejoindre-le-reseau-peppol',
                    },
                ]}
            />
        </>
    )
}
