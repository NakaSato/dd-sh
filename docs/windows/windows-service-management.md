---
sidebar_position: 3
sidebar_label: "Windows Service Management"
description: "Comprehensive PowerShell commands to check, monitor, and manage Windows services"
tags: [windows, services, powershell, monitoring, service-management, troubleshooting]
---

# Windows Service Management

Comprehensive guide to checking, monitoring, and managing Windows services with PowerShell.

---

## Basic Service Status Commands

### 1. Check Service Status

Single service:

```powershell
Get-Service -Name "ddagent"
```

Multiple services:

```powershell
Get-Service -Name "ddagent", "W3SVC", "MSSQLSERVER"
```

With detailed properties:

```powershell
Get-Service -Name "ddagent" | Select-Object Name, DisplayName, Status, StartType, ServiceType
```

**Output shows**:
- Service name
- Display name
- Current status (Running, Stopped, etc.)
- Startup type (Automatic, Manual, Disabled)
- Service type

---

### 2. Check Service Startup Type

```powershell
Get-Service -Name "ddagent" | Select-Object Name, StartType
```

Check if service is set to automatic:

```powershell
(Get-Service -Name "ddagent").StartType -eq "Automatic"
```

---

### 3. List All Services

```powershell
Get-Service
```

With formatted output:

```powershell
Get-Service | Format-Table Name, DisplayName, Status, StartType -AutoSize
```

---

### 4. List Running Services

```powershell
Get-Service | Where-Object { $_.Status -eq 'Running' }
```

Count running services:

```powershell
(Get-Service | Where-Object { $_.Status -eq 'Running' }).Count
```

Export to CSV:

```powershell
Get-Service | Where-Object { $_.Status -eq 'Running' } | Export-Csv -Path "C:\Reports\running-services.csv" -NoTypeInformation
```

---

### 5. List Stopped Services

```powershell
Get-Service | Where-Object { $_.Status -eq 'Stopped' }
```

Stopped services that are set to automatic:

```powershell
Get-Service | Where-Object { $_.Status -eq 'Stopped' -and $_.StartType -eq 'Automatic' }
```

---

### 6. List Services by Pattern

Find services with "data" in name:

```powershell
Get-Service | Where-Object { $_.Name -like '*data*' }
```

Find services with "SQL" in display name:

```powershell
Get-Service | Where-Object { $_.DisplayName -like '*SQL*' }
```

---

## Service Control Commands

### 7. Start Service

```powershell
Start-Service -Name "ddagent"
```

Start and wait:

```powershell
Start-Service -Name "ddagent" -PassThru
```

Start multiple services:

```powershell
Start-Service -Name "ddagent", "W3SVC", "MSSQLSERVER"
```

---

### 8. Stop Service

```powershell
Stop-Service -Name "ddagent"
```

Force stop:

```powershell
Stop-Service -Name "ddagent" -Force
```

Stop and wait for dependent services:

```powershell
Stop-Service -Name "W3SVC" -Force -PassThru | Wait-Service
```

---

### 9. Restart Service

```powershell
Restart-Service -Name "ddagent"
```

Restart with force:

```powershell
Restart-Service -Name "ddagent" -Force
```

Restart and display status:

```powershell
Restart-Service -Name "ddagent" -PassThru | Select-Object Name, Status
```

---

### 10. Suspend/Resume Service

Suspend (pause) service:

```powershell
Suspend-Service -Name "Spooler"
```

Resume service:

```powershell
Resume-Service -Name "Spooler"
```

---

## Service Configuration

### 11. Set Service Startup Type

Set to Automatic:

```powershell
Set-Service -Name "ddagent" -StartupType Automatic
```

Set to Manual:

```powershell
Set-Service -Name "ddagent" -StartupType Manual
```

Set to Disabled:

```powershell
Set-Service -Name "ddagent" -StartupType Disabled
```

Set to Automatic (Delayed Start):

```powershell
Set-Service -Name "ddagent" -StartupType AutomaticDelayedStart
```

---

### 12. Change Service Display Name

```powershell
Set-Service -Name "ddagent" -DisplayName "Datadog Agent Service"
```

---

### 13. Change Service Description

```powershell
Set-Service -Name "ddagent" -Description "Datadog monitoring agent for system and application metrics"
```

---

### 14. Configure Service Recovery Options

Using sc.exe command:

```powershell
# Restart service on failure
sc.exe failure ddagent reset= 86400 actions= restart/60000/restart/60000/restart/60000
```

Set recovery to restart after 1 minute:

```powershell
sc.exe failure ddagent actions= restart/60000
```

---

## Service Dependencies

### 15. View Service Dependencies

```powershell
Get-Service -Name "W3SVC" | Select-Object -ExpandProperty DependentServices
```

View services this service depends on:

```powershell
Get-Service -Name "W3SVC" | Select-Object -ExpandProperty ServicesDependedOn
```

Full dependency tree:

```powershell
$service = Get-Service -Name "W3SVC"

Write-Host "Services $($service.Name) depends on:" -ForegroundColor Cyan
$service.ServicesDependedOn | Select-Object Name, Status

Write-Host "`nServices that depend on $($service.Name):" -ForegroundColor Cyan
$service.DependentServices | Select-Object Name, Status
```

---

### 16. Check if Service Has Dependencies

```powershell
$service = Get-Service -Name "W3SVC"
if ($service.DependentServices.Count -gt 0) {
    Write-Host "$($service.Name) has $($service.DependentServices.Count) dependent services"
    $service.DependentServices | Select-Object Name, Status
}
```

---

## Service Monitoring

### 17. Monitor Service Status

Watch service status (refresh every 5 seconds):

```powershell
while ($true) {
    Clear-Host
    Get-Service -Name "ddagent" | Select-Object Name, Status, StartType
    Start-Sleep -Seconds 5
}
```

---

### 18. Alert on Service Status Change

```powershell
$serviceName = "ddagent"
$lastStatus = (Get-Service -Name $serviceName).Status

while ($true) {
    $currentStatus = (Get-Service -Name $serviceName).Status
    
    if ($currentStatus -ne $lastStatus) {
        Write-Host "[$((Get-Date).ToString('yyyy-MM-dd HH:mm:ss'))] Service $serviceName changed from $lastStatus to $currentStatus" -ForegroundColor Yellow
        $lastStatus = $currentStatus
    }
    
    Start-Sleep -Seconds 10
}
```

---

### 19. Check Service Uptime

Using WMI:

```powershell
$service = Get-WmiObject Win32_Service -Filter "Name='ddagent'"
$process = Get-Process -Id $service.ProcessId -ErrorAction SilentlyContinue

if ($process) {
    $uptime = (Get-Date) - $process.StartTime
    Write-Host "Service $($service.Name) uptime: $($uptime.Days) days, $($uptime.Hours) hours, $($uptime.Minutes) minutes"
}
```

---

### 20. Monitor Multiple Services

```powershell
$services = @('ddagent', 'W3SVC', 'MSSQLSERVER')

while ($true) {
    Clear-Host
    Write-Host "Service Status Monitor - $(Get-Date)" -ForegroundColor Cyan
    Write-Host "="*60
    
    foreach ($svc in $services) {
        $status = (Get-Service -Name $svc -ErrorAction SilentlyContinue).Status
        $color = if ($status -eq 'Running') { 'Green' } else { 'Red' }
        Write-Host "$svc`: $status" -ForegroundColor $color
    }
    
    Start-Sleep -Seconds 5
}
```

---

## Advanced Service Queries

### 21. Get Service Account Information

```powershell
Get-WmiObject Win32_Service -Filter "Name='ddagent'" | Select-Object Name, StartName, State, StartMode
```

All services and their accounts:

```powershell
Get-WmiObject Win32_Service | Select-Object Name, DisplayName, StartName, State | Sort-Object StartName | Format-Table -AutoSize
```

---

### 22. Find Services Running as Specific Account

```powershell
Get-WmiObject Win32_Service | Where-Object { $_.StartName -like '*LocalSystem*' } | Select-Object Name, DisplayName, State
```

Find services running as domain account:

```powershell
Get-WmiObject Win32_Service | Where-Object { $_.StartName -like 'DOMAIN\*' } | Select-Object Name, DisplayName, StartName, State
```

---

### 23. Get Service Path and Binary

```powershell
Get-WmiObject Win32_Service -Filter "Name='ddagent'" | Select-Object Name, PathName
```

Get process ID and executable:

```powershell
Get-WmiObject Win32_Service -Filter "Name='ddagent'" | Select-Object Name, ProcessId, PathName
```

---

### 24. Check Service Performance Metrics

Get process info for service:

```powershell
$service = Get-WmiObject Win32_Service -Filter "Name='ddagent'"
if ($service.ProcessId -gt 0) {
    Get-Process -Id $service.ProcessId | Select-Object Name, CPU, @{Name="Memory(MB)";Expression={[math]::Round($_.WorkingSet/1MB,2)}}, StartTime
}
```

---

## Service Troubleshooting

### 25. Find Services That Failed to Start

```powershell
Get-EventLog -LogName System -Source "Service Control Manager" -EntryType Error -Newest 50 | Where-Object { $_.Message -like '*failed to start*' } | Select-Object TimeGenerated, Message
```

Using Get-WinEvent:

```powershell
Get-WinEvent -FilterHashtable @{LogName='System'; ProviderName='Service Control Manager'; Level=2} -MaxEvents 50 | Where-Object { $_.Message -like '*failed*' }
```

---

### 26. View Service Event Logs

```powershell
Get-EventLog -LogName Application -Source "Datadog Agent" -Newest 20 | Select-Object TimeGenerated, EntryType, Message
```

Filter by entry type:

```powershell
Get-EventLog -LogName Application -Source "Datadog Agent" -EntryType Error -Newest 20
```

---

### 27. Check Service Start Failures

```powershell
$serviceName = "ddagent"
Get-EventLog -LogName System | Where-Object { 
    $_.Source -eq "Service Control Manager" -and 
    $_.Message -like "*$serviceName*" -and 
    $_.EntryType -eq "Error"
} | Select-Object -First 10 TimeGenerated, Message
```

---

### 28. Test Service Restart

```powershell
$serviceName = "ddagent"
$service = Get-Service -Name $serviceName

Write-Host "Testing restart of $serviceName..." -ForegroundColor Cyan

# Stop
Write-Host "Stopping service..."
Stop-Service -Name $serviceName -Force
Start-Sleep -Seconds 2

# Verify stopped
$status = (Get-Service -Name $serviceName).Status
Write-Host "Status after stop: $status" -ForegroundColor $(if ($status -eq 'Stopped') { 'Green' } else { 'Red' })

# Start
Write-Host "Starting service..."
Start-Service -Name $serviceName
Start-Sleep -Seconds 2

# Verify running
$status = (Get-Service -Name $serviceName).Status
Write-Host "Status after start: $status" -ForegroundColor $(if ($status -eq 'Running') { 'Green' } else { 'Red' })
```

---

## Bulk Operations

### 29. Start All Stopped Automatic Services

```powershell
Get-Service | Where-Object { $_.StartType -eq 'Automatic' -and $_.Status -eq 'Stopped' } | ForEach-Object {
    Write-Host "Starting $($_.Name)..." -ForegroundColor Yellow
    Start-Service -Name $_.Name -ErrorAction SilentlyContinue
}
```

---

### 30. Stop All Non-Essential Services

```powershell
$essentialServices = @('Winmgmt', 'RpcSs', 'SENS', 'EventLog')
$nonEssentialRunning = Get-Service | Where-Object { 
    $_.Status -eq 'Running' -and 
    $_.StartType -eq 'Manual' -and 
    $essentialServices -notcontains $_.Name 
}

foreach ($service in $nonEssentialRunning) {
    Write-Host "Stopping $($service.Name)..." -ForegroundColor Yellow
    Stop-Service -Name $service.Name -Force -ErrorAction SilentlyContinue
}
```

---

### 31. Export Service Configuration

```powershell
Get-Service | Select-Object Name, DisplayName, Status, StartType | Export-Csv -Path "C:\Backup\services-config-$(Get-Date -Format 'yyyyMMdd').csv" -NoTypeInformation
```

Include detailed information:

```powershell
Get-WmiObject Win32_Service | Select-Object Name, DisplayName, StartName, State, StartMode, PathName | Export-Csv -Path "C:\Backup\services-detailed-$(Get-Date -Format 'yyyyMMdd').csv" -NoTypeInformation
```

---

### 32. Compare Service States

Save current state:

```powershell
Get-Service | Select-Object Name, Status, StartType | Export-Csv -Path "C:\Baseline\services-baseline.csv" -NoTypeInformation
```

Compare with baseline:

```powershell
$baseline = Import-Csv -Path "C:\Baseline\services-baseline.csv"
$current = Get-Service | Select-Object Name, Status, StartType

foreach ($base in $baseline) {
    $curr = $current | Where-Object { $_.Name -eq $base.Name }
    if ($curr.Status -ne $base.Status -or $curr.StartType -ne $base.StartType) {
        Write-Host "Changed: $($base.Name) - Status: $($base.Status)->$($curr.Status), StartType: $($base.StartType)->$($curr.StartType)" -ForegroundColor Yellow
    }
}
```

---

## Service Creation and Removal

### 33. Create New Service

Using sc.exe:

```powershell
sc.exe create MyService binPath= "C:\MyApp\service.exe" start= auto DisplayName= "My Custom Service"
```

Using New-Service (PowerShell 6+):

```powershell
New-Service -Name "MyService" -BinaryPathName "C:\MyApp\service.exe" -DisplayName "My Custom Service" -StartupType Automatic -Description "My service description"
```

---

### 34. Remove Service

```powershell
sc.exe delete MyService
```

Stop and remove:

```powershell
Stop-Service -Name "MyService" -Force
sc.exe delete MyService
```

---

## Scheduled Service Monitoring

### 35. Create Service Monitor Task

```powershell
# Create monitoring script
$monitorScript = @'
$serviceName = "ddagent"
$service = Get-Service -Name $serviceName

if ($service.Status -ne 'Running') {
    Start-Service -Name $serviceName
    $message = "Service $serviceName was stopped and has been restarted at $(Get-Date)"
    $message | Add-Content "C:\Logs\service-monitor.log"
    
    # Optionally send email alert
    # Send-MailMessage -To "admin@domain.com" -From "monitor@domain.com" -Subject "Service Alert" -Body $message -SmtpServer "smtp.domain.com"
}
'@

Set-Content -Path "C:\Scripts\monitor-service.ps1" -Value $monitorScript

# Create scheduled task
$action = New-ScheduledTaskAction -Execute "PowerShell.exe" -Argument "-ExecutionPolicy Bypass -File C:\Scripts\monitor-service.ps1"
$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Minutes 5) -RepetitionDuration (New-TimeSpan -Days 365)
$principal = New-ScheduledTaskPrincipal -UserId "SYSTEM" -LogonType ServiceAccount
Register-ScheduledTask -TaskName "ServiceMonitor" -Action $action -Trigger $trigger -Principal $principal
```

---

## Service Health Reports

### 36. Generate Service Health Report

```powershell
$report = @"
=== SERVICE HEALTH REPORT ===
Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')

RUNNING SERVICES: $((Get-Service | Where-Object { $_.Status -eq 'Running' }).Count)
STOPPED SERVICES: $((Get-Service | Where-Object { $_.Status -eq 'Stopped' }).Count)

AUTOMATIC SERVICES NOT RUNNING:
$((Get-Service | Where-Object { $_.StartType -eq 'Automatic' -and $_.Status -ne 'Running' } | Select-Object Name, DisplayName, Status | Format-Table | Out-String))

CRITICAL SERVICES STATUS:
$((Get-Service -Name 'ddagent', 'W3SVC', 'MSSQLSERVER' -ErrorAction SilentlyContinue | Select-Object Name, Status, StartType | Format-Table | Out-String))

RECENT SERVICE ERRORS (Last 24 hours):
$((Get-EventLog -LogName System -Source "Service Control Manager" -EntryType Error -After (Get-Date).AddDays(-1) | Select-Object -First 10 TimeGenerated, Message | Format-List | Out-String))
"@

$report | Out-File "C:\Reports\service-health-$(Get-Date -Format 'yyyyMMdd-HHmmss').txt"
Write-Host $report
```

---

### 37. Service Availability Check

```powershell
$criticalServices = @('ddagent', 'W3SVC', 'MSSQLSERVER')
$allRunning = $true

Write-Host "`n=== Critical Services Check ===" -ForegroundColor Cyan

foreach ($svcName in $criticalServices) {
    $service = Get-Service -Name $svcName -ErrorAction SilentlyContinue
    
    if ($service) {
        $status = $service.Status
        $color = if ($status -eq 'Running') { 'Green' } else { 'Red'; $allRunning = $false }
        Write-Host "$svcName`: $status" -ForegroundColor $color
    } else {
        Write-Host "$svcName`: NOT INSTALLED" -ForegroundColor Red
        $allRunning = $false
    }
}

Write-Host "`nOverall Status: " -NoNewline
if ($allRunning) {
    Write-Host "ALL SERVICES RUNNING" -ForegroundColor Green
} else {
    Write-Host "SOME SERVICES NOT RUNNING" -ForegroundColor Red
}
```

---

## Remote Service Management

### 38. Manage Services on Remote Computer

```powershell
$computer = "SERVER01"
Get-Service -ComputerName $computer -Name "ddagent"
```

Start remote service:

```powershell
Get-Service -ComputerName $computer -Name "ddagent" | Start-Service
```

Using Invoke-Command:

```powershell
Invoke-Command -ComputerName SERVER01 -ScriptBlock {
    Get-Service -Name "ddagent" | Restart-Service
}
```

---

### 39. Query Services on Multiple Computers

```powershell
$computers = @('SERVER01', 'SERVER02', 'SERVER03')
$serviceName = "ddagent"

foreach ($computer in $computers) {
    Write-Host "`nChecking $computer..." -ForegroundColor Cyan
    Get-Service -ComputerName $computer -Name $serviceName -ErrorAction SilentlyContinue | Select-Object MachineName, Name, Status, StartType
}
```

Parallel execution:

```powershell
$computers = @('SERVER01', 'SERVER02', 'SERVER03')
$serviceName = "ddagent"

Invoke-Command -ComputerName $computers -ScriptBlock {
    param($svcName)
    Get-Service -Name $svcName | Select-Object MachineName, Name, Status, StartType
} -ArgumentList $serviceName
```

---

### 40. Remote Service Report

```powershell
$computers = @('SERVER01', 'SERVER02', 'SERVER03')

$results = foreach ($computer in $computers) {
    try {
        $services = Get-Service -ComputerName $computer -ErrorAction Stop
        
        [PSCustomObject]@{
            Computer = $computer
            TotalServices = $services.Count
            Running = ($services | Where-Object { $_.Status -eq 'Running' }).Count
            Stopped = ($services | Where-Object { $_.Status -eq 'Stopped' }).Count
            AutoNotRunning = ($services | Where-Object { $_.StartType -eq 'Automatic' -and $_.Status -ne 'Running' }).Count
            Status = 'Online'
        }
    } catch {
        [PSCustomObject]@{
            Computer = $computer
            TotalServices = 0
            Running = 0
            Stopped = 0
            AutoNotRunning = 0
            Status = 'Offline'
        }
    }
}

$results | Format-Table -AutoSize
$results | Export-Csv -Path "C:\Reports\remote-services-$(Get-Date -Format 'yyyyMMdd').csv" -NoTypeInformation
```

---

## Quick Reference

### Common Service Commands

```powershell
# Status
Get-Service -Name "servicename"

# Start/Stop/Restart
Start-Service -Name "servicename"
Stop-Service -Name "servicename" -Force
Restart-Service -Name "servicename"

# Configuration
Set-Service -Name "servicename" -StartupType Automatic
Set-Service -Name "servicename" -Description "Service description"

# Monitoring
Get-Service | Where-Object { $_.Status -eq 'Running' }
Get-Service | Where-Object { $_.StartType -eq 'Automatic' -and $_.Status -ne 'Running' }

# Dependencies
Get-Service -Name "servicename" | Select-Object -ExpandProperty DependentServices
Get-Service -Name "servicename" | Select-Object -ExpandProperty ServicesDependedOn

# WMI Queries
Get-WmiObject Win32_Service -Filter "Name='servicename'"
Get-WmiObject Win32_Service | Select-Object Name, StartName, State, StartMode
```

---

## Related Documentation

- [Datadog Windows Setup](./datadog-windows-setup.md)
- [PowerShell Commands](./powershell-commands.md)
- [Linux Service Check Commands](../services/service-check-commands.md)
