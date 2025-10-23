---
sidebar_position: 3
sidebar_label: Datadog
---

# Datadog Documentation

Complete guides for Datadog agent setup, configuration, and network connectivity testing with enterprise-grade monitoring.

## Commands in This Section

### 🔗 Datadog Proxy Testing
Comprehensive network proxy testing guide for Datadog agents with 25+ diagnostic commands for DevOps environments.

**Topics covered:**
- Basic network connectivity testing
- DNS resolution verification
- Port connectivity checks
- HTTP/SOCKS proxy configuration
- Datadog API endpoint testing
- Agent connectivity verification
- Firewall and routing tests
- SSL/TLS certificate validation
- Proxy traffic monitoring
- Performance and load testing
- Automation and monitoring scripts
- Troubleshooting common proxy issues

**👉 [View Datadog Proxy Testing](./datadog-proxy-testing.md)**

---

### 🛠️ Datadog CentOS Setup
Complete Datadog Agent setup and configuration guide for CentOS systems with 50+ commands.

**Topics covered:**
- Agent installation procedures
- Service management (start, stop, restart)
- Configuration file setup
- Integration enablement (Nginx, MySQL, PHP-FPM)
- Log collection setup
- Agent verification and testing
- Connectivity testing to Datadog API
- Troubleshooting procedures
- Environment variable configuration
- Application process monitoring
- Complete diagnostic reports

**👉 [View Datadog CentOS Setup](../linux/datadog-centos-setup.md)**

---

## Datadog Endpoints Reference

### US Datacenter (Default)
- **API**: `api.datadoghq.com`
- **Traces/APM**: `trace.datadoghq.com`
- **Logs Intake**: `http-intake.logs.datadoghq.com`
- **RUM**: `rum.datadoghq.com`

### EU Datacenter
- **API**: `api.datadoghq.eu`
- **Traces/APM**: `trace.datadoghq.eu`
- **Logs Intake**: `http-intake.logs.datadoghq.eu`
- **RUM**: `rum.datadoghq.eu`

---

## Key Datadog Agent Configuration

### Basic Configuration
```yaml
api_key: your_api_key_here
site: datadoghq.com          # or datadoghq.eu
hostname: your-server-name

tags:
  - env:production
  - service:myapp
  - team:devops

logs_enabled: true

apm_config:
  enabled: true
  apm_dd_url: https://trace.datadoghq.com
```

### Proxy Configuration
```yaml
proxy:
  https: "http://proxy-server:8080"
  http: "http://proxy-server:8080"
  no_proxy:
    - "localhost"
    - "127.0.0.1"
```

---

## Common Datadog Operations

### Agent Management
```bash
sudo systemctl start datadog-agent       # Start agent
sudo systemctl stop datadog-agent        # Stop agent
sudo systemctl restart datadog-agent     # Restart agent
sudo systemctl status datadog-agent      # Check status
sudo systemctl enable datadog-agent      # Enable auto-start
```

### Testing & Verification
```bash
sudo datadog-agent status                # Show agent status
sudo datadog-agent diagnose              # Run diagnostics
sudo datadog-agent configcheck           # Validate config
sudo datadog-agent check nginx           # Test integration
```

### Logging
```bash
sudo tail -f /var/log/datadog/agent.log          # Follow logs
sudo grep -i error /var/log/datadog/agent.log    # Find errors
sudo journalctl -u datadog-agent -f              # System logs
```

### Connectivity Testing
```bash
# Test API connectivity
curl -s https://api.datadoghq.com/api/v1/validate \
  -H "DD-API-KEY: $DD_API_KEY"

# Test through proxy
curl -x http://proxy-server:8080 \
  https://api.datadoghq.com/api/v1/validate

# Check port connectivity
nc -zv api.datadoghq.com 443
```

---

## Command Statistics

- **Total Datadog Commands**: 75+
- **Setup Commands**: 25+
- **Proxy Testing Commands**: 25+
- **Monitoring Commands**: 25+

---

## Quick Troubleshooting

### Agent Not Starting
```bash
sudo datadog-agent configcheck           # Check config syntax
sudo journalctl -u datadog-agent -n 50   # View recent errors
```

### No Metrics Sending
```bash
sudo grep "api_key" /etc/datadog-agent/datadog.yaml
curl -s https://api.datadoghq.com -H "DD-API-KEY: test"
```

### Proxy Issues
```bash
sudo tail -50 /var/log/datadog/agent.log | grep -i proxy
curl -v -x http://proxy-server:8080 https://api.datadoghq.com
```

---

## Environment Variables

```bash
# Essential variables
DD_API_KEY="your_api_key"
DD_SITE="datadoghq.com"              # or datadoghq.eu
DD_ENV="production"
DD_SERVICE="myapp"
DD_VERSION="1.0.0"

# Proxy configuration
HTTP_PROXY="http://proxy-server:8080"
HTTPS_PROXY="http://proxy-server:8080"
NO_PROXY="localhost,127.0.0.1"
```

---

## Best Practices

:::info Best Practices
1. **Secure API Keys**: Store in environment variables, not in files
2. **Use HTTPS**: Always communicate with Datadog over HTTPS
3. **Monitor Agent**: Set up monitoring for the monitoring agent itself
4. **Test Before Production**: Always test proxy and connectivity first
5. **Keep Logs**: Enable and monitor agent logs for troubleshooting
6. **Tag Resources**: Use consistent tags for organization
7. **Review Integrations**: Only enable needed integrations
8. **Update Regularly**: Keep agent updated for security patches
9. **Document Configuration**: Keep proxy and endpoint settings documented
10. **Plan Failover**: Have backup endpoints in your configuration
:::

---

## Related Sections

- **Linux Commands**: [Linux Documentation](../linux/index.md)
- **Services**: [Service Management](../services/index.md)
