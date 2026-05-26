import { Link } from 'react-router-dom'
import posts from '../posts'

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogListPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="blog-list-page">
      <div className="blog-hero">
        <div className="container">
          <h1>Blog</h1>
          <p>Artículos de opinión y análisis jurídico del equipo de GHT Estudio Legal.</p>
        </div>
      </div>

      <section className="blog-list-section">
        <div className="container">
          {sorted.length === 0 ? (
            <p className="blog-empty">Próximamente publicaremos nuestros primeros artículos.</p>
          ) : (
            <div className="blog-grid">
              {sorted.map((post) => (
                <article key={post.slug} className="blog-card">
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span className="blog-card-author">{post.author}</span>
                    </div>
                    <h2 className="blog-card-title">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <div className="blog-card-tags">
                      {post.tags.map((tag) => (
                        <span key={tag} className="blog-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link to={`/blog/${post.slug}`} className="btn btn-secondary blog-card-cta">
                      Leer artículo
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
