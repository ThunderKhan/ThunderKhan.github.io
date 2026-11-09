import { StudioSpark } from './StudioSpark'
import { useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCheck,
  Code2,
  Copy,
  CornerDownLeft,
  CornerDownRight,
  FileCode2,
  GitBranch,
  Github,
  Layers3,
  Mail,
  Terminal,
} from 'lucide-react'
import {
  about,
  education,
  interests,
  links,
  openSource,
  projects,
  site,
  skillGroups,
} from '../data/portfolio'
import { blogPosts } from '../data/blog-posts'
import { ProjectVisual } from './ProjectVisual'

const projectIntros = [
  'Run the right tests. Know exactly why.',
  'Give browser agents a safer way to act.',
  'Find the connections behind payment fraud.',
  'Make screening decisions explainable.',
  'Study agents. Keep the experiment reproducible.',
  'Turn heat-risk data into an action plan.',
]
const fileNames = ['test_impact.cpp', 'evidence.ts', 'payment_graph.py']
const snippets = [
  [
    'auto changed = read_changed_paths();',
    'auto evidence = build_dependency_graph();',
    '',
    'if (!evidence.is_complete()) {',
    '  return run_full_suite();',
    '}',
    '',
    'return select_justified_tests(changed);',
  ],
  [
    'const evidence = collectSources();',
    'const proposal = reconcile(evidence);',
    '',
    'if (proposal.needsHumanDecision) {',
    '  return requestReview(proposal);',
    '}',
    '',
    'return applyReversibleEdits(proposal);',
  ],
  [
    'graph = connect_payment_signals(events)',
    'features = graph.temporal_features()',
    '',
    'risk = model.calibrated_score(features)',
    'decision = policy.evaluate(risk)',
    '',
    'return explain(decision, evidence=graph)',
  ],
]

function Workbench() {
  const [selected, setSelected] = useState(0)
  const project = projects[selected]
  return (
    <div className="workbench-wrap">
      <span className="workbench-note" aria-hidden="true">
        a little of what I do <CornerDownLeft size={28} aria-hidden="true" />
      </span>
      <div className="workbench">
        <div className="workbench-titlebar">
          <span className="window-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>
            <Code2 size={13} /> ayan / workbench
          </span>
          <span className="workbench-branch">
            <GitBranch size={12} /> main
          </span>
        </div>
        <div className="workbench-body">
          <div className="workbench-sidebar">
            <p>THE EXPLORER</p>
            <div role="tablist" aria-label="Featured projects">
              {projects.slice(0, 3).map((p, i) => (
                <button
                  key={p.title}
                  role="tab"
                  id={`workbench-tab-${i}`}
                  aria-selected={selected === i}
                  aria-controls="workbench-project"
                  tabIndex={selected === i ? 0 : -1}
                  onClick={() => setSelected(i)}
                  onKeyDown={(event) => {
                    if (
                      [
                        'ArrowDown',
                        'ArrowUp',
                        'ArrowLeft',
                        'ArrowRight',
                        'Home',
                        'End',
                      ].includes(event.key)
                    ) {
                      event.preventDefault()
                      const next =
                        event.key === 'Home'
                          ? 0
                          : event.key === 'End'
                            ? 2
                            : (selected +
                                (event.key === 'ArrowUp' ||
                                event.key === 'ArrowLeft'
                                  ? 2
                                  : 1)) %
                              3
                      setSelected(next)
                      document.getElementById(`workbench-tab-${next}`)?.focus()
                    }
                  }}
                >
                  <FileCode2 size={15} />
                  <span>{p.title}</span>
                  <span className="file-indicator">
                    {i === 0 ? 'C++' : i === 1 ? 'TS' : 'PY'}
                  </span>
                </button>
              ))}
            </div>
            <div className="sidebar-foot">
              <span className="status-dot" /> Always learning
            </div>
          </div>
          <div
            className="workbench-editor"
            role="tabpanel"
            id="workbench-project"
            aria-labelledby={`workbench-tab-${selected}`}
          >
            <div className="editor-filename">
              <FileCode2 size={13} />
              {fileNames[selected]}
              <span>●</span>
            </div>
            <div className="editor-code" aria-label="Illustrative pseudocode">
              <pre>
                <code>
                  {snippets[selected].map((line, i) => (
                    <span className="code-line" key={`${selected}-${i}`}>
                      <span className="line-number" aria-hidden="true">
                        {i + 1}
                      </span>
                      <span
                        className={
                          line.startsWith('return') || line.startsWith('if')
                            ? 'code-keyword'
                            : ''
                        }
                      >
                        {line || ' '}
                      </span>
                    </span>
                  ))}
                </code>
              </pre>
            </div>
            <div className="editor-status">
              <CheckCheck size={14} />
              <span>Explainable. Testable. Built in the open.</span>
            </div>
          </div>
          <div className="workbench-inspector">
            <span className="inspector-label">ON THE WORKBENCH</span>
            <span
              className={`project-glyph glyph-${selected}`}
              aria-hidden="true"
            >
              {selected === 0 ? (
                <GitBranch size={34} strokeWidth={1.4} />
              ) : selected === 1 ? (
                <CheckCheck size={34} strokeWidth={1.4} />
              ) : (
                <Layers3 size={34} strokeWidth={1.4} />
              )}
            </span>
            <h3>{project.title}</h3>
            <p>{projectIntros[selected]}</p>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open the repository <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="workbench-statusbar">
          <span>
            <span className="status-dot" /> A work in progress. Just like me.
          </span>
          <span>C++ · Python · TypeScript</span>
        </div>
      </div>
      <div className="workbench-caption">
        <span>
          <Terminal size={13} /> A glimpse inside the build process
        </span>
        <span>Real projects. Illustrative code.</span>
      </div>
    </div>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(links.email)
      setCopied(true)
      setCopyFailed(false)
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopyFailed(true)
    }
  }
  return (
    <section className="studio-contact studio-container" id="contact">
      <span className="contact-spark" aria-hidden="true">
        <StudioSpark />
      </span>
      <p className="studio-eyebrow">SOMETHING IN MIND?</p>
      <h2>
        Good things start
        <br />
        with a conversation.
      </h2>
      <p className="contact-description">
        An interesting problem, an internship, a collaboration,
        <br className="desktop-break" /> or just a hello. My inbox is open.
      </p>
      <div className="contact-actions">
        <a className="studio-button" href={`mailto:${links.email}`}>
          Say hello <ArrowUpRight size={17} />
        </a>
        <button className="studio-button secondary" onClick={copyEmail}>
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'Email copied' : 'Copy email'}
        </button>
      </div>
      <p className="contact-email">
        <a href={`mailto:${links.email}`}>{links.email}</a>
      </p>
      <p className="copy-status" role="status">
        {copyFailed
          ? 'Please select the email address above to copy it.'
          : copied
            ? 'Email address copied to clipboard.'
            : ''}
      </p>
    </section>
  )
}

export function PortfolioHome() {
  return (
    <div className="workbench-page">
      <section className="studio-hero studio-container" id="hero">
        <p className="hero-greeting">
          <span className="status-dot" /> Hi, I’m Ayan. A developer, and a
          curious human.
        </p>
        <h1>
          Curious mind.
          <span className="hero-second-line">
            Careful{' '}
            <span className="code-bloom" aria-hidden="true">
              <span>{'{ }'}</span>
            </span>{' '}
            code.
          </span>
        </h1>
        <p className="hero-description">
          I build developer tools, thoughtful systems, and applied AI.
          <br className="desktop-break" /> I like the kind of work you can open
          up, understand, and trust.
        </p>
        <div className="hero-actions">
          <a className="studio-button" href="#projects">
            Explore my work <ArrowDown size={16} />
          </a>
          <a className="studio-button secondary" href={site.resume}>
            View résumé <ArrowUpRight size={16} />
          </a>
        </div>
        <Workbench />
      </section>
      <div className="studio-container disciplines">
        <span>A FEW THINGS I THINK ABOUT</span>
        <div>
          <span>Systems & tooling</span>
          <StudioSpark className="discipline-star" />
          <span>Applied AI</span>
          <StudioSpark className="discipline-star" />
          <span>Open source</span>
          <StudioSpark className="discipline-star" />
          <span>Reliable automation</span>
        </div>
      </div>
      <section className="studio-section studio-container" id="projects">
        <div className="section-heading">
          <div>
            <p className="studio-eyebrow">01 / SELECTED WORK</p>
            <h2>Ideas, made tangible.</h2>
          </div>
          <p>
            From a small C++ utility to a graph of connected signals.
            <br />
            Here’s what I’ve been building, and why.
          </p>
        </div>
        <div className="studio-project-grid">
          {projects.map((project, index) => (
            <article
              className={`studio-project project-tone-${index}`}
              key={project.title}
              id={`project-${index + 1}`}
            >
              <div className="project-art" aria-hidden="true">
                <div className="project-art-top">
                  <span>PROJECT / {String(index + 1).padStart(2, '0')}</span>
                  <span>
                    {index < 2
                      ? 'DEVELOPER TOOLS'
                      : index === 2
                        ? 'DATA SYSTEMS'
                        : index === 3
                          ? 'DECISION SUPPORT'
                          : 'EXPERIMENTS'}
                  </span>
                </div>
                <ProjectVisual visual={project.visual} />
              </div>
              <div className="project-copy">
                <span className="project-status">{project.status}</span>
                <div className="project-name-row">
                  <h3>{project.title}</h3>
                  <a
                    href={project.githubUrl}
                    className="project-source-icon"
                    aria-label={`View ${project.title} source on GitHub`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ArrowUpRight size={23} />
                  </a>
                </div>
                <p className="project-deck">{projectIntros[index]}</p>
                <p className="project-description">{project.description}</p>
                <ul className="project-technologies" aria-label="Technologies">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
                <div className="project-links">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source code <ArrowUpRight size={14} />
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live demo <ArrowUpRight size={14} />
                    </a>
                  )}
                  {project.caseStudyUrl && (
                    <a
                      href={project.caseStudyUrl.replace(
                        site.url.replace(/\/$/, ''),
                        '',
                      )}
                    >
                      Case study <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
                <details className="project-details">
                  <summary>
                    A closer look <span aria-hidden="true">+</span>
                  </summary>
                  <p>{project.problem}</p>
                  <p>
                    <strong>Full toolkit:</strong>{' '}
                    {project.technologies.join(' · ')}
                  </p>
                  <ul>
                    {project.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </details>
              </div>
            </article>
          ))}
        </div>
        <a
          className="studio-text-link project-archive"
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          More experiments on GitHub <ArrowUpRight size={16} />
        </a>
      </section>
      <section className="studio-about" id="about">
        <div className="studio-container about-grid">
          <div>
            <p className="studio-eyebrow">02 / THE PERSON BEHIND THE CODE</p>
            <h2>
              I like knowing
              <br />
              <em>why</em> it works.
            </h2>
            <span className="about-doodle" aria-hidden="true">
              <CornerDownRight size={48} />{' '}
              <span>
                and what happens
                <br />
                when it doesn’t.
              </span>
            </span>
          </div>
          <div className="about-copy">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="about-availability">
              <span className="status-dot" />
              {site.availability}
            </p>
          </div>
          <dl className="about-stats">
            {about.atAGlance.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="studio-section studio-container" id="open-source">
        <div className="section-heading">
          <div>
            <p className="studio-eyebrow">03 / BUILDING IN THE OPEN</p>
            <h2>Small fixes. Shared progress.</h2>
          </div>
          <a
            className="studio-text-link"
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={17} /> Follow the work <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="contribution-list">
          {openSource
            .filter((item) => item.category === 'Open-source contribution')
            .map((entry, index) => (
              <article className="contribution-row" key={entry.title}>
                <span className="contribution-number">0{index + 1}</span>
                <div>
                  <span className="contribution-kind">{entry.category}</span>
                  <h3>{entry.title}</h3>
                  <p>{entry.description}</p>
                </div>
                <div className="contribution-links">
                  {entry.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label} <ArrowUpRight size={14} />
                    </a>
                  ))}
                </div>
              </article>
            ))}
        </div>
        <details className="more-work">
          <summary>
            The wider work log <span aria-hidden="true">+</span>
          </summary>
          {openSource
            .filter((item) => item.category !== 'Open-source contribution')
            .map((entry) => (
              <article key={entry.title}>
                <span>
                  {entry.period} / {entry.status}
                </span>
                <h3>{entry.title}</h3>
                <p>{entry.description}</p>
                <div>
                  {entry.links.map((link) => (
                    <a
                      href={link.url}
                      key={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label} <ArrowUpRight size={14} />
                    </a>
                  ))}
                </div>
              </article>
            ))}
        </details>
      </section>
      <section className="studio-writing studio-container" id="writing">
        <div className="section-heading">
          <div>
            <p className="studio-eyebrow">04 / NOTES FROM THE WORKBENCH</p>
            <h2>Thinking out loud.</h2>
          </div>
          <a className="studio-text-link" href="/blog">
            All writing <ArrowRight size={16} />
          </a>
        </div>
        <div className="writing-grid">
          {blogPosts.map((post) => (
            <a
              className="writing-story"
              href={`/blog/${post.slug}`}
              key={post.slug}
            >
              {post.cover && (
                <div className="writing-cover">
                  <img
                    src={post.cover}
                    alt=""
                    loading="lazy"
                    width="1000"
                    height="563"
                  />
                </div>
              )}
              <div className="writing-story-copy">
                <span className="studio-eyebrow">
                  {post.tags.slice(0, 2).join(' / ')} · {post.readingTime}
                </span>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <span className="studio-text-link">
                  Read the story <ArrowUpRight size={16} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
      <section className="studio-section studio-container" id="skills">
        <div className="section-heading">
          <div>
            <p className="studio-eyebrow">05 / MY TOOLKIT</p>
            <h2>The tools follow the problem.</h2>
          </div>
        </div>
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <h3>
                {group.title}
                {group.learning && (
                  <ArrowUpRight size={18} aria-hidden="true" />
                )}
              </h3>
              <p>{group.skills.join(' · ')}</p>
            </div>
          ))}
        </div>
        <p className="interests-line">
          <Code2 size={17} /> Currently curious about:{' '}
          {interests.slice(0, 3).join(', ').toLowerCase()}.
        </p>
      </section>
      <section className="studio-education studio-container" id="education">
        <div>
          <p className="studio-eyebrow">
            06 / STILL A STUDENT, ALWAYS A STUDENT
          </p>
          <h2>Learning by doing.</h2>
        </div>
        {education.map((item) => (
          <article key={item.degree}>
            <span className="education-period">{item.period}</span>
            <h3>{item.degree}</h3>
            <p>{item.institution}</p>
            <p className="education-specialization">
              {item.specialization} · {item.status}
            </p>
            <details>
              <summary>
                Coursework & milestones <span aria-hidden="true">+</span>
              </summary>
              <p>{item.coursework.join(' · ')}</p>
              <ul>
                {[
                  ...item.achievements,
                  ...item.certifications,
                  ...item.activities,
                ].map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </details>
          </article>
        ))}
      </section>
      <Contact />
      <a
        className="floating-email"
        href={`mailto:${links.email}`}
        aria-label="Email Ayan Khan"
      >
        <Mail size={20} />
      </a>
    </div>
  )
}
