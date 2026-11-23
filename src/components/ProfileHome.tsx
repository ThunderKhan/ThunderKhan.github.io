import {
  ArrowDownToLine,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Code2,
  Command,
  FlaskConical,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Moon,
  Sun,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { blogPosts } from '../data/blog-posts'
import { education, links, site } from '../data/portfolio'
import { featuredWork, moreWork } from '../data/selected-work'
import { useActiveSection } from '../hooks/useActiveSection'
import { useTheme } from '../hooks/useTheme'
import {
  contributions,
  formatRange,
  GitHubActivityGraph,
  hasContributionData,
} from './GitHubActivityGraph'

const sections = [
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['open-source', 'Open source'],
  ['skills', 'Skills'],
  ['education', 'Education'],
  ['writing', 'Writing'],
] as const
const ids = sections.map(([id]) => id)
const clock = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
})

function LocalTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () => setTime(clock.format(new Date()))
    tick()
    const timer = window.setInterval(tick, 30000)
    return () => window.clearInterval(timer)
  }, [])
  return <span className="banner-clock">{time} IST</span>
}

function Panel({
  id,
  title,
  icon,
  children,
}: {
  id: string
  title: string
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className="profile-panel"
      aria-labelledby={id + '-heading'}
    >
      <h2 id={id + '-heading'}>
        {icon}
        {title}
      </h2>
      {children}
    </section>
  )
}

function SectionIndex() {
  const active = useActiveSection(ids)
  return (
    <nav className="profile-index" aria-label="Section index">
      <span>On this page</span>
      {sections.map(([id, label]) => (
        <a
          key={id}
          href={'#' + id}
          aria-current={active === id ? 'location' : undefined}
        >
          {label}
        </a>
      ))}
    </nav>
  )
}

export function ProfileHome({ openCommands }: { openCommands: () => void }) {
  const { theme, toggleTheme } = useTheme()
  return (
    <div className="profile-column">
      <SectionIndex />
      <header id="hero">
        <div className="profile-banner">
          <img
            src="/profile/horizon.webp"
            alt=""
            width="1280"
            height="350"
            fetchPriority="high"
          />
          <LocalTime />
        </div>
        <div className="profile-identity">
          <img
            src="/profile/ayan.webp"
            alt=""
            width="72"
            height="72"
            className="portrait"
          />
          <div>
            <h1>{site.name}</h1>
            <p>
              <MapPin size={13} /> Gorakhpur, India
            </p>
          </div>
          <div className="profile-controls">
            <button
              onClick={openCommands}
              aria-label="Open command palette"
              title="Search (Ctrl or Cmd + K)"
            >
              <Command size={17} />
            </button>
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
            </button>
          </div>
        </div>
        <div className="profile-bio" id="about">
          <p className="bio-lead">
            Software developer working on C++ tools, web applications, and
            applied machine learning.
          </p>
          <p>
            I study ML and data science at DDUGU. I’ve built operations software
            at VSPH Global and contributed fixes to open-source tools I use.
          </p>
          <div className="profile-links" id="contact">
            <a className="primary-link" href={'mailto:' + links.email}>
              <Mail /> Email me
            </a>
            <a href={site.resume} download>
              <ArrowDownToLine /> Résumé
            </a>
            <a href={links.github}>
              <Github /> GitHub
            </a>
            <a href={links.linkedin}>
              <Linkedin /> LinkedIn
            </a>
          </div>
        </div>
      </header>
      <Panel id="experience" title="Experience" icon={<BriefcaseBusiness />}>
        <div className="experience-line">
          <span className="company-mark" aria-hidden="true">
            V
          </span>
          <div>
            <h3>VSPH Global</h3>
            <p>Front-End Developer Intern</p>
          </div>
          <time dateTime="2026">2026</time>
        </div>
        <p>
          Built invitation-based employee onboarding and role-aware project
          screens. Managers can track tasks, milestones, and staffing in one
          workspace.
        </p>
        <a
          className="text-link"
          href="https://github.com/vsph-global/app-vsph-frontend/pull/10"
        >
          Project workflows <ArrowUpRight />
        </a>
      </Panel>
      <Panel id="projects" title="Selected projects" icon={<Layers3 />}>
        <div className="project-matrix">
          {featuredWork.map((work) => (
            <article key={work.name}>
              <a
                className={
                  'project-art ' + (work.name === 'Pareto' ? 'pareto-art' : '')
                }
                href={work.href}
                aria-label={work.linkLabel + ' for ' + work.name}
              >
                <img
                  src={work.image}
                  alt=""
                  width="760"
                  height="428"
                  loading="lazy"
                />
              </a>
              <div className="project-copy">
                <small>{work.field}</small>
                <h3>{work.name}</h3>
                <p>{work.summary}</p>
                <details>
                  <summary>Engineering note</summary>
                  <p>{work.note}</p>
                </details>
                <div className="project-actions">
                  <a href={work.href}>{work.linkLabel} ↗︎</a>
                  <a href={work.source} aria-label={work.name + ' source code'}>
                    Code
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="repo-list">
          {moreWork.map((work) => (
            <a key={work.name} href={work.href}>
              <b>{work.name}</b>
              <span>{work.summary}</span>
              <ArrowUpRight />
            </a>
          ))}
        </div>
      </Panel>
      <Panel id="open-source" title="Open source" icon={<Github />}>
        <div className="repo-list">
          <a href="https://github.com/runtimeconditions/python-rc-profiler/pull/9">
            <b>Runtime Conditions</b>
            <span>Fixed encoding and path handling in 18 Windows tests.</span>
            <ArrowUpRight />
          </a>
          <a href="https://github.com/CLIUtils/CLI11/pull/1431">
            <b>CLI11</b>
            <span>
              Preserved precision when converting floating-point defaults.
            </span>
            <ArrowUpRight />
          </a>
        </div>
        {hasContributionData && (
          <div className="activity">
            <div>
              <strong>{contributions.totalContributions} contributions</strong>
              <p>{formatRange(contributions.from!, contributions.to!)}</p>
            </div>
            <GitHubActivityGraph />
          </div>
        )}
      </Panel>
      <Panel id="skills" title="Skills" icon={<Code2 />}>
        <dl className="skill-lines">
          <dt>Languages</dt>
          <dd>C++ · Python · TypeScript · SQL</dd>
          <dt>Applications</dt>
          <dd>React · Next.js · FastAPI · PostgreSQL</dd>
          <dt>Tools &amp; ML</dt>
          <dd>CMake · Playwright · GitHub Actions · scikit-learn</dd>
        </dl>
      </Panel>
      <Panel id="education" title="Education" icon={<GraduationCap />}>
        <h3>{education[0].institution}</h3>
        <p>BCA in Machine Learning and Data Science · 2025–2028 (expected)</p>
        <p>
          Additional coursework in supervised machine learning through Stanford
          Online and DeepLearning.AI, and remote sensing through NASA ARSET.
        </p>
      </Panel>
      <Panel id="writing" title="Writing" icon={<BookOpen />}>
        {blogPosts.slice(0, 3).map((post) => (
          <a
            className="article-link"
            key={post.slug}
            href={'/blog/' + post.slug}
          >
            <span>{post.readingTime}</span>
            <strong>{post.title}</strong>
            <ArrowUpRight />
          </a>
        ))}
        <a className="text-link" href="/blog">
          Writing archive <ArrowUpRight />
        </a>
      </Panel>
      <footer className="profile-footer">
        <span>
          <FlaskConical size={14} /> Ayan Khan
        </span>
        <a href="#hero">Back to top ↑</a>
      </footer>
    </div>
  )
}
