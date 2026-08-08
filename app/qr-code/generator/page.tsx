
import { redirect } from 'next/navigation';

export default function QrCodePage() {
  redirect('/qr-code/generate');
  return null;
}
