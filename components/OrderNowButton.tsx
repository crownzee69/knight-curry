'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

const OrderRedirectModal = dynamic(() => import('./OrderRedirectModal'), {
  ssr: false,
});

interface OrderNowButtonProps {
  className?: string;
  children?: React.ReactNode;
}

const ORDER_URL = 'https://online.skytab.com/dfea7884072bca160af82d415c72f7bf';

export default function OrderNowButton({ className, children }: OrderNowButtonProps) {
  const [showOrderModal, setShowOrderModal] = useState(false);

  const handleOrderClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setShowOrderModal(true);
  }, []);

  const handleClose = useCallback(() => setShowOrderModal(false), []);

  const handleOrderConfirm = useCallback(() => {
    setShowOrderModal(false);
    window.location.href = ORDER_URL;
  }, []);

  return (
    <>
      <button onClick={handleOrderClick} className={className}>
        {children || 'Order Now'}
      </button>

      {showOrderModal && (
        <OrderRedirectModal
          isOpen={showOrderModal}
          onClose={handleClose}
          onConfirm={handleOrderConfirm}
        />
      )}
    </>
  );
}
