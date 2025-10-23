---
sidebar_position: 1
sidebar_label: "One-Line Bash Commands"
description: "Essential one-liner bash commands for Linux system administration and DevOps tasks"
tags: [bash, commands, linux, one-liners, automation]
---

## Command 1: Find and Remove Large Files

Find and remove files larger than 100MB:

# One-Line Bash Commands# One-Line Bash Commands# One-Line Bash Commands

```bash

find . -type f -size +100M -exec rm -i {} \;

```

Essential bash one-liners for common DevOps and system administration tasks. Each command is designed to be typed and executed in a single line, with explanations of each component.Essential bash one-liners for common DevOps and system administration tasks. Each command is designed to be typed and executed in a single line, with explanations of each component.Essential bash one-liners for common DevOps and system administration tasks. Each command is designed to be typed and executed in a single line, with explanations of each component.

**Use Case**: Clean up disk space by finding and removing large files interactively

---

## Command 1: Find and Remove Large Files## Command 1: Find and Remove Large Files## Command 1: Find and Remove Large Files

Search and replace text across all `.txt` files on macOS:

Find and remove files larger than 100MB:```bash

```bash

find . -name "*.txt" -type f -exec sed -i '' 's/old_text/new_text/g' {} \;

```

```bash
find . -type f -size +100M -exec rm -i {} \;

For Linux systems with different sed syntax:

find . -type f -size +100M -exec rm -i {} \;

```bash

find . -name "*.txt" -type f -exec sed -i 's/old_text/new_text/g' {} \;``````

```

**Use Case**: Batch rename or update configuration values across many files

## Related Documentation

- [Service Check Commands](../services/service-check-commands.md) - systemctl service management
- [Datadog Proxy Testing](../datadog/datadog-proxy-testing.md) - Network diagnostics for Datadog
