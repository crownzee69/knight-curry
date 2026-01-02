'use client';

import { useState } from 'react';
import OrderRedirectModal from './OrderRedirectModal';

interface OrderNowButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function OrderNowButton({ className, children }: OrderNowButtonProps) {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const ORDER_URL = 'https://online.skytab.com/dfea7884072bca160af82d415c72f7bf';

  const handleOrderClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowOrderModal(true);
  };

  const handleOrderConfirm = () => {
    setShowOrderModal(false);
    window.location.href = ORDER_URL;
  };

  return (
    <>
      <button
        onClick={handleOrderClick}
        className={className}
      >
        {children || 'Order Now'}
      </button>

      <OrderRedirectModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        onConfirm={handleOrderConfirm}
      />
    </>
  );
}

