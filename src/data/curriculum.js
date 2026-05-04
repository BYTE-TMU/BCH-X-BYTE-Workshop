export const sections = [
  {
    id: 'section-0',
    number: 0,
    title: 'Welcome & Setup',
    duration: '10 Minutes',
    format: 'Live',
    description: 'Orient every person in the room before a single tool is opened. Establish the tone, the format, the example project, and the ground rules.',
    subsections: [
      {
        code: '0.1',
        title: 'Welcome and Introductions',
        timing: '2 minutes',
        content: [
          {
            type: 'body',
            text: 'Open by welcoming everyone and thanking BCH for the collaboration. Introduce the BYTE and BCH presenters by first name and role. Keep introductions to one sentence each. Confirm the format: two hours, a mix of live demos and pre-recorded walkthroughs, questions welcome at any point. Let the audience know there will be a prize draw at the end for completing the feedback form.',
          },
          {
            type: 'presenterNote',
            text: 'Do a quick show of hands before moving on: who has used an LLM like Gemini or Claude before? Who has tried to build anything technical before, even a website? This gives you a live read of the room. Adjust your pace in Section 1 accordingly.',
          },
        ],
      },
      {
        code: '0.2',
        title: 'The Problem This Workshop Solves',
        timing: '3 minutes',
        content: [
          {
            type: 'body',
            text: 'Open with a scenario every person in the room will recognize: you have an idea. You open a blank Google Doc. You stare at it. You close it. Most people in the room have been there. That moment exists because the gap between having an idea and knowing how to build it feels enormous. This workshop exists to close that gap. By the end of tonight, every person in the room will have gone through the full lifecycle of turning a vague idea into a live, deployed product using AI tools that are free and available right now. The non-technical path is a first-class path. Students who have never written a line of code will leave with the same end result as students who code every day.',
          },
        ],
      },
      {
        code: '0.3',
        title: 'Introducing the Example Project',
        timing: '3 minutes',
        content: [
          {
            type: 'body',
            text: 'Introduce the project for the evening: a personal landing page that introduces who you are, what you are studying, and what you are building or looking for. Every person in this room needs one. It is useful the moment you leave tonight. Show a finished example on screen. Walk through the four sections: a hero block with a name and one-line bio, a skills section, a projects section with two example cards, and a contact section.',
          },
          {
            type: 'presenterNote',
            text: 'The finished example should look clean and professional. Show it upfront before explaining how it was built — the reveal at the end of the build section lands harder.',
          },
        ],
      },
      {
        code: '0.4',
        title: 'Tool Overview',
        timing: '2 minutes',
        content: [
          {
            type: 'body',
            text: 'A quick overview of every tool used tonight. You do not need accounts for everything right now — accounts will be walked through at the start of each section.',
          },
          {
            type: 'bullets',
            items: [
              'Gemini — used for research, brainstorming, and market validation.',
              'Claude — used for synthesizing research into a project brief and for all coding and implementation.',
              'Lovable — used on the non-technical path to build a full application from a plain English description.',
              'Replit — alternative non-technical path, in-browser with AI assistance and no setup.',
              'Cursor — used on the technical path as the AI-native code editor.',
              'Claude Code — used on the technical path for targeted multi-file edits.',
              'GitHub and Vercel — used by both paths to deploy a live URL.',
              'Claude and Notion AI — used in the maintenance section for documentation and sprint planning.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'section-1',
    number: 1,
    title: 'Business Plan & Research',
    duration: '30 Minutes',
    format: 'Live',
    description: 'Go from a vague idea to a clean scoped project brief using a two-step LLM workflow: Gemini for brainstorming and validation, then Claude for synthesis and build prompt generation.',
    subsections: [
      {
        code: '1.1',
        title: 'What Is a Project Brief and Why Does It Matter?',
        timing: '5 minutes',
        content: [
          {
            type: 'body',
            text: 'A project brief answers four questions before any building starts. Use an analogy BCH students will recognize: a project brief is to a software product what an executive summary is to a pitch deck.',
          },
          {
            type: 'numbered',
            items: [
              'What is the problem?',
              'Who has this problem?',
              'What are the three to five core features that solve it?',
              'How will you know it worked?',
            ],
          },
          {
            type: 'body',
            text: 'Show a bad example: "I want to make an app for students." Walk through why it fails — no defined user, no scoped features, no success metric. Then show a good brief using the personal landing page as the example.',
          },
          {
            type: 'presenterNote',
            text: 'Keep the bad example visually on screen next to the good example. The contrast is the lesson.',
          },
        ],
      },
      {
        code: '1.2',
        title: 'Step 1: Brainstorm and Research with Gemini',
        timing: '12 minutes',
        content: [
          {
            type: 'body',
            text: 'Open Gemini at gemini.google.com. Walk through account creation — sign in with a Google account. Explain that Gemini has real-time web awareness, meaning its research is grounded in what exists today, not just training data.',
          },
          {
            type: 'prompt',
            label: 'Weak Prompt — Do Not Use This',
            prompt: 'Make me a personal website.',
            tool: 'gemini',
            warning: true,
          },
          {
            type: 'prompt',
            label: 'Live Prompt 1 — Define the problem and target user',
            prompt: 'I am a second-year business student at a university in Toronto. I want to build a personal landing page that helps me stand out when applying to internships and co-ops. Help me understand: what problem does this actually solve, who else has this problem, and what should a strong student landing page actually include to be genuinely useful to a recruiter?',
            tool: 'gemini',
            warning: false,
          },
          {
            type: 'body',
            text: 'Walk through the output. Highlight two or three things Gemini got right. Flag one or two things that are too generic.',
          },
          {
            type: 'prompt',
            label: 'Live Prompt 2 — Research the current landscape',
            prompt: 'What tools do university students currently use to build personal landing pages? What are the most common ones, and what do students say is missing or frustrating about them? I want to understand what already exists before I decide what to build.',
            tool: 'gemini',
            warning: false,
          },
          {
            type: 'body',
            text: 'Point out when Gemini cites or references real tools or sources.',
          },
          {
            type: 'prompt',
            label: 'Live Prompt 3 — Validate with recruiter perspective',
            prompt: 'What do recruiters and hiring managers actually look for when they visit a student\'s personal website? Give me specific things, not general advice. I want to know what makes the difference between a page they spend 30 seconds on versus one they actually send to the hiring team.',
            tool: 'gemini',
            warning: false,
          },
          {
            type: 'teachingPoint',
            text: 'Gemini is doing two things at once: brainstorming and validating. It generates ideas while grounding them in real market context. That combination is why it is the right starting point. Do not skip to building without it.',
          },
        ],
      },
      {
        code: '1.3',
        title: 'Step 2: Synthesize and Generate with Claude',
        timing: '11 minutes',
        content: [
          {
            type: 'body',
            text: 'Switch to Claude at claude.ai. Walk through account creation. Explain that Claude is purpose-built for long-form reasoning and structured document generation.',
          },
          {
            type: 'prompt',
            label: 'Live Prompt 1 — Synthesize research into a project brief',
            prompt: 'I have been researching a personal landing page for university students applying to internships. Here is what I found from my research session: [paste Gemini output here]. Using this research, write me a structured project brief with exactly four sections: one, the problem statement in two to three sentences; two, the target user in one clear sentence; three, exactly three core features the page must have; four, two specific success metrics that would tell me this page is working. Keep it concise, practical, and free of jargon.',
            tool: 'claude',
            warning: false,
          },
          {
            type: 'body',
            text: 'Walk through the output section by section. Show before (raw messy notes) and after (clean one-pager). Ask the room if they would change anything and show how a follow-up prompt can make that change immediately.',
          },
          {
            type: 'prompt',
            label: 'Live Prompt 2 — Generate the build prompt',
            prompt: 'Now take this project brief and write me two build prompts. The first should be optimized for pasting into Lovable, which is a natural language app builder with no code required. The second should be optimized for pasting into Cursor, which is a code editor with AI assistance. Both prompts should describe the same personal landing page but be framed appropriately for each tool\'s strengths. Make the prompts specific enough that someone with no technical background could use them.',
            tool: 'claude',
            warning: false,
          },
          {
            type: 'body',
            text: 'Show both prompts side by side. Explain these are the exact prompts used to open Sections 2 and 3.',
          },
          {
            type: 'teachingPoint',
            text: 'The two-LLM workflow is not redundant. Gemini gave breadth and real-world grounding. Claude gave structure and actionable output. Using one tool for both would produce weaker results at each step.',
          },
        ],
      },
      {
        code: '1.4',
        title: 'Common Beginner Mistakes',
        timing: '2 minutes',
        content: [
          {
            type: 'bullets',
            items: [
              'Prompting in one sentence and expecting a finished result. A prompt is the start of a conversation, not a command. The follow-up is where the real value lives.',
              'Skipping the research step and going straight to building. If you do not know who you are building for, you will build the wrong thing.',
              'Treating the first output as final. Read it critically. Push back. Iterate.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'section-2',
    number: 2,
    title: 'Building the Project (Non-Technical Path)',
    duration: '20 Minutes',
    format: 'Pre-recorded',
    description: 'Take the Lovable build prompt generated by Claude in Section 1 and produce a live, deployed personal landing page with zero lines of code written.',
    introFrame: 'What you are about to see is exactly what it looks like to go from the Claude prompt we just generated to a live, deployed product. The person in this recording has no technical background. They are using the same prompt you just watched us write. Watch for how they describe what they want and how quickly the result comes back.',
    subsections: [
      {
        code: '2.1',
        title: 'Lovable Setup',
        timing: '2 minutes',
        content: [
          {
            type: 'body',
            text: 'Navigate to lovable.dev, create a free account. Walk through the interface: the prompt bar, the preview panel, the deploy option. There is no code involved at any step.',
          },
        ],
      },
      {
        code: '2.2',
        title: 'First Build Prompt',
        timing: '4 minutes',
        content: [
          {
            type: 'body',
            text: 'Paste this prompt directly from Claude into the Lovable prompt bar:',
          },
          {
            type: 'prompt',
            label: 'Lovable Build Prompt — Paste from Claude',
            prompt: 'Build me a personal landing page for a second-year university student applying to internships in business or technology. The page should include: a hero section with a name, degree and year, and a one-line bio; a skills section listing four to six areas of focus or tools; a projects section with two cards, each showing a project name, a one-sentence description, and a link placeholder; and a contact section with a LinkedIn link and an email address. Use a clean, modern design with a white background, dark text, and a single accent colour. The layout should be responsive and professional.',
            tool: 'lovable',
            warning: false,
          },
          {
            type: 'body',
            text: 'Walk through the result section by section. Show what Lovable got right and flag one or two things that need adjustment.',
          },
        ],
      },
      {
        code: '2.3',
        title: 'Iteration with Follow-up Prompts',
        timing: '7 minutes',
        content: [
          {
            type: 'teachingPoint',
            text: 'Iteration is the skill. The first output from any AI tool is a draft. The follow-up prompt is where design decisions get made and the product starts to feel like yours.',
          },
          {
            type: 'prompt',
            label: 'Iteration 1 — Visual refinement',
            prompt: 'Change the accent colour to a deep navy blue and make the hero section taller with more vertical breathing room. The name should be larger and the bio should sit below it with a clear visual separation.',
            tool: 'lovable',
            warning: false,
          },
          {
            type: 'prompt',
            label: 'Iteration 2 — Content refinement',
            prompt: 'In the hero section, add a short paragraph under the bio that explains what the student is currently studying, what kind of roles they are looking for, and one sentence about what makes them different. Keep it to three sentences total.',
            tool: 'lovable',
            warning: false,
          },
          {
            type: 'prompt',
            label: 'Iteration 3 — Structural refinement',
            prompt: 'Add a fixed navigation bar at the top with links that scroll smoothly to each section: About, Skills, Projects, and Contact. The nav bar should stay visible as the user scrolls down the page.',
            tool: 'lovable',
            warning: false,
          },
          {
            type: 'prompt',
            label: 'Iteration 4 — Final polish',
            prompt: 'Make the two project cards side by side on wider screens and stacked vertically on mobile. Add a subtle shadow to each card and a hover effect that lifts the card slightly when the mouse moves over it.',
            tool: 'lovable',
            warning: false,
          },
        ],
      },
      {
        code: '2.4',
        title: 'Deployment',
        timing: '6 minutes',
        content: [
          {
            type: 'body',
            text: 'Click deploy in Lovable, wait for the URL, open in browser. Show copying the URL and pasting it into a mock email or LinkedIn message. This took under 15 minutes, required zero lines of code, and the result is a live product with a real URL you can send to a recruiter tonight.',
          },
        ],
      },
    ],
  },
  {
    id: 'section-3',
    number: 3,
    title: 'Building the Project (Technical Path)',
    duration: '20 Minutes',
    format: 'Pre-recorded',
    description: 'Take the Cursor-optimized build prompt from Claude and build the same landing page using Cursor with Claude as the underlying model, then deploy via GitHub and Vercel.',
    introFrame: 'This path uses a code editor called Cursor. Cursor has Claude built directly into it, which means you can describe what you want in plain English and have it write or edit the code for you inside your actual project files. You do not need to know how to code to follow along. Just watch how the instructions are written and what happens next.',
    subsections: [
      {
        code: '3.1',
        title: 'Setting Up Cursor',
        timing: '3 minutes',
        content: [
          {
            type: 'body',
            text: 'Navigate to cursor.sh, download and install. Open a new folder called landing-page. Show the editor layout: file explorer left, main editor center, AI chat panel right. Point out in settings that Cursor uses Claude as the underlying AI model.',
          },
        ],
      },
      {
        code: '3.2',
        title: 'Generating the Initial Project',
        timing: '8 minutes',
        content: [
          {
            type: 'prompt',
            label: 'Cursor Build Prompt — Paste from Claude',
            prompt: 'Create a personal landing page as a single index.html file with embedded CSS and no external dependencies. The page should include: a navigation bar with anchor links to each section; a hero section with a name placeholder, a degree and year placeholder, a one-line bio placeholder, and a short paragraph about the student\'s goals; a skills section with six skill tags in a flex grid; a projects section with two cards each containing a title, a one-sentence description, and a link placeholder; and a contact section with LinkedIn and email placeholders. Use a clean professional design with a white background, dark text, system fonts, and navy blue as the accent colour. The page must be fully responsive.',
            tool: 'cursor',
            warning: false,
          },
          {
            type: 'body',
            text: 'Open the generated file in a browser. Explain the HTML structure in plain English using spatial language: nav at the top, hero first, then skills, projects, contact at the bottom.',
          },
          {
            type: 'teachingPoint',
            text: 'Cursor read your instruction and wrote the entire file. The skill here is not writing HTML or knowing CSS — it is knowing how to describe what you want precisely enough that the AI can produce something usable. That skill transfers to every tool in this stack.',
          },
        ],
      },
      {
        code: '3.3',
        title: 'Refinements with Claude Code',
        timing: '5 minutes',
        content: [
          {
            type: 'prompt',
            label: 'Fix 1 — Navigation anchor links',
            prompt: 'The navigation links are not scrolling to the correct sections when clicked. Check the href values in the nav and the id attributes on each section element. Fix any mismatches so every link scrolls smoothly to the right section. Also add smooth scroll behaviour to the entire page.',
            tool: 'cursor',
            warning: false,
          },
          {
            type: 'body',
            text: 'Show the fix applied, open browser, click each nav link to confirm.',
          },
          {
            type: 'prompt',
            label: 'Fix 2 — Mobile responsiveness',
            prompt: 'In mobile view, the project cards are overflowing their container and the navigation links are too close together to tap easily. Fix the project cards so they stack vertically on screens under 768px wide, and adjust the nav so the links have enough spacing to be tappable on a phone.',
            tool: 'cursor',
            warning: false,
          },
          {
            type: 'body',
            text: 'Show the fix applied. Key message: you did not need to know how to write a media query. You described the problem and the AI fixed it.',
          },
        ],
      },
      {
        code: '3.4',
        title: 'Deploying to Vercel via GitHub',
        timing: '4 minutes',
        content: [
          {
            type: 'body',
            text: 'Run these commands in the terminal to initialize and push to GitHub:',
          },
          {
            type: 'bullets',
            items: [
              'git init — initialize a Git repository',
              'git add . and git commit -m \'initial build\' — save current state',
              'Push to a new GitHub repository',
            ],
          },
          {
            type: 'body',
            text: 'Navigate to vercel.com, sign in with GitHub, click add new project, select the repository, click deploy. Show the live URL. Open in browser. Copy and share the URL. Both paths end at the same place — a live product with a real URL.',
          },
        ],
      },
    ],
  },
  {
    id: 'section-4',
    number: 4,
    title: 'Maintenance & What Comes After Launch',
    duration: '10 Minutes',
    format: 'Pre-recorded',
    description: 'Shipping is day one, not the finish line. Post-launch maintenance, documentation, sprint planning, and the feedback loop.',
    introFrame: 'Most workshops end when the product goes live. We do not, because building something and keeping it running are two completely different skills. What you are about to see covers what happens the day after you ship: how to document what you built, how to plan what comes next, and how to use AI to make both of those things faster.',
    subsections: [
      {
        code: '4.1',
        title: 'Writing a README with Claude',
        timing: '3 minutes',
        content: [
          {
            type: 'prompt',
            label: 'README Prompt',
            prompt: 'I just built a personal landing page as a single HTML file with embedded CSS. Here is the project brief it was based on: [paste brief]. Write a README for this project. Include four sections: what it is and who it is for, how to open or run it locally, how to deploy it to Vercel, and how someone else could contribute or make changes. Write it clearly enough that someone with no technical background can follow every step.',
            tool: 'claude',
            warning: false,
          },
          {
            type: 'body',
            text: 'Walk through the output. Explain: a README is the instruction manual for your project.',
          },
        ],
      },
      {
        code: '4.2',
        title: 'Sprint Planning with Notion AI',
        timing: '4 minutes',
        content: [
          {
            type: 'body',
            text: 'Open Notion, create a new page titled "Landing Page — Feature Backlog." Type a raw list of ideas: dark mode toggle, animated hero text, contact form that sends an email, testimonials section, blog section, project filtering by category, downloadable resume button.',
          },
          {
            type: 'prompt',
            label: 'Notion AI Sprint Planning Prompt',
            prompt: 'Take this raw list of feature ideas and organize them into two sprints. Sprint 1 should include the most impactful features that are also the simplest to build. Sprint 2 should include the more complex or nice-to-have features. Format the output as a table with five columns: feature name, sprint number, effort level (low, medium, or high), expected outcome in one sentence, and the AI tool most likely to help build it.',
            tool: 'claude',
            warning: false,
          },
          {
            type: 'body',
            text: 'Explain what a sprint is in one sentence: a fixed window of time where you commit to building a specific set of things before moving on.',
          },
        ],
      },
      {
        code: '4.3',
        title: 'The Feedback Loop',
        timing: '2 minutes',
        content: [
          {
            type: 'numbered',
            items: [
              'Collect user feedback — share the URL, ask people to use it, note what they say.',
              'Use Claude to plan and implement the change — describe the feedback to Claude and ask it to update the code or the content.',
              'Redeploy — push the update to GitHub and Vercel deploys automatically.',
              'Repeat — the product never stops improving as long as you keep listening to the people using them.',
            ],
          },
          {
            type: 'body',
            text: 'The best products are not the ones with the cleverest idea. They are the ones where the builder stayed curious and kept listening to the people using them.',
          },
        ],
      },
    ],
  },
  {
    id: 'section-5',
    number: 5,
    title: 'Q&A and Closing',
    duration: '10 Minutes',
    format: 'Live',
    description: 'Send every attendee home with a clear next step, a resource in hand, and a community to keep building with.',
    subsections: [
      {
        code: '5.1',
        title: 'Open Q&A',
        timing: '5 minutes',
        content: [
          {
            type: 'body',
            text: 'Open the floor. Keep answers direct and practical. If a question goes deep into a specific tool, offer to follow up after the session.',
          },
          {
            type: 'presenterNote',
            text: 'If the room is quiet, seed the Q&A: "The most common question we get is whether you need to know how to code to use Cursor. The honest answer is no, but knowing even a little bit makes you faster. The best way to start is to build something and ask Claude to explain every line it writes. That is how most of our members learned."',
          },
        ],
      },
      {
        code: '5.2',
        title: 'Recap and Mindset Shift',
        timing: '2 minutes',
        content: [
          {
            type: 'body',
            text: 'Six stages of tonight:',
          },
          {
            type: 'numbered',
            items: [
              'You defined the problem using Gemini.',
              'You validated it and researched the market, also with Gemini.',
              'You synthesized the research into a brief and a build prompt using Claude.',
              'You built a live product using either Lovable, Replit, or Cursor with Claude.',
              'You deployed it to a real URL in under five minutes.',
              'You planned what comes next using Claude for documentation and Notion AI for sprints.',
            ],
          },
          {
            type: 'mindset',
            text: 'AI is not a shortcut and it is not a search engine. It is a co-builder. The students who get the most out of it are not the ones who type the least. They are the ones who come in with a clear goal, ask precise questions, read the output critically, and push back when it is not good enough. That is exactly what you practiced tonight. That skill transfers to every tool, every project, and every job you will ever have.',
          },
        ],
      },
      {
        code: '5.3',
        title: 'Resources and BYTE Invite',
        timing: '2 minutes',
        content: [
          {
            type: 'body',
            text: 'Distribute the Workshop Tools Reference. Walk through it in 30 seconds. Invite attendees to join BYTE — real teams, real projects, real demo days. Display QR code for feedback form. Completing the form enters them into the prize draw.',
          },
        ],
      },
      {
        code: '5.4',
        title: 'Live Prize Draw',
        timing: '1 minute',
        content: [
          {
            type: 'body',
            text: 'Select a winner from completed feedback submissions. Close with: "That is BCH x BYTE. Thank you for building with us tonight."',
          },
        ],
      },
    ],
  },
]
