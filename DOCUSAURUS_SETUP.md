# 🚀 Docusaurus Setup & Usage Guide

Complete guide for setting up and running the Docusaurus documentation website for DevOps Bash Commands.

## 📋 Prerequisites

- **Node.js**: v14.0 or higher
- **npm**: v6.0 or higher (or yarn)
- **Git**: For version control
- **Text Editor**: VS Code or similar

## 🎯 Quick Setup (5 Minutes)

### 1. Install Node.js and npm

**macOS** (using Homebrew):
```bash
brew install node
```

**Linux** (CentOS/RHEL):
```bash
sudo yum install nodejs npm
```

**Windows**:
- Download from [nodejs.org](https://nodejs.org/)

### 2. Navigate to Docusaurus Directory
```bash
cd /Users/chanthawat/Developments/dd-sh/docusaurus
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start Development Server
```bash
npm run start
```

The site will open automatically at `http://localhost:3000`

## 📖 Project Structure

```
docusaurus/
├── docs/                          # Documentation content
│   ├── intro.md                   # Main introduction
│   ├── quickstart.md              # Quick start guide
│   ├── linux/                     # Linux commands section
│   │   └── intro.md
│   ├── datadog/                   # Datadog section
│   │   └── intro.md
│   ├── services/                  # Service management section
│   │   └── intro.md
│   ├── monitoring/                # Monitoring guides
│   ├── devops/                    # DevOps best practices
│   └── ...
├── blog/                          # Blog posts
├── src/                           # React components
│   ├── css/
│   │   └── custom.css            # Custom styling
│   ├── components/                # Reusable components
│   └── pages/                     # Custom pages
│       └── index.js               # Homepage
├── static/                        # Static assets
│   └── img/                       # Images
├── docusaurus.config.js          # Main configuration
├── sidebars.js                   # Navigation structure
├── package.json                  # Dependencies
└── .gitignore                    # Git settings
```

## 🛠️ Common Commands

### Development

```bash
# Start development server with hot reload
npm run start

# Clear cache and build
npm run clear && npm run build
```

### Building

```bash
# Build static site for production
npm run build

# Serve production build locally
npm run serve
```

### Documentation Management

```bash
# Write translations
npm run write-translations

# Write heading IDs
npm run write-heading-ids

# Swizzle (customize) Docusaurus components
npm run swizzle
```

## 📝 Writing Documentation

### Creating a New Document

1. **Create markdown file** in appropriate folder:
```bash
# Example: Create new Linux command guide
touch docs/linux/bash-tricks.md
```

2. **Add frontmatter** at the top:
```yaml
---
sidebar_position: 5
slug: /linux/bash-tricks
---

# Bash Tricks and Tips

Your content here...
```

3. **Update sidebar** in `sidebars.js`:
```javascript
{
  type: 'category',
  label: 'Linux Commands',
  items: [
    'linux/intro',
    'linux/bash-tricks',  // Add new document here
  ],
}
```

### Markdown Formatting

#### Headings
```markdown
# H1 - Page Title
## H2 - Section
### H3 - Subsection
```

#### Code Blocks
```markdown
\`\`\`bash
# This is bash code
echo "Hello, World!"
\`\`\`

\`\`\`yaml
# This is YAML
api_key: your_key_here
\`\`\`
```

#### Lists
```markdown
- Unordered list item 1
- Item 2
  - Nested item

1. Ordered list item
2. Item 2
   1. Nested ordered
```

#### Tables
```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

#### Links
```markdown
[Link text](https://example.com)
[Link to doc](../other-page.md)
[Link to heading](#section-id)
```

#### Callouts (Admonitions)
```markdown
:::note
This is a note
:::

:::info
This is information
:::

:::warning
This is a warning
:::

:::danger
This is a danger warning
:::

:::tip
This is a helpful tip
:::
```

## 🎨 Customization

### Styling

Edit `src/css/custom.css` to customize colors and fonts:

```css
:root {
  --ifm-color-primary: #2e8555;  /* Primary color */
  --ifm-code-font-size: 95%;     /* Code font size */
}

[data-theme='dark'] {
  --ifm-color-primary: #25c2a0;  /* Dark mode color */
}
```

### Site Configuration

Edit `docusaurus.config.js` to change:
- Site title and tagline
- Site URL
- Navigation bar items
- Footer links
- Theme settings

### Navigation Structure

Edit `sidebars.js` to organize documentation:

```javascript
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'intro',
        'quickstart',
      ],
    },
    // Add more sections...
  ],
};
```

## 🚀 Deployment

### Build Production Site

```bash
npm run build
```

This creates a `build/` directory with static files.

### Deploy to GitHub Pages

1. Update `docusaurus.config.js`:
```javascript
organizationName: 'your-github-org',
projectName: 'dd-sh',
baseUrl: '/dd-sh/',  // if repo is not main domain
```

2. Deploy:
```bash
npm run deploy
```

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel --prod
```

### Deploy to Netlify

1. Build the site:
```bash
npm run build
```

2. Deploy `build/` folder to Netlify:
```bash
netlify deploy --prod --dir=build
```

### Deploy to AWS S3

1. Install AWS CLI:
```bash
pip install awscli
```

2. Deploy:
```bash
aws s3 sync build/ s3://your-bucket-name/ --delete
```

## 🔍 Search Functionality

Docusaurus includes built-in search powered by Algolia. To enable:

1. Sign up at [Algolia](https://www.algolia.com/)
2. Create an app and index
3. Add credentials to `docusaurus.config.js`:

```javascript
themeConfig: {
  algolia: {
    apiKey: 'your-api-key',
    appId: 'your-app-id',
    indexName: 'your-index',
  },
}
```

## 📱 Responsive Design

The site is mobile-responsive by default. Test on different devices:

```bash
# Development with responsive viewer
npm run start
# Then open DevTools with F12 and select device view
```

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Check what's using port 3000
lsof -i :3000

# Use different port
npm run start -- --port 3001
```

### Build Errors

```bash
# Clear cache
npm run clear

# Rebuild
npm run build
```

### Module Not Found

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Sidebar Not Updated

1. Ensure `sidebars.js` is saved
2. Restart dev server: Stop with Ctrl+C and run `npm run start` again
3. Clear browser cache

## 📚 Useful Resources

- [Docusaurus Docs](https://docusaurus.io/docs)
- [Markdown Guide](https://docusaurus.io/docs/markdown-features)
- [API Reference](https://docusaurus.io/docs/api/plugin-content-docs)
- [Docusaurus GitHub](https://github.com/facebook/docusaurus)

## 🎓 Best Practices

1. **Organize Content**: Group related documents in categories
2. **Use Frontmatter**: Always include sidebar_position for ordering
3. **Add Images**: Place in `static/img/` and reference as `/img/filename.jpg`
4. **Internal Links**: Use relative paths for better portability
5. **Code Examples**: Test all bash commands before documenting
6. **Versioning**: Use git tags for major versions
7. **Documentation Updates**: Keep docs in sync with code changes

## 📞 Getting Help

### Check Documentation
- Visit [docusaurus.io](https://docusaurus.io)
- Read error messages carefully

### Common Issues
```bash
# Clear everything and start fresh
rm -rf node_modules package-lock.json build
npm install
npm run start
```

### Community Support
- [Docusaurus GitHub Discussions](https://github.com/facebook/docusaurus/discussions)
- [Docusaurus Discord](https://discord.gg/docusaurus)

---

**Happy Documenting!** 🎉
