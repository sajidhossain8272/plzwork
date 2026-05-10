import { Metadata } from 'next';
import UrlEncoderTool from '../components/UrlEncoderTool';

export const metadata: Metadata = {
  title: 'URL Encoder & Decoder | Plzwork Tools',
  description: 'Instantly encode or decode URLs and parameters using RFC 3986 standards. 100% private and client-side.',
};

export default function UrlEncoderDecoderPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#0f171d] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <UrlEncoderTool />
      </div>
    </main>
  );
}
