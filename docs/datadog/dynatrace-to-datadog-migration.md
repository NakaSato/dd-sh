---
sidebar_position: 4
sidebar_label: "Dynatrace to Datadog Migration"
description: "Complete step-by-step guide to migrate from Dynatrace to Datadog including uninstall, install, configuration, and verification"
tags: [datadog, dynatrace, migration, installation, configuration, proxy, troubleshooting]
---

# Dynatrace to Datadog Migration Guide

Complete step-by-step guide to migrate from Dynatrace to Datadog monitoring. This guide covers checking Dynatrace, uninstalling it, installing Datadog, configuring APM and service monitoring, and verifying the setup.

---

## Prerequisites

- Root or Administrator privileges
- Datadog API key
- Proxy server details (host, port, optional credentials)
- Datadog site configuration (datadoghq.com, datadoghq.eu, etc.)

---

## Step 1: Check Dynatrace Installation

### 1.1 Check if Dynatrace is Installed

Check if Dynatrace service is running:

```bash
systemctl status dynatrace
# or
service dynatrace status
```

Check Dynatrace process:

```bash
ps aux | grep dynatrace
```

Check Dynatrace installation directory:

```bash
ls -la /opt/dynatrace/
# or
find / -name "*dynatrace*" -type d 2>/dev/null
```

### 1.2 Get Dynatrace Service Details

```bash
# List all Dynatrace services
systemctl list-units --type=service | grep -i dynatrace

# Get service status details
systemctl status dynatrace-*.service

# Check enabled status
systemctl is-enabled dynatrace
```

### 1.3 Check Dynatrace Configuration

```bash
# View Dynatrace configuration
cat /etc/dynatrace/dynatrace.conf
# or
find /opt/dynatrace -name "*.conf" -exec cat {} \;

# Check environment variables
env | grep -i dynatrace
```

### 1.4 Get Dynatrace Version

```bash
# Check version
/opt/dynatrace/dynatrace --version
# or
find /opt/dynatrace -name "*.txt" | xargs grep -i version 2>/dev/null

# Check installed packages
rpm -qa | grep -i dynatrace
# or on Debian/Ubuntu
dpkg -l | grep -i dynatrace
```

---

## Step 2: Find All Files Related to Dynatrace

### 2.1 Find All Dynatrace Files

Find all Dynatrace files and directories:

```bash
# Search entire filesystem
find / -name "*dynatrace*" 2>/dev/null

# Limit to common locations
find /opt /etc /var /home -name "*dynatrace*" 2>/dev/null

# Search for specific file types
find / -type f -name "*.dynatrace" 2>/dev/null
find / -type f -name "*dynatrace*.conf" 2>/dev/null
find / -type f -name "*dynatrace*.log" 2>/dev/null
```

### 2.2 Get File Listing and Sizes

```bash
# List with sizes
find / -name "*dynatrace*" -exec ls -lh {} \; 2>/dev/null

# Sort by size
find / -name "*dynatrace*" -type f -exec ls -lhS {} \; 2>/dev/null | head -20

# Count files
find / -name "*dynatrace*" 2>/dev/null | wc -l
```

### 2.3 Check Configuration Files

```bash
# Find configuration files
find /etc -name "*dynatrace*" -type f 2>/dev/null

# Find in common config locations
ls -la /etc/dynatrace* 2>/dev/null
ls -la /etc/default/dynatrace* 2>/dev/null
```

### 2.4 Check Log Files

```bash
# Find log files
find /var/log -name "*dynatrace*" 2>/dev/null
find /var/log -path "*dynatrace*" 2>/dev/null

# Check log directory size
du -sh /var/log/dynatrace* 2>/dev/null
```

### 2.5 Check Package Information

```bash
# RPM-based systems (CentOS, RHEL)
rpm -ql dynatrace 2>/dev/null
rpm -qi dynatrace 2>/dev/null

# Debian-based systems (Ubuntu, Debian)
dpkg -L dynatrace 2>/dev/null
dpkg -s dynatrace 2>/dev/null

# Listing all files installed by package
rpm -qa | grep dynatrace
dpkg -l | grep dynatrace
```

### 2.6 Create Backup List

```bash
# Export file list before uninstall
find / -name "*dynatrace*" -type f 2>/dev/null > /tmp/dynatrace-files-backup.txt

# View the list
cat /tmp/dynatrace-files-backup.txt

# Get total count
wc -l /tmp/dynatrace-files-backup.txt
```

---

## Step 3: Uninstall Dynatrace

### 3.1 Stop Dynatrace Service

```bash
# Stop the main Dynatrace service
sudo systemctl stop dynatrace

# Stop all Dynatrace services
sudo systemctl stop dynatrace-*.service

# Verify services are stopped
sudo systemctl status dynatrace
```

### 3.2 Disable Service Auto-start

```bash
# Disable Dynatrace service
sudo systemctl disable dynatrace

# Verify disabled
sudo systemctl is-enabled dynatrace
```

### 3.3 Uninstall Dynatrace Package

#### For RPM-based Systems (CentOS, RHEL):

```bash
# List installed Dynatrace packages
rpm -qa | grep dynatrace

# Uninstall
sudo rpm -e dynatrace
# or with specific package name
sudo rpm -e dynatrace-agent
sudo rpm -e dynatrace-oneagent
```

#### For Debian-based Systems (Ubuntu, Debian):

```bash
# List installed Dynatrace packages
dpkg -l | grep dynatrace

# Uninstall
sudo apt-get remove dynatrace -y
# or
sudo dpkg -r dynatrace
```

### 3.4 Remove Configuration and Data Files

```bash
# Remove Dynatrace directories
sudo rm -rf /opt/dynatrace
sudo rm -rf /etc/dynatrace*
sudo rm -rf /var/log/dynatrace*

# Remove from common locations
sudo rm -rf /usr/local/dynatrace*
sudo rm -rf /var/dynatrace*

# Remove configuration from home directories
sudo find /home -name ".dynatrace*" -type d -exec rm -rf {} \; 2>/dev/null
```

### 3.5 Remove Package Repository (if installed)

```bash
# For APT (Ubuntu/Debian)
sudo rm /etc/apt/sources.list.d/dynatrace*.list
sudo apt-get update

# For YUM/DNF (CentOS/RHEL)
sudo rm /etc/yum.repos.d/dynatrace*.repo
sudo yum clean all
```

### 3.6 Verify Complete Removal

```bash
# Verify service is gone
systemctl list-units --type=service | grep dynatrace

# Verify package removed
rpm -qa | grep dynatrace
dpkg -l | grep dynatrace

# Search for remaining files
find / -name "*dynatrace*" 2>/dev/null

# Check environment
env | grep -i dynatrace
```

---

## Step 4: Check Service Running Status

### 4.1 Check System Status

```bash
# Get system uptime
uptime

# Check system resources
free -h
df -h

# Check CPU info
nproc
cat /proc/cpuinfo | head -10
```

### 4.2 Check if Any Services Are Down

```bash
# List all active services
systemctl list-units --type=service --state=active

# List all services with status
systemctl list-units --type=service --no-pager

# Check for failed services
systemctl list-units --type=service --state=failed
```

### 4.3 Check Network Services

```bash
# Check listening ports
sudo netstat -tlnp
# or
sudo ss -tlnp

# Check DNS
nslookup google.com
dig google.com

# Check network connectivity
ip addr show
```

### 4.4 Check Important System Services

```bash
# Check critical services
sudo systemctl status sshd
sudo systemctl status networking
sudo systemctl status docker (if applicable)

# Check NTP/time sync
timedatectl status

# Check system logs
sudo journalctl -xe --no-pager | tail -50
```

---

## Step 5: Clear Cache Files Related to Dynatrace

### 5.1 Clear Package Manager Cache

```bash
# APT cache (Ubuntu/Debian)
sudo apt-get clean
sudo apt-get autoclean
sudo apt-get autoremove

# YUM cache (CentOS/RHEL)
sudo yum clean all
sudo yum clean metadata
```

### 5.2 Clear Application Cache

```bash
# Remove Dynatrace cache directories
sudo rm -rf /var/cache/dynatrace* 2>/dev/null
sudo rm -rf ~/.dynatrace* 2>/dev/null
sudo rm -rf /tmp/dynatrace* 2>/dev/null
sudo rm -rf /var/tmp/dynatrace* 2>/dev/null

# Clear Java cache (if Dynatrace used Java)
sudo rm -rf /root/.java 2>/dev/null
```

### 5.3 Clear Temporary Files

```bash
# Clean /tmp directory
sudo rm -rf /tmp/*

# Clean systemd cache
sudo systemctl daemon-reload

# Clear journal (optional, keep last 100M)
sudo journalctl --vacuum=size=100M
```

### 5.4 Clear DNS Cache

```bash
# Clear systemd DNS cache
sudo systemctl restart systemd-resolved

# Flush resolver cache
sudo resolvectl flush-caches
```

### 5.5 Verify Cache Cleared

```bash
# Check for remaining Dynatrace files
find / -name "*dynatrace*" 2>/dev/null

# Check disk space freed
df -h

# Verify cleanup
du -sh /tmp /var/tmp /var/cache 2>/dev/null
```

---

## Step 6: Install Datadog Agent

### 6.1 Download Datadog Agent

#### For RPM-based Systems (CentOS, RHEL):

```bash
# Set your API key and site
export DD_API_KEY="your_api_key_here"
export DD_SITE="datadoghq.com"

# Download installer
curl https://s3.amazonaws.com/dd-agent/scripts/install_agent.sh -o /tmp/install_agent.sh

# Or download directly
wget https://yum.datadoghq.com/stable/7/x86_64/Packages/datadog-agent-7.XX.X-1.x86_64.rpm -O /tmp/datadog-agent.rpm
```

#### For Debian-based Systems (Ubuntu, Debian):

```bash
# Set your API key and site
export DD_API_KEY="your_api_key_here"
export DD_SITE="datadoghq.com"

# Download installer
curl https://s3.amazonaws.com/dd-agent/scripts/install_agent.sh -o /tmp/install_agent.sh

# Or add repository
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=$DD_API_KEY DD_SITE=$DD_SITE bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_agent.sh)"
```

### 6.2 Install Datadog Agent

#### RPM Installation:

```bash
# Install from downloaded RPM
sudo rpm -ivh /tmp/datadog-agent-7.XX.X-1.x86_64.rpm

# Or using yum
sudo yum install -y datadog-agent
```

#### Debian Installation:

```bash
# Add Datadog repository
sudo sh -c 'echo "deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable 7" > /etc/apt/sources.list.d/datadog.list'

# Add GPG key
curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo apt-key add -

# Update repository
sudo apt-get update

# Install agent
sudo apt-get install -y datadog-agent
```

### 6.3 Install from Installation Script

```bash
# Run installation script
DD_API_KEY=$DD_API_KEY DD_SITE=$DD_SITE bash /tmp/install_agent.sh

# Or use one-liner
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY="your_api_key" DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_agent.sh)"
```

### 6.4 Verify Installation

```bash
# Check if agent package is installed
rpm -qa | grep datadog
dpkg -l | grep datadog

# Check installation directory
ls -la /opt/datadog-agent/

# Check service installed
systemctl list-units --type=service | grep datadog

# Check for agent binary
which datadog-agent
ls -la /usr/local/bin/datadog-agent
```

---

## Step 7: Check Datadog Status

### 7.1 Check Service Status

```bash
# Check if service is running
sudo systemctl status datadog-agent

# Check service enabled
sudo systemctl is-enabled datadog-agent

# Check for Datadog processes
ps aux | grep datadog

# Check Datadog process in detail
pgrep -a datadog
```

### 7.2 Check Agent Health

```bash
# Run agent status command
sudo datadog-agent status

# Or using full path
sudo /opt/datadog-agent/bin/agent/agent status

# Check agent version
sudo datadog-agent version

# Get detailed agent info
sudo datadog-agent flare --local
```

### 7.3 Check Agent Logs

```bash
# View agent logs
sudo tail -50 /var/log/datadog/agent.log

# Watch logs in real-time
sudo tail -f /var/log/datadog/agent.log

# Get log file size
ls -lh /var/log/datadog/agent.log

# Check for errors in logs
sudo grep ERROR /var/log/datadog/agent.log | tail -20
```

### 7.4 Check Configuration

```bash
# View main configuration
sudo cat /etc/datadog-agent/datadog.yaml | head -30

# Check if API key is set
sudo grep -i "api_key:" /etc/datadog-agent/datadog.yaml

# Check enabled features
sudo grep -i "enabled:" /etc/datadog-agent/datadog.yaml
```

### 7.5 Verify Agent Metrics

```bash
# Check if metrics are being collected
sudo datadog-agent status | grep -A 20 "Metrics"

# Check running checks
sudo datadog-agent status | grep -A 20 "Running Checks"

# Test agent connectivity
sudo datadog-agent check datadog_checks_base
```

---

## Step 8: Check Network Connectivity to Datadog API via Proxy

### 8.1 Test Basic Connectivity to Datadog API

```bash
# Test with curl
curl -I https://api.datadoghq.com/api/v1/validate

# Test with verbose output
curl -v https://api.datadoghq.com/api/v1/validate

# Test with timeout
curl --connect-timeout 10 https://api.datadoghq.com/api/v1/validate
```

### 8.2 Test DNS Resolution

```bash
# Test DNS for Datadog API
nslookup api.datadoghq.com

# Using dig command
dig api.datadoghq.com

# Using host command
host api.datadoghq.com

# Check with specific nameserver
nslookup api.datadoghq.com 8.8.8.8
```

### 8.3 Test Proxy Connectivity

```bash
# Set proxy environment variables
export HTTP_PROXY="http://proxy_host:proxy_port"
export HTTPS_PROXY="http://proxy_host:proxy_port"

# Test with proxy
curl -x http://proxy_host:proxy_port https://api.datadoghq.com/api/v1/validate

# Test with proxy authentication (if required)
export HTTP_PROXY="http://username:password@proxy_host:proxy_port"
curl -x http://username:password@proxy_host:proxy_port https://api.datadoghq.com/api/v1/validate
```

### 8.4 Test Port Connectivity

```bash
# Test HTTPS port (443)
nc -zv api.datadoghq.com 443

# Using telnet
telnet api.datadoghq.com 443

# Using ss command
ss -tan | grep 443

# Using netstat
sudo netstat -tulpn | grep 443
```

### 8.5 Test Proxy Port Connectivity

```bash
# Test proxy port
nc -zv proxy_host proxy_port

# Telnet to proxy
telnet proxy_host proxy_port

# Test if proxy is accessible
curl -x http://proxy_host:proxy_port http://www.google.com -I
```

### 8.6 Configure Datadog Agent to Use Proxy

```bash
# Edit Datadog configuration
sudo nano /etc/datadog-agent/datadog.yaml
# or
sudo vi /etc/datadog-agent/datadog.yaml

# Add proxy configuration:
# proxy:
#   http: http://proxy_host:proxy_port
#   https: https://proxy_host:proxy_port
#   no_proxy:
#     - localhost
#     - 127.0.0.1
```

### 8.7 Test Agent Connectivity Through Proxy

```bash
# Restart agent for proxy changes
sudo systemctl restart datadog-agent

# Check if agent is running
sudo systemctl status datadog-agent

# View logs for connection info
sudo tail -50 /var/log/datadog/agent.log

# Search for proxy connection messages
sudo grep -i "proxy" /var/log/datadog/agent.log
```

### 8.8 Full Connectivity Test Script

```bash
# Create test script
cat > /tmp/test-datadog-connectivity.sh << 'EOF'
#!/bin/bash

echo "=== Datadog Connectivity Test ==="
echo ""

# Test DNS
echo "1. Testing DNS resolution..."
nslookup api.datadoghq.com
echo ""

# Test direct connection
echo "2. Testing direct connection..."
curl --connect-timeout 5 -I https://api.datadoghq.com/api/v1/validate
echo ""

# Test via proxy
if [ ! -z "$HTTP_PROXY" ]; then
    echo "3. Testing via proxy..."
    curl -x $HTTP_PROXY --connect-timeout 5 -I https://api.datadoghq.com/api/v1/validate
    echo ""
fi

# Test port
echo "4. Testing port 443..."
nc -zv api.datadoghq.com 443
echo ""

# Test agent
echo "5. Testing agent status..."
sudo systemctl status datadog-agent
echo ""

# Check logs
echo "6. Recent agent logs..."
sudo tail -20 /var/log/datadog/agent.log

EOF

chmod +x /tmp/test-datadog-connectivity.sh
sudo /tmp/test-datadog-connectivity.sh
```

---

## Step 9: Enable APM and Service Monitoring Configuration

### 9.1 Enable APM Configuration

Edit the Datadog configuration file and enable APM:

```bash
# Edit configuration
sudo nano /etc/datadog-agent/datadog.yaml
```

Find or add the APM section:

```yaml
apm_config:
  enabled: true
  apm_non_local_traffic: true
```

Use sed to enable APM:

```bash
# Enable APM (uncomment and set to true)
sudo sed -i 's/# apm_config:/apm_config:/' /etc/datadog-agent/datadog.yaml
sudo sed -i '/apm_config:/,/^[^ ]/ s/# enabled: false/enabled: true/' /etc/datadog-agent/datadog.yaml

# Or more direct approach
sudo sed -i '/apm_config:/a\  enabled: true\n  apm_non_local_traffic: true' /etc/datadog-agent/datadog.yaml
```

### 9.2 Enable Service Monitoring Configuration

Edit the datadog.yaml file to enable service monitoring:

```yaml
service_monitoring_config:
  enabled: true
```

Use sed to enable service monitoring:

```bash
# Add service_monitoring_config section if it doesn't exist
sudo sed -i '/^logs_enabled:/a\
\
service_monitoring_config:\
  enabled: true' /etc/datadog-agent/datadog.yaml

# Or if section exists, enable it
sudo sed -i '/service_monitoring_config:/,/enabled:/ s/enabled: false/enabled: true/' /etc/datadog-agent/datadog.yaml

# Alternative for macOS (BSD sed)
sudo sed -i '' '/service_monitoring_config:/,/enabled:/ s/enabled: false/enabled: true/' /etc/datadog-agent/datadog.yaml
```

### 9.3 Using sed with Backup

```bash
# Enable APM with backup
sudo sed -i.bak '/apm_config:/,/enabled:/ s/enabled: false/enabled: true/' /etc/datadog-agent/datadog.yaml

# Enable service monitoring with backup
sudo sed -i.bak '/service_monitoring_config:/,/enabled:/ s/enabled: false/enabled: true/' /etc/datadog-agent/datadog.yaml
```

### 9.4 Enable Both APM and Service Monitoring (Combined)

```bash
# Create a combined configuration update
cat >> /tmp/datadog-updates.txt << 'EOF'
apm_config:
  enabled: true
  apm_non_local_traffic: true

service_monitoring_config:
  enabled: true
EOF

# Append to configuration (if sections don't exist)
sudo cat /tmp/datadog-updates.txt >> /etc/datadog-agent/datadog.yaml
```

### 9.5 Verify sed Changes

```bash
# Check APM configuration
sudo grep -A 3 "apm_config:" /etc/datadog-agent/datadog.yaml

# Check service monitoring configuration
sudo grep -A 3 "service_monitoring_config:" /etc/datadog-agent/datadog.yaml

# View entire configuration
sudo cat /etc/datadog-agent/datadog.yaml | grep -E "(apm_config|service_monitoring_config)" -A 2

# Preview before applying
sudo sed -n '/apm_config:/,/service_monitoring_config:/p' /etc/datadog-agent/datadog.yaml
```

### 9.6 Enable Both with Single sed Command

```bash
# Linux version
sudo sed -i '/^logs_enabled:/ a\
\
apm_config:\
  enabled: true\
  apm_non_local_traffic: true\
\
service_monitoring_config:\
  enabled: true' /etc/datadog-agent/datadog.yaml

# Validate configuration after
sudo grep -E "(apm|service_monitoring)" /etc/datadog-agent/datadog.yaml -A 2
```

---

## Step 10: Check Datadog Configuration

### 10.1 View Main Configuration

```bash
# View entire configuration
sudo cat /etc/datadog-agent/datadog.yaml

# View with line numbers
sudo cat -n /etc/datadog-agent/datadog.yaml

# View specific sections
sudo grep -E "^[a-z_]+:" /etc/datadog-agent/datadog.yaml
```

### 10.2 Check Critical Settings

```bash
# Check API key is configured
sudo grep -i "api_key:" /etc/datadog-agent/datadog.yaml

# Check site configuration
sudo grep -i "^site:" /etc/datadog-agent/datadog.yaml

# Check hostname
sudo grep -i "^hostname:" /etc/datadog-agent/datadog.yaml

# Check tags
sudo grep -i "^tags:" /etc/datadog-agent/datadog.yaml -A 5
```

### 10.3 Check Feature Configurations

```bash
# Check APM enabled
sudo grep -i "apm_config:" /etc/datadog-agent/datadog.yaml -A 5

# Check service monitoring enabled
sudo grep -i "service_monitoring_config:" /etc/datadog-agent/datadog.yaml -A 5

# Check logs enabled
sudo grep -i "logs_enabled:" /etc/datadog-agent/datadog.yaml

# Check process monitoring
sudo grep -i "process_config:" /etc/datadog-agent/datadog.yaml -A 5
```

### 10.4 Check Integration Configurations

```bash
# List available integrations
ls -la /etc/datadog-agent/conf.d/

# Check specific integration (e.g., system-probe)
sudo cat /etc/datadog-agent/conf.d/system-probe.d/conf.yaml 2>/dev/null

# Check all enabled integrations
ls -la /etc/datadog-agent/conf.d/*.d/conf.yaml
```

### 10.5 Validate Configuration

```bash
# Validate configuration syntax
sudo datadog-agent configcheck

# Show configuration validation output
sudo /opt/datadog-agent/bin/agent/agent configcheck

# Check for errors
sudo datadog-agent health

# Get full status with configuration
sudo datadog-agent status | head -50
```

### 10.6 Check Proxy Configuration

```bash
# View proxy settings
sudo grep -i "proxy:" /etc/datadog-agent/datadog.yaml -A 10

# Check if proxy is configured
sudo grep -E "^\s+http:|^\s+https:" /etc/datadog-agent/datadog.yaml
```

### 10.7 Compare with Default Configuration

```bash
# Find default/example configuration
find /opt/datadog-agent -name "*.yaml.example" -o -name "*.yaml.default"

# Compare current with default
diff /etc/datadog-agent/datadog.yaml /opt/datadog-agent/etc/datadog.yaml.example 2>/dev/null | head -50

# Export current config for documentation
sudo cat /etc/datadog-agent/datadog.yaml > /tmp/datadog-config-backup-$(date +%Y%m%d).yaml
```

---

## Step 11: Restart Datadog Agent

### 11.1 Restart the Agent Service

```bash
# Restart Datadog agent service
sudo systemctl restart datadog-agent

# Verify service restarted
sudo systemctl status datadog-agent
```

### 11.2 Restart and Verify Status

```bash
# Restart with status check
sudo systemctl restart datadog-agent && sleep 3 && sudo systemctl status datadog-agent
```

### 11.3 Check Agent Process After Restart

```bash
# Check if agent process is running
ps aux | grep datadog

# Count datadog processes
pgrep -c datadog

# Get process details
pgrep -a datadog
```

### 11.4 Check Logs After Restart

```bash
# View recent logs
sudo tail -100 /var/log/datadog/agent.log

# Search for startup messages
sudo grep "Starting" /var/log/datadog/agent.log | tail -5

# Check for any errors
sudo grep "ERROR\|WARN" /var/log/datadog/agent.log | tail -10
```

### 11.5 Verify Agent is Reporting

```bash
# Get agent status with running checks
sudo datadog-agent status

# Check running checks
sudo datadog-agent status | grep -A 50 "Running Checks"

# Check metrics collection
sudo datadog-agent status | grep -A 20 "Metrics"
```

### 11.6 Verify Configuration is Applied

```bash
# Check APM status
sudo datadog-agent status | grep -i "apm"

# Check system probe status
sudo datadog-agent status | grep -i "system probe"

# View integration status
sudo datadog-agent status | grep -i "checks"
```

### 11.7 Test API Connectivity After Restart

```bash
# Test connectivity to Datadog API
curl -I https://api.datadoghq.com/api/v1/validate

# Test with proxy if configured
curl -x $HTTP_PROXY -I https://api.datadoghq.com/api/v1/validate

# Check agent logs for connectivity messages
sudo grep "api" /var/log/datadog/agent.log | tail -10
```

### 11.8 Full Restart and Verification Script

```bash
# Create comprehensive verification script
cat > /tmp/restart-and-verify.sh << 'EOF'
#!/bin/bash

echo "=== Datadog Agent Restart and Verification ==="
echo ""

# Restart service
echo "1. Restarting Datadog agent..."
sudo systemctl restart datadog-agent
sleep 3
echo ""

# Check service status
echo "2. Checking service status..."
sudo systemctl status datadog-agent
echo ""

# Check process
echo "3. Checking agent process..."
ps aux | grep "[d]atadog"
echo ""

# Check logs
echo "4. Recent log entries..."
sudo tail -20 /var/log/datadog/agent.log
echo ""

# Check status command
echo "5. Agent status..."
sudo datadog-agent status | head -30
echo ""

# Check configuration
echo "6. Configuration verification..."
sudo grep -E "(apm_config|service_monitoring_config)" /etc/datadog-agent/datadog.yaml -A 2
echo ""

# Check API connectivity
echo "7. Testing API connectivity..."
curl --connect-timeout 5 -I https://api.datadoghq.com/api/v1/validate
echo ""

echo "=== Verification Complete ==="
EOF

chmod +x /tmp/restart-and-verify.sh
sudo /tmp/restart-and-verify.sh
```

### 11.9 Enable Service Auto-start

```bash
# Enable Datadog service to start on boot
sudo systemctl enable datadog-agent

# Verify enabled
sudo systemctl is-enabled datadog-agent

# Check enabled services
systemctl list-unit-files | grep datadog
```

### 11.10 Monitor Agent for Issues

```bash
# Watch agent logs for issues
sudo tail -f /var/log/datadog/agent.log

# Monitor for errors in real-time
sudo grep -f /dev/stdin /var/log/datadog/agent.log << 'EOF' &
ERROR
WARN
FAIL
EOF

# Check system resource usage
while true; do pgrep -a datadog && ps aux | grep "[d]atadog"; sleep 5; done
```

---

## Complete Migration Summary

### Migration Checklist

- [x] Step 1: Check Dynatrace installation
- [x] Step 2: Find all Dynatrace files
- [x] Step 3: Uninstall Dynatrace
- [x] Step 4: Verify system services running
- [x] Step 5: Clear Dynatrace cache
- [x] Step 6: Install Datadog agent
- [x] Step 7: Verify Datadog installation
- [x] Step 8: Test Datadog API connectivity via proxy
- [x] Step 9: Enable APM and service monitoring
- [x] Step 10: Verify Datadog configuration
- [x] Step 11: Restart and verify agent

### Post-Migration Verification

```bash
# Final comprehensive check
cat > /tmp/final-check.sh << 'EOF'
#!/bin/bash

echo "=== POST-MIGRATION VERIFICATION ==="

# 1. Verify Dynatrace removed
echo "1. Dynatrace removal check..."
find / -name "*dynatrace*" 2>/dev/null | wc -l
echo "Should be 0 files"
echo ""

# 2. Verify Datadog installed
echo "2. Datadog installation check..."
rpm -qa | grep datadog || dpkg -l | grep datadog
echo ""

# 3. Verify Datadog running
echo "3. Datadog service check..."
sudo systemctl status datadog-agent | grep -E "active|inactive"
echo ""

# 4. Verify configuration
echo "4. Configuration check..."
sudo grep -c "enabled: true" /etc/datadog-agent/datadog.yaml
echo "Should have multiple 'enabled: true' entries"
echo ""

# 5. Verify connectivity
echo "5. API connectivity check..."
curl --connect-timeout 5 -s -o /dev/null -w "%{http_code}\n" https://api.datadoghq.com/api/v1/validate
echo "Should return 200"
echo ""

echo "=== MIGRATION COMPLETE ==="
EOF

chmod +x /tmp/final-check.sh
sudo /tmp/final-check.sh
```

---

## Quick Reference

### Critical Commands

```bash
# Check Dynatrace
systemctl status dynatrace

# Find Dynatrace files
find / -name "*dynatrace*" 2>/dev/null

# Uninstall Dynatrace
sudo systemctl stop dynatrace && sudo rpm -e dynatrace && sudo rm -rf /opt/dynatrace /etc/dynatrace*

# Install Datadog
DD_API_KEY="your_key" DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_agent.sh)"

# Enable APM and Service Monitoring
sudo sed -i '/apm_config:/,/enabled:/ s/enabled: false/enabled: true/' /etc/datadog-agent/datadog.yaml
sudo sed -i '/service_monitoring_config:/,/enabled:/ s/enabled: false/enabled: true/' /etc/datadog-agent/datadog.yaml

# Restart and verify
sudo systemctl restart datadog-agent && sudo systemctl status datadog-agent
```

---

## Related Documentation

- [Datadog Windows Setup](../windows/datadog-windows-setup.md)
- [Datadog Proxy Testing](./datadog-proxy-testing.md)
- [Linux One-Line Commands](../linux/oneline-commands.md)
- [Service Check Commands](../services/service-check-commands.md)

---

## Support and Troubleshooting

If you encounter issues during migration:

1. **Check logs**: `sudo tail -f /var/log/datadog/agent.log`
2. **Verify configuration**: `sudo datadog-agent configcheck`
3. **Test connectivity**: `curl https://api.datadoghq.com/api/v1/validate`
4. **Restart service**: `sudo systemctl restart datadog-agent`

For persistent issues, create a Datadog flare: `sudo datadog-agent flare`
