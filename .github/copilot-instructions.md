# GitHub Copilot Instructions for dd-sh

## Project Overview

**dd-sh** is a Docusaurus-based documentation site for Datadog agent setup, Linux commands, and service management. The project combines:
- **Docusaurus 3.9** (React + TypeScript) for documentation
- **Tailwind CSS 4** for utility-first styling (recently added)
- **MDX** for rich markdown with embedded React components
- **Bash command reference** content focused on DevOps/monitoring

### Key Architecture Decisions

1. **Docusaurus + Infima**: Docusaurus provides the doc framework; Infima is the default theme. Tailwind is integrated with `important: true` and `preflight: false` to coexist without conflicts.
2. **MonoSpace Fonts for Code**: Custom CSS in `src/css/custom.css` enforces monospace fonts across all `<code>`, `<pre>`, `.prism-code` elements (Courier New, SF Mono, Monaco, Cascadia Code).
3. **Content Organization**: Docs split into `docs/linux/`, `docs/datadog/`, `docs/services/` with sidebar positioning via frontmatter.

---

## Development Workflow

### Essential Commands

```bash
npm start              # Dev server (port 3000), Tailwind watches files
npm run build          # Production build, optimizes CSS and output
npm run serve          # Preview production build locally
npm run clear          # Clear Docusaurus cache (.docusaurus, build dirs)
npm run typecheck      # Run TypeScript validation
```

### Common Patterns

**Adding Documentation:**
- Create `.md` or `.mdx` files in `docs/{linux,datadog,services}/`
- Add frontmatter: `sidebar_position`, `sidebar_label`, `description`, `tags`
- Files auto-appear in sidebar based on `sidebars.ts` config

**Code Blocks:**
- **Always** use triple backticks with language: ` ```bash `, ` ```yaml `, ` ```tsx `
- Avoid separate blocks for related commands—combine in one block with comments
- Font size: 1rem (recently increased from 0.875rem for readability)
- Monospace enforced via CSS custom properties

**Styling Components:**
- Use Tailwind utility classes: `className="bg-primary-500 text-white p-6 rounded-lg"`
- Reference `src/components/TailwindExample.tsx` for responsive grid/card patterns
- Custom primary colors: `primary-50` through `primary-900` (matching site theme)
- Avoid custom CSS—prefer Tailwind utilities

---

## Project-Specific Conventions

### File Organization

```
docs/
├── intro.md              # Homepage content
├── linux/
│   ├── index.md          # Linux overview
│   ├── datadog-centos-setup.md  # CentOS Datadog agent guide
│   └── oneline-commands.md
├── datadog/
│   ├── index.md          # Datadog overview
│   └── datadog-proxy-testing.md # Proxy diagnostics guide
└── services/
    ├── index.md          # Services overview
    └── service-check-commands.md

src/
├── css/custom.css        # Global CSS (Tailwind imports, font overrides)
├── components/
│   └── TailwindExample.tsx   # Reference implementation
└── pages/
    └── index.tsx         # Homepage components
```

### Markdown Conventions

**Frontmatter Template:**
```yaml
---
sidebar_position: 2
sidebar_label: "Clear Title"
description: "SEO-friendly one-liner"
tags: [keyword1, keyword2]
---
```

**Link Patterns:**
- Cross-docs: `[Link](../services/service-check-commands.md)`
- Relative path from current file; avoid `./` prefix for directory traversal

**Code Block Example:**
```markdown
### My Section

```bash
sudo systemctl status datadog-agent  # Status check
sudo systemctl restart datadog-agent # Restart
```
```

### Tailwind Usage in MDX

**Inline Components:**
```jsx
<div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
  <p className="text-blue-900 font-bold">Info:</p>
  <p className="text-blue-800">Details here</p>
</div>
```

**Responsive Grid:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards */}
</div>
```

---

## Recent Changes & Current State

### Latest Updates (Oct 2025)

1. **Tailwind CSS Integration**
   - Added `tailwindcss@4`, `@tailwindcss/postcss`, `postcss`, `autoprefixer`
   - Config: `tailwind.config.js` (custom primary palette, mono font extension)
   - PostCSS: `postcss.config.js` uses `@tailwindcss/postcss` (v4 compatibility)
   - CSS: `@tailwind` directives in `src/css/custom.css`

2. **Code Block Styling Improvements**
   - Font size: `0.875rem` → `1rem` (larger, more readable)
   - Line height: `1.5` → `1.6` (better vertical spacing)
   - Monospace fonts: Explicit stack (Courier New, SF Mono, Monaco, etc.)

3. **Documentation Cleanup**
   - Fixed broken link: `./datadog-proxy-testing.md` → `../datadog/datadog-proxy-testing.md`
   - Rebuilt `docs/linux/datadog-centos-setup.md` (removed duplicates, consistent formatting)
   - Created guides: `TAILWIND_SETUP.md`, `TAILWIND_INSTALLED.md`

### Known Constraints

- **Node 22+** required (specified in `package.json` engines)
- **Docusaurus 3.9** locks `@docusaurus/*` packages—update carefully
- **Infima conflicts**: Tailwind `corePlugins.preflight: false` prevents theme reset; keep enabled
- **Build optimization**: Production build only includes CSS for used Tailwind classes

---

## Common Tasks

### Fix Broken Links

1. Search for unresolved links in build output
2. Check relative path: count `../` levels needed to reach target
3. Example: `docs/linux/X.md` → `docs/datadog/Y.md` requires `../datadog/Y.md`

### Add New Documentation Page

1. Create file: `docs/{section}/{topic}.md`
2. Add frontmatter with `sidebar_position` (numeric, controls order)
3. Update `sidebars.ts` if adding new section
4. Run `npm start` to verify sidebar placement

### Style New Component

1. Use Tailwind classes in `.tsx` components
2. Test responsive breakpoints: `sm:`, `md:`, `lg:` prefixes
3. Reference `src/components/TailwindExample.tsx` for common patterns (cards, grids, buttons)
4. Avoid CSS files—all styling via `className="..."`

### Debug Build Issues

- **CSS not compiling**: Check `postcss.config.js` uses `@tailwindcss/postcss`
- **Tailwind classes not applying**: Verify content paths in `tailwind.config.js`
- **Markdown links broken**: Ensure relative paths use `../` correctly
- **Sidebar order wrong**: Check `sidebar_position` numbers (lower = higher in sidebar)

---

## Dependencies & Tooling

| Dependency | Version | Purpose |
|------------|---------|---------|
| `@docusaurus/core` | 3.9.2 | Doc framework |
| `@docusaurus/preset-classic` | 3.9.2 | Default theme + plugins |
| `tailwindcss` | ^4.1.16 | Utility CSS |
| `@tailwindcss/postcss` | ^4.1.16 | PostCSS plugin (v4 compatible) |
| `react` | ^19.0.0 | Component library |
| `typescript` | ~5.6.2 | Type checking |

### Build Tools in Action

- **Webpack 5**: Bundles via Docusaurus; Tailwind via PostCSS loader
- **Prism**: Syntax highlighting for code blocks (theme: light/dark)
- **MDX**: Embeds React in markdown (`.mdx` files)

---

## Testing & Validation

- **Link validation**: `npm run build` fails on broken internal links
- **Type checking**: `npm run typecheck` (runs TSC)
- **Local testing**: `npm start` watches files; refresh browser for changes

---

## File Examples for Reference

- **Component**: `src/components/TailwindExample.tsx` (responsive cards, buttons, grids)
- **CSS Setup**: `src/css/custom.css` (Tailwind imports, monospace font stack)
- **Config**: `tailwind.config.js` (primary colors, content paths)
- **Docs**: `docs/linux/datadog-centos-setup.md` (well-formatted code blocks, frontmatter)

---

**Last Updated**: October 2025  
**Maintainer Context**: Recently rebuilt documentation with monospace font standardization, Tailwind CSS integration, and link validation.
