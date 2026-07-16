const fs = require("fs");

const enPath = "src/i18n/locales/en.json";
const frPath = "src/i18n/locales/fr.json";
const rwPath = "src/i18n/locales/rw.json";

let en = JSON.parse(fs.readFileSync(enPath, "utf8"));
let fr = JSON.parse(fs.readFileSync(frPath, "utf8"));
let rw = JSON.parse(fs.readFileSync(rwPath, "utf8"));

const adminEn = {
  "adminPanel": "Admin Panel",
  "dashboard": "Dashboard Overview",
  "products": "Retail Products",
  "services": "Technical Services",
  "orders": "Client Orders",
  "users": "System Users",
  "settings": "Global Settings",
  "logout": "Exit System",
  "stats": "System Metrics",
  "totalSales": "Total Sales Volume",
  "pendingOrders": "Pending Orders",
  "completedOrders": "Completed Orders",
  "shippedOrders": "Shipped Orders",
  "recentOrders": "Recent Transactions",
  "id": "ID",
  "customer": "Customer",
  "date": "Date",
  "total": "Total",
  "status": "Status",
  "inventory": "Inventory Catalog",
  "addProd": "Add New Product",
  "prodName": "Product Name",
  "price": "Price (RWF)",
  "category": "Category",
  "stock": "Stock Count",
  "actions": "Actions",
  "edit": "Edit",
  "delete": "Delete",
  "save": "Save Changes",
  "cancel": "Cancel",
  "serviceCatalog": "Service Catalog",
  "addService": "Add New Service",
  "title": "Service Title",
  "desc": "Short Description",
  "orderManagement": "Order Management",
  "noOrders": "No orders found in the system.",
  "markShipped": "Mark Shipped",
  "markCompleted": "Mark Completed",
  "cancelOrder": "Cancel Order",
  "userDir": "User Directory",
  "role": "Role",
  "sysSettings": "System Configuration",
  "maintenance": "Maintenance Mode",
  "maintenanceDesc": "Take the store offline for updates",
  "enable": "Enable",
  "disable": "Disable",
  "notif": "Email Notifications",
  "notifDesc": "Send automated emails for orders",
  "currency": "Store Currency",
  "saveSettings": "Save Configuration"
};

const adminFr = {
  "adminPanel": "Panneau d'administration",
  "dashboard": "Tableau de bord",
  "products": "Produits au détail",
  "services": "Services techniques",
  "orders": "Commandes clients",
  "users": "Utilisateurs du système",
  "settings": "Paramètres globaux",
  "logout": "Quitter le système",
  "stats": "Métriques du système",
  "totalSales": "Volume total des ventes",
  "pendingOrders": "Commandes en attente",
  "completedOrders": "Commandes terminées",
  "shippedOrders": "Commandes expédiées",
  "recentOrders": "Transactions récentes",
  "id": "ID",
  "customer": "Client",
  "date": "Date",
  "total": "Total",
  "status": "Statut",
  "inventory": "Catalogue d'inventaire",
  "addProd": "Ajouter un produit",
  "prodName": "Nom du produit",
  "price": "Prix (RWF)",
  "category": "Catégorie",
  "stock": "En stock",
  "actions": "Actions",
  "edit": "Modifier",
  "delete": "Supprimer",
  "save": "Enregistrer",
  "cancel": "Annuler",
  "serviceCatalog": "Catalogue de services",
  "addService": "Ajouter un service",
  "title": "Titre du service",
  "desc": "Courte description",
  "orderManagement": "Gestion des commandes",
  "noOrders": "Aucune commande trouvée.",
  "markShipped": "Marquer Expédié",
  "markCompleted": "Marquer Terminé",
  "cancelOrder": "Annuler",
  "userDir": "Répertoire des utilisateurs",
  "role": "Rôle",
  "sysSettings": "Configuration du système",
  "maintenance": "Mode maintenance",
  "maintenanceDesc": "Mettre la boutique hors ligne",
  "enable": "Activer",
  "disable": "Désactiver",
  "notif": "Notifications par e-mail",
  "notifDesc": "Envoyer des e-mails automatisés",
  "currency": "Devise",
  "saveSettings": "Enregistrer la config"
};

const adminRw = {
  "adminPanel": "Ikibaho cy'Ubuyobozi",
  "dashboard": "Incamake",
  "products": "Ibicuruzwa",
  "services": "Serivisi zacu",
  "orders": "Komande",
  "users": "Abakoresha",
  "settings": "Igenamiterere",
  "logout": "Sohoka",
  "stats": "Imibare y'Ikigo",
  "totalSales": "Igiteranyo cy'Ibyaguzwe",
  "pendingOrders": "Komande zitegereje",
  "completedOrders": "Komande zarangiye",
  "shippedOrders": "Komande zoherejwe",
  "recentOrders": "Ibyaguzwe Vuba",
  "id": "ID",
  "customer": "Umukiriya",
  "date": "Itariki",
  "total": "Igiteranyo",
  "status": "Imiterere",
  "inventory": "Ububiko",
  "addProd": "Ongera Igicuruzwa",
  "prodName": "Izina ry'Igicuruzwa",
  "price": "Igiciro (RWF)",
  "category": "Icyiciro",
  "stock": "Ibisigaye",
  "actions": "Igikorwa",
  "edit": "Hindura",
  "delete": "Siba",
  "save": "Bika",
  "cancel": "Reka",
  "serviceCatalog": "Urutonde rwa Serivisi",
  "addService": "Ongera Serivisi",
  "title": "Izina rya Serivisi",
  "desc": "Incamake",
  "orderManagement": "Gucunga Komande",
  "noOrders": "Nta komande zabonetse.",
  "markShipped": "Emeza ko Zoherejwe",
  "markCompleted": "Emeza ko Zarangiye",
  "cancelOrder": "Hagarika Komande",
  "userDir": "Urutonde rw'Abakoresha",
  "role": "Uruhare",
  "sysSettings": "Igenamiterere rusange",
  "maintenance": "Gufunga by'igihe gito",
  "maintenanceDesc": "Funga urubuga kugira ngo urukore",
  "enable": "Fungura",
  "disable": "Funga",
  "notif": "Ubutumwa bwa Imeli",
  "notifDesc": "Ohereza imeli iyo haguze umuntu",
  "currency": "Ifaranga ry'Iduka",
  "saveSettings": "Bika Igenamiterere"
};

en.admin = adminEn;
fr.admin = adminFr;
rw.admin = adminRw;

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(frPath, JSON.stringify(fr, null, 2));
fs.writeFileSync(rwPath, JSON.stringify(rw, null, 2));

// Update AdminDashboardView.tsx
let adminTsx = fs.readFileSync("src/components/AdminDashboardView.tsx", "utf8");

if (!adminTsx.includes('useLanguage')) {
  adminTsx = adminTsx.replace("import React, { useState } from 'react';", "import React, { useState } from 'react';\nimport { useLanguage } from '../i18n/LanguageContext';");
  adminTsx = adminTsx.replace(/export default function AdminDashboardView\(\{[\s\S]*?\}\: AdminDashboardViewProps\) \{([\s\S]*?)const \[activeSubTab/, "export default function AdminDashboardView({\n  products,\n  services,\n  orders,\n  onAddProduct,\n  onUpdateProduct,\n  onDeleteProduct,\n  onAddService,\n  onUpdateService,\n  onDeleteService,\n  onUpdateOrderStatus,\n  setView\n}: AdminDashboardViewProps) {\n  const { t } = useLanguage();\n  const [activeSubTab");
}

adminTsx = adminTsx.replace(/>Admin Panel</g, ">{t('admin.adminPanel')}<");
adminTsx = adminTsx.replace(/>Dashboard Overview</g, ">{t('admin.dashboard')}<");
adminTsx = adminTsx.replace(/>Retail Products</g, ">{t('admin.products')}<");
adminTsx = adminTsx.replace(/>Technical Services</g, ">{t('admin.services')}<");
adminTsx = adminTsx.replace(/>Client Orders</g, ">{t('admin.orders')}<");
adminTsx = adminTsx.replace(/>System Users</g, ">{t('admin.users')}<");
adminTsx = adminTsx.replace(/>Global Settings</g, ">{t('admin.settings')}<");
adminTsx = adminTsx.replace(/>Exit System</g, ">{t('admin.logout')}<");

adminTsx = adminTsx.replace(/>System Metrics</g, ">{t('admin.stats')}<");
adminTsx = adminTsx.replace(/>Total Sales Volume</g, ">{t('admin.totalSales')}<");
adminTsx = adminTsx.replace(/>Pending Orders</g, ">{t('admin.pendingOrders')}<");
adminTsx = adminTsx.replace(/>Completed Orders</g, ">{t('admin.completedOrders')}<");
adminTsx = adminTsx.replace(/>Shipped Orders</g, ">{t('admin.shippedOrders')}<");
adminTsx = adminTsx.replace(/>Recent Transactions</g, ">{t('admin.recentOrders')}<");

// tables
adminTsx = adminTsx.replace(/>Order ID</g, ">{t('admin.id')}<");
adminTsx = adminTsx.replace(/>Customer</g, ">{t('admin.customer')}<");
adminTsx = adminTsx.replace(/>Date</g, ">{t('admin.date')}<");
adminTsx = adminTsx.replace(/>Total</g, ">{t('admin.total')}<");
adminTsx = adminTsx.replace(/>Status</g, ">{t('admin.status')}<");

adminTsx = adminTsx.replace(/>Inventory Catalog</g, ">{t('admin.inventory')}<");
adminTsx = adminTsx.replace(/>Add New Product</g, ">{t('admin.addProd')}<");
adminTsx = adminTsx.replace(/>Product Name</g, ">{t('admin.prodName')}<");
adminTsx = adminTsx.replace(/>Price \(RWF\)</g, ">{t('admin.price')}<");
adminTsx = adminTsx.replace(/>Category</g, ">{t('admin.category')}<");
adminTsx = adminTsx.replace(/>Stock Count</g, ">{t('admin.stock')}<");
adminTsx = adminTsx.replace(/>Actions</g, ">{t('admin.actions')}<");

adminTsx = adminTsx.replace(/>Service Catalog</g, ">{t('admin.serviceCatalog')}<");
adminTsx = adminTsx.replace(/>Add New Service</g, ">{t('admin.addService')}<");
adminTsx = adminTsx.replace(/>Service Title</g, ">{t('admin.title')}<");
adminTsx = adminTsx.replace(/>Short Description</g, ">{t('admin.desc')}<");

adminTsx = adminTsx.replace(/>Order Management</g, ">{t('admin.orderManagement')}<");
adminTsx = adminTsx.replace(/>No orders found in the system\.</g, ">{t('admin.noOrders')}<");
adminTsx = adminTsx.replace(/>Mark Shipped</g, ">{t('admin.markShipped')}<");
adminTsx = adminTsx.replace(/>Mark Completed</g, ">{t('admin.markCompleted')}<");
adminTsx = adminTsx.replace(/>Cancel Order</g, ">{t('admin.cancelOrder')}<");

adminTsx = adminTsx.replace(/>User Directory</g, ">{t('admin.userDir')}<");
adminTsx = adminTsx.replace(/>Role</g, ">{t('admin.role')}<");

adminTsx = adminTsx.replace(/>System Configuration</g, ">{t('admin.sysSettings')}<");
adminTsx = adminTsx.replace(/>Maintenance Mode</g, ">{t('admin.maintenance')}<");
adminTsx = adminTsx.replace(/>Take the store offline for updates</g, ">{t('admin.maintenanceDesc')}<");
adminTsx = adminTsx.replace(/>Email Notifications</g, ">{t('admin.notif')}<");
adminTsx = adminTsx.replace(/>Send automated emails for orders</g, ">{t('admin.notifDesc')}<");
adminTsx = adminTsx.replace(/>Store Currency</g, ">{t('admin.currency')}<");
adminTsx = adminTsx.replace(/>Save Configuration</g, ">{t('admin.saveSettings')}<");

fs.writeFileSync("src/components/AdminDashboardView.tsx", adminTsx);
console.log("Updated AdminDashboardView");
