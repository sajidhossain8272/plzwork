import { Metadata } from 'next';
import PasswordGeneratorTool from '../components/PasswordGeneratorTool';

export const metadata: Metadata = {
  title: 'Password Generator | Plzwork Tools',
  description: 'Generate cryptographically secure random passwords. Fully customizable length and character sets. Private and secure.',
};

export default function PasswordGeneratorPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#0f171d] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PasswordGeneratorTool />
      </div>
    </main>
  );
}
