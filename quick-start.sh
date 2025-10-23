#!/bin/bash

# DevOps Bash Commands - Docusaurus Quick Start
# This script helps you get the documentation site running quickly

set -e

echo "🚀 DevOps Bash Commands - Docusaurus Quick Start"
echo "================================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v14+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Navigate to docusaurus directory
echo "📂 Navigating to Docusaurus directory..."
cd my-docusaurus

# Install dependencies
echo "📦 Installing dependencies..."
echo "   (This may take a few minutes...)"
npm install

echo ""
echo "✅ Installation complete!"
echo ""
echo "🎯 Next Steps:"
echo ""
echo "   Option 1: Start development server"
echo "   $ npm run start"
echo ""
echo "   Option 2: Build for production"
echo "   $ npm run build"
echo ""
echo "   Option 3: Serve production build"
echo "   $ npm run serve"
echo ""
echo "📚 Documentation will be available at:"
echo "   http://localhost:3000"
echo ""
echo "💡 Tips:"
echo "   - Edit files in 'docs/' folder"
echo "   - Changes appear instantly in browser (hot reload)"
echo "   - Check 'sidebars.ts' to update navigation"
echo "   - Customize 'src/css/custom.css' for styling"
echo ""
echo "Ready? Start with: npm run start"
echo ""
