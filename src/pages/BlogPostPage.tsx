import { useParams, Link, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { getPostBySlug } from '../posts'

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) return <Navigate to="/blog" replace />

  return (
    <div className="blog-post-page">
      <div className="blog-post-hero">
        <div className="container">
          <Link to="/blog" className="blog-back-link">
            ← Volver al Blog
          </Link>
          <h1 className="blog-post-title">{post.title}</h1>
          <div className="blog-post-meta">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="blog-post-author">Por {post.author}</span>
          </div>
          <div className="blog-post-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="blog-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <article className="blog-post-content">
        <div className="container">
          <div className="blog-post-body">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </article>

      <div className="blog-post-footer">
        <div className="container">
          <Link to="/blog" className="btn btn-secondary">
            ← Volver al Blog
          </Link>
        </div>
      </div>
    </div>
  )
}
