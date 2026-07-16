const fs = require("fs");

const enPath = "src/i18n/locales/en.json";
const frPath = "src/i18n/locales/fr.json";
const rwPath = "src/i18n/locales/rw.json";

let en = JSON.parse(fs.readFileSync(enPath, "utf8"));
let fr = JSON.parse(fs.readFileSync(frPath, "utf8"));
let rw = JSON.parse(fs.readFileSync(rwPath, "utf8"));

const contEn = {
  "subtitle": "24/7 CUSTOMER SUPPORT",
  "title": "Contact Our Network",
  "desc": "Whether you have questions about our latest luxury arrivals or need emergency technical support for your installed systems, our dedicated teams are on standby.",
  "formTitle": "Send us a direct message",
  "name": "Full Name",
  "namePlaceholder": "Jane Doe",
  "email": "Email Address",
  "emailPlaceholder": "jane@example.com",
  "phone": "Phone Number (Optional)",
  "phonePlaceholder": "+250 788 000 000",
  "message": "Your Message",
  "messagePlaceholder": "How can we assist you today?",
  "send": "Dispatch Message",
  "alert": "Please fill in your name, email, and message content.",
  "success": "Message Dispatched",
  "successMsg": "A representative from the retail or technical team will respond shortly.",
  "sendAnother": "Send Another Inquiry",
  "infoTitle": "Contact Information",
  "locTitle": "Corporate Headquarters",
  "locDesc1": "Kigali City Center",
  "locDesc2": "KN 4 Avenue, Kigali, Rwanda",
  "directTitle": "Direct Lines",
  "directDesc1": "Retail Support: +250 780 000 000",
  "directDesc2": "Technical Support: +250 780 000 001",
  "mailTitle": "Official Email",
  "mailDesc1": "Sales: sales@iefshop.com",
  "mailDesc2": "Support: tech@iefshop.com",
  "hoursTitle": "Operating Hours",
  "hoursDesc1": "Mon-Fri: 8:00 AM - 6:00 PM",
  "hoursDesc2": "Sat: 9:00 AM - 2:00 PM (Retail Only)",
  "socials": "Social Networks"
};

const contFr = {
  "subtitle": "ASSISTANCE 24/7",
  "title": "Contactez notre réseau",
  "desc": "Que vous ayez des questions sur nos derniers arrivages ou besoin d'une assistance technique d'urgence, nos équipes sont à votre disposition.",
  "formTitle": "Envoyez-nous un message direct",
  "name": "Nom complet",
  "namePlaceholder": "Jeanne Dupont",
  "email": "Adresse e-mail",
  "emailPlaceholder": "jeanne@example.com",
  "phone": "Numéro de téléphone (Facultatif)",
  "phonePlaceholder": "+250 788 000 000",
  "message": "Votre message",
  "messagePlaceholder": "Comment pouvons-nous vous aider aujourd'hui?",
  "send": "Envoyer le message",
  "alert": "Veuillez remplir votre nom, e-mail et le contenu du message.",
  "success": "Message envoyé",
  "successMsg": "Un représentant vous répondra sous peu.",
  "sendAnother": "Envoyer une autre demande",
  "infoTitle": "Informations de contact",
  "locTitle": "Siège social",
  "locDesc1": "Centre-ville de Kigali",
  "locDesc2": "KN 4 Avenue, Kigali, Rwanda",
  "directTitle": "Lignes directes",
  "directDesc1": "Ventes: +250 780 000 000",
  "directDesc2": "Support: +250 780 000 001",
  "mailTitle": "Email Officiel",
  "mailDesc1": "Ventes: sales@iefshop.com",
  "mailDesc2": "Support: tech@iefshop.com",
  "hoursTitle": "Heures d'ouverture",
  "hoursDesc1": "Lun-Ven: 8h00 - 18h00",
  "hoursDesc2": "Sam: 9h00 - 14h00 (Boutique)",
  "socials": "Réseaux sociaux"
};

const contRw = {
  "subtitle": "DUFASHA ABAKIRIYA IGIHE CYOSE",
  "title": "Twandikire cyangwa Uduhamagare",
  "desc": "Waba wifuza kubaza ku myenda mishya cyangwa ukeneye ubufasha bw'ikoranabuhanga, amakipe yacu yiteguye kugufasha.",
  "formTitle": "Twoherereze Ubutumwa",
  "name": "Amazina",
  "namePlaceholder": "Andika amazina",
  "email": "Imeli yawe",
  "emailPlaceholder": "Andika imeli",
  "phone": "Telefone (Niba uyifite)",
  "phonePlaceholder": "+250 788 000 000",
  "message": "Ubutumwa bwawe",
  "messagePlaceholder": "Tugufashe iki uyu munsi?",
  "send": "Ohereza Ubutumwa",
  "alert": "Uzuza izina, imeli, n'ubutumwa bwawe.",
  "success": "Ubutumwa Bwoherejwe",
  "successMsg": "Umwe mu bakozi bacu arakuvugisha vuba.",
  "sendAnother": "Ohereza Ubundi Butumwa",
  "infoTitle": "Aho Twabarizwa",
  "locTitle": "Icyicaro Gikuru",
  "locDesc1": "Umujyi wa Kigali",
  "locDesc2": "KN 4 Avenue, Kigali, Rwanda",
  "directTitle": "Imirongo ya Telefone",
  "directDesc1": "Kugura: +250 780 000 000",
  "directDesc2": "Ikoranabuhanga: +250 780 000 001",
  "mailTitle": "Imeli Yacu",
  "mailDesc1": "Kugura: sales@iefshop.com",
  "mailDesc2": "Gufasha: tech@iefshop.com",
  "hoursTitle": "Amasaha y'Akazi",
  "hoursDesc1": "Mbere-Gatano: S2 - S12 z'umugoroba",
  "hoursDesc2": "Kuwa Gatandatu: S3 - S8 (Iduka)",
  "socials": "Imbuga Nkoranyambaga"
};

en.contact = contEn;
fr.contact = contFr;
rw.contact = contRw;

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(frPath, JSON.stringify(fr, null, 2));
fs.writeFileSync(rwPath, JSON.stringify(rw, null, 2));

// Update ContactView.tsx
let contTsx = fs.readFileSync("src/components/ContactView.tsx", "utf8");

if (!contTsx.includes('useLanguage')) {
  contTsx = contTsx.replace("import React, { useState } from 'react';", "import React, { useState } from 'react';\nimport { useLanguage } from '../i18n/LanguageContext';");
  contTsx = contTsx.replace("export default function ContactView() {", "export default function ContactView() {\n  const { t } = useLanguage();");
}

contTsx = contTsx.replace(/alert\('Please fill in your name, email, and message content.'\)/g, "alert(t('contact.alert'))");
contTsx = contTsx.replace(/>24\/7 CUSTOMER SUPPORT</g, ">{t('contact.subtitle')}<");
contTsx = contTsx.replace(/>Contact Our Network</g, ">{t('contact.title')}<");
contTsx = contTsx.replace(/>Whether you have questions about our latest luxury arrivals or need emergency technical support for your installed systems, our dedicated teams are on standby\.</g, ">{t('contact.desc')}<");
contTsx = contTsx.replace(/>Send us a direct message</g, ">{t('contact.formTitle')}<");

contTsx = contTsx.replace(/>Full Name</g, ">{t('contact.name')}<");
contTsx = contTsx.replace(/placeholder="Jane Doe"/g, "placeholder={t('contact.namePlaceholder')}");
contTsx = contTsx.replace(/>Email Address</g, ">{t('contact.email')}<");
contTsx = contTsx.replace(/placeholder="jane@example.com"/g, "placeholder={t('contact.emailPlaceholder')}");
contTsx = contTsx.replace(/>Phone Number \(Optional\)</g, ">{t('contact.phone')}<");
contTsx = contTsx.replace(/placeholder="\+250 788 000 000"/g, "placeholder={t('contact.phonePlaceholder')}");
contTsx = contTsx.replace(/>Your Message</g, ">{t('contact.message')}<");
contTsx = contTsx.replace(/placeholder="How can we assist you today\?"/g, "placeholder={t('contact.messagePlaceholder')}");

contTsx = contTsx.replace(/>Dispatch Message</g, ">{t('contact.send')}<");
contTsx = contTsx.replace(/>Message Dispatched</g, ">{t('contact.success')}<");
contTsx = contTsx.replace(/>A representative from the retail or technical team will respond shortly\.</g, ">{t('contact.successMsg')}<");
contTsx = contTsx.replace(/>Send Another Inquiry</g, ">{t('contact.sendAnother')}<");

contTsx = contTsx.replace(/>Contact Information</g, ">{t('contact.infoTitle')}<");
contTsx = contTsx.replace(/>Corporate Headquarters</g, ">{t('contact.locTitle')}<");
contTsx = contTsx.replace(/>Kigali City Center</g, ">{t('contact.locDesc1')}<");
contTsx = contTsx.replace(/>KN 4 Avenue, Kigali, Rwanda</g, ">{t('contact.locDesc2')}<");
contTsx = contTsx.replace(/>Direct Lines</g, ">{t('contact.directTitle')}<");
contTsx = contTsx.replace(/>Retail Support: \+250 780 000 000</g, ">{t('contact.directDesc1')}<");
contTsx = contTsx.replace(/>Technical Support: \+250 780 000 001</g, ">{t('contact.directDesc2')}<");
contTsx = contTsx.replace(/>Official Email</g, ">{t('contact.mailTitle')}<");
contTsx = contTsx.replace(/>Sales: sales@iefshop\.com</g, ">{t('contact.mailDesc1')}<");
contTsx = contTsx.replace(/>Support: tech@iefshop\.com</g, ">{t('contact.mailDesc2')}<");
contTsx = contTsx.replace(/>Operating Hours</g, ">{t('contact.hoursTitle')}<");
contTsx = contTsx.replace(/>Mon-Fri: 8:00 AM - 6:00 PM</g, ">{t('contact.hoursDesc1')}<");
contTsx = contTsx.replace(/>Sat: 9:00 AM - 2:00 PM \(Retail Only\)</g, ">{t('contact.hoursDesc2')}<");
contTsx = contTsx.replace(/>Social Networks</g, ">{t('contact.socials')}<");

fs.writeFileSync("src/components/ContactView.tsx", contTsx);
console.log("Updated ContactView");
