
// app/qr-code/page.tsx

import { redirect } from 'next/navigation';

/**
 * QrCodePage component is responsible for redirecting the user
 * to the '/qr-code/generate' route. This is typically used when
 * you want to direct users to a specific page when they visit
 * this route.
 *
 * @returns {null} This component does not render anything.
 */
export default function QrCodePage() {
  redirect('/qr-code/generate');
  return null;
}
