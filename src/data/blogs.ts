export type BlogBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'code'; language?: string; text: string }
  | { type: 'list'; items: string[] }

export type BlogCrossPost = {
  label: string
  url: string
}

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  readingTime: string
  tags: string[]
  cover?: string
  canonicalUrl?: string
  crossPosts?: BlogCrossPost[]
  repositoryUrl?: string
  content: BlogBlock[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'cpp-test-impact-analysis-zero-runtime-dependencies',
    title: 'I Built C++ Test Impact Analysis With Zero Runtime Dependencies',
    description:
      'How I built diff2test: a conservative C++20 test-impact CLI that reconstructs affected tests from compiler, CMake, and CTest metadata without third-party runtime dependencies.',
    date: '2026-08-30',
    readingTime: '16 min read',
    tags: ['C++', 'Testing', 'DevTools', 'Hackathon'],
    cover:
      'https://raw.githubusercontent.com/ThunderKhan/diff2test/main/assets/diff2test-hero.png',
    canonicalUrl:
      'https://ayankhan.me/blog/cpp-test-impact-analysis-zero-runtime-dependencies',
    crossPosts: [
      {
        label: 'DEV Community',
        url: 'https://dev.to/thunderkhan/i-built-c-test-impact-analysis-with-zero-runtime-dependencies-4bo8',
      },
      {
        label: 'Hashnode',
        url: 'https://thunder-khan.hashnode.dev/i-built-cpp-test-impact-analysis-with-zero-runtime-dependencies',
      },
    ],
    repositoryUrl: 'https://github.com/ThunderKhan/diff2test',
    content: [
      {
        type: 'paragraph',
        text: 'I entered a zero-dependency hackathon thinking the hard part would be selecting tests.',
      },
      { type: 'paragraph', text: "It wasn't." },
      {
        type: 'paragraph',
        text: 'The hard part was deciding when I had enough evidence to safely not run one.',
      },
      {
        type: 'paragraph',
        text: 'Most C++ projects have a simple answer when code changes: run the test suite. That is safe, but it can get expensive fast. Change one header in a large project and there is a good chance most tests have nothing to do with it.',
      },
      {
        type: 'paragraph',
        text: 'So I spent the Zero Dependency Hackathon building diff2test, a C++20 CLI that tries to answer a narrower question.',
      },
      {
        type: 'quote',
        text: 'Given these changed files, which CTest tests can I justify running?',
      },
      {
        type: 'paragraph',
        text: 'The word justify ended up mattering more than I expected. diff2test reads changed paths and metadata that a CMake/CTest build has already produced. It reconstructs the relationship between files, translation units, targets, executables, and tests. If all the evidence checks out, it emits the affected subset. If something important is missing or suspicious, the optimization disappears.',
      },

      { type: 'heading', text: 'I already had the graph. It was just scattered everywhere.' },
      {
        type: 'paragraph',
        text: 'I did not want to predict test impact from filenames. No parser.cpp probably means ParserTest. No directory heuristics. No fuzzy matching. No history model.',
      },
      {
        type: 'paragraph',
        text: 'A normal C++ build already knows much more useful information. GCC and Clang can emit Make-style .d files containing the prerequisites of each compilation. CMake\'s File API can describe targets, their sources, their dependencies, and the artifacts they produce. CTest can export its registered tests and their commands as JSON.',
      },
      {
        type: 'code',
        text: 'changed path\n    ↓\ncompiler .d file\n    ↓\ntranslation unit\n    ↓\nCMake target\n    ↓\ntargets that depend on it\n    ↓\nexecutable artifact\n    ↓\nCTest test',
      },
      {
        type: 'paragraph',
        text: 'That looked almost suspiciously convenient. Then I checked the hackathon rules.',
      },

      { type: 'heading', text: 'The organizer email changed the project' },
      {
        type: 'paragraph',
        text: 'My first design would have been much easier. diff2test could run git diff, ask CMake for metadata, invoke CTest, maybe use a helper command to discover dependency files, and combine the results.',
      },
      {
        type: 'paragraph',
        text: 'I emailed the organizers and asked specifically whether launching Git, CMake, or CTest from the program would count as depending on separately installed software. Their answer was yes. If my executable shelled out to git, then Git was part of its runtime dependency story. Same for CMake and CTest.',
      },
      {
        type: 'paragraph',
        text: 'They did give me an important escape route: parsing files those tools had already generated was allowed, provided I disclosed that boundary and handled missing metadata gracefully. So I changed the architecture. The program would not produce its own evidence. It would consume evidence.',
      },
      {
        type: 'code',
        language: 'bash',
        text: 'git diff --name-only HEAD~1 | ./build/diff2test analyze .',
      },
      {
        type: 'paragraph',
        text: 'diff2test never launches Git. The shell does that. Git writes paths to stdout and diff2test reads newline-delimited paths from stdin. CMake, CTest, and the compiler follow the same boundary: they can generate metadata before analysis, while the running process only reads files and stdin.',
      },

      { type: 'heading', text: 'My first real fixture broke two assumptions quickly' },
      {
        type: 'paragraph',
        text: 'I built a tiny CMake/CTest project early instead of spending the whole hackathon implementing against imaginary metadata. Good decision.',
      },
      {
        type: 'paragraph',
        text: 'The first correction was traversal direction. CMake naturally tells me that a test executable depends on a library. Impact analysis asks the opposite question: if this target changed, which downstream targets depend on it? So I built reverse adjacency and propagate impact outward from the target owning the changed translation unit.',
      },
      {
        type: 'paragraph',
        text: 'The .d files were more annoying. My original plan was to recursively scan the build directory and collect anything ending in .d. Then I found link.d. Right extension. Wrong meaning.',
      },
      {
        type: 'paragraph',
        text: 'That was enough to kill recursive discovery. The final MVP takes an explicit dependency-file list through --dep-list. It is slightly more manual. I trust it more.',
      },

      { type: 'heading', text: 'Then I had to decide what fallback actually means' },
      {
        type: 'paragraph',
        text: 'At this point I had the basic graph working, and my mental model had two possible results: affected subset or full suite. Then I started deleting inputs.',
      },
      {
        type: 'code',
        text: 'complete supported evidence\n    → SUBSET_SELECTED (exit 0)\n\ntrusted test catalogue, unsafe impact evidence\n    → FULL_SUITE_SELECTED (exit 10)\n\ntest catalogue itself cannot be trusted\n    → FULL_SUITE_REQUIRED (exit 11)',
      },
      {
        type: 'paragraph',
        text: 'The split between exit 10 and 11 came from deleting the CTest catalogue itself. I originally thought fallback meant run everything. Once the catalogue was gone, the program no longer knew what everything was. Printing remembered test names would be fabricated output, while an empty list could be misread as nothing needs testing.',
      },
      {
        type: 'paragraph',
        text: 'I made both fallback conditions non-zero on purpose. If this is used in CI, I want degraded analysis to be visible.',
      },

      { type: 'heading', text: 'What narrowing looks like when the evidence is good' },
      {
        type: 'code',
        language: 'bash',
        text: "printf 'include/alpha.hpp\\n' | ./build/diff2test analyze fixture --format names\n# AlphaTest",
      },
      {
        type: 'code',
        language: 'bash',
        text: "printf 'include/features_shared.hpp\\n' | ./build/diff2test analyze fixture --format names\n# AlphaTest\n# BetaTest",
      },
      {
        type: 'paragraph',
        text: 'Remove required dependency evidence and all three known tests come back with exit 10. Remove the CTest catalogue and no test names are invented at all; the program exits 11. The changed path can stay identical through all of those runs. What changes is how much of the evidence graph I am willing to trust.',
      },

      { type: 'heading', text: 'Zero dependencies meant I owned every boring parser' },
      {
        type: 'paragraph',
        text: 'The runtime implementation is a single C++20 source file. That meant I could not quietly pull in the libraries I would normally use for the tedious parts.',
      },
      {
        type: 'list',
        items: [
          'strict JSON number grammar',
          'UTF-8 validation',
          'string escapes and Unicode surrogate pairs',
          'duplicate object key rejection',
          'positional parser errors',
          'nesting and input-size limits',
          'Make-style dependency parsing',
          'path normalization and containment policy',
        ],
      },
      {
        type: 'paragraph',
        text: 'One .d parser stress test feeds a rule containing 10,000 prerequisites. In a normal project I would use a mature JSON library, happily. Writing my own here was useful because it exposed how much correctness work disappears behind a small include statement.',
      },

      { type: 'heading', text: 'std::filesystem did not solve path safety for me' },
      {
        type: 'paragraph',
        text: 'A changed file can be deleted, so I cannot assume every path exists and blindly canonicalize it. I also had to handle prefix confusion, .. escapes, project-root boundaries, build-root boundaries, relative metadata paths, and artifact paths coming from CMake.',
      },
      {
        type: 'paragraph',
        text: 'I ended up using lexical normalization plus explicit containment checks. std::filesystem was excellent machinery. The policy was still mine.',
      },

      { type: 'heading', text: 'The same source file can mean two different compilations' },
      {
        type: 'paragraph',
        text: 'Imagine foo.cpp is compiled into two CMake targets. Those compilations may have different definitions or include paths. Seeing one dependency file for foo.cpp cannot make the source globally covered.',
      },
      {
        type: 'code',
        text: '(CMake target, compiled source)',
      },
      {
        type: 'paragraph',
        text: 'Dependency completeness is tracked per pair rather than only by source path. Otherwise one valid .d file could accidentally make another compilation of the same file look covered.',
      },

      { type: 'heading', text: 'Stale evidence was worse than missing evidence' },
      {
        type: 'paragraph',
        text: 'Missing metadata is obvious. Stale metadata still looks valid. A .d file may exist while describing an older compilation, so for project-local prerequisites diff2test checks timestamps. If a prerequisite is newer than the dependency file that claims to describe it, narrow selection is disabled.',
      },
      {
        type: 'paragraph',
        text: 'A passing timestamp check does not establish that the metadata cryptographically matches the current source tree. It means I found no detectable staleness under that policy.',
      },
      {
        type: 'paragraph',
        text: 'Changes to CMakeLists.txt or .cmake files also fall back because predicting their impact would require interpreting CMake itself. Unknown changed paths do too. I do not classify unknown as unaffected.',
      },

      { type: 'heading', text: 'Explanations came almost for free' },
      {
        type: 'code',
        text: 'changed path: include/alpha.hpp\ndependency file: CMakeFiles/alpha.dir/src/alpha.cpp.o.d\ntranslation unit: src/alpha.cpp\nowning target: alpha\ndependent target: alpha_test\nregistered test: AlphaTest',
      },
      {
        type: 'paragraph',
        text: 'That turned into --explain. If a CI optimization decides that hundreds of tests can be skipped, I want a way to inspect the chain that led to the tests it kept. It also made debugging easier because a wrong evidence chain often tells you where the reasoning diverged.',
      },

      { type: 'heading', text: 'Testing a program whose job is to skip tests felt slightly recursive' },
      {
        type: 'paragraph',
        text: 'By the end, the repository had seven dependency-free C++ test executables covering the JSON parser, .d parser, path handling, CTest metadata, CMake metadata, impact analysis, and hardening.',
      },
      {
        type: 'list',
        items: [
          'chain, diamond, cycle, and unrelated graph shapes',
          'real CMake/CTest/compiler-generated integration metadata',
          'missing, malformed, duplicate, stale, and ambiguous evidence',
          '20 repeated byte-stable CLI runs',
          'AddressSanitizer and UndefinedBehaviorSanitizer test jobs',
          'source-level process-spawn audit',
          'Linux dynamic-link inspection',
        ],
      },
      {
        type: 'paragraph',
        text: 'At one point a helper function in a test collided with std::quoted. I renamed it. That was the fix.',
      },

      { type: 'heading', text: 'Reproducible builds' },
      {
        type: 'paragraph',
        text: 'The hackathon also had a reproducible-build bonus. CI performs two clean Release builds on the same runner and toolchain and compares them byte-for-byte.',
      },
      {
        type: 'code',
        text: '162a6bbf52034f0c468ab2c7c82853a449590530768e9ed6ddd82f1b7aabc903',
      },
      {
        type: 'paragraph',
        text: 'That is deliberately a same-environment/toolchain reproducibility claim. Nothing broader.',
      },

      { type: 'heading', text: 'What did this make unnecessary?' },
      {
        type: 'paragraph',
        text: 'For the Package Killer bonus I compared diff2test with RTS++ / Ekstazi++, a broader C++ regression-test-selection system involving infrastructure such as LLVM instrumentation and dedicated RTS components.',
      },
      {
        type: 'paragraph',
        text: 'I am not claiming diff2test replaces every RTS++ capability. For the specific CMake/CTest workflow diff2test supports, useful conservative test-impact analysis can be done without adding a dedicated RTS runtime stack. The compiler, CMake, and CTest workflow already emitted enough evidence.',
      },
      {
        type: 'list',
        items: [
          'No compiler plugin',
          'No runtime agent',
          'No historical coverage database',
          'No daemon',
          'No network service',
        ],
      },

      { type: 'heading', text: 'A small performance note' },
      {
        type: 'code',
        text: 'median: 2.106 ms\np95:    2.209 ms\nruns:   200',
      },
      {
        type: 'paragraph',
        text: 'The fixture is tiny, so this is not evidence that diff2test has solved monorepo-scale performance. I did not have a verified 100,000-node or million-node benchmark during the hackathon, so I did not invent one.',
      },

      { type: 'heading', text: 'What I would change next' },
      {
        type: 'paragraph',
        text: 'The most obvious rough edge is --dep-list. Making the caller explicitly provide dependency files was the safe choice after the link.d discovery, but it makes setup more manual than I would ultimately like.',
      },
      {
        type: 'paragraph',
        text: 'I would add proper evidence adapters for Ninja, MSVC, and other CMake generator shapes rather than going back to recursive extension matching. I would also happily delete my JSON parser in a normal production version and use a mature library.',
      },

      { type: 'heading', text: 'Where it ended' },
      {
        type: 'paragraph',
        text: 'diff2test finished the hackathon as one C++20 runtime source file with no third-party runtime code, no runtime subprocess execution, no network requirement, and a deliberately narrow CMake/CTest test-impact model.',
      },
      {
        type: 'paragraph',
        text: 'There are plenty of things it does not support yet: MSVC dependency formats, Ninja\'s dependency database, arbitrary CMake generator layouts, wrapper/interpreter-style CTest commands, generated custom-command relationships, coverage-guided selection, and historical test mappings.',
      },
      {
        type: 'paragraph',
        text: 'I started the weekend focused on the graph that selects affected tests. I finished it thinking much more about the checks surrounding that graph. A fast path is easy to write. The interesting engineering starts when you have to decide whether you are actually allowed to take it.',
      },
      {
        type: 'quote',
        text: 'Safe optimization is mostly precondition engineering.',
      },
    ],
  },
]

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}
