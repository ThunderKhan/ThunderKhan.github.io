import { StudioSpark } from './StudioSpark'
import { ArrowUpRight } from 'lucide-react'
import { links, site } from '../data/portfolio'

export function Footer() {
  return (
    <footer className="studio-footer">
      <div className="studio-container footer-top">
        <a className="studio-brand" href="/">
          <StudioSpark className="brand-spark" />
          {site.name}.
        </a>
        <p>
          Made with curiosity.
          <br />
          Built with care.
        </p>
        <div className="footer-links">
          <a href={links.github} target="_blank" rel="noopener noreferrer">
            GitHub <ArrowUpRight size={14} />
          </a>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn <ArrowUpRight size={14} />
          </a>
          <a href={site.resume}>
            Résumé <ArrowUpRight size={14} />
          </a>
          <a href="/blog">
            Writing <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <div className="footer-wordmark" aria-hidden="true">
        Ayan Khan
        <span>
          <StudioSpark className="footer-spark" />
        </span>
      </div>
      <div className="studio-container footer-bottom">
        <span>© {new Date().getFullYear()} Ayan Khan</span>
        <span>From India, building for the web.</span>
        <a href="/#hero">Back to the top ↑</a>
      </div>
    </footer>
  )
}
