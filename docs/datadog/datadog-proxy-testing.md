---
sidebar_position: 1
sidebar_label: Datadog Proxy Testing
description: Comprehensive network proxy testing guide for Datadog agents with 25+ diagnostic commands
tags: [datadog, proxy, networking, testing, diagnostics, troubleshooting]
---

# Network Proxy Testing for Datadog

Comprehensive commands and procedures to test network proxy connectivity for Datadog agents in DevOps environments on CentOS/Linux.

## Basic Network Connectivity Tests

### 1. Test Basic Connectivity to Datadog API

```bash
# Test connectivity to Datadog API (US)
curl -s -I https://api.datadoghq.com/api/v1/validate
```
---

### 2. Test DNS Resolution for Datadog

```bash
# Test DNS resolution
nslookup api.datadoghq.com
```
```bash
# Test DNS with specific nameserver (Google)
nslookup api.datadoghq.com 8.8.8.8
```
```bash
# Use dig for detailed DNS info
dig api.datadoghq.com
```
```bash
# Check DNS resolver configuration
cat /etc/resolv.conf
```

---

### 3. Test Port Connectivity

```bash
# Test HTTPS port (443)
nc -zv api.datadoghq.com 443
```
```bash
# Use telnet (if available)
telnet api.datadoghq.com 443
```
```bash
# Use ss command
ss -tan | grep 443
```
---

## Proxy Configuration Tests

### 4. Test with HTTP Proxy

```bash
# Set HTTP proxy environment variable
export HTTP_PROXY="http://proxy-server:8080"
export HTTPS_PROXY="http://proxy-server:8080"
export NO_PROXY="localhost,127.0.0.1"

# Test curl through proxy
curl -v -x $HTTP_PROXY https://api.datadoghq.com/api/v1/validate

# Test with proxy authentication
curl -v -x http://username:password@proxy-server:8080 https://api.datadoghq.com/api/v1/validate

# Check if proxy is set
echo $HTTP_PROXY
echo $HTTPS_PROXY
```

---

### 5. Test with SOCKS Proxy

```bash
# Set SOCKS proxy
export ALL_PROXY="socks5://proxy-server:1080"

# Test with curl (SOCKS5)
curl -v -x socks5://proxy-server:1080 https://api.datadoghq.com/api/v1/validate

# Test with SOCKS4
curl -v -x socks4://proxy-server:1080 https://api.datadoghq.com/api/v1/validate
```

---

### 6. Configure Datadog Agent for Proxy

```bash
# Edit Datadog agent configuration
sudo nano /etc/datadog-agent/datadog.yaml

# Add proxy configuration:
# proxy:
#   https: "http://proxy-server:8080"
#   http: "http://proxy-server:8080"
#   no_proxy:
#     - "localhost"
#     - "127.0.0.1"

# Or with authentication:
# proxy:
#   https: "http://username:password@proxy-server:8080"
#   http: "http://username:password@proxy-server:8080"

# Verify configuration
sudo grep -A 5 "^proxy:" /etc/datadog-agent/datadog.yaml

# Restart agent
sudo systemctl restart datadog-agent

# Check agent status
sudo systemctl status datadog-agent
```

---

## Datadog Endpoint Connectivity Tests

### 7. Test All Datadog API Endpoints

```bash
# Test API endpoint
curl -s -I https://api.datadoghq.com/api/v1/validate -H "DD-API-KEY: $DD_API_KEY" | head -5

# Test Trace/APM endpoint
curl -s -I https://trace.datadoghq.com/api/v2/apm/traces -H "DD-API-KEY: $DD_API_KEY" | head -5

# Test Logs endpoint
curl -s -I https://http-intake.logs.datadoghq.com/v1/input -H "DD-API-KEY: $DD_API_KEY" | head -5

# Test Metrics endpoint
curl -s -I https://api.datadoghq.com/api/v1/series -H "DD-API-KEY: $DD_API_KEY" | head -5

# Test RUM endpoint
curl -s -I https://rum.datadoghq.com/api/v2/rum -H "DD-API-KEY: $DD_API_KEY" | head -5
```

---

### 8. Test Datadog Agent Connectivity

```bash
# Run agent diagnose command
sudo datadog-agent diagnose

# Check agent connectivity to Datadog
sudo datadog-agent status

# Test agent API validation
sudo datadog-agent diagnose | grep -i "connectivity\|datadog"

# Check agent configuration
sudo datadog-agent configcheck

# View agent integration status
sudo datadog-agent integration show
```

---

## Proxy Firewall and Routing Tests

### 9. Check Network Routes

```bash
# Show routing table
ip route list

# Show default gateway
ip route show | grep default

# Trace route to Datadog
traceroute api.datadoghq.com

# Trace with IPv4 only
traceroute -4 api.datadoghq.com

# Check MTU size
ip link show | grep mtu

# Test with different packet sizes
ping -c 3 -M do -s 1472 api.datadoghq.com
```

---

### 10. Test Proxy Firewall Rules

```bash
# Check if proxy port is listening
sudo ss -tlnp | grep 8080

# Check firewall rules
sudo iptables -L -n | grep 8080

# Check firewalld rules
sudo firewall-cmd --list-all

# Test if port is accessible
nc -zv proxy-server 8080

# Test SSL/TLS through proxy
openssl s_client -proxy proxy-server:8080 -connect api.datadoghq.com:443
```

---

### 11. Check Network Interface Status

```bash
# Show all network interfaces
ip addr show

# Show interface details
ip link show

# Check network connectivity
ping -c 3 8.8.8.8

# Show active connections
ss -tan

# Monitor network traffic
iftop

# Show network statistics
netstat -s
```

---

## SSL/TLS Certificate Tests

### 12. Test SSL/TLS Certificates

```bash
# Check certificate validity
openssl s_client -connect api.datadoghq.com:443 -showcerts

# Check certificate expiration
openssl s_client -connect api.datadoghq.com:443 | openssl x509 -noout -dates

# Verify certificate chain
echo | openssl s_client -connect api.datadoghq.com:443 -showcerts 2>/dev/null | grep "subject="

# Test with custom CA bundle
curl -v --cacert /path/to/ca-bundle.crt https://api.datadoghq.com/api/v1/validate

# Check certificate on proxy
openssl s_client -connect proxy-server:8080 -showcerts
```

---

### 13. Handle SSL Certificate Issues

```bash
# Ignore SSL verification (not recommended for production)
curl -k https://api.datadoghq.com/api/v1/validate

# Test with debug SSL
openssl s_client -debug -connect api.datadoghq.com:443

# Check system CA certificates
ls -la /etc/ssl/certs/

# Update CA certificates
sudo update-ca-certificates

# Import custom certificate
sudo cp /path/to/cert.pem /etc/ssl/certs/
sudo update-ca-certificates
```

---

## Datadog Agent Proxy Testing

### 14. Test Agent with Proxy Configuration

```bash
# Create temporary proxy test config
sudo tee /etc/datadog-agent/conf.d/test_proxy.yaml > /dev/null << EOF
init_config:

instances:
  - host: api.datadoghq.com
    port: 443
    tls_verify: true
    proxy:
      https: "http://proxy-server:8080"
EOF

# Check if agent can reach Datadog through proxy
sudo datadog-agent check test_proxy

# View agent logs for proxy errors
sudo tail -50 /var/log/datadog/agent.log | grep -i proxy

# Clean up test config
sudo rm /etc/datadog-agent/conf.d/test_proxy.yaml
```

---

### 15. Monitor Proxy Traffic

```bash
# Monitor outgoing connections to Datadog
sudo tcpdump -i any -n "host api.datadoghq.com or host trace.datadoghq.com"

# Capture proxy traffic
sudo tcpdump -i any -w proxy_traffic.pcap port 8080

# Show connections to Datadog
sudo netstat -tulnp | grep -i datadog

# Monitor agent connections
sudo lsof -p $(pgrep -f datadog-agent) -i
```

---

## Complete Proxy Testing Commands

### 16. Quick Proxy Connection Test (One-Liner)

```bash
echo "=== PROXY TEST ===" && timeout 5 nc -zv proxy-server 8080 && echo "✓ Proxy reachable" || echo "✗ Proxy unreachable" && echo "" && echo "=== DATADOG API TEST ===" && curl -s -m 5 -x http://proxy-server:8080 https://api.datadoghq.com/api/v1/validate -H "DD-API-KEY: ${DD_API_KEY:-test}" && echo "✓ Datadog reachable through proxy" || echo "✗ Datadog unreachable through proxy"
```

---

### 17. Full Proxy and Datadog Connectivity Test (One-Liner)

```bash
{ echo "╔═════════════════════════════════════════════════════════╗"; echo "║     PROXY & DATADOG CONNECTIVITY TEST                   ║"; echo "╚═════════════════════════════════════════════════════════╝"; echo ""; echo "[1] DNS RESOLUTION]"; for host in api.datadoghq.com trace.datadoghq.com logs.datadoghq.com; do nslookup $host 8.8.8.8 2>&1 | grep -E "Name:|Address:" | head -2; done; echo ""; echo "[2] PROXY CONNECTIVITY]"; timeout 5 nc -zv proxy-server 8080 2>&1 | grep -o "succeeded\|Connection refused"; echo ""; echo "[3] DATADOG API (Direct)]"; curl -s -m 5 https://api.datadoghq.com/api/v1/validate -H "DD-API-KEY: test" -w "\nHTTP: %{http_code}\n" | tail -2; echo ""; echo "[4] DATADOG API (Via Proxy)]"; curl -s -m 5 -x http://proxy-server:8080 https://api.datadoghq.com/api/v1/validate -H "DD-API-KEY: test" -w "\nHTTP: %{http_code}\n" | tail -2; echo ""; echo "[5] AGENT STATUS]"; sudo datadog-agent status 2>/dev/null | head -5 || echo "Agent not running"; echo ""; echo "[6] CERTIFICATE CHECK]"; echo | openssl s_client -connect api.datadoghq.com:443 2>/dev/null | grep "subject=" | head -1; echo ""; echo "╚═════════════════════════════════════════════════════════╝"; } 2>&1 | tee /tmp/proxy_test_$(date +%Y%m%d_%H%M%S).log
```

---

### 18. Comprehensive Proxy Diagnostics (One-Liner)

```bash
{ echo "╔════════════════════════════════════════════════════════════════╗"; echo "║         COMPREHENSIVE PROXY DIAGNOSTICS REPORT                ║"; echo "╚════════════════════════════════════════════════════════════════╝"; echo ""; echo "[1] SYSTEM NETWORK]"; echo "  Interfaces: $(ip link show | grep "^[0-9]" | wc -l)"; echo "  Gateway: $(ip route show | grep default | awk '{print $3}')"; echo "  DNS: $(cat /etc/resolv.conf | grep nameserver | head -1)"; echo ""; echo "[2] PROXY CONFIGURATION]"; echo "  HTTP_PROXY: ${HTTP_PROXY:-Not set}"; echo "  HTTPS_PROXY: ${HTTPS_PROXY:-Not set}"; echo "  NO_PROXY: ${NO_PROXY:-Not set}"; echo ""; echo "[3] PROXY REACHABILITY]"; for proxy_host in ${HTTP_PROXY##*//} ${HTTPS_PROXY##*//}; do proxy_addr=${proxy_host%:*}; proxy_port=${proxy_host##*:}; timeout 3 nc -zv $proxy_addr $proxy_port 2>&1 | grep -q "succeeded" && echo "  ✓ Proxy $proxy_host: OK" || echo "  ✗ Proxy $proxy_host: FAILED"; done; echo ""; echo "[4] DATADOG ENDPOINTS]"; for endpoint in api.datadoghq.com trace.datadoghq.com logs.datadoghq.com; do timeout 3 bash -c '</dev/tcp/'$endpoint'/443' 2>/dev/null && echo "  ✓ $endpoint: Reachable" || echo "  ✗ $endpoint: Unreachable"; done; echo ""; echo "[5] AGENT CONFIGURATION]"; echo "  Config file: /etc/datadog-agent/datadog.yaml"; sudo grep -E "^proxy:|https:|http:|no_proxy:" /etc/datadog-agent/datadog.yaml 2>/dev/null | sed 's/^/  /' || echo "  No proxy configured"; echo ""; echo "[6] AGENT STATUS]"; sudo systemctl is-active datadog-agent >/dev/null 2>&1 && echo "  ✓ Agent running" || echo "  ✗ Agent stopped"; echo ""; echo "[7] RECENT AGENT ERRORS]"; sudo journalctl -u datadog-agent -n 5 -p err 2>/dev/null | sed 's/^/  /' || echo "  No recent errors"; echo ""; echo "╚════════════════════════════════════════════════════════════════╝"; } 2>&1 | tee /tmp/proxy_diagnostics_$(date +%Y%m%d_%H%M%S).log
```

---

## Proxy Environment Variables

### 19. Set and Verify Proxy Environment Variables

```bash
# Set proxy for current session
export HTTP_PROXY="http://proxy-server:8080"
export HTTPS_PROXY="http://proxy-server:8080"
export FTP_PROXY="http://proxy-server:8080"
export NO_PROXY="localhost,127.0.0.1,*.internal"

# Set with authentication
export HTTP_PROXY="http://username:password@proxy-server:8080"
export HTTPS_PROXY="http://username:password@proxy-server:8080"

# Verify settings
echo "HTTP_PROXY: $HTTP_PROXY"
echo "HTTPS_PROXY: $HTTPS_PROXY"
echo "NO_PROXY: $NO_PROXY"

# Make persistent (add to ~/.bashrc or ~/.zshrc)
cat >> ~/.bashrc << EOF
export HTTP_PROXY="http://proxy-server:8080"
export HTTPS_PROXY="http://proxy-server:8080"
export NO_PROXY="localhost,127.0.0.1"
EOF

# Source the file
source ~/.bashrc
```

---

### 20. Set Proxy for System Services

```bash
# Create systemd drop-in directory
sudo mkdir -p /etc/systemd/system/datadog-agent.service.d/

# Create environment file
sudo tee /etc/systemd/system/datadog-agent.service.d/proxy.conf > /dev/null << EOF
[Service]
Environment="HTTP_PROXY=http://proxy-server:8080"
Environment="HTTPS_PROXY=http://proxy-server:8080"
Environment="NO_PROXY=localhost,127.0.0.1"
EOF

# Reload systemd
sudo systemctl daemon-reload

# Restart agent
sudo systemctl restart datadog-agent

# Verify
sudo systemctl show-environment | grep PROXY
```

---

## Troubleshooting Proxy Issues

### 21. Diagnose Proxy Connection Problems

```bash
# Test with verbose curl
curl -vv -x http://proxy-server:8080 https://api.datadoghq.com/api/v1/validate

# Check for DNS issues
host api.datadoghq.com

# Test with strace to see system calls
strace -e connect,openat curl -x http://proxy-server:8080 https://api.datadoghq.com/api/v1/validate 2>&1 | tail -50

# Check open file descriptors
lsof -p $(pgrep curl) 2>/dev/null

# Monitor with tcpdump
sudo tcpdump -i any -n port 8080 or port 443 -w /tmp/proxy_debug.pcap
```

---

### 22. Common Proxy Issues and Fixes

```bash
# Issue 1: Connection Refused
# Fix: Verify proxy is running and accessible
sudo systemctl status proxy-service
sudo ss -tlnp | grep 8080

# Issue 2: SSL Certificate Error
# Fix: Update CA certificates
sudo update-ca-certificates

# Issue 3: Authentication Failed
# Fix: Verify proxy credentials
curl -x http://username:password@proxy-server:8080 https://api.datadoghq.com/api/v1/validate -v

# Issue 4: Timeout
# Fix: Increase timeout and check network
curl -m 30 -x http://proxy-server:8080 https://api.datadoghq.com/api/v1/validate

# Issue 5: Agent not sending metrics
# Fix: Check agent logs
sudo tail -100 /var/log/datadog/agent.log | grep -i proxy
```

---

## Performance and Load Testing

### 23. Test Proxy Performance

```bash
# Single request timing
curl -w "Total: %{time_total}s, Connect: %{time_connect}s, TTFB: %{time_starttransfer}s\n" \
  -x http://proxy-server:8080 https://api.datadoghq.com/api/v1/validate -o /dev/null -s

# Multiple requests to measure throughput
for i in {1..10}; do
  curl -s -x http://proxy-server:8080 https://api.datadoghq.com/api/v1/validate \
    -H "DD-API-KEY: test" -w "Request $i: %{time_total}s\n" -o /dev/null
done

# Parallel requests
seq 1 5 | xargs -I {} -P 5 curl -s -x http://proxy-server:8080 \
  https://api.datadoghq.com/api/v1/validate -H "DD-API-KEY: test" -w "✓"

# Load test with Apache Bench
ab -n 100 -c 10 -x proxy-server:8080 https://api.datadoghq.com/api/v1/validate

# Load test with wrk
wrk -t 4 -c 100 -d 30s -x proxy-server:8080 https://api.datadoghq.com/api/v1/validate
```

---

## Automation and Monitoring Scripts

### 24. Continuous Proxy Monitoring (One-Liner)

```bash
watch -n 60 'echo "=== Proxy Health ===" && timeout 5 nc -zv proxy-server 8080 && curl -s -m 5 -x http://proxy-server:8080 https://api.datadoghq.com/api/v1/validate -H "DD-API-KEY: test" -w "Status: %{http_code}\n" && echo "✓ All checks passed" || echo "✗ Check failed"'
```

---

### 25. Automated Proxy Test Script

```bash
#!/bin/bash

PROXY_SERVER="${1:-proxy-server:8080}"
DATADOG_API_KEY="${2:-test}"
LOGFILE="/tmp/proxy_check_$(date +%Y%m%d_%H%M%S).log"

{
  echo "Proxy: $PROXY_SERVER"
  echo "Timestamp: $(date)"
  echo ""
  
  # Test 1: Proxy connectivity
  echo "[1] Proxy Connectivity"
  if timeout 5 nc -zv ${PROXY_SERVER%:*} ${PROXY_SERVER##*:} 2>&1 | grep -q succeeded; then
    echo "✓ Proxy reachable"
  else
    echo "✗ Proxy unreachable"
  fi
  
  # Test 2: Datadog API connectivity
  echo "[2] Datadog API (via Proxy)"
  RESPONSE=$(curl -s -m 5 -x http://$PROXY_SERVER https://api.datadoghq.com/api/v1/validate \
    -H "DD-API-KEY: $DATADOG_API_KEY" -w "\n%{http_code}")
  HTTP_CODE=$(echo "$RESPONSE" | tail -1)
  if [ "$HTTP_CODE" = "200" ]; then
    echo "✓ API reachable (HTTP $HTTP_CODE)"
  else
    echo "✗ API unreachable (HTTP $HTTP_CODE)"
  fi
  
  # Test 3: Agent status
  echo "[3] Datadog Agent"
  if sudo systemctl is-active datadog-agent > /dev/null; then
    echo "✓ Agent running"
  else
    echo "✗ Agent stopped"
  fi
  
} | tee -a "$LOGFILE"

echo "Log saved to: $LOGFILE"
```

---

## Quick Reference Table

| Test | Command |
|------|---------|
| DNS Resolution | `nslookup api.datadoghq.com 8.8.8.8` |
| Port Connectivity | `nc -zv api.datadoghq.com 443` |
| Proxy Connectivity | `nc -zv proxy-server 8080` |
| API via Proxy | `curl -x http://proxy-server:8080 https://api.datadoghq.com/api/v1/validate` |
| Set HTTP Proxy | `export HTTP_PROXY="http://proxy-server:8080"` |
| Agent Diagnostics | `sudo datadog-agent diagnose` |
| Agent Status | `sudo systemctl status datadog-agent` |
| View Proxy Config | `sudo grep proxy /etc/datadog-agent/datadog.yaml` |
| Agent Logs | `sudo tail -f /var/log/datadog/agent.log` |
| Trace Route | `traceroute api.datadoghq.com` |
| Check SSL Certificate | `openssl s_client -connect api.datadoghq.com:443` |
| Test Certificate Date | `openssl s_client -connect api.datadoghq.com:443 \| openssl x509 -noout -dates` |
| Monitor Traffic | `sudo tcpdump -i any port 8080 or 443` |
| Performance Test | `curl -w "Total: %{time_total}s\n" -x http://proxy-server:8080 https://api.datadoghq.com/api/v1/validate` |
| Full Diagnostics | `sudo datadog-agent diagnose \| grep -i proxy` |

---

## Environment Variables Cheat Sheet

```bash
# HTTP/HTTPS Proxies
HTTP_PROXY="http://proxy-server:8080"
HTTPS_PROXY="http://proxy-server:8080"

# SOCKS Proxy
ALL_PROXY="socks5://proxy-server:1080"

# Proxy Authentication
HTTP_PROXY="http://username:password@proxy-server:8080"
HTTPS_PROXY="http://username:password@proxy-server:8080"

# Exclude from Proxy
NO_PROXY="localhost,127.0.0.1,*.internal"

# Datadog-Specific
DD_API_KEY="your_api_key"
DD_SITE="datadoghq.com"  # or datadoghq.eu
DD_ENV="production"
DD_SERVICE="myapp"
```

---

## Best Practices for DevOps

:::tip Best Practices
1. **Always use HTTPS for proxy connections** when possible
2. **Test connectivity before deploying** Datadog agents to production
3. **Monitor proxy logs** for authentication and connection failures
4. **Document proxy settings** in your infrastructure as code
5. **Use certificate pinning** for added security in sensitive environments
6. **Implement health checks** to monitor proxy availability
7. **Backup proxy configurations** before making changes
8. **Test failover** to secondary proxy servers
9. **Keep CA certificates updated** to avoid SSL/TLS issues
10. **Log all proxy-related errors** for troubleshooting
:::

---

## Related Documentation

- [One-Line Bash Commands](../linux/oneline-commands.md) - Essential Linux one-liners
- [Datadog CentOS Setup](../linux/datadog-centos-setup.md) - Datadog installation
- [Service Check Commands](../services/service-check-commands.md) - Service management
