/**
 * ============================================================
 * PORTFOLIO CONTENT — single source of truth for the website.
 * ============================================================
 */

export const site = {
  name: 'Ayan Khan',
  initials: 'AK',
  headline: 'Software Developer Building Systems, Developer Tools & Applied AI',
  tagline: 'C++ · Python · TypeScript · Systems · Applied AI',
  intro:
    'I build developer tools, data-intensive systems, full-stack products, and applied-AI experiments with an emphasis on deterministic behavior, explainability, testing, and public proof of work.',
  availability:
    'Open to internships, open-source collaboration, research-minded engineering teams, and ambitious technical projects.',
  location: 'India',
  url: 'https://ayankhan.me/',
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
    'I’m a second-year BCA student at Deen Dayal Upadhyaya Gorakhpur University, specializing in Machine Learning and Data Science. I learn best by building systems, testing assumptions, and turning vague ideas into something that can be inspected and challenged.',
    'My recent work spans C++ developer tooling, graph-based fraud analysis, reproducible multi-agent LLM experimentation, browser-native WebMCP automation, clinical decision-support prototypes, and heat-response optimization. I care less about making a demo look intelligent than making the underlying system explainable, testable, and honest about its boundaries.',
    'I also contribute upstream when I can, including fixes and regression coverage in projects such as CLI11, Manim, and OpenTrace. A growing part of how I work is public: issues, pull requests, design docs, tests, benchmarks, and write-ups that make the reasoning behind the code visible.',
  ],
  atAGlance: [
    { label: 'Expected graduation', value: '2028' },
    { label: 'LeetCode problems solved', value: '220+' },
    { label: 'Current SGPA', value: '9.08/10' },
    { label: 'Current focus', value: 'Systems · DevTools · Applied AI' },
  ],
}

export type ProjectVisual =
  | 'test-impact'
  | 'webmcp'
  | 'fraud-graph'
  | 'clinical-system'
  | 'agent-lab'
  | 'heat-map'

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

export const projects: Project[] = [
  {
    title: 'diff2test',
    status: 'Completed · C++20 CLI',
    visual: 'test-impact',
    problem:
      'Large C++ repositories either run the entire test suite after every change or rely on heuristics that can silently miss affected tests.',
    description:
      'A zero-runtime-dependency C++20 test-impact analyzer that consumes existing CMake, compiler dependency, and CTest metadata to select only tests justified by build evidence, then widens conservatively when that evidence is incomplete.',
    highlights: [
      'Builds an explainable changed-file → translation-unit → target → test graph from pre-generated toolchain metadata',
      'Uses explicit safety states so missing, stale, malformed, ambiguous, or unsupported evidence widens to the known full suite instead of guessing',
      'Ships as a single runtime source file with no runtime process spawning, public verification, sanitizers, reproducibility checks, and deterministic output',
    ],
    technologies: ['C++20', 'CMake File API', 'CTest JSON', 'Dependency graphs', 'CLI', 'CI', 'ASan/UBSan'],
    githubUrl: 'https://github.com/ThunderKhan/diff2test',
    caseStudyUrl: 'https://ayankhan.me/blog/i-built-c-test-impact-analysis-with-zero-runtime-dependencies',
  },
  {
    title: 'webclerk',
    status: 'WebMCP Challenge · live',
    visual: 'webmcp',
    problem:
      'Browser agents can fill consequential forms quickly, but ordinary automation makes it too easy to guess unsupported facts, hide uncertainty, or cross human-only decision boundaries.',
    description:
      'A trust-first WebMCP layer for consequential web forms where agents operate through semantic site tools, apply only evidence-backed edits, preserve conflicts and stale evidence, and leave declarations and final submission under human control.',
    highlights: [
      'Registers nine semantic WebMCP tools directly through document.modelContext and routes writes through the same deterministic domain rules as the human UI',
      'Verified an end-to-end agent flow that moves a fictional application from 70% to 96% completion using six evidence-backed edits while leaving blockers visible',
      'Includes provenance, reversible agent changes, consistency checks, stale-evidence handling, deterministic preflight, and an explicit no-submit boundary',
    ],
    technologies: ['TypeScript', 'React', 'Vite', 'WebMCP', 'Semantic tools', 'Human-in-the-loop', 'Vitest'],
    githubUrl: 'https://github.com/ThunderKhan/webclerk',
    liveUrl: 'https://webclerk.vercel.app/',
  },
  {
    title: 'FRAME',
    status: 'Completed · research prototype',
    visual: 'fraud-graph',
    problem:
      'Coordinated payment abuse can remain invisible when transactions are scored independently even though relationships between customers, devices, cards, IPs, and merchants reveal the pattern.',
    description:
      'Fraud Ring Analysis & Mapping Engine: a graph-aware fraud-analysis system combining online relational features, short-window temporal signals, calibrated risk scoring, deterministic policy, analyst evidence, and a live investigation interface.',
    highlights: [
      'Maintains an evolving payment graph and computes graph + temporal features before every transaction decision',
      'Separates calibrated model risk from deterministic ALLOW / REVIEW / BLOCK policy and observed analyst evidence',
      'Includes a locked synthetic hard-negative benchmark and a live ring-formation demo, with results explicitly scoped as synthetic rather than real-world performance',
    ],
    technologies: ['Python', 'FastAPI', 'NetworkX', 'scikit-learn', 'React', 'TypeScript', 'Graph analysis', 'ML'],
    githubUrl: 'https://github.com/ThunderKhan/frame',
  },
  {
    title: 'O.A.S.I.S.',
    status: 'Hackathon prototype · completed phase',
    visual: 'clinical-system',
    problem:
      'Cancer-screening workflows need to prioritize referral urgency while keeping red flags, eligibility rules, model outputs, and clinical uncertainty legible to the people making decisions.',
    description:
      'Oncology Assessment & Screening Information System, an explainable clinician-facing prototype for screening and referral prioritisation across oral, breast, and cervical cancer pathways.',
    highlights: [
      'Combines red-flag safety rules, screening-program eligibility, optional statistical support, and explainable referral-priority recommendations',
      'Keeps the Screening Priority Index distinct from cancer probability and explicitly prevents low model output from overriding symptoms or abnormal examination findings',
      'Built as a Next.js frontend with a FastAPI backend, persisted assessment history, dashboard views, referral workflow, and evidence/model documentation',
    ],
    technologies: ['Next.js', 'TypeScript', 'FastAPI', 'Pydantic', 'SQLModel', 'SQLite', 'scikit-learn'],
    githubUrl: 'https://github.com/ThunderKhan/oasis',
  },
  {
    title: 'LLM Social Selection',
    status: 'Research experiment · active',
    visual: 'agent-lab',
    problem:
      'Multi-agent LLM experiments are easy to make entertaining and surprisingly hard to make reproducible, diagnosable, and useful for studying emergent social behavior.',
    description:
      'A model-independent experimentation framework for repeated multi-agent answer, voting, elimination, and evaluation trials with deterministic orchestration, resumable runs, structured ballots, diagnostics, and SQLite provenance.',
    highlights: [
      'Separates orchestration, providers, task generation, ballots, persistence, and diagnostics so experiments can be rerun across different local or remote model backends',
      'Supports checkpoint/resume, canonicalized events, hashing, structured outputs, deterministic controls, and multiple voting conditions',
      'Used calibration and diagnostic runs to surface positional concentration and degenerate agent behavior before larger experiments',
    ],
    technologies: ['Python', 'SQLite', 'Ollama', 'Structured outputs', 'Experiment orchestration', 'Evaluation', 'pytest'],
    githubUrl: 'https://github.com/ThunderKhan/llm-social-selection',
  },
  {
    title: 'HeatOps',
    status: 'Hackathon prototype · milestone 5',
    visual: 'heat-map',
    problem:
      'Heat maps show where conditions are dangerous, but emergency-response teams still need to decide where limited cooling and drinking-water resources should actually go.',
    description:
      'An explainable decision-support system that enriches heat data with vulnerability signals, generates candidate resource sites, optimizes intervention placement, and produces an operational brief from a canonical evidence bundle.',
    highlights: [
      'Supports live FortyGuard and synthetic providers with explicit provenance so mock values are never presented as observations',
      'Keeps site selection deterministic: the optimizer chooses locations while an optional LLM only narrates already-verified evidence',
      'Produces interactive risk maps, optimized placement plans, evidence fingerprints, downloadable action briefs, and end-to-end tests',
    ],
    technologies: ['Python', 'FastAPI', 'React', 'TypeScript', 'GeoJSON', 'Optimization', 'FortyGuard API', 'Groq'],
    githubUrl: 'https://github.com/ThunderKhan/heatops',
  },
]

export type TimelineCategory =
  | 'Project workflow'
  | 'Open-source contribution'
  | 'Hackathon'
  | 'Problem solving'

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
  links: TimelineLink[]
}

export const openSource: TimelineEntry[] = [
  {
    title: 'Building webclerk around browser-native WebMCP semantics',
    period: 'September 2026',
    category: 'Hackathon',
    status: 'in-progress',
    description:
      'Built a trust-first browser automation prototype with semantic WebMCP read/write tools, a deterministic evidence engine, agent provenance, reversible edits, consistency checks, stale-evidence handling, and human-only declaration/submission boundaries. Verified the real agent workflow in a supported browser environment.',
    links: [
      { label: 'Repository', url: 'https://github.com/ThunderKhan/webclerk' },
      { label: 'WebMCP implementation', url: 'https://github.com/ThunderKhan/webclerk/blob/main/webmcp/index.ts' },
      { label: 'Live demo', url: 'https://webclerk.vercel.app/demo' },
    ],
  },
  {
    title: 'Shipping diff2test for the Zero Dependency hackathon',
    period: 'August 2026',
    category: 'Hackathon',
    status: 'completed',
    description:
      'Built a single-file C++20 regression-test selector that maps changed paths to CTest tests using existing CMake and compiler dependency metadata. The tool makes narrow selections only when evidence is sufficient and otherwise widens conservatively, with explain output, reproducibility checks, sanitizers, and deterministic CI verification.',
    links: [
      { label: 'Repository', url: 'https://github.com/ThunderKhan/diff2test' },
      { label: 'Case study', url: 'https://ayankhan.me/blog/i-built-c-test-impact-analysis-with-zero-runtime-dependencies' },
    ],
  },
  {
    title: 'Extending OpenTrace subscription imports',
    period: 'August–September 2026',
    category: 'Open-source contribution',
    status: 'ongoing',
    description:
      'Contributed fixes and regression coverage to OpenTrace subscription ingestion: TSV parsing and binary-safe legacy spreadsheet discovery were followed by a dedicated XLSX implementation using openpyxl with read-only/data-only workbook handling and mocked workbook tests.',
    links: [
      { label: 'Merged PR #6', url: 'https://github.com/AbdaullahAG/OpenTrace/pull/6' },
      { label: 'XLSX PR #10', url: 'https://github.com/AbdaullahAG/OpenTrace/pull/10' },
    ],
  },
  {
    title: 'Contributing correctness fixes to CLI11',
    period: 'August 2026',
    category: 'Open-source contribution',
    status: 'ongoing',
    description:
      'Worked on upstream C++ fixes in CLI11, including precision-preserving conversion for floating-point default values and wide-string support for application descriptions and usage text, each with regression tests and full-suite validation.',
    links: [
      { label: 'Floating-point precision PR #1431', url: 'https://github.com/CLIUtils/CLI11/pull/1431' },
      { label: 'Wide-string support PR #1439', url: 'https://github.com/CLIUtils/CLI11/pull/1439' },
    ],
  },
  {
    title: 'Improving failure handling in Manim’s TeX pipeline',
    period: 'August 2026',
    category: 'Open-source contribution',
    status: 'ongoing',
    description:
      'Proposed an upstream fix so explicit dvisvgm conversion failures surface as LatexError with relevant stderr instead of propagating empty SVG output into an unrelated downstream exception.',
    links: [
      { label: 'PR #2503', url: 'https://github.com/3b1b/manim/pull/2503' },
    ],
  },
  {
    title: 'Building FRAME as a graph-first fraud analysis system',
    period: 'August 2026',
    category: 'Project workflow',
    status: 'completed',
    description:
      'Developed a graph-aware payment-risk engine with online temporal features, calibrated ML scoring, deterministic policy, analyst evidence, a FastAPI API, React investigation UI, and a locked synthetic benchmark for coordinated fraud-ring scenarios.',
    links: [
      { label: 'Repository', url: 'https://github.com/ThunderKhan/frame' },
    ],
  },
  {
    title: 'Taking O.A.S.I.S. from prototype to judged demo',
    period: 'August 2026',
    category: 'Hackathon',
    status: 'completed',
    description:
      'Built and presented an explainable oncology screening and referral-prioritisation prototype across oral, breast, and cervical pathways. The project combined rule-based safety constraints, screening eligibility, optional statistical support, persistence, and clinician-facing explanations, and was part of the work that advanced team Syntax6 through the internal selection phase.',
    links: [
      { label: 'Repository', url: 'https://github.com/ThunderKhan/oasis' },
    ],
  },
  {
    title: 'Developing a reproducible multi-agent LLM experiment harness',
    period: 'August 2026',
    category: 'Project workflow',
    status: 'ongoing',
    description:
      'Built infrastructure for repeated multi-agent answer/vote/elimination experiments with provider abstraction, deterministic orchestration, structured ballots, checkpoint/resume, SQLite event provenance, calibration tasks, and diagnostics for positional and degenerate behavior.',
    links: [
      { label: 'Repository', url: 'https://github.com/ThunderKhan/llm-social-selection' },
    ],
  },
  {
    title: 'Prototyping consequence-aware safety for computer-use agents',
    period: 'September 2026',
    category: 'Project workflow',
    status: 'in-progress',
    description:
      'Started Rehearsal, a speculative safety layer for computer-use AI that lets an agent act freely until it reaches an irreversible or high-impact action, then verifies the expected consequence before allowing the action to become real.',
    links: [
      { label: 'Repository', url: 'https://github.com/ThunderKhan/rehearsal' },
    ],
  },
  {
    title: 'Maintaining a public problem-solving archive',
    period: 'Ongoing',
    category: 'Problem solving',
    status: 'ongoing',
    description:
      'Maintaining a structured repository of LeetCode solutions across C, C++, Java, and Python as a public record of continued data-structures and algorithms practice.',
    links: [
      { label: 'LeetCode solutions', url: 'https://github.com/ThunderKhan/LeetCode-Solutions' },
    ],
  },
]

export type SkillGroup = {
  title: string
  skills: string[]
  learning?: boolean
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Programming languages',
    skills: ['C++', 'Python', 'TypeScript', 'JavaScript', 'C', 'Java', 'SQL'],
  },
  {
    title: 'Systems & developer tooling',
    skills: [
      'C++20/23',
      'CMake',
      'CTest',
      'Build metadata',
      'Dependency graphs',
      'CLI design',
      'Deterministic execution',
      'Reproducible builds',
      'Sanitizers',
    ],
  },
  {
    title: 'Web & application engineering',
    skills: [
      'React',
      'Next.js',
      'Vite',
      'Tailwind CSS',
      'Node.js',
      'FastAPI',
      'REST APIs',
      'Pydantic',
      'SQLite',
      'MongoDB',
    ],
  },
  {
    title: 'AI, agents & data systems',
    skills: [
      'WebMCP',
      'MCP',
      'Structured outputs',
      'Agent orchestration',
      'RAG fundamentals',
      'Ollama',
      'scikit-learn',
      'NetworkX',
      'Graph features',
      'Evaluation & reproducibility',
    ],
  },
  {
    title: 'Engineering practice',
    skills: [
      'Git',
      'GitHub',
      'Linux',
      'Automated testing',
      'CI/CD',
      'Debugging',
      'Failure handling',
      'API design',
      'Data validation',
      'Open-source collaboration',
    ],
  },
  {
    title: 'Currently developing',
    learning: true,
    skills: [
      'Computer-use agent safety',
      'Advanced C++ systems design',
      'Graph learning',
      'Model evaluation',
      'Large-scale open-source ownership',
    ],
  },
]

export type Education = {
  degree: string
  specialization: string
  institution: string
  period: string
  status: string
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
    certifications: ['NASA ARSET — Fundamentals of Remote Sensing'],
    activities: ['Open Source Connect India 2026 contributor'],
    achievements: ['Current SGPA: 9.08/10.00'],
  },
]

export const interests = [
  'Systems programming and developer tools',
  'Applied AI and agent infrastructure',
  'Graph and data-intensive systems',
  'Compilers and programming-language tooling',
  'Reliable automation and evaluation',
  'Open-source engineering',
]

export const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Open Source', href: '#open-source' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]
