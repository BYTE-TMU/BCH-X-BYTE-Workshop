// NOTE: the prompt library is NOT defined here. It is derived from curriculum.js
// by src/utils/collectPrompts.js so that a prompt is written in exactly one place.

export const checklistSteps = [
  {
    id: 'step-1',
    label: 'Brainstorm & Research',
    description: 'Open Gemini. Describe your idea and target user. Ask Gemini to identify the problem, research who else has it, and surface what currently exists in the market.',
  },
  {
    id: 'step-2',
    label: 'Validate & Refine',
    description: 'Continue in Gemini. Ask it to validate your assumptions, dig into competitor tools, and tell you what users actually want that current solutions are missing.',
  },
  {
    id: 'step-3',
    label: 'Synthesize & Brief',
    description: "Switch to Claude. Paste Gemini's findings and prompt Claude to produce a structured project brief: problem, user, features, success metrics.",
  },
  {
    id: 'step-4',
    label: 'Generate Build Prompt',
    description: 'Still in Claude. Ask Claude to convert the project brief into a build-ready prompt optimized for either Lovable (non-technical) or Cursor (technical).',
  },
  {
    id: 'step-5',
    label: 'Check Your Credits',
    description: 'Before you build, know your budget. Lovable\'s free plan gives 5 credits per day and Cursor\'s free Hobby plan caps agent requests. Spend the most credits on the first build prompt and pick your two most important iterations. Replit Starter is the backup if you run dry.',
  },
  {
    id: 'step-6',
    label: 'Build',
    description: "Non-Technical: paste the prompt into Lovable or Replit. Technical: paste the prompt into Cursor's AI chat and use its agent for targeted refinements.",
  },
  {
    id: 'step-7',
    label: 'Deploy',
    description: 'Technical path: push to GitHub and connect to Vercel. Non-technical path: Lovable deploys natively. Both end at a live URL in under five minutes.',
  },
  {
    id: 'step-8',
    label: 'Maintain',
    description: 'Use Claude for documentation, READMEs, and turning a raw feature backlog into organized sprints. Collect feedback, update, redeploy, repeat.',
  },
]
