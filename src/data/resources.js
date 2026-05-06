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
    label: 'Build',
    description: 'Non-Technical: paste the prompt into Lovable or Replit. Technical: paste the prompt into Cursor\'s AI chat and use Claude Code for targeted refinements.',
  },
  {
    id: 'step-6',
    label: 'Deploy',
    description: 'Technical path: push to GitHub and connect to Vercel. Non-technical path: Lovable deploys natively. Both end at a live URL in under five minutes.',
  },
  {
    id: 'step-7',
    label: 'Maintain',
    description: 'Use Claude for documentation and READMEs. Use Notion AI or Linear to convert a raw feature backlog into organized sprints. Collect feedback, update, redeploy, repeat.',
  },
]

export const promptLibrary = [
  {
    section: 'Section 1: Business Plan & Research',
    items: [
      {
        label: 'Gemini Prompt 1: Define the problem and target user',
        prompt: 'I am a second-year business student at a university in Toronto. I want to build a personal landing page that helps me stand out when applying to internships and co-ops. Help me understand: what problem does this actually solve, who else has this problem, and what should a strong student landing page actually include to be genuinely useful to a recruiter?',
        tool: 'gemini',
      },
      {
        label: 'Gemini Prompt 2: Research the current landscape',
        prompt: 'What tools do university students currently use to build personal landing pages? What are the most common ones, and what do students say is missing or frustrating about them? I want to understand what already exists before I decide what to build.',
        tool: 'gemini',
      },
      {
        label: 'Gemini Prompt 3: Validate with recruiter perspective',
        prompt: "What do recruiters and hiring managers actually look for when they visit a student's personal website? Give me specific things, not general advice. I want to know what makes the difference between a page they spend 30 seconds on versus one they actually send to the hiring team.",
        tool: 'gemini',
      },
      {
        label: 'Claude Prompt 1: Synthesize research into a project brief',
        prompt: 'I have been researching a personal landing page for university students applying to internships. Here is what I found from my research session: [paste Gemini output here]. Using this research, write me a structured project brief with exactly four sections: one, the problem statement in two to three sentences; two, the target user in one clear sentence; three, exactly three core features the page must have; four, two specific success metrics that would tell me this page is working. Keep it concise, practical, and free of jargon.',
        tool: 'claude',
      },
      {
        label: 'Claude Prompt 2: Generate the build prompt',
        prompt: "Now take this project brief and write me two build prompts. The first should be optimized for pasting into Lovable, which is a natural language app builder with no code required. The second should be optimized for pasting into Cursor, which is a code editor with AI assistance. Both prompts should describe the same personal landing page but be framed appropriately for each tool's strengths. Make the prompts specific enough that someone with no technical background could use them.",
        tool: 'claude',
      },
    ],
  },
  {
    section: 'Section 2: Non-Technical Path (Lovable)',
    items: [
      {
        label: 'Lovable Build Prompt',
        prompt: 'Build me a personal landing page for a second-year university student applying to internships in business or technology. The page should include: a hero section with a name, degree and year, and a one-line bio; a skills section listing four to six areas of focus or tools; a projects section with two cards, each showing a project name, a one-sentence description, and a link placeholder; and a contact section with a LinkedIn link and an email address. Use a clean, modern design with a white background, dark text, and a single accent colour. The layout should be responsive and professional.',
        tool: 'lovable',
      },
    ],
  },
  {
    section: 'Section 3: Technical Path (Cursor)',
    items: [
      {
        label: 'Cursor Build Prompt',
        prompt: "Create a personal landing page as a single index.html file with embedded CSS and no external dependencies. The page should include: a navigation bar with anchor links to each section; a hero section with a name placeholder, a degree and year placeholder, a one-line bio placeholder, and a short paragraph about the student's goals; a skills section with six skill tags in a flex grid; a projects section with two cards each containing a title, a one-sentence description, and a link placeholder; and a contact section with LinkedIn and email placeholders. Use a clean professional design with a white background, dark text, system fonts, and navy blue as the accent colour. The page must be fully responsive.",
        tool: 'cursor',
      },
    ],
  },
  {
    section: 'Section 4: Maintenance',
    items: [
      {
        label: 'Claude README Prompt',
        prompt: 'I just built a personal landing page as a single HTML file with embedded CSS. Here is the project brief it was based on: [paste brief]. Write a README for this project. Include four sections: what it is and who it is for, how to open or run it locally, how to deploy it to Vercel, and how someone else could contribute or make changes. Write it clearly enough that someone with no technical background can follow every step.',
        tool: 'claude',
      },
      {
        label: 'Notion AI Sprint Planning Prompt',
        prompt: 'Take this raw list of feature ideas and organize them into two sprints. Sprint 1 should include the most impactful features that are also the simplest to build. Sprint 2 should include the more complex or nice-to-have features. Format the output as a table with five columns: feature name, sprint number, effort level (low, medium, or high), expected outcome in one sentence, and the AI tool most likely to help build it.',
        tool: 'claude',
      },
    ],
  },
]
