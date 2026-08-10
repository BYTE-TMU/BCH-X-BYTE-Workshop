/** @type {import('tailwindcss').Config} */

// Every colour resolves through a CSS custom property holding an "R G B" triplet.
// The triplet form (not `#hex`) is what lets Tailwind keep opacity modifiers working:
// `bg-accent/40` still compiles. Swapping the properties under `html.dark` is therefore
// the entire dark theme — no `dark:` variant is needed for anything on this palette.
const token = (name) => `rgb(var(${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ---- Semantic surfaces -------------------------------------------------
        surface: {
          base: token('--surface-base'),
          sunken: token('--surface-sunken'),
          raised: token('--surface-raised'),
          overlay: token('--surface-overlay'),
          hover: token('--surface-hover'),
          // Stays dark in both themes — the footer and the "keep building" panel are
          // deliberately inverted blocks, not surfaces that follow the theme.
          inverse: token('--surface-inverse'),
        },

        // ---- Text ("ink" so the class reads `text-ink`, not `text-text-primary`) --
        ink: {
          DEFAULT: token('--ink'),
          secondary: token('--ink-secondary'),
          tertiary: token('--ink-tertiary'),
          inverse: token('--ink-inverse'),
          inverseDim: token('--ink-inverse-dim'),
        },

        // ---- Hairlines ---------------------------------------------------------
        line: {
          DEFAULT: token('--line'),
          strong: token('--line-strong'),
        },

        // ---- Accent ------------------------------------------------------------
        accent: {
          DEFAULT: token('--accent'),
          hover: token('--accent-hover'),
          subtle: token('--accent-subtle'),
          on: token('--accent-on'),
          band: token('--accent-band'),
        },

        // Text that sits on a filled colour field rather than on a surface.
        // These flip with the theme because the fields underneath them do.
        on: {
          path: token('--on-path'),
          band: token('--on-band'),
          bandDim: token('--on-band-dim'),
        },

        // ---- Build paths -------------------------------------------------------
        path: {
          both: token('--path-both'),
          bothLight: token('--path-both-subtle'),
          technical: token('--path-technical'),
          techLight: token('--path-technical-subtle'),
          nontech: token('--path-nontech'),
          nontechLight: token('--path-nontech-subtle'),
        },

        // ---- Status ------------------------------------------------------------
        state: {
          info: token('--state-info'),
          infoSubtle: token('--state-info-subtle'),
          infoLine: token('--state-info-line'),
          warn: token('--state-warn'),
          warnSubtle: token('--state-warn-subtle'),
          warnLine: token('--state-warn-line'),
          ok: token('--state-ok'),
          okSubtle: token('--state-ok-subtle'),
          okLine: token('--state-ok-line'),
        },

        // ---- Always-dark code surfaces ----------------------------------------
        code: {
          surface: token('--code-surface'),
          raised: token('--code-raised'),
          line: token('--code-line'),
          ink: token('--code-ink'),
          dim: token('--code-dim'),
        },

        // ---- Third-party tool chips -------------------------------------------
        tool: {
          gemini: token('--tool-gemini'),
          geminiSubtle: token('--tool-gemini-subtle'),
          claude: token('--tool-claude'),
          claudeSubtle: token('--tool-claude-subtle'),
          lovable: token('--tool-lovable'),
          lovableSubtle: token('--tool-lovable-subtle'),
          cursor: token('--tool-cursor'),
          cursorSubtle: token('--tool-cursor-subtle'),
        },

        // ---- Back-compat aliases ----------------------------------------------
        // The original token names, re-pointed at the semantic layer. Keeping them
        // means the ~300 existing `brand-*` classes across 28 files need no edits and
        // pick up both the contrast fix and dark mode for free.
        brand: {
          red: token('--accent'),
          redLight: token('--accent-subtle'),
          black: token('--ink'),
          white: token('--surface-base'),
          gray: token('--ink-secondary'),
          grayLight: token('--surface-sunken'),
          border: token('--line'),
        },
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },

      // Tracking is size-specific and leading tracks size inversely: small text gets
      // slightly positive tracking for legibility, display text negative because
      // letters read further apart as they grow. A single letter-spacing value is
      // wrong somewhere on the scale by definition.
      fontSize: {
        eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.12em', fontWeight: '700' }],
        caption: ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.005em' }],
        small: ['0.875rem', { lineHeight: '1.6', letterSpacing: '0' }],
        body: ['1rem', { lineHeight: '1.65', letterSpacing: '0' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '-0.005em' }],
        h3: ['1.25rem', { lineHeight: '1.35', letterSpacing: '-0.012em' }],
        h2: ['1.75rem', { lineHeight: '1.22', letterSpacing: '-0.018em' }],
        h1: ['2.25rem', { lineHeight: '1.14', letterSpacing: '-0.022em' }],
        display: ['clamp(2.5rem, 6vw, 3.75rem)', { lineHeight: '1.04', letterSpacing: '-0.032em' }],
      },

      // Overriding the stock keys rather than adding new ones: the existing class
      // distribution (rounded-lg x34, rounded-xl x11, rounded-2xl x5) becomes a
      // deliberate 4-step scale without touching a single JSX file.
      borderRadius: {
        DEFAULT: '8px',
        sm: '6px',
        md: '8px',
        lg: '10px',
        xl: '14px',
        '2xl': '20px',
      },

      // Same trick for elevation. Two layered shadows per step (a tight contact
      // shadow plus a wide ambient one) read as real depth where a single blur reads
      // as a smudge. The colour and strength are custom properties so the dark theme
      // can deepen them — a light-tinted shadow is invisible on a dark surface.
      boxShadow: {
        sm: '0 1px 2px rgb(var(--shadow-color) / var(--shadow-a1)), 0 1px 1px rgb(var(--shadow-color) / var(--shadow-b1))',
        DEFAULT:
          '0 4px 12px rgb(var(--shadow-color) / var(--shadow-a2)), 0 1px 3px rgb(var(--shadow-color) / var(--shadow-b2))',
        md: '0 4px 12px rgb(var(--shadow-color) / var(--shadow-a2)), 0 1px 3px rgb(var(--shadow-color) / var(--shadow-b2))',
        lg: '0 4px 12px rgb(var(--shadow-color) / var(--shadow-a2)), 0 1px 3px rgb(var(--shadow-color) / var(--shadow-b2))',
        xl: '0 16px 40px rgb(var(--shadow-color) / var(--shadow-a3)), 0 4px 10px rgb(var(--shadow-color) / var(--shadow-b3))',
        '2xl':
          '0 16px 40px rgb(var(--shadow-color) / var(--shadow-a3)), 0 4px 10px rgb(var(--shadow-color) / var(--shadow-b3))',
      },

      maxWidth: {
        content: '720px',
        wide: '1100px',
      },

      transitionDuration: {
        250: '250ms',
      },

      // Spring-shaped curves for the CSS-only transitions. `out` decelerates hard at
      // the end the way a critically damped spring settles; `in` is its mirror, so a
      // reversible transition retraces the path it came in on.
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
        in: 'cubic-bezier(0.64, 0, 0.78, 0)',
        press: 'cubic-bezier(0.2, 0, 0, 1)',
      },
    },
  },
  plugins: [],
}
