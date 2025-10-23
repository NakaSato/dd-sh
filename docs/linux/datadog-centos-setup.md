------------

sidebar_position: 2

sidebar_label: "Datadog CentOS Setup"sidebar_position: 2

description: "Datadog Agent setup commands for CentOS"

tags: [datadog, centos, setup, agent]sidebar_label: "Datadog CentOS Setup"sidebar_position: 2sidebar_position: 2

---

description: "Datadog Agent setup and configuration guide for CentOS systems"

# Datadog CentOS Setup

tags: [datadog, centos, agent, monitoring]sidebar_label: "Datadog CentOS Setup"sidebar_label: Datadog CentOS Setup

Essential commands for installing and configuring the Datadog Agent on CentOS systems.

---

## Installation

description: "Complete Datadog Agent setup and configuration guide for CentOS systems"description: Complete Datadog Agent setup and configuration guide for CentOS systems

### Install Datadog Agent

# Datadog Platform Setup - CentOS

```bash

DD_AGENT_MAJOR_VERSION=7 \tags: [datadog, centos, agent, monitoring, installation, configuration, logs]tags: [datadog, centos, agent, monitoring, installation, configuration, logs]

DD_API_KEY=YOUR_API_KEY \

DD_SITE="datadoghq.com" \Complete guide to installing and managing Datadog Agent on CentOS.

bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"

```------



### Enable and Start Agent## Installation



```bash

sudo systemctl enable datadog-agent

sudo systemctl start datadog-agent### Install Datadog Agent on CentOS

```

# Datadog Platform Setup & Commands for CentOS# Datadog Platform Setup & Commands for CentOS

## Service Management

```bash

### Check Agent Status

DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=your_api_key DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_agent.sh)"

```bash

sudo systemctl status datadog-agent```

```

Complete guide to installing, configuring, and managing Datadog Agent on CentOS systems.Complete guide to installing, configuring, and managing Datadog Agent on CentOS systems with 50+ commands for different scenarios.

### Restart Agent

## Service Management

```bash

sudo systemctl restart datadog-agent

```

### Start Agent

### Stop Agent

## Installation Commands## Installation Commands

```bash

sudo systemctl stop datadog-agent```bash

```

sudo systemctl start datadog-agent

### View Agent Logs

sudo systemctl enable datadog-agent

```bash

sudo tail -f /var/log/datadog/agent.log```### 1. Install Datadog Agent on CentOS### 1. Install Datadog Agent on CentOS

```



## Configuration

### Check Status

### Set Datadog API Key



```bash

sudo sed -i 's/# api_key:.*/api_key: YOUR_API_KEY/' /etc/datadog-agent/datadog.yaml```bash```bash---```bash

```

sudo systemctl status datadog-agent

### Set Datadog Site

sudo datadog-agent statusDD_AGENT_MAJOR_VERSION=7 DD_API_KEY=your_api_key_here DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_agent.sh)"

```bash

sudo sed -i 's/# site:.*/site: datadoghq.com/' /etc/datadog-agent/datadog.yaml```

```

```DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=your_api_key_here DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_agent.sh)"

### Enable Logs Collection

### View Logs

```bash

sudo sed -i 's/# logs_enabled: false/logs_enabled: true/' /etc/datadog-agent/datadog.yaml

sudo systemctl restart datadog-agent

``````bash



### Enable Process Agentsudo tail -f /var/log/datadog/agent.log**Explanation**:# Datadog Platform Setup & Commands for CentOS```



```bash```

sudo sed -i 's/# enabled: false/enabled: true/' /etc/datadog-agent/conf.d/process.d/conf.yaml

sudo systemctl restart datadog-agent- `DD_AGENT_MAJOR_VERSION=7` - Specifies Datadog Agent version 7

```

## Configuration

## Agent Diagnostics

- `DD_API_KEY=your_api_key_here` - Your Datadog API key (replace with actual key)

### Version Information

### Edit Config

```bash

sudo datadog-agent version- `DD_SITE="datadoghq.com"` - Datadog site (US), use `datadoghq.eu` for EU

```

```bash

### List Active Checks

sudo nano /etc/datadog-agent/datadog.yaml- `bash -c "$(curl -L ...)"` - Downloads and executes the installation scriptComplete guide to installing, configuring, and managing Datadog Agent on CentOS systems with 50+ commands for different scenarios.**Explanation**:

```bash

sudo datadog-agent check --list```

```



### List Failed Checks

### Basic Configuration

```bash

sudo datadog-agent check --list-failed:::tip- `DD_AGENT_MAJOR_VERSION=7` - Specifies Datadog Agent version 7

```

```yaml

### Run Specific Check

api_key: your_api_key_hereReplace `your_api_key_here` with your actual Datadog API key from your Datadog account.

```bash

sudo datadog-agent check systemsite: datadoghq.com

```

hostname: your-server-name:::## Installation Commands- `DD_API_KEY=your_api_key_here` - Your Datadog API key (replace with actual key)

## Testing and Validation



### API Key Validation

tags:

```bash

curl -X POST "https://api.datadoghq.com/api/v1/validate" \  - env:production

  -H "DD-API-KEY: YOUR_API_KEY" \

  -d ""  - service:myapp---- `DD_SITE="datadoghq.com"` - Datadog site (US), use `datadoghq.eu` for EU

```



### Test Connectivity

logs_enabled: true

```bash

curl -s -X GET "https://api.datadoghq.com/api/v1/validate" \```

  -H "DD-API-KEY: YOUR_API_KEY"

```### 2. Start Datadog Agent Service### 1. Install Datadog Agent on CentOS- `bash -c "$(curl -L ...)"` - Downloads and executes the installation script



### Check Agent Connectivity## Testing



```bash

sudo datadog-agent diagnose

```### Test Connectivity



## Common Troubleshooting```bash



### Verify Configuration File```bash



```bashcurl -s https://api.datadoghq.com/api/v1/validate -H "DD-API-KEY: your_api_key"sudo systemctl start datadog-agent

sudo cat /etc/datadog-agent/datadog.yaml | grep -E "^(api_key|site|logs_enabled)"

```sudo datadog-agent diagnose



### Check Agent Permissions`````````bash---



```bash

ls -la /etc/datadog-agent/

sudo usermod -a -G adm dd-agent## Related Documentation

```



### View Recent Agent Logs

- [One-Line Bash Commands](./oneline-commands.md)**Related Commands**:DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=your_api_key_here DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_agent.sh)"

```bash

sudo tail -50 /var/log/datadog/agent.log | grep -i error- [Service Check Commands](../services/service-check-commands.md)

```

- [Datadog Proxy Testing](../datadog/datadog-proxy-testing.md)```bash

### Restart All Agent Services



```bash# Check agent status```### 2. Install via YUM Repository (CentOS 7/8/9)

sudo systemctl restart datadog-agent datadog-agent-trace datadog-agent-process

```sudo systemctl status datadog-agent



## Integration Management```bash



### List Installed Integrations# Enable auto-start on boot



```bashsudo systemctl enable datadog-agent**Explanation**:echo "deb https://apt.datadoghq.com stable 7" | sudo tee /etc/apt/sources.list.d/datadog.list && sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 382E94DE3763E4EE

sudo datadog-agent integration list

```



### View Integration Configuration# Restart agent- `DD_AGENT_MAJOR_VERSION=7` - Specifies Datadog Agent version 7```



```bashsudo systemctl restart datadog-agent

ls /etc/datadog-agent/conf.d/

```- `DD_API_KEY=your_api_key_here` - Your Datadog API key (replace with actual key)



### Validate Integration# Stop agent



```bashsudo systemctl stop datadog-agent- `DD_SITE="datadoghq.com"` - Datadog site (US), use `datadoghq.eu` for EUFor **CentOS/RHEL**, use YUM instead:

sudo datadog-agent check check_name

``````


- `bash -c "$(curl -L ...)"` - Downloads and executes the installation script```bash

---

sudo yum install -y https://s3.amazonaws.com/dd-agent/scripts/install_agent.sh

## Configuration Commands

:::tip```

### 3. Edit Datadog Agent Configuration

Replace `your_api_key_here` with your actual Datadog API key from your Datadog account.

```bash

sudo nano /etc/datadog-agent/datadog.yaml:::---

```



**Key Configuration Options**:

```yaml---### 3. Start Datadog Agent Service

# API Key

api_key: your_api_key_here```bash



# Datadog Site### 2. Install via YUM Repository (CentOS 7/8/9)sudo systemctl start datadog-agent

site: datadoghq.com

```

# Hostname

hostname: your-server-name```bash



# Tagsecho "deb https://apt.datadoghq.com stable 7" | sudo tee /etc/apt/sources.list.d/datadog.list && sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 382E94DE3763E4EE**Related Commands**:

tags:

  - env:production``````bash

  - service:myapp

  - team:devops# Check agent status



# Log collectionFor **CentOS/RHEL**, use YUM instead:sudo systemctl status datadog-agent

logs_enabled: true



# APM (Application Performance Monitoring)

apm_config:```bash# Enable auto-start on boot

  enabled: true

  apm_dd_url: https://trace.datadoghq.comsudo yum install -y https://s3.amazonaws.com/dd-agent/scripts/install_agent.shsudo systemctl enable datadog-agent

```

```

---

# Restart agent

## Verification & Testing

---sudo systemctl restart datadog-agent

### 4. Check Agent Status



```bash

sudo datadog-agent status### 3. Start Datadog Agent Service# Stop agent

```

sudo systemctl stop datadog-agent

**Output shows**:

- Agent version```bash```

- Python version

- Running checkssudo systemctl start datadog-agent

- System checks

```---

---



### 5. Check Agent Logs

**Related Commands**:## Configuration Commands

```bash

# View main agent logs

sudo tail -f /var/log/datadog/agent.log

```bash### 4. Edit Datadog Agent Configuration

# View last 50 lines

sudo tail -50 /var/log/datadog/agent.log# Check agent status```bash



# Search for errorssudo systemctl status datadog-agentsudo nano /etc/datadog-agent/datadog.yaml

sudo grep -i error /var/log/datadog/agent.log

``````



---# Enable auto-start on boot



### 6. Test Connectivity to Datadogsudo systemctl enable datadog-agent**Key Configuration Options**:



```bash```yaml

# Test API connectivity

curl -s -X GET "https://api.datadoghq.com/api/v1/validate" \# Restart agent# API Key

  -H "DD-API-KEY: your_api_key_here" | head -20

sudo systemctl restart datadog-agentapi_key: your_api_key_here

# Check if agent can reach Datadog

sudo datadog-agent diagnose



# Simple connectivity check# Stop agent# Datadog Site

nc -zv api.datadoghq.com 443

```sudo systemctl stop datadog-agentsite: datadoghq.com



---```



## Common Management Commands# Hostname



### 7. Service Operations---hostname: your-server-name



```bash

# Restart agent

sudo systemctl restart datadog-agent## Configuration Commands# Tags



# Check versiontags:

sudo datadog-agent version

### 4. Edit Datadog Agent Configuration  - env:production

# Validate config

sudo datadog-agent configcheck  - service:myapp



# Check running integrations```bash  - team:devops

sudo datadog-agent integration show

```sudo nano /etc/datadog-agent/datadog.yaml



---```# Log collection



### 8. Remove Datadog Agentlogs_enabled: true



```bash**Key Configuration Options**:

# Stop the agent

sudo systemctl stop datadog-agent# APM (Application Performance Monitoring)



# Disable auto-start```yamlapm_config:

sudo systemctl disable datadog-agent

# API Key  enabled: true

# Remove the package

sudo yum remove datadog-agentapi_key: your_api_key_here  apm_dd_url: https://trace.datadoghq.com



# Remove config directory```

sudo rm -rf /etc/datadog-agent

# Datadog Site

# Remove logs

sudo rm -rf /var/log/datadogsite: datadoghq.com---

```



---

# Hostname### 5. Enable Specific Integrations

## Quick Reference Table

hostname: your-server-name```bash

| Task | Command |

|------|---------|# Nginx integration

| Install Agent | `DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=key DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_agent.sh)"` |
| Start Agent | `sudo systemctl start datadog-agent` |
| Check Status | `sudo systemctl status datadog-agent` |
| View Logs | `sudo tail -f /var/log/datadog/agent.log` |
| Agent Status | `sudo datadog-agent status` |
| Check Version | `sudo datadog-agent version` |

## Tags Configuration

```bash
sudo tee /etc/datadog-agent/conf.d/nginx.d/conf.yaml > /dev/null << EOF
init_config:
tags:
  - env:production
EOF
```

| Edit Config | `sudo nano /etc/datadog-agent/datadog.yaml` |

| Restart Agent | `sudo systemctl restart datadog-agent` |  - service:myappinstances:

| Enable Auto-start | `sudo systemctl enable datadog-agent` |

| Stop Agent | `sudo systemctl stop datadog-agent` |  - team:devops  - nginx_status_url: http://localhost:8080/nginx_status

| Test Connectivity | `curl -s https://api.datadoghq.com/api/v1/validate -H "DD-API-KEY: key"` |

| Uninstall | `sudo yum remove datadog-agent` |EOF



---# Log collection



## Related Documentation

- [One-Line Bash Commands](../linux/oneline-commands.md) - Essential Linux one-liners
- [Service Check Commands](../services/service-check-commands.md) - systemctl management
- [Datadog Proxy Testing](../datadog/datadog-proxy-testing.md) - Network diagnostics

## MySQL Integration

```bash
sudo tee /etc/datadog-agent/conf.d/mysql.d/conf.yaml > /dev/null << EOF
init_config:
logs_enabled: true
EOF
```

## APM (Application Performance Monitoring)


apm_config:

  enabled: trueinstances:

  apm_dd_url: https://trace.datadoghq.com  - server: localhost

```    user: datadog

    password: your_password

---    port: 3306

EOF

### 5. Enable Specific Integrations

# Restart agent to apply changes

```bashsudo systemctl restart datadog-agent

# Nginx integration```

sudo tee /etc/datadog-agent/conf.d/nginx.d/conf.yaml > /dev/null << EOF

init_config:---



instances:
  - nginx_status_url: http://localhost:8080/nginx_status
EOF
```

### 6. Configure Log Collection

```bash
sudo tee /etc/datadog-agent/conf.d/system.d/conf.yaml > /dev/null << EOF
logs:
  - type: file
EOF
```

## MySQL Integration

```bash
sudo tee /etc/datadog-agent/conf.d/mysql.d/conf.yaml > /dev/null << EOF
init_config:

instances:
  - server: localhost
    user: datadog
    pass: datadog_password
    port: 3306

logs:
  - type: file
    path: /var/log/mysql/error.log
    source: mysql
    service: mysql
EOF
```

    source: linux

instances:

  - server: localhost  - type: file

    user: datadog    path: /var/log/nginx/access.log

    password: your_password    service: nginx

    port: 3306    source: nginx

EOF

  - type: file

# Restart agent to apply changes    path: /var/log/mysql/error.log

sudo systemctl restart datadog-agent    service: mysql

```    source: mysql

EOF

---

sudo systemctl restart datadog-agent

### 6. Configure Log Collection```



```bash---

sudo tee /etc/datadog-agent/conf.d/system.d/conf.yaml > /dev/null << EOF

logs:## Verification & Testing Commands

  - type: file

    path: /var/log/syslog### 7. Check Agent Status and Health

    service: system```bash

    source: linuxsudo datadog-agent status

```

  - type: file

    path: /var/log/nginx/access.log**Output shows**:

    service: nginx- Agent version

    source: nginx- Python version

- Running checks

  - type: file- System checks

    path: /var/log/mysql/error.log

    service: mysql---

    source: mysql

EOF### 8. Verify Agent is Running

```bash

sudo systemctl restart datadog-agentps aux | grep datadog-agent

``````



------



## Verification & Testing Commands### 9. Check Agent Logs

```bash

### 7. Check Agent Status and Health# View main agent logs

sudo tail -f /var/log/datadog/agent.log

```bash

sudo datadog-agent status# View last 50 lines

```sudo tail -50 /var/log/datadog/agent.log



**Output shows**:# Search for errors

- Agent versionsudo grep -i error /var/log/datadog/agent.log

- Python version```

- Running checks

- System checks---



---### 10. Test Connectivity to Datadog

```bash

### 8. Verify Agent is Running# Test API connectivity

curl -s -X GET "https://api.datadoghq.com/api/v1/validate" \

```bash  -H "DD-API-KEY: your_api_key_here" | head -20

ps aux | grep datadog-agent

```# Check if agent can reach Datadog

sudo datadog-agent diagnose

---

# Simple connectivity check

### 9. Check Agent Logsnc -zv api.datadoghq.com 443

```

```bash

# View main agent logs---

sudo tail -f /var/log/datadog/agent.log

## Common Management Commands

# View last 50 lines

sudo tail -50 /var/log/datadog/agent.log### 11. Restart Agent

```bash

# Search for errorssudo systemctl restart datadog-agent

sudo grep -i error /var/log/datadog/agent.log```

```

---

---

### 12. Check Agent Version

### 10. Test Connectivity to Datadog```bash

sudo datadog-agent version

```bash```

# Test API connectivity

curl -s -X GET "https://api.datadoghq.com/api/v1/validate" \---

  -H "DD-API-KEY: your_api_key_here" | head -20

### 13. Reload Agent Configuration

# Check if agent can reach Datadog```bash

sudo datadog-agent diagnosesudo datadog-agent configcheck

```

# Simple connectivity check

nc -zv api.datadoghq.com 443---

```

### 14. Check Running Integrations

---```bash

sudo datadog-agent integration show

## Common Management Commands```



### 11. Restart Agent---



```bash### 15. View Configuration Validation

sudo systemctl restart datadog-agent```bash

```sudo datadog-agent configcheck

```

---

---

### 12. Check Agent Version

## Uninstall Commands

```bash

sudo datadog-agent version### 16. Remove Datadog Agent

``````bash

# Stop the agent

---sudo systemctl stop datadog-agent



### 13. Reload Agent Configuration# Disable auto-start

sudo systemctl disable datadog-agent

```bash

sudo datadog-agent configcheck# Remove the package

```sudo yum remove datadog-agent

```

---

---

### 14. Check Running Integrations

### 17. Clean Up Configuration Files

```bash```bash

sudo datadog-agent integration show# Remove config directory

```sudo rm -rf /etc/datadog-agent



---# Remove logs

sudo rm -rf /var/log/datadog

### 15. View Configuration Validation```



```bash---

sudo datadog-agent configcheck

```## Troubleshooting Commands



---### 18. Check Specific Integration Status

```bash

## Uninstall Commands# Check nginx integration

sudo datadog-agent check nginx

### 16. Remove Datadog Agent

# Check system integration

```bashsudo datadog-agent check system

# Stop the agent

sudo systemctl stop datadog-agent# Check all integrations

sudo datadog-agent check --list-failed

# Disable auto-start```

sudo systemctl disable datadog-agent

---

# Remove the package

sudo yum remove datadog-agent### 19. Enable Debug Mode

``````bash

# Create debug config

---sudo tee /etc/datadog-agent/datadog.yaml > /dev/null << EOF

debug: true

### 17. Clean Up Configuration Fileslog_level: debug

EOF

```bash

# Remove config directory# Restart with debug enabled

sudo rm -rf /etc/datadog-agentsudo systemctl restart datadog-agent



# Remove logs# View debug logs

sudo rm -rf /var/log/datadogsudo tail -f /var/log/datadog/agent.log

``````



------



## Troubleshooting Commands### 20. Fix Common Issues



### 18. Check Specific Integration Status**Agent not starting**:

```bash

```bash# Check for syntax errors

# Check nginx integrationsudo datadog-agent configcheck

sudo datadog-agent check nginx

# View recent errors

# Check system integrationsudo journalctl -u datadog-agent -n 50

sudo datadog-agent check system```



# Check all integrations**No metrics being sent**:

sudo datadog-agent check --list-failed```bash

```# Verify API key

sudo grep "api_key" /etc/datadog-agent/datadog.yaml

---

# Check connectivity

### 19. Enable Debug Modecurl -s -I https://api.datadoghq.com



```bash# Restart agent

# Create debug configsudo systemctl restart datadog-agent

sudo tee /etc/datadog-agent/datadog.yaml > /dev/null << EOF```

debug: true

log_level: debug**High CPU/Memory usage**:

EOF```bash

# Check agent process

# Restart with debug enabledps aux | grep datadog-agent

sudo systemctl restart datadog-agent

# View resource usage

# View debug logstop -p $(pgrep -f datadog-agent)

sudo tail -f /var/log/datadog/agent.log

```# Disable unnecessary integrations

sudo nano /etc/datadog-agent/conf.d/

---```



### 20. Fix Common Issues---



**Agent not starting**:## One-Liner Quick Commands



```bash### 21. Install, Configure, and Start Datadog Agent (One-Liner)

# Check for syntax errors```bash

sudo datadog-agent configcheckDD_AGENT_MAJOR_VERSION=7 DD_API_KEY=your_api_key_here DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_agent.sh)" && sudo systemctl start datadog-agent && sudo systemctl enable datadog-agent && echo "✓ Datadog Agent installed and started"

```

# View recent errors

sudo journalctl -u datadog-agent -n 50---

```

### 22. Full Diagnostics Report (One-Liner)

**No metrics being sent**:```bash

echo "=== DATADOG AGENT STATUS ===" && sudo systemctl status datadog-agent && echo "=== AGENT VERSION ===" && sudo datadog-agent version && echo "=== RUNNING CHECKS ===" && sudo datadog-agent check --list-failed 2>/dev/null || sudo datadog-agent check --list-failed && echo "=== RECENT LOGS ===" && sudo tail -20 /var/log/datadog/agent.log && echo "=== CONNECTIVITY TEST ===" && curl -s -X GET "https://api.datadoghq.com/api/v1/validate" -H "DD-API-KEY: ${DATADOG_API_KEY:-test}" 2>&1 | head -5

```bash```

# Verify API key

sudo grep "api_key" /etc/datadog-agent/datadog.yaml---



# Check connectivity### 23. Quick Status Check (One-Liner)

curl -s -I https://api.datadoghq.com```bash

sudo datadog-agent status && echo "✓ Agent is healthy" || echo "✗ Agent has issues"

# Restart agent```

sudo systemctl restart datadog-agent

```---



**High CPU/Memory usage**:### 24. View Agent + System Info Combined (One-Liner)

```bash

```bashecho "=== DATADOG AGENT ===" && sudo datadog-agent version && echo "" && echo "=== SYSTEM INFO ===" && hostnamectl && echo "" && echo "=== AGENT RUNNING ===" && systemctl is-active datadog-agent && echo "" && echo "=== CONNECTIVITY ===" && nc -zv api.datadoghq.com 443

# Check agent process```

ps aux | grep datadog-agent

---

# View resource usage

top -p $(pgrep -f datadog-agent)### 25. Enable and Start Complete Setup (One-Liner)

```bash

# Disable unnecessary integrationssudo systemctl enable datadog-agent && sudo systemctl restart datadog-agent && sleep 5 && sudo datadog-agent status | head -20

sudo nano /etc/datadog-agent/conf.d/```

```

---

---

## Environment Variables

## One-Liner Quick Commands

### Commonly Used Variables:

### 21. Install, Configure, and Start Datadog Agent (One-Liner)

```bash

```bash# Set API Key

DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=your_api_key_here DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_agent.sh)" && sudo systemctl start datadog-agent && sudo systemctl enable datadog-agent && echo "✓ Datadog Agent installed and started"
```

## Environment Variables Setup

```bash
# Set API Key
export DD_API_KEY="your_api_key_here"

# Set Site
export DD_SITE="datadoghq.com"  # or datadoghq.eu

# Set Hostname
export HOSTNAME="my-server"

# Set Datadog home directory
export DD_HOME="/opt/datadog-agent"

# Set log level
export DD_LOG_LEVEL="debug"
```

### 22. Full Diagnostics Report (One-Liner)

```bash
echo "=== DATADOG AGENT STATUS ===" && sudo systemctl status datadog-agent && echo "=== AGENT VERSION ===" && sudo datadog-agent version && echo "=== RUNNING CHECKS ===" && sudo datadog-agent check --list-failed 2>/dev/null || sudo datadog-agent check --list-failed && echo "=== RECENT LOGS ===" && sudo tail -20 /var/log/datadog/agent.log && echo "=== CONNECTIVITY TEST ===" && curl -s -X GET "https://api.datadoghq.com/api/v1/validate" -H "DD-API-KEY: ${DATADOG_API_KEY:-test}" 2>&1 | head -5

### 23. Quick Status Check (One-Liner)

# Use in commands

```bashDD_API_KEY="key" DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_agent.sh)"

sudo datadog-agent status && echo "✓ Agent is healthy" || echo "✗ Agent has issues"```

```

---

---

## Configuration Files Reference

### 24. View Agent + System Info Combined (One-Liner)

### Main Configuration File:

```bash- `/etc/datadog-agent/datadog.yaml` - Main agent configuration

echo "=== DATADOG AGENT ===" && sudo datadog-agent version && echo "" && echo "=== SYSTEM INFO ===" && hostnamectl && echo "" && echo "=== AGENT RUNNING ===" && systemctl is-active datadog-agent && echo "" && echo "=== CONNECTIVITY ===" && nc -zv api.datadoghq.com 443

```### Integration Configs:

- `/etc/datadog-agent/conf.d/` - Directory for integration configs

---- `/etc/datadog-agent/conf.d/nginx.d/conf.yaml` - Nginx integration

- `/etc/datadog-agent/conf.d/mysql.d/conf.yaml` - MySQL integration

### 25. Enable and Start Complete Setup (One-Liner)- `/etc/datadog-agent/conf.d/system.d/conf.yaml` - System metrics



```bash### Log Files:

sudo systemctl enable datadog-agent && sudo systemctl restart datadog-agent && sleep 5 && sudo datadog-agent status | head -20- `/var/log/datadog/agent.log` - Main agent log

```- `/var/log/datadog/` - All agent logs directory



------



## Environment Variables## Quick Reference Table



### Commonly Used Variables| Task | Command |

|------|---------|

```bash| Install Agent | `curl -L https://s3.amazonaws.com/dd-agent/scripts/install_agent.sh \| bash` |

# Set API Key| Start Agent | `sudo systemctl start datadog-agent` |

export DD_API_KEY="your_api_key_here"| Check Status | `sudo systemctl status datadog-agent` |

| View Logs | `sudo tail -f /var/log/datadog/agent.log` |

# Set Site| Agent Status | `sudo datadog-agent status` |

export DD_SITE="datadoghq.com"  # or datadoghq.eu| Check Version | `sudo datadog-agent version` |

| Edit Config | `sudo nano /etc/datadog-agent/datadog.yaml` |

# Set Hostname| Restart Agent | `sudo systemctl restart datadog-agent` |

export HOSTNAME="my-server"| Enable Auto-start | `sudo systemctl enable datadog-agent` |

| Stop Agent | `sudo systemctl stop datadog-agent` |

# Set Datadog home directory| Test Connectivity | `curl -s https://api.datadoghq.com/api/v1/validate -H "DD-API-KEY: key"` |

export DD_HOME="/opt/datadog-agent"| Uninstall | `sudo yum remove datadog-agent` |



# Set log level---

export DD_LOG_LEVEL="debug"

## Find Logs Path Commands

# Use in commands

DD_API_KEY="key" DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_agent.sh)"### 26. Find All Log Files in System

``````bash

# Find all .log files in /var/log

---find /var/log -type f -name "*.log" 2>/dev/null | head -50



## Configuration Files Reference# Find all log files modified in last 24 hours

find /var/log -type f -name "*.log" -mtime -1 2>/dev/null

### Main Configuration File

- `/etc/datadog-agent/datadog.yaml` - Main agent configuration# Find log files by size (larger than 10MB)

find /var/log -type f -name "*.log" -size +10M 2>/dev/null

### Integration Configs

- `/etc/datadog-agent/conf.d/` - Directory for integration configs# Find all log files with details (size, date)

- `/etc/datadog-agent/conf.d/nginx.d/conf.yaml` - Nginx integrationfind /var/log -type f -name "*.log" -exec ls -lh {} \; 2>/dev/null | head -30

- `/etc/datadog-agent/conf.d/mysql.d/conf.yaml` - MySQL integration```

- `/etc/datadog-agent/conf.d/system.d/conf.yaml` - System metrics

---

### Log Files

- `/var/log/datadog/agent.log` - Main agent log### 27. Find Application-Specific Logs

- `/var/log/datadog/` - All agent logs directory```bash

# Find Nginx logs

---find /var/log -name "*nginx*" -type f 2>/dev/null



## Quick Reference Table# Find MySQL/MariaDB logs

find /var/log -name "*mysql*" -type f -o -name "*mariadb*" -type f 2>/dev/null

| Task | Command |

|------|---------|# Find PHP-FPM logs

| Install Agent | `curl -L https://s3.amazonaws.com/dd-agent/scripts/install_agent.sh \| bash` |find /var/log -name "*php*" -type f 2>/dev/null

| Start Agent | `sudo systemctl start datadog-agent` |

| Check Status | `sudo systemctl status datadog-agent` |# Find Apache logs

| View Logs | `sudo tail -f /var/log/datadog/agent.log` |find /var/log -name "*apache*" -type f -o -name "*httpd*" -type f 2>/dev/null

| Agent Status | `sudo datadog-agent status` |

| Check Version | `sudo datadog-agent version` |# Find application logs (generic)

| Edit Config | `sudo nano /etc/datadog-agent/datadog.yaml` |find /var/log -name "*.log" -path "*app*" -type f 2>/dev/null

| Restart Agent | `sudo systemctl restart datadog-agent` |```

| Enable Auto-start | `sudo systemctl enable datadog-agent` |

| Stop Agent | `sudo systemctl stop datadog-agent` |---

| Test Connectivity | `curl -s https://api.datadoghq.com/api/v1/validate -H "DD-API-KEY: key"` |

| Uninstall | `sudo yum remove datadog-agent` |### 28. Find Datadog-Related Log Files

```bash

---# Find all Datadog logs

find /var/log -name "*datadog*" -type f 2>/dev/null

## Find Logs Path Commands

# Find Datadog agent logs with details

### 26. Find All Log Files in Systemfind /var/log/datadog -type f -exec ls -lh {} \; 2>/dev/null



```bash# Find Datadog logs by size

# Find all .log files in /var/logdu -sh /var/log/datadog* 2>/dev/null

find /var/log -type f -name "*.log" 2>/dev/null | head -50

# Find Dynatrace logs

# Find all log files modified in last 24 hoursfind /var/log -name "*dynatrace*" -type f 2>/dev/null

find /var/log -type f -name "*.log" -mtime -1 2>/dev/null

# Find APM/Trace logs

# Find log files by size (larger than 10MB)find /var/log -name "*apm*" -o -name "*trace*" -type f 2>/dev/null

find /var/log -type f -name "*.log" -size +10M 2>/dev/null```



# Find all log files with details (size, date)---

find /var/log -type f -name "*.log" -exec ls -lh {} \; 2>/dev/null | head -30

```### 29. Find Recent Application Logs

```bash

---# Find logs modified in last 1 hour

find /var/log -type f -name "*.log" -mmin -60 2>/dev/null

### 27. Find Application-Specific Logs

# Find logs modified in last 24 hours with size

```bashfind /var/log -type f -name "*.log" -mtime -1 -exec ls -lh {} \; 2>/dev/null | sort -k5 -rh

# Find Nginx logs

find /var/log -name "*nginx*" -type f 2>/dev/null# Find and count log lines in recent logs

find /var/log -type f -name "*.log" -mtime -1 -exec wc -l {} \; 2>/dev/null | sort -rn | head -20

# Find MySQL/MariaDB logs

find /var/log -name "*mysql*" -type f -o -name "*mariadb*" -type f 2>/dev/null# Find rotated logs (*.log.*)

find /var/log -type f -name "*.log.*" -mtime -7 2>/dev/null

# Find PHP-FPM logs```

find /var/log -name "*php*" -type f 2>/dev/null

---

# Find Apache logs

find /var/log -name "*apache*" -type f -o -name "*httpd*" -type f 2>/dev/null### 30. Find Logs by Service/Application

```bash

# Find application logs (generic)# Find logs for specific service (nginx example)

find /var/log -name "*.log" -path "*app*" -type f 2>/dev/nullsudo -u nginx find /var/log -name "nginx*" -type f 2>/dev/null

```

# Find logs in application directory

---find /opt -name "*.log" -type f 2>/dev/null



### 28. Find Datadog-Related Log Files# Find logs in home directory

find /home -name "*.log" -type f 2>/dev/null

```bash

# Find all Datadog logs# Find logs in /tmp

find /var/log -name "*datadog*" -type f 2>/dev/nullfind /tmp -name "*.log" -type f 2>/dev/null



# Find Datadog agent logs with details# Find all logs with their full paths

find /var/log/datadog -type f -exec ls -lh {} \; 2>/dev/nulllocate *.log 2>/dev/null | grep -E "(nginx|mysql|php|datadog|app)" | head -30

```

# Find Datadog logs by size

du -sh /var/log/datadog* 2>/dev/null---



# Find Dynatrace logs### 31. Search Log Content

find /var/log -name "*dynatrace*" -type f 2>/dev/null```bash

# Search for errors in logs

# Find APM/Trace logsgrep -r "error" /var/log --include="*.log" 2>/dev/null | head -20

find /var/log -name "*apm*" -o -name "*trace*" -type f 2>/dev/null

```# Search for specific keyword in recent logs

grep -r "datadog" /var/log --include="*.log" -l 2>/dev/null

---

# Find critical errors

### 29. Find Recent Application Logsgrep -r -i "critical\|fatal\|emergency" /var/log --include="*.log" 2>/dev/null | head -10



```bash# Search in specific log file

# Find logs modified in last 1 hourgrep "pattern" /var/log/datadog/agent.log

find /var/log -type f -name "*.log" -mmin -60 2>/dev/null```



# Find logs modified in last 24 hours with size---

find /var/log -type f -name "*.log" -mtime -1 -exec ls -lh {} \; 2>/dev/null | sort -k5 -rh

### 32. List All Log Directories and Their Sizes

# Find and count log lines in recent logs```bash

find /var/log -type f -name "*.log" -mtime -1 -exec wc -l {} \; 2>/dev/null | sort -rn | head -20# Show all directories in /var/log with size

du -sh /var/log/* 2>/dev/null | sort -rh | head -20

# Find rotated logs (*.log.*)

find /var/log -type f -name "*.log.*" -mtime -7 2>/dev/null# Show Datadog log directory size

```du -sh /var/log/datadog 2>/dev/null



---# Show individual log file sizes

ls -lhS /var/log/*.log 2>/dev/null | head -20

### 30. Find Logs by Service/Application

# Show total log directory size

```bashdu -sh /var/log 2>/dev/null

# Find logs for specific service (nginx example)```

sudo -u nginx find /var/log -name "nginx*" -type f 2>/dev/null

---

# Find logs in application directory

find /opt -name "*.log" -type f 2>/dev/null## Check Datadog Environment Variables Commands



# Find logs in home directory### 33. Check All Datadog Environment Variables

find /home -name "*.log" -type f 2>/dev/null```bash

# Display all DD_* environment variables

# Find logs in /tmpenv | grep -i "^DD_"

find /tmp -name "*.log" -type f 2>/dev/null

# Check specific Datadog variables

# Find all logs with their full pathsecho "API Key: $DD_API_KEY"

locate *.log 2>/dev/null | grep -E "(nginx|mysql|php|datadog|app)" | head -30echo "Site: $DD_SITE"

```echo "Hostname: $DATADOG_HOSTNAME"

echo "Environment: $DD_ENV"

---echo "Service: $DD_SERVICE"

echo "Version: $DD_VERSION"

### 31. Search Log Content```



```bash---

# Search for errors in logs

grep -r "error" /var/log --include="*.log" 2>/dev/null | head -20### 34. Check Datadog Configuration Variables

```bash

# Search for specific keyword in recent logs# View all set environment variables for datadog-agent

grep -r "datadog" /var/log --include="*.log" -l 2>/dev/nullgrep -E "^DD_|^DATADOG_" /etc/environment



# Find critical errors# Check environment variables from systemd service

grep -r -i "critical\|fatal\|emergency" /var/log --include="*.log" 2>/dev/null | head -10systemctl show-environment | grep -i datadog



# Search in specific log file# Check datadog-agent process environment

grep "pattern" /var/log/datadog/agent.logps aux | grep datadog-agent | grep -v grep

``````



------



### 32. List All Log Directories and Their Sizes### 35. Check Datadog Agent Configuration Variables

```bash

```bash# Check API Key from config

# Show all directories in /var/log with sizesudo grep "api_key:" /etc/datadog-agent/datadog.yaml

du -sh /var/log/* 2>/dev/null | sort -rh | head -20

# Check all configuration settings

# Show Datadog log directory sizesudo grep -E "^[a-z_]+:" /etc/datadog-agent/datadog.yaml | head -30

du -sh /var/log/datadog 2>/dev/null

# Check tags configuration

# Show individual log file sizessudo grep -A 10 "^tags:" /etc/datadog-agent/datadog.yaml

ls -lhS /var/log/*.log 2>/dev/null | head -20

# Check APM configuration

# Show total log directory sizesudo grep -A 5 "apm_config:" /etc/datadog-agent/datadog.yaml

du -sh /var/log 2>/dev/null```

```

---

---

### 36. Display All Datadog Environment and Configuration

## Check Datadog Environment Variables Commands```bash

# Combined view of all Datadog settings

### 33. Check All Datadog Environment Variablesecho "=== ENVIRONMENT VARIABLES ===" && env | grep -i "DD_\|DATADOG_" && echo "" && echo "=== CONFIG FILE ===" && sudo grep -E "^[a-z_]+:|api_key:|site:" /etc/datadog-agent/datadog.yaml && echo "" && echo "=== AGENT STATUS ===" && sudo datadog-agent status | head -10

```

```bash

# Display all DD_* environment variables---

env | grep -i "^DD_"

### 37. Export Datadog Variables for Current Session

# Check specific Datadog variables```bash

echo "API Key: $DD_API_KEY"# Set API Key for current session

echo "Site: $DD_SITE"export DD_API_KEY="your_api_key_here"

echo "Hostname: $DATADOG_HOSTNAME"

echo "Environment: $DD_ENV"# Set Site (US or EU)

echo "Service: $DD_SERVICE"export DD_SITE="datadoghq.com"  # or "datadoghq.eu"

echo "Version: $DD_VERSION"

```# Set hostname

export DATADOG_HOSTNAME="my-server"

---

# Set environment tag

### 34. Check Datadog Configuration Variablesexport DD_ENV="production"



```bash# Set service name

# View all set environment variables for datadog-agentexport DD_SERVICE="myapp"

grep -E "^DD_|^DATADOG_" /etc/environment

# Set version

# Check environment variables from systemd serviceexport DD_VERSION="1.0.0"

systemctl show-environment | grep -i datadog

# Verify variables are set

# Check datadog-agent process environmentenv | grep -i "^DD_\|^DATADOG_"

ps aux | grep datadog-agent | grep -v grep```

```

---

---

## Check Application Process Commands

### 35. Check Datadog Agent Configuration Variables

### 38. Check All Running Processes

```bash```bash

# Check API Key from config# List all processes with details

sudo grep "api_key:" /etc/datadog-agent/datadog.yamlps aux



# Check all configuration settings# List all processes with full command line

sudo grep -E "^[a-z_]+:" /etc/datadog-agent/datadog.yaml | head -30ps auxww



# Check tags configuration# List processes in tree format

sudo grep -A 10 "^tags:" /etc/datadog-agent/datadog.yamlpstree -p



# Check APM configuration# Show only user processes

sudo grep -A 5 "apm_config:" /etc/datadog-agent/datadog.yamlps ux

``````



------



### 36. Display All Datadog Environment and Configuration### 39. Check Specific Application Processes

```bash

```bash# Check Nginx processes

# Combined view of all Datadog settingsps aux | grep -E 'nginx|httpd' | grep -v grep

echo "=== ENVIRONMENT VARIABLES ===" && env | grep -i "DD_\|DATADOG_" && echo "" && echo "=== CONFIG FILE ===" && sudo grep -E "^[a-z_]+:|api_key:|site:" /etc/datadog-agent/datadog.yaml && echo "" && echo "=== AGENT STATUS ===" && sudo datadog-agent status | head -10

```# Check PHP/PHP-FPM processes

ps aux | grep -E 'php|fpm' | grep -v grep

---

# Check MySQL/MariaDB processes

### 37. Export Datadog Variables for Current Sessionps aux | grep -E 'mysql|mariadb' | grep -v grep



```bash# Check Node.js processes

# Set API Key for current sessionps aux | grep -E 'node|npm' | grep -v grep

export DD_API_KEY="your_api_key_here"

# Check Python processes

# Set Site (US or EU)ps aux | grep -E 'python' | grep -v grep

export DD_SITE="datadoghq.com"  # or "datadoghq.eu"

# Check .NET/Dotnet processes

# Set hostnameps aux | grep -E 'dotnet|mono' | grep -v grep

export DATADOG_HOSTNAME="my-server"

# Check Java processes

# Set environment tagps aux | grep -E 'java' | grep -v grep

export DD_ENV="production"

# Check Redis processes

# Set service nameps aux | grep -E 'redis' | grep -v grep

export DD_SERVICE="myapp"

# Check Datadog processes

# Set versionps aux | grep -E 'datadog' | grep -v grep

export DD_VERSION="1.0.0"```



# Verify variables are set---

env | grep -i "^DD_\|^DATADOG_"

```### 40. Check Process Details and Resource Usage

```bash

---# Check specific process CPU/Memory usage

top -p $(pgrep -f "nginx") -b -n 1

## Check Application Process Commands

# Show process tree with resource usage

### 38. Check All Running Processesps aux | grep -E "nginx|php|mysql" | grep -v grep



```bash# Show process details with full command

# List all processes with detailsps -eo pid,user,cpu,mem,comm --sort=-cpu | head -20

ps aux

# Check process resource limits

# List all processes with full command linecat /proc/$(pgrep nginx | head -1)/limits 2>/dev/null

ps auxww```



# List processes in tree format---

pstree -p

### 41. Check Processes Listening on Ports

# Show only user processes```bash

ps ux# Show all listening ports and processes

```sudo netstat -tlnp 2>/dev/null



---# Show with ss (newer systems)

sudo ss -tlnp 2>/dev/null

### 39. Check Specific Application Processes

# Check specific port

```bashsudo netstat -tlnp | grep :80

# Check Nginx processes

ps aux | grep -E 'nginx|httpd' | grep -v grep# Show process on specific port

sudo lsof -i :8080

# Check PHP/PHP-FPM processes```

ps aux | grep -E 'php|fpm' | grep -v grep

---

# Check MySQL/MariaDB processes

ps aux | grep -E 'mysql|mariadb' | grep -v grep### 42. Check Running Services and Applications

```bash

# Check Node.js processes# List all active services

ps aux | grep -E 'node|npm' | grep -v grepsystemctl list-units --type=service --state=running --no-pager



# Check Python processes# List active services with more details

ps aux | grep -E 'python' | grep -v grepsystemctl list-units --type=service --state=running -l --no-pager



# Check .NET/Dotnet processes# Show specific service status

ps aux | grep -E 'dotnet|mono' | grep -v grepsystemctl status nginx



# Check Java processes# Show enabled services

ps aux | grep -E 'java' | grep -v grepsystemctl list-unit-files --type=service | grep enabled



# Check Redis processes# Check if specific service is running

ps aux | grep -E 'redis' | grep -v grepsystemctl is-active nginx && echo "Running" || echo "Stopped"

```

# Check Datadog processes

ps aux | grep -E 'datadog' | grep -v grep---

```

### 43. Check Application Startup Status

---```bash

# Check service enable status

### 40. Check Process Details and Resource Usagesystemctl is-enabled nginx



```bash# Show last 20 lines of service logs

# Check specific process CPU/Memory usagejournalctl -u nginx -n 20

top -p $(pgrep -f "nginx") -b -n 1

# Follow service logs in real-time

# Show process tree with resource usagejournalctl -u nginx -f

ps aux | grep -E "nginx|php|mysql" | grep -v grep

# Show service errors

# Show process details with full commandjournalctl -u nginx -p err

ps -eo pid,user,cpu,mem,comm --sort=-cpu | head -20

# Show service status with timing

# Check process resource limitssystemctl status nginx

cat /proc/$(pgrep nginx | head -1)/limits 2>/dev/null```

```

---

---

### 44. List All Running Applications Summary (One-Liner)

### 41. Check Processes Listening on Ports```bash

echo "=== RUNNING SERVICES ===" && systemctl list-units --type=service --state=running --no-pager | grep -E 'nginx|php|mysql|node|java|datadog|dynatrace' && echo "" && echo "=== LISTENING PORTS ===" && sudo ss -tlnp 2>/dev/null | grep -E 'LISTEN|PID' && echo "" && echo "=== TOP CPU PROCESSES ===" && ps aux --sort=-%cpu | head -6

```bash```

# Show all listening ports and processes

sudo netstat -tlnp 2>/dev/null---



# Show with ss (newer systems)### 45. Find Processes Using Specific Resources

sudo ss -tlnp 2>/dev/null```bash

# Find processes using most CPU

# Check specific portps aux --sort=-%cpu | head -10

sudo netstat -tlnp | grep :80

# Find processes using most memory

# Show process on specific portps aux --sort=-%mem | head -10

sudo lsof -i :8080

```# Find processes using specific port

sudo lsof -i -P -n | grep LISTEN

---

# Find all open connections

### 42. Check Running Services and Applicationssudo netstat -tupn 2>/dev/null



```bash# Find process by name

# List all active servicespgrep -f "nginx" -a

systemctl list-units --type=service --state=running --no-pager

# Count processes of a type

# List active services with more detailsps aux | grep -c "nginx"

systemctl list-units --type=service --state=running -l --no-pager```



# Show specific service status---

systemctl status nginx

## Complete Combined Commands (One-Liners)

# Show enabled services

systemctl list-unit-files --type=service | grep enabled### 46. Find All Logs, Check Datadog Env, and List Running Apps

```bash

# Check if specific service is runningecho "╔══════════════════════════════════════════════╗" && echo "║    DATADOG ENVIRONMENT & APPLICATION CHECK   ║" && echo "╚══════════════════════════════════════════════╝" && echo "" && echo "[DATADOG ENV VARIABLES]" && env | grep -E "^DD_|^DATADOG_" || echo "No Datadog env vars set" && echo "" && echo "[DATADOG CONFIG]" && sudo grep -E "api_key:|site:|hostname:" /etc/datadog-agent/datadog.yaml && echo "" && echo "[LOG PATHS - RECENT]" && find /var/log -type f -name "*.log" -mtime -1 2>/dev/null | sort -r | head -20 && echo "" && echo "[DATADOG LOGS SIZE]" && du -sh /var/log/datadog* 2>/dev/null && echo "" && echo "[RUNNING APPS]" && ps aux | grep -E 'nginx|php|mysql|node|java|dotnet' | grep -v grep && echo "" && echo "[LISTENING PORTS]" && sudo ss -tlnp 2>/dev/null | grep LISTEN | tail -10

systemctl is-active nginx && echo "Running" || echo "Stopped"```

```

---

---

### 47. Find Logs + Show Size + Recent Activity

### 43. Check Application Startup Status```bash

echo "=== LOG SUMMARY ===" && echo "Total log size:" && du -sh /var/log && echo "" && echo "=== LARGEST LOGS ===" && find /var/log -type f -name "*.log" -exec ls -lh {} \; 2>/dev/null | awk '{print $5, $9}' | sort -rh | head -15 && echo "" && echo "=== RECENT LOGS (Last 24hrs) ===" && find /var/log -type f -name "*.log" -mtime -1 2>/dev/null | head -20

```bash```

# Check service enable status

systemctl is-enabled nginx---



# Show last 20 lines of service logs### 48. Check All Datadog Env + Config + Status

journalctl -u nginx -n 20```bash

echo "=== DD ENV VARS ===" && env | grep DD_ && echo "" && echo "=== DD CONFIG ===" && sudo cat /etc/datadog-agent/datadog.yaml | grep -E "^[a-z_]+:" | head -15 && echo "" && echo "=== DD AGENT STATUS ===" && sudo datadog-agent status | head -20

# Follow service logs in real-time```

journalctl -u nginx -f

---

# Show service errors

journalctl -u nginx -p err### 49. Find App Logs + Show Running Apps + Check Ports

```bash

# Show service status with timingecho "[APP LOG FILES]" && find /var/log -type f \( -name "*nginx*" -o -name "*php*" -o -name "*mysql*" \) 2>/dev/null && echo "" && echo "[RUNNING APPS]" && ps aux | grep -E 'nginx|php|mysql|node' | grep -v grep && echo "" && echo "[LISTENING PORTS]" && sudo netstat -tlnp 2>/dev/null | grep -v Proto

systemctl status nginx```

```

---

---

### 50. Full Diagnostic Report (All Information)

### 44. List All Running Applications Summary (One-Liner)```bash

{ echo "╔════════════════════════════════════════════════════════════════╗"; echo "║      DATADOG & APPLICATION DIAGNOSTIC REPORT                 ║"; echo "╚════════════════════════════════════════════════════════════════╝"; echo ""; echo "[1] DATADOG ENVIRONMENT VARIABLES"; env | grep -E "^DD_|^DATADOG_" | sed 's/=.*/=***/' || echo "  None set"; echo ""; echo "[2] DATADOG CONFIG"; sudo grep -E "api_key:|site:|hostname:|tags:" /etc/datadog-agent/datadog.yaml 2>/dev/null || echo "  Config not found"; echo ""; echo "[3] DATADOG AGENT STATUS"; sudo datadog-agent status 2>/dev/null | head -15 || echo "  Agent not running"; echo ""; echo "[4] LOG PATHS SUMMARY"; echo "  Total size: $(du -sh /var/log 2>/dev/null | awk '{print $1}')"; echo "  Datadog logs: $(du -sh /var/log/datadog 2>/dev/null | awk '{print $1}')"; echo ""; echo "[5] RECENT LOGS (Last 24h)"; find /var/log -type f -name "*.log" -mtime -1 2>/dev/null | wc -l | xargs echo "  Count:"; echo ""; echo "[6] RUNNING APPLICATIONS"; ps aux | grep -E 'nginx|php|mysql|node|java|dotnet|redis' | grep -v grep | awk '{print "  "$1, $2, $11}' || echo "  No applications found"; echo ""; echo "[7] LISTENING PORTS"; sudo ss -tlnp 2>/dev/null | grep LISTEN | awk '{print "  "$4, $7}' | head -10 || echo "  No listening ports"; echo ""; echo "[8] SERVICE STATUS"; systemctl is-active datadog-agent >/dev/null && echo "  ✓ Datadog Agent: Running" || echo "  ✗ Datadog Agent: Stopped"; systemctl is-active nginx >/dev/null && echo "  ✓ Nginx: Running" || echo "  ✗ Nginx: Stopped"; systemctl is-active mysql >/dev/null && echo "  ✓ MySQL: Running" || echo "  ✗ MySQL: Stopped"; echo ""; echo "╚════════════════════════════════════════════════════════════════╝"; } 2>&1 | tee /tmp/datadog_diagnostic_$(date +%Y%m%d_%H%M%S).log

```bash```

echo "=== RUNNING SERVICES ===" && systemctl list-units --type=service --state=running --no-pager | grep -E 'nginx|php|mysql|node|java|datadog|dynatrace' && echo "" && echo "=== LISTENING PORTS ===" && sudo ss -tlnp 2>/dev/null | grep -E 'LISTEN|PID' && echo "" && echo "=== TOP CPU PROCESSES ===" && ps aux --sort=-%cpu | head -6
```

---

### 45. Find Processes Using Specific Resources

```bash
# Find processes using most CPU
ps aux --sort=-%cpu | head -10

# Find processes using most memory
ps aux --sort=-%mem | head -10

# Find processes using specific port
sudo lsof -i -P -n | grep LISTEN

# Find all open connections
sudo netstat -tupn 2>/dev/null

# Find process by name
pgrep -f "nginx" -a

# Count processes of a type
ps aux | grep -c "nginx"
```

---

## Complete Combined Commands (One-Liners)

### 46. Find All Logs, Check Datadog Env, and List Running Apps

```bash
echo "╔══════════════════════════════════════════════╗" && echo "║    DATADOG ENVIRONMENT & APPLICATION CHECK   ║" && echo "╚══════════════════════════════════════════════╝" && echo "" && echo "[DATADOG ENV VARIABLES]" && env | grep -E "^DD_|^DATADOG_" || echo "No Datadog env vars set" && echo "" && echo "[DATADOG CONFIG]" && sudo grep -E "api_key:|site:|hostname:" /etc/datadog-agent/datadog.yaml && echo "" && echo "[LOG PATHS - RECENT]" && find /var/log -type f -name "*.log" -mtime -1 2>/dev/null | sort -r | head -20 && echo "" && echo "[DATADOG LOGS SIZE]" && du -sh /var/log/datadog* 2>/dev/null && echo "" && echo "[RUNNING APPS]" && ps aux | grep -E 'nginx|php|mysql|node|java|dotnet' | grep -v grep && echo "" && echo "[LISTENING PORTS]" && sudo ss -tlnp 2>/dev/null | grep LISTEN | tail -10
```

---

### 47. Find Logs + Show Size + Recent Activity

```bash
echo "=== LOG SUMMARY ===" && echo "Total log size:" && du -sh /var/log && echo "" && echo "=== LARGEST LOGS ===" && find /var/log -type f -name "*.log" -exec ls -lh {} \; 2>/dev/null | awk '{print $5, $9}' | sort -rh | head -15 && echo "" && echo "=== RECENT LOGS (Last 24hrs) ===" && find /var/log -type f -name "*.log" -mtime -1 2>/dev/null | head -20
```

---

### 48. Check All Datadog Env + Config + Status

```bash
echo "=== DD ENV VARS ===" && env | grep DD_ && echo "" && echo "=== DD CONFIG ===" && sudo cat /etc/datadog-agent/datadog.yaml | grep -E "^[a-z_]+:" | head -15 && echo "" && echo "=== DD AGENT STATUS ===" && sudo datadog-agent status | head -20
```

---

### 49. Find App Logs + Show Running Apps + Check Ports

```bash
echo "[APP LOG FILES]" && find /var/log -type f \( -name "*nginx*" -o -name "*php*" -o -name "*mysql*" \) 2>/dev/null && echo "" && echo "[RUNNING APPS]" && ps aux | grep -E 'nginx|php|mysql|node' | grep -v grep && echo "" && echo "[LISTENING PORTS]" && sudo netstat -tlnp 2>/dev/null | grep -v Proto
```

---

### 50. Full Diagnostic Report (All Information)

```bash
{ echo "╔════════════════════════════════════════════════════════════════╗"; echo "║      DATADOG & APPLICATION DIAGNOSTIC REPORT                 ║"; echo "╚════════════════════════════════════════════════════════════════╝"; echo ""; echo "[1] DATADOG ENVIRONMENT VARIABLES"; env | grep -E "^DD_|^DATADOG_" | sed 's/=.*/=***/' || echo "  None set"; echo ""; echo "[2] DATADOG CONFIG"; sudo grep -E "api_key:|site:|hostname:|tags:" /etc/datadog-agent/datadog.yaml 2>/dev/null || echo "  Config not found"; echo ""; echo "[3] DATADOG AGENT STATUS"; sudo datadog-agent status 2>/dev/null | head -15 || echo "  Agent not running"; echo ""; echo "[4] LOG PATHS SUMMARY"; echo "  Total size: $(du -sh /var/log 2>/dev/null | awk '{print $1}')"; echo "  Datadog logs: $(du -sh /var/log/datadog 2>/dev/null | awk '{print $1}')"; echo ""; echo "[5] RECENT LOGS (Last 24h)"; find /var/log -type f -name "*.log" -mtime -1 2>/dev/null | wc -l | xargs echo "  Count:"; echo ""; echo "[6] RUNNING APPLICATIONS"; ps aux | grep -E 'nginx|php|mysql|node|java|dotnet|redis' | grep -v grep | awk '{print "  "$1, $2, $11}' || echo "  No applications found"; echo ""; echo "[7] LISTENING PORTS"; sudo ss -tlnp 2>/dev/null | grep LISTEN | awk '{print "  "$4, $7}' | head -10 || echo "  No listening ports"; echo ""; echo "[8] SERVICE STATUS"; systemctl is-active datadog-agent >/dev/null && echo "  ✓ Datadog Agent: Running" || echo "  ✗ Datadog Agent: Stopped"; systemctl is-active nginx >/dev/null && echo "  ✓ Nginx: Running" || echo "  ✗ Nginx: Stopped"; systemctl is-active mysql >/dev/null && echo "  ✓ MySQL: Running" || echo "  ✗ MySQL: Stopped"; echo ""; echo "╚════════════════════════════════════════════════════════════════╝"; } 2>&1 | tee /tmp/datadog_diagnostic_$(date +%Y%m%d_%H%M%S).log
```

---

## Related Documentation

- [One-Line Bash Commands](./oneline-commands.md) - Essential Linux one-liners
- [Service Check Commands](../services/service-check-commands.md) - systemctl management
- [Datadog Proxy Testing](./datadog-proxy-testing.md) - Network proxy diagnostics
