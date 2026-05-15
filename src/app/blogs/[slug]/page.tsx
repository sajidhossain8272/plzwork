import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/data/blogs';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

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
    <div className="min-h-screen bg-[#f7f7f4] pt-32 pb-24 text-[#0d161c]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/blogs"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#5a6872] hover:text-[#0d161c] transition-colors"
        >
          <FaArrowLeft /> Back to all posts
        </Link>

        <article className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5 sm:p-12">
          <header className="mb-10 text-center">
            <time dateTime={post.date} className="text-sm text-gray-500">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {post.keywords.slice(0, 3).map((keyword) => (
                <span
                  key={keyword}
                  className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </header>

          <div
            className="prose prose-lg prose-gray mx-auto max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
}
