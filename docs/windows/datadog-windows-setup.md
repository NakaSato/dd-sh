---
sidebar_position: 1
sidebar_label: "Datadog Windows Setup"
description: "Complete Datadog Agent setup and configuration guide for Windows Server systems"
tags: [datadog, windows, setup, agent, powershell]
---

# Datadog Windows Setup

Complete guide to installing, configuring, and managing Datadog Agent on Windows Server systems using PowerShell.

## Installation

### 1. Install Datadog Agent on Windows

#### Method 1: Using PowerShell (Recommended)

Download and install the latest Datadog Agent:

```powershell
# Set your API key
$env:DD_API_KEY = "your_api_key_here"
$env:DD_SITE = "datadoghq.com"

# Download installer
Invoke-WebRequest -Uri "https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-7-latest.amd64.msi" -OutFile "$env:TEMP\datadog-agent.msi"

# Install silently
Start-Process msiexec.exe -ArgumentList "/qn /i $env:TEMP\datadog-agent.msi APIKEY=$env:DD_API_KEY SITE=$env:DD_SITE" -Wait -NoNewWindow
```

#### Method 2: Using Chocolatey

Install via Chocolatey package manager:

```powershell
# Install Chocolatey if not already installed
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install Datadog Agent
choco install datadog-agent -y --params="'/APIKEY:your_api_key_here /SITE:datadoghq.com'"
```

#### Method 3: Manual GUI Installation

1. Download the MSI installer from [Datadog Downloads](https://app.datadoghq.com/account/settings/agent/latest?platform=windows)
2. Double-click the MSI file
3. Enter your API key during installation
4. Follow the installation wizard

### 2. Verify Installation

Check if the agent is installed:

```powershell
Get-Service -Name "ddagent"
```

Check installation directory:

```powershell
Test-Path "C:\Program Files\Datadog\Datadog Agent\"
```

View agent version:

```powershell
& "C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" version
```

---

## Service Management

### Start Datadog Agent Service

```powershell
Start-Service -Name "ddagent"
```

### Stop Datadog Agent Service

```powershell
Stop-Service -Name "ddagent"
```

### Restart Datadog Agent Service

```powershell
Restart-Service -Name "ddagent"
```

### Check Agent Status

```powershell
Get-Service -Name "ddagent"
```

Detailed status with agent command:

```powershell
& "C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" status
```

### Enable Auto-start on Boot

```powershell
Set-Service -Name "ddagent" -StartupType Automatic
```

### Disable Auto-start

```powershell
Set-Service -Name "ddagent" -StartupType Manual
```

---

## Configuration

### 1. Locate Configuration File

Main configuration file location:

```powershell
C:\ProgramData\Datadog\datadog.yaml
```

Open configuration file:

```powershell
notepad "C:\ProgramData\Datadog\datadog.yaml"
```

Or use PowerShell ISE:

```powershell
ise "C:\ProgramData\Datadog\datadog.yaml"
```

### 2. Set API Key

```powershell
# Edit datadog.yaml and set api_key
(Get-Content "C:\ProgramData\Datadog\datadog.yaml") -replace 'api_key:.*', 'api_key: your_api_key_here' | Set-Content "C:\ProgramData\Datadog\datadog.yaml"
```

### 3. Configure Datadog Site

Set site for different regions:

```yaml
# US1 (default)
site: datadoghq.com

# US3
site: us3.datadoghq.com

# US5
site: us5.datadoghq.com

# EU
site: datadoghq.eu

# AP1
site: ap1.datadoghq.com
```

Edit site configuration:

```powershell
(Get-Content "C:\ProgramData\Datadog\datadog.yaml") -replace 'site:.*', 'site: datadoghq.eu' | Set-Content "C:\ProgramData\Datadog\datadog.yaml"
```

### 4. Set Hostname

```powershell
# Edit datadog.yaml
(Get-Content "C:\ProgramData\Datadog\datadog.yaml") -replace '#\s*hostname:.*', "hostname: $(hostname)" | Set-Content "C:\ProgramData\Datadog\datadog.yaml"
```

### 5. Enable/Configure Tags

Add tags to your host:

```yaml
tags:
  - env:production
  - role:webserver
  - datacenter:us-east-1
```

Using PowerShell to add tags:

```powershell
$tagsBlock = @"
tags:
  - env:production
  - role:webserver
  - datacenter:us-east-1
"@

Add-Content "C:\ProgramData\Datadog\datadog.yaml" "`n$tagsBlock"
```

### 6. Apply Configuration Changes

After editing configuration, restart the agent:

```powershell
Restart-Service -Name "ddagent"
```

Verify configuration:

```powershell
& "C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" configcheck
```

---

## Proxy Configuration

### Configure HTTP/HTTPS Proxy

Edit `datadog.yaml` to add proxy settings:

```yaml
proxy:
  http: http://proxy-server:8080
  https: https://proxy-server:8080
  no_proxy:
    - localhost
    - 127.0.0.1
```

Using PowerShell:

```powershell
$proxyConfig = @"

proxy:
  http: http://proxy-server:8080
  https: https://proxy-server:8080
  no_proxy:
    - localhost
    - 127.0.0.1
"@

Add-Content "C:\ProgramData\Datadog\datadog.yaml" $proxyConfig
Restart-Service -Name "ddagent"
```

### Test Proxy Connectivity

Test connection to Datadog API through proxy:

```powershell
# Set proxy for current session
$env:HTTP_PROXY = "http://proxy-server:8080"
$env:HTTPS_PROXY = "https://proxy-server:8080"

# Test connectivity
Invoke-WebRequest -Uri "https://api.datadoghq.com/api/v1/validate" -Proxy "http://proxy-server:8080" -Method GET
```

Test with curl (if installed):

```powershell
curl.exe -x http://proxy-server:8080 https://api.datadoghq.com/api/v1/validate
```

---

## Monitoring & Logs

### View Agent Logs

```powershell
Get-Content "C:\ProgramData\Datadog\logs\agent.log" -Tail 50
```

Monitor logs in real-time:

```powershell
Get-Content "C:\ProgramData\Datadog\logs\agent.log" -Wait -Tail 50
```

### Check Agent Status

Full status output:

```powershell
& "C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" status
```

Health check:

```powershell
& "C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" health
```

### View Running Checks

```powershell
& "C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" status | Select-String -Pattern "Running Checks" -Context 0,50
```

### Flare Command (Send Diagnostics to Support)

```powershell
& "C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" flare
```

With case number:

```powershell
& "C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" flare 12345
```

---

## Integration Configuration

### Enable Windows Service Integration

Create configuration file:

```powershell
New-Item -ItemType Directory -Force -Path "C:\ProgramData\Datadog\conf.d\windows_service.d"

$serviceConfig = @"
init_config:

instances:
  - services:
      - ddagent
      - wmiApSrv
      - W3SVC
"@

Set-Content "C:\ProgramData\Datadog\conf.d\windows_service.d\conf.yaml" $serviceConfig
```

### Enable IIS Integration

```powershell
New-Item -ItemType Directory -Force -Path "C:\ProgramData\Datadog\conf.d\iis.d"

$iisConfig = @"
init_config:

instances:
  - host: localhost
    port: 80
"@

Set-Content "C:\ProgramData\Datadog\conf.d\iis.d\conf.yaml" $iisConfig
Restart-Service -Name "ddagent"
```

### Enable Windows Performance Counters

```powershell
New-Item -ItemType Directory -Force -Path "C:\ProgramData\Datadog\conf.d\win32_event_log.d"

$perfConfig = @"
init_config:

instances:
  - tags:
      - environment:production
    additional_metrics:
      - ['Processor', 'processor', '% Processor Time', _Total]
      - ['Memory', 'memory', 'Available MBytes']
      - ['PhysicalDisk', 'disk', '% Disk Time', _Total]
"@

Set-Content "C:\ProgramData\Datadog\conf.d\win32_event_log.d\conf.yaml" $perfConfig
```

---

## Troubleshooting

### Check if Agent is Running

```powershell
Get-Service -Name "ddagent" | Select-Object Name, Status, StartType
```

### Check Agent Process

```powershell
Get-Process | Where-Object { $_.Name -like "*agent*" }
```

### Test Network Connectivity

Test connection to Datadog:

```powershell
Test-NetConnection -ComputerName api.datadoghq.com -Port 443
```

Test DNS resolution:

```powershell
Resolve-DnsName api.datadoghq.com
```

### View Event Logs

```powershell
Get-EventLog -LogName Application -Source "Datadog Agent" -Newest 20
```

Or using Get-WinEvent:

```powershell
Get-WinEvent -FilterHashtable @{LogName='Application'; ProviderName='Datadog Agent'} -MaxEvents 20
```

### Check Firewall Rules

List Datadog-related firewall rules:

```powershell
Get-NetFirewallRule | Where-Object { $_.DisplayName -like "*Datadog*" }
```

### Validate Configuration

```powershell
& "C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" configcheck
```

### Restart Agent with Verbose Logging

Stop the service:

```powershell
Stop-Service -Name "ddagent"
```

Run agent in foreground with debug:

```powershell
& "C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" run --log-level debug
```

---

## Uninstallation

### Remove Datadog Agent

```powershell
# Stop service
Stop-Service -Name "ddagent"

# Uninstall via MSI
$app = Get-WmiObject -Class Win32_Product | Where-Object { $_.Name -like "*Datadog*" }
$app.Uninstall()
```

Or using msiexec:

```powershell
# Find the product code
Get-WmiObject -Class Win32_Product | Where-Object { $_.Name -like "*Datadog*" } | Select-Object Name, IdentifyingNumber

# Uninstall
Start-Process msiexec.exe -ArgumentList "/x {PRODUCT-CODE-HERE} /qn" -Wait
```

### Clean Up Configuration Files

```powershell
Remove-Item -Path "C:\ProgramData\Datadog" -Recurse -Force
Remove-Item -Path "C:\Program Files\Datadog" -Recurse -Force
```

---

## Advanced Configuration

### Configure Custom Checks

Create a custom check directory:

```powershell
New-Item -ItemType Directory -Force -Path "C:\ProgramData\Datadog\checks.d"
```

Example custom check (Python):

```python
from checks import AgentCheck

class HelloCheck(AgentCheck):
    def check(self, instance):
        self.gauge('hello.world', 1)
```

Save as `C:\ProgramData\Datadog\checks.d\hello.py`

### Enable APM (Application Performance Monitoring)

```yaml
apm_config:
  enabled: true
  apm_non_local_traffic: true
```

Using PowerShell:

```powershell
$apmConfig = @"

apm_config:
  enabled: true
  apm_non_local_traffic: true
"@

Add-Content "C:\ProgramData\Datadog\datadog.yaml" $apmConfig
Restart-Service -Name "ddagent"
```

### Enable Log Collection

```yaml
logs_enabled: true
```

```powershell
(Get-Content "C:\ProgramData\Datadog\datadog.yaml") -replace '#\s*logs_enabled:.*', 'logs_enabled: true' | Set-Content "C:\ProgramData\Datadog\datadog.yaml"
Restart-Service -Name "ddagent"
```

---

## Performance Monitoring

### Monitor Agent Resource Usage

```powershell
Get-Process -Name "agent" | Select-Object Name, CPU, WorkingSet, VirtualMemorySize
```

Continuous monitoring:

```powershell
while ($true) {
    Get-Process -Name "agent" | Select-Object Name, CPU, @{Name="Memory(MB)";Expression={[math]::Round($_.WorkingSet/1MB,2)}}
    Start-Sleep -Seconds 5
    Clear-Host
}
```

### Check Agent Metrics

```powershell
& "C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" status | Select-String -Pattern "Metrics"
```

---

## Automation Scripts

### Automated Installation Script

```powershell
# automated-install.ps1
param(
    [Parameter(Mandatory=$true)]
    [string]$ApiKey,
    
    [string]$Site = "datadoghq.com",
    [string]$Environment = "production"
)

# Download installer
Write-Host "Downloading Datadog Agent..."
$installerPath = "$env:TEMP\datadog-agent.msi"
Invoke-WebRequest -Uri "https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-7-latest.amd64.msi" -OutFile $installerPath

# Install
Write-Host "Installing Datadog Agent..."
Start-Process msiexec.exe -ArgumentList "/qn /i $installerPath APIKEY=$ApiKey SITE=$Site TAGS=env:$Environment" -Wait -NoNewWindow

# Verify
Write-Host "Verifying installation..."
Start-Sleep -Seconds 10
$service = Get-Service -Name "ddagent"
if ($service.Status -eq "Running") {
    Write-Host "Datadog Agent installed and running successfully!" -ForegroundColor Green
} else {
    Write-Host "Installation completed but service is not running. Starting service..." -ForegroundColor Yellow
    Start-Service -Name "ddagent"
}

# Clean up
Remove-Item $installerPath -Force
Write-Host "Installation complete!"
```

### Health Check Script

```powershell
# health-check.ps1
$agentStatus = Get-Service -Name "ddagent"
$agentBin = "C:\Program Files\Datadog\Datadog Agent\bin\agent.exe"

Write-Host "`n=== Datadog Agent Health Check ===" -ForegroundColor Cyan

# Service status
Write-Host "`nService Status: " -NoNewline
if ($agentStatus.Status -eq "Running") {
    Write-Host "RUNNING" -ForegroundColor Green
} else {
    Write-Host "NOT RUNNING" -ForegroundColor Red
}

# Agent version
Write-Host "`nAgent Version:"
& $agentBin version

# Configuration check
Write-Host "`nConfiguration Check:"
& $agentBin configcheck

# Connectivity test
Write-Host "`nDatadog API Connectivity:"
try {
    $response = Invoke-WebRequest -Uri "https://api.datadoghq.com" -TimeoutSec 5
    Write-Host "OK - Status Code: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "FAILED - $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=== End of Health Check ===" -ForegroundColor Cyan
```

---

## Security Best Practices

### Secure API Key Storage

Store API key in encrypted file:

```powershell
# Save API key securely
$apiKey = Read-Host "Enter Datadog API Key" -AsSecureString
$apiKey | ConvertFrom-SecureString | Out-File "C:\SecureConfig\dd-api-key.txt"

# Retrieve and use
$encryptedKey = Get-Content "C:\SecureConfig\dd-api-key.txt" | ConvertTo-SecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($encryptedKey)
$apiKeyPlain = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
```

### Restrict File Permissions

```powershell
# Remove inherited permissions
$acl = Get-Acl "C:\ProgramData\Datadog\datadog.yaml"
$acl.SetAccessRuleProtection($true, $false)

# Grant only Administrators access
$adminRule = New-Object System.Security.AccessControl.FileSystemAccessRule("Administrators", "FullControl", "Allow")
$acl.SetAccessRule($adminRule)

# Apply
Set-Acl "C:\ProgramData\Datadog\datadog.yaml" $acl
```

---

## Quick Reference

### Essential Commands

```powershell
# Service management
Get-Service -Name "ddagent"
Start-Service -Name "ddagent"
Stop-Service -Name "ddagent"
Restart-Service -Name "ddagent"

# Agent commands
& "C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" status
& "C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" version
& "C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" health
& "C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" configcheck

# View logs
Get-Content "C:\ProgramData\Datadog\logs\agent.log" -Tail 50 -Wait
```

### File Locations

- **Configuration**: `C:\ProgramData\Datadog\datadog.yaml`
- **Logs**: `C:\ProgramData\Datadog\logs\`
- **Integrations**: `C:\ProgramData\Datadog\conf.d\`
- **Custom Checks**: `C:\ProgramData\Datadog\checks.d\`
- **Installation**: `C:\Program Files\Datadog\Datadog Agent\`

---

## Related Documentation

- [PowerShell Commands](./powershell-commands.md)
- [Windows Service Management](./windows-service-management.md)
- [Datadog Proxy Testing](../datadog/datadog-proxy-testing.md)
