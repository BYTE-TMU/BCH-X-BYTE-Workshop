export const sections = [
  {
    id: 'section-0',
    number: 0,
    title: 'Welcome & Setup',
    duration: '10 Minutes',
    description: 'Get oriented before you start. Understand the format, the example project, and what you will build tonight.',
    subsections: [
      {
        code: '0.1',
        title: 'Welcome and Introductions',
        timing: '2 minutes',
        content: [
          {
            type: 'body',
            text: 'Welcome to the workshop! You will meet the facilitators and get introduced to what you are going to build. We will spend two hours going through a mix of guided walkthroughs and hands-on building. You can ask questions at any point, and there will be a prize draw at the end for completing the feedback form.',
          },
          {
            type: 'presenterNote',
            text: 'Take a quick show of hands: who has used an LLM like Gemini or Claude before? Who has tried to build anything technical before, even a website? This helps the facilitators know what pace to go at. If you have used these tools before, help someone sitting next to you.',
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
            text: 'You have an idea. You open a blank screen. You stare at it. You close it. Most people in this room have been there. That moment exists because the gap between having an idea and knowing how to build it feels enormous. This workshop exists to close that gap. By the end of tonight, you will have gone through the full lifecycle of turning a vague idea into a live, deployed product using AI tools that are free and available right now. Whether you code or not, you will leave with the same end result — a live product with a real URL.',
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
            text: 'The project for tonight: a personal landing page that introduces who you are, what you are studying, and what you are building or looking for. Every student needs one. It is useful the moment you leave tonight. You will build a finished page with a hero section with your name and bio, a skills section, a projects section, and a contact section.',
          },
          {
            type: 'presenterNote',
            text: 'The finished example should look clean and professional. See it upfront before learning how it was built — the reveal at the end lands harder.',
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
            text: 'Here is every tool you will use tonight. You do not need accounts for everything right now — you will set up accounts at the start of each section.',
          },
          {
            type: 'bullets',
            items: [
              'Gemini — for research, brainstorming, and validating your ideas.',
              'Claude — for planning your project and all coding and building.',
              'Lovable — a no-code builder that uses AI to create full applications from plain English.',
              'Replit — an alternative in-browser option with AI assistance, no setup needed.',
              'Cursor — an AI-native code editor if you want to write code.',
              'Claude Code — for making targeted edits across multiple files if using Cursor.',
              'GitHub and Vercel — to deploy your live product to a real URL.',
              'Claude and Notion AI — for documenting and planning what comes next.',
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
    description: 'Turn a vague idea into a clear project plan using AI tools for research and planning.',
    subsections: [
      {
        code: '1.1',
        title: 'What Is a Project Brief and Why Does It Matter?',
        timing: '5 minutes',
        content: [
          {
            type: 'body',
            text: 'A project brief answers four questions before you start building. Think of it like an outline before you write an essay.',
          },
          {
            type: 'numbered',
            items: [
              'What is the problem you are solving?',
              'Who has this problem?',
              'What are the three to five core features that solve it?',
              'How will you know it worked?',
            ],
          },
          {
            type: 'body',
            text: 'You will see a bad example: "I want to make an app for students." See why it fails — no defined user, no scoped features, no success metric. Then see a good brief using the personal landing page as the example.',
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
            text: 'Open Gemini at gemini.google.com. Sign in with a Google account. Gemini has real-time web awareness, so its research is grounded in what exists today, not just training data.',
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
            label: 'Good Prompt 1 — Define the problem and target user',
            prompt: 'I am a second-year business student at a university in Toronto. I want to build a personal landing page that helps me stand out when applying to internships and co-ops. Help me understand: what problem does this actually solve, who else has this problem, and what should a strong student landing page actually include to be genuinely useful to a recruiter?',
            tool: 'gemini',
            warning: false,
          },
          {
            type: 'body',
            text: 'Review the output. Highlight two or three things Gemini got right. Note one or two things that are too generic.',
          },
          {
            type: 'prompt',
            label: 'Good Prompt 2 — Research the current landscape',
            prompt: 'What tools do university students currently use to build personal landing pages? What are the most common ones, and what do students say is missing or frustrating about them? I want to understand what already exists before I decide what to build.',
            tool: 'gemini',
            warning: false,
          },
          {
            type: 'body',
            text: 'Notice when Gemini cites or references real tools or sources.',
          },
          {
            type: 'prompt',
            label: 'Good Prompt 3 — Validate with recruiter perspective',
            prompt: 'What do recruiters and hiring managers actually look for when they visit a student\'s personal website? Give me specific things, not general advice. I want to know what makes the difference between a page they spend 30 seconds on versus one they actually send to the hiring team.',
            tool: 'gemini',
            warning: false,
          },
          {
            type: 'teachingPoint',
            text: 'Gemini is doing two things at once: brainstorming and validating. It generates ideas while grounding them in real market context. That combination is why it is a great starting point. Do not skip to building without this step.',
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
            text: 'Switch to Claude at claude.ai. Sign in. Claude is purpose-built for long-form reasoning and turning messy notes into clear plans.',
          },
          {
            type: 'prompt',
            label: 'Good Prompt 1 — Synthesize research into a project brief',
            prompt: 'I have been researching a personal landing page for university students applying to internships. Here is what I found from my research session: [paste Gemini output here]. Using this research, write me a structured project brief with exactly four sections: one, the problem statement in two to three sentences; two, the target user in one clear sentence; three, exactly three core features the page must have; four, two specific success metrics that would tell me this page is working. Keep it concise, practical, and free of jargon.',
            tool: 'claude',
            warning: false,
          },
          {
            type: 'body',
            text: 'Review the output section by section. See how it takes your raw notes and turns them into a clean one-pager. Ask yourself if you would change anything and show how a follow-up prompt can make that change immediately.',
          },
          {
            type: 'prompt',
            label: 'Good Prompt 2 — Generate the build prompt',
            prompt: 'Now take this project brief and write me two build prompts. The first should be optimized for pasting into Lovable, which is a natural language app builder with no code required. The second should be optimized for pasting into Cursor, which is a code editor with AI assistance. Both prompts should describe the same personal landing page but be framed appropriately for each tool\'s strengths. Make the prompts specific enough that someone with no technical background could use them.',
            tool: 'claude',
            warning: false,
          },
          {
            type: 'body',
            text: 'See both prompts side by side. These are the exact prompts you will use in the next sections.',
          },
          {
            type: 'teachingPoint',
            text: 'The two-LLM workflow is powerful. Gemini gave you breadth and real-world grounding. Claude gave you structure and something actionable. Using one tool for both would produce weaker results at each step.',
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
              'Prompting in one sentence and expecting a finished result. A prompt is the start of a conversation, not a command. The follow-up is where the real value is.',
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
    title: 'Building the Project (No-Code Path)',
    duration: '20 Minutes',
    description: 'Take the plan you wrote and build a live, deployed personal landing page with zero lines of code.',
    introFrame: 'You are about to see what it looks like to go from the plan you just wrote to a live, deployed product. The person in this walkthrough has no technical background. They are using the same plan you just created. Watch for how they describe what they want and how quickly the result comes back.',
    subsections: [
      {
        code: '2.1',
        title: 'Lovable Setup',
        timing: '2 minutes',
        content: [
          {
            type: 'body',
            text: 'Navigate to lovable.dev and create a free account. Walk through the interface: the prompt bar, the preview panel, and the deploy option. There is no code involved at any step.',
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
            text: 'Paste this prompt directly into the Lovable prompt bar:',
          },
          {
            type: 'prompt',
            label: 'Build Prompt — Paste from Claude',
            prompt: 'Build me a personal landing page for a second-year university student applying to internships in business or technology. The page should include: a hero section with a name, degree and year, and a one-line bio; a skills section listing four to six areas of focus or tools; a projects section with two cards, each showing a project name, a one-sentence description, and a link placeholder; and a contact section with a LinkedIn link and an email address. Use a clean, modern design with a white background, dark text, and a single accent colour. The layout should be responsive and professional.',
            tool: 'lovable',
            warning: false,
          },
          {
            type: 'body',
            text: 'Review the result section by section. See what Lovable got right and identify one or two things that need adjustment.',
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
            text: 'Iteration is the real skill. The first output from any AI tool is a draft. The follow-up prompt is where your design choices get made and the product becomes yours.',
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
            prompt: 'In the hero section, add a short paragraph under the bio that explains what you are currently studying, what kind of roles you are looking for, and one sentence about what makes you different. Keep it to three sentences total.',
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
            text: 'Click deploy in Lovable, wait for the URL, and open it in your browser. You can now copy the URL and paste it into a message or LinkedIn. This took under 15 minutes, required zero lines of code, and the result is a live product with a real URL you can send to anyone tonight.',
          },
        ],
      },
    ],
  },
  {
    id: 'section-3',
    number: 3,
    title: 'Building the Project (Code Path)',
    duration: '20 Minutes',
    description: 'Use a code editor with AI assistance to build the same landing page if you want to learn some code.',
    introFrame: 'This path uses a code editor called Cursor. Cursor has Claude built directly into it, which means you can describe what you want in plain English and have it write or edit the code for you inside your actual project files. You do not need to know how to code to follow along. Just watch how the instructions are written and what happens next.',
    subsections: [
      {
        code: '3.1',
        title: 'Setting Up Cursor',
        timing: '3 minutes',
        content: [
          {
            type: 'body',
            text: 'Navigate to cursor.sh, download and install. Open a new folder called landing-page. Check out the editor layout: file explorer on the left, main editor in the center, AI chat panel on the right. You can see in settings that Cursor uses Claude as the underlying AI.',
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
            label: 'Build Prompt — Paste from Claude',
            prompt: 'Create a personal landing page as a single index.html file with embedded CSS and no external dependencies. The page should include: a navigation bar with anchor links to each section; a hero section with a name placeholder, a degree and year placeholder, a one-line bio placeholder, and a short paragraph about your goals; a skills section with six skill tags in a flex grid; a projects section with two cards each containing a title, a one-sentence description, and a link placeholder; and a contact section with LinkedIn and email placeholders. Use a clean professional design with a white background, dark text, system fonts, and navy blue as the accent colour. The page must be fully responsive.',
            tool: 'cursor',
            warning: false,
          },
          {
            type: 'body',
            text: 'Open the generated file in a browser. You will see the HTML structure in plain language: nav at the top, hero first, then skills, projects, contact at the bottom.',
          },
          {
            type: 'teachingPoint',
            text: 'Cursor read your instruction and wrote the entire file. The skill here is not knowing HTML or CSS — it is knowing how to describe what you want clearly enough that the AI can produce something usable. That skill transfers to every tool you will use.',
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
            text: 'See the fix applied. Open your browser and click each nav link to confirm it works.',
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
            text: 'See the fix applied. Key message: you did not need to know how to write a media query. You described the problem and the AI fixed it.',
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
              'git add . and git commit -m "initial build" — save current state',
              'Push to a new GitHub repository',
            ],
          },
          {
            type: 'body',
            text: 'Navigate to vercel.com, sign in with GitHub, click add new project, select the repository, and click deploy. You now have a live URL. Open it in your browser and copy the URL to share with anyone. Both paths end at the same place — a live product with a real URL.',
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
    description: 'Learn what happens after you ship: documentation, planning what to build next, and how to keep improving your product.',
    introFrame: 'Most workshops end when the product goes live. This one does not, because shipping is day one, not the finish line. What comes next covers what to do after launch: how to document what you built, how to plan what comes next, and how to use AI to make both faster.',
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
            text: 'Review the output. A README is the instruction manual for your project. It helps anyone who looks at your work understand what it is and how to use it.',
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
            text: 'Open Notion and create a new page titled "Landing Page — Feature Backlog." Type a raw list of ideas: dark mode toggle, animated hero text, contact form that sends an email, testimonials section, blog section, project filtering by category, downloadable resume button.',
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
            text: 'A sprint is a fixed window of time where you commit to building a specific set of things before moving on. This helps you stay focused and make progress.',
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
              'Collect feedback — share your URL, ask people to use it, take notes on what they say.',
              'Plan the fix — describe the feedback to Claude and ask it to update the code or the content.',
              'Redeploy — push the update to GitHub and Vercel deploys automatically.',
              'Repeat — keep listening to the people using your product and keep improving it.',
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
]
