

import { redirect } from 'next/navigation';


export default function QrCodePage() {
  redirect('/qr-code/reader');
  return null;
}
