import { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '@/data/blogs';
import { FaArrowRight, FaCalendarAlt, FaUserEdit } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Plzwork Blog - Insights on Web Development & Productivity',
  description: 'Read the latest articles on web development, image optimization, file conversion, productivity, and the technologies powering Plzwork tools.',
  keywords: ['web development blog', 'tech blog', 'image optimization', 'file conversion tips', 'productivity tools', 'plzwork blog'],
};

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f4] pt-32 pb-24 text-[#0d161c]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl mb-6">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4da72a] to-[#2e6619]">Plzwork</span> Blog
          </h1>
          <p className="text-xl text-[#5a6872] leading-relaxed">
            Deep dives, technical insights, and updates on building secure, client-side tools that actually work.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col justify-between bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
            >
              <div>
                {/* Meta Info */}
                <div className="flex items-center gap-x-4 text-xs mb-4 text-gray-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <FaCalendarAlt className="text-gray-400" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaUserEdit className="text-gray-400" />
                    <span>{post.author}</span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-bold leading-tight text-gray-900 mb-4 group-hover:text-[#4da72a] transition-colors">
                  <Link href={`/blogs/${post.slug}`}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h3>
                <p className="line-clamp-4 text-base leading-relaxed text-gray-600 mb-6">
                  {post.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.keywords.slice(0, 2).map(tag => (
                    <span key={tag} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-50 text-gray-600 border border-gray-200 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Read More Link */}
              <div className="pt-6 border-t border-gray-100 mt-auto">
                <div className="inline-flex items-center text-sm font-bold text-[#0e171d] group-hover:text-[#4da72a] transition-colors">
                  Read Full Article <FaArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
