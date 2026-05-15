export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  date: string;
  author: string;
  content: string; // Markdown or plain HTML string for now
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-optimize-images-for-web",
    title: "How to Optimize Images for the Web",
    description: "Learn how to optimize images for the web to improve page load speed, SEO, and user experience using modern formats like WebP.",
    keywords: ["image optimization", "webp", "seo", "page speed", "web development", "image compression"],
    date: "2024-05-15",
    author: "Plzwork Team",
    content: `
      <h2>The Importance of Image Optimization</h2>
      <p>Images often account for the largest percentage of downloaded bytes on a web page. Optimizing them can yield some of the largest byte savings and performance improvements.</p>

      <h3>1. Choose the Right Format</h3>
      <p>Modern formats like <strong>WebP</strong> and <strong>AVIF</strong> provide superior compression and quality characteristics compared to older formats like JPEG and PNG. Using WebP can reduce image size by 25-35% with no loss in quality.</p>

      <h3>2. Resize Images</h3>
      <p>Never serve an image that is larger than it needs to be. If your content area is 800px wide, don't serve a 4000px wide image and rely on CSS to scale it down.</p>

      <h3>3. Compress Your Images</h3>
      <p>Tools like our <a href="/quick-convert">Quick Convert</a> allow you to easily convert and compress your images directly in your browser without sacrificing privacy or quality.</p>

      <h2>Conclusion</h2>
      <p>By taking a few simple steps to optimize your images, you can drastically improve your website's performance, leading to better user engagement and higher search rankings.</p>
    `,
  },
  {
    slug: "secure-pdf-merging-client-side",
    title: "Secure PDF Merging: Why Client-Side Processing Matters",
    description: "Discover the security benefits of merging PDF files directly in your browser without uploading them to external servers.",
    keywords: ["pdf merge", "client-side processing", "privacy", "security", "pdf tools", "secure file manipulation"],
    date: "2024-05-10",
    author: "Plzwork Team",
    content: `
      <h2>The Privacy Problem with Online PDF Tools</h2>
      <p>When dealing with sensitive documents—like tax returns, legal contracts, or medical records—the last thing you want to do is upload them to a random server on the internet to merge them.</p>

      <h3>Enter Client-Side Processing</h3>
      <p>Modern web technologies allow us to build powerful tools that run <em>entirely in your browser</em>. This means your files never leave your device.</p>

      <h3>Benefits of Client-Side PDF Tools</h3>
      <ul>
        <li><strong>Privacy:</strong> No server uploads mean no one else can see your documents.</li>
        <li><strong>Security:</strong> Eliminates the risk of your files being intercepted during transit or stored on an insecure server.</li>
        <li><strong>Speed:</strong> Processing happens instantly on your device's hardware, without waiting for uploads or downloads.</li>
      </ul>

      <h2>Try It Yourself</h2>
      <p>Experience the speed and security of client-side processing with our <a href="/pdf-merge">Merge PDF</a> tool today.</p>
    `,
  }
];
