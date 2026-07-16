const fs = require("fs");

const enPath = "src/i18n/locales/en.json";
const frPath = "src/i18n/locales/fr.json";
const rwPath = "src/i18n/locales/rw.json";

let en = JSON.parse(fs.readFileSync(enPath, "utf8"));
let fr = JSON.parse(fs.readFileSync(frPath, "utf8"));
let rw = JSON.parse(fs.readFileSync(rwPath, "utf8"));

const retEn = {
  "subtitle": "Consumer Protection Policies",
  "title": "Returns & Refund Policies",
  "desc": "Read our clear guidelines governing product returns, refunds processing schedules, and exchange policies for electronics or fashion.",
  "card1Title": "7-Day Returns Policy",
  "card1Desc": "We offer our shoppers a flexible 7-day window to return items purchased from our retail catalog. For deliveries outside Kigali, the return window extends to 14 days from the delivery confirmation timestamp.",
  "strictTitle": "Strict Return Conditions:",
  "cond1": "The product must remain completely unused, unworn, and unwashed.",
  "cond2": "Items must remain in their original packaging, including unbroken seal tags.",
  "cond3": "Footwear box packaging must not be torn, written on, or taped over.",
  "cond4": "Surveillance security camera lenses must not show scratch marks or wire cuts.",
  "card2Title": "Replacement & Exchanges",
  "card2Desc": "If you receive an item that is damaged, structurally flawed, or has mismatched sizing, we offer free direct replacements. Mismatched garment sizing exchanges depend on current stock limits.",
  "specialClause": "Special Electronic & Technical Clause:",
  "specialClauseDesc": "Hardware components, fire alarms, and network cabling bundles cannot be returned if they have been physically installed or modified in any capacity by third-party uncertified technicians.",
  "processTitle": "Refund Execution Mechanics",
  "step1Title": "01. Physical Inspection",
  "step1Desc": "Our administrative store team receives the return package and performs a physical quality check to verify tags and conditions.",
  "step2Title": "02. Approval Verification",
  "step2Desc": "Upon verifying compliance with condition mandates, we immediately approve the claim and update your customer account logs.",
  "step3Title": "03. Refund Processing",
  "step3Desc": "A direct cash refund, mobile money transfer, or credit card charge-back is dispatched to your original payment account."
};

const retFr = {
  "subtitle": "Politiques de protection",
  "title": "Retours et remboursements",
  "desc": "Lisez nos directives claires régissant les retours de produits, les calendriers de remboursement et les politiques d'échange.",
  "card1Title": "Politique de retour de 7 jours",
  "card1Desc": "Nous offrons une fenêtre flexible de 7 jours pour retourner les articles achetés. Pour les livraisons en dehors de Kigali, la fenêtre s'étend à 14 jours.",
  "strictTitle": "Conditions strictes de retour:",
  "cond1": "Le produit doit rester complètement inutilisé, non porté et non lavé.",
  "cond2": "Les articles doivent rester dans leur emballage d'origine avec étiquettes.",
  "cond3": "L'emballage des chaussures ne doit pas être déchiré ou écrit.",
  "cond4": "Les caméras de sécurité ne doivent pas présenter de rayures.",
  "card2Title": "Remplacement et échanges",
  "card2Desc": "Si vous recevez un article endommagé ou avec une mauvaise taille, nous proposons des remplacements gratuits, selon les stocks disponibles.",
  "specialClause": "Clause spéciale électronique:",
  "specialClauseDesc": "Les composants matériels ne peuvent pas être retournés s'ils ont été physiquement installés par des techniciens tiers.",
  "processTitle": "Mécanismes d'exécution",
  "step1Title": "01. Inspection physique",
  "step1Desc": "Notre équipe administrative effectue un contrôle de qualité physique.",
  "step2Title": "02. Vérification de l'approbation",
  "step2Desc": "Après vérification de la conformité, nous approuvons immédiatement la réclamation.",
  "step3Title": "03. Traitement du remboursement",
  "step3Desc": "Un remboursement en espèces, par transfert d'argent mobile ou carte de crédit est envoyé."
};

const retRw = {
  "subtitle": "Kurengera Umuguzi",
  "title": "Gusubiza ibicuruzwa & Kwishyurwa",
  "desc": "Soma amabwiriza yumvikana agenga uburyo bwo gusubiza ibicuruzwa, gusubizwa amafaranga, cyangwa kugurana.",
  "card1Title": "Gusubiza mu minsi 7",
  "card1Desc": "Twemera ko umukiriya asubiza igicuruzwa mu minsi 7. Ku bantu bari hanze ya Kigali, igihe ni iminsi 14 uhereye umunsi wakiriyeho igicuruzwa.",
  "strictTitle": "Ibisabwa mu gusubiza:",
  "cond1": "Igicuruzwa kigomba kuba kitarakoreshwa cyangwa ngo cymeswe.",
  "cond2": "Kigomba kuba kikiri mu isashi yacyo hamwe na tagi.",
  "cond3": "Agakarito k'inkweto ntagomba kuba gacitse cyangwa kanditsweho.",
  "cond4": "Kamera z'umutekano ntizigomba kuba zishushanyijeho cyangwa zaciwe insinga.",
  "card2Title": "Kugurana & Gusimbuza",
  "card2Desc": "Niba wakiriye igicuruzwa cyangiritse cyangwa kidakwiriye, turagisimbuza ku buntu. Kugurana imyenda bitewe n'uko idakwiriye biterwa n'ibiri mu bubiko.",
  "specialClause": "Ibijyanye n'Ikoranabuhanga:",
  "specialClauseDesc": "Ibikoresho by'ikoranabuhanga n'insinga ntibishobora gusubizwa niba byaramaze gushyirwaho n'abandi bantu badafite ibyangombwa byacu.",
  "processTitle": "Uko Bikorwa",
  "step1Title": "01. Gusuzuma",
  "step1Desc": "Ikipe yacu isuzuma igicuruzwa kugira ngo irebe niba kimeze neza.",
  "step2Title": "02. Kwemeza",
  "step2Desc": "Iyo dusanze ibintu bimeze neza, duhita twemeza ko usubizwa amafaranga cyangwa uhabwa ikindi.",
  "step3Title": "03. Kwishyurwa",
  "step3Desc": "Amafaranga asubizwa binyuze kuri Mobile Money cyangwa Ikarita ya Banki."
};

en.returns = retEn;
fr.returns = retFr;
rw.returns = retRw;

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(frPath, JSON.stringify(fr, null, 2));
fs.writeFileSync(rwPath, JSON.stringify(rw, null, 2));

// Update ReturnsView.tsx
let retTsx = fs.readFileSync("src/components/ReturnsView.tsx", "utf8");

if (!retTsx.includes('useLanguage')) {
  retTsx = retTsx.replace("import React from 'react';", "import React from 'react';\nimport { useLanguage } from '../i18n/LanguageContext';");
  retTsx = retTsx.replace("export default function ReturnsView() {", "export default function ReturnsView() {\n  const { t } = useLanguage();");
}

retTsx = retTsx.replace("'01. Physical Inspection'", "t('returns.step1Title')");
retTsx = retTsx.replace("'Our administrative store team receives the return package and performs a physical quality check to verify tags and conditions.'", "t('returns.step1Desc')");
retTsx = retTsx.replace("'02. Approval Verification'", "t('returns.step2Title')");
retTsx = retTsx.replace("'Upon verifying compliance with condition mandates, we immediately approve the claim and update your customer account logs.'", "t('returns.step2Desc')");
retTsx = retTsx.replace("'03. Refund Processing'", "t('returns.step3Title')");
retTsx = retTsx.replace("'A direct cash refund, mobile money transfer, or credit card charge-back is dispatched to your original payment account.'", "t('returns.step3Desc')");

retTsx = retTsx.replace(/>Consumer Protection Policies</g, ">{t('returns.subtitle')}<");
retTsx = retTsx.replace(/>Returns &amp; Refund Policies</g, ">{t('returns.title')}<");
retTsx = retTsx.replace(/>Read our clear guidelines governing product returns, refunds processing schedules, and exchange policies for electronics or fashion\.</g, ">{t('returns.desc')}<");
retTsx = retTsx.replace(/>7-Day Returns Policy</g, ">{t('returns.card1Title')}<");
// we have to replace the paragraph including HTML tags, it's safer to just replace the whole paragraph content, but I'll use regex or literal for the parts
retTsx = retTsx.replace(/We offer our shoppers a flexible <strong>7-day window<\/strong> to return items purchased from our retail catalog\. For deliveries outside Kigali, the return window extends to <strong>14 days<\/strong> from the delivery confirmation timestamp\./g, "{t('returns.card1Desc')}");
retTsx = retTsx.replace(/>Strict Return Conditions:</g, ">{t('returns.strictTitle')}<");

retTsx = retTsx.replace(/'The product must remain completely unused, unworn, and unwashed\.',/g, "t('returns.cond1'),");
retTsx = retTsx.replace(/'Items must remain in their original packaging, including unbroken seal tags\.',/g, "t('returns.cond2'),");
retTsx = retTsx.replace(/'Footwear box packaging must not be torn, written on, or taped over\.',/g, "t('returns.cond3'),");
retTsx = retTsx.replace(/'Surveillance security camera lenses must not show scratch marks or wire cuts\.'/g, "t('returns.cond4')");

retTsx = retTsx.replace(/>Replacement &amp; Exchanges</g, ">{t('returns.card2Title')}<");
retTsx = retTsx.replace(/>If you receive an item that is damaged, structurally flawed, or has mismatched sizing, we offer free direct replacements\. Mismatched garment sizing exchanges depend on current stock limits\.</g, ">{t('returns.card2Desc')}<");
retTsx = retTsx.replace(/>Special Electronic &amp; Technical Clause:</g, ">{t('returns.specialClause')}<");
retTsx = retTsx.replace(/>Hardware components, fire alarms, and network cabling bundles cannot be returned if they have been physically installed or modified in any capacity by third-party uncertified technicians\.</g, ">{t('returns.specialClauseDesc')}<");
retTsx = retTsx.replace(/>Refund Execution Mechanics</g, ">{t('returns.processTitle')}<");

fs.writeFileSync("src/components/ReturnsView.tsx", retTsx);
console.log("Updated ReturnsView");
