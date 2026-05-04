export const appendix = [
  {
    id: 'about-byte',
    category: 'About BYTE',
    questions: [
      {
        q: 'How is BYTE different from other tech clubs on campus?',
        a: "Most tech clubs at TMU focus on social events, networking mixers, or competitive programming. BYTE is project-first. Every semester, members are assigned to a real engineering team that ships a product by Demo Day. There is no passive membership — you are either building or you are learning how to build. SecureBYTE is a good example: that was not a class assignment, it was a production tool with a live backend, multiple contributors, real security controls, and an industry panel at launch.",
      },
      {
        q: 'Do you need to be a CS student to join BYTE?',
        a: 'No. We have members from engineering, business, and science. What matters is that you want to build something. We have roles beyond engineering — project management, product design, research, and documentation. The BCH x BYTE workshop itself is a direct expression of that: we are intentionally building programming for students who come from non-technical backgrounds.',
      },
      {
        q: 'How many members does BYTE have?',
        a: 'BYTE currently runs a 13-person engineering team on active projects. We are selective about membership because we prioritize quality of contribution over volume. Students who join are expected to ship, not just attend.',
      },
    ],
  },
  {
    id: 'about-tools',
    category: 'About the Tools',
    questions: [
      {
        q: 'Why Gemini and Claude specifically? Why not just pick one?',
        a: 'Each tool has a different strength. Gemini has real-time web awareness, which makes it useful for grounding research in what actually exists in the market today. Claude handles long-form reasoning and structured synthesis better — if you give it messy raw notes, it will produce a clean, logical document. Using both in sequence is not redundant. It is a workflow. You brainstorm and validate with Gemini, then synthesize with Claude.',
      },
      {
        q: 'Are these tools free?',
        a: "Both Gemini and Claude have free tiers sufficient for all workshop activities. Gemini's free tier through Google is fully capable for research queries. Claude's free tier through claude.ai handles everything in the business plan and research sections. Claude Code requires a paid Claude plan, but Cursor's free tier with its built-in AI assistant covers the same use case for the technical path. All of this is noted on the takeaway resource sheet.",
      },
      {
        q: 'What is Cursor and how is it different from just using Claude in the browser?',
        a: 'Cursor is a code editor — similar to VS Code — with Claude built directly into the editing environment. The difference is context. Claude in the browser does not know your codebase. Cursor reads your entire project, understands the file structure, sees your existing code, and makes edits directly in your files. You can highlight a block of code and ask it to fix a bug, or describe a new feature and have it write the implementation across multiple files at once.',
      },
      {
        q: 'What is Lovable and is it really no-code?',
        a: 'Lovable is a natural language application builder. You describe the product you want and Lovable generates a full deployable application from that description. It handles frontend, backend logic, and deployment. It is genuinely no-code — you do not need to touch a file or understand a programming language. The limitation is customization depth: for highly specific or complex applications you will eventually hit a ceiling. But for an MVP or proof-of-concept, it is one of the fastest paths from idea to live product that currently exists.',
      },
      {
        q: 'What is v0 by Vercel?',
        a: 'v0 is not used in this workshop. The non-technical path uses Lovable, and the technical path uses Cursor. Both are more appropriate for beginners than v0, which targets developers already familiar with React.',
      },
    ],
  },
  {
    id: 'about-logistics',
    category: 'About Logistics',
    questions: [
      {
        q: 'Do attendees need to bring laptops?',
        a: 'Yes. This is a hands-on workshop. A laptop is required to follow along with the implementation section. Students who do not have a laptop can still follow the demo portions — the pre-recorded sections are watchable and instructive even without active participation.',
      },
      {
        q: 'How long is the workshop and what is the format?',
        a: 'The workshop runs two hours total. The first 90 minutes is structured content across five stages: project scoping, research, design, implementation, and maintenance. There is a mix of pre-recorded demos and live demonstrations. The final 30 minutes is open Q&A, a recap, resource distribution, and a live prize draw.',
      },
      {
        q: 'Do attendees leave with anything?',
        a: 'Yes — a resource sheet listing every tool introduced, what each tool is best used for, its free tier, and recommended next steps. The goal is that someone can leave, open their laptop, and start building the same evening without doing additional research.',
      },
      {
        q: 'How many people is this workshop designed for?',
        a: 'The format works best between 20 and 60 attendees. Small enough that the live demo feels interactive, large enough to make the energy feel like an event worth attending.',
      },
    ],
  },
  {
    id: 'about-outcomes',
    category: 'About Outcomes',
    questions: [
      {
        q: 'What can a business student realistically build after this workshop?',
        a: 'A business student who follows the non-technical path can realistically leave the workshop and deploy a working web application within a few hours. It will not be a production-grade product, but it will be a functional proof of concept with a real URL, a real interface, and real logic behind it. A lot of business students have ideas they never test because the barrier to building feels too high. This workshop removes that barrier.',
      },
      {
        q: 'Will this actually help students in job interviews or internship applications?',
        a: 'Yes, directly. Being able to say you built and deployed a product — even a simple one — is more credible than listing tools on a resume. More concretely: the research and prompting skills taught in the business plan section apply immediately to case competitions, consulting projects, market research, and product management interviews. The LLM research workflow is transferable to almost any professional context.',
      },
      {
        q: 'Is this content available anywhere else on campus?',
        a: 'Not in this format. There are courses that touch on AI tools and there are hackathons where students build things, but there is no existing programming at TMU that walks a non-technical audience through the full lifecycle — from idea to brief to deployed product to maintenance plan — in a single session with real tools and live guidance.',
      },
    ],
  },
  {
    id: 'about-partnership',
    category: 'About the Partnership',
    questions: [
      {
        q: 'Why does BYTE want to work with BCH specifically?',
        a: "BYTE members are strong builders, but building without business context produces technically interesting tools that nobody uses. BCH students understand users, markets, and value creation in ways that most engineering students do not. A partnership produces better projects and better professionals on both sides.",
      },
      {
        q: 'Is this a one-time event or an ongoing partnership?',
        a: 'This workshop is designed to be the first in an ongoing series. Each iteration can cover a different domain — research tools, product analytics, AI agents, or automation. The structure is repeatable and the tooling evolves fast enough that there will always be new material worth covering.',
      },
      {
        q: 'What does BYTE get out of this partnership?',
        a: 'Three things. Our members get to teach, which deepens understanding. We get visibility with a community we do not currently reach. And co-hosting with BCH strengthens our positioning as a cross-disciplinary organization, which matters when we approach industry partners and sponsors.',
      },
      {
        q: 'Who would be presenting?',
        a: 'Presentation is led by BYTE executive members and senior contributors who have direct experience with the tools and projects being discussed. Every person on stage can speak credibly from experience, not just from slides.',
      },
    ],
  },
  {
    id: 'pushback-skepticism',
    category: 'Pushback and Skepticism',
    questions: [
      {
        q: 'AI tools change very fast. Will this content be outdated quickly?',
        a: 'The tools change, but the principles do not. Knowing how to write a strong prompt, how to scope a project, how to structure research, and how to iterate on a design are skills that transfer regardless of which specific tool is best in a given month. We update the specific tool recommendations each time we run the workshop, but the underlying curriculum stays stable.',
      },
      {
        q: 'Isn\'t there a risk that students just rely on AI and do not actually learn anything?',
        a: "This is a fair concern and something we address directly in the workshop. The framing we use: AI is a co-builder, not a replacement for judgment. The students who get the most out of these tools are the ones who know what they want, can evaluate what they get back, and can direct the AI when it goes wrong. The workshop is structured to build that judgment, not to shortcut it.",
      },
      {
        q: 'What if students have no idea what they want to build?',
        a: 'The business plan section addresses this. We start with the problem, not the product. We teach students to identify a frustration they or someone they know has experienced and work backwards to a product idea. Gemini is particularly useful at this stage — describe a general problem space and ask it to help narrow down to a concrete, buildable idea.',
      },
    ],
  },
]
