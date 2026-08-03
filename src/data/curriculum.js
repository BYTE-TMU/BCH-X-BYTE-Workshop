// Each section carries a `path`: 'both' means everyone does it, 'nontech' and
// 'technical' are the two alternative build routes a student picks in 1.5.
// Subsections marked `extension: true` are take-home material — they render inside
// a collapsed disclosure and are excluded from the live 90-minute run of show.
export const sections = [
  {
    id: 'section-0',
    number: 0,
    title: 'Welcome & Setup',
    path: 'both',
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
            text: 'You have an idea. You open a blank screen. You stare at it. You close it. Most people in this room have been there. That moment exists because the gap between having an idea and knowing how to build it feels enormous. This workshop exists to close that gap. By the end of tonight, you will have gone through the full lifecycle of turning a vague idea into a live, deployed product using AI tools that are free and available right now. Whether you code or not, you will leave with the same end result: a live product with a real URL.',
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
            text: 'The finished example should look clean and professional. See it upfront before learning how it was built; the reveal at the end lands harder.',
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
            text: 'Here is every tool you will use tonight. You do not need accounts for everything right now; you will set up accounts at the start of each section. Everything here has a free tier, but two of them have limits worth knowing about before you start.',
          },
          {
            type: 'bullets',
            items: [
              'Gemini: for research, brainstorming, and validating your ideas. Free.',
              'Claude: for planning your project, and later for documentation and sprint planning. Free.',
              'Lovable: a no-code builder that turns plain English into full applications. Free plan gives 5 credits per day, so budget them.',
              'Replit: an alternative in-browser option with AI assistance and daily free credits. Your backup if Lovable runs dry.',
              'Cursor: an AI-native code editor if you want to write code. Free Hobby plan covers tonight.',
              'GitHub and Vercel: to deploy your live product to a real URL. Both free.',
            ],
          },
          {
            type: 'callout',
            variant: 'tip',
            text: 'AI tool pricing changes constantly. The limits quoted throughout this site were verified in August 2026 and every one of them is listed on the Tools page with a free alternative. If a limit has moved since, the workflow still holds: the tools are interchangeable, the method is not.',
          },
          {
            type: 'diagram',
            id: 'tool-pipeline',
          },
        ],
      },
    ],
  },
  {
    id: 'section-1',
    number: 1,
    title: 'Business Plan & Research',
    path: 'both',
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
            text: 'You will see a bad example: "I want to make an app for students." See why it fails: no defined user, no scoped features, no success metric. Then see a good brief using the personal landing page as the example.',
          },
          {
            type: 'diagram',
            id: 'brief-comparison',
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
            label: 'Weak Prompt: Do Not Use This',
            prompt: 'Make me a personal website.',
            tool: 'gemini',
            warning: true,
          },
          {
            type: 'prompt',
            label: 'Good Prompt 1: Define the problem and target user',
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
            label: 'Good Prompt 2: Research the current landscape',
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
            label: 'Good Prompt 3: Validate with recruiter perspective',
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
            label: 'Good Prompt 1: Synthesize research into a project brief',
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
            label: 'Good Prompt 2: Generate the build prompt',
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
          {
            type: 'diagram',
            id: 'two-llm-workflow',
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
      {
        code: '1.5',
        title: 'Choosing Your Path',
        timing: '2 minutes',
        content: [
          {
            type: 'body',
            text: 'You now have a project brief and a build prompt. Before you move to the next section, you need to pick one of two paths. Both paths end with the same result: a live product with a real URL. The difference is in how you get there and what you take away from the experience.',
          },
          {
            type: 'diagram',
            id: 'path-comparison',
          },
          {
            type: 'teachingPoint',
            text: 'Neither path is easier or harder than the other — they are built for different goals. If you are unsure, go with the Non-Technical Path. You can always come back and explore the Technical Path after the workshop.',
          },
          {
            type: 'pathPicker',
          },
        ],
      },
      {
        code: '1.6',
        title: 'Anatomy of a Prompt That Works',
        timing: '6 minutes',
        extension: true,
        content: [
          {
            type: 'body',
            text: 'Every good prompt you have copied so far is built from the same five parts. Once you can see them, you can write your own for any tool, for anything, without needing a template.',
          },
          {
            type: 'numbered',
            items: [
              'Context: who you are and what situation you are in. "I am a second-year business student in Toronto."',
              'Task: the single thing you want done. Not three things. One.',
              'Constraints: the boundaries. Length, tone, what to avoid, what must be included.',
              'Output format: the shape you want the answer in. A table, four sections, three bullet points, a single paragraph.',
              'Success criteria: how you will judge it. "Specific enough that I could act on it tomorrow."',
            ],
          },
          {
            type: 'body',
            text: 'Look back at the weak prompt from 1.2: "Make me a personal website." It has a task and nothing else. The model has to guess at your context, your constraints, the format, and what good would even look like — so it guesses average. Now look at Good Prompt 1 in the same subsection: context in the first sentence, task in the second, and three explicit questions that define both the constraints and the output. Same model, same effort from you, completely different answer.',
          },
          {
            type: 'mindset',
            text: 'You are not trying to find magic words. You are trying to remove the guesswork.',
          },
          {
            type: 'body',
            text: 'A useful test before you hit enter: if you handed this prompt to a competent stranger with no other information, could they do the task? If not, the missing piece is exactly what you need to add.',
          },
          {
            type: 'prompt',
            label: 'Practice: have the AI grade your prompt',
            prompt: 'Here is a prompt I am about to send to an AI tool: [paste your prompt]. Before I send it, tell me what is missing. Specifically: is my context clear, is there exactly one task or several tangled together, are my constraints explicit, have I said what format I want, and have I said how I will judge the answer? Rewrite it for me with the gaps filled in, and explain what you changed and why.',
            tool: 'claude',
            warning: false,
          },
        ],
      },
      {
        code: '1.7',
        title: 'How to Judge What the AI Gives You',
        timing: '5 minutes',
        extension: true,
        content: [
          {
            type: 'body',
            text: 'This workshop tells you to "review the output" a lot. Here is what reviewing actually means. Run every substantial AI response through four questions before you use it.',
          },
          {
            type: 'numbered',
            items: [
              'Is it specific to me, or would it apply to anyone? Generic advice is the most common failure. If the answer would work equally well for a nursing student and a finance student, it has not used your context.',
              'Can I act on it tomorrow? A good answer names concrete next steps. A weak one describes categories of things you could think about.',
              'What is it claiming as fact, and would I bet on it? Models state wrong things with total confidence. Anything that sounds like a statistic, a price, a date, or a feature of a real product needs checking.',
              'What did it quietly leave out? Ask yourself what a skeptical person would push back on. Often the model has smoothed over the hard part.',
            ],
          },
          {
            type: 'teachingPoint',
            text: 'The point is not to catch the AI being wrong for its own sake. It is that your judgement is the part of this process that cannot be automated. The students who get the most out of these tools are the ones who can tell a good answer from a plausible one.',
          },
          {
            type: 'body',
            text: 'When something is off, do not start over. Pushing back is faster and produces a better result than a fresh prompt, because the model keeps everything that was already working.',
          },
          {
            type: 'prompt',
            label: 'Pushing back productively',
            prompt: 'Your last answer was too generic in two places: [name them]. It would apply to almost any student, and I need it grounded in my specific situation, which is [restate your context]. Keep the structure you used, keep the parts that were specific, and redo only the weak sections. Where you are unsure or making an assumption, say so explicitly instead of filling the gap with something plausible.',
            tool: 'claude',
            warning: false,
          },
        ],
      },
    ],
  },
  {
    id: 'section-2',
    number: 2,
    title: 'Building the Project (No-Code Path)',
    path: 'nontech',
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
          {
            type: 'callout',
            variant: 'warning',
            text: 'Budget your credits before you start. Lovable\'s free plan gives you 5 credits per day with a 30 credit monthly cap, and unused credits do not roll over. This section uses one build prompt plus four iterations, which is roughly a full day of free credits. Spend the most on the first build prompt: it does the most work. If you are running low, pick the two iterations that matter most to you and skip the rest. If you run out entirely, Replit\'s free Starter plan gives you daily agent credits and gets you to the same place.',
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
            label: 'Build Prompt: Paste from Claude',
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
            text: 'Iteration is the real skill. The first output from any AI tool is a draft. The follow-up prompt is where your design choices get made and the product becomes yours. Each of the four prompts below costs credits, so treat them as a menu rather than a checklist: iterations 1 and 3 change the most for the least spend.',
          },
          {
            type: 'diagram',
            id: 'iteration-loop',
          },
          {
            type: 'prompt',
            label: 'Iteration 1: Visual refinement',
            prompt: 'Change the accent colour to a deep navy blue and make the hero section taller with more vertical breathing room. The name should be larger and the bio should sit below it with a clear visual separation.',
            tool: 'lovable',
            warning: false,
          },
          {
            type: 'prompt',
            label: 'Iteration 2: Content refinement',
            prompt: 'In the hero section, add a short paragraph under the bio that explains what you are currently studying, what kind of roles you are looking for, and one sentence about what makes you different. Keep it to three sentences total.',
            tool: 'lovable',
            warning: false,
          },
          {
            type: 'prompt',
            label: 'Iteration 3: Structural refinement',
            prompt: 'Add a fixed navigation bar at the top with links that scroll smoothly to each section: About, Skills, Projects, and Contact. The nav bar should stay visible as the user scrolls down the page.',
            tool: 'lovable',
            warning: false,
          },
          {
            type: 'prompt',
            label: 'Iteration 4: Final polish',
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
      {
        code: '2.5',
        title: 'When the AI Breaks Your Build',
        timing: '6 minutes',
        extension: true,
        content: [
          {
            type: 'body',
            text: 'At some point a prompt will make things worse. The page will break, a section will vanish, or the styling will fall apart. This is normal and it happens to everyone, including people who do this for a living. What separates a five-minute recovery from a lost evening is knowing the moves.',
          },
          {
            type: 'numbered',
            items: [
              'Stop prompting. The instinct is to fire another prompt immediately. Resist it. Prompting on top of a broken state usually compounds the damage, and it costs credits you cannot get back.',
              'Go back to the last version that worked. Lovable keeps a version history and Replit keeps checkpoints. Restoring is free; re-fixing is not.',
              'Change one thing at a time. If you asked for four changes and the result broke, you cannot tell which one did it. Re-ask for them one at a time.',
              'Describe the symptom, not your theory. "The projects section disappeared after the last change" gets a better fix than "I think the grid CSS is wrong."',
              'Start a fresh conversation if the model keeps repeating a broken approach. A long thread carries its own mistakes forward as context.',
            ],
          },
          {
            type: 'mindset',
            text: 'Breaking things is not evidence that you are bad at this. It is the normal texture of building anything.',
          },
          {
            type: 'prompt',
            label: 'Recovering from a broken state',
            prompt: 'The last change broke something. Here is exactly what I am seeing: [describe the symptom in plain language, and paste any error message word for word]. Before changing any code, tell me what you think caused it and what you plan to change. Fix only that one thing and leave everything else exactly as it is. If you are not confident about the cause, say so and ask me a question instead of guessing.',
            tool: 'lovable',
            warning: false,
          },
          {
            type: 'teachingPoint',
            text: 'Notice the shape of that prompt: it asks for the diagnosis before the fix. That one habit will save you more time than any other thing in this workshop.',
          },
        ],
      },
    ],
  },
  {
    id: 'section-3',
    number: 3,
    title: 'Building the Project (Code Path)',
    path: 'technical',
    description: 'Use a code editor with AI assistance to build the same landing page if you want to learn some code.',
    introFrame: 'This path uses a code editor called Cursor. It has AI built directly into it, including Claude models, which means you can describe what you want in plain English and have it write or edit the code for you inside your actual project files. You do not need to know how to code to follow along. Just watch how the instructions are written and what happens next.',
    subsections: [
      {
        code: '3.1',
        title: 'Setting Up Cursor',
        timing: '3 minutes',
        content: [
          {
            type: 'body',
            text: 'Navigate to cursor.com, download and install, and sign up for the free Hobby plan. Open a new folder called landing-page. Check out the editor layout: file explorer on the left, main editor in the center, AI chat panel on the right. In settings you can see the model picker: Cursor lets you choose which AI handles a request, including Claude models alongside its own.',
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
            label: 'Build Prompt: Paste from Claude',
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
            text: 'Cursor read your instruction and wrote the entire file. The skill here is not knowing HTML or CSS; it is knowing how to describe what you want clearly enough that the AI can produce something usable. That skill transfers to every tool you will use.',
          },
        ],
      },
      {
        code: '3.3',
        title: 'Refinements with the Cursor Agent',
        timing: '5 minutes',
        content: [
          {
            type: 'body',
            text: 'Nothing generated by an AI works perfectly the first time. Below are the two problems that show up most often in this build and the prompts that fix them. Run these in Cursor\'s AI chat on the free Hobby plan. If you already pay for Claude, Claude Code handles the same fixes from the terminal and is better at changes that span several files, but it is optional here.',
          },
          {
            type: 'prompt',
            label: 'Fix 1: Navigation anchor links',
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
            label: 'Fix 2: Mobile responsiveness',
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
            type: 'diagram',
            id: 'code-deploy-pipeline',
          },
          {
            type: 'body',
            text: 'Run these commands in the terminal to initialize and push to GitHub:',
          },
          {
            type: 'bullets',
            items: [
              'git init: initialize a Git repository',
              'git add . and git commit -m "initial build": save current state',
              'Push to a new GitHub repository',
            ],
          },
          {
            type: 'body',
            text: 'Navigate to vercel.com, sign in with GitHub, click add new project, select the repository, and click deploy. You now have a live URL. Open it in your browser and copy the URL to share with anyone. Both paths end at the same place: a live product with a real URL.',
          },
        ],
      },
      {
        code: '3.5',
        title: 'When the AI Breaks Your Build',
        timing: '6 minutes',
        extension: true,
        content: [
          {
            type: 'body',
            text: 'On the code path you get something the no-code path does not: real error messages, and version control. Both are gifts. An error message is the most useful thing you can hand an AI, and Git means no mistake is permanent.',
          },
          {
            type: 'numbered',
            items: [
              'Paste the error text verbatim. Not a summary, not a screenshot description — the actual words. Error messages contain file names and line numbers that tell the AI exactly where to look.',
              'Commit whenever something works. `git commit -m "hero section done"` costs you five seconds and gives you a point you can always return to.',
              'Use `git restore .` to throw away uncommitted changes when a fix goes sideways. This is the code path\'s undo button.',
              'Give the AI the file, not just the problem. In Cursor, open or highlight the relevant file so the model can see the actual code rather than guessing at it.',
              'If the same fix fails twice, stop and change the approach rather than the wording. Two failures usually means the model has misunderstood the structure, not the request.',
            ],
          },
          {
            type: 'prompt',
            label: 'Debugging with the exact error',
            prompt: 'Something broke after the last change. Here is the exact error, copied word for word: [paste the full error message]. Here is what I was trying to do: [one sentence]. Walk me through what this error actually means in plain language, tell me which line is causing it, then fix only that. Do not refactor anything else while you are in there.',
            tool: 'cursor',
            warning: false,
          },
          {
            type: 'mindset',
            text: 'Reading an error message instead of panicking at it is most of what being technical means.',
          },
        ],
      },
      {
        code: '3.6',
        title: 'Putting It on Your Own Domain',
        timing: '5 minutes',
        extension: true,
        content: [
          {
            type: 'body',
            text: 'A vercel.app URL works perfectly well, but yourname.com on a resume reads differently. Domains cost roughly $10 to $15 a year from a registrar like Namecheap, Cloudflare, or Porkbun, and students can often get one free for a year through the GitHub Student Developer Pack.',
          },
          {
            type: 'numbered',
            items: [
              'Buy the domain. Your own name is the safest choice; it will still be right in five years.',
              'In Vercel, open your project, go to Settings, then Domains, and add the domain you bought.',
              'Vercel shows you the DNS records to add. Copy them into your registrar\'s DNS settings exactly as shown.',
              'Wait. DNS changes usually take minutes but can take a few hours. Vercel issues the HTTPS certificate automatically once it sees the records.',
            ],
          },
          {
            type: 'callout',
            variant: 'tip',
            text: 'On the no-code path, Lovable supports custom domains too, though connecting one may require a paid plan. The DNS steps are identical either way: buy the domain, point the records where the host tells you, wait.',
          },
          {
            type: 'prompt',
            label: 'If the DNS step goes wrong',
            prompt: 'I am pointing a custom domain at a site hosted on Vercel and it is not working yet. My registrar is [registrar name]. Here are the DNS records I currently have set: [paste them]. Here is what Vercel is telling me: [paste the status message]. Explain in plain language what is wrong, what each record actually does, and exactly what I should change.',
            tool: 'claude',
            warning: false,
          },
        ],
      },
    ],
  },
  {
    id: 'section-4',
    number: 4,
    title: 'Maintenance & What Comes After Launch',
    path: 'both',
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
        title: 'Sprint Planning with AI',
        timing: '4 minutes',
        content: [
          {
            type: 'body',
            text: 'Start a document titled "Landing Page: Feature Backlog." Type a raw list of ideas: dark mode toggle, animated hero text, contact form that sends an email, testimonials section, blog section, project filtering by category, downloadable resume button. Then paste that list into Claude with the prompt below.',
          },
          {
            type: 'callout',
            variant: 'info',
            text: 'This step used to run in Notion AI. Notion now bundles its full AI features into the Business plan at $20 per member per month, so the free plan will not get you through this. The prompt below works identically in Claude on the free tier. If your team already pays for Notion Business, run it there instead and keep the backlog next to the rest of your project docs.',
          },
          {
            type: 'prompt',
            label: 'Sprint Planning Prompt',
            prompt: 'Take this raw list of feature ideas and organize them into two sprints. Sprint 1 should include the most impactful features that are also the simplest to build. Sprint 2 should include the more complex or nice-to-have features. Format the output as a table with five columns: feature name, sprint number, effort level (low, medium, or high), expected outcome in one sentence, and the AI tool most likely to help build it.',
            tool: 'claude',
            warning: false,
          },
          {
            type: 'diagram',
            id: 'sprint-visual',
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
              'Collect feedback: share your URL, ask people to use it, take notes on what they say.',
              'Plan the fix: describe the feedback to Claude and ask it to update the code or the content.',
              'Redeploy: push the update to GitHub and Vercel deploys automatically.',
              'Repeat: keep listening to the people using your product and keep improving it.',
            ],
          },
          {
            type: 'diagram',
            id: 'feedback-loop',
          },
          {
            type: 'body',
            text: 'The best products are not the ones with the cleverest idea. They are the ones where the builder stayed curious and kept listening to the people using them.',
          },
        ],
      },
      {
        code: '4.4',
        title: 'The Ten-Minute Quality Check',
        timing: '6 minutes',
        extension: true,
        content: [
          {
            type: 'body',
            text: 'AI builders produce pages that look right on the screen they were built on and fall apart everywhere else. Before you put this URL on a resume or send it to a recruiter, spend ten minutes on this list. Most of it you can check yourself in a browser.',
          },
          {
            type: 'bullets',
            items: [
              'Open it on your phone. This is the single highest-value check, because a large share of the people you send it to will open it on a phone first.',
              'Make the browser window narrow and drag it wider. Nothing should overlap, overflow, or need sideways scrolling at any width.',
              'Press Tab repeatedly. You should be able to reach every link and button, and you should always be able to see which one you are on.',
              'Check that every image has alt text. Screen readers rely on it, and so does anyone on a slow connection.',
              'Read the text against its background. Light grey on white looks elegant in a mockup and is unreadable in daylight.',
              'Click every link. AI-generated pages are full of placeholder hrefs that go nowhere.',
              'Check the page title in the browser tab. It is often left as the tool\'s default, and it is what shows up when someone bookmarks you.',
            ],
          },
          {
            type: 'prompt',
            label: 'Audit prompt',
            prompt: 'Audit my personal landing page for accessibility and mobile usability. Check specifically for: colour contrast that falls below WCAG AA, images missing alt text, headings used out of order or skipping levels, interactive elements that cannot be reached or seen when tabbing with a keyboard, tap targets too small to hit comfortably on a phone, and any layout that overflows horizontally under 400px wide. List every problem you find with the specific element it affects, ordered by how much it matters, then fix them one at a time starting with the worst.',
            tool: 'claude',
            warning: false,
          },
          {
            type: 'teachingPoint',
            text: 'Accessibility is not a separate nice-to-have you bolt on later. Nearly everything on that list also makes the page better for people with no accessibility needs at all: readable text, working links, and a layout that survives a phone screen.',
          },
        ],
      },
      {
        code: '4.5',
        title: 'What to Build Next',
        timing: '5 minutes',
        extension: true,
        content: [
          {
            type: 'body',
            text: 'The workflow you just learned is not specific to landing pages. It is: research with Gemini, structure with Claude, build with Lovable or Cursor, deploy, iterate. Here are three projects that reuse it exactly, ordered by how much of a step up each one is.',
          },
          {
            type: 'numbered',
            items: [
              'A project case study page. Take something you have already done — a case competition, a class project, a part-time job — and write it up properly: the problem, what you did, what happened. Same build, more valuable to a recruiter than a skills list.',
              'A small tool that solves an annoyance you personally have. A study timer, a group-project splitter, a course planner. The step up here is that it has logic, not just content, so you will use the iteration loop far more.',
              'Something with saved data. A habit tracker, a reading list, a club signup page. This is where you meet databases and accounts, and where Lovable and Cursor start doing genuinely impressive work on your behalf.',
            ],
          },
          {
            type: 'prompt',
            label: 'Scoping your next project',
            prompt: 'I just built and deployed a personal landing page using AI tools, and I want to build something more ambitious next. Here is what I am considering: [describe your idea in a few sentences]. Help me scope it properly. What is the smallest version that would still be genuinely useful to someone? What are the three features it absolutely needs, and what am I likely to think I need but actually do not? What is the one part of this that will be harder than I expect, and how should I approach that part first?',
            tool: 'claude',
            warning: false,
          },
          {
            type: 'mindset',
            text: 'The gap between people who build things and people who talk about building things is almost never talent. It is that one group started before they felt ready.',
          },
          {
            type: 'body',
            text: 'If you want to keep doing this with other people rather than alone, that is what BYTE is for. Every semester members join a real project team and ship something by Demo Day. The Contact page has the people to talk to.',
          },
        ],
      },
    ],
  },
]
