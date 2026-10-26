import type { Metadata } from 'next';
import React from 'react';

// Keywords: late-night Indian food near UCF, late night food UCF,
// food open late near UCF, Indian food after midnight Orlando
export const metadata: Metadata = {
  title: 'Late-Night Indian Food Near UCF in Orlando',
  description:
    'Late night food near UCF — halal Indian platters, biryani & curries at Knights Curry Express. Food open late near UCF on University Blvd. Takeout & delivery available.',
  alternates: {
    canonical: 'https://www.knightscurryexpress.com/late-night-specials',
  },
  openGraph: {
    title: 'Late-Night Indian Food Near UCF in Orlando',
    description:
      'Halal platters, biryani & curries — food open late near UCF. Knights Curry Express on University Blvd.',
    url: 'https://www.knightscurryexpress.com/late-night-specials',
    siteName: 'Knights Curry Express',
    type: 'website',
  },
};

export default function LateNightLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
