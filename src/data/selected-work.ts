export const featuredWork = [
  {
    name: 'FRAME',
    field: 'Graph analysis',
    note: 'FRAME keeps model scores separate from the rules that trigger a review. The analyst can inspect which shared accounts, devices, or payment details connect a flagged group.',
    summary:
      'Connects payments through shared devices and accounts to surface possible fraud rings.',
    image: '/projects/frame.webp',
    href: 'https://frame-risk.vercel.app/demo/',
    linkLabel: 'Explore dataset lab',
    source: 'https://github.com/ThunderKhan/frame',
  },
  {
    name: 'diff2test',
    field: 'C++ tooling',
    note: 'When dependency metadata is incomplete, diff2test widens the selection to the known test suite. Each narrow selection has a chain of build evidence behind it.',
    summary:
      'Reads CMake build evidence to decide which tests to run after a code change.',
    image: '/projects/diff2test.webp',
    href: '/blog/cpp-test-impact-analysis-zero-runtime-dependencies',
    linkLabel: 'Read case study',
    source: 'https://github.com/ThunderKhan/diff2test',
  },
  {
    name: 'webclerk',
    field: 'Browser automation',
    note: 'Both the browser agent and the human interface call the same validation rules. The agent can reverse its edits, while final submission stays with the applicant.',
    summary:
      'Lets an agent fill forms from supporting documents and flags fields that need a human decision.',
    image: '/projects/webclerk.webp',
    href: 'https://webclerk.vercel.app/demo',
    linkLabel: 'Try the demo',
    source: 'https://github.com/ThunderKhan/webclerk',
  },
  {
    name: 'Pareto',
    field: 'Search systems',
    summary:
      'Turns a hiring brief into editable criteria and explains why each candidate matches.',
    note: 'Built with team std::zero. The language model interprets the hiring brief. Candidate eligibility is evaluated against explicit requirements that a recruiter can inspect and edit.',
    image: '/projects/pareto.webp',
    href: 'https://try-pareto.vercel.app',
    linkLabel: 'Open workspace',
    source: 'https://github.com/ThunderKhan/pareto',
  },
]

export const moreWork = [
  {
    name: 'refute',
    summary: 'A Python tool for checking whether a patch actually fixes a bug.',
    href: 'https://github.com/ThunderKhan/refute',
  },
  {
    name: 'Prometheus Compiler',
    summary: 'A small language and compiler written in C++23.',
    href: 'https://github.com/ThunderKhan/prometheus-compiler',
  },
]
