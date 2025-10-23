------

sidebar_position: 1sidebar_position: 1

sidebar_label: "One-Line Bash Commands"sidebar_label: One-Line Bash Commands

description: "Essential one-liner bash commands for Linux system administration and DevOps tasks"description: Essential one-liner bash commands for Linux system administration and DevOps tasks

tags: [bash, commands, linux, one-liners, automation]tags: [bash, commands, linux, one-liners, automation]

------



# One-Line Bash Commands# One-Line Bash Commands



Essential bash one-liners for common DevOps and system administration tasks. Each command is designed to be typed and executed in a single line, with explanations of each component.Essential bash one-liners for common DevOps and system administration tasks. Each command is designed to be typed and executed in a single line, with explanations of each component.



## Command 1: Find and Remove Large Files## Command 1: Find and Remove Large Files



```bash```bash

find . -type f -size +100M -exec rm -i {} \;

```



### Explanation# One-Line Bash Commands### Explanation

- **`find .`** - Search from the current directory

- **`-type f`** - Only look for files (not directories)- **`find .`** - Search from the current directory

- **`-size +100M`** - Find files larger than 100 megabytes

- **`-exec rm -i {} \;`** - Execute `rm -i` (interactive remove) on each file foundEssential bash one-liners for common DevOps and system administration tasks. Each command is designed to be typed and executed in a single line, with explanations of each component.- **`-type f`** - Only look for files (not directories)

- **`{}`** - Placeholder for the filename

- **`\;`** - Terminates the exec command- **`-size +100M`** - Find files larger than 100 megabytes



**Use Case**: Clean up disk space by finding and removing large files interactively## Command 1: Find and Remove Large Files- **`-exec rm -i {} \;`** - Execute `rm -i` (interactive remove) on each file found



---- **`{}`** - Placeholder for the filename



## Command 2: Search and Replace Across Multiple Files```bash- **`\;`** - Terminates the exec command



```bashfind . -type f -size +100M -exec rm -i {} \;

find . -name "*.txt" -type f -exec sed -i '' 's/old_text/new_text/g' {} \;

``````---



### Explanation

- **`find . -name "*.txt"`** - Find all `.txt` files in current directory

- **`-type f`** - Ensure only files are processed### Explanation## Command 2: Search and Replace Across Multiple Files

- **`-exec sed -i ''`** - Execute sed with in-place editing (empty string is macOS-specific)

- **`s/old_text/new_text/g`** - Substitute all occurrences of `old_text` with `new_text`- **`find .`** - Search from the current directory```bash

- **`{}`** - Each found file

- **`\;`** - End the exec command- **`-type f`** - Only look for files (not directories)find . -name "*.txt" -type f -exec sed -i '' 's/old_text/new_text/g' {} \;



**Use Case**: Batch rename or update configuration values across many files- **`-size +100M`** - Find files larger than 100 megabytes```



**Linux version** (different sed syntax):- **`-exec rm -i {} \;`** - Execute `rm -i` (interactive remove) on each file found

```bash

find . -name "*.txt" -type f -exec sed -i 's/old_text/new_text/g' {} \;- **`{}`** - Placeholder for the filename### Explanation

```

- **`\;`** - Terminates the exec command- **`find . -name "*.txt"`** - Find all `.txt` files in current directory

---

- **`-type f`** - Ensure only files are processed

## Command 3: Create Backup of All Files with Timestamp

**Use Case**: Clean up disk space by finding and removing large files interactively- **`-exec sed -i ''`** - Execute sed with in-place editing (empty string is macOS-specific)

```bash

tar -czf backup_$(date +%Y%m%d_%H%M%S).tar.gz --exclude='.git' .- **`s/old_text/new_text/g`** - Substitute all occurrences of `old_text` with `new_text`

```

---- **`{}`** - Each found file

### Explanation

- **`tar -czf`** - Create (`c`) a compressed (`z`) gzip file (`f`)- **`\;`** - End the exec command

- **`backup_$(date +%Y%m%d_%H%M%S).tar.gz`** - Filename with timestamp (YYYYMMDD_HHMMSS format)

- **`--exclude='.git'`** - Skip the `.git` directory## Command 2: Search and Replace Across Multiple Files

- **`.`** - Include all files from current directory

---

**Use Case**: Create timestamped backups for disaster recovery or version control

```bash

**Example output**: `backup_20251023_143022.tar.gz`

find . -name "*.txt" -type f -exec sed -i '' 's/old_text/new_text/g' {} \;## Command 3: Create Backup of All Files with Timestamp

---

``````bash

## Command 4: Monitor File Changes in Real-Time

tar -czf backup_$(date +%Y%m%d_%H%M%S).tar.gz --exclude='.git' .

```bash

watch -n 1 'ls -lah | tail -20'### Explanation```

```

- **`find . -name "*.txt"`** - Find all `.txt` files in current directory

### Explanation

- **`watch -n 1`** - Refresh every 1 second- **`-type f`** - Ensure only files are processed### Explanation

- **`'ls -lah'`** - List files with detailed info (all files, human-readable sizes)

- **`tail -20`** - Show only the last 20 lines- **`-exec sed -i ''`** - Execute sed with in-place editing (empty string is macOS-specific)- **`tar -czf`** - Create (`c`) a compressed (`z`) gzip file (`f`)

- Updates automatically to show recent file changes

- **`s/old_text/new_text/g`** - Substitute all occurrences of `old_text` with `new_text`- **`backup_$(date +%Y%m%d_%H%M%S).tar.gz`** - Filename with timestamp (YYYYMMDD_HHMMSS format)

**Use Case**: Monitor a directory for file creation/modification during builds or deployments

- **`{}`** - Each found file- **`--exclude='.git'`** - Skip the `.git` directory

**Exit**: Press `Ctrl+C` to stop

- **`\;`** - End the exec command- **`.`** - Include all files from current directory

---



## Command 5: Check Disk Usage by Directory

**Use Case**: Batch rename or update configuration values across many files---

```bash

du -sh */ | sort -rh | head -10

```

**Linux version (different sed syntax)**:## Command 4: Monitor File Changes in Real-Time

### Explanation

- **`du -sh */`** - Disk usage (`du`) in human-readable format (`h`) of subdirectories (`*/`)```bash```bash

- **`s`** - Summary (total per directory)

- **`sort -rh`** - Sort in reverse order (`r`) by human-readable numbers (`h`)find . -name "*.txt" -type f -exec sed -i 's/old_text/new_text/g' {} \;watch -n 1 'ls -lah | tail -20'

- **`head -10`** - Show top 10 largest directories

``````

**Use Case**: Identify which subdirectories are consuming the most disk space



**Example output**:

```---### Explanation

50G  ./var

32G  ./home- **`watch -n 1`** - Refresh every 1 second

18G  ./opt

```## Command 3: Create Backup of All Files with Timestamp- **`'ls -lah'`** - List files with detailed info (all files, human-readable sizes)



---- **`tail -20`** - Show only the last 20 lines



## Related Documentation```bash- Updates automatically to show recent file changes



- [Datadog CentOS Setup](./datadog-centos-setup.md) - Datadog installation and configurationtar -czf backup_$(date +%Y%m%d_%H%M%S).tar.gz --exclude='.git' .

- [Service Check Commands](../services/service-check-commands.md) - systemctl service management

- [Datadog Proxy Testing](../datadog/datadog-proxy-testing.md) - Network diagnostics for Datadog```---




### Explanation## Command 5: Check Disk Usage by Directory

- **`tar -czf`** - Create (`c`) a compressed (`z`) gzip file (`f`)```bash

- **`backup_$(date +%Y%m%d_%H%M%S).tar.gz`** - Filename with timestamp (YYYYMMDD_HHMMSS format)du -sh */ | sort -rh | head -10

- **`--exclude='.git'`** - Skip the `.git` directory```

- **`.`** - Include all files from current directory

### Explanation

**Use Case**: Create timestamped backups for disaster recovery or version control- **`du -sh */`** - Disk usage (`du`) in human-readable format (`h`) of subdirectories (`/`)

- **`s`** - Summary (total per directory)

**Example output**: `backup_20251023_143022.tar.gz`- **`sort -rh`** - Sort in reverse order (`r`) by human-readable numbers (`h`)

- **`head -10`** - Show top 10 largest directories

---

---

## Command 4: Monitor File Changes in Real-Time

## Command 6: System Diagnostics - Comprehensive Health Check

```bash```bash

watch -n 1 'ls -lah | tail -20'echo "=== PS CHECK ===" && ps aux | grep -E 'nginx|dotnet|php' && echo "=== SERVICES ===" && systemctl list-units --type=service --state=running && echo "=== DYNATRACE ===" && ls -la /var/log/dynatrace* 2>/dev/null || echo "Dynatrace not found" && echo "=== APP PORTS ===" && netstat -tlnp 2>/dev/null | grep -E ':(80|443|8080|8443|9000)' && echo "=== LOG PATHS ===" && find /var/log -type f -name '*.log' 2>/dev/null | head -20 && echo "=== DATADOG CHECK ===" && curl -s -m 5 https://api.datadoghq.com/api/v1/validate --header "DD-API-KEY: test" &>/dev/null && echo "Datadog reachable" || echo "Datadog unreachable" && echo "=== KUBE CHECK ===" && kubectl cluster-info &>/dev/null && (curl -s -m 5 -k https://$(kubectl config view --minify -o jsonpath='{.clusters[0].cluster.server}' | cut -d'/' -f3) &>/dev/null && echo "Kubernetes external registry accessible" || echo "Kubernetes registry check failed") || echo "Not in Kubernetes cluster"

``````



### Explanation### Explanation

- **`watch -n 1`** - Refresh every 1 second

- **`'ls -lah'`** - List files with detailed info (all files, human-readable sizes)This is a **comprehensive system diagnostics one-liner** that performs multiple checks sequentially:

- **`tail -20`** - Show only the last 20 lines

- Updates automatically to show recent file changes#### Section 1: Process Check

- **`ps aux | grep -E 'nginx|dotnet|php'`** - Check running processes for web servers and app frameworks

**Use Case**: Monitor a directory for file creation/modification during builds or deployments

#### Section 2: Services Status

**Exit**: Press `Ctrl+C` to stop- **`systemctl list-units --type=service --state=running`** - List all active running services



---#### Section 3: Dynatrace Availability

- **`ls -la /var/log/dynatrace* 2>/dev/null`** - Check Dynatrace log files exist

## Command 5: Check Disk Usage by Directory- **`|| echo "Dynatrace not found"`** - Fallback message if not found



```bash#### Section 4: Application Ports

du -sh */ | sort -rh | head -10- **`netstat -tlnp 2>/dev/null`** - Show listening ports with process info

```- **`grep -E ':(80|443|8080|8443|9000)'`** - Filter for common web/app ports



### Explanation#### Section 5: Log File Paths

- **`du -sh */`** - Disk usage (`du`) in human-readable format (`h`) of subdirectories (`*/`)- **`find /var/log -type f -name '*.log'`** - Locate all log files

- **`s`** - Summary (total per directory)- **`head -20`** - Show first 20 results

- **`sort -rh`** - Sort in reverse order (`r`) by human-readable numbers (`h`)

- **`head -10`** - Show top 10 largest directories#### Section 6: Datadog Connectivity

- **`curl -s -m 5 https://api.datadoghq.com`** - Test connectivity to Datadog API (5-second timeout)

**Use Case**: Identify which subdirectories are consuming the most disk space- **`--header "DD-API-KEY: test"`** - Add Datadog API header

- **`&>/dev/null`** - Suppress output, only check status

**Example output**:- Returns "reachable" or "unreachable" message

```

50G  ./var#### Section 7: Kubernetes Check

32G  ./home- **`kubectl cluster-info &>/dev/null`** - Verify if running in Kubernetes

18G  ./opt- **`kubectl config view --minify`** - Get cluster server address

```- **`curl -s -m 5 -k https://...`** - Test external registry connectivity (k flag = ignore SSL)

- Returns registry accessibility status or "not in Kubernetes" message

---

---

## Command 6: System Diagnostics - Comprehensive Health Check

## Command 6B: More Readable Multi-Line Version (For Scripts)

```bash```bash

echo "=== PS CHECK ===" && ps aux | grep -E 'nginx|dotnet|php' && echo "=== SERVICES ===" && systemctl list-units --type=service --state=running && echo "=== DYNATRACE ===" && ls -la /var/log/dynatrace* 2>/dev/null || echo "Dynatrace not found" && echo "=== APP PORTS ===" && netstat -tlnp 2>/dev/null | grep -E ':(80|443|8080|8443|9000)' && echo "=== LOG PATHS ===" && find /var/log -type f -name '*.log' 2>/dev/null | head -20 && echo "=== DATADOG CHECK ===" && curl -s -m 5 https://api.datadoghq.com/api/v1/validate --header "DD-API-KEY: test" &>/dev/null && echo "Datadog reachable" || echo "Datadog unreachable"#!/bin/bash

```

echo "=== PS CHECK ==="

### Explanationps aux | grep -E 'nginx|dotnet|php'



This is a **comprehensive system diagnostics one-liner** that performs multiple checks sequentially:echo "=== SERVICES STATUS ==="

systemctl list-units --type=service --state=running

#### Section 1: Process Check

- **`ps aux | grep -E 'nginx|dotnet|php'`** - Check running processes for web servers and app frameworksecho "=== DYNATRACE CHECK ==="

ls -la /var/log/dynatrace* 2>/dev/null || echo "Dynatrace logs not found"

#### Section 2: Services Status

- **`systemctl list-units --type=service --state=running`** - List all active running servicesecho "=== APP PORTS ==="

netstat -tlnp 2>/dev/null | grep -E ':(80|443|8080|8443|9000)'

#### Section 3: Dynatrace Availability

- **`ls -la /var/log/dynatrace* 2>/dev/null`** - Check Dynatrace log files existecho "=== LOG PATHS ==="

- **`|| echo "Dynatrace not found"`** - Fallback message if not foundfind /var/log -type f -name '*.log' 2>/dev/null | head -20



#### Section 4: Application Portsecho "=== DATADOG CONNECTIVITY ==="

- **`netstat -tlnp 2>/dev/null`** - Show listening ports with process infocurl -s -m 5 https://api.datadoghq.com/api/v1/validate \

- **`grep -E ':(80|443|8080|8443|9000)'`** - Filter for common web/app ports  --header "DD-API-KEY: test" &>/dev/null && \

  echo "✓ Datadog reachable" || echo "✗ Datadog unreachable"

#### Section 5: Log File Paths

- **`find /var/log -type f -name '*.log'`** - Locate all log filesecho "=== KUBERNETES CHECK ==="

- **`head -20`** - Show first 20 resultsif kubectl cluster-info &>/dev/null; then

  REGISTRY=$(kubectl config view --minify -o jsonpath='{.clusters[0].cluster.server}' | cut -d'/' -f3)

#### Section 6: Datadog Connectivity  curl -s -m 5 -k https://$REGISTRY &>/dev/null && \

- **`curl -s -m 5 https://api.datadoghq.com/api/v1/validate`** - Test Datadog API (5-second timeout)    echo "✓ Kubernetes registry accessible" || echo "✗ Kubernetes registry unreachable"

- **`--header "DD-API-KEY: test"`** - Add Datadog headerelse

- Returns "reachable" or "unreachable"  echo "Not in Kubernetes cluster"

fi

**Use Case**: Quick health check of all critical system components```



---### When to Use Each Version:

- **Command 6**: When you need a true one-liner to run quickly in terminal

## Command 6B: More Readable Multi-Line Version (For Scripts)- **Command 6B**: When creating a monitoring/diagnostic script for automation



For better readability in scripts or automation, use this version:---



```bash## Command 7: More Powerful System Diagnostics (Advanced One-Liner)

#!/bin/bash

> **Note**: Command 7 has been separated into its own dedicated file for better organization.

echo "=== PS CHECK ==="> 

ps aux | grep -E 'nginx|dotnet|php'> 📄 **See**: [`system-diagnostics-advanced.md`](./system-diagnostics-advanced.md)



echo "=== SERVICES STATUS ==="This advanced diagnostic one-liner includes:

systemctl list-units --type=service --state=running- ✅ **Formatted output** with box drawing characters

- ✅ **Multiple fallbacks** (netstat → ss, nslookup with DNS)

echo "=== DYNATRACE CHECK ==="- ✅ **Enhanced diagnostics** (process/service filtering, Dynatrace log counting, extended port monitoring)

ls -la /var/log/dynatrace* 2>/dev/null || echo "Dynatrace logs not found"- ✅ **Recent logs only** (last 24 hours with `-mtime -1`)

- ✅ **HTTP status codes** from Datadog API

echo "=== APP PORTS ==="- ✅ **Kubernetes node details**

netstat -tlnp 2>/dev/null | grep -E ':(80|443|8080|8443|9000)'- ✅ **DNS resolution testing**

- ✅ **Auto-logging** to timestamped file

echo "=== LOG PATHS ==="

find /var/log -type f -name '*.log' 2>/dev/null | head -20For the complete command and detailed documentation, refer to the separate file.


echo "=== DATADOG CONNECTIVITY ==="
curl -s -m 5 https://api.datadoghq.com/api/v1/validate \
  --header "DD-API-KEY: test" &>/dev/null && \
  echo "✓ Datadog reachable" || echo "✗ Datadog unreachable"
```

### When to Use Each Version
- **Command 6**: Quick diagnostic checks directly in terminal
- **Command 6B**: Part of monitoring scripts or automation workflows

---

## Command 7: Advanced System Diagnostics

:::info
Advanced diagnostic commands with colored output, fallbacks, and logging have been separated into their own file for better organization.

👉 **See**: [System Diagnostics Advanced](./system-diagnostics-advanced.md)
:::

The advanced version includes:
- ✅ Formatted output with box drawing characters
- ✅ Multiple fallbacks (netstat → ss, nslookup with DNS)
- ✅ Enhanced diagnostics with log counting
- ✅ Recent logs only (last 24 hours)
- ✅ HTTP status codes from Datadog
- ✅ Kubernetes node details
- ✅ DNS resolution testing
- ✅ Auto-logging to timestamped file

---

## Tips & Best Practices

### Escaping & Shell Considerations

:::tip
When using complex one-liners, always test in a non-production environment first!
:::

- **Single quotes** (`'`) preserve literal strings
- **Double quotes** (`"`) allow variable expansion
- **Backticks** or `$()` execute commands and use output
- **Semicolons** (`;`) separate commands to run sequentially
- **&&** runs next command only if previous succeeded
- **||** runs next command only if previous failed

### Performance Notes

- For very large files, `find` with `-exec` can be slow
- Consider using `xargs` for better performance: `find . -name "*.log" | xargs rm`
- Always use `-i` flag with `rm` for interactive safety

### macOS vs Linux

Some commands differ between macOS and Linux:
- `sed -i ''` (macOS) vs `sed -i` (Linux)
- `gsed` on macOS if GNU sed required
- `netstat` deprecated on newer Linux, use `ss` instead

---

## Related Documentation

- [System Diagnostics Advanced](./system-diagnostics-advanced.md) - Powerful one-liners with logging
- [Service Check Commands](../services/service-check-commands.md) - systemctl service management
- [Datadog Proxy Testing](../datadog/datadog-proxy-testing.md) - Network diagnostics for Datadog
