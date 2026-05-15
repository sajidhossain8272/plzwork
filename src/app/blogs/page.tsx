import { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '@/data/blogs';
import { FaArrowRight } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Plzwork Blog - Insights on Web Development & Productivity',
  description: 'Read the latest articles on web development, image optimization, file conversion, productivity, and the technologies powering Plzwork tools.',
  keywords: ['web development blog', 'tech blog', 'image optimization', 'file conversion tips', 'productivity tools', 'plzwork blog'],
};

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f4] pt-32 pb-24 text-[#0d161c]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Plzwork Blog</h1>
          <p className="mt-4 text-lg text-[#5a6872]">
            Insights, tutorials, and updates on building tools that actually work.
          </p>
        </div>

        <div className="space-y-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="group relative flex flex-col items-start justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition-all hover:shadow-md sm:p-8"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.date} className="text-gray-500">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-xl font-semibold leading-6 text-gray-900 group-hover:text-[#4da72a]">
                  <Link href={`/blogs/${post.slug}`}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                  {post.description}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-[#0e171d]">
                Read article <FaArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
