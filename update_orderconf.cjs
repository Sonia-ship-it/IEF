const fs = require("fs");

const enPath = "src/i18n/locales/en.json";
const frPath = "src/i18n/locales/fr.json";
const rwPath = "src/i18n/locales/rw.json";

let en = JSON.parse(fs.readFileSync(enPath, "utf8"));
let fr = JSON.parse(fs.readFileSync(frPath, "utf8"));
let rw = JSON.parse(fs.readFileSync(rwPath, "utf8"));

const confEn = {
  "noOrder": "No active order loaded",
  "returnHome": "Return to Home Page",
  "title": "Order Placed Successfully!",
  "desc1": "We have successfully registered your transaction. An automated invoice reference ",
  "desc2": " was dispatched to your credentials.",
  "tracker": "Delivery Progress Tracker",
  "step1": "Order Registered",
  "step1Desc": "Awaiting checks",
  "step2": "Under Review",
  "step2Desc": "Quality assurance",
  "step3": "Out for Delivery",
  "step3Desc": "With local courier",
  "step4": "Delivered",
  "step4Desc": "Doorstep dropoff",
  "deliveryDest": "Delivery Destination",
  "customer": "Customer Profile",
  "method": "Logistics Method",
  "standard": "Standard Courier Service",
  "estDelivery": "Est. Delivery Range",
  "summary": "Financial Breakdown",
  "items": "items",
  "subtotal": "Subtotal",
  "fee": "Logistics Fee",
  "total": "Total Valuation",
  "payment": "Selected Payment Network",
  "shopMore": "Continue Browsing Boutique"
};

const confFr = {
  "noOrder": "Aucune commande active",
  "returnHome": "Retour à l'accueil",
  "title": "Commande passée avec succès !",
  "desc1": "Nous avons enregistré votre transaction. Une référence de facture ",
  "desc2": " a été envoyée.",
  "tracker": "Suivi de livraison",
  "step1": "Commande enregistrée",
  "step1Desc": "En attente de vérification",
  "step2": "En cours d'examen",
  "step2Desc": "Assurance qualité",
  "step3": "En cours de livraison",
  "step3Desc": "Avec le coursier local",
  "step4": "Livré",
  "step4Desc": "Dépôt à la porte",
  "deliveryDest": "Destination de livraison",
  "customer": "Profil du client",
  "method": "Méthode logistique",
  "standard": "Service de messagerie standard",
  "estDelivery": "Plage de livraison estimée",
  "summary": "Résumé financier",
  "items": "articles",
  "subtotal": "Sous-total",
  "fee": "Frais logistiques",
  "total": "Montant total",
  "payment": "Réseau de paiement",
  "shopMore": "Continuer les achats"
};

const confRw = {
  "noOrder": "Nta komande ihari",
  "returnHome": "Subira Ahabanza",
  "title": "Komande Yakiriwe Neza!",
  "desc1": "Igurisha ryawe ryagenze neza. Inyemezabuguzi nomero ",
  "desc2": " yohererejwe.",
  "tracker": "Aho Ibicuruzwa Bigeze",
  "step1": "Komande Yakiriwe",
  "step1Desc": "Itegereje kwemezwa",
  "step2": "Iri gusuzumwa",
  "step2Desc": "Kugenzura ubuziranenge",
  "step3": "Biri munzira",
  "step3Desc": "Biri kuza",
  "step4": "Bihageze",
  "step4Desc": "Bigeze iwawe",
  "deliveryDest": "Aho bizajya",
  "customer": "Umwirondoro",
  "method": "Uburyo bwo kohereza",
  "standard": "Kohereza bisanzwe",
  "estDelivery": "Igihe bizagererayo",
  "summary": "Incamake y'Ikiguzi",
  "items": "ibintu",
  "subtotal": "Igiteranyo",
  "fee": "Ikiguzi cyo kohereza",
  "total": "Ikiguzi Cyose",
  "payment": "Uburyo bwo kwishyura",
  "shopMore": "Komeza Uhahare"
};

en.orderConf = confEn;
fr.orderConf = confFr;
rw.orderConf = confRw;

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(frPath, JSON.stringify(fr, null, 2));
fs.writeFileSync(rwPath, JSON.stringify(rw, null, 2));

// Update OrderConfirmationView.tsx
let confTsx = fs.readFileSync("src/components/OrderConfirmationView.tsx", "utf8");

if (!confTsx.includes('useLanguage')) {
  confTsx = confTsx.replace("import React from 'react';", "import React from 'react';\nimport { useLanguage } from '../i18n/LanguageContext';");
  confTsx = confTsx.replace("export default function OrderConfirmationView({", "export default function OrderConfirmationView({\n  order,\n  setView\n}: OrderConfirmationViewProps) {\n  const { t } = useLanguage();\n  // Hack: replace the top of component\n  if (!order) { //");
  
  // Actually let's use robust regex to insert the hook.
  confTsx = confTsx.replace(/export default function OrderConfirmationView\(\{[\s\S]*?\}\: OrderConfirmationViewProps\) \{([\s\S]*?)if \(\!order\)/, "export default function OrderConfirmationView({\n  order,\n  setView\n}: OrderConfirmationViewProps) {\n  const { t } = useLanguage();\n  if (!order)");
}

confTsx = confTsx.replace(/>No active order loaded</g, ">{t('orderConf.noOrder')}<");
confTsx = confTsx.replace(/>Return to Home Page</g, ">{t('orderConf.returnHome')}<");
confTsx = confTsx.replace(/>Order Placed Successfully!</g, ">{t('orderConf.title')}<");
confTsx = confTsx.replace(/We have successfully registered your transaction\. An automated invoice reference/g, "{t('orderConf.desc1')}");
confTsx = confTsx.replace(/was dispatched to your credentials\./g, "{t('orderConf.desc2')}");

confTsx = confTsx.replace(/>Delivery Progress Tracker</g, ">{t('orderConf.tracker')}<");
confTsx = confTsx.replace(/'Order Registered'/g, "t('orderConf.step1')");
confTsx = confTsx.replace(/'Awaiting checks'/g, "t('orderConf.step1Desc')");
confTsx = confTsx.replace(/'Under Review'/g, "t('orderConf.step2')");
confTsx = confTsx.replace(/'Quality assurance'/g, "t('orderConf.step2Desc')");
confTsx = confTsx.replace(/'Out for Delivery'/g, "t('orderConf.step3')");
confTsx = confTsx.replace(/'With local courier'/g, "t('orderConf.step3Desc')");
confTsx = confTsx.replace(/'Delivered'/g, "t('orderConf.step4')");
confTsx = confTsx.replace(/'Doorstep dropoff'/g, "t('orderConf.step4Desc')");

confTsx = confTsx.replace(/>Delivery Destination</g, ">{t('orderConf.deliveryDest')}<");
confTsx = confTsx.replace(/>Customer Profile</g, ">{t('orderConf.customer')}<");
confTsx = confTsx.replace(/>Logistics Method</g, ">{t('orderConf.method')}<");
confTsx = confTsx.replace(/>Standard Courier Service</g, ">{t('orderConf.standard')}<");
confTsx = confTsx.replace(/>Est\. Delivery Range</g, ">{t('orderConf.estDelivery')}<");
confTsx = confTsx.replace(/>Financial Breakdown</g, ">{t('orderConf.summary')}<");
confTsx = confTsx.replace(/>items</g, ">{t('orderConf.items')}<");
confTsx = confTsx.replace(/>Subtotal</g, ">{t('orderConf.subtotal')}<");
confTsx = confTsx.replace(/>Logistics Fee</g, ">{t('orderConf.fee')}<");
confTsx = confTsx.replace(/>Total Valuation</g, ">{t('orderConf.total')}<");
confTsx = confTsx.replace(/>Selected Payment Network</g, ">{t('orderConf.payment')}<");
confTsx = confTsx.replace(/>Continue Browsing Boutique</g, ">{t('orderConf.shopMore')}<");

fs.writeFileSync("src/components/OrderConfirmationView.tsx", confTsx);
console.log("Updated OrderConfirmationView");
