const fs = require('fs');

const fr = JSON.parse(fs.readFileSync('src/i18n/locales/fr.json', 'utf8'));

// Fix all encoding issues
fr.checkout.onDelivery = "À la livraison";
fr.checkout.authMsg = "En passant cette commande, vous autorisez le livreur à coordonner vos livraisons.";

fr.auth.createAccount = "Créer un nouveau compte";
fr.auth.signOut = "Se déconnecter";
fr.auth.expand = "Voir les détails";

fr.about.meetTeam = "Rencontrez l'équipe";
fr.about.stat1 = "Audits techniques et projets CCTV réalisés";
fr.about.stat2 = "Articles de mode expédiés";
fr.about.stat3 = "Conformité aux normes locales de sécurité incendie";
fr.about.stat4 = "Garantie de remplacement matériel";
fr.about.teamTitle = "Notre équipe de direction";
fr.about.member1Role = "Co-fondateur et architecte matériel";
fr.about.member1Bio = "Ingénieur certifié spécialisé dans les réseaux, la surveillance intelligente et les plans électriques.";
fr.about.member2Bio = "Dirige la conception boutique et la sélection des matériaux, en sourçant des tissus de coton biologique.";
fr.about.member3Role = "Directeur Ingénierie Web & Systèmes";
fr.about.member3Bio = "Supervise les solutions logicielles, le développement de sites Web et la sécurité API.";

fr.services.subtitle = "Ingénierie & Solutions Informatiques";
fr.services.desc = "Nous disposons d'installateurs techniques certifiés et d'ingénieurs logiciels expérimentés pour entretenir votre infrastructure. Explorez nos offres et réservez des évaluations de site ci-dessous.";
fr.services.book = "Réserver une évaluation du système";
fr.services.reqSubtitle = "Déployer une équipe d'ingénieurs ou demander une consultation.";
fr.services.phoneLabel = "Numéro de téléphone";
fr.services.phonePlaceholder = "Votre téléphone";
fr.services.msgPlaceholder = "Décrivez votre emplacement, la taille du système...";
fr.services.success = "Demande de service enregistrée";
fr.services.bookConsult = "Réserver une consultation";
fr.services.bookDesc = "Remplissez ce formulaire pour demander une évaluation sur site.";
fr.services.phone = "Téléphone";
fr.services.projectPlaceholder = "Décrivez ce dont vous avez besoin...";
fr.services.submittedMsg = "Notre équipe vous contactera bientôt.";

fr.orderConf.returnHome = "Retour à l'accueil";
fr.orderConf.title = "Commande passée avec succès !";
fr.orderConf.desc1 = "Nous avons enregistré votre transaction. Une référence de facture ";
fr.orderConf.desc2 = " a été envoyée.";
fr.orderConf.step1Desc = "En attente de vérification";
fr.orderConf.step2Desc = "Assurance qualité";
fr.orderConf.step4Desc = "Dépôt à la porte";
fr.orderConf.method = "Méthode logistique";
fr.orderConf.estDelivery = "Plage de livraison estimée";
fr.orderConf.summary = "Résumé financier";
fr.orderConf.payment = "Réseau de paiement";

fr.contact.title = "Contactez notre réseau";
fr.contact.desc = "Que vous ayez des questions sur nos derniers arrivages ou besoin d'une assistance technique d'urgence, nos équipes sont à votre disposition.";
fr.contact.phone = "Numéro de téléphone (Facultatif)";
fr.contact.success = "Message envoyé";
fr.contact.successMsg = "Un représentant vous répondra sous peu.";
fr.contact.locTitle = "Siège social";
fr.contact.hoursDesc2 = "Sam: 9h00 - 14h00 (Boutique)";
fr.contact.socials = "Réseaux sociaux";

fr.returns.desc = "Lisez nos directives claires régissant les retours de produits, les calendriers de remboursement et les politiques d'échange.";
fr.returns.card1Desc = "Nous offrons une fenêtre flexible de 7 jours pour retourner les articles achetés. Pour les livraisons en dehors de Kigali, la fenêtre s'étend à 14 jours.";
fr.returns.cond1 = "Le produit doit rester complètement inutilisé, non porté et non lavé.";
fr.returns.cond2 = "Les articles doivent rester dans leur emballage d'origine avec étiquettes.";
fr.returns.cond3 = "L'emballage des chaussures ne doit pas être déchiré ou écrit.";
fr.returns.cond4 = "Les caméras de sécurité ne doivent pas présenter de rayures.";
fr.returns.card2Title = "Remplacement et échanges";
fr.returns.card2Desc = "Si vous recevez un article endommagé ou avec une mauvaise taille, nous proposons des remplacements gratuits, selon les stocks disponibles.";
fr.returns.specialClause = "Clause spéciale électronique:";
fr.returns.specialClauseDesc = "Les composants matériels ne peuvent pas être retournés s'ils ont été physiquement installés par des techniciens tiers.";
fr.returns.processTitle = "Mécanismes d'exécution";
fr.returns.step1Desc = "Notre équipe administrative effectue un contrôle de qualité physique.";
fr.returns.step2Title = "02. Vérification de l'approbation";
fr.returns.step2Desc = "Après vérification de la conformité, nous approuvons immédiatement la réclamation.";
fr.returns.step3Desc = "Un remboursement en espèces, par transfert d'argent mobile ou carte de crédit est envoyé.";
fr.returns.threeStage = "Processus de règlement de remboursement en trois étapes";
fr.returns.specialClauseDesc2 = "Les caméras, décodeurs DVR, alarmes ou routeurs déjà installés sont strictement exempts des privilèges de retour général.";

fr.howtoshop.desc = "Suivez nos directives étape par étape pour acheter des accessoires de mode ou planifier des enquêtes techniques à Kigali.";
fr.howtoshop.s1 = "Parcourir les produits et catégories";
fr.howtoshop.s1d = "Explorez notre catalogue à travers les sections : vêtements de luxe, chaussures, colliers et électronique de sécurité.";
fr.howtoshop.s2 = "Sélectionner un produit et vérifier les détails";
fr.howtoshop.s2d = "Inspectez les spécifications, les mesures précises, les détails de l'objectif et la disponibilité du stock.";
fr.howtoshop.s3d = "Mettez à jour les quantités, enregistrez les articles dans votre liste de souhaits et organisez-les dans le panier.";
fr.howtoshop.s4 = "Procéder au paiement sécurisé";
fr.howtoshop.s4d = "Confirmez votre facture et cliquez sur le bouton pour passer aux détails du client.";
fr.howtoshop.s5d = "Fournissez votre adresse exacte à Kigali, le bâtiment ou les coordonnées de référence, et votre numéro de téléphone.";
fr.howtoshop.s6d = "Optez pour MTN MoMo ou Airtel Money, les cartes Visa ou le paiement en espèces à la livraison.";
fr.howtoshop.s7d = "Soumettez votre demande, recevez immédiatement votre numéro de facture et suivez la livraison en temps réel.";
fr.howtoshop.a1 = "Allez dans l'onglet Services. Cliquez sur 'Demander un service' sous la catégorie souhaitée, remplissez vos coordonnées.";
fr.howtoshop.a2 = "Nos frais de livraison sont fixes (5 000 RWF à Kigali). Les livraisons dépassant 150 000 RWF sont gratuites.";

fr.admin.products = "Produits au détail";
fr.admin.users = "Utilisateurs du système";
fr.admin.settings = "Paramètres globaux";
fr.admin.stats = "Métriques du système";
fr.admin.shippedOrders = "Commandes expédiées";
fr.admin.recentOrders = "Transactions récentes";
fr.admin.price = "Prix (RWF)";
fr.admin.category = "Catégorie";
fr.admin.noOrders = "Aucune commande trouvée.";
fr.admin.markShipped = "Marquer Expédiée";
fr.admin.markCompleted = "Marquer Terminée";
fr.admin.userDir = "Répertoire des utilisateurs";
fr.admin.role = "Rôle";
fr.admin.disable = "Désactiver";
fr.admin.notifDesc = "Envoyer des e-mails automatisés";

fs.writeFileSync('src/i18n/locales/fr.json', JSON.stringify(fr, null, 2), 'utf8');
console.log('✓ Fixed French encoding issues');
