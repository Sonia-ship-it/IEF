const fs = require("fs");
const enPath = "src/i18n/locales/en.json";
const frPath = "src/i18n/locales/fr.json";
const rwPath = "src/i18n/locales/rw.json";
let en = JSON.parse(fs.readFileSync(enPath, "utf8"));
let fr = JSON.parse(fs.readFileSync(frPath, "utf8"));
let rw = JSON.parse(fs.readFileSync(rwPath, "utf8"));

en.auth.noOrdersDesc = "Looks like you haven't processed any invoices yet.";
fr.auth.noOrdersDesc = "Il semble que vous n'ayez pas encore traité de factures.";
rw.auth.noOrdersDesc = "Nta fagitire zabonetse kuri konti yawe.";

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(frPath, JSON.stringify(fr, null, 2));
fs.writeFileSync(rwPath, JSON.stringify(rw, null, 2));

// Fix ReturnsView - remaining hardcoded strings
let retTsx = fs.readFileSync("src/components/ReturnsView.tsx", "utf8");
retTsx = retTsx.replace(
  ">Three-Stage Refund Settlement Workflow<",
  ">{t('returns.threeStage')}<"
);
retTsx = retTsx.replace(
  "Surveillance cameras, DVR decoders, smoke alarms, or routers already hard-wired or physically drilled on site by client technicians are strictly exempt from general return privileges.",
  "{t('returns.specialClauseDesc2')}"
);
fs.writeFileSync("src/components/ReturnsView.tsx", retTsx);

console.log("Patched locales + ReturnsView");
