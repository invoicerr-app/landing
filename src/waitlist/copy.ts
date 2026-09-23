// The waiting list page, six times over, written in each language rather than translated from the
// English one. Same rule as the five country guides: the reader gets a page that was written for
// them, not a string table run through a machine.
//
// The four warnings (November 2026, Polar's sandbox, draft legal documents, no real invoices) are
// the reason this page exists as much as the form is. They say the same thing in every language: if
// one of them reads vaguer here than it does in English, it is wrong.
//
// House rule, everywhere in this repository and in this copy: no em dashes.

import type { CompanySizeValue, CountryValue, Language } from './languages'

export interface Warning {
    title: string
    body: string
}

export interface WaitlistCopy {
    /** Native name, used by the other five pages to link here. */
    nativeName: string
    meta: { title: string; description: string }
    /** Said plainly on the page: a visitor is never served a language they did not ask for silently. */
    inThisLanguage: string
    otherLanguages: string
    eyebrow: string
    heading: string
    intro: string[]
    warningsHeading: string
    warnings: [Warning, Warning, Warning, Warning]
    form: {
        heading: string
        emailLabel: string
        emailPlaceholder: string
        countryLabel: string
        countryPlaceholder: string
        countries: Record<CountryValue, string>
        sizeLabel: string
        sizePlaceholder: string
        sizes: Record<CompanySizeValue, string>
        whyRequired: string
        submit: string
        submitting: string
    }
    errors: { email: string; country: string; companySize: string; network: string; rateLimited: string }
    success: { title: string; body: string }
    /** One line: who processes the data, why, for how long, and how to be removed. */
    privacy: { before: string; linkLabel: string; after: string }
    backHome: string
}

const en: WaitlistCopy = {
    nativeName: 'English',
    meta: {
        title: 'Waiting list: the hosted version of Invoicerr opens in November 2026 · Invoicerr',
        description:
            'The hosted version of Invoicerr is not open yet. Leave your e-mail address, your country and your company size, and we will write to you once, on the day it opens.',
    },
    inThisLanguage: 'This page is in English.',
    otherLanguages: 'Read it in:',
    eyebrow: 'Waiting list',
    heading: 'The hosted version opens in November 2026',
    intro: [
        'You clicked a button that does not lead anywhere yet, and that is on us. The hosted version of Invoicerr is not open: it opens on 1 November 2026. Until then there is nothing to subscribe to and nothing to pay.',
        'Leave your address below and we will write to you once, on the day it opens. Your country and the size of your company decide which national platform gets connected first, which is why both are asked.',
    ],
    warningsHeading: 'Four things to know before you leave your address',
    warnings: [
        {
            title: 'The hosted version opens in November 2026',
            body: 'Not before. What runs today is a closed beta, and the beta is not the hosted offer. The only thing this page does is remember you until then.',
        },
        {
            title: "Billing runs in Polar's sandbox",
            body: 'During the beta every payment goes through the sandbox of Polar, the payment provider. No card is ever charged, no subscription is real, and what looks like a receipt there is not one.',
        },
        {
            title: 'The legal documents are still marked as drafts',
            body: 'The terms of service, the privacy policy and the data processing agreement all carry a draft banner. They are with a lawyer for review and they will change before the offer opens.',
        },
        {
            title: 'Invoices issued from the beta must not be used for real',
            body: 'Invoice numbering has to run without a gap, and invoices have to be kept for years. A beta running next to your real accounting would break both quietly. Use it to look at the product, not to bill a client.',
        },
    ],
    form: {
        heading: 'Join the waiting list',
        emailLabel: 'E-mail address',
        emailPlaceholder: 'you@company.com',
        countryLabel: 'Where is your company based?',
        countryPlaceholder: 'Choose a country',
        countries: {
            FR: 'France',
            DE: 'Germany',
            IT: 'Italy',
            PL: 'Poland',
            PT: 'Portugal',
            OTHER: 'Another country',
        },
        sizeLabel: 'How many people work there?',
        sizePlaceholder: 'Choose a size',
        sizes: {
            SOLO: 'Just me',
            '2_5': '2 to 5 people',
            '6_20': '6 to 20 people',
            '20_PLUS': 'More than 20 people',
        },
        whyRequired:
            'All three are required. The country and the size are what decide which national platform is connected first, so an answer left blank is an answer that cannot be counted.',
        submit: 'Join the waiting list',
        submitting: 'Sending',
    },
    errors: {
        email: 'Enter a valid e-mail address.',
        country: 'Choose a country.',
        companySize: 'Choose a company size.',
        network: 'The list could not be reached. Try again in a moment.',
        rateLimited: 'Too many submissions have come from your connection in the last hour. Wait an hour and try again, or write to contact@invoicerr.app and we will add you by hand.',
    },
    success: {
        title: 'You are on the list.',
        body: 'We will write to you once, on the day the hosted version opens. Your address is used for that and for nothing else.',
    },
    privacy: {
        before: 'Invoicerr processes your e-mail address, your country and your company size for one purpose: telling you when the hosted version opens. They are kept until it opens and for twelve months after that, then deleted. Write to contact@invoicerr.app to be removed at any time. ',
        linkLabel: 'Privacy policy',
        after: '.',
    },
    backHome: 'Back to invoicerr.app',
}

const fr: WaitlistCopy = {
    nativeName: 'Français',
    meta: {
        title: "Liste d'attente : la version hébergée d'Invoicerr ouvre en novembre 2026 · Invoicerr",
        description:
            "La version hébergée d'Invoicerr n'est pas encore ouverte. Laissez votre adresse e-mail, votre pays et la taille de votre entreprise : nous vous écrirons une fois, le jour de l'ouverture.",
    },
    inThisLanguage: 'Cette page est en français.',
    otherLanguages: 'À lire aussi en :',
    eyebrow: "Liste d'attente",
    heading: 'La version hébergée ouvre en novembre 2026',
    intro: [
        "Vous avez cliqué sur un bouton qui ne mène encore nulle part, et c'est notre faute. La version hébergée d'Invoicerr n'est pas ouverte : elle ouvre le 1er novembre 2026. D'ici là, il n'y a rien à souscrire et rien à payer.",
        "Laissez votre adresse ci-dessous et nous vous écrirons une seule fois, le jour de l'ouverture. Votre pays et la taille de votre entreprise décident quelle plateforme nationale sera raccordée en premier : c'est pour cela que les deux sont demandés.",
    ],
    warningsHeading: 'Quatre choses à savoir avant de laisser votre adresse',
    warnings: [
        {
            title: 'La version hébergée ouvre en novembre 2026',
            body: "Pas avant. Ce qui tourne aujourd'hui est une bêta fermée, et la bêta n'est pas l'offre hébergée. Tout ce que fait cette page, c'est se souvenir de vous jusque-là.",
        },
        {
            title: 'La facturation tourne dans le bac à sable de Polar',
            body: "Pendant la bêta, tous les paiements passent par le bac à sable de Polar, le prestataire de paiement. Aucune carte n'est débitée, aucun abonnement n'est réel, et ce qui ressemble à un reçu n'en est pas un.",
        },
        {
            title: 'Les documents légaux portent encore la mention « brouillon »',
            body: "Les conditions générales, la politique de confidentialité et l'accord de sous-traitance portent tous un bandeau « brouillon ». Ils sont en relecture chez un juriste et ils changeront avant l'ouverture de l'offre.",
        },
        {
            title: 'Les factures émises depuis la bêta ne doivent pas servir pour de vrai',
            body: "La numérotation des factures doit rester continue et les factures doivent être conservées plusieurs années. Une bêta qui tournerait à côté de votre comptabilité réelle casserait les deux sans prévenir. Servez-vous-en pour regarder le produit, pas pour facturer un client.",
        },
    ],
    form: {
        heading: "Rejoindre la liste d'attente",
        emailLabel: 'Adresse e-mail',
        emailPlaceholder: 'vous@entreprise.fr',
        countryLabel: 'Où votre entreprise est-elle établie ?',
        countryPlaceholder: 'Choisissez un pays',
        countries: {
            FR: 'France',
            DE: 'Allemagne',
            IT: 'Italie',
            PL: 'Pologne',
            PT: 'Portugal',
            OTHER: 'Un autre pays',
        },
        sizeLabel: 'Combien de personnes y travaillent ?',
        sizePlaceholder: 'Choisissez une taille',
        sizes: {
            SOLO: 'Moi seulement',
            '2_5': '2 à 5 personnes',
            '6_20': '6 à 20 personnes',
            '20_PLUS': 'Plus de 20 personnes',
        },
        whyRequired:
            "Les trois champs sont obligatoires. Le pays et la taille sont ce qui décide quelle plateforme nationale sera raccordée en premier : une réponse laissée vide est une réponse qui ne peut pas être comptée.",
        submit: "Rejoindre la liste d'attente",
        submitting: 'Envoi',
    },
    errors: {
        email: 'Saisissez une adresse e-mail valide.',
        country: 'Choisissez un pays.',
        companySize: "Choisissez une taille d'entreprise.",
        network: "La liste n'a pas pu être jointe. Réessayez dans un instant.",
        rateLimited: "Trop d'envois sont partis de votre connexion dans la dernière heure. Attendez une heure et réessayez, ou écrivez à contact@invoicerr.app et nous vous ajouterons à la main.",
    },
    success: {
        title: 'Vous êtes sur la liste.',
        body: "Nous vous écrirons une seule fois, le jour de l'ouverture de la version hébergée. Votre adresse ne sert qu'à cela.",
    },
    privacy: {
        before: "Invoicerr traite votre adresse e-mail, votre pays et la taille de votre entreprise dans un seul but : vous prévenir de l'ouverture de la version hébergée. Ces données sont conservées jusqu'à l'ouverture, puis douze mois, et ensuite supprimées. Écrivez à contact@invoicerr.app pour être retiré à tout moment. ",
        linkLabel: 'Politique de confidentialité',
        after: '.',
    },
    backHome: 'Retour sur invoicerr.app',
}

const de: WaitlistCopy = {
    nativeName: 'Deutsch',
    meta: {
        title: 'Warteliste: die gehostete Version von Invoicerr startet im November 2026 · Invoicerr',
        description:
            'Die gehostete Version von Invoicerr ist noch nicht geöffnet. Hinterlassen Sie Ihre E-Mail-Adresse, Ihr Land und Ihre Unternehmensgröße. Wir schreiben Ihnen einmal, am Tag des Starts.',
    },
    inThisLanguage: 'Diese Seite ist auf Deutsch.',
    otherLanguages: 'Auch zu lesen auf:',
    eyebrow: 'Warteliste',
    heading: 'Die gehostete Version startet im November 2026',
    intro: [
        'Sie haben auf eine Schaltfläche geklickt, die noch nirgendwohin führt, und daran sind wir schuld. Die gehostete Version von Invoicerr ist nicht geöffnet: Sie startet am 1. November 2026. Bis dahin gibt es nichts zu buchen und nichts zu bezahlen.',
        'Hinterlassen Sie unten Ihre Adresse, dann schreiben wir Ihnen ein einziges Mal, am Tag des Starts. Ihr Land und die Größe Ihres Unternehmens entscheiden, welche nationale Plattform zuerst angebunden wird. Deshalb werden beide gefragt.',
    ],
    warningsHeading: 'Vier Dinge, die Sie wissen sollten, bevor Sie Ihre Adresse hinterlassen',
    warnings: [
        {
            title: 'Die gehostete Version startet im November 2026',
            body: 'Nicht früher. Was heute läuft, ist eine geschlossene Beta, und die Beta ist nicht das gehostete Angebot. Diese Seite tut nur eines: sich bis dahin an Sie erinnern.',
        },
        {
            title: 'Die Abrechnung läuft in der Sandbox von Polar',
            body: 'Während der Beta laufen alle Zahlungen über die Sandbox von Polar, dem Zahlungsdienstleister. Es wird keine Karte belastet, kein Abonnement ist echt, und was dort wie ein Beleg aussieht, ist keiner.',
        },
        {
            title: 'Die Rechtsdokumente tragen weiterhin den Vermerk Entwurf',
            body: 'Die Nutzungsbedingungen, die Datenschutzerklärung und der Auftragsverarbeitungsvertrag tragen alle ein Entwurfs-Banner. Sie liegen zur Prüfung bei einer Anwältin, und sie werden sich vor dem Start des Angebots noch ändern.',
        },
        {
            title: 'Rechnungen aus der Beta dürfen nicht für echte Geschäfte verwendet werden',
            body: 'Rechnungsnummern müssen lückenlos laufen, und Rechnungen müssen jahrelang aufbewahrt werden. Eine Beta neben Ihrer echten Buchhaltung würde beides stillschweigend brechen. Sehen Sie sich damit das Produkt an, stellen Sie damit keinem Kunden eine Rechnung.',
        },
    ],
    form: {
        heading: 'Auf die Warteliste',
        emailLabel: 'E-Mail-Adresse',
        emailPlaceholder: 'sie@unternehmen.de',
        countryLabel: 'Wo hat Ihr Unternehmen seinen Sitz?',
        countryPlaceholder: 'Land auswählen',
        countries: {
            FR: 'Frankreich',
            DE: 'Deutschland',
            IT: 'Italien',
            PL: 'Polen',
            PT: 'Portugal',
            OTHER: 'Ein anderes Land',
        },
        sizeLabel: 'Wie viele Personen arbeiten dort?',
        sizePlaceholder: 'Größe auswählen',
        sizes: {
            SOLO: 'Nur ich',
            '2_5': '2 bis 5 Personen',
            '6_20': '6 bis 20 Personen',
            '20_PLUS': 'Mehr als 20 Personen',
        },
        whyRequired:
            'Alle drei Angaben sind Pflicht. Land und Größe entscheiden, welche nationale Plattform zuerst angebunden wird: eine leer gelassene Antwort ist eine Antwort, die nicht gezählt werden kann.',
        submit: 'Auf die Warteliste',
        submitting: 'Wird gesendet',
    },
    errors: {
        email: 'Geben Sie eine gültige E-Mail-Adresse ein.',
        country: 'Wählen Sie ein Land aus.',
        companySize: 'Wählen Sie eine Unternehmensgröße aus.',
        network: 'Die Liste war nicht erreichbar. Versuchen Sie es gleich noch einmal.',
        rateLimited: 'Aus Ihrem Anschluss sind in der letzten Stunde zu viele Einträge gekommen. Warten Sie eine Stunde und versuchen Sie es erneut, oder schreiben Sie an contact@invoicerr.app, dann tragen wir Sie von Hand ein.',
    },
    success: {
        title: 'Sie stehen auf der Liste.',
        body: 'Wir schreiben Ihnen ein einziges Mal, am Tag des Starts der gehosteten Version. Ihre Adresse wird für nichts anderes verwendet.',
    },
    privacy: {
        before: 'Invoicerr verarbeitet Ihre E-Mail-Adresse, Ihr Land und Ihre Unternehmensgröße zu einem einzigen Zweck: Ihnen den Start der gehosteten Version mitzuteilen. Die Daten werden bis zum Start und danach zwölf Monate aufbewahrt und anschließend gelöscht. Schreiben Sie an contact@invoicerr.app, um jederzeit gelöscht zu werden. ',
        linkLabel: 'Datenschutzerklärung',
        after: '.',
    },
    backHome: 'Zurück zu invoicerr.app',
}

const it: WaitlistCopy = {
    nativeName: 'Italiano',
    meta: {
        title: "Lista d'attesa: la versione ospitata di Invoicerr apre a novembre 2026 · Invoicerr",
        description:
            "La versione ospitata di Invoicerr non è ancora aperta. Lascia il tuo indirizzo e-mail, il tuo paese e la dimensione della tua azienda: ti scriveremo una volta, il giorno dell'apertura.",
    },
    inThisLanguage: 'Questa pagina è in italiano.',
    otherLanguages: 'Da leggere anche in:',
    eyebrow: "Lista d'attesa",
    heading: 'La versione ospitata apre a novembre 2026',
    intro: [
        "Hai cliccato un pulsante che non porta ancora da nessuna parte, ed è colpa nostra. La versione ospitata di Invoicerr non è aperta: apre il 1° novembre 2026. Fino ad allora non c'è nulla da sottoscrivere e nulla da pagare.",
        "Lascia qui sotto il tuo indirizzo e ti scriveremo una sola volta, il giorno dell'apertura. Il tuo paese e la dimensione della tua azienda decidono quale piattaforma nazionale verrà collegata per prima: per questo vengono chiesti entrambi.",
    ],
    warningsHeading: 'Quattro cose da sapere prima di lasciare il tuo indirizzo',
    warnings: [
        {
            title: 'La versione ospitata apre a novembre 2026',
            body: "Non prima. Quello che gira oggi è una beta chiusa, e la beta non è l'offerta ospitata. L'unica cosa che fa questa pagina è ricordarsi di te fino ad allora.",
        },
        {
            title: 'La fatturazione gira nella sandbox di Polar',
            body: "Durante la beta tutti i pagamenti passano dalla sandbox di Polar, il fornitore dei pagamenti. Nessuna carta viene addebitata, nessun abbonamento è reale, e quello che sembra una ricevuta non lo è.",
        },
        {
            title: 'I documenti legali riportano ancora la dicitura bozza',
            body: "I termini di servizio, l'informativa sulla privacy e l'accordo sul trattamento dei dati riportano tutti un banner di bozza. Sono in revisione presso un avvocato e cambieranno prima dell'apertura dell'offerta.",
        },
        {
            title: 'Le fatture emesse dalla beta non vanno usate sul serio',
            body: 'La numerazione delle fatture deve essere continua e le fatture vanno conservate per anni. Una beta che gira accanto alla tua contabilità reale romperebbe entrambe le cose senza dirlo. Usala per guardare il prodotto, non per fatturare a un cliente.',
        },
    ],
    form: {
        heading: "Iscriviti alla lista d'attesa",
        emailLabel: 'Indirizzo e-mail',
        emailPlaceholder: 'tu@azienda.it',
        countryLabel: 'Dove ha sede la tua azienda?',
        countryPlaceholder: 'Scegli un paese',
        countries: {
            FR: 'Francia',
            DE: 'Germania',
            IT: 'Italia',
            PL: 'Polonia',
            PT: 'Portogallo',
            OTHER: 'Un altro paese',
        },
        sizeLabel: 'Quante persone ci lavorano?',
        sizePlaceholder: 'Scegli una dimensione',
        sizes: {
            SOLO: 'Solo io',
            '2_5': 'Da 2 a 5 persone',
            '6_20': 'Da 6 a 20 persone',
            '20_PLUS': 'Più di 20 persone',
        },
        whyRequired:
            'Tutti e tre i campi sono obbligatori. Il paese e la dimensione sono ciò che decide quale piattaforma nazionale viene collegata per prima: una risposta lasciata vuota è una risposta che non può essere contata.',
        submit: "Iscriviti alla lista d'attesa",
        submitting: 'Invio in corso',
    },
    errors: {
        email: 'Inserisci un indirizzo e-mail valido.',
        country: 'Scegli un paese.',
        companySize: "Scegli una dimensione dell'azienda.",
        network: 'Non è stato possibile raggiungere la lista. Riprova tra un istante.',
        rateLimited: "Dalla tua connessione sono arrivati troppi invii nell'ultima ora. Aspetta un'ora e riprova, oppure scrivi a contact@invoicerr.app e ti aggiungiamo a mano.",
    },
    success: {
        title: "Sei nella lista d'attesa.",
        body: "Ti scriveremo una sola volta, il giorno dell'apertura della versione ospitata. Il tuo indirizzo serve a questo e a nient'altro.",
    },
    privacy: {
        before: "Invoicerr tratta il tuo indirizzo e-mail, il tuo paese e la dimensione della tua azienda per un solo scopo: avvisarti dell'apertura della versione ospitata. I dati sono conservati fino all'apertura e per dodici mesi dopo, poi cancellati. Scrivi a contact@invoicerr.app per essere rimosso in qualsiasi momento. ",
        linkLabel: 'Informativa sulla privacy',
        after: '.',
    },
    backHome: 'Torna su invoicerr.app',
}

const pl: WaitlistCopy = {
    nativeName: 'Polski',
    meta: {
        title: 'Lista oczekujących: wersja hostowana Invoicerr rusza w listopadzie 2026 · Invoicerr',
        description:
            'Hostowana wersja Invoicerr nie jest jeszcze otwarta. Zostaw swój adres e-mail, kraj i wielkość firmy. Napiszemy raz, w dniu uruchomienia.',
    },
    inThisLanguage: 'Ta strona jest po polsku.',
    otherLanguages: 'Przeczytaj także w językach:',
    eyebrow: 'Lista oczekujących',
    heading: 'Wersja hostowana rusza w listopadzie 2026',
    intro: [
        'Kliknąłeś przycisk, który na razie nigdzie nie prowadzi, i to nasza wina. Hostowana wersja Invoicerr nie jest otwarta: rusza 1 listopada 2026. Do tego czasu nie ma czego wykupić ani za co płacić.',
        'Zostaw poniżej swój adres, a napiszemy do Ciebie jeden raz, w dniu uruchomienia. Twój kraj i wielkość Twojej firmy decydują o tym, która krajowa platforma zostanie podłączona jako pierwsza, i dlatego pytamy o jedno i drugie.',
    ],
    warningsHeading: 'Cztery rzeczy, które warto wiedzieć, zanim zostawisz swój adres',
    warnings: [
        {
            title: 'Wersja hostowana rusza w listopadzie 2026',
            body: 'Nie wcześniej. To, co działa dzisiaj, jest zamkniętą betą, a beta nie jest ofertą hostowaną. Jedyne, co robi ta strona, to pamięta o Tobie do tego czasu.',
        },
        {
            title: 'Płatności działają w piaskownicy Polar',
            body: 'W czasie bety wszystkie płatności przechodzą przez piaskownicę (sandbox) Polar, dostawcy płatności. Żadna karta nie jest obciążana, żadna subskrypcja nie jest prawdziwa, a to, co wygląda tam na potwierdzenie zapłaty, nim nie jest.',
        },
        {
            title: 'Dokumenty prawne nadal są oznaczone jako projekty',
            body: 'Regulamin, polityka prywatności i umowa powierzenia przetwarzania danych mają baner z adnotacją, że są projektami. Są w recenzji u prawnika i zmienią się przed otwarciem oferty.',
        },
        {
            title: 'Faktur wystawionych w becie nie wolno używać naprawdę',
            body: 'Numeracja faktur musi być ciągła, a faktury trzeba przechowywać przez lata. Beta działająca obok prawdziwej księgowości po cichu złamałaby jedno i drugie. Obejrzyj na niej produkt, nie wystawiaj na niej faktury klientowi.',
        },
    ],
    form: {
        heading: 'Zapisz się na listę oczekujących',
        emailLabel: 'Adres e-mail',
        emailPlaceholder: 'ty@firma.pl',
        countryLabel: 'Gdzie ma siedzibę Twoja firma?',
        countryPlaceholder: 'Wybierz kraj',
        countries: {
            FR: 'Francja',
            DE: 'Niemcy',
            IT: 'Włochy',
            PL: 'Polska',
            PT: 'Portugalia',
            OTHER: 'Inny kraj',
        },
        sizeLabel: 'Ile osób w niej pracuje?',
        sizePlaceholder: 'Wybierz wielkość',
        sizes: {
            SOLO: 'Tylko ja',
            '2_5': 'Od 2 do 5 osób',
            '6_20': 'Od 6 do 20 osób',
            '20_PLUS': 'Więcej niż 20 osób',
        },
        whyRequired:
            'Wszystkie trzy pola są wymagane. Kraj i wielkość firmy decydują o tym, która krajowa platforma zostanie podłączona jako pierwsza, więc odpowiedź zostawiona pusta to odpowiedź, której nie da się policzyć.',
        submit: 'Zapisz się na listę',
        submitting: 'Wysyłanie',
    },
    errors: {
        email: 'Podaj poprawny adres e-mail.',
        country: 'Wybierz kraj.',
        companySize: 'Wybierz wielkość firmy.',
        network: 'Nie udało się połączyć z listą. Spróbuj ponownie za chwilę.',
        rateLimited: 'Z Twojego łącza przyszło w ciągu ostatniej godziny zbyt wiele zgłoszeń. Odczekaj godzinę i spróbuj ponownie albo napisz na contact@invoicerr.app, a dopiszemy Cię ręcznie.',
    },
    success: {
        title: 'Jesteś na liście.',
        body: 'Napiszemy do Ciebie jeden raz, w dniu uruchomienia wersji hostowanej. Twój adres służy tylko do tego.',
    },
    privacy: {
        before: 'Invoicerr przetwarza Twój adres e-mail, kraj i wielkość firmy w jednym celu: aby powiadomić Cię o uruchomieniu wersji hostowanej. Dane są przechowywane do uruchomienia i przez dwanaście miesięcy po nim, a następnie usuwane. Napisz na contact@invoicerr.app, aby zostać usuniętym w dowolnym momencie. ',
        linkLabel: 'Polityka prywatności',
        after: '.',
    },
    backHome: 'Wróć na invoicerr.app',
}

const pt: WaitlistCopy = {
    nativeName: 'Português',
    meta: {
        title: 'Lista de espera: a versão alojada do Invoicerr abre em novembro de 2026 · Invoicerr',
        description:
            'A versão alojada do Invoicerr ainda não está aberta. Deixe o seu endereço de e-mail, o seu país e a dimensão da sua empresa. Escrevemos uma vez, no dia da abertura.',
    },
    inThisLanguage: 'Esta página está em português.',
    otherLanguages: 'Leia também em:',
    eyebrow: 'Lista de espera',
    heading: 'A versão alojada abre em novembro de 2026',
    intro: [
        'Clicou num botão que ainda não leva a lado nenhum, e a culpa é nossa. A versão alojada do Invoicerr não está aberta: abre a 1 de novembro de 2026. Até lá não há nada para subscrever nem nada para pagar.',
        'Deixe o seu endereço abaixo e escrevemos-lhe uma única vez, no dia da abertura. O seu país e a dimensão da sua empresa decidem qual a plataforma nacional que é ligada primeiro, e é por isso que ambos são pedidos.',
    ],
    warningsHeading: 'Quatro coisas a saber antes de deixar o seu endereço',
    warnings: [
        {
            title: 'A versão alojada abre em novembro de 2026',
            body: 'Não antes. O que corre hoje é uma beta fechada, e a beta não é a oferta alojada. A única coisa que esta página faz é lembrar-se de si até lá.',
        },
        {
            title: 'A faturação corre na sandbox da Polar',
            body: 'Durante a beta todos os pagamentos passam pela sandbox da Polar, o fornecedor de pagamentos. Nenhum cartão é debitado, nenhuma subscrição é real, e o que ali parece um recibo não é um recibo.',
        },
        {
            title: 'Os documentos legais continuam marcados como rascunhos',
            body: 'Os termos de serviço, a política de privacidade e o acordo de tratamento de dados têm todos um aviso de rascunho. Estão em revisão por um advogado e vão mudar antes da abertura da oferta.',
        },
        {
            title: 'As faturas emitidas a partir da beta não devem ser usadas a sério',
            body: 'A numeração das faturas tem de ser contínua e as faturas têm de ser guardadas durante anos. Uma beta a correr ao lado da sua contabilidade real quebraria as duas coisas em silêncio. Use-a para ver o produto, não para faturar a um cliente.',
        },
    ],
    form: {
        heading: 'Entrar na lista de espera',
        emailLabel: 'Endereço de e-mail',
        emailPlaceholder: 'voce@empresa.pt',
        countryLabel: 'Onde está sediada a sua empresa?',
        countryPlaceholder: 'Escolha um país',
        countries: {
            FR: 'França',
            DE: 'Alemanha',
            IT: 'Itália',
            PL: 'Polónia',
            PT: 'Portugal',
            OTHER: 'Outro país',
        },
        sizeLabel: 'Quantas pessoas trabalham nela?',
        sizePlaceholder: 'Escolha uma dimensão',
        sizes: {
            SOLO: 'Só eu',
            '2_5': 'De 2 a 5 pessoas',
            '6_20': 'De 6 a 20 pessoas',
            '20_PLUS': 'Mais de 20 pessoas',
        },
        whyRequired:
            'Os três campos são obrigatórios. O país e a dimensão são o que decide qual a plataforma nacional ligada primeiro, por isso uma resposta deixada em branco é uma resposta que não pode ser contada.',
        submit: 'Entrar na lista de espera',
        submitting: 'A enviar',
    },
    errors: {
        email: 'Introduza um endereço de e-mail válido.',
        country: 'Escolha um país.',
        companySize: 'Escolha uma dimensão de empresa.',
        network: 'Não foi possível contactar a lista. Tente novamente daqui a pouco.',
        rateLimited: 'Chegaram demasiados envios da sua ligação na última hora. Espere uma hora e tente outra vez, ou escreva para contact@invoicerr.app e adicionamo-lo à mão.',
    },
    success: {
        title: 'Está na lista.',
        body: 'Escrevemos-lhe uma única vez, no dia em que a versão alojada abrir. O seu endereço serve para isso e para mais nada.',
    },
    privacy: {
        before: 'A Invoicerr trata o seu endereço de e-mail, o seu país e a dimensão da sua empresa com uma única finalidade: avisá-lo da abertura da versão alojada. Os dados são conservados até à abertura e durante doze meses depois disso, e a seguir apagados. Escreva para contact@invoicerr.app para ser removido a qualquer momento. ',
        linkLabel: 'Política de privacidade',
        after: '.',
    },
    backHome: 'Voltar a invoicerr.app',
}

export const WAITLIST_COPY: Record<Language, WaitlistCopy> = { en, fr, de, it, pl, pt }
