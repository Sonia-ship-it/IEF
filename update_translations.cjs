const fs = require('fs');

// Read English file
const en = JSON.parse(fs.readFileSync('src/i18n/locales/en.json', 'utf8'));
const fr = JSON.parse(fs.readFileSync('src/i18n/locales/fr.json', 'utf8'));
const rw = JSON.parse(fs.readFileSync('src/i18n/locales/rw.json', 'utf8'));

// French product translations
fr.products = {
  "elec-1": {
    "name": "Caméra de sécurité Wifi PTZ intelligente Hikvision",
    "desc": "Caméra de surveillance panoramique haute définition avec rotation à 360° et connexion Wifi pour une sécurité intelligente de votre domicile ou entreprise."
  },
  "elec-2": {
    "name": "Caméra CCTV Dôme Pro Dahua",
    "desc": "Caméra dôme professionnelle avec vision nocturne infrarouge et enregistrement haute résolution pour une surveillance optimale."
  },
  "elec-3": {
    "name": "Casque Audio Sans Fil Pro Studio Audio-Technica",
    "desc": "Casque professionnel sans fil avec son haute fidélité, idéal pour le studio et l'écoute audiophile quotidienne."
  },
  "elec-4": {
    "name": "Radio Portable Vintage FM/AM",
    "desc": "Radio portable au design rétro avec réception FM/AM claire et finition élégante pour les amateurs de style vintage."
  },
  "elec-5": {
    "name": "Montre Minimaliste Quartz à Bracelet Maille Noir",
    "desc": "Montre élégante au design épuré avec bracelet en maille métallique noire et mouvement quartz précis."
  },
  "clot-1": {
    "name": "T-Shirt Oversize en Coton Biologique",
    "desc": "T-shirt confortable en coton biologique certifié avec coupe décontractée oversize pour un style urbain relaxé."
  },
  "clot-2": {
    "name": "Chemise Classique en Lin à Boutons",
    "desc": "Chemise raffinée en lin naturel avec boutonnière complète, parfaite pour les occasions formelles et décontractées."
  },
  "clot-3": {
    "name": "Pantalon Chino Slim Fit Extensible",
    "desc": "Pantalon chino ajusté avec tissu stretch pour un confort optimal et une silhouette moderne élégante."
  },
  "clot-4": {
    "name": "Survêtement Urbain Tech Fleece",
    "desc": "Ensemble de survêtement en molleton technique respirant, conçu pour le style urbain et le confort sportif."
  },
  "clot-5": {
    "name": "Débardeur Décontracté en Maille Côtelée",
    "desc": "Débardeur léger en tricot côtelé, idéal pour les journées chaudes et le style décontracté estival."
  },
  "clot-6": {
    "name": "Ensemble Coordonné Élégant pour Week-end",
    "desc": "Tenue complète coordonnée parfaite pour le week-end, alliant confort et style contemporain."
  },
  "clot-7": {
    "name": "Maillot de Football Rétro pour Fan",
    "desc": "Maillot de football au design rétro classique, idéal pour les supporters et les collectionneurs passionnés."
  },
  "jewel-1": {
    "name": "Chaîne Minimaliste Plaquée Or 18K",
    "desc": "Collier élégant au design minimaliste avec finition plaquée or 18 carats pour un look raffiné et intemporel."
  },
  "foot-1": {
    "name": "Bottines Chelsea en Cuir Artisanal",
    "desc": "Bottines Chelsea fabriquées à la main en cuir véritable de qualité supérieure pour un style classique et durable."
  },
  "foot-2": {
    "name": "Chaussures de Course à Coussin Actif",
    "desc": "Chaussures de running avec système d'amorti avancé offrant confort et performance pour vos séances d'entraînement."
  }
};

// Kinyarwanda product translations
rw.products = {
  "elec-1": {
    "name": "Kamera ya Hikvision Smart PTZ Wifi yo Kurinda",
    "desc": "Kamera yo kurinda ihebuje ishobora guhinduruka 360° ifite Wifi yo kurinda inzu cyangwa ibiro byawe mu buryo bwihuta."
  },
  "elec-2": {
    "name": "Kamera ya CCTV Dahua Dome Pro",
    "desc": "Kamera y'umwuga yo kurinda ifite ubushobozi bwo kureba mu mijoro n'amafoto maremare yo gufata ibintu neza."
  },
  "elec-3": {
    "name": "Ekuteri za Audio-Technica Pro Studio Zidafite Insinga",
    "desc": "Ekuteri z'umwuga zidafite insinga zifite urusaku rw'ubwiza rwo kuruhira mu studio cyangwa mu buzima bwa buri munsi."
  },
  "elec-4": {
    "name": "Radiyo Nto ya Vintage FM/AM Itwara",
    "desc": "Radiyo nto yitwara ifite imyambarire ya kera ifite gutwara FM/AM neza kandi igezweho ku bakunda sitayle ya kera."
  },
  "elec-5": {
    "name": "Isaha ya Quartz Yoroshye y'Umukara ifite Umubiri wo mu Cyuma",
    "desc": "Isaha yiza ifite imyambarire yoroshye hamwe n'umubiri wo mu cyuma cy'umukara kandi ikora neza."
  },
  "clot-1": {
    "name": "T-Shirt Nini yo mu Ipamba ry'Umuzvvinyo",
    "desc": "T-shirt yoroshye yo mu ipamba ry'umwimerere ryemejwe hamwe n'imyambarire nini yo mu mujyi."
  },
  "clot-2": {
    "name": "Ishati ya Kabuhariwe yo mu Tiri ifite Utubuto",
    "desc": "Ishati yiza yo mu tiri ry'umwimerere ifite utubuto yose, nziza ku birori byose."
  },
  "clot-3": {
    "name": "Ikabuyi ya Chino Slim Fit Irashoboye Kwambukirwa",
    "desc": "Ikabuyi ya chino ifite imyenda irashoboye kwambukirwa kugira ngo uryohere kandi ugaragare neza."
  },
  "clot-4": {
    "name": "Survêtement yo mu Mujyi ya Tech Fleece",
    "desc": "Imyenda yo mu mujyi ikozwe mu bwoya bwa tekiniki burasa, byakozwe kugira ngo uzafashe sitayle no kuryoherwa mu mukino."
  },
  "clot-5": {
    "name": "Ikirezi cy'Umubiri Cyoroshye cy'Umurabyo Wacukuwe",
    "desc": "Ikirezi cyoroheje cy'umurabyo wacukuwe, kinini ku minsi yo mu mpeshyi no mu myambarire yoroheje."
  },
  "clot-6": {
    "name": "Imyenda Yuzuye Yizewe y'Ikiruhuko",
    "desc": "Imyenda yuzuye yizewe nziza ku kiruhuko, ihuza kuryoherwa na sitayle y'ubu."
  },
  "clot-7": {
    "name": "Jersey y'Umupira w'Amaguru ya Retro ku Mukunda",
    "desc": "Jersey y'umupira w'amaguru ifite sitayle ya kera, nziza ku bashyigikiye n'abakunda gukusanya."
  },
  "jewel-1": {
    "name": "Umukufu Woroshye wa Zahabu 18K",
    "desc": "Umukufu mwiza ufite sitayle yoroshye hamwe n'umwiza wa zahabu 18K kugira ngo ugaragare neza kandi uhoraho."
  },
  "foot-1": {
    "name": "Inkweto za Chelsea zo mu Ruhu rwakozwe n'Umunyamabanga",
    "desc": "Inkweto za Chelsea zakozwe n'amaboko mu ruhu rwemewe kandi zihoraho kugira ngo uzagaragare neza."
  },
  "foot-2": {
    "name": "Inkweto zo Kwiruka zifite Ikirimiro cy'Ikintu",
    "desc": "Inkweto zo kwiruka zifite sisitemu yo gukingira byoroshye zitagufasha kuryoherwa no gukiranira neza."
  }
};

// Write back the updated files
fs.writeFileSync('src/i18n/locales/fr.json', JSON.stringify(fr, null, 2), 'utf8');
fs.writeFileSync('src/i18n/locales/rw.json', JSON.stringify(rw, null, 2), 'utf8');

console.log('✓ Updated French and Kinyarwanda product translations');
