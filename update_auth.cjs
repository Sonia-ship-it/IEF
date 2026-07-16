const fs = require("fs");

const enPath = "src/i18n/locales/en.json";
const frPath = "src/i18n/locales/fr.json";
const rwPath = "src/i18n/locales/rw.json";

let en = JSON.parse(fs.readFileSync(enPath, "utf8"));
let fr = JSON.parse(fs.readFileSync(frPath, "utf8"));
let rw = JSON.parse(fs.readFileSync(rwPath, "utf8"));

const authEn = {
  "signIn": "Sign In",
  "register": "Register Account",
  "welcomeBack": "Welcome Back",
  "accessPortal": "Access your portal to track orders and manage details.",
  "email": "Email Address",
  "password": "Secure Password",
  "signInBtn": "Sign In to Account",
  "createAccount": "Create New Account",
  "createDesc": "Register to streamline checkout and track your shipments.",
  "fullName": "Full Name",
  "phone": "Phone Number",
  "address": "Delivery Address",
  "registerBtn": "Register Now",
  "quickLogin": "Quick Developer Login",
  "quickDesc": "Instantly bypass authentication for testing purposes.",
  "customerBypass": "Customer Bypass",
  "adminBypass": "Admin Bypass",
  "profile": "Profile Management",
  "signOut": "Sign Out",
  "editProfile": "Edit Profile Information",
  "orderHistory": "Order History",
  "viewAdmin": "View Admin Dashboard",
  "role": "Role",
  "orderId": "Order ID",
  "date": "Date",
  "status": "Status",
  "items": "Items",
  "total": "Total",
  "noOrders": "No past orders found in our system.",
  "shopNow": "Shop Now"
};

const authFr = {
  "signIn": "Se Connecter",
  "register": "S'inscrire",
  "welcomeBack": "Content de vous revoir",
  "accessPortal": "Accédez à votre portail pour suivre les commandes.",
  "email": "Adresse E-mail",
  "password": "Mot de passe sécurisé",
  "signInBtn": "Se connecter au compte",
  "createAccount": "Créer un nouveau compte",
  "createDesc": "Inscrivez-vous pour faciliter le paiement et le suivi.",
  "fullName": "Nom complet",
  "phone": "Numéro de téléphone",
  "address": "Adresse de livraison",
  "registerBtn": "S'inscrire maintenant",
  "quickLogin": "Connexion rapide développeur",
  "quickDesc": "Contourner instantanément l'authentification pour les tests.",
  "customerBypass": "Connexion Client",
  "adminBypass": "Connexion Admin",
  "profile": "Gestion du profil",
  "signOut": "Se déconnecter",
  "editProfile": "Modifier les informations",
  "orderHistory": "Historique des commandes",
  "viewAdmin": "Voir le tableau de bord Admin",
  "role": "Rôle",
  "orderId": "Numéro de commande",
  "date": "Date",
  "status": "Statut",
  "items": "Articles",
  "total": "Total",
  "noOrders": "Aucune commande passée trouvée dans notre système.",
  "shopNow": "Acheter maintenant"
};

const authRw = {
  "signIn": "Injira",
  "register": "Fungura Konti",
  "welcomeBack": "Ikaze nanone",
  "accessPortal": "Injira urebe komande zawe n'imyirondoro.",
  "email": "Imeli",
  "password": "Ijambo ry'ibanga",
  "signInBtn": "Injira muri Konti",
  "createAccount": "Fungura Konti Nshya",
  "createDesc": "Iyandikishe kugira ngo wihutishe kugura no gukurikirana.",
  "fullName": "Amazina",
  "phone": "Telefone",
  "address": "Aho utuye",
  "registerBtn": "Iyandikishe Ubu",
  "quickLogin": "Injira vuba",
  "quickDesc": "Kwinjira vuba utasabwe ijambo ry'ibanga (kugerageza).",
  "customerBypass": "Kwinjira nk'Umukiriya",
  "adminBypass": "Kwinjira nk'Umuyobozi",
  "profile": "Imyirondoro",
  "signOut": "Sohoka",
  "editProfile": "Hindura Umwirondoro",
  "orderHistory": "Amateka y'Ibyo Waguze",
  "viewAdmin": "Reba Ikibaho cy'Abayobozi",
  "role": "Uruhare",
  "orderId": "Nomero",
  "date": "Itariki",
  "status": "Imiterere",
  "items": "Ibintu",
  "total": "Igiteranyo",
  "noOrders": "Nta byo waguze biraboneka.",
  "shopNow": "Haha Ubu"
};

en.auth = authEn;
fr.auth = authFr;
rw.auth = authRw;

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(frPath, JSON.stringify(fr, null, 2));
fs.writeFileSync(rwPath, JSON.stringify(rw, null, 2));

// Update AuthView.tsx
let authTsx = fs.readFileSync("src/components/AuthView.tsx", "utf8");

if (!authTsx.includes('useLanguage')) {
  authTsx = authTsx.replace("import React, { useState } from 'react';", "import React, { useState } from 'react';\nimport { useLanguage } from '../i18n/LanguageContext';");
  authTsx = authTsx.replace("export default function AuthView({", "export default function AuthView({\n  currentUser,\n  login,\n  logout,\n  orders,\n  setView\n}: AuthViewProps) {\n  const { t } = useLanguage();\n  // Hack: replace the top of component\n  const [activeTab");
  
  authTsx = authTsx.replace(/export default function AuthView\(\{[\s\S]*?\}\: AuthViewProps\) \{([\s\S]*?)const \[activeTab/, "export default function AuthView({\n  currentUser,\n  login,\n  logout,\n  orders,\n  setView\n}: AuthViewProps) {\n  const { t } = useLanguage();\n  const [activeTab");
}

authTsx = authTsx.replace(/'Sign In'/g, "t('auth.signIn')");
authTsx = authTsx.replace(/'Register Account'/g, "t('auth.register')");
authTsx = authTsx.replace(/>Welcome Back</g, ">{t('auth.welcomeBack')}<");
authTsx = authTsx.replace(/>Access your portal to track orders and manage details\.</g, ">{t('auth.accessPortal')}<");

authTsx = authTsx.replace(/>Email Address</g, ">{t('auth.email')}<");
authTsx = authTsx.replace(/>Secure Password</g, ">{t('auth.password')}<");
authTsx = authTsx.replace(/>Sign In to Account</g, ">{t('auth.signInBtn')}<");

authTsx = authTsx.replace(/>Create New Account</g, ">{t('auth.createAccount')}<");
authTsx = authTsx.replace(/>Register to streamline checkout and track your shipments\.</g, ">{t('auth.createDesc')}<");
authTsx = authTsx.replace(/>Full Name</g, ">{t('auth.fullName')}<");
authTsx = authTsx.replace(/>Phone Number</g, ">{t('auth.phone')}<");
authTsx = authTsx.replace(/>Delivery Address</g, ">{t('auth.address')}<");
authTsx = authTsx.replace(/>Register Now</g, ">{t('auth.registerBtn')}<");

authTsx = authTsx.replace(/>Quick Developer Login</g, ">{t('auth.quickLogin')}<");
authTsx = authTsx.replace(/>Instantly bypass authentication for testing purposes\.</g, ">{t('auth.quickDesc')}<");
authTsx = authTsx.replace(/>Customer Bypass</g, ">{t('auth.customerBypass')}<");
authTsx = authTsx.replace(/>Admin Bypass</g, ">{t('auth.adminBypass')}<");

authTsx = authTsx.replace(/>Profile Management</g, ">{t('auth.profile')}<");
authTsx = authTsx.replace(/>Sign Out</g, ">{t('auth.signOut')}<");
authTsx = authTsx.replace(/>Edit Profile Information</g, ">{t('auth.editProfile')}<");
authTsx = authTsx.replace(/>View Admin Dashboard</g, ">{t('auth.viewAdmin')}<");
authTsx = authTsx.replace(/>Order History</g, ">{t('auth.orderHistory')}<");

authTsx = authTsx.replace(/>Role</g, ">{t('auth.role')}<");
authTsx = authTsx.replace(/>Order ID</g, ">{t('auth.orderId')}<");
authTsx = authTsx.replace(/>Date</g, ">{t('auth.date')}<");
authTsx = authTsx.replace(/>Status</g, ">{t('auth.status')}<");
authTsx = authTsx.replace(/>Items</g, ">{t('auth.items')}<");
authTsx = authTsx.replace(/>Total</g, ">{t('auth.total')}<");

authTsx = authTsx.replace(/>No past orders found in our system\.</g, ">{t('auth.noOrders')}<");
authTsx = authTsx.replace(/>Shop Now</g, ">{t('auth.shopNow')}<");

fs.writeFileSync("src/components/AuthView.tsx", authTsx);
console.log("Updated AuthView");
