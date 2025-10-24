---
sidebar_position: 3
sidebar_label: "Windows"
description: "Windows Server and PowerShell documentation hub"
tags: [windows, powershell, windows-server, administration]
---

# Windows Documentation

Comprehensive guides for Windows Server administration, PowerShell scripting, and Datadog agent setup on Windows systems.

## Documentation Sections

### [Datadog Windows Setup](./datadog-windows-setup.md)
Complete guide to installing, configuring, and managing Datadog Agent on Windows Server systems using PowerShell and GUI tools.

### [PowerShell Commands](./powershell-commands.md)
Essential PowerShell one-liners and scripts for Windows system administration, monitoring, and DevOps tasks.

### [Windows Service Management](./windows-service-management.md)
Comprehensive commands for managing Windows services, including checking status, starting/stopping services, and troubleshooting.

## Quick Reference

### Common PowerShell Commands

```powershell
# Check service status
Get-Service -Name "ddagent"

# Restart Datadog Agent
Restart-Service -Name "ddagent"

# View system information
Get-ComputerInfo

# Check disk space
Get-PSDrive -PSProvider FileSystem
```

### Administrative Tasks

- **Run as Administrator**: Right-click PowerShell → "Run as Administrator"
- **Execution Policy**: `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`
- **Check Windows Version**: `Get-ComputerInfo | Select-Object WindowsVersion, OsHardwareAbstractionLayer`

## Prerequisites

- Windows Server 2012 R2 or later (or Windows 10/11 for workstations)
- PowerShell 5.1 or later (PowerShell 7+ recommended)
- Administrator privileges for system-level operations
- Internet connectivity for package installations

## Getting Started

1. **Open PowerShell as Administrator**
   - Press `Win + X` → Select "Windows PowerShell (Admin)" or "Terminal (Admin)"
   - Or search "PowerShell" → Right-click → "Run as administrator"

2. **Verify PowerShell Version**
   ```powershell
   $PSVersionTable.PSVersion
   ```

3. **Enable Script Execution** (if needed)
   ```powershell
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
   ```

## Resources

- [Microsoft PowerShell Documentation](https://docs.microsoft.com/en-us/powershell/)
- [Datadog Windows Agent Documentation](https://docs.datadoghq.com/agent/basic_agent_usage/windows/)
- [Windows Server Documentation](https://docs.microsoft.com/en-us/windows-server/)
