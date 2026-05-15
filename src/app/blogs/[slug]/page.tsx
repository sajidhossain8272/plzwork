import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/data/blogs';
import Link from 'next/link';
import { FaArrowLeft, FaCalendarAlt, FaUserEdit } from 'react-icons/fa';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Plzwork Blog`,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f7f7f4] text-[#0d161c]">

      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200 pt-32 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 mb-8 text-sm font-semibold text-[#4da72a] hover:text-[#2e6619] transition-colors bg-green-50 px-4 py-2 rounded-full"
          >
            <FaArrowLeft /> Back to all posts
          </Link>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 font-medium">
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
              <FaCalendarAlt className="text-gray-400" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
              <FaUserEdit className="text-gray-400" />
              <span>{post.author}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <article className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-sm border border-gray-100">
          <div
            className="prose prose-lg sm:prose-xl prose-gray mx-auto max-w-none
                       prose-headings:font-bold prose-headings:text-gray-900
                       prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-100
                       prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                       prose-p:leading-relaxed prose-p:text-gray-700
                       prose-a:text-[#4da72a] hover:prose-a:text-[#2e6619] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                       prose-li:text-gray-700
                       prose-strong:text-gray-900 prose-strong:font-bold"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags Footer */}
          <div className="mt-16 pt-8 border-t border-gray-100">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {post.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="inline-block bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200"
                >
                  #{keyword}
                </span>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
