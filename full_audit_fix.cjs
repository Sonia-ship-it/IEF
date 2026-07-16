const fs = require("fs");

const enPath = "src/i18n/locales/en.json";
const frPath = "src/i18n/locales/fr.json";
const rwPath = "src/i18n/locales/rw.json";

let en = JSON.parse(fs.readFileSync(enPath, "utf8"));
let fr = JSON.parse(fs.readFileSync(frPath, "utf8"));
let rw = JSON.parse(fs.readFileSync(rwPath, "utf8"));

// ---- EXTEND LOCALES ----

// About extras
Object.assign(en.about, {
  "stat1": "Technical Audits & CCTV Projects Completed",
  "stat2": "Aesthetic Fashion Items Dispatched",
  "stat3": "Compliance with Local Fire Code Standards",
  "stat4": "Hardware Replacement Guarantee",
  "teamTitle": "Our Professional Leadership Team",
  "member1Name": "Ian Rwigema",
  "member1Role": "Co-Founder & Chief Hardware Architect",
  "member1Bio": "A certified solutions surveyor specializing in structured networking conduits, smart surveillance arrays, and low-voltage electrical plans.",
  "member2Name": "Diana Ishimwe",
  "member2Role": "Co-Founder & Fashion Director",
  "member2Bio": "Directs boutique design and garments materials selections, sourcing heavy organic cotton fabrics and highweight classic fits.",
  "member3Name": "Damascene Tuyisenge",
  "member3Role": "Director of Web & Systems Engineering",
  "member3Bio": "Oversees software solutions, custom corporate websites development, and API security for high-converting e-commerce structures."
});
Object.assign(fr.about, {
  "stat1": "Audits techniques et projets CCTV réalisés",
  "stat2": "Articles de mode expédiés",
  "stat3": "Conformité aux normes locales de sécurité incendie",
  "stat4": "Garantie de remplacement matériel",
  "teamTitle": "Notre équipe de direction",
  "member1Name": "Ian Rwigema",
  "member1Role": "Co-fondateur et architecte matériel",
  "member1Bio": "Ingénieur certifié spécialisé dans les réseaux, la surveillance intelligente et les plans électriques.",
  "member2Name": "Diana Ishimwe",
  "member2Role": "Co-fondatrice et directrice de la mode",
  "member2Bio": "Dirige la conception boutique et la sélection des matériaux, en sourçant des tissus de coton biologique.",
  "member3Name": "Damascene Tuyisenge",
  "member3Role": "Directeur Ingénierie Web & Systèmes",
  "member3Bio": "Supervise les solutions logicielles, le développement de sites Web et la sécurité API."
});
Object.assign(rw.about, {
  "stat1": "Imishinga ya CCTV n'Igenzura yarangiye",
  "stat2": "Ibicuruzwa bya Imyenda byoherejwe",
  "stat3": "Gukomera ku mategeko y'Umutekano",
  "stat4": "Kwemeza gusubiranya ibikoresho mu mwaka",
  "teamTitle": "Ikipe yacu y'Ubuyobozi",
  "member1Name": "Ian Rwigema",
  "member1Role": "Umubitsi & Nyir'Ikoranabuhanga",
  "member1Bio": "Inzobere mu miyoboro, sisitemu z'ubucurabwenge, n'imishinga y'amashanyarazi.",
  "member2Name": "Diana Ishimwe",
  "member2Role": "Umubitsi & Umuyobozi w'Imyenda",
  "member2Bio": "Agamije imyenda myiza yakozwe mu ipamba ryiza ry'umwimerere.",
  "member3Name": "Damascene Tuyisenge",
  "member3Role": "Umuyobozi wa Sisitemu & Porogaramu",
  "member3Bio": "Agenzura ibisubizo bya porogaramu, urubuga rwa interineti, n'umutekano wa API."
});

// Services extras
Object.assign(en.services, {
  "scopeIncludes": "Scope Includes:",
  "pricing": "Pricing",
  "requestSurvey": "Request Survey",
  "bookConsult": "Book Survey Consultation",
  "bookDesc": "Complete this form to request an expert onsite assessment.",
  "chosenService": "Chosen Service",
  "yourName": "Your Full Name",
  "email": "Email",
  "phone": "Phone",
  "projectDetails": "Project Details",
  "projectPlaceholder": "Describe what you need...",
  "submitBooking": "Submit Booking Request",
  "submitted": "Request Submitted!",
  "submittedMsg": "Our team will contact you shortly."
});
Object.assign(fr.services, {
  "scopeIncludes": "Comprend:",
  "pricing": "Tarification",
  "requestSurvey": "Demander un devis",
  "bookConsult": "Réserver une consultation",
  "bookDesc": "Remplissez ce formulaire pour demander une évaluation sur site.",
  "chosenService": "Service choisi",
  "yourName": "Votre nom complet",
  "email": "Email",
  "phone": "Téléphone",
  "projectDetails": "Détails du projet",
  "projectPlaceholder": "Décrivez ce dont vous avez besoin...",
  "submitBooking": "Soumettre la demande",
  "submitted": "Demande soumise!",
  "submittedMsg": "Notre équipe vous contactera bientôt."
});
Object.assign(rw.services, {
  "scopeIncludes": "Birimo:",
  "pricing": "Igiciro",
  "requestSurvey": "Saba Igenzura",
  "bookConsult": "Saba Inama y'Abahanga",
  "bookDesc": "Uzuza ubu butumwa usabe igenzura ku murimo wawe.",
  "chosenService": "Serivisi wahisemo",
  "yourName": "Amazina yawe yombi",
  "email": "Imeli",
  "phone": "Telefone",
  "projectDetails": "Ubusobanuro bw'Akazi",
  "projectPlaceholder": "Sobanura ibyo ukeneye...",
  "submitBooking": "Ohereza Ubusabe",
  "submitted": "Ubusabe Bwoherejwe!",
  "submittedMsg": "Ikipe yacu irakuvugisha vuba."
});

// Checkout extras
Object.assign(en.checkout, {
  "deliveryLogistics": "Delivery Address & Logistics",
  "contactPhone": "Contact Phone (For Courier)",
  "physicalAddress": "Physical Address",
  "paymentMethods": "Payment Method",
  "creditCard": "Credit Card",
  "onDelivery": "On Delivery",
  "momoWallet": "MoMo Wallet Number",
  "momoPushMsg": "A push prompt will be sent to this number to approve",
  "cashDesc2": "Pay cash or push local mobile money to our dispatcher on site. We recommend preparing the exact amount.",
  "invoiceBreakdown": "Invoice Breakdown",
  "qty": "Qty",
  "delivery": "Delivery",
  "placeAndPush": "Place Order & Push Invoice",
  "authMsg": "By placing this order, you authorize the dispatcher to coordinate your deliveries and guarantee payment clearance."
});
Object.assign(fr.checkout, {
  "deliveryLogistics": "Adresse de livraison & logistique",
  "contactPhone": "Téléphone de contact (coursier)",
  "physicalAddress": "Adresse physique",
  "paymentMethods": "Mode de paiement",
  "creditCard": "Carte bancaire",
  "onDelivery": "À la livraison",
  "momoWallet": "Numéro de portefeuille MoMo",
  "momoPushMsg": "Une invite de paiement sera envoyée à ce numéro pour approuver",
  "cashDesc2": "Payez en espèces à la livraison. Préparez le montant exact.",
  "invoiceBreakdown": "Détail de la facture",
  "qty": "Qté",
  "delivery": "Livraison",
  "placeAndPush": "Passer la commande",
  "authMsg": "En passant cette commande, vous autorisez le livreur à coordonner vos livraisons."
});
Object.assign(rw.checkout, {
  "deliveryLogistics": "Aho Ibintu Bizajya & Uburyo bwo Kohereza",
  "contactPhone": "Telefone (Kuri Umubarwa)",
  "physicalAddress": "Aderesi Nyayo",
  "paymentMethods": "Uburyo bwo Kwishyura",
  "creditCard": "Ikarita ya Banki",
  "onDelivery": "Ucashyura Mugejejwe",
  "momoWallet": "Nomero ya MoMo",
  "momoPushMsg": "Ubutumwa bw'kwishyura buzohererezwa kuri iyi nomero ngo ubyemeze",
  "cashDesc2": "Ishyura mu ntoki tugeze iwawe. Tegura amafaranga neza.",
  "invoiceBreakdown": "Incamake y'Ikiguzi",
  "qty": "Umubare",
  "delivery": "Kohereza",
  "placeAndPush": "Emeza & Ohereza Fagitire",
  "authMsg": "Mu gutanga iyi komande, utanga uburenganzira bwo gutanga ibicuruzwa."
});

// Auth extras
Object.assign(en.auth, {
  "password": "Password",
  "authenticate": "Authenticate Account",
  "accountType": "Account Type",
  "shopper": "Standard Shopper",
  "storeAdmin": "Store Administrator",
  "registerLogin": "Register & Log In",
  "quickSandbox": "Quick Sandbox Login",
  "quickSandboxDesc": "Use these pre-configured accounts to instantly explore both customer and admin dashboard views.",
  "standardCustomer": "Standard Customer",
  "demo": "Demo",
  "admin": "Admin",
  "shopping": "Shopping guides, orders, purchase history log.",
  "crudControl": "CRUD control of products, services, and order statuses.",
  "emailLabel": "Email:",
  "yourOrders": "Your Orders",
  "orderItems": "items",
  "expand": "View Details",
  "name": "Name",
  "emailProp": "Email",
  "addressProp": "Address",
  "phoneProp": "Phone"
});
Object.assign(fr.auth, {
  "password": "Mot de passe",
  "authenticate": "Authentifier le compte",
  "accountType": "Type de compte",
  "shopper": "Acheteur standard",
  "storeAdmin": "Administrateur du magasin",
  "registerLogin": "S'inscrire & Se connecter",
  "quickSandbox": "Connexion sandbox rapide",
  "quickSandboxDesc": "Utilisez ces comptes préconfigurés pour explorer les vues client et admin.",
  "standardCustomer": "Client standard",
  "demo": "Démo",
  "admin": "Admin",
  "shopping": "Guides d'achat, commandes, historique d'achat.",
  "crudControl": "Contrôle CRUD des produits, services et statuts.",
  "emailLabel": "Email:",
  "yourOrders": "Vos commandes",
  "orderItems": "articles",
  "expand": "Voir les détails",
  "name": "Nom",
  "emailProp": "Email",
  "addressProp": "Adresse",
  "phoneProp": "Téléphone"
});
Object.assign(rw.auth, {
  "password": "Ijambo ry'ibanga",
  "authenticate": "Injira muri Konti",
  "accountType": "Ubwoko bwa Konti",
  "shopper": "Umuguzi Bisanzwe",
  "storeAdmin": "Umuyobozi w'Iduka",
  "registerLogin": "Iyandikishe & Injira",
  "quickSandbox": "Kwinjira vuba",
  "quickSandboxDesc": "Koresha aya makonte kugira ngo urebe uburyo bw'umuguzi n'ubuyobozi.",
  "standardCustomer": "Umuguzi Bisanzwe",
  "demo": "Ikizamini",
  "admin": "Umuyobozi",
  "shopping": "Amakuru y'ibicuruzwa, komande, amateka y'ibiguzi.",
  "crudControl": "Gucunga ibicuruzwa, serivisi na komande.",
  "emailLabel": "Imeli:",
  "yourOrders": "Komande Zawe",
  "orderItems": "ibintu",
  "expand": "Reba Amakuru",
  "name": "Izina",
  "emailProp": "Imeli",
  "addressProp": "Aderesi",
  "phoneProp": "Telefone"
});

// Returns extras
Object.assign(en.returns, {
  "threeStage": "Three-Stage Refund Settlement Workflow",
  "specialClauseDesc2": "Surveillance cameras, DVR decoders, smoke alarms, or routers already hard-wired or physically drilled on site by client technicians are strictly exempt from general return privileges."
});
Object.assign(fr.returns, {
  "threeStage": "Processus de règlement de remboursement en trois étapes",
  "specialClauseDesc2": "Les caméras, décodeurs DVR, alarmes ou routeurs déjà installés sont strictement exempts des privilèges de retour général."
});
Object.assign(rw.returns, {
  "threeStage": "Inzira Eshatu zo Gusubiza Amafaranga",
  "specialClauseDesc2": "Kamera, DVR, inzitizi z'umuriro, cyangwa router ziramutse zashyizweho n'abakozi ntizishobora gusubizwa."
});

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(frPath, JSON.stringify(fr, null, 2));
fs.writeFileSync(rwPath, JSON.stringify(rw, null, 2));

console.log("Locale files extended successfully");
