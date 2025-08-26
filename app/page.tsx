import Link from 'next/link';
import { reader } from './reader';
import './styles.css';

export default async function Homepage() {
  const posts = await reader.collections.posts.all();
  const landingPage = await reader.singletons.landing.read();

  if (!landingPage) {
    return <div>Landing page not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          {landingPage.title}
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {landingPage.subtitle}
        </p>
        {landingPage.heroImage && (
          <div className="mb-8">
            <img
              src={landingPage.heroImage}
              alt="Hero"
              className="rounded-lg shadow-lg mx-auto max-w-full h-auto"
              style={{ maxWidth: '600px', height: 'auto' }}
            />
          </div>
        )}
        <Link
          href={landingPage.ctaLink}
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          {landingPage.ctaText}
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {landingPage.features?.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Latest Posts
          </h2>
          <div className="grid gap-6">
            {posts.map(post => (
              <article
                key={post.slug}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <Link href={`/${post.slug}`} className="block">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600">
                    {post.entry.title}
                  </h3>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Admin Link */}
      <div className="text-center py-8 bg-gray-100">
        <Link
          href="/keystatic"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          📝 Manage Content in Admin UI
        </Link>
      </div>
    </div>
  );
}
