# DD-SH Documentation

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator, and uses [Bun](https://bun.sh/) as the package manager.

## Prerequisites

Make sure you have [Bun](https://bun.sh/) installed:

```bash
# Install Bun (if not already installed)
curl -fsSL https://bun.sh/install | bash

# Or on macOS with Homebrew
brew install bun
```

## Installation

```bash
bun install
```

## Local Development

```bash
bun start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
bun run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true bun run deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> bun run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Development Commands

```bash
# Clear Docusaurus cache and build artifacts
bun run clear

# Type checking
bun run typecheck

# Serve production build locally
bun run serve
```

## Features

- 📚 **Documentation**: Comprehensive guides for Datadog agent setup, Linux commands, Windows & PowerShell
- 🐧 **Linux Guides**: CentOS setup, one-line bash commands, service management
- 🪟 **Windows Guides**: PowerShell commands, Windows service management, Datadog agent for Windows
- 🔍 **Local Search**: Fast client-side search with keyboard shortcuts (Ctrl/Cmd+K)
- 🎨 **Modern UI**: Glass-morphism design with Tailwind CSS integration
- 📱 **Responsive**: Mobile-optimized documentation experience
- ⚡ **Fast**: Powered by Bun package manager for quick installs and builds

## Documentation Structure

### Linux Commands
- Linux overview and command reference
- One-line bash commands for system administration
- Datadog CentOS setup and configuration

### Windows & PowerShell
- Windows documentation hub
- Datadog Windows Server setup
- 40+ PowerShell one-liners and scripts
- Windows service management commands

### Services Management
- systemctl commands for CentOS/Linux
- Windows service management with PowerShell
- Service monitoring and troubleshooting

### Datadog Integration
- Agent proxy configuration
- OpenJDK monitoring on CentOS
- Network proxy testing and diagnostics
- SSL certificate configuration
