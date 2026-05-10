import { Metadata } from 'next';
import Base64Tool from '../components/Base64Tool';

export const metadata: Metadata = {
  title: 'Base64 Encoder & Decoder | Plzwork Tools',
  description: 'Instantly encode text or files to Base64, or decode Base64 back to raw text directly in your browser. 100% private and secure.',
};

export default function Base64EncoderDecoderPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#0f171d] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Base64Tool />
      </div>
    </main>
  );
}
