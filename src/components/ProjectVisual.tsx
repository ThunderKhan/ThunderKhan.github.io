import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Filter,
  History,
  Lock,
  Pencil,
  Repeat,
  Search,
  ShieldCheck,
  Terminal,
  Trash2,
  Users,
} from 'lucide-react'
import type { ProjectVisual as ProjectVisualKind } from '../data/portfolio'

/**
 * Code-native conceptual illustrations for the featured projects.
 * Pure JSX + Tailwind — no images, canvas, or extra dependencies.
 * Marked aria-hidden by the caller: the adjacent copy carries the meaning.
 */

/** Shared frame: keeps every visual on the same panel treatment. */
function VisualFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex aspect-8/5 w-full items-center justify-center overflow-hidden bg-muted p-4 sm:p-6 md:absolute md:inset-0 md:aspect-auto md:h-full">
      {children}
    </div>
  )
}

/* ----------------------------------------------------------------
   Tab Jumper — stylized browser window with a visit trail
----------------------------------------------------------------- */
function TabJumperVisual() {
  const tabs = [
    { label: 'Docs', order: 1 },
    { label: 'GitHub', order: 3 },
    { label: 'Stack Overflow', order: 2 },
  ]

  return (
    <VisualFrame>
      <div className="w-full max-w-sm rounded-xl border border-border bg-card shadow-sm transition-transform duration-300 ease-out group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-border px-3 py-2">
          <span className="flex gap-1.5">
            <span className="size-2 rounded-full bg-coral/70" />
            <span className="size-2 rounded-full bg-amber/70" />
            <span className="size-2 rounded-full bg-accent/70" />
          </span>
          {/* Tabs with visit-order badges */}
          <div className="ml-1 flex min-w-0 flex-1 gap-1">
            {tabs.map((tab) => (
              <span
                key={tab.label}
                className={`relative flex min-w-0 items-center gap-1 truncate rounded-t-md border border-b-0 px-2 py-1 text-[10px] leading-none ${
                  tab.order === 3
                    ? 'border-accent/40 bg-accent/10 font-medium text-accent'
                    : 'border-border bg-muted text-muted-foreground'
                }`}
              >
                <span className="truncate">{tab.label}</span>
                <span className="flex size-3.5 shrink-0 items-center justify-center rounded-full bg-accent/15 font-mono text-[8px] text-accent">
                  {tab.order}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Visit trail */}
        <div className="flex items-center justify-center gap-1 px-4 pt-4 font-mono text-[10px] text-muted-foreground">
          <span className="rounded border border-border bg-muted px-1.5 py-0.5">Docs</span>
          <ChevronRight size={10} className="text-accent" />
          <span className="rounded border border-border bg-muted px-1.5 py-0.5">Stack Overflow</span>
          <ChevronRight size={10} className="text-accent" />
          <span className="rounded border border-accent/40 bg-accent/10 px-1.5 py-0.5 text-accent">
            GitHub
          </span>
        </div>

        {/* Navigation + shortcut */}
        <div className="flex flex-wrap items-center justify-center gap-2 px-4 py-3">
          <span className="flex items-center gap-1 rounded-md border border-border bg-muted p-1.5 text-foreground">
            <ArrowLeft size={12} />
            <ArrowRight size={12} className="text-muted-foreground" />
          </span>
          <span className="rounded-md border border-border bg-muted px-2 py-1.5 font-mono text-[10px] text-foreground shadow-[0_2px_0_0_var(--color-border)]">
            Ctrl ⇧ Space
          </span>
          <span className="flex items-center gap-1 rounded-full border border-coral/30 bg-coral/10 px-2 py-1 text-[9px] font-medium text-coral">
            <Repeat size={9} />
            Recent pair
          </span>
        </div>

        {/* Mode + privacy footer */}
        <div className="flex items-center justify-between border-t border-border px-3 py-2 text-[9px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <History size={10} className="text-accent" />
            History mode
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck size={10} className="text-accent" />
            No page data read
          </span>
        </div>
      </div>
    </VisualFrame>
  )
}

/* ----------------------------------------------------------------
   Employee Management System — abstract dashboard
----------------------------------------------------------------- */
function EmployeeDashboardVisual() {
  const stats = [
    { label: 'Total', tone: 'text-accent' },
    { label: 'Active', tone: 'text-coral' },
    { label: 'Inactive', tone: 'text-muted-foreground' },
  ]

  return (
    <VisualFrame>
      <div className="w-full max-w-sm rounded-xl border border-border bg-card shadow-sm transition-transform duration-300 ease-out group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        {/* Header with lock */}
        <div className="flex items-center justify-between border-b border-border px-3 py-2">
          <span className="flex items-center gap-1.5 text-[10px] font-medium text-foreground">
            <Users size={11} className="text-accent" />
            Dashboard
          </span>
          <span className="flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[9px] text-accent">
            <Lock size={9} />
            JWT protected
          </span>
        </div>

        <div className="flex flex-col gap-3 p-3">
          {/* Stat tiles */}
          <div className="grid grid-cols-3 gap-2">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border bg-muted px-2 py-1.5">
                <span className="block text-[9px] text-muted-foreground">{stat.label}</span>
                <span className={`mt-1 block h-1.5 w-6 rounded-full bg-current ${stat.tone}`} />
              </div>
            ))}
          </div>

          {/* Search + filter chip */}
          <div className="flex items-center gap-2">
            <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-border bg-muted px-2 py-1.5 text-muted-foreground">
              <Search size={10} />
              <span className="h-1 w-16 rounded-full bg-border" />
            </span>
            <span className="flex items-center gap-1 rounded-full border border-coral/30 bg-coral/10 px-2 py-1 text-[9px] font-medium text-coral">
              <Filter size={9} />
              Department
            </span>
          </div>

          {/* Anonymous employee rows */}
          <div className="flex flex-col gap-1.5">
            {[0, 1, 2].map((row) => (
              <div
                key={row}
                className="flex items-center gap-2 rounded-md border border-border bg-muted px-2 py-1.5"
              >
                <span className="size-4 shrink-0 rounded-full bg-accent/25" />
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="h-1 w-20 rounded-full bg-border" />
                  <span className="h-1 w-12 rounded-full bg-border/70" />
                </span>
                <span
                  className={`size-1.5 shrink-0 rounded-full ${row === 2 ? 'bg-muted-foreground/50' : 'bg-accent'}`}
                />
                <Pencil size={10} className="shrink-0 text-muted-foreground" />
                <Trash2 size={10} className="shrink-0 text-coral/80" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </VisualFrame>
  )
}

/* ----------------------------------------------------------------
   Markov Text Generator — token chain + sampled path + terminal
----------------------------------------------------------------- */
function MarkovChainVisual() {
  return (
    <VisualFrame>
      <div className="flex w-full max-w-sm flex-col gap-3 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        {/* Input tokens */}
        <div className="flex items-center gap-1.5 font-mono text-[10px]">
          <span className="text-muted-foreground">input:</span>
          {['the', 'quick', 'brown'].map((token) => (
            <span
              key={token}
              className="rounded border border-border bg-card px-1.5 py-0.5 text-foreground"
            >
              {token}
            </span>
          ))}
          <span className="text-muted-foreground">…</span>
        </div>

        {/* State graph: nodes + branching transitions */}
        <div className="relative rounded-xl border border-border bg-card p-3">
          <svg viewBox="0 0 280 96" className="w-full" fill="none">
            {/* Transition edges — one highlighted sampled path */}
            <path
              d="M46 48 C 80 48, 90 22, 122 22"
              className="stroke-border"
              strokeWidth="1.5"
            />
            <path
              d="M46 48 C 80 48, 90 74, 122 74"
              className="stroke-border"
              strokeWidth="1.5"
            />
            <path
              d="M158 22 C 190 22, 200 48, 230 48"
              className="stroke-border"
              strokeWidth="1.5"
            />
            <path
              d="M158 74 C 190 74, 200 48, 230 48"
              className="stroke-coral"
              strokeWidth="2"
            />
            <path d="M46 48 C 80 48, 90 74, 122 74" className="stroke-coral" strokeWidth="2" />

            {/* Nodes */}
            <circle cx="30" cy="48" r="14" className="fill-accent/15 stroke-accent" strokeWidth="1.5" />
            <text x="30" y="52" textAnchor="middle" className="fill-accent font-mono text-[9px]">
              fox
            </text>
            <circle cx="140" cy="22" r="14" className="fill-muted stroke-border" strokeWidth="1.5" />
            <text x="140" y="26" textAnchor="middle" className="fill-muted-foreground font-mono text-[9px]">
              ran
            </text>
            <circle cx="140" cy="74" r="14" className="fill-coral/15 stroke-coral" strokeWidth="1.5" />
            <text x="140" y="78" textAnchor="middle" className="fill-coral font-mono text-[9px]">
              jumps
            </text>
            <circle cx="246" cy="48" r="14" className="fill-coral/15 stroke-coral" strokeWidth="1.5" />
            <text x="246" y="52" textAnchor="middle" className="fill-coral font-mono text-[9px]">
              over
            </text>
          </svg>
          <span className="absolute top-2 right-2 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">
            C++23
          </span>
        </div>

        {/* Terminal output panel */}
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="flex items-center gap-1.5 border-b border-border px-2.5 py-1.5 text-[9px] text-muted-foreground">
            <Terminal size={10} className="text-accent" />
            <span className="font-mono">markov --order 2 corpus.txt</span>
          </div>
          <p className="px-2.5 py-2 font-mono text-[10px] leading-relaxed text-muted-foreground">
            <span className="text-accent">›</span> the quick brown fox jumps over…
            <span className="ml-0.5 inline-block h-2.5 w-1 translate-y-0.5 bg-coral/80" />
          </p>
        </div>
      </div>
    </VisualFrame>
  )
}

const visuals: Record<ProjectVisualKind, () => React.ReactElement> = {
  'tab-jumper': TabJumperVisual,
  'employee-dashboard': EmployeeDashboardVisual,
  'markov-chain': MarkovChainVisual,
}

export function ProjectVisual({ visual }: { visual: ProjectVisualKind }) {
  const Visual = visuals[visual]
  return <Visual />
}
