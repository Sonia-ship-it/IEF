"use client";

import ServicesView from '../../components/ServicesView';
import { useAppContext } from '../../context/AppContext';

export default function ServicesPage() {
  const { services } = useAppContext();

  const handleRequestService = (request: {
    serviceTitle: string;
    customerName: string;
    customerEmail: string;
    phone: string;
    message: string;
  }) => {
    // In a real app this would send to an API
    alert(`Service request for "${request.serviceTitle}" submitted successfully! We will contact you at ${request.customerEmail}.`);
  };

  return (
    <ServicesView
      services={services}
      onRequestService={handleRequestService}
    />
  );
}
