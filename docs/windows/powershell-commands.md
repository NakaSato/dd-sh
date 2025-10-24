---
sidebar_position: 2
sidebar_label: "PowerShell Commands"
description: "Essential PowerShell one-liners and scripts for Windows system administration and DevOps tasks"
tags: [powershell, windows, commands, one-liners, automation, administration]
---

# PowerShell Commands

Essential PowerShell one-liners and scripts for Windows system administration, monitoring, and DevOps tasks.

---

## File System Operations

### 1. Find and Remove Large Files

Find files larger than 100MB:

```powershell
Get-ChildItem -Path C:\ -Recurse -File -ErrorAction SilentlyContinue | Where-Object { $_.Length -gt 100MB } | Select-Object FullName, @{Name="Size(MB)";Expression={[math]::Round($_.Length/1MB,2)}}
```

Remove large files interactively:

```powershell
Get-ChildItem -Path C:\Temp -Recurse -File -ErrorAction SilentlyContinue | Where-Object { $_.Length -gt 100MB } | ForEach-Object { 
    $confirmation = Read-Host "Delete $($_.FullName) ($([math]::Round($_.Length/1MB,2))MB)? (Y/N)"
    if ($confirmation -eq 'Y') { Remove-Item $_.FullName -Force }
}
```

**Use Case**: Clean up disk space by finding and removing large files

---

### 2. Search and Replace Text in Files

Replace text in all `.txt` files:

```powershell
Get-ChildItem -Path C:\Data -Filter "*.txt" -Recurse | ForEach-Object {
    (Get-Content $_.FullName) -replace 'old_text', 'new_text' | Set-Content $_.FullName
}
```

Case-insensitive replacement:

```powershell
Get-ChildItem -Path C:\Logs -Filter "*.log" -Recurse | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $content -replace '(?i)error', 'warning' | Set-Content $_.FullName
}
```

**Use Case**: Bulk text replacement across configuration files or logs

---

### 3. Find Files Modified in Last N Days

Files modified in last 7 days:

```powershell
Get-ChildItem -Path C:\Projects -Recurse -File | Where-Object { $_.LastWriteTime -gt (Get-Date).AddDays(-7) } | Select-Object FullName, LastWriteTime
```

Files not accessed in 90 days (candidates for archival):

```powershell
Get-ChildItem -Path C:\Archive -Recurse -File | Where-Object { $_.LastAccessTime -lt (Get-Date).AddDays(-90) } | Select-Object FullName, LastAccessTime, @{Name="Size(MB)";Expression={[math]::Round($_.Length/1MB,2)}}
```

**Use Case**: Find recently modified files or identify stale files for cleanup

---

### 4. Calculate Directory Size

Get size of specific directory:

```powershell
"{0:N2} MB" -f ((Get-ChildItem -Path C:\Windows -Recurse -File -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum / 1MB)
```

Get size of all subdirectories:

```powershell
Get-ChildItem -Path C:\Users -Directory | ForEach-Object {
    $size = (Get-ChildItem -Path $_.FullName -Recurse -File -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum / 1GB
    [PSCustomObject]@{
        Directory = $_.Name
        'Size(GB)' = [math]::Round($size, 2)
    }
} | Sort-Object 'Size(GB)' -Descending
```

**Use Case**: Disk space analysis and identifying large directories

---

### 5. Batch Rename Files

Add prefix to all files:

```powershell
Get-ChildItem -Path C:\Photos -Filter "*.jpg" | Rename-Item -NewName { "vacation_" + $_.Name }
```

Replace part of filename:

```powershell
Get-ChildItem -Path C:\Documents -Filter "*.docx" | Rename-Item -NewName { $_.Name -replace 'draft', 'final' }
```

Add date to filenames:

```powershell
Get-ChildItem -Path C:\Backup -Filter "*.bak" | Rename-Item -NewName { 
    $date = Get-Date -Format "yyyyMMdd"
    "$($_.BaseName)_$date$($_.Extension)"
}
```

**Use Case**: Organize files with consistent naming conventions

---

## System Information & Monitoring

### 6. Get System Information

Comprehensive system info:

```powershell
Get-ComputerInfo | Select-Object CsName, WindowsVersion, OsArchitecture, CsTotalPhysicalMemory, CsNumberOfProcessors
```

One-liner formatted output:

```powershell
$info = Get-ComputerInfo; "Computer: $($info.CsName) | OS: $($info.WindowsVersion) | RAM: $([math]::Round($info.CsTotalPhysicalMemory/1GB,2))GB | CPUs: $($info.CsNumberOfProcessors)"
```

**Use Case**: Quick system inventory and specifications

---

### 7. Monitor CPU and Memory Usage

Top 10 processes by CPU:

```powershell
Get-Process | Sort-Object CPU -Descending | Select-Object -First 10 Name, CPU, @{Name="Memory(MB)";Expression={[math]::Round($_.WorkingSet/1MB,2)}}
```

Top 10 processes by memory:

```powershell
Get-Process | Sort-Object WorkingSet -Descending | Select-Object -First 10 Name, @{Name="Memory(MB)";Expression={[math]::Round($_.WorkingSet/1MB,2)}}, CPU
```

Real-time monitoring (updates every 5 seconds):

```powershell
while ($true) {
    Clear-Host
    Get-Process | Sort-Object CPU -Descending | Select-Object -First 10 Name, CPU, @{Name="Mem(MB)";Expression={[math]::Round($_.WorkingSet/1MB,2)}} | Format-Table -AutoSize
    Start-Sleep -Seconds 5
}
```

**Use Case**: Performance monitoring and identifying resource-heavy processes

---

### 8. Check Disk Space

All drives with space info:

```powershell
Get-PSDrive -PSProvider FileSystem | Select-Object Name, @{Name="Used(GB)";Expression={[math]::Round($_.Used/1GB,2)}}, @{Name="Free(GB)";Expression={[math]::Round($_.Free/1GB,2)}}, @{Name="Total(GB)";Expression={[math]::Round(($_.Used+$_.Free)/1GB,2)}}
```

Drives with less than 10GB free space:

```powershell
Get-PSDrive -PSProvider FileSystem | Where-Object { $_.Free -lt 10GB } | Select-Object Name, @{Name="Free(GB)";Expression={[math]::Round($_.Free/1GB,2)}}
```

**Use Case**: Disk space monitoring and capacity planning

---

### 9. Network Information

Get IP configuration:

```powershell
Get-NetIPAddress | Where-Object { $_.AddressFamily -eq 'IPv4' -and $_.InterfaceAlias -notlike '*Loopback*' } | Select-Object InterfaceAlias, IPAddress, PrefixLength
```

Test multiple hosts connectivity:

```powershell
'google.com', 'github.com', 'microsoft.com' | ForEach-Object { 
    Test-Connection -ComputerName $_ -Count 1 -Quiet | ForEach-Object { 
        [PSCustomObject]@{ Host = $_; Status = if ($_ -eq $true) { 'Online' } else { 'Offline' } } 
    }
}
```

Get all network adapters:

```powershell
Get-NetAdapter | Select-Object Name, Status, LinkSpeed, MacAddress
```

**Use Case**: Network diagnostics and connectivity testing

---

### 10. Check Open Ports

List all listening TCP ports:

```powershell
Get-NetTCPConnection | Where-Object { $_.State -eq 'Listen' } | Select-Object LocalAddress, LocalPort, State | Sort-Object LocalPort
```

Find process using specific port:

```powershell
Get-NetTCPConnection -LocalPort 80 | Select-Object LocalPort, OwningProcess, @{Name="ProcessName";Expression={(Get-Process -Id $_.OwningProcess).ProcessName}}
```

**Use Case**: Port monitoring and troubleshooting port conflicts

---

## User & Permission Management

### 11. List All Local Users

```powershell
Get-LocalUser | Select-Object Name, Enabled, LastLogon, PasswordLastSet
```

List enabled users only:

```powershell
Get-LocalUser | Where-Object { $_.Enabled -eq $true } | Select-Object Name, LastLogon
```

**Use Case**: User account auditing

---

### 12. List Local Administrators

```powershell
Get-LocalGroupMember -Group "Administrators" | Select-Object Name, ObjectClass, PrincipalSource
```

**Use Case**: Security auditing and access control review

---

### 13. Check File Permissions

```powershell
Get-Acl -Path "C:\ImportantData" | Select-Object -ExpandProperty Access | Select-Object IdentityReference, FileSystemRights, AccessControlType
```

Export permissions to CSV:

```powershell
Get-ChildItem -Path C:\Secure -Directory | ForEach-Object {
    Get-Acl -Path $_.FullName | Select-Object -ExpandProperty Access | Select-Object @{Name='Folder';Expression={$_.FullName}}, IdentityReference, FileSystemRights
} | Export-Csv -Path "C:\Reports\permissions.csv" -NoTypeInformation
```

**Use Case**: Security auditing and permission verification

---

## Service Management

### 14. Get All Running Services

```powershell
Get-Service | Where-Object { $_.Status -eq 'Running' } | Select-Object Name, DisplayName, StartType
```

Services that are set to auto-start but not running:

```powershell
Get-Service | Where-Object { $_.StartType -eq 'Automatic' -and $_.Status -ne 'Running' } | Select-Object Name, DisplayName, Status
```

**Use Case**: Service health monitoring and troubleshooting

---

### 15. Restart Multiple Services

```powershell
'Spooler', 'W3SVC', 'MSSQLSERVER' | ForEach-Object { 
    Restart-Service -Name $_ -Force -ErrorAction SilentlyContinue
    Write-Host "$_ service restarted" -ForegroundColor Green
}
```

**Use Case**: Bulk service restarts for maintenance

---

### 16. Find Services by Pattern

Find all Datadog-related services:

```powershell
Get-Service | Where-Object { $_.Name -like '*datadog*' -or $_.DisplayName -like '*datadog*' } | Select-Object Name, DisplayName, Status, StartType
```

**Use Case**: Service discovery and filtering

---

## Event Log Management

### 17. Get Recent System Errors

Last 50 system errors:

```powershell
Get-EventLog -LogName System -EntryType Error -Newest 50 | Select-Object TimeGenerated, Source, Message
```

Using Get-WinEvent (faster for large logs):

```powershell
Get-WinEvent -FilterHashtable @{LogName='System'; Level=2} -MaxEvents 50 | Select-Object TimeCreated, ProviderName, Message
```

**Use Case**: System troubleshooting and error investigation

---

### 18. Export Event Logs

Export application errors to CSV:

```powershell
Get-EventLog -LogName Application -EntryType Error -After (Get-Date).AddDays(-7) | Select-Object TimeGenerated, Source, EventID, Message | Export-Csv -Path "C:\Logs\app-errors.csv" -NoTypeInformation
```

**Use Case**: Log analysis and reporting

---

### 19. Monitor Event Log in Real-Time

Watch for new errors:

```powershell
$lastEvent = (Get-EventLog -LogName System -Newest 1).Index

while ($true) {
    $newEvents = Get-EventLog -LogName System -Newest 10 | Where-Object { $_.Index -gt $lastEvent -and $_.EntryType -eq 'Error' }
    
    if ($newEvents) {
        $newEvents | ForEach-Object {
            Write-Host "[$($_.TimeGenerated)] $($_.Source): $($_.Message)" -ForegroundColor Red
        }
        $lastEvent = (Get-EventLog -LogName System -Newest 1).Index
    }
    
    Start-Sleep -Seconds 10
}
```

**Use Case**: Real-time system monitoring

---

## Process Management

### 20. Kill Processes by Name

```powershell
Get-Process -Name "notepad" | Stop-Process -Force
```

Kill multiple processes:

```powershell
'chrome', 'firefox', 'msedge' | ForEach-Object { 
    Get-Process -Name $_ -ErrorAction SilentlyContinue | Stop-Process -Force
}
```

**Use Case**: Process cleanup and troubleshooting

---

### 21. Find Process by Port

```powershell
$port = 8080
$processId = (Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue).OwningProcess
if ($processId) {
    Get-Process -Id $processId | Select-Object Id, ProcessName, Path, StartTime
}
```

**Use Case**: Identify which process is using a specific port

---

### 22. Export Running Processes

```powershell
Get-Process | Select-Object Name, Id, CPU, @{Name="Memory(MB)";Expression={[math]::Round($_.WorkingSet/1MB,2)}}, StartTime, Path | Export-Csv -Path "C:\Reports\processes.csv" -NoTypeInformation
```

**Use Case**: Process inventory and documentation

---

## Scheduled Tasks

### 23. List All Scheduled Tasks

```powershell
Get-ScheduledTask | Where-Object { $_.State -ne 'Disabled' } | Select-Object TaskName, State, LastRunTime, NextRunTime
```

Failed tasks in last 24 hours:

```powershell
Get-ScheduledTask | Get-ScheduledTaskInfo | Where-Object { $_.LastTaskResult -ne 0 -and $_.LastRunTime -gt (Get-Date).AddDays(-1) } | Select-Object TaskName, LastRunTime, LastTaskResult
```

**Use Case**: Scheduled task monitoring and troubleshooting

---

### 24. Create Scheduled Task

Create task to run daily:

```powershell
$action = New-ScheduledTaskAction -Execute "PowerShell.exe" -Argument "-File C:\Scripts\backup.ps1"
$trigger = New-ScheduledTaskTrigger -Daily -At 2am
$principal = New-ScheduledTaskPrincipal -UserId "SYSTEM" -LogonType ServiceAccount
Register-ScheduledTask -TaskName "DailyBackup" -Action $action -Trigger $trigger -Principal $principal
```

**Use Case**: Automation and recurring task setup

---

## Windows Updates

### 25. Check for Updates

```powershell
$updateSession = New-Object -ComObject Microsoft.Update.Session
$updateSearcher = $updateSession.CreateUpdateSearcher()
$updates = $updateSearcher.Search("IsInstalled=0 and Type='Software'")
$updates.Updates | Select-Object Title, @{Name="Size(MB)";Expression={[math]::Round($_.MaxDownloadSize/1MB,2)}}
```

**Use Case**: Update management and planning

---

### 26. Get Update History

```powershell
$session = New-Object -ComObject Microsoft.Update.Session
$searcher = $session.CreateUpdateSearcher()
$historyCount = $searcher.GetTotalHistoryCount()
$searcher.QueryHistory(0, $historyCount) | Select-Object Title, Date, @{Name='Result';Expression={
    switch($_.ResultCode) {
        1 {'In Progress'}
        2 {'Succeeded'}
        3 {'Succeeded With Errors'}
        4 {'Failed'}
        5 {'Aborted'}
    }
}} | Sort-Object Date -Descending | Select-Object -First 20
```

**Use Case**: Update audit and troubleshooting

---

## Registry Operations

### 27. Read Registry Value

```powershell
Get-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion" -Name "ProgramFilesDir"
```

Search for registry keys:

```powershell
Get-ChildItem -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" | ForEach-Object {
    Get-ItemProperty $_.PSPath | Select-Object DisplayName, DisplayVersion, Publisher, InstallDate
} | Where-Object { $_.DisplayName -like '*Office*' }
```

**Use Case**: System configuration reading and software inventory

---

### 28. Backup Registry Key

```powershell
reg export "HKLM\SOFTWARE\MyApp" "C:\Backup\myapp-registry-$(Get-Date -Format 'yyyyMMdd').reg"
```

**Use Case**: Configuration backup before changes

---

## Remote Management

### 29. Remote Command Execution

Execute command on remote computer:

```powershell
Invoke-Command -ComputerName SERVER01 -ScriptBlock { Get-Service -Name "ddagent" } -Credential (Get-Credential)
```

Execute on multiple computers:

```powershell
$servers = 'SERVER01', 'SERVER02', 'SERVER03'
Invoke-Command -ComputerName $servers -ScriptBlock { 
    Get-Service | Where-Object { $_.Status -eq 'Running' } | Measure-Object
} -Credential (Get-Credential)
```

**Use Case**: Remote administration and bulk operations

---

### 30. Copy Files to Remote Computer

```powershell
$session = New-PSSession -ComputerName SERVER01 -Credential (Get-Credential)
Copy-Item -Path "C:\Local\config.xml" -Destination "C:\Remote\config.xml" -ToSession $session
Remove-PSSession $session
```

**Use Case**: Remote file deployment

---

## Security & Auditing

### 31. Check Windows Firewall Status

```powershell
Get-NetFirewallProfile | Select-Object Name, Enabled
```

List all firewall rules:

```powershell
Get-NetFirewallRule | Where-Object { $_.Enabled -eq $true } | Select-Object Name, DisplayName, Direction, Action, Enabled
```

**Use Case**: Security auditing and firewall management

---

### 32. Find Unsigned Executables

```powershell
Get-ChildItem -Path C:\Windows\System32 -Filter "*.exe" | ForEach-Object {
    $sig = Get-AuthenticodeSignature $_.FullName
    if ($sig.Status -ne 'Valid') {
        [PSCustomObject]@{
            File = $_.Name
            Status = $sig.Status
            Signer = $sig.SignerCertificate.Subject
        }
    }
}
```

**Use Case**: Security scanning and malware detection

---

### 33. Export Installed Software List

```powershell
Get-ItemProperty "HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*" | Select-Object DisplayName, DisplayVersion, Publisher, InstallDate | Where-Object { $_.DisplayName } | Sort-Object DisplayName | Export-Csv -Path "C:\Reports\installed-software.csv" -NoTypeInformation
```

Include 32-bit software on 64-bit systems:

```powershell
$software = @()
$software += Get-ItemProperty "HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*"
$software += Get-ItemProperty "HKLM:\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*"
$software | Select-Object DisplayName, DisplayVersion, Publisher, InstallDate | Where-Object { $_.DisplayName } | Sort-Object DisplayName -Unique | Export-Csv -Path "C:\Reports\all-software.csv" -NoTypeInformation
```

**Use Case**: Software inventory and compliance auditing

---

## Performance & Diagnostics

### 34. Get System Uptime

```powershell
$uptime = (Get-Date) - (Get-CimInstance Win32_OperatingSystem).LastBootUpTime
"System uptime: $($uptime.Days) days, $($uptime.Hours) hours, $($uptime.Minutes) minutes"
```

**Use Case**: System availability tracking

---

### 35. Check Boot Time

```powershell
Get-CimInstance Win32_OperatingSystem | Select-Object @{Name='LastBoot';Expression={$_.LastBootUpTime}}, @{Name='Uptime';Expression={(Get-Date) - $_.LastBootUpTime}}
```

**Use Case**: System restart verification

---

### 36. Test Website Response Time

```powershell
Measure-Command { Invoke-WebRequest -Uri "https://www.google.com" } | Select-Object TotalMilliseconds
```

Test multiple URLs:

```powershell
'https://google.com', 'https://github.com', 'https://microsoft.com' | ForEach-Object {
    $time = (Measure-Command { Invoke-WebRequest -Uri $_ -UseBasicParsing }).TotalMilliseconds
    [PSCustomObject]@{
        URL = $_
        ResponseTime = "$([math]::Round($time, 2)) ms"
    }
}
```

**Use Case**: Website performance monitoring

---

## Advanced Scripting

### 37. Create Backup Script

```powershell
$source = "C:\ImportantData"
$destination = "D:\Backup\$(Get-Date -Format 'yyyyMMdd')"
$logFile = "D:\Backup\backup-log.txt"

try {
    New-Item -ItemType Directory -Path $destination -Force | Out-Null
    Copy-Item -Path $source -Destination $destination -Recurse -Force
    "Backup completed successfully at $(Get-Date)" | Add-Content $logFile
    Write-Host "Backup completed: $destination" -ForegroundColor Green
} catch {
    "Backup failed at $(Get-Date): $($_.Exception.Message)" | Add-Content $logFile
    Write-Host "Backup failed: $($_.Exception.Message)" -ForegroundColor Red
}
```

**Use Case**: Automated data backup

---

### 38. Monitor Folder for Changes

```powershell
$folder = "C:\Monitored"
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $folder
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

Register-ObjectEvent $watcher "Created" -Action {
    Write-Host "File created: $($Event.SourceEventArgs.FullPath)" -ForegroundColor Green
}

Register-ObjectEvent $watcher "Deleted" -Action {
    Write-Host "File deleted: $($Event.SourceEventArgs.FullPath)" -ForegroundColor Red
}

Write-Host "Monitoring $folder for changes. Press Ctrl+C to stop."
while ($true) { Start-Sleep -Seconds 1 }
```

**Use Case**: Real-time file system monitoring

---

### 39. Generate System Report

```powershell
$reportDate = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$computerInfo = Get-ComputerInfo
$diskInfo = Get-PSDrive -PSProvider FileSystem

$report = @"
=== SYSTEM REPORT ===
Generated: $reportDate

Computer Name: $($computerInfo.CsName)
OS Version: $($computerInfo.WindowsVersion)
Total RAM: $([math]::Round($computerInfo.CsTotalPhysicalMemory/1GB,2)) GB
CPU: $($computerInfo.CsProcessors[0].Name)
Uptime: $((Get-Date) - $computerInfo.OsLastBootUpTime)

=== DISK SPACE ===
$($diskInfo | ForEach-Object { "$($_.Name): $([math]::Round($_.Free/1GB,2))GB free of $([math]::Round(($_.Used+$_.Free)/1GB,2))GB" } | Out-String)

=== TOP 5 PROCESSES BY MEMORY ===
$((Get-Process | Sort-Object WorkingSet -Descending | Select-Object -First 5 Name, @{Name="Memory(MB)";Expression={[math]::Round($_.WorkingSet/1MB,2)}} | Out-String))

=== RUNNING SERVICES ===
$(( Get-Service | Where-Object { $_.Status -eq 'Running' } | Measure-Object).Count) services running

"@

$report | Out-File "C:\Reports\system-report-$(Get-Date -Format 'yyyyMMdd-HHmmss').txt"
Write-Host $report
```

**Use Case**: Comprehensive system documentation and reporting

---

### 40. Network Bandwidth Monitor

```powershell
$adapter = Get-NetAdapter | Where-Object { $_.Status -eq 'Up' } | Select-Object -First 1
$interface = Get-Counter "\Network Interface($($adapter.InterfaceDescription))\Bytes Total/sec"

while ($true) {
    Clear-Host
    $current = Get-Counter "\Network Interface($($adapter.InterfaceDescription))\Bytes Total/sec"
    $bandwidth = [math]::Round($current.CounterSamples[0].CookedValue / 1MB, 2)
    
    Write-Host "Network Bandwidth Monitor - $($adapter.Name)" -ForegroundColor Cyan
    Write-Host "Current Speed: $bandwidth MB/s"
    Write-Host "Press Ctrl+C to exit"
    
    Start-Sleep -Seconds 2
}
```

**Use Case**: Network performance monitoring

---

## Quick Reference

### Common Patterns

```powershell
# Filter and select
Get-Process | Where-Object { $_.CPU -gt 100 } | Select-Object Name, CPU

# Sort and limit
Get-ChildItem | Sort-Object Length -Descending | Select-Object -First 10

# Export to CSV
Get-Service | Export-Csv -Path "services.csv" -NoTypeInformation

# Measure and calculate
Get-ChildItem -Recurse | Measure-Object -Property Length -Sum

# Format output
Get-Process | Format-Table Name, CPU, @{Name="Memory(MB)";Expression={$_.WS/1MB}}

# Error handling
try { ... } catch { Write-Error $_.Exception.Message }

# Parallel execution
1..10 | ForEach-Object -Parallel { Start-Sleep -Seconds 1; $_ }
```

---

## Related Documentation

- [Datadog Windows Setup](./datadog-windows-setup.md)
- [Windows Service Management](./windows-service-management.md)
- [Linux One-Line Commands](../linux/oneline-commands.md)
