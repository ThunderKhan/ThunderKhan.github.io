import {
  Activity,
  Bot,
  BrainCircuit,
  CheckCircle2,
  FileCheck2,
  GitBranch,
  Network,
  ShieldCheck,
  Stethoscope,
  Terminal,
  ThermometerSun,
} from 'lucide-react'
import type { ProjectVisual as ProjectVisualKind } from '../data/portfolio'

function VisualFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex aspect-8/5 w-full items-center justify-center overflow-hidden bg-muted p-4 sm:p-6 md:absolute md:inset-0 md:aspect-auto md:h-full">
      {children}
    </div>
  )
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-4 shadow-sm transition-transform duration-300 ease-out group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
      {children}
    </div>
  )
}

function TestImpactVisual() {
  return (
    <VisualFrame>
      <Panel>
        <div className="flex items-center justify-between border-b border-border pb-3">
          <span className="flex items-center gap-2 font-mono text-xs text-foreground">
            <Terminal size={14} className="text-accent" /> diff2test analyze
          </span>
          <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-1 font-mono text-[10px] text-accent">C++20</span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 font-mono text-[10px] text-muted-foreground">
          {['header.hpp', 'target', 'AlphaTest'].map((item, index) => (
            <div key={item} className="flex items-center gap-2">
              <span className={`rounded-lg border px-2 py-1.5 ${index === 2 ? 'border-accent/40 bg-accent/10 text-accent' : 'border-border bg-muted'}`}>{item}</span>
              {index < 2 && <GitBranch size={12} className="text-coral" />}
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-border bg-muted p-3 font-mono text-[10px] leading-relaxed text-muted-foreground">
          <p><span className="text-accent">STATUS:</span> SUBSET_SELECTED</p>
          <p className="mt-1">evidence complete → narrow safely</p>
          <p>evidence unsafe → full suite</p>
        </div>
      </Panel>
    </VisualFrame>
  )
}

function WebMcpVisual() {
  return (
    <VisualFrame>
      <Panel>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-semibold text-foreground"><ShieldCheck size={16} className="text-accent" /> webclerk</span>
          <span className="font-mono text-[10px] text-muted-foreground">9 WebMCP tools</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {['inspect', 'evidence', 'preflight', 'fill', 'conflicts', 'state'].map((tool) => (
            <span key={tool} className="rounded-lg border border-border bg-muted px-2 py-2 text-center font-mono text-[9px] text-muted-foreground">{tool}</span>
          ))}
        </div>
        <div className="mt-4 space-y-2 text-[10px]">
          <div className="flex items-center justify-between"><span className="text-muted-foreground">verified completion</span><span className="font-mono text-accent">70% → 96%</span></div>
          <div className="flex items-center gap-2 text-muted-foreground"><CheckCircle2 size={12} className="text-accent" /> evidence-backed edits only</div>
          <div className="flex items-center gap-2 text-muted-foreground"><FileCheck2 size={12} className="text-coral" /> human keeps final authority</div>
        </div>
      </Panel>
    </VisualFrame>
  )
}

function FraudGraphVisual() {
  const nodes = [
    ['C1', 'left-[12%] top-[44%]'],
    ['D7', 'left-[39%] top-[20%]'],
    ['IP4', 'left-[42%] top-[62%]'],
    ['C2', 'right-[12%] top-[28%]'],
    ['M9', 'right-[10%] top-[66%]'],
  ]
  return (
    <VisualFrame>
      <Panel>
        <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-sm font-semibold"><Network size={16} className="text-accent" /> payment graph</span><span className="font-mono text-[10px] text-coral">REVIEW</span></div>
        <div className="relative mt-4 h-40 rounded-xl border border-border bg-muted/60">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 300 160" fill="none">
            <path d="M55 80 L130 42 L245 55" className="stroke-border" strokeWidth="1.5" />
            <path d="M55 80 L135 110 L245 112" className="stroke-coral" strokeWidth="2" />
            <path d="M130 42 L135 110" className="stroke-accent" strokeWidth="2" />
          </svg>
          {nodes.map(([label, pos]) => <span key={label} className={`absolute ${pos} flex size-10 items-center justify-center rounded-full border border-accent/35 bg-card font-mono text-[10px] text-accent`}>{label}</span>)}
        </div>
        <div className="mt-3 flex items-center gap-2 font-mono text-[10px] text-muted-foreground"><Activity size={12} className="text-coral" /> graph + temporal features → calibrated risk</div>
      </Panel>
    </VisualFrame>
  )
}

function ClinicalVisual() {
  return (
    <VisualFrame>
      <Panel>
        <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-sm font-semibold"><Stethoscope size={16} className="text-accent" /> O.A.S.I.S.</span><span className="font-mono text-[10px] text-muted-foreground">screening support</span></div>
        <div className="mt-4 grid gap-2">
          {[['Red flags', 'priority override'], ['Eligibility', 'programme rules'], ['Model support', 'optional signal'], ['Referral', 'explainable priority']].map(([a,b], i) => (
            <div key={a} className="flex items-center justify-between rounded-lg border border-border bg-muted px-3 py-2 text-[10px]"><span className="text-foreground">{a}</span><span className={i === 0 ? 'text-coral' : 'text-muted-foreground'}>{b}</span></div>
          ))}
        </div>
        <p className="mt-3 font-mono text-[10px] text-muted-foreground">supports decisions · does not diagnose</p>
      </Panel>
    </VisualFrame>
  )
}

function AgentLabVisual() {
  return (
    <VisualFrame>
      <Panel>
        <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-sm font-semibold"><BrainCircuit size={16} className="text-accent" /> agent lab</span><span className="font-mono text-[10px] text-muted-foreground">trial #042</span></div>
        <div className="mt-4 flex justify-between gap-2">
          {['A', 'B', 'C', 'D'].map((agent, i) => <div key={agent} className={`flex size-12 items-center justify-center rounded-xl border ${i === 2 ? 'border-coral/40 bg-coral/10 text-coral' : 'border-border bg-muted text-muted-foreground'}`}><Bot size={18} /></div>)}
        </div>
        <div className="mt-4 rounded-xl border border-border bg-muted p-3 font-mono text-[10px] leading-relaxed text-muted-foreground">
          <p>answer → vote → eliminate</p>
          <p>checkpoint: saved</p>
          <p>events: SQLite provenance</p>
          <p className="text-accent">diagnostic: position concentration</p>
        </div>
      </Panel>
    </VisualFrame>
  )
}

function HeatMapVisual() {
  return (
    <VisualFrame>
      <Panel>
        <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-sm font-semibold"><ThermometerSun size={16} className="text-coral" /> HeatOps</span><span className="font-mono text-[10px] text-muted-foreground">placement plan</span></div>
        <div className="mt-4 grid grid-cols-5 gap-1">
          {Array.from({ length: 25 }, (_, i) => <span key={i} className={`aspect-square rounded ${i % 7 === 0 || i % 11 === 0 ? 'bg-coral/55' : i % 3 === 0 ? 'bg-accent/35' : 'bg-border/70'}`} />)}
        </div>
        <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-muted-foreground"><span>heat + vulnerability</span><span>→ optimizer</span><span className="text-accent">3 sites</span></div>
      </Panel>
    </VisualFrame>
  )
}

const visuals: Record<ProjectVisualKind, () => React.ReactElement> = {
  'test-impact': TestImpactVisual,
  webmcp: WebMcpVisual,
  'fraud-graph': FraudGraphVisual,
  'clinical-system': ClinicalVisual,
  'agent-lab': AgentLabVisual,
  'heat-map': HeatMapVisual,
}

export function ProjectVisual({ visual }: { visual: ProjectVisualKind }) {
  const Visual = visuals[visual]
  return <Visual />
}
