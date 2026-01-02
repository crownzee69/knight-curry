'use client';

import { useEffect, useState } from 'react';
import { X, ExternalLink, Sparkles } from 'lucide-react';

interface OrderRedirectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function OrderRedirectModal({ isOpen, onClose, onConfirm }: OrderRedirectModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Trigger animation after a brief delay
      setTimeout(() => setIsAnimating(true), 10);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
      // Allow scrolling again after animation completes
      setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = 'unset';
      }, 300);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-opacity duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      {/* Backdrop with blur */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-md sm:max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 ${
          isAnimating
            ? 'scale-100 translate-y-0 opacity-100'
            : 'scale-95 translate-y-4 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-red-500 to-orange-500 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_70%)] animate-pulse" />
        </div>

        {/* Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-neutral-600 hover:text-primary transition-all duration-300 shadow-lg hover:scale-110 active:scale-95 pointer-events-auto cursor-pointer"
          aria-label="Close modal"
          type="button"
        >
          <X className="w-5 h-5 pointer-events-none" />
        </button>

        {/* Content */}
        <div className="relative z-10 p-6 sm:p-8">
          {/* Icon Container with Animation */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Pulsing outer ring */}
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
              {/* Rotating ring */}
              <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-spin-slow" />
              {/* Main icon container */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary to-red-600 rounded-full flex items-center justify-center shadow-xl">
                <ExternalLink className="w-10 h-10 sm:w-12 sm:h-12 text-white animate-bounce-subtle" />
              </div>
              {/* Sparkle decorations */}
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-primary animate-spin-slow" />
              <Sparkles className="absolute -bottom-2 -left-2 w-5 h-5 text-orange-500 animate-spin-slow-reverse" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-display font-black text-neutral-900 text-center mb-4 animate-fade-in-up">
            Redirecting to Order Site
          </h2>

          {/* Message */}
          <p className="text-base sm:text-lg text-neutral-700 text-center mb-6 sm:mb-8 leading-relaxed animate-fade-in-up-delay">
            We&apos;re taking you to another website to complete your order. 
            <br className="hidden sm:block" />
            <span className="font-semibold text-primary">Get ready for something delicious!</span>
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 sm:py-3.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold rounded-xl transition-all duration-300 active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-3 sm:py-3.5 bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Continue to Order</span>
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

