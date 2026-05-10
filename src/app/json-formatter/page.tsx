import { Metadata } from 'next';
import JsonFormatterTool from '../components/JsonFormatterTool';

export const metadata: Metadata = {
  title: 'JSON Formatter & Validator | Plzwork Tools',
  description: 'Instantly format, validate, and minify JSON. High-performance, private, and entirely client-side.',
};

export default function JsonFormatterPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#0f171d] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <JsonFormatterTool />
      </div>
    </main>
  );
}
