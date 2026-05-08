import React from 'react'

// ─── Shared primitives ────────────────────────────────────────────────────────

function Arrow({ dir = 'down' }) {
  return (
    <div
      className={`flex text-brand-gray font-mono text-lg select-none ${
        dir === 'right' ? 'items-center px-0.5 shrink-0' : 'justify-center my-1'
      }`}
    >
      {dir === 'right' ? '→' : '↓'}
    </div>
  )
}

function Box({ label, sub, color = 'gray', compact = false }) {
  const colors = {
    red:    'bg-brand-redLight border-brand-red',
    blue:   'bg-path-techLight border-path-technical',
    green:  'bg-path-nontechLight border-path-nontech',
    purple: 'bg-path-bothLight border-path-both',
    gray:   'bg-brand-grayLight border-brand-border',
    dark:   'bg-zinc-100 border-zinc-500',
  }
  const textColor = 'text-brand-black'
  const subColor  = 'text-brand-gray'
  const pad       = compact ? 'px-3 py-2' : 'px-4 py-3'
  const size      = compact ? 'text-xs' : 'text-sm'

  return (
    <div className={`border-2 rounded-lg text-center ${pad} ${colors[color]}`}>
      <div className={`font-semibold leading-snug ${size} ${textColor}`}>{label}</div>
      {sub && <div className={`text-xs mt-0.5 leading-snug ${subColor}`}>{sub}</div>}
    </div>
  )
}

function Wrapper({ title, children }) {
  return (
    <div className="my-6 p-5 bg-brand-grayLight rounded-xl border border-brand-border">
      {title && (
        <p className="text-xs font-bold uppercase tracking-widest text-brand-gray mb-4">
          {title}
        </p>
      )}
      {children}
    </div>
  )
}

function LoopNote({ text }) {
  return (
    <div className="mt-3 flex justify-center">
      <span className="text-xs text-brand-gray border border-dashed border-brand-gray rounded px-3 py-1.5 text-center">
        {text}
      </span>
    </div>
  )
}

// ─── Diagram: Tool Pipeline (Section 0.4) ─────────────────────────────────────

function ToolPipeline() {
  const phases = [
    { label: 'Research',  sub: 'Gemini',                    color: 'blue'   },
    { label: 'Plan',      sub: 'Claude',                    color: 'purple' },
    { label: 'Build',     sub: 'Lovable · Cursor · Replit', color: 'red'    },
    { label: 'Deploy',    sub: 'GitHub · Vercel',           color: 'dark'   },
    { label: 'Maintain',  sub: 'Claude · Notion AI',        color: 'green'  },
  ]

  return (
    <Wrapper title="Workshop Tool Map — How Every Tool Fits Together">
      {/* Mobile: vertical */}
      <div className="flex flex-col items-center gap-1 sm:hidden">
        {phases.map((p, i) => (
          <React.Fragment key={p.label}>
            <Box label={p.label} sub={p.sub} color={p.color} />
            {i < phases.length - 1 && <Arrow />}
          </React.Fragment>
        ))}
      </div>
      {/* Desktop: horizontal */}
      <div className="hidden sm:flex items-stretch gap-0">
        {phases.map((p, i) => (
          <React.Fragment key={p.label}>
            <div className="flex-1">
              <Box label={p.label} sub={p.sub} color={p.color} compact />
            </div>
            {i < phases.length - 1 && <Arrow dir="right" />}
          </React.Fragment>
        ))}
      </div>
      <p className="text-xs text-brand-gray text-center mt-3">
        Each tool is chosen for what it does best at that stage — you will only need two or three tonight.
      </p>
    </Wrapper>
  )
}

// ─── Diagram: Brief Comparison (Section 1.1) ──────────────────────────────────

function BriefComparison() {
  return (
    <Wrapper title="Project Brief: Weak vs. Strong">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Weak */}
        <div className="border-2 border-brand-red rounded-lg overflow-hidden">
          <div className="bg-brand-red px-4 py-2">
            <span className="text-white text-xs font-bold uppercase tracking-widest">
              ✗ Weak Brief
            </span>
          </div>
          <div className="p-4 bg-brand-redLight space-y-3">
            <p className="text-sm italic text-brand-black">
              "I want to make an app for students."
            </p>
            <ul className="space-y-1.5 text-xs text-brand-gray">
              <li>✗ No defined user — which students?</li>
              <li>✗ No scoped features — what does it do?</li>
              <li>✗ No success metric — how will you know it worked?</li>
              <li>✗ Cannot be built without guessing at every step</li>
            </ul>
          </div>
        </div>
        {/* Strong */}
        <div className="border-2 border-path-nontech rounded-lg overflow-hidden">
          <div className="bg-path-nontech px-4 py-2">
            <span className="text-white text-xs font-bold uppercase tracking-widest">
              ✓ Strong Brief
            </span>
          </div>
          <div className="p-4 bg-path-nontechLight space-y-2">
            <p className="text-xs text-brand-black">
              <span className="font-semibold">Problem:</span> University students lack a
              professional online presence when applying to internships.
            </p>
            <p className="text-xs text-brand-black">
              <span className="font-semibold">User:</span> 2nd-year business or CS student at a
              Canadian university.
            </p>
            <p className="text-xs text-brand-black">
              <span className="font-semibold">Features:</span> Hero, skills list, project cards,
              contact links.
            </p>
            <p className="text-xs text-brand-black">
              <span className="font-semibold">Success:</span> 5+ recruiter visits per week within
              one month of launch.
            </p>
          </div>
        </div>
      </div>
      <p className="text-xs text-brand-gray text-center mt-3">
        A strong brief answers four questions before you write a single line of code or a single prompt.
      </p>
    </Wrapper>
  )
}

// ─── Diagram: Two-LLM Workflow (Section 1.3) ──────────────────────────────────

function TwoLLMWorkflow() {
  return (
    <Wrapper title="The Two-LLM Research Workflow">
      <div className="flex flex-col items-stretch gap-0">
        <Box label="Your Idea" sub="Vague concept or problem — not yet ready to build" color="gray" />
        <Arrow />

        <div className="border-2 border-path-technical rounded-lg overflow-hidden">
          <div className="bg-path-technical px-4 py-2">
            <span className="text-white text-xs font-bold">Step 1 — Gemini</span>
          </div>
          <ul className="px-4 py-3 text-xs text-brand-black space-y-1">
            <li>• Real-time web access — grounded in what exists today</li>
            <li>• Brainstorm the problem and define the target user</li>
            <li>• Research what tools and solutions already exist</li>
            <li>• Validate your idea from a recruiter or user perspective</li>
          </ul>
        </div>

        <Arrow />
        <Box
          label="Raw Research Notes"
          sub="Insights, competitor landscape, user pain points"
          color="gray"
        />
        <Arrow />

        <div className="border-2 border-path-both rounded-lg overflow-hidden">
          <div className="bg-path-both px-4 py-2">
            <span className="text-white text-xs font-bold">Step 2 — Claude</span>
          </div>
          <ul className="px-4 py-3 text-xs text-brand-black space-y-1">
            <li>• Long-form reasoning — handles complex, multi-part tasks</li>
            <li>• Synthesise messy research notes into a clean plan</li>
            <li>• Structure ideas into a four-section project brief</li>
            <li>• Generate build prompts tailored to Lovable or Cursor</li>
          </ul>
        </div>

        <Arrow />

        <div className="grid grid-cols-2 gap-3">
          <Box label="Project Brief" sub="Problem · User · Features · Success metric" color="purple" />
          <Box label="Build Prompt" sub="Ready to paste into Lovable or Cursor" color="purple" />
        </div>
      </div>
      <p className="text-xs text-brand-gray text-center mt-3">
        Gemini gives you breadth and real-world grounding. Claude gives you structure and something
        actionable. Using one tool for both produces weaker results.
      </p>
    </Wrapper>
  )
}

// ─── Diagram: No-Code Build Flow (Section 2.3) ────────────────────────────────

function IterationLoop() {
  const steps = [
    { label: 'Paste Build Prompt',     sub: 'Into Lovable\'s prompt bar',              color: 'blue'   },
    { label: 'Review First Draft',     sub: 'What landed? What needs work?',           color: 'gray'   },
    { label: 'Refine with Follow-ups', sub: 'Visual · Content · Structure',            color: 'red'    },
    { label: 'Final Polish',           sub: 'Hover effects · Responsive layout',       color: 'purple' },
    { label: 'Deploy',                 sub: 'Click once → Live URL in seconds',        color: 'green'  },
  ]

  return (
    <Wrapper title="No-Code Build Flow — Lovable">
      {/* Mobile: vertical */}
      <div className="flex flex-col items-center gap-1 sm:hidden">
        {steps.map((s, i) => (
          <React.Fragment key={s.label}>
            <Box label={s.label} sub={s.sub} color={s.color} />
            {i < steps.length - 1 && <Arrow />}
          </React.Fragment>
        ))}
      </div>
      {/* Desktop: horizontal */}
      <div className="hidden sm:flex items-stretch gap-0">
        {steps.map((s, i) => (
          <React.Fragment key={s.label}>
            <div className="flex-1">
              <Box label={s.label} sub={s.sub} color={s.color} compact />
            </div>
            {i < steps.length - 1 && <Arrow dir="right" />}
          </React.Fragment>
        ))}
      </div>
      <LoopNote text="↩ Steps 2–4 repeat until the result matches your vision" />
    </Wrapper>
  )
}

// ─── Diagram: Code Deploy Pipeline (Section 3.4) ──────────────────────────────

function CodeDeployPipeline() {
  const steps = [
    { label: 'Cursor + Claude AI',       sub: 'Generate code from plain-English description', color: 'blue'   },
    { label: 'Local File (index.html)',   sub: 'Your project lives on your machine',           color: 'gray'   },
    { label: 'git init → commit',         sub: 'Save and version your work',                  color: 'gray'   },
    { label: 'GitHub Repository',         sub: 'Your code stored in the cloud',               color: 'dark'   },
    { label: 'Import to Vercel',          sub: 'Link your repo in one click',                  color: 'dark'   },
    { label: 'Live URL ✓',               sub: 'Auto-redeploys on every future push',           color: 'green'  },
  ]

  return (
    <Wrapper title="Code Path — From Editor to Live URL">
      {/* All screen sizes: vertical for clarity */}
      <div className="flex flex-col items-center gap-1">
        {steps.map((s, i) => (
          <React.Fragment key={s.label}>
            <div className="w-full max-w-sm">
              <Box label={s.label} sub={s.sub} color={s.color} />
            </div>
            {i < steps.length - 1 && <Arrow />}
          </React.Fragment>
        ))}
      </div>
      <LoopNote text="Every future git push triggers an automatic Vercel redeploy — no manual steps" />
    </Wrapper>
  )
}

// ─── Diagram: Feedback Loop (Section 4.3) ─────────────────────────────────────

function FeedbackLoop() {
  const steps = [
    { label: '1. Collect Feedback',  sub: 'Share URL · Watch users · Take notes', color: 'blue'   },
    { label: '2. Plan the Fix',      sub: 'Describe the issue to Claude',          color: 'purple' },
    { label: '3. Make Changes',      sub: 'Cursor or Lovable',                     color: 'red'    },
    { label: '4. Push & Redeploy',   sub: 'GitHub → Vercel auto-redeploys',        color: 'dark'   },
  ]

  return (
    <Wrapper title="The Continuous Improvement Loop">
      {/* Mobile: vertical */}
      <div className="flex flex-col items-center gap-1 sm:hidden">
        {steps.map((s, i) => (
          <React.Fragment key={s.label}>
            <Box label={s.label} sub={s.sub} color={s.color} />
            {i < steps.length - 1 && <Arrow />}
          </React.Fragment>
        ))}
      </div>
      {/* Desktop: horizontal */}
      <div className="hidden sm:flex items-stretch gap-0">
        {steps.map((s, i) => (
          <React.Fragment key={s.label}>
            <div className="flex-1">
              <Box label={s.label} sub={s.sub} color={s.color} compact />
            </div>
            {i < steps.length - 1 && <Arrow dir="right" />}
          </React.Fragment>
        ))}
      </div>
      <LoopNote text="↩ Loop back to Step 1 — each cycle makes the product measurably better" />
    </Wrapper>
  )
}

// ─── Diagram: Sprint Visual (Section 4.2) ─────────────────────────────────────

function SprintVisual() {
  const sprint1 = [
    'Dark mode toggle',
    'Animated hero text',
    'Downloadable resume button',
  ]
  const sprint2 = [
    'Contact form that sends an email',
    'Blog section',
    'Project filtering by category',
    'Testimonials section',
  ]

  return (
    <Wrapper title="Sprint Planning — Organising What to Build Next">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Sprint 1 */}
        <div className="border-2 border-path-nontech rounded-lg overflow-hidden">
          <div className="bg-path-nontech px-4 py-2 flex items-center justify-between">
            <span className="text-white text-xs font-bold uppercase tracking-widest">Sprint 1</span>
            <span className="text-green-100 text-xs">High impact · Low effort</span>
          </div>
          <ul className="p-4 space-y-2">
            {sprint1.map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs text-brand-black">
                <span className="text-path-nontech mt-0.5 shrink-0">✓</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
        {/* Sprint 2 */}
        <div className="border-2 border-path-technical rounded-lg overflow-hidden">
          <div className="bg-path-technical px-4 py-2 flex items-center justify-between">
            <span className="text-white text-xs font-bold uppercase tracking-widest">Sprint 2</span>
            <span className="text-blue-100 text-xs">More complex · Nice-to-have</span>
          </div>
          <ul className="p-4 space-y-2">
            {sprint2.map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs text-brand-black">
                <span className="text-path-technical mt-0.5 shrink-0">◷</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="text-xs text-brand-gray text-center mt-3">
        Sprint 1 ships value fast. Sprint 2 adds depth once the core product is validated.
      </p>
    </Wrapper>
  )
}

// ─── Diagram: Path Comparison (Section 1.5) ──────────────────────────────────

function PathComparison() {
  const rows = [
    {
      category: 'Cost',
      nontech: [
        { type: 'pro', text: 'Free to get started — no account setup costs' },
        { type: 'con', text: "Lovable's free plan has limits; exporting your project or adding a custom domain costs money" },
      ],
      tech: [
        { type: 'pro', text: 'All tools used tonight have a free tier that covers everything you need' },
        { type: 'con', text: 'Takes more time to set up — you will spend some of your building time on configuration' },
      ],
    },
    {
      category: 'How Many People Can Use Your Site',
      nontech: [
        { type: 'pro', text: 'Lovable handles traffic automatically — your site stays up even if a lot of people visit at once' },
        { type: 'con', text: 'Very high traffic may require upgrading to a paid plan' },
      ],
      tech: [
        { type: 'pro', text: 'Your site lives on Vercel, which also handles traffic automatically' },
        { type: 'con', text: 'You are responsible for understanding how your site is set up if something goes wrong' },
      ],
    },
    {
      category: 'How Much You Can Change Later',
      nontech: [
        { type: 'pro', text: 'Easy to update — just describe what you want in plain English' },
        { type: 'con', text: 'Hard to add complex features (like a login or a form that saves data) without hitting a wall' },
      ],
      tech: [
        { type: 'pro', text: 'You can add anything later — new pages, forms, or entirely new features' },
        { type: 'con', text: 'Adding new features requires you to write or understand some code' },
      ],
    },
    {
      category: 'Best For',
      nontech: [
        { type: 'best', text: 'You want a live product tonight with no prior experience — speed and simplicity matter most' },
      ],
      tech: [
        { type: 'best', text: 'You want to understand how the product works and be able to grow it into something bigger' },
      ],
    },
  ]

  return (
    <Wrapper title="Choosing Your Path — Non-Technical vs Technical">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        <div className="bg-path-nontech rounded-lg px-4 py-2.5">
          <p className="text-white text-xs font-bold uppercase tracking-widest">Non-Technical Path</p>
          <p className="text-green-100 text-xs mt-0.5">Lovable</p>
        </div>
        <div className="bg-path-technical rounded-lg px-4 py-2.5">
          <p className="text-white text-xs font-bold uppercase tracking-widest">Technical Path</p>
          <p className="text-blue-100 text-xs mt-0.5">Cursor · GitHub · Vercel</p>
        </div>
      </div>

      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.category}>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-gray mb-2">
              {row.category}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="border border-path-nontech rounded-lg p-3 bg-path-nontechLight">
                <ul className="space-y-1.5">
                  {row.nontech.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-brand-black">
                      <span className={`shrink-0 ${item.type === 'con' ? 'text-brand-red' : 'text-path-nontech'}`}>
                        {item.type === 'pro' ? '✓' : item.type === 'con' ? '✗' : '→'}
                      </span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-path-technical rounded-lg p-3 bg-path-techLight">
                <ul className="space-y-1.5">
                  {row.tech.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-brand-black">
                      <span className={`shrink-0 ${item.type === 'con' ? 'text-brand-red' : 'text-path-technical'}`}>
                        {item.type === 'pro' ? '✓' : item.type === 'con' ? '✗' : '→'}
                      </span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-brand-gray text-center mt-4">
        Neither path is right or wrong — choose the one that fits how you want to learn tonight.
      </p>
    </Wrapper>
  )
}

// ─── Registry & Export ────────────────────────────────────────────────────────

const DIAGRAMS = {
  'tool-pipeline':        ToolPipeline,
  'brief-comparison':     BriefComparison,
  'two-llm-workflow':     TwoLLMWorkflow,
  'iteration-loop':       IterationLoop,
  'code-deploy-pipeline': CodeDeployPipeline,
  'feedback-loop':        FeedbackLoop,
  'sprint-visual':        SprintVisual,
  'path-comparison':      PathComparison,
}

export default function DiagramBlock({ id }) {
  const Component = DIAGRAMS[id]
  if (!Component) return null
  return <Component />
}
