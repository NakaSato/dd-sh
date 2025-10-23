# Tailwind CSS Integration Guide

## Overview

This project now includes **Tailwind CSS** for utility-first styling. Tailwind is configured to work alongside Docusaurus and Infima, allowing you to use utility classes in your documentation.

## Installation Complete ✅

- ✅ `tailwindcss` - Core framework
- ✅ `postcss` - CSS processing
- ✅ `autoprefixer` - Browser compatibility

## Configuration Files

### 1. `tailwind.config.js`
Main Tailwind configuration with:
- Custom primary color palette (matching your site theme)
- Extended mono font family for code blocks
- Optimized for Docusaurus content

### 2. `postcss.config.js`
PostCSS configuration for processing Tailwind directives

### 3. `src/css/custom.css`
Updated to import Tailwind directives:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Usage Examples

### In React Components

```jsx
export function MyComponent() {
  return (
    <div className="p-6 bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Welcome</h2>
      <p className="text-gray-100">Using Tailwind CSS in Docusaurus</p>
    </div>
  );
}
```

### In MDX Files

```mdx
<div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
  <p className="text-blue-900 font-semibold">Info Message</p>
  <p className="text-blue-800">This uses Tailwind CSS utilities</p>
</div>
```

### Custom Components with Tailwind

```jsx
export function CodeBlock({ children, language }) {
  return (
    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
      <pre><code className="language-{language}">{children}</code></pre>
    </div>
  );
}
```

## Custom Theme Colors

Primary color palette available:
- `bg-primary-50` through `bg-primary-900`
- `text-primary-50` through `text-primary-900`
- `border-primary-50` through `border-primary-900`

## Mono Font Class

Use `font-mono` class for monospace styling:

```html
<code className="font-mono text-sm">npm install</code>
```

## Common Tailwind Classes

### Spacing & Layout
- `p-4` - Padding
- `m-2` - Margin
- `flex`, `grid` - Layout
- `gap-4` - Spacing between items

### Colors
- `bg-blue-500` - Background color
- `text-white` - Text color
- `border-gray-300` - Border color

### Typography
- `text-lg` - Font size
- `font-bold` - Font weight
- `font-mono` - Monospace font

### Visual Effects
- `shadow-lg` - Box shadow
- `rounded-lg` - Border radius
- `opacity-50` - Opacity

### Responsive Design
- `md:text-2xl` - Medium screens and up
- `lg:p-8` - Large screens and up
- `sm:hidden` - Hide on small screens

## Important Notes

1. **Infima + Tailwind**: Configuration includes `important: true` to prevent conflicts with Infima
2. **Preflight Disabled**: `corePlugins.preflight: false` prevents Tailwind from resetting Infima styles
3. **Content Paths**: Tailwind scans all files in `src/`, `docs/`, and `blog/` directories
4. **Build Performance**: Tailwind only includes classes you actually use

## Next Steps

1. **Start using Tailwind classes** in your components and MDX files
2. **Check Tailwind documentation** at https://tailwindcss.com
3. **Customize theme** in `tailwind.config.js` as needed
4. **Run build** to test: `npm run build`

## Troubleshooting

### Classes not working?
- Verify PostCSS configuration
- Ensure file extensions are included in `content` array
- Check that `custom.css` is imported in your layout

### Conflicts with Infima?
- The `important: true` rule handles this
- Use `corePlugins.preflight: false` if styles reset unexpectedly

### Performance issues?
- Tailwind only includes used classes in production
- Check that content paths are configured correctly
- Build in production mode: `npm run build`

## Learning Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com)
- [Docusaurus + Tailwind Guide](https://docusaurus.io/docs/styling-layout)

---

Happy styling! 🎨
