---
name: codebase-audit
description: Perform a comprehensive, evidence-based audit of an entire repository for real bugs, security risks, reliability problems, performance issues, weak tests, and high-value maintainability improvements.
argument-hint: "[all|bugs|security|performance|architecture|tests] [optional path]"
disable-model-invocation: true
context: fork
agent: general-purpose
background: false
disallowed-tools: Edit Write NotebookEdit
---

# Comprehensive Codebase Audit

Audit the repository without modifying source files. Treat the repository root as the boundary. Preserve all uncommitted work.

Use ultrathink. The requested focus is: `$ARGUMENTS`. If no focus is supplied, use `all`.

## Rules

- Do not install packages, change configuration, edit files, commit, push, or open pull requests.
- Do not read `.git/`, dependency/vendor directories, generated output, caches, coverage output, binaries, or minified bundles unless a finding specifically requires it.
- Inspect all relevant first-party tracked text files. For files not inspected, state why they were skipped.
- Never expose secret values. If a possible secret is found, report only its location and type.
- Do not report style preferences as bugs.
- Do not inflate the report with speculative concerns. A finding must include evidence, an impact, and a realistic trigger.
- Keep audit-tool failures separate from product defects.

## Phase 1: Establish the baseline

1. Run `git status --short` and record whether the working tree was already dirty.
2. Read repository instructions and primary documentation, including relevant `CLAUDE.md`, `AGENTS.md`, README files, contribution guides, and architecture documents.
3. Discover the technology stack from manifests, lockfiles, CI workflows, build files, environment examples, and tool configuration.
4. Determine documented commands for tests, linting, type checking, building, and security checks. Do not invent commands when the repository already defines them.

## Phase 2: Build a repository map

1. Inventory tracked first-party files with `git ls-files`, supplemented by `rg --files` when useful.
2. Group files into subsystems such as UI, API, domain logic, persistence, authentication, integrations, configuration, scripts, and tests.
3. Identify entry points, trust boundaries, external inputs, stateful components, data flows, and high-risk paths.
4. Create a coverage checklist and work through every subsystem. For a large repository, inspect it subsystem by subsystem instead of trying to load everything at once.

## Phase 3: Audit in passes

Inspect code and configuration for:

1. **Correctness:** broken conditions, boundary errors, invalid assumptions, null/empty cases, stale state, incorrect data transformations, bad defaults, unreachable paths, and platform-specific failures.
2. **Reliability:** missing error handling, swallowed failures, partial writes, retry/idempotency problems, resource leaks, race conditions, cleanup failures, and weak recovery behavior.
3. **Security and privacy:** injection, unsafe deserialization, path traversal, authorization mistakes, insecure secret handling, data exposure, dependency/configuration risks, and client/server trust mistakes.
4. **Performance:** avoidable repeated work, unbounded loops or collections, N+1 operations, blocking hot paths, excessive rendering or network calls, and missing pagination/caching where impact is plausible.
5. **API and integration contracts:** inconsistent validation, status/error semantics, schema drift, timeout handling, backward-compatibility problems, and incorrect third-party assumptions.
6. **Tests:** critical behavior with no coverage, assertions that cannot catch regressions, flaky patterns, unrealistic mocks, and missing edge cases.
7. **Maintainability:** duplication or complexity only when it creates a concrete defect risk or materially slows safe changes.

## Phase 4: Validate findings

For every candidate finding:

1. Trace the relevant execution path from input or caller to the faulty behavior.
2. Confirm the assumption against callers, types, schemas, tests, configuration, and documentation.
3. Record exact file and line references.
4. State a minimal realistic trigger or reproduction.
5. Run the narrowest relevant existing test or read-only diagnostic when safe.
6. Search for an existing guard, test, or invariant that may disprove the finding.
7. Reject the finding if evidence remains weak.

Run documented tests, linting, type checking, and builds when dependencies are already available and commands appear safe. Do not install missing dependencies. Record exact commands, exit status, and concise relevant output.

## Severity

- **Critical:** likely compromise, irreversible data loss, or system-wide outage.
- **High:** serious user-visible failure, authorization/data-integrity issue, or common crash.
- **Medium:** real defect with limited conditions or a substantial reliability/performance problem.
- **Low:** minor real defect or narrowly scoped risk.
- **Improvement:** worthwhile change without evidence of a current defect.

## Final report

Return:

1. **Executive summary:** repository scope, overall health, and counts by severity.
2. **Coverage:** subsystems and important files inspected; files intentionally skipped with reasons.
3. **Validation results:** commands run and whether each passed, failed, or could not run.
4. **Findings:** sorted by severity and confidence. For each include:
   - concise title;
   - severity and confidence;
   - exact `path:line`;
   - evidence and code path;
   - realistic trigger/reproduction;
   - user or system impact;
   - smallest sensible remediation;
   - suggested regression test.
5. **Improvements:** a separate prioritized list, clearly distinguished from bugs.
6. **Audit limitations:** anything that prevented complete verification.
7. **Recommended next actions:** the safest order for fixing validated findings.

If no validated bugs are found, say so plainly. Never claim the audit was exhaustive unless every relevant first-party file was inspected and all important checks ran successfully.
