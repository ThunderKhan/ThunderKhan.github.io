import { ArrowUpRight } from 'lucide-react'
import { blogPosts } from '../data/blog-posts'
import { education, links, site } from '../data/portfolio'
import { featuredWork, moreWork } from '../data/selected-work'

export function PortfolioHome() {
  const degree = education[0]
  return (
    <div className="folio-page">
      <header className="folio-intro" id="hero">
        <h1>Hello, I’m Ayan Khan.<br /><span>I build software for the web<br className="wide-break" /> and <em>tools for developers.</em></span></h1>
        <div className="intro-actions">
          <a className="ink-button" href={`mailto:${links.email}`}>Get in touch <ArrowUpRight size={15} /></a>
          <a className="paper-link" href={site.resume} download>Download résumé</a>
        </div>
      </header>

      <section id="projects" aria-labelledby="projects-title">
        <div className="section-heading"><h2 id="projects-title">Selected work</h2><a href={links.github}>All repositories ↗︎</a></div>
        <div className="work-grid">
          {featuredWork.map((work) => (
            <article key={work.name}>
              <a href={work.href} className="work-cover" aria-label={`${work.linkLabel} for ${work.name}`}>
                <img src={work.image} width="760" height="428" alt="" />
              </a>
              <p className="project-field">{work.field}</p>
              <h3>{work.name}</h3>
              <p className="work-summary">{work.summary}</p>
              <div className="work-links"><a href={work.href}>{work.linkLabel} ↗︎</a><a href={work.source} aria-label={`Source code for ${work.name}`}>Code</a></div>
            </article>
          ))}
        </div>
        <h3 className="list-heading">More projects</h3>
        {moreWork.map((work) => (
          <a key={work.name} className="index-row" href={work.href}><strong>{work.name}</strong><span>{work.summary}</span><ArrowUpRight size={16} /></a>
        ))}
      </section>

      <section id="experience" aria-labelledby="experience-title">
        <h2 id="experience-title">Experience</h2>
        <div className="job-heading"><h3>VSPH Global</h3><span>2026</span></div>
        <p className="job-role">Front-End Developer Intern</p>
        <p className="folio-copy">Built employee onboarding and project workflows for the internal operations platform. My work covered invitation-based account setup, role-based access, and the screens managers use to track tasks and milestones.</p>
        <a className="paper-link" href="https://github.com/vsph-global/app-vsph-frontend/pull/10">View project workflows ↗︎</a>
      </section>

      <section id="open-source" aria-labelledby="contribution-title">
        <h2 id="contribution-title">Open source</h2>
        <a className="index-row" href="https://github.com/runtimeconditions/python-rc-profiler/pull/9"><strong>Runtime Conditions</strong><span>Fixed encoding and path assumptions behind 18 failing Windows tests.</span><ArrowUpRight size={16} /></a>
        <a className="index-row" href="https://github.com/CLIUtils/CLI11/pull/1431"><strong>CLI11</strong><span>Preserved floating-point precision when converting default values.</span><ArrowUpRight size={16} /></a>
      </section>

      <section id="writing" aria-labelledby="writing-title">
        <div className="section-heading"><h2 id="writing-title">Writing</h2><a href="/blog">All writing ↗︎</a></div>
        {blogPosts.slice(0, 3).map((post) => (
          <a className="writing-row" href={`/blog/${post.slug}`} key={post.slug}><strong>{post.title}</strong><span>{post.readingTime} ↗︎</span></a>
        ))}
      </section>

      <section id="about" aria-labelledby="about-title">
        <h2 id="about-title">About me</h2>
        <p className="folio-copy" id="education">I’m a BCA student studying Machine Learning and Data Science at {degree.institution}, India. I expect to graduate in 2028. I’m especially interested in how we test software, explain model decisions, and build tools other developers can trust.</p>
        <p className="folio-copy" id="skills">I work mainly with C++, Python, and TypeScript. For web projects I use React, Next.js, and PostgreSQL.</p>
        <p className="folio-copy">My coursework includes supervised machine learning through DeepLearning.AI and Stanford Online, and remote sensing through NASA ARSET.</p>
      </section>
    </div>
  )
}
