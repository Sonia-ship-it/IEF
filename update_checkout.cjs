const fs = require("fs");

const enPath = "src/i18n/locales/en.json";
const frPath = "src/i18n/locales/fr.json";
const rwPath = "src/i18n/locales/rw.json";

let en = JSON.parse(fs.readFileSync(enPath, "utf8"));
let fr = JSON.parse(fs.readFileSync(frPath, "utf8"));
let rw = JSON.parse(fs.readFileSync(rwPath, "utf8"));

const checkEn = {
  "returnCart": "Return to Cart",
  "title": "Secure Checkout",
  "section1": "Customer Contact Information",
  "fullName": "Full Name",
  "email": "Email Address",
  "section2": "Delivery Details",
  "phone": "Phone Number",
  "address": "Physical Delivery Address",
  "section3": "Payment Method",
  "momo": "Mobile Money",
  "card": "Card Payment",
  "cash": "Cash on Delivery",
  "momoProvider": "Select Provider",
  "momoNumber": "Mobile Money Number",
  "cardNum": "Card Number",
  "cardExp": "Expiry Date",
  "cardCvc": "CVC / CVV",
  "cashDesc": "Pay in cash when your items are delivered. Available for Kigali only.",
  "summary": "Order Summary",
  "subtotal": "Subtotal",
  "deliveryFee": "Delivery Fee",
  "free": "Free",
  "total": "Total Amount",
  "secure": "256-bit Secure Encrypted Payment",
  "placeOrder": "Place Order Securely",
  "alert": "Please fill out all delivery and customer information.",
  "freeShippingMsg": "Spend %amount% more for free shipping"
};

const checkFr = {
  "returnCart": "Retour au panier",
  "title": "Paiement sécurisé",
  "section1": "Coordonnées du client",
  "fullName": "Nom complet",
  "email": "Adresse E-mail",
  "section2": "Détails de livraison",
  "phone": "Numéro de téléphone",
  "address": "Adresse de livraison",
  "section3": "Mode de paiement",
  "momo": "Mobile Money",
  "card": "Carte Bancaire",
  "cash": "Paiement à la livraison",
  "momoProvider": "Sélectionner le fournisseur",
  "momoNumber": "Numéro Mobile Money",
  "cardNum": "Numéro de carte",
  "cardExp": "Date d'expiration",
  "cardCvc": "CVC / CVV",
  "cashDesc": "Payez en espèces à la livraison. Disponible pour Kigali uniquement.",
  "summary": "Résumé de la commande",
  "subtotal": "Sous-total",
  "deliveryFee": "Frais de livraison",
  "free": "Gratuit",
  "total": "Montant total",
  "secure": "Paiement crypté sécurisé 256 bits",
  "placeOrder": "Passer la commande en toute sécurité",
  "alert": "Veuillez remplir toutes les informations de livraison et du client.",
  "freeShippingMsg": "Dépensez %amount% de plus pour la livraison gratuite"
};

const checkRw = {
  "returnCart": "Subira mu gitebo",
  "title": "Kwishyura neza",
  "section1": "Umwirondoro w'Umukiriya",
  "fullName": "Amazina yombi",
  "email": "Imeli",
  "section2": "Aho Ibicuruzwa Bizajya",
  "phone": "Nomero ya telefone",
  "address": "Aho utuye / Aho ukorera",
  "section3": "Uburyo bwo Kwishyura",
  "momo": "Mobile Money",
  "card": "Ikarita ya Banki",
  "cash": "Kwishyura Mugejejweho",
  "momoProvider": "Hitamo Umuhuza",
  "momoNumber": "Nomero ya Mobile Money",
  "cardNum": "Nomero y'Ikarita",
  "cardExp": "Igihe Izarangirira",
  "cardCvc": "CVC / CVV",
  "cashDesc": "Ishyura mu ntoki nibakugezaho ibicuruzwa. Biri gusa muri Kigali.",
  "summary": "Incamake y'Ibyo Uguze",
  "subtotal": "Igiteranyo mbere yo Kohereza",
  "deliveryFee": "Ikiguzi cyo Kohereza",
  "free": "Ubuntu",
  "total": "Igiteranyo Cyose",
  "secure": "Kwishyura Byizewe",
  "placeOrder": "Emeza Kugura",
  "alert": "Uzuza imyirondoro yawe n'aho ibicuruzwa bizajya.",
  "freeShippingMsg": "Gura ibindi bya %amount% ubone koherezwa kubuntu"
};

en.checkout = checkEn;
fr.checkout = checkFr;
rw.checkout = checkRw;

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(frPath, JSON.stringify(fr, null, 2));
fs.writeFileSync(rwPath, JSON.stringify(rw, null, 2));

// Update CheckoutView.tsx
let checkTsx = fs.readFileSync("src/components/CheckoutView.tsx", "utf8");

if (!checkTsx.includes('useLanguage')) {
  checkTsx = checkTsx.replace("import React, { useState } from 'react';", "import React, { useState } from 'react';\nimport { useLanguage } from '../i18n/LanguageContext';");
  checkTsx = checkTsx.replace("export default function CheckoutView({", "export default function CheckoutView({\n  cart,\n  currentUser,\n  onPlaceOrder,\n  setView\n}: CheckoutViewProps) {\n  const { t } = useLanguage();\n  \n  const [name, setName] = useState(currentUser?.name || ''); // Hacky replace block end");
  
  // Actually let's just do a simple replacement for the start of the component to insert `const { t } = useLanguage();`
  // Wait, I messed up the replacement logic for the function declaration.
  // Let me just restore the function declaration via regex.
  checkTsx = checkTsx.replace(/export default function CheckoutView\(\{[\s\S]*?\}\: CheckoutViewProps\) \{([\s\S]*?)const \[name/, "export default function CheckoutView({\n  cart,\n  currentUser,\n  onPlaceOrder,\n  setView\n}: CheckoutViewProps) {\n  const { t } = useLanguage();\n  const [name");
}

checkTsx = checkTsx.replace(/alert\('Please fill out all delivery and customer information.'\)/g, "alert(t('checkout.alert'))");
checkTsx = checkTsx.replace(/>Return to Cart</g, ">{t('checkout.returnCart')}<");
checkTsx = checkTsx.replace(/>Secure Checkout</g, ">{t('checkout.title')}<");
checkTsx = checkTsx.replace(/>Customer Contact Information</g, ">{t('checkout.section1')}<");
checkTsx = checkTsx.replace(/>Full Name</g, ">{t('checkout.fullName')}<");
checkTsx = checkTsx.replace(/>Email Address</g, ">{t('checkout.email')}<");
checkTsx = checkTsx.replace(/>Delivery Details</g, ">{t('checkout.section2')}<");
checkTsx = checkTsx.replace(/>Phone Number</g, ">{t('checkout.phone')}<");
checkTsx = checkTsx.replace(/>Physical Delivery Address</g, ">{t('checkout.address')}<");
checkTsx = checkTsx.replace(/>Payment Method</g, ">{t('checkout.section3')}<");
checkTsx = checkTsx.replace(/>Mobile Money</g, ">{t('checkout.momo')}<");
checkTsx = checkTsx.replace(/>Card Payment</g, ">{t('checkout.card')}<");
checkTsx = checkTsx.replace(/>Cash on Delivery</g, ">{t('checkout.cash')}<");
checkTsx = checkTsx.replace(/>Select Provider</g, ">{t('checkout.momoProvider')}<");
checkTsx = checkTsx.replace(/>Mobile Money Number</g, ">{t('checkout.momoNumber')}<");
checkTsx = checkTsx.replace(/>Card Number</g, ">{t('checkout.cardNum')}<");
checkTsx = checkTsx.replace(/>Expiry Date</g, ">{t('checkout.cardExp')}<");
checkTsx = checkTsx.replace(/>CVC \/ CVV</g, ">{t('checkout.cardCvc')}<");
checkTsx = checkTsx.replace(/>Pay in cash when your items are delivered\. Available for Kigali only\.</g, ">{t('checkout.cashDesc')}<");
checkTsx = checkTsx.replace(/>Order Summary</g, ">{t('checkout.summary')}<");
checkTsx = checkTsx.replace(/>Subtotal</g, ">{t('checkout.subtotal')}<");
checkTsx = checkTsx.replace(/>Delivery Fee</g, ">{t('checkout.deliveryFee')}<");
checkTsx = checkTsx.replace(/>Free</g, ">{t('checkout.free')}<");
checkTsx = checkTsx.replace(/>Total Amount</g, ">{t('checkout.total')}<");
checkTsx = checkTsx.replace(/>256-bit Secure Encrypted Payment</g, ">{t('checkout.secure')}<");
checkTsx = checkTsx.replace(/>Place Order Securely</g, ">{t('checkout.placeOrder')}<");

fs.writeFileSync("src/components/CheckoutView.tsx", checkTsx);
console.log("Updated CheckoutView");
