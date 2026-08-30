/**
 * ============================================================
 * PORTFOLIO CONTENT — single source of truth for the website.
 * ============================================================
 *
 * Everything visible on the site (text, links, projects, skills,
 * education, timeline entries) lives here. No other file needs
 * to be touched for routine content updates.
 *
 * The deployed site URL (`site.url` below) is also mirrored in
 * index.html (canonical, Open Graph, JSON-LD), public/robots.txt
 * and public/sitemap.xml — update all four together if it changes.
 *
 * The résumé is served from /Ayan_Khan_Resume.pdf
 * (file lives at public/Ayan_Khan_Resume.pdf).
 */

export const site = {
  name: 'Ayan Khan',
  initials: 'AK',
  headline: 'Software Developer Building Full-Stack & Systems Projects',
  tagline: 'Full Stack · C++ · Developer Tools',
  intro:
    'I build full-stack web applications, browser tools, and modular C++ systems while strengthening my foundations in algorithms, software design, and applied machine learning.',
  availability:
    'Open to internships, open-source collaboration, hackathons, and opportunities to learn with strong engineering teams.',
  location: 'India',
  /** Canonical URL of the deployed site. */
  url: 'https://ayankhan.me/',
  /** Path to the résumé PDF. Place the file at public/Ayan_Khan_Resume.pdf */
  resume: '/Ayan_Khan_Resume.pdf',
}

export const links = {
  email: 'AyanKhanOffiiciall@gmail.com',
  linkedin: 'https://www.linkedin.com/in/the-ayan-khan/',
  github: 'https://github.com/ThunderKhan/',
  leetcode: 'https://leetcode.com/u/ThunderKhan/',
}

export const about = {
  paragraphs: [
    'I’m a second-year BCA student at Deen Dayal Upadhyaya Gorakhpur University, studying Machine Learning and Data Science. I learn best by building something, testing it, and finding out where my assumptions were wrong.',
    'Recently, I’ve worked on a MERN employee-management app, Tab Jumper — a Chrome extension for moving between recent tabs — a Markov text generator, and an experimental compiler in C++. Each project has made me think more carefully about a different part of software development, from APIs and authentication to state handling and program structure.',
    'Outside projects, I solve LeetCode problems regularly — 220+ so far — mostly in C++, Python, and Java. Right now, I’m continuing with web development and machine learning while getting more comfortable working in public through issues and pull requests.',
  ],
  atAGlance: [
    { label: 'Expected graduation', value: '2028' },
    { label: 'LeetCode problems solved', value: '220+' },
    { label: 'Current SGPA', value: '9.08/10' },
    { label: 'Focus', value: 'Full-stack & C++ systems' },
  ],
}

/**
 * Selects one of the code-native visual treatments rendered by
 * src/components/ProjectVisual.tsx. Adding a new variant requires
 * updating both this type and that component.
 */
export type ProjectVisual =
  | 'tab-jumper'
  | 'employee-dashboard'
  | 'markov-chain'

export type Project = {
  title: string
  status: string
  visual: ProjectVisual
  problem: string
  description: string
  highlights: string[]
  technologies: string[]
  githubUrl: string
  liveUrl?: string
  caseStudyUrl?: string
}

/**
 * Featured projects, rendered in order by the Projects section.
 *
 * `githubUrl`, `liveUrl` and `caseStudyUrl` are only linked when they are
 * absolute http(s) URLs. Only add a `liveUrl` when the project has a real,
 * verified public deployment — never a fake demo link.
 */
export const projects: Project[] = [
  {
    title: 'Tab Jumper',
    status: 'Functional · v1.1.0',
    visual: 'tab-jumper',
    problem:
      'Chrome’s built-in shortcuts navigate tabs by their position in the tab strip, not by the order in which they were visited. Retracing context becomes slow when many tabs and windows are open.',
    description:
      'A privacy-friendly Chrome extension that records session-scoped tab visit order, provides backward and forward navigation, and lets users instantly alternate between their two most recently active tabs.',
    highlights: [
      'Separated the tab-history state machine from Chrome event integration so the navigation behavior can be tested independently',
      'Handles branching after manual navigation, closed and replaced tabs, multiple Chrome windows, and a 100-entry history limit',
      'Requests only the storage permission and does not read page contents, URLs, titles, browsing history, or send analytics',
    ],
    technologies: [
      'JavaScript',
      'Chrome Extensions API',
      'Manifest V3',
      'Node.js test runner',
    ],
    githubUrl: 'https://github.com/ThunderKhan/tab-jumper',
  },
  {
    title: 'Employee Management System',
    status: 'Functional · full stack',
    visual: 'employee-dashboard',
    problem:
      'Employee information, account access, workforce searching, department filtering, and status reporting become difficult to manage when they are scattered across disconnected records.',
    description:
      'A responsive MERN application with a seeded administrator account, JWT-protected dashboard, employee CRUD operations, search, department filtering, validation, and workforce statistics.',
    highlights: [
      'Built an Express and MongoDB API using Mongoose, JWT authentication, bcrypt password hashing, protected endpoints, and environment-based configuration',
      'Implemented employee creation, editing, deletion, search, department filtering, and active/inactive dashboard statistics',
      'Added client-side and server-side validation, INR salary formatting, toast feedback, desktop tables, and mobile employee cards',
    ],
    technologies: [
      'React',
      'Vite',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'MongoDB',
      'Mongoose',
      'JWT',
    ],
    githubUrl:
      'https://github.com/ThunderKhan/employee-management-system',
  },
  {
    title: 'Markov Text Generator',
    status: 'Functional · C++ CLI',
    visual: 'markov-chain',
    problem:
      'Modern text-generation systems can feel like black boxes. This project explores probabilistic text generation through a small, transparent implementation whose complete training and generation pipeline can be inspected.',
    description:
      'A modular C++23 command-line program that tokenizes an input corpus, trains a fixed-order Markov model, samples learned token transitions, and generates a probabilistic remix of the original text.',
    highlights: [
      'Separated tokenization, model storage, training, sampling, shared types, and the command-line entry point into focused components',
      'Structured the core engine as a reusable CMake library linked to a separate CLI executable',
      'Implemented the stochastic generation pipeline locally without external machine-learning services or opaque language-model APIs',
    ],
    technologies: [
      'C++23',
      'CMake',
      'Markov chains',
      'Stochastic modelling',
      'CLI',
    ],
    githubUrl: 'https://github.com/ThunderKhan/markov-text-cpp',
  },
]

/** Kind of work an entry represents — drives the card's badge icon. */
export type TimelineCategory =
  | 'Project workflow'
  | 'Open-source contribution'
  | 'Hackathon'
  | 'Problem solving'

/**
 * Progress of the work. Kept deliberately honest:
 * `completed` = shipped/merged, `ongoing` = continuous practice,
 * `in-progress` = started but not finished.
 */
export type TimelineStatus = 'completed' | 'ongoing' | 'in-progress'

export type TimelineLink = {
  label: string
  url: string
}

export type TimelineEntry = {
  title: string
  period: string
  category: TimelineCategory
  status: TimelineStatus
  description: string
  /** Public proof: repositories, issues, pull requests, documents. */
  links: TimelineLink[]
}

/**
 * Open source & proof of work timeline.
 *
 * Every entry must be backed by at least one public link. Never add
 * contribution counts, repository statistics, stars, adoption metrics,
 * or claims that cannot be verified by following the links below.
 */
export const openSource: TimelineEntry[] = [
  {
    title: 'Developing Tab Jumper through an issue-to-PR workflow',
    period: 'July 2026',
    category: 'Project workflow',
    status: 'completed',
    description:
      'Planned and implemented a single-shortcut mode for switching between the two most recently used browser tabs. The work moved from a documented enhancement issue to a merged pull request, including persistent mode selection, closed-tab handling, cross-window navigation, accessibility improvements, documentation updates, and an expanded state-model test suite.',
    links: [
      {
        label: 'Repository',
        url: 'https://github.com/ThunderKhan/tab-jumper',
      },
      {
        label: 'Merged PR #2',
        url: 'https://github.com/ThunderKhan/tab-jumper/pull/2',
      },
      {
        label: 'Issue #1',
        url: 'https://github.com/ThunderKhan/tab-jumper/issues/1',
      },
    ],
  },
  {
    title: 'Completing my first upstream contribution workflow',
    period: 'July 2026',
    category: 'Open-source contribution',
    status: 'completed',
    description:
      'Completed the First Contributions tutorial by forking the upstream repository, creating a focused branch and commit, opening a pull request, and having the contribution merged. This provided hands-on experience with the standard fork, branch, pull-request, and review workflow.',
    links: [
      {
        label: 'Merged upstream PR #121332',
        url: 'https://github.com/firstcontributions/first-contributions/pull/121332',
      },
    ],
  },
  {
    title: 'Prototyping a notification router for HackerRank Orchestrate',
    period: 'In progress · 2026',
    category: 'Hackathon',
    status: 'in-progress',
    description:
      'Building a contract-safe Python scaffold for a multimodal notification-routing challenge. The current repository includes typed routing models, deterministic safety checks, CSV inspection helpers, provider and pipeline interfaces, and offline tests while the complete routing pipeline remains in development.',
    links: [
      {
        label: 'Repository',
        url: 'https://github.com/ThunderKhan/orchestrate-message-router',
      },
      {
        label: 'Problem statement',
        url: 'https://github.com/ThunderKhan/orchestrate-message-router/blob/main/problem_statement.md',
      },
    ],
  },
  {
    title: 'Maintaining a public problem-solving archive',
    period: 'Ongoing',
    category: 'Problem solving',
    status: 'ongoing',
    description:
      'Maintaining a structured repository of LeetCode solutions across C, C++, Java, and Python. Solutions are organized by language and problem number, creating a public record of continued data-structures and algorithms practice.',
    links: [
      {
        label: 'LeetCode solutions repository',
        url: 'https://github.com/ThunderKhan/LeetCode-Solutions',
      },
    ],
  },
  {
    title: 'Building a modular Markov engine through focused pull requests',
    period: 'February–March 2026',
    category: 'Project workflow',
    status: 'completed',
    description:
      'Developed the Markov Text Generator incrementally through separate pull requests for core data types, tokenization, the model, sliding-window n-gram training, text generation, syntax fixes, and documentation. The repository separates reusable library code from the command-line interface.',
    links: [
      {
        label: 'Repository',
        url: 'https://github.com/ThunderKhan/markov-text-cpp',
      },
      {
        label: 'Trainer PR #4',
        url: 'https://github.com/ThunderKhan/markov-text-cpp/pull/4',
      },
      {
        label: 'Generator PR #5',
        url: 'https://github.com/ThunderKhan/markov-text-cpp/pull/5',
      },
    ],
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
    skills: ['JavaScript', 'C++', 'Python', 'C', 'Java'],
  },
  {
    title: 'Frontend development',
    skills: [
      'React',
      'Vite',
      'Tailwind CSS',
      'React Router',
      'Axios',
      'Responsive Web Design',
    ],
  },
  {
    title: 'Backend & database',
    skills: [
      'Node.js',
      'Express',
      'REST APIs',
      'MongoDB',
      'Mongoose',
      'JWT Authentication',
      'bcrypt.js',
    ],
  },
  {
    title: 'Computer science & engineering',
    skills: [
      'Data Structures',
      'Algorithms',
      'Object-Oriented Programming',
      'Complexity Analysis',
      'Modular Design',
      'Debugging',
      'Testing',
      'Error Handling',
    ],
  },
  {
    title: 'Tools & workflow',
    skills: [
      'Git',
      'GitHub',
      'Linux',
      'VS Code',
      'Command Line',
      'Postman',
      'Jupyter Notebook',
      'CMake',
      'C++ STL',
    ],
  },
  {
    title: 'Currently developing',
    learning: true,
    skills: [
      'Applied Machine Learning',
      'Advanced Compiler Design',
      'Open-Source Collaboration',
      'Competitive Programming',
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
    coursework: [
      'Data Structures and Algorithms',
      'Object-Oriented Programming',
      'Statistics',
      'Exploratory Data Analysis',
      'Databases',
      'Machine Learning Fundamentals',
    ],
    certifications: [],
    activities: [],
    achievements: ['Current SGPA: 9.08/10.00'],
  },
]

export const interests = [
  'Full-stack software development',
  'C++ systems and compiler design',
  'Browser and developer tools',
  'Data structures and algorithms',
  'Applied machine learning',
  'Open-source collaboration',
]

export const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Open Source', href: '#open-source' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]
