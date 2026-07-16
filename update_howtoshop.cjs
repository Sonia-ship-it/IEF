const fs = require("fs");

const enPath = "src/i18n/locales/en.json";
const frPath = "src/i18n/locales/fr.json";
const rwPath = "src/i18n/locales/rw.json";

let en = JSON.parse(fs.readFileSync(enPath, "utf8"));
let fr = JSON.parse(fs.readFileSync(frPath, "utf8"));
let rw = JSON.parse(fs.readFileSync(rwPath, "utf8"));

const howEn = {
  "subtitle": "Knowledge Base Manual",
  "title": "How to Shop & Request Services",
  "desc": "Follow our transparent, step-by-step guidelines to purchase premium fashion accessories or schedule technical on-site surveys in Kigali.",
  "s1": "Browse Products & Categories",
  "s1d": "Explore our catalog across four primary sections: luxury clothing, premium shoes, necklaces, and smart security electronics.",
  "s2": "Select a Product & Check Details",
  "s2d": "Inspect full highweight fabrics GSM specs, precise measurements, dome or bullet lens details, and original stock availability.",
  "s3": "Add Selected Items to Cart",
  "s3d": "Update desired quantities, save favorite luxury items in your persistent wishlist, and organize your selected items in the cart.",
  "s4": "Proceed to Secure Checkout",
  "s4d": "Confirm your invoice summaries and click the Proceed to Checkout button to advance to customer details panels.",
  "s5": "Enter Delivery Information",
  "s5d": "Provide your accurate Kigali district, building, or landmark coordinates and active courier phone numbers.",
  "s6": "Choose Your Payment Method",
  "s6d": "Opt for instant MTN MoMo or Airtel Money pushing, secure Visa credit cards, or convenient cash settlement on doorstep delivery.",
  "s7": "Place Order & Track Progress",
  "s7d": "Submit your request, receive your invoice number reference immediately, and monitor our real-time delivery progress bars.",
  "q1": "How do I request a technical installation?",
  "a1": "Navigate to the Services tab on our main navigation header. Click the 'Request Service' button under your desired category (e.g., CCTV Setup), fill in your contact coordinates, and a senior technical lead will call you.",
  "q2": "Are there any hidden delivery fees?",
  "a2": "Our delivery fee is a flat RWF 5,000 for standard Kigali limits. Deliveries exceeding an order subtotal of RWF 150,000 automatically qualify for complimentary free logistics."
};

const howFr = {
  "subtitle": "Manuel de base de connaissances",
  "title": "Comment acheter et demander des services",
  "desc": "Suivez nos directives étape par étape pour acheter des accessoires de mode ou planifier des enquêtes techniques à Kigali.",
  "s1": "Parcourir les produits et catégories",
  "s1d": "Explorez notre catalogue à travers les sections : vêtements de luxe, chaussures, colliers et électronique de sécurité.",
  "s2": "Sélectionner un produit et vérifier les détails",
  "s2d": "Inspectez les spécifications, les mesures précises, les détails de l'objectif et la disponibilité du stock.",
  "s3": "Ajouter des articles au panier",
  "s3d": "Mettez à jour les quantités, enregistrez les articles dans votre liste de souhaits et organisez-les dans le panier.",
  "s4": "Procéder au paiement sécurisé",
  "s4d": "Confirmez votre facture et cliquez sur le bouton pour passer aux détails du client.",
  "s5": "Entrer les informations de livraison",
  "s5d": "Fournissez votre adresse exacte à Kigali, le bâtiment ou les coordonnées de référence, et votre numéro de téléphone.",
  "s6": "Choisir votre mode de paiement",
  "s6d": "Optez pour MTN MoMo ou Airtel Money, les cartes Visa ou le paiement en espèces à la livraison.",
  "s7": "Passer la commande et suivre la progression",
  "s7d": "Soumettez votre demande, recevez immédiatement votre numéro de facture et suivez la livraison en temps réel.",
  "q1": "Comment demander une installation technique?",
  "a1": "Allez dans l'onglet Services. Cliquez sur 'Demander un service' sous la catégorie souhaitée, remplissez vos coordonnées.",
  "q2": "Y a-t-il des frais de livraison cachés?",
  "a2": "Nos frais de livraison sont fixes (5 000 RWF à Kigali). Les livraisons dépassant 150 000 RWF sont gratuites."
};

const howRw = {
  "subtitle": "Amabwiriza y'Uko Bikora",
  "title": "Uko Uhaha N'Uko Usaba Serivisi",
  "desc": "Kurikiza aya mabwiriza kugira ngo ugure imyenda cyangwa usabe abahanga kuza kugukorera iwawe mu mujyi wa Kigali.",
  "s1": "Reba Ibicuruzwa Bitandukanye",
  "s1d": "Kanda mu byiciro bine bikuru: imyenda, inkweto, imikufe, n'ibikoresho by'umutekano.",
  "s2": "Hitamo Igicuruzwa & Reba Amakuru Yacyo",
  "s2d": "Reba ubusobanuro bwose, uko kingana, ibara, ndetse niba kigihari mu bubiko.",
  "s3": "Shyira mu Gitebo",
  "s3d": "Hitamo umubare wifuza, ushobora no kubibika muri wishlist kugira ngo uzabigure nyuma.",
  "s4": "Komeza Kwishyura",
  "s4d": "Reba incamake y'ibyo uguze hanyuma ukande ahanditse 'Kwishyura' wuzuze imyirondoro yawe.",
  "s5": "Uzuza Aho Ibintu Bizajya",
  "s5d": "Tanga aderesi yawe yuzuye muri Kigali ndetse na nomero ya telefone yawe kugira ngo tukugeraho.",
  "s6": "Hitamo Uburyo bwo Kwishyura",
  "s6d": "Hitamo kwishyura ukoresheje MTN MoMo cyangwa Airtel Money, Ikarita ya banki cyangwa ucashyura tugeze iwawe.",
  "s7": "Emeza & Ukurikirane Igicuruzwa",
  "s7d": "Ohereza ubusabe bwawe, uhita uhabwa nomero ya fagitire ndetse ukurikirane aho igicuruzwa kigeze.",
  "q1": "Nasaba nte serivisi y'ikoranabuhanga?",
  "a1": "Kanda kuri 'Services' hejuru ku rubuga. Kanda 'Saba Serivisi' munsi y'icyo ushaka (urugero: Kamera), uzuze imyirondoro yawe umukozi wacu arakuhamagara.",
  "q2": "Hari andi mafaranga yihishe y'ubwikorezi?",
  "a2": "Ikiguzi cyo kohereza ni RWF 5,000 muri Kigali. Ku bantu baguze ibirenze RWF 150,000 boherezwa kubuntu."
};

en.howtoshop = howEn;
fr.howtoshop = howFr;
rw.howtoshop = howRw;

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(frPath, JSON.stringify(fr, null, 2));
fs.writeFileSync(rwPath, JSON.stringify(rw, null, 2));

// Update HowToShopView.tsx
let howTsx = fs.readFileSync("src/components/HowToShopView.tsx", "utf8");

if (!howTsx.includes('useLanguage')) {
  howTsx = howTsx.replace("import React from 'react';", "import React from 'react';\nimport { useLanguage } from '../i18n/LanguageContext';");
  howTsx = howTsx.replace("export default function HowToShopView() {", "export default function HowToShopView() {\n  const { t } = useLanguage();");
}

howTsx = howTsx.replace(/'Browse Products &amp; Categories'/g, "t('howtoshop.s1')");
howTsx = howTsx.replace(/'Explore our catalog across four primary sections: luxury clothing, premium shoes, necklaces, and smart security electronics\.'/g, "t('howtoshop.s1d')");
howTsx = howTsx.replace(/'Select a Product &amp; Check Details'/g, "t('howtoshop.s2')");
howTsx = howTsx.replace(/'Inspect full highweight fabrics GSM specs, precise measurements, dome or bullet lens details, and original stock availability\.'/g, "t('howtoshop.s2d')");
howTsx = howTsx.replace(/'Add Selected Items to Cart'/g, "t('howtoshop.s3')");
howTsx = howTsx.replace(/'Update desired quantities, save favorite luxury items in your persistent wishlist, and organize your selected items in the cart\.'/g, "t('howtoshop.s3d')");
howTsx = howTsx.replace(/'Proceed to Secure Checkout'/g, "t('howtoshop.s4')");
howTsx = howTsx.replace(/'Confirm your invoice summaries and click the Proceed to Checkout button to advance to customer details panels\.'/g, "t('howtoshop.s4d')");
howTsx = howTsx.replace(/'Enter Delivery Information'/g, "t('howtoshop.s5')");
howTsx = howTsx.replace(/'Provide your accurate Kigali district, building, or landmark coordinates and active courier phone numbers\.'/g, "t('howtoshop.s5d')");
howTsx = howTsx.replace(/'Choose Your Payment Method'/g, "t('howtoshop.s6')");
howTsx = howTsx.replace(/'Opt for instant MTN MoMo or Airtel Money pushing, secure Visa credit cards, or convenient cash settlement on doorstep delivery\.'/g, "t('howtoshop.s6d')");
howTsx = howTsx.replace(/'Place Order &amp; Track Progress'/g, "t('howtoshop.s7')");
howTsx = howTsx.replace(/'Submit your request, receive your invoice number reference immediately, and monitor our real-time delivery progress bars\.'/g, "t('howtoshop.s7d')");

howTsx = howTsx.replace(/>Knowledge Base Manual</g, ">{t('howtoshop.subtitle')}<");
howTsx = howTsx.replace(/>How to Shop &amp; Request Services</g, ">{t('howtoshop.title')}<");
howTsx = howTsx.replace(/>Follow our transparent, step-by-step guidelines to purchase premium fashion accessories or schedule technical on-site surveys in Kigali\.</g, ">{t('howtoshop.desc')}<");

howTsx = howTsx.replace(/>How do I request a technical installation\?</g, ">{t('howtoshop.q1')}<");
howTsx = howTsx.replace(/>Navigate to the Services tab on our main navigation header\. Click the 'Request Service' button under your desired category \(e\.g\., CCTV Setup\), fill in your contact coordinates, and a senior technical lead will call you\.</g, ">{t('howtoshop.a1')}<");
howTsx = howTsx.replace(/>Are there any hidden delivery fees\?</g, ">{t('howtoshop.q2')}<");
howTsx = howTsx.replace(/>Our delivery fee is a flat RWF 5,000 for standard Kigali limits\. Deliveries exceeding an order subtotal of RWF 150,000 automatically qualify for complimentary free logistics\.</g, ">{t('howtoshop.a2')}<");

fs.writeFileSync("src/components/HowToShopView.tsx", howTsx);
console.log("Updated HowToShopView");
