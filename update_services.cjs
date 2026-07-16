const fs = require("fs");

const enPath = "src/i18n/locales/en.json";
const frPath = "src/i18n/locales/fr.json";
const rwPath = "src/i18n/locales/rw.json";

let en = JSON.parse(fs.readFileSync(enPath, "utf8"));
let fr = JSON.parse(fs.readFileSync(frPath, "utf8"));
let rw = JSON.parse(fs.readFileSync(rwPath, "utf8"));

const servEn = {
  "subtitle": "Engineering & IT Solutions",
  "title": "Technical Solutions & System Installations",
  "desc": "We house certified technical installers and experienced software engineers to service your infrastructure. Explore our offerings and book site assessments below.",
  "book": "Book System Assessment",
  "reqTitle": "Request Service",
  "reqSubtitle": "Deploy an engineering team or request consultation.",
  "nameLabel": "Contact Name",
  "namePlaceholder": "Your Full Name",
  "emailLabel": "Email Address",
  "emailPlaceholder": "Your Email",
  "phoneLabel": "Phone Number",
  "phonePlaceholder": "Your Phone Number",
  "msgLabel": "Service Context / Requirements",
  "msgPlaceholder": "Describe your location, system size, and needs...",
  "cancel": "Cancel",
  "submit": "Submit Service Request",
  "success": "Service Request Logged",
  "successMsg": "A technical lead will contact you shortly to schedule an assessment.",
  "close": "Close"
};

const servFr = {
  "subtitle": "Ingénierie & Solutions Informatiques",
  "title": "Solutions Techniques & Installations",
  "desc": "Nous disposons d'installateurs techniques certifiés et d'ingénieurs logiciels expérimentés pour entretenir votre infrastructure. Explorez nos offres et réservez des évaluations de site ci-dessous.",
  "book": "Réserver une évaluation du système",
  "reqTitle": "Demander un service",
  "reqSubtitle": "Déployer une équipe d'ingénieurs ou demander une consultation.",
  "nameLabel": "Nom de contact",
  "namePlaceholder": "Votre nom complet",
  "emailLabel": "Adresse E-mail",
  "emailPlaceholder": "Votre e-mail",
  "phoneLabel": "Numéro de téléphone",
  "phonePlaceholder": "Votre téléphone",
  "msgLabel": "Contexte / Exigences",
  "msgPlaceholder": "Décrivez votre emplacement, la taille du système...",
  "cancel": "Annuler",
  "submit": "Soumettre la demande",
  "success": "Demande de service enregistrée",
  "successMsg": "Un responsable technique vous contactera sous peu.",
  "close": "Fermer"
};

const servRw = {
  "subtitle": "Ikoranabuhanga & Engineering",
  "title": "Ikoranabuhanga & Gushyiraho Sisitemu",
  "desc": "Dufite abahanga bafite ibyangombwa mu gukora no gushyiraho sisitemu. Reba ibyo dukora hano hasi usabe ubufasha.",
  "book": "Saba Igenzura",
  "reqTitle": "Saba Serivisi",
  "reqSubtitle": "Saba ikipe yacu kugufasha cyangwa inama.",
  "nameLabel": "Izina ryawe",
  "namePlaceholder": "Andika izina",
  "emailLabel": "Imeli yawe",
  "emailPlaceholder": "Andika imeli",
  "phoneLabel": "Nomero ya telefone",
  "phonePlaceholder": "Andika telefone",
  "msgLabel": "Ibyo wifuza",
  "msgPlaceholder": "Sobanura aho uherereye n'ibyo ukeneye...",
  "cancel": "Reka",
  "submit": "Ohereza ubusabe",
  "success": "Ubusabe Bwakiriwe",
  "successMsg": "Umwe mu bahanga bacu arakuvugisha mu kanya.",
  "close": "Funga"
};

en.services = servEn;
fr.services = servFr;
rw.services = servRw;

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(frPath, JSON.stringify(fr, null, 2));
fs.writeFileSync(rwPath, JSON.stringify(rw, null, 2));

// Update ServicesView.tsx
let servTsx = fs.readFileSync("src/components/ServicesView.tsx", "utf8");

if (!servTsx.includes('useLanguage')) {
  servTsx = servTsx.replace("import React, { useState } from 'react';", "import React, { useState } from 'react';\nimport { useLanguage } from '../i18n/LanguageContext';");
  servTsx = servTsx.replace("export default function ServicesView({ services, onRequestService }: ServicesViewProps) {", "export default function ServicesView({ services, onRequestService }: ServicesViewProps) {\n  const { t } = useLanguage();");
}

servTsx = servTsx.replace("Engineering &amp; IT Solutions", "{t('services.subtitle')}");
servTsx = servTsx.replace("Technical Solutions &amp; System Installations", "{t('services.title')}");
servTsx = servTsx.replace("We house certified technical installers and experienced software engineers to service your infrastructure. Explore our offerings and book site assessments below.", "{t('services.desc')}");

servTsx = servTsx.replace(/>Book System Assessment<\/button>/g, ">{t('services.book')}</button>");
servTsx = servTsx.replace(/>Request Service: /g, ">{t('services.reqTitle')}: ");
servTsx = servTsx.replace(/Deploy an engineering team or request consultation\./g, "{t('services.reqSubtitle')}");

servTsx = servTsx.replace(/>Contact Name</g, ">{t('services.nameLabel')}<");
servTsx = servTsx.replace(/placeholder="Your Full Name"/g, "placeholder={t('services.namePlaceholder')}");
servTsx = servTsx.replace(/>Email Address</g, ">{t('services.emailLabel')}<");
servTsx = servTsx.replace(/placeholder="you@company.com"/g, "placeholder={t('services.emailPlaceholder')}");
servTsx = servTsx.replace(/>Phone Number</g, ">{t('services.phoneLabel')}<");
servTsx = servTsx.replace(/placeholder="\+250 788 000 000"/g, "placeholder={t('services.phonePlaceholder')}");
servTsx = servTsx.replace(/>Service Context \/ Requirements</g, ">{t('services.msgLabel')}<");
servTsx = servTsx.replace(/placeholder="Describe your location, system size, and needs..."/g, "placeholder={t('services.msgPlaceholder')}");

servTsx = servTsx.replace(/>Cancel</g, ">{t('services.cancel')}<");
servTsx = servTsx.replace(/>Submit Service Request</g, ">{t('services.submit')}<");
servTsx = servTsx.replace(/>Service Request Logged</g, ">{t('services.success')}<");
servTsx = servTsx.replace(/A technical lead will contact you shortly to schedule an assessment\./g, "{t('services.successMsg')}");
servTsx = servTsx.replace(/>Close</g, ">{t('services.close')}<");

fs.writeFileSync("src/components/ServicesView.tsx", servTsx);
console.log("Updated ServicesView");
