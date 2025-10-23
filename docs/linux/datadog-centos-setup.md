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

```bash
sudo nano /etc/datadog-agent/datadog.yaml
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
  bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_agent.sh)" && \
  sudo systemctl start datadog-agent && \
  sudo systemctl enable datadog-agent && \
  echo "✓ Datadog Agent installed and started"
```

### Quick Status Check

```bash
sudo datadog-agent status && echo "✓ Agent is healthy" || echo "✗ Agent has issues"
```

### Full Diagnostics Report

```bash
echo "=== DATADOG AGENT STATUS ===" && \
sudo systemctl status datadog-agent && \
echo "=== AGENT VERSION ===" && \
sudo datadog-agent version && \
echo "=== RUNNING CHECKS ===" && \
sudo datadog-agent check --list-failed && \
echo "=== RECENT LOGS ===" && \
sudo tail -20 /var/log/datadog/agent.log
```

### View Agent + System Info

```bash
echo "=== DATADOG AGENT ===" && sudo datadog-agent version && \
echo "" && echo "=== SYSTEM INFO ===" && hostnamectl && \
echo "" && echo "=== AGENT RUNNING ===" && systemctl is-active datadog-agent && \
echo "" && echo "=== CONNECTIVITY ===" && nc -zv api.datadoghq.com 443
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
- [Datadog Proxy Testing](./datadog-proxy-testing.md) - Network proxy diagnostics
