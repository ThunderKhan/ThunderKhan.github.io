const LANGUAGE_ALIASES = {
  'c++': 'cpp',
  cxx: 'cpp',
  sh: 'bash',
  shell: 'bash',
  zsh: 'bash',
  js: 'javascript',
  jsx: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
  py: 'python',
  yml: 'yaml',
  'c#': 'csharp',
}

const LANGUAGE_LABELS = {
  bash: 'Bash',
  cpp: 'C++',
  csharp: 'C#',
  css: 'CSS',
  html: 'HTML',
  javascript: 'JavaScript',
  json: 'JSON',
  python: 'Python',
  sql: 'SQL',
  text: 'Text',
  plaintext: 'Text',
  typescript: 'TypeScript',
  yaml: 'YAML',
}

export function getCodeLanguage(language) {
  if (typeof language !== 'string') return null

  const raw = language.trim().toLowerCase()
  if (!raw) return null

  const canonical = LANGUAGE_ALIASES[raw] ?? raw
  const id = canonical.replace(/[^a-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '')
  if (!id) return null

  return {
    id,
    label: LANGUAGE_LABELS[id] ?? language.trim(),
  }
}
