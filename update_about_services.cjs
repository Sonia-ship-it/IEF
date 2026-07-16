const fs = require("fs");

const enPath = "src/i18n/locales/en.json";
const frPath = "src/i18n/locales/fr.json";
const rwPath = "src/i18n/locales/rw.json";

let en = JSON.parse(fs.readFileSync(enPath, "utf8"));
let fr = JSON.parse(fs.readFileSync(frPath, "utf8"));
let rw = JSON.parse(fs.readFileSync(rwPath, "utf8"));

const aboutEn = {
  "subtitle": "OUR CORPORATE BIOGRAPHY",
  "title": "About IE & F Company Ltd",
  "desc": "Pioneering a holistic standard combining luxury retail fashion, high-performance electronics, and certified system installations in Kigali.",
  "historyTitle": "Company History",
  "historyDesc": "Founded in Kigali, Ian Electronics & Fashion Shop (IE & F SHOP) emerged as a vision to create a unique space catering to both physical identity and digital system infrastructure. We grew from a local boutique into a premier installer of networks and fire systems, retaining our core focus on high-quality fabrics and footwear.",
  "missionTitle": "Our Mission",
  "missionDesc": "Our mission is twofold: to deliver premium organic fashion that empowers individual expression, and to design technically flawless security, networking, and software frameworks that secure lives and businesses, establishing long-term trust and mutual growth.",
  "visionTitle": "Our Vision",
  "visionDesc": "To become East Africa's leading unified retail and technical service brand, recognized for uncompromising standards of original products, elegant material styling, and highly precise, safety-compliant technical projects.",
  "whyLead": "WHY WE LEAD",
  "uncompromising": "Uncompromising Quality & Trust",
  "uncompromisingDesc": "At IE & F SHOP, we reject shortcuts. Every t-shirt is crafted from heavy, certified organic cotton. Every security camera originates directly from original manufacturers like Dahua and Hikvision, ensuring stable software performance. Our technicians are fully licensed electrical and firefighting professionals.",
  "genuine": "100% Genuine Items",
  "genuineDesc": "No counterfeit chips or low-quality materials.",
  "engineers": "Full-Scope Engineers",
  "engineersDesc": "Certified for complex networks & web projects.",
  "statsClients": "500+",
  "statsClientsDesc": "Retail Clients",
  "statsInstallations": "120+",
  "statsInstallationsDesc": "System Installations",
  "statsBrands": "50+",
  "statsBrandsDesc": "Global Brands",
  "statsYears": "7+",
  "statsYearsDesc": "Years of Trust",
  "team": "EXECUTIVE LEADERSHIP",
  "meetTeam": "Meet the Core Team",
  "ceo": "CEO & Founder",
  "cto": "Chief Technical Officer",
  "retail": "Retail Manager"
};

const aboutFr = {
  "subtitle": "NOTRE BIOGRAPHIE D'ENTREPRISE",
  "title": "À propos de IE & F Company Ltd",
  "desc": "Pionnier d'une norme holistique combinant la mode de détail de luxe, l'électronique haute performance et les installations de systèmes certifiés à Kigali.",
  "historyTitle": "Historique de l'entreprise",
  "historyDesc": "Fondée à Kigali, Ian Electronics & Fashion Shop (IE & F SHOP) est née de la volonté de créer un espace unique répondant à la fois à l'identité physique et à l'infrastructure numérique. Nous sommes passés d'une boutique locale à un installateur de premier plan de réseaux et de systèmes de sécurité.",
  "missionTitle": "Notre Mission",
  "missionDesc": "Notre mission est double: fournir une mode biologique haut de gamme qui favorise l'expression individuelle, et concevoir des cadres de sécurité, de réseau et de logiciels techniquement irréprochables.",
  "visionTitle": "Notre Vision",
  "visionDesc": "Devenir la principale marque de vente au détail et de services techniques unifiée d'Afrique de l'Est, reconnue pour ses normes intransigeantes en matière de produits originaux.",
  "whyLead": "POURQUOI NOUS SOMMES LEADER",
  "uncompromising": "Qualité et confiance sans compromis",
  "uncompromisingDesc": "Chez IE & F SHOP, nous refusons les raccourcis. Chaque t-shirt est fabriqué à partir de coton biologique certifié. Chaque caméra de sécurité provient directement de fabricants originaux.",
  "genuine": "Articles 100% authentiques",
  "genuineDesc": "Pas de puces contrefaites ou de matériaux de mauvaise qualité.",
  "engineers": "Ingénieurs qualifiés",
  "engineersDesc": "Certifié pour les réseaux complexes et projets web.",
  "statsClients": "500+",
  "statsClientsDesc": "Clients détaillants",
  "statsInstallations": "120+",
  "statsInstallationsDesc": "Installations système",
  "statsBrands": "50+",
  "statsBrandsDesc": "Marques mondiales",
  "statsYears": "7+",
  "statsYearsDesc": "Années de confiance",
  "team": "DIRECTION",
  "meetTeam": "Rencontrez l'équipe",
  "ceo": "PDG et Fondateur",
  "cto": "Directeur technique",
  "retail": "Responsable des ventes"
};

const aboutRw = {
  "subtitle": "AMATEKA YACU",
  "title": "Kuri IE & F Company Ltd",
  "desc": "Turi aba mbere mu guhuza imyenda myiza, ibikoresho by'ikoranabuhanga bishya, no gushyiraho sisitemu zizewe mu mujyi wa Kigali.",
  "historyTitle": "Amateka y'Ikigo",
  "historyDesc": "Yashinzwe i Kigali, Ian Electronics & Fashion Shop (IE & F SHOP) yavutse ku gitekerezo cyo gukora ahantu hihariye hita ku myambarire no ku ikoranabuhanga. Twatangiye turi iduka rito tuza kuvamo abahanga mu gushyiraho imiyoboro na sisitemu z'umutekano.",
  "missionTitle": "Intego Yacu",
  "missionDesc": "Intego yacu n'imwe: gutanga imyenda myiza ifasha abantu kwisanzura, no gukora sisitemu z'umutekano, imiyoboro, na porogaramu zizewe zirinda ubuzima n'ubucuruzi.",
  "visionTitle": "Icyerekezo Cyacu",
  "visionDesc": "Kuba ikigo cya mbere muri Afurika y'Iburasirazuba gihuza ubucuruzi n'ikoranabuhanga, kizwiho gukoresha ibikoresho by'umwimerere no gukora imishinga myiza.",
  "whyLead": "IMPAMVU TURI IMBERE",
  "uncompromising": "Ubwiza n'Icyizere",
  "uncompromisingDesc": "Muri IE & F SHOP, ntitujya twemera ibintu byoroheje. Buri mupira ukozwe mu ipamba ryiza. Buri kamera y'umutekano iva ku ruganda rukuru kugira ngo ikore neza. Abakozi bacu bafite ibyangombwa byose.",
  "genuine": "Ibikoresho by'umwimerere 100%",
  "genuineDesc": "Nta bikoresho byiganwe cyangwa bidakomeye.",
  "engineers": "Abahanga Bize",
  "engineersDesc": "Bafitiye ibyangombwa imiyoboro na porogaramu.",
  "statsClients": "500+",
  "statsClientsDesc": "Abakiriya",
  "statsInstallations": "120+",
  "statsInstallationsDesc": "Sisitemu twashyizeho",
  "statsBrands": "50+",
  "statsBrandsDesc": "Inganda zikomeye",
  "statsYears": "7+",
  "statsYearsDesc": "Imyaka y'icyizere",
  "team": "ABAYOBOZI BACU",
  "meetTeam": "Menya Ikipe Yacu",
  "ceo": "Umuyobozi Mukuru",
  "cto": "Umuyobozi w'Ikoranabuhanga",
  "retail": "Umuyobozi w'Iduka"
};

en.about = aboutEn;
fr.about = aboutFr;
rw.about = aboutRw;

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(frPath, JSON.stringify(fr, null, 2));
fs.writeFileSync(rwPath, JSON.stringify(rw, null, 2));

// Update AboutView.tsx
let aboutTsx = fs.readFileSync("src/components/AboutView.tsx", "utf8");

if (!aboutTsx.includes('useLanguage')) {
  aboutTsx = aboutTsx.replace("import React from 'react';", "import React from 'react';\nimport { useLanguage } from '../i18n/LanguageContext';");
  aboutTsx = aboutTsx.replace("export default function AboutView() {", "export default function AboutView() {\n  const { t } = useLanguage();");
}

aboutTsx = aboutTsx.replace("OUR CORPORATE BIOGRAPHY", "{t('about.subtitle')}");
aboutTsx = aboutTsx.replace("About IE &amp; F Company Ltd", "{t('about.title')}");
aboutTsx = aboutTsx.replace("Pioneering a holistic standard combining luxury retail fashion, high-performance electronics, and certified system installations in Kigali.", "{t('about.desc')}");

aboutTsx = aboutTsx.replace("Company History", "{t('about.historyTitle')}");
aboutTsx = aboutTsx.replace("Founded in Kigali, Ian Electronics &amp; Fashion Shop (IE &amp; F SHOP) emerged as a vision to create a unique space catering to both physical identity and digital system infrastructure. We grew from a local boutique into a premier installer of networks and fire systems, retaining our core focus on high-quality fabrics and footwear.", "{t('about.historyDesc')}");

aboutTsx = aboutTsx.replace("Our Mission", "{t('about.missionTitle')}");
aboutTsx = aboutTsx.replace("Our mission is twofold: to deliver premium organic fashion that empowers individual expression, and to design technically flawless security, networking, and software frameworks that secure lives and businesses, establishing long-term trust and mutual growth.", "{t('about.missionDesc')}");

aboutTsx = aboutTsx.replace("Our Vision", "{t('about.visionTitle')}");
aboutTsx = aboutTsx.replace("To become East Africa's leading unified retail and technical service brand, recognized for uncompromising standards of original products, elegant material styling, and highly precise, safety-compliant technical projects.", "{t('about.visionDesc')}");

aboutTsx = aboutTsx.replace("WHY WE LEAD", "{t('about.whyLead')}");
aboutTsx = aboutTsx.replace("Uncompromising Quality &amp; Trust", "{t('about.uncompromising')}");
aboutTsx = aboutTsx.replace("At IE &amp; F SHOP, we reject shortcuts. Every t-shirt is crafted from heavy, certified organic cotton. Every security camera originates directly from original manufacturers like Dahua and Hikvision, ensuring stable software performance. Our technicians are fully licensed electrical and firefighting professionals.", "{t('about.uncompromisingDesc')}");

aboutTsx = aboutTsx.replace("100% Genuine Items", "{t('about.genuine')}");
aboutTsx = aboutTsx.replace("No counterfeit chips or low-quality materials.", "{t('about.genuineDesc')}");

aboutTsx = aboutTsx.replace("Full-Scope Engineers", "{t('about.engineers')}");
aboutTsx = aboutTsx.replace("Certified for complex networks &amp; web projects.", "{t('about.engineersDesc')}");

aboutTsx = aboutTsx.replace("Retail Clients", "{t('about.statsClientsDesc')}");
aboutTsx = aboutTsx.replace("System Installations", "{t('about.statsInstallationsDesc')}");
aboutTsx = aboutTsx.replace("Global Brands", "{t('about.statsBrandsDesc')}");
aboutTsx = aboutTsx.replace("Years of Trust", "{t('about.statsYearsDesc')}");

aboutTsx = aboutTsx.replace("EXECUTIVE LEADERSHIP", "{t('about.team')}");
aboutTsx = aboutTsx.replace("Meet the Core Team", "{t('about.meetTeam')}");
aboutTsx = aboutTsx.replace("CEO &amp; Founder", "{t('about.ceo')}");
aboutTsx = aboutTsx.replace("Chief Technical Officer", "{t('about.cto')}");
aboutTsx = aboutTsx.replace("Retail Manager", "{t('about.retail')}");

fs.writeFileSync("src/components/AboutView.tsx", aboutTsx);
console.log("Updated AboutView");
