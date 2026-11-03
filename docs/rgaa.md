# Accessibilité : grille RGAA 4.1.2

106 critères. Après corrections : **62 conformes, 0 non conforme, 44 non applicables**. Taux de conformité RGAA (C / (C + NC)) : 100 %.

Méthode :

1. Un audit par thème avec les 13 skills `MTeelokee/rgaa-accessibility-audit` sur `/`, `/ar/`, `/facturation-electronique/` et `/waitlist/fr/`, à 1440 px et 390 px, thèmes clair et sombre.
2. axe-core 4.10.3 sur les 33 pages du build, clair et sombre : 0 violation.
3. Parcours clavier complet (Tab et Maj+Tab), contraste mesuré sur les pixels réels, reflow à 320 px.
4. Preuves en images : `docs/screens/rgaa/`.

Limites : pas de test avec un vrai lecteur d'écran (NVDA, VoiceOver), seulement l'arbre d'accessibilité de Chromium. Ce n'est pas un audit officiel : une déclaration d'accessibilité demande un audit sur un échantillon de pages défini par l'article 47 de la loi n° 2005-102 et son décret n° 2019-768.

## 1 Images

| Critère | Intitulé | Statut | Note |
| --- | --- | --- | --- |
| 1.1 | Chaque image porteuse d'information a une alternative textuelle | C |  |
| 1.2 | Chaque image de décoration est ignorée par les technologies d'assistance | C | Corrigé : `aria-hidden` et `focusable=false` sur les SVG GitHub, LinkedIn et Discord |
| 1.3 | L'alternative de chaque image porteuse d'information est pertinente | C |  |
| 1.4 | Alternative d'une image CAPTCHA ou image-test | NA | Pas de CAPTCHA (le formulaire utilise un champ piège invisible) |
| 1.5 | Solution d'accès alternative au CAPTCHA | NA |  |
| 1.6 | Description détaillée si nécessaire | NA |  |
| 1.7 | Description détaillée pertinente | NA |  |
| 1.8 | Images texte remplacées par du texte stylé | NA | Les images contenant du texte sont décoratives ou relèvent de l'exception logo |
| 1.9 | Légendes d'image correctement reliées | NA |  |

## 2 Cadres

| Critère | Intitulé | Statut | Note |
| --- | --- | --- | --- |
| 2.1 | Chaque cadre a un titre | NA | Aucun `iframe` |
| 2.2 | Le titre de chaque cadre est pertinent | NA |  |

## 3 Couleurs

| Critère | Intitulé | Statut | Note |
| --- | --- | --- | --- |
| 3.1 | L'information n'est pas donnée par la couleur seule | C |  |
| 3.2 | Contraste texte / arrière-plan suffisant | C | Corrigé : menu et textes du bureau opaques, halos lumineux atténués, pied de page, en-tête du tableau du guide, placeholder, survol du bouton « verre » |
| 3.3 | Contraste des composants d'interface et éléments graphiques | C | Corrigé : bordure des champs du formulaire, état sélectionné Mensuel / Annuel |

## 4 Multimédia

| Critère | Intitulé | Statut | Note |
| --- | --- | --- | --- |
| 4.1 | Transcription ou audiodescription des médias temporels préenregistrés | NA | Aucun média audio ou vidéo |
| 4.2 | Pertinence de la transcription ou de l'audiodescription | NA |  |
| 4.3 | Sous-titres synchronisés | NA |  |
| 4.4 | Pertinence des sous-titres | NA |  |
| 4.5 | Audiodescription synchronisée | NA |  |
| 4.6 | Pertinence de l'audiodescription | NA |  |
| 4.7 | Identification des médias temporels | NA |  |
| 4.8 | Alternative des médias non temporels | NA |  |
| 4.9 | Pertinence de l'alternative des médias non temporels | NA |  |
| 4.10 | Son déclenché automatiquement contrôlable | NA |  |
| 4.11 | Médias temporels contrôlables au clavier et au pointeur | NA |  |
| 4.12 | Médias non temporels contrôlables au clavier et au pointeur | NA |  |
| 4.13 | Compatibilité des médias avec les technologies d'assistance | NA |  |

## 5 Tableaux

| Critère | Intitulé | Statut | Note |
| --- | --- | --- | --- |
| 5.1 | Résumé des tableaux de données complexes | NA | Un seul tableau, simple |
| 5.2 | Pertinence du résumé | NA |  |
| 5.3 | Linéarisation des tableaux de mise en forme | NA | Aucun tableau de mise en forme |
| 5.4 | Titre du tableau de données correctement associé | NA | Tableau sans titre |
| 5.5 | Pertinence du titre du tableau | NA |  |
| 5.6 | En-têtes de colonnes et de lignes déclarés | C |  |
| 5.7 | Technique d'association cellules / en-têtes | C | `scope=col` et `scope=row` |
| 5.8 | Pas d'éléments de tableau de données dans un tableau de mise en forme | NA |  |

## 6 Liens

| Critère | Intitulé | Statut | Note |
| --- | --- | --- | --- |
| 6.1 | Chaque lien est explicite | C |  |
| 6.2 | Chaque lien a un intitulé | C |  |

## 7 Scripts

| Critère | Intitulé | Statut | Note |
| --- | --- | --- | --- |
| 7.1 | Scripts compatibles avec les technologies d'assistance | C | Corrigé : onglets pays au clavier (flèches, Début, Fin, inversées en arabe), FAQ repliée sortie de l'ordre de tabulation (`inert`), bouton Copier |
| 7.2 | Alternatives aux scripts pertinentes | NA |  |
| 7.3 | Scripts contrôlables au clavier et au pointeur | C | Corrigé : boutons −/+ et envoi en `aria-disabled` (le focus n'est plus perdu), focus déplacé sur le message de succès |
| 7.4 | Changements de contexte signalés ou contrôlés | C |  |
| 7.5 | Messages de statut restitués | C | Corrigé : régions `role=status` pour « Copié », « Envoi » et le succès |

## 8 Éléments obligatoires

| Critère | Intitulé | Statut | Note |
| --- | --- | --- | --- |
| 8.1 | Type de document défini | C |  |
| 8.2 | Code source valide | C | Corrigé : plus de `span` directement dans les groupes du `dl` de la facture des sièges |
| 8.3 | Langue par défaut présente | C |  |
| 8.4 | Code de langue valide et pertinent | C |  |
| 8.5 | Titre de page présent | C |  |
| 8.6 | Titre de page pertinent | C |  |
| 8.7 | Changements de langue indiqués | C | Corrigé : en-tête et pied de page traduits sur les guides et pages d'attente, `lang` sur les liens de guides et de langues, titre anglais en `lang=en` |
| 8.8 | Codes des changements de langue valides | C |  |
| 8.9 | Balises non utilisées à des fins de présentation | C |  |
| 8.10 | Changements de sens de lecture signalés | C | Corrigé : `dir=ltr` sur les passages latins en arabe, `dir=rtl` sur le lien « العربية » |

## 9 Structuration

| Critère | Intitulé | Statut | Note |
| --- | --- | --- | --- |
| 9.1 | Information structurée par des titres | C | Corrigé : titres des colonnes du pied de page en `h2`, titre de la fiche pays en `h3` |
| 9.2 | Structure du document cohérente | C |  |
| 9.3 | Listes correctement structurées | C | Corrigé : menus principal et mobile en `ul`, taux de TVA en liste |
| 9.4 | Citations correctement indiquées | C | Corrigé sur le guide France : deux citations de loi en `q`. Voir les restes |

## 10 Présentation

| Critère | Intitulé | Statut | Note |
| --- | --- | --- | --- |
| 10.1 | Feuilles de style utilisées pour la présentation | C | Corrigé : `s` remplacé par `del` pour l'ancien prix |
| 10.2 | Contenu visible sans CSS | C |  |
| 10.3 | Information compréhensible sans CSS | C |  |
| 10.4 | Texte lisible à 200 % | C |  |
| 10.5 | Couleurs de texte et de fond déclarées ensemble | C | Corrigé : couleur de fond déclarée sur les post-it |
| 10.6 | Liens visibles par rapport au texte | C | Corrigé : soulignement contrasté sur les liens du ticket |
| 10.7 | Focus visible | C | Corrigé : contour 2 px `--focus` (bleu sur clair, bleu pâle en sombre, blanc sur le bureau, encre sur le papier), menu mobile refermé quand le focus le quitte |
| 10.8 | Contenus cachés ignorés par les technologies d'assistance | C |  |
| 10.9 | Information pas donnée par la forme, la taille ou la position seules | C |  |
| 10.10 | Idem, alternative pertinente | C |  |
| 10.11 | Pas de défilement horizontal à 320 px | C | Corrigé : carte auto-hébergement sur une colonne, barre du terminal qui passe à la ligne |
| 10.12 | Espacement du texte modifiable | C |  |
| 10.13 | Contenus additionnels au survol ou au focus contrôlables | NA | Aucune infobulle |
| 10.14 | Contenus additionnels CSS accessibles au clavier | NA |  |

## 11 Formulaires

| Critère | Intitulé | Statut | Note |
| --- | --- | --- | --- |
| 11.1 | Chaque champ a une étiquette | C |  |
| 11.2 | Étiquettes pertinentes | C |  |
| 11.3 | Étiquettes cohérentes | C |  |
| 11.4 | Étiquette accolée au champ | C |  |
| 11.5 | Champs de même nature regroupés | NA |  |
| 11.6 | Légende des regroupements | NA |  |
| 11.7 | Légende pertinente | NA |  |
| 11.8 | Items de liste regroupés | NA |  |
| 11.9 | Intitulés des boutons pertinents | C |  |
| 11.10 | Contrôle de saisie accessible | C | Corrigé : mention « champs obligatoires » placée avant et reliée aux champs, erreur reliée au seul champ en faute, focus renvoyé sur ce champ |
| 11.11 | Suggestions de correction | C | Corrigé : l'erreur e-mail donne un exemple, dans les 6 langues |
| 11.12 | Données modifiables ou récupérables | NA |  |
| 11.13 | Finalité des champs déduite (autocomplete) | C |  |

## 12 Navigation

| Critère | Intitulé | Statut | Note |
| --- | --- | --- | --- |
| 12.1 | Deux systèmes de navigation | C | Corrigé : nouvelle page Plan du site, liée dans le pied de page |
| 12.2 | Menus aux mêmes endroits | C |  |
| 12.3 | Plan du site pertinent | C | Les 15 accueils, les guides et les pages d'attente |
| 12.4 | Plan du site accessible de la même façon | C | Même lien dans le pied de page de chaque page |
| 12.5 | Moteur de recherche accessible de la même façon | NA | Pas de moteur de recherche |
| 12.6 | Zones de regroupement atteignables ou évitables | C |  |
| 12.7 | Lien d'évitement vers le contenu | C | Corrigé : « Aller au contenu » en premier arrêt de tabulation |
| 12.8 | Ordre de tabulation cohérent | C | Corrigé : lien de la FAQ repliée retiré de l'ordre de tabulation |
| 12.9 | Pas de piège au clavier | C |  |
| 12.10 | Raccourcis clavier à une touche contrôlables | NA |  |
| 12.11 | Contenus additionnels atteignables au clavier | C |  |

## 13 Consultation

| Critère | Intitulé | Statut | Note |
| --- | --- | --- | --- |
| 13.1 | Limites de temps contrôlables | NA |  |
| 13.2 | Pas de nouvelle fenêtre sans action | C |  |
| 13.3 | Documents bureautiques accessibles | NA | Aucun document en téléchargement |
| 13.4 | Version accessible du document bureautique | NA |  |
| 13.5 | Contenu cryptique avec alternative | NA |  |
| 13.6 | Alternative au contenu cryptique pertinente | NA |  |
| 13.7 | Pas de flashs | C |  |
| 13.8 | Contenus en mouvement contrôlables | C | Animations coupées avec `prefers-reduced-motion` |
| 13.9 | Consultable quelle que soit l'orientation | C |  |
| 13.10 | Gestes complexes avec alternative | NA |  |
| 13.11 | Actions au pointeur annulables | C |  |
| 13.12 | Fonctionnalités par mouvement avec alternative | NA |  |

## Restes, hors non-conformité sur les pages auditées

1. Citations en « » sans `q` dans les autres guides (49 dans le guide XRechnung) : à reprendre guide par guide (critère 9.4).
2. Le Hindi n'a pas de skill humanizer sur GitHub : sa traduction gagnerait une relecture native.
3. `/api/price` n'a pas été testé en conditions réelles (réseau fermé ici).
