/**
 * ============================================================
 * PORTFOLIO CONTENT — edit this file to update the website.
 * ============================================================
 *
 * Everything visible on the site (text, links, projects, skills,
 * education, timeline entries) lives here. No other file needs
 * to be touched for routine content updates.
 *
 * Placeholders to replace before publishing:
 *   - YOUR_EMAIL            → your professional email address
 *   - YOUR_GITHUB_URL       → e.g. https://github.com/your-username
 *   - YOUR_LEETCODE_URL     → e.g. https://leetcode.com/u/your-username
 *   - GITHUB_USERNAME       → your GitHub username (also in index.html,
 *                             public/robots.txt and public/sitemap.xml)
 *
 * Résumé: place your PDF at  public/Ayan_Khan_Resume.pdf
 * (it will be served from /Ayan_Khan_Resume.pdf).
 */

export const site = {
  name: 'Ayan Khan',
  initials: 'AK',
  headline: 'Software Developer in the Making',
  tagline: 'BCA ML/DS Student · India',
  intro:
    'I’m a BCA student specializing in Machine Learning and Data Science, building my foundations in software development, problem-solving, open source, and applied machine learning.',
  availability:
    'Open to internships, open-source collaboration, hackathons, and opportunities to learn with strong engineering teams.',
  location: 'India',
  /** Canonical URL of the deployed site. Replace GITHUB_USERNAME. */
  url: 'https://github.com/ThunderKhan/',
  /** Path to the résumé PDF. Place the file at public/Ayan_Khan_Resume.pdf */
  resume: '/Ayan_Khan_Resume.pdf',
}

export const links = {
  /** Replace with your professional email address. */
  email: 'AyanKhanOffiiciall@gmail.com',
  linkedin: 'https://www.linkedin.com/in/the-ayan-khan/',
  /** Replace with your GitHub profile URL. */
  github: 'https://github.com/ThunderKhan/',
  /** Replace with your LeetCode profile URL. */
  leetcode: 'https://leetcode.com/u/ThunderKhan/',
}

export const about = {
  paragraphs: [
    'I’m a second-year BCA student at Deen Dayal Upadhyaya Gorakhpur University, specializing in Machine Learning and Data Science. Right now, my focus is on building strong software-development fundamentals — the kind that hold up regardless of which framework is popular next year.',
    'Most of my time goes into practising data structures and algorithms in C++, Java, and Python. I’ve solved more than 220 DSA problems so far, and I keep working on my pattern recognition and problem-solving skills rather than memorizing solutions.',
    'Alongside that, I’m exploring open-source contribution workflows and learning full-stack web development and applied machine learning — building small projects to turn coursework into working software.',
  ],
  atAGlance: [
    { label: 'Expected graduation', value: '2028' },
    { label: 'DSA problems solved', value: '220+' },
    { label: 'Based in', value: 'India' },
    { label: 'Focus', value: 'Software development & ML' },
  ],
}

export type Project = {
  title: string
  status: string
  /** Path to a screenshot inside public/ (e.g. /projects/my-app.png) */
  screenshot: string
  screenshotAlt: string
  problem: string
  description: string
  highlights: string[]
  technologies: string[]
  githubUrl: string
  liveUrl?: string
  caseStudyUrl?: string
}

/**
 * ⚠️ SAMPLE PROJECTS — REPLACE BEFORE PUBLISHING.
 *
 * These three entries are clearly-labelled examples that show the card
 * layout. Swap in your real projects: update every field, add real
 * screenshots to public/projects/, and point the links at your repos.
 * Do not publish the site with these placeholders in place.
 */
export const projects: Project[] = [
  {
    title: 'Sample Project One — Replace Me',
    status: 'Sample — replace with a real project',
    screenshot: '/projects/sample-1.png',
    screenshotAlt: 'Placeholder screenshot for sample project one',
    problem:
      'Describe the real problem this project solves in one or two sentences. What was broken, slow, or missing before you built it?',
    description:
      'A short, honest description of what the project does and who it is for. Keep it concrete: what can a user actually do with it?',
    highlights: [
      'Key implementation decision you made and why',
      'A hard problem you ran into and how you solved it',
      'Something you learned building this',
    ],
    technologies: ['C++', 'Sample Tech', 'Replace Me'],
    githubUrl: 'YOUR_GITHUB_URL',
    liveUrl: undefined,
    caseStudyUrl: undefined,
  },
  {
    title: 'Sample Project Two — Replace Me',
    status: 'Sample — replace with a real project',
    screenshot: '/projects/sample-2.png',
    screenshotAlt: 'Placeholder screenshot for sample project two',
    problem:
      'Every strong project card starts from a problem statement, not a feature list. Write yours here.',
    description:
      'Explain the approach: what you built, how the pieces fit together, and any trade-offs you consciously made.',
    highlights: [
      'Interesting data structure or algorithm you applied',
      'How you structured the code for readability',
      'What you would do differently next time',
    ],
    technologies: ['Python', 'Sample Tech', 'Replace Me'],
    githubUrl: 'YOUR_GITHUB_URL',
    liveUrl: undefined,
    caseStudyUrl: undefined,
  },
  {
    title: 'Sample Project Three — Replace Me',
    status: 'Sample — replace with a real project',
    screenshot: '/projects/sample-3.png',
    screenshotAlt: 'Placeholder screenshot for sample project three',
    problem:
      'It’s fine for a learning project to solve a small problem well. Honest scope beats invented impact.',
    description:
      'Describe what works today and what’s still in progress. Recruiters respect clear, truthful status over inflated claims.',
    highlights: [
      'A specific feature you implemented end to end',
      'A bug or edge case that taught you something',
      'A lesson about tooling, testing, or design',
    ],
    technologies: ['Java', 'Sample Tech', 'Replace Me'],
    githubUrl: 'YOUR_GITHUB_URL',
    liveUrl: undefined,
    caseStudyUrl: undefined,
  },
]

export type TimelineEntry = {
  title: string
  period: string
  description: string
  /** Optional links to pull requests, repos, certificates, etc. */
  links?: { label: string; url: string }[]
}

/**
 * Open source & learning timeline.
 * Add new entries at the top. Attach PR / repo links via `links`.
 */
export const openSource: TimelineEntry[] = [
  {
    title: 'Learning professional open-source contribution workflows',
    period: 'Ongoing',
    description:
      'Studying how real projects handle issues, branches, pull requests, code review, and contribution guidelines — and practising the same workflow in my own repositories.',
    links: [],
  },
  {
    title: 'Participating in developer communities',
    period: 'Ongoing',
    description:
      'Engaging with technical communities and hackathon groups to learn from working developers and find collaboration opportunities.',
    links: [],
  },
  {
    title: 'Building projects through CS50x',
    period: 'In progress',
    description:
      'Working through Harvard’s CS50x to strengthen computer-science fundamentals — C, memory, data structures, SQL, and web basics — with hands-on problem sets.',
    links: [],
  },
  {
    title: 'Developing full-stack and machine-learning foundations',
    period: 'Ongoing',
    description:
      'Learning web development and applied machine learning in parallel, turning coursework concepts into small, working projects.',
    links: [],
  },
]

export type SkillGroup = {
  title: string
  skills: string[]
  /** Marks the whole group as "currently learning" rather than existing skills. */
  learning?: boolean
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Programming languages',
    skills: ['C', 'C++', 'Java', 'Python'],
  },
  {
    title: 'Computer science',
    skills: ['Data structures', 'Algorithms', 'Problem solving'],
  },
  {
    title: 'Tools & workflow',
    skills: ['Git', 'GitHub'],
  },
  {
    title: 'Currently learning',
    learning: true,
    skills: [
      'Web development',
      'Open-source collaboration',
      'Machine learning',
      'Software engineering practices',
    ],
  },
]

export type Education = {
  degree: string
  specialization: string
  institution: string
  period: string
  status: string
  /** Ready for future additions — leave empty arrays until real data exists. */
  coursework: string[]
  certifications: string[]
  activities: string[]
  achievements: string[]
}

export const education: Education[] = [
  {
    degree: 'Bachelor of Computer Applications',
    specialization: 'Machine Learning and Data Science',
    institution: 'Deen Dayal Upadhyaya Gorakhpur University',
    period: '2025 — 2028 (expected)',
    status: 'Currently in second year',
    coursework: [],
    certifications: [],
    activities: [],
    achievements: [],
  },
]

export const interests = [
  'Full-stack software development',
  'Open-source contribution',
  'Machine learning',
  'Developer tools',
  'Hackathons and technical communities',
]

export const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Open Source', href: '#open-source' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]