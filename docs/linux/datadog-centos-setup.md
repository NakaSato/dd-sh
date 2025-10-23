---
sidebar_position: 2
sidebar_label: "Datadog CentOS Setup"
description: "Complete Datadog Agent setup and configuration guide for CentOS systems"
tags: [datadog, centos, setup, agent]
---

# Datadog CentOS Setup

Complete guide to installing, configuring, and managing Datadog Agent on CentOS systems.

## Installation

### 1. Install Datadog Agent on CentOS

For **Debian/Ubuntu**:

```bash
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=your_api_key_here DD_SITE="datadoghq.com" \
  bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_agent.sh)"
```

For **CentOS/RHEL**, use YUM:

```bash
sudo yum install -y https://s3.amazonaws.com/dd-agent/scripts/install_agent.sh
```

### 2. Start Datadog Agent Service

```bash
sudo systemctl start datadog-agent
```

### 3. Enable Auto-start on Boot

```bash
sudo systemctl enable datadog-agent
```

## Service Management

### Check Agent Status

```bash
sudo systemctl status datadog-agent
```

### Restart Agent

```bash
sudo systemctl restart datadog-agent
```

### Stop Agent

```bash
sudo systemctl stop datadog-agent
```

### Restart All Agent Services

```bash
sudo systemctl restart datadog-agent datadog-agent-trace datadog-agent-process
```

## Configuration

### Edit Datadog Agent Configuration

**Using nano:**
```bash
sudo nano /etc/datadog-agent/datadog.yaml
```

**Using vim:**
```bash
sudo vim /etc/datadog-agent/datadog.yaml
```

### Vim Quick Edit Commands for Basic Configuration

```bash
# Open config file and jump to specific sections
sudo vim +/api_key /etc/datadog-agent/datadog.yaml          # Jump to API key line
sudo vim +/site /etc/datadog-agent/datadog.yaml             # Jump to site configuration
sudo vim +/hostname /etc/datadog-agent/datadog.yaml         # Jump to hostname setting
sudo vim +/logs_enabled /etc/datadog-agent/datadog.yaml     # Jump to logs setting
```

**Essential vim commands for configuration editing:**
```bash
# Search and replace patterns
:%s/# api_key:/api_key: your_api_key_here/g                 # Uncomment and set API key
:%s/# site:.*/site: datadoghq.com/g                         # Uncomment and set site
:%s/# logs_enabled: false/logs_enabled: true/g              # Enable logs collection
:%s/# hostname:.*/hostname: $(hostname)/g                   # Set current hostname

# Quick edits in vim
/api_key          # Search for api_key
n                 # Next occurrence
i                 # Insert mode
<ESC>             # Exit insert mode
:wq               # Write and quit
:q!               # Quit without saving
```

**One-liner vim edits:**
```bash
# Enable logs collection
sudo vim -c '%s/# logs_enabled: false/logs_enabled: true/g' -c 'wq' /etc/datadog-agent/datadog.yaml

# Set API key (replace YOUR_KEY with actual key)
sudo vim -c '%s/# api_key:.*/api_key: YOUR_KEY/g' -c 'wq' /etc/datadog-agent/datadog.yaml

# Set site to US
sudo vim -c '%s/# site:.*/site: datadoghq.com/g' -c 'wq' /etc/datadog-agent/datadog.yaml

# Set hostname to current system hostname
sudo vim -c '%s/# hostname:.*/hostname: '$(hostname)'/g' -c 'wq' /etc/datadog-agent/datadog.yaml
```

**Advanced vim configuration editing:**
```bash
# Multiple replacements in one command
sudo vim -c '%s/# api_key:.*/api_key: YOUR_KEY/g | %s/# site:.*/site: datadoghq.com/g | %s/# logs_enabled: false/logs_enabled: true/g' -c 'wq' /etc/datadog-agent/datadog.yaml

# Add tags section (append after line containing 'hostname:')
sudo vim -c '/hostname:/a\
\
# Tags\
tags:\
  - env:production\
  - service:myapp\
  - team:devops' -c 'wq' /etc/datadog-agent/datadog.yaml

# Backup and edit
sudo cp /etc/datadog-agent/datadog.yaml /etc/datadog-agent/datadog.yaml.backup
sudo vim /etc/datadog-agent/datadog.yaml
```

### Basic Configuration

```yaml
# API Key
api_key: your_api_key_here

# Datadog Site
site: datadoghq.com

# Hostname
hostname: your-server-name

# Tags
tags:
  - env:production
  - service:myapp
  - team:devops

# Log collection
logs_enabled: true

# APM (Application Performance Monitoring)
apm_config:
  enabled: true
  apm_dd_url: https://trace.datadoghq.com
  env: production
  receiver_port: 8126
  max_traces_per_second: 10
  analyzed_rate_by_service:
    my-app|env:staging: 1.0
    my-app|env:production: 0.5
```

## Advanced APM Configuration

### Complete APM Configuration Example

```yaml
# APM Configuration Section in /etc/datadog-agent/datadog.yaml
apm_config:
  # Enable APM
  enabled: true
  
  # Datadog APM endpoint (US site)
  apm_dd_url: https://trace.datadoghq.com
  
  # For EU site, use:
  # apm_dd_url: https://trace.datadoghq.eu
  
  # Environment tag for all traces
  env: production
  
  # Port for trace collection (default: 8126)
  receiver_port: 8126
  
  # Maximum traces per second
  max_traces_per_second: 10
  
  # Connection timeout
  receiver_timeout: 5
  
  # Additional local hostname
  apm_non_local_traffic: false
  
  # Enable/disable detailed debug logging
  log_level: info
  
  # Analyzed spans rate by service
  analyzed_rate_by_service:
    my-web-app|env:production: 1.0
    my-api|env:production: 0.5
    my-background-service|env:production: 0.1
  
  # Filter configuration
  filter_tags:
    require:
      - "env:production"
    reject:
      - "http.status_code:404"
  
  # Replace rules for sensitive data
  replace_tags:
    - name: "password"
      pattern: "password=.*"
      repl: "password=***"
    - name: "credit_card"
      pattern: "\\d{4}-\\d{4}-\\d{4}-\\d{4}"
      repl: "****-****-****-****"
  
  # Ignore resources (URLs, etc.)
  ignore_resources:
    - "GET /health"
    - "GET /ping"
    - "OPTIONS .*"
```

### APM Configuration Commands

```bash
# Enable APM in datadog.yaml
sudo vim -c '/apm_config:/,/enabled:/s/enabled: false/enabled: true/' -c 'wq' /etc/datadog-agent/datadog.yaml

# Set APM environment
sudo vim -c '/apm_config:/a\  env: production' -c 'wq' /etc/datadog-agent/datadog.yaml

# Set custom APM port
sudo vim -c '/apm_config:/a\  receiver_port: 8126' -c 'wq' /etc/datadog-agent/datadog.yaml

# Enable non-local traffic (for containerized apps)
sudo vim -c '/apm_config:/a\  apm_non_local_traffic: true' -c 'wq' /etc/datadog-agent/datadog.yaml
```

### APM Environment-Specific Configurations

**Development Environment:**
```yaml
apm_config:
  enabled: true
  apm_dd_url: https://trace.datadoghq.com
  env: development
  receiver_port: 8126
  max_traces_per_second: 50
  log_level: debug
  analyzed_rate_by_service:
    "*|env:development": 1.0
```

**Staging Environment:**
```yaml
apm_config:
  enabled: true
  apm_dd_url: https://trace.datadoghq.com
  env: staging
  receiver_port: 8126
  max_traces_per_second: 20
  analyzed_rate_by_service:
    "*|env:staging": 0.8
  ignore_resources:
    - "GET /health"
    - "GET /metrics"
```

**Production Environment:**
```yaml
apm_config:
  enabled: true
  apm_dd_url: https://trace.datadoghq.com
  env: production
  receiver_port: 8126
  max_traces_per_second: 10
  analyzed_rate_by_service:
    "critical-service|env:production": 1.0
    "web-app|env:production": 0.3
    "background-jobs|env:production": 0.1
  filter_tags:
    require:
      - "env:production"
  replace_tags:
    - name: "password"
      pattern: "password=.*"
      repl: "password=***"
  ignore_resources:
    - "GET /health"
    - "GET /ping"
    - "GET /favicon.ico"
    - "OPTIONS .*"
```

### APM Service-Specific Configuration

**Web Application APM:**
```yaml
# For web apps with high traffic
apm_config:
  enabled: true
  env: production
  receiver_port: 8126
  max_traces_per_second: 100
  analyzed_rate_by_service:
    "webapp|env:production": 0.1
  ignore_resources:
    - "GET /static/.*"
    - "GET /assets/.*"
    - "GET /favicon.ico"
  replace_tags:
    - name: "user_id"
      pattern: "user_id=\\d+"
      repl: "user_id=***"
```

**API Service APM:**
```yaml
# For API services
apm_config:
  enabled: true
  env: production
  receiver_port: 8126
  max_traces_per_second: 50
  analyzed_rate_by_service:
    "api|env:production": 0.5
  filter_tags:
    require:
      - "service:api"
  ignore_resources:
    - "GET /v1/health"
    - "GET /v1/status"
```

**Microservices APM:**
```yaml
# For microservices architecture
apm_config:
  enabled: true
  env: production
  receiver_port: 8126
  apm_non_local_traffic: true
  max_traces_per_second: 30
  analyzed_rate_by_service:
    "user-service|env:production": 1.0
    "payment-service|env:production": 1.0
    "notification-service|env:production": 0.2
    "logging-service|env:production": 0.05
```

### APM Vim Configuration Commands

```bash
# Complete APM setup with vim
sudo vim -c '
/apm_config:/,/enabled:/c
apm_config:
  enabled: true
  apm_dd_url: https://trace.datadoghq.com
  env: production
  receiver_port: 8126
  max_traces_per_second: 10
  analyzed_rate_by_service:
    "my-app|env:production": 0.5
' -c 'wq' /etc/datadog-agent/datadog.yaml

# Add APM environment tag
sudo vim -c '/apm_config:/,/enabled: true/a\  env: production' -c 'wq' /etc/datadog-agent/datadog.yaml

# Enable APM for containerized applications
sudo vim -c '/apm_config:/,/enabled: true/a\  apm_non_local_traffic: true' -c 'wq' /etc/datadog-agent/datadog.yaml

# Add analyzed rate configuration
sudo vim -c '/apm_config:/,/enabled: true/a\
  analyzed_rate_by_service:\
    "*|env:production": 0.1' -c 'wq' /etc/datadog-agent/datadog.yaml
```

### APM Testing and Validation

```bash
# Check if APM is enabled
sudo grep -A 10 "apm_config:" /etc/datadog-agent/datadog.yaml

# Test APM endpoint connectivity
curl -v telnet://localhost:8126

# Check APM status in agent status
sudo datadog-agent status | grep -A 20 "APM Agent"

# Verify APM traces are being received
sudo tail -f /var/log/datadog/trace-agent.log

# Send test trace (requires trace library)
curl -X POST http://localhost:8126/v0.4/traces \
  -H "Content-Type: application/msgpack" \
  -d '[]'
```

### Quick APM Health Check Commands

```bash
# Check APM status
sudo datadog-agent status | grep -A 20 "APM Agent"

# Test APM connectivity
curl -v telnet://localhost:8126

# Monitor APM logs
sudo tail -f /var/log/datadog/trace-agent.log
```

### APM One-Liner Diagnostics

```bash
# Complete APM status check
sudo datadog-agent status | grep -A 10 "APM Agent"
sudo grep -A 5 "apm_config:" /etc/datadog-agent/datadog.yaml
netstat -tlnp | grep 8126

# APM connectivity and log check
telnet localhost 8126
sudo tail -10 /var/log/datadog/trace-agent.log

# APM troubleshooting one-liner
sudo datadog-agent status | grep -i apm
netstat -an | grep 8126
ps aux | grep trace-agent
```

### Enable Logs Collection

```bash
sudo sed -i 's/# logs_enabled: false/logs_enabled: true/' /etc/datadog-agent/datadog.yaml
sudo systemctl restart datadog-agent
```

### Enable Process Agent

```bash
sudo sed -i 's/# enabled: false/enabled: true/' /etc/datadog-agent/conf.d/process.d/conf.yaml
sudo systemctl restart datadog-agent
```

### Set Datadog Site

```bash
sudo sed -i 's/# site:.*/site: datadoghq.com/' /etc/datadog-agent/datadog.yaml
```

## View Logs

### View Agent Logs in Real-Time

```bash
sudo tail -f /var/log/datadog/agent.log
```

### View Last 50 Lines

```bash
sudo tail -50 /var/log/datadog/agent.log
```

### Search for Errors

```bash
sudo grep -i error /var/log/datadog/agent.log
```

### View Recent Agent Logs with Errors

```bash
sudo tail -50 /var/log/datadog/agent.log | grep -i error
```

## Powerful Grep Commands for Log Analysis

### Search Multiple Error Types

```bash
# Search for errors, warnings, and failures
sudo grep -iE "(error|warning|fail|exception|critical)" /var/log/datadog/agent.log

# Color-coded output for better visibility
sudo grep -iE --color=always "(error|warning|fail|exception|critical)" /var/log/datadog/agent.log
```

### Advanced Pattern Matching

```bash
# Search with context (3 lines before and after)
sudo grep -iA3 -B3 "error" /var/log/datadog/agent.log

# Search for connection issues
sudo grep -iE "(connection|timeout|refused|unreachable)" /var/log/datadog/agent.log

# Find API key related issues
sudo grep -iE "(api.*key|authentication|unauthorized|403|401)" /var/log/datadog/agent.log
```

### Time-Based Log Analysis

```bash
# Search for errors in the last hour (assuming timestamp format)
sudo grep -E "$(date '+%Y-%m-%d %H')" /var/log/datadog/agent.log | grep -i error

# Search for today's errors
sudo grep -E "$(date '+%Y-%m-%d')" /var/log/datadog/agent.log | grep -i error

# Search for specific time pattern (e.g., last 30 minutes)
sudo awk '/2024-.*T[0-9]{2}:[3-6][0-9]:[0-9]{2}/ {print}' /var/log/datadog/agent.log | grep -i error
```

### Integration-Specific Searches

```bash
# Search for specific integration issues
sudo grep -iE "(nginx|mysql|redis|postgres|apache)" /var/log/datadog/agent.log | grep -i error

# Find failed checks
sudo grep -iE "check.*failed|check.*error" /var/log/datadog/agent.log

# Search for configuration issues
sudo grep -iE "(config|configuration|yaml|parse)" /var/log/datadog/agent.log
```

### Network and Connectivity Issues

```bash
# Find network-related problems
sudo grep -iE "(dns|network|socket|connection|proxy|firewall)" /var/log/datadog/agent.log

# Search for SSL/TLS issues
sudo grep -iE "(ssl|tls|certificate|handshake)" /var/log/datadog/agent.log

# Find timeout issues with context
sudo grep -iA5 -B5 "timeout" /var/log/datadog/agent.log
```

### Performance and Resource Issues

```bash
# Find memory or CPU related issues
sudo grep -iE "(memory|cpu|resource|limit|usage)" /var/log/datadog/agent.log

# Search for slow operations
sudo grep -iE "(slow|performance|lag|delay)" /var/log/datadog/agent.log

# Find disk space issues
sudo grep -iE "(disk|space|full|no.*space)" /var/log/datadog/agent.log
```

### Multi-File Log Analysis

```bash
# Search across all Datadog log files
sudo grep -r -i "error" /var/log/datadog/

# Search with file names shown
sudo grep -r -H -i "connection" /var/log/datadog/

# Search multiple system logs for Datadog references
sudo grep -h -i "datadog" /var/log/messages /var/log/syslog /var/log/daemon.log 2>/dev/null
```

### Advanced Filtering and Counting

```bash
# Count occurrences of errors by type
sudo grep -io -E "(error|warning|critical)" /var/log/datadog/agent.log | sort | uniq -c | sort -nr

# Find unique error messages (remove timestamps)
sudo grep -i error /var/log/datadog/agent.log | sed 's/^[0-9-]* [0-9:.]*//' | sort | uniq

# Get error statistics for the last 100 lines
sudo tail -100 /var/log/datadog/agent.log | grep -c -i error
```

### Real-Time Monitoring

```bash
# Monitor logs in real-time for errors
sudo tail -f /var/log/datadog/agent.log | grep -i --color=always error

# Monitor multiple patterns simultaneously
sudo tail -f /var/log/datadog/agent.log | grep -iE --color=always "(error|warning|fail|timeout)"

# Monitor with timestamps
sudo tail -f /var/log/datadog/agent.log | grep -iE --color=always "$(date '+%Y-%m-%d').*(error|warning)"
```

### Complex Search Patterns

```bash
# Find lines that contain both "check" AND "failed"
sudo grep -i "check" /var/log/datadog/agent.log | grep -i "failed"

# Find errors but exclude certain patterns
sudo grep -i error /var/log/datadog/agent.log | grep -v -E "(test|debug|info)"

# Search for errors in specific integrations
sudo grep -E "nginx.*error|mysql.*error|redis.*error" /var/log/datadog/agent.log
```

### Log Rotation Aware Searches

```bash
# Search current and rotated logs
sudo zgrep -h -i "error" /var/log/datadog/agent.log* | tail -50

# Search across all rotated files for specific patterns
for log in /var/log/datadog/agent.log*; do
  if [[ $log == *.gz ]]; then
    zgrep -i "connection.*failed" "$log"
  else
    grep -i "connection.*failed" "$log"
  fi
done
```

### Export and Report Generation

```bash
# Create error summary report
sudo grep -c -i error /var/log/datadog/agent.log > datadog_error_report.txt
sudo grep -io -E "(error|warning|critical|fatal)" /var/log/datadog/agent.log | sort | uniq -c | sort -nr >> datadog_error_report.txt
sudo grep -i error /var/log/datadog/agent.log | tail -20 >> datadog_error_report.txt
```

### One-Liner Diagnostic Commands

```bash
# Quick health check with grep
sudo grep -iE "(error|warning|fail)" /var/log/datadog/agent.log | tail -10
sudo systemctl is-active datadog-agent

# Find and count recent issues
sudo tail -100 /var/log/datadog/agent.log | grep -iE "(error|warning|fail)" | wc -l

# Complete diagnostic grep chain
sudo tail -200 /var/log/datadog/agent.log | grep -iE "(error|warning|fail|timeout|connection)" | head -10
sudo tail -200 /var/log/datadog/agent.log | grep -iE "(error|warning|fail)" | wc -l
```

## Agent Diagnostics

### Check Agent Version

```bash
sudo datadog-agent version
```

### Agent Status

```bash
sudo datadog-agent status
```

### Check Running Integrations

```bash
sudo datadog-agent check --list
```

### List Failed Checks

```bash
sudo datadog-agent check --list-failed
```

### Run Specific Check

```bash
sudo datadog-agent check system
```

### Validate Configuration

```bash
sudo datadog-agent configcheck
```

### Check Specific Integration Status

```bash
sudo datadog-agent check nginx
```

### List Installed Integrations

```bash
sudo datadog-agent integration list
```

### Check Agent Permissions

```bash
ls -la /etc/datadog-agent/
sudo usermod -a -G adm dd-agent
```

## Testing and Validation

### Test API Connectivity

```bash
curl -s -X GET "https://api.datadoghq.com/api/v1/validate" \
  -H "DD-API-KEY: your_api_key_here" | head -20
```

### Check Agent Connectivity

```bash
sudo datadog-agent diagnose
```

### Simple Connectivity Check

```bash
nc -zv api.datadoghq.com 443
```

### Verify Configuration File

```bash
sudo cat /etc/datadog-agent/datadog.yaml | grep -E "^(api_key|site|logs_enabled)"
```

## Integration Configuration

### 1. Nginx Integration

```bash
sudo tee /etc/datadog-agent/conf.d/nginx.d/conf.yaml > /dev/null << EOF
init_config:

instances:
  - nginx_status_url: http://localhost:8080/nginx_status

tags:
  - env:production
  - service:myapp
EOF
```

### 2. MySQL Integration

```bash
sudo tee /etc/datadog-agent/conf.d/mysql.d/conf.yaml > /dev/null << EOF
init_config:

instances:
  - server: localhost
    user: datadog
    password: your_password
    port: 3306

logs:
  - type: file
    path: /var/log/mysql/error.log
    source: mysql
    service: mysql
EOF
```

### 3. System Logs Configuration

```bash
sudo tee /etc/datadog-agent/conf.d/system.d/conf.yaml > /dev/null << EOF
logs:
  - type: file
    path: /var/log/syslog
    service: system
    source: linux

  - type: file
    path: /var/log/nginx/access.log
    service: nginx
    source: nginx

  - type: file
    path: /var/log/mysql/error.log
    service: mysql
    source: mysql
EOF
```

### Restart Agent to Apply Changes

```bash
sudo systemctl restart datadog-agent
```

## Troubleshooting

### Agent Not Starting

Check for syntax errors:

```bash
sudo datadog-agent configcheck
```

View recent errors:

```bash
sudo journalctl -u datadog-agent -n 50
```

### No Metrics Being Sent

Verify API key:

```bash
sudo grep "api_key" /etc/datadog-agent/datadog.yaml
```

Check connectivity:

```bash
curl -s -I https://api.datadoghq.com
```

Restart agent:

```bash
sudo systemctl restart datadog-agent
```

### High CPU/Memory Usage

Check agent process:

```bash
ps aux | grep datadog-agent
```

View resource usage:

```bash
top -p $(pgrep -f datadog-agent)
```

Disable unnecessary integrations:

```bash
sudo nano /etc/datadog-agent/conf.d/
```

### Enable Debug Mode

Create debug config:

```bash
sudo tee /etc/datadog-agent/datadog.yaml > /dev/null << EOF
debug: true
log_level: debug
EOF
```

Restart with debug enabled:

```bash
sudo systemctl restart datadog-agent
```

View debug logs:

```bash
sudo tail -f /var/log/datadog/agent.log
```

## Uninstall

### Remove Datadog Agent

Stop the agent:

```bash
sudo systemctl stop datadog-agent
```

Disable auto-start:

```bash
sudo systemctl disable datadog-agent
```

Remove the package:

```bash
sudo yum remove datadog-agent
```

### Clean Up Configuration Files

Remove config directory:

```bash
sudo rm -rf /etc/datadog-agent
```

Remove logs:

```bash
sudo rm -rf /var/log/datadog
```

## Environment Variables

### Set API Key

```bash
export DD_API_KEY="your_api_key_here"
```

### Set Site (US or EU)

```bash
export DD_SITE="datadoghq.com"  # or datadoghq.eu
```

### Set Hostname

```bash
export DATADOG_HOSTNAME="my-server"
```

### Set Environment Tag

```bash
export DD_ENV="production"
```

### Set Service Name

```bash
export DD_SERVICE="myapp"
```

### Set Version

```bash
export DD_VERSION="1.0.0"
```

## Quick Reference Table

| Task | Command |
|------|---------|
| Install Agent | `DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=key DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_agent.sh)"` |
| Start Agent | `sudo systemctl start datadog-agent` |
| Check Status | `sudo systemctl status datadog-agent` |
| View Logs | `sudo tail -f /var/log/datadog/agent.log` |
| Agent Status | `sudo datadog-agent status` |
| Check Version | `sudo datadog-agent version` |
| Edit Config | `sudo nano /etc/datadog-agent/datadog.yaml` |
| Restart Agent | `sudo systemctl restart datadog-agent` |
| Enable Auto-start | `sudo systemctl enable datadog-agent` |
| Stop Agent | `sudo systemctl stop datadog-agent` |
| Test Connectivity | `curl -s https://api.datadoghq.com/api/v1/validate -H "DD-API-KEY: key"` |
| Uninstall | `sudo yum remove datadog-agent` |

## One-Liner Commands

### Install, Configure, and Start Agent

```bash
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=your_api_key_here DD_SITE="datadoghq.com" \
  bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_agent.sh)"
sudo systemctl start datadog-agent
sudo systemctl enable datadog-agent
```

### Quick Status Check

```bash
sudo datadog-agent status
```

### Full Diagnostics Report

```bash
sudo systemctl status datadog-agent
sudo datadog-agent version
sudo datadog-agent check --list-failed
sudo tail -20 /var/log/datadog/agent.log
```

### View Agent + System Info

```bash
sudo datadog-agent version
hostnamectl
systemctl is-active datadog-agent
nc -zv api.datadoghq.com 443
```

## Configuration Files Reference

### Main Configuration File

- `/etc/datadog-agent/datadog.yaml` - Main agent configuration

### Integration Configs

- `/etc/datadog-agent/conf.d/` - Directory for integration configs
- `/etc/datadog-agent/conf.d/nginx.d/conf.yaml` - Nginx integration
- `/etc/datadog-agent/conf.d/mysql.d/conf.yaml` - MySQL integration
- `/etc/datadog-agent/conf.d/system.d/conf.yaml` - System metrics

### Log Files

- `/var/log/datadog/agent.log` - Main agent log
- `/var/log/datadog/` - All agent logs directory

## Related Documentation

- [One-Line Bash Commands](./oneline-commands.md) - Essential Linux one-liners
- [Service Check Commands](../services/service-check-commands.md) - systemctl management
- [Datadog Proxy Testing](../datadog/datadog-proxy-testing.md) - Network proxy diagnostics
