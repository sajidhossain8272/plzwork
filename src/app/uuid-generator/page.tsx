import { Metadata } from 'next';
import UuidGeneratorTool from '../components/UuidGeneratorTool';

export const metadata: Metadata = {
  title: 'UUID Generator | Plzwork Tools',
  description: 'Generate secure, random v4 UUIDs instantly in your browser. Batch generation supported. 100% private and secure.',
};

export default function UuidGeneratorPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#0f171d] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <UuidGeneratorTool />
      </div>
    </main>
  );
}
