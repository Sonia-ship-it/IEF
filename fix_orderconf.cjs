const fs = require("fs");

// Read the file and fix by rebuilding the header
let content = fs.readFileSync("src/components/OrderConfirmationView.tsx", "utf8");

// Normalize line endings
content = content.replace(/\r\n/g, "\n");

// Remove everything from start up to and including the broken part, then reconstruct
const cleanHeader = `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  CheckCircle, 
  MapPin, 
  Calendar, 
  ShoppingCart, 
  Truck, 
  FileSpreadsheet
} from 'lucide-react';
import { Order } from '../types';
import { formatCurrency } from '../utils/currency';

interface OrderConfirmationViewProps {
  order: Order | null;
  setView: (view: string) => void;
}

export default function OrderConfirmationView({
  order,
  setView
}: OrderConfirmationViewProps) {
  const { t } = useLanguage();
  if (!order) {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center font-sans text-zinc-800 bg-white">
        <CheckCircle className="h-16 w-16 text-zinc-300 mx-auto" />
        <h1 className="mt-6 text-xl font-black tracking-tight text-zinc-900">{t('orderConf.noOrder')}</h1>
        <button onClick={() => setView('home')} className="mt-6 btn-primary">
          {t('orderConf.returnHome')}
        </button>
      </div>
    );
  }
`;

// Extract everything after "const getDeliveryRange" which is the clean part
const idx = content.indexOf("  const getDeliveryRange");
if (idx === -1) {
  console.error("Could not find getDeliveryRange marker");
  process.exit(1);
}
const tail = content.slice(idx);

const fixed = cleanHeader + "\n" + tail;
fs.writeFileSync("src/components/OrderConfirmationView.tsx", fixed);
console.log("Fixed OrderConfirmationView");
