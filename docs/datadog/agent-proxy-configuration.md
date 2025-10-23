---
sidebar_position: 2
sidebar_label: "Agent Proxy Configuration"
description: "Complete guide to configuring Datadog Agent to send traffic through HTTP/HTTPS proxy servers"
tags: [datadog, proxy, configuration, environment-variables, authentication]
---

# Datadog Agent Proxy Configuration

Complete guide to configuring the Datadog Agent to send traffic through an HTTP/HTTPS proxy. A proxy is typically used to send traffic from a host that is not directly connected to the public internet.

## Overview

The Datadog Agent can be configured to send all traffic through a proxy server. This is useful when:

- Your infrastructure is behind a corporate firewall
- Network policies require traffic through a proxy
- You need centralized network traffic monitoring
- Direct internet connectivity is not available

---

## Configure the Datadog Agent

There are two methods to configure proxy settings for the Datadog Agent:

1. **Configuration File** (`datadog.yaml`)
2. **Environment Variables**

Environment variables override configuration file settings.

---

## Method 1: Configuration File

### Edit the Configuration File

Edit or add the `proxy` section to the main Agent configuration file:

```bash
sudo nano /etc/datadog-agent/datadog.yaml
```

### Basic Proxy Configuration

Configure HTTP proxy endpoint:

```yaml
proxy:
  http: http://<PROXY_HOST>:<PROXY_PORT>
```

Configure HTTPS proxy endpoint (most Datadog traffic uses HTTPS):

```yaml
proxy:
  https: http://<PROXY_HOST>:<PROXY_PORT>
```

Configure both HTTP and HTTPS:

```yaml
proxy:
  http: http://<PROXY_HOST>:<PROXY_PORT>
  https: http://<PROXY_HOST>:<PROXY_PORT>
```

### Proxy with Authentication

Configure HTTP proxy with credentials:

```yaml
proxy:
  http: http://<USER>:<PASSWORD>@<PROXY_HOST>:<PROXY_PORT>
```

Configure HTTPS proxy with credentials:

```yaml
proxy:
  https: http://<USER>:<PASSWORD>@<PROXY_HOST>:<PROXY_PORT>
```

Configure both with authentication:

```yaml
proxy:
  http: http://<USER>:<PASSWORD>@<PROXY_HOST>:<PROXY_PORT>
  https: http://<USER>:<PASSWORD>@<PROXY_HOST>:<PROXY_PORT>
```

### Bypass Proxy for Specific Hosts

Specify hosts or CIDR ranges to bypass the proxy:

```yaml
proxy:
  https: http://<USER>:<PASSWORD>@<PROXY_HOST>:<PROXY_PORT>
  no_proxy:
    - 192.168.0.0/24
    - localhost
    - .myinternaldomain.com
    - internal-api.example.com
```

### No-Proxy Non-Exact Matching

Enable standard no_proxy behavior:

```yaml
no_proxy_nonexact_match: true
```

### Force HTTP for Logs

If logs are enabled, force the Agent to use HTTP:

```yaml
logs_config:
  force_use_http: true
```

### Complete Example Configuration

```yaml
proxy:
  http: http://username:password@proxy-server.example.com:8080
  https: http://username:password@proxy-server.example.com:8080
  no_proxy:
    - 127.0.0.1
    - localhost
    - .example.com
    - 192.168.0.0/16

no_proxy_nonexact_match: true

logs_config:
  force_use_http: true
```

### Restart the Agent

Restart the Datadog Agent for changes to take effect:

```bash
sudo systemctl restart datadog-agent
```

---

## Method 2: Environment Variables

### Set Environment Variables

Configure HTTP proxy via environment variable:

```bash
export DD_PROXY_HTTP="http://<USER>:<PASSWORD>@<PROXY_HOST>:<PROXY_PORT>"
```

Configure HTTPS proxy via environment variable:

```bash
export DD_PROXY_HTTPS="http://<USER>:<PASSWORD>@<PROXY_HOST>:<PROXY_PORT>"
```

Configure no-proxy hosts (space-separated):

```bash
export DD_PROXY_NO_PROXY="<HOST_TO_BYPASS_1> <HOST_TO_BYPASS_2>"
```

Enable standard no-proxy matching:

```bash
export DD_NO_PROXY_NONEXACT_MATCH=true
```

Force HTTP for logs:

```bash
export DD_LOGS_CONFIG_FORCE_USE_HTTP=true
```

### Complete Environment Variable Example

```bash
export DD_PROXY_HTTP="http://username:password@proxy-server:8080"
export DD_PROXY_HTTPS="http://username:password@proxy-server:8080"
export DD_PROXY_NO_PROXY="127.0.0.1 localhost .example.com"
export DD_NO_PROXY_NONEXACT_MATCH=true
export DD_LOGS_CONFIG_FORCE_USE_HTTP=true
```

### Make Environment Variables Persistent

Add to shell profile (`~/.bashrc` or `~/.zshrc`):

```bash
cat >> ~/.bashrc << EOF
export DD_PROXY_HTTP="http://username:password@proxy-server:8080"
export DD_PROXY_HTTPS="http://username:password@proxy-server:8080"
export DD_PROXY_NO_PROXY="127.0.0.1 localhost .example.com"
export DD_NO_PROXY_NONEXACT_MATCH=true
EOF
```

Source the file to apply changes:

```bash
source ~/.bashrc
```

### Set for Systemd Service

Create systemd drop-in directory:

```bash
sudo mkdir -p /etc/systemd/system/datadog-agent.service.d/
```

Create environment file:

```bash
sudo tee /etc/systemd/system/datadog-agent.service.d/proxy.conf > /dev/null << EOF
[Service]
Environment="DD_PROXY_HTTP=http://username:password@proxy-server:8080"
Environment="DD_PROXY_HTTPS=http://username:password@proxy-server:8080"
Environment="DD_PROXY_NO_PROXY=127.0.0.1 localhost .example.com"
Environment="DD_NO_PROXY_NONEXACT_MATCH=true"
EOF
```

Reload systemd:

```bash
sudo systemctl daemon-reload
```

Restart agent:

```bash
sudo systemctl restart datadog-agent
```

Verify environment variables:

```bash
sudo systemctl show-environment | grep DD_PROXY
```

### Restart the Agent

Restart the Datadog Agent for changes to take effect:

```bash
sudo systemctl restart datadog-agent
```

---

## Proxy Server Setup Examples

### Recommended: Squid Proxy

Squid is a robust HTTP/HTTPS proxy that simplifies configuration by transparently proxying all outbound Agent traffic.

**Advantages**:
- Transparently proxies all HTTP/HTTPS traffic
- No need to maintain domain lists
- Handles automatic SSL/TLS inspection
- Easy to configure and manage

For Squid setup and configuration, see: [Using a Squid Proxy](https://docs.datadoghq.com/agent/configuration/proxy_squid/)

### Not Recommended: HAProxy

HAProxy can forward traffic to Datadog but requires maintaining an up-to-date list of Datadog domains.

**Disadvantages**:
- Requires manual domain list management
- Complex configuration
- Risk of data loss if domain list becomes outdated
- Maintenance overhead

For HAProxy example setup, see: [HAProxy Example Setup](https://docs.datadoghq.com/agent/faq/proxy_example_haproxy/)

### Not Recommended: NGINX

NGINX can be configured to forward traffic to Datadog but is discouraged due to maintenance overhead.

**Disadvantages**:
- Similar to HAProxy - requires manual domain management
- Complex setup
- Need to keep domain lists current
- Risk of data loss

For NGINX example setup, see: [NGINX Example Setup](https://docs.datadoghq.com/agent/faq/proxy_example_nginx/)

### Exception: Deep Packet Inspection (DPI)

If you need Deep Packet Inspection (DPI) capabilities, you may consider HAProxy or NGINX to:

- Disable TLS encryption
- Use your own TLS certificates
- Inspect traffic content

This is an advanced use case and requires careful configuration.

---

## Configuration Parameters Reference

### Proxy Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `proxy.http` | string | HTTP proxy endpoint: `http://[username[:password]@]host:port` |
| `proxy.https` | string | HTTPS proxy endpoint: `http://[username[:password]@]host:port` |
| `proxy.no_proxy` | list | List of hosts/CIDR to bypass proxy |
| `no_proxy_nonexact_match` | boolean | Enable standard no_proxy behavior (default: false) |

### Environment Variables

| Variable | Type | Description |
|----------|------|-------------|
| `DD_PROXY_HTTP` | string | HTTP proxy endpoint |
| `DD_PROXY_HTTPS` | string | HTTPS proxy endpoint |
| `DD_PROXY_NO_PROXY` | string | Space-separated hosts to bypass proxy |
| `DD_NO_PROXY_NONEXACT_MATCH` | boolean | Enable standard no_proxy behavior |
| `DD_LOGS_CONFIG_FORCE_USE_HTTP` | boolean | Force HTTP for logs (if enabled) |

---

## Common Configuration Scenarios

### Scenario 1: Simple Proxy Without Authentication

Configuration file approach:

```yaml
proxy:
  https: http://proxy-server.example.com:8080
```

Environment variable approach:

```bash
export DD_PROXY_HTTPS="http://proxy-server.example.com:8080"
```

### Scenario 2: Proxy with Authentication

Configuration file approach:

```yaml
proxy:
  http: http://john:securepass@proxy.example.com:8080
  https: http://john:securepass@proxy.example.com:8080
```

Environment variable approach:

```bash
export DD_PROXY_HTTP="http://john:securepass@proxy.example.com:8080"
export DD_PROXY_HTTPS="http://john:securepass@proxy.example.com:8080"
```

### Scenario 3: Multiple Proxies with Exceptions

Configuration file approach:

```yaml
proxy:
  http: http://proxy.example.com:8080
  https: http://proxy.example.com:8080
  no_proxy:
    - localhost
    - 127.0.0.1
    - internal-api.example.com
    - 10.0.0.0/8

no_proxy_nonexact_match: true
```

### Scenario 4: Proxy with Forced HTTP Logs

Configuration file approach:

```yaml
proxy:
  https: http://proxy.example.com:8080

logs_config:
  force_use_http: true
```

Environment variable approach:

```bash
export DD_PROXY_HTTPS="http://proxy.example.com:8080"
export DD_LOGS_CONFIG_FORCE_USE_HTTP=true
```

---

## Verification

### Check Agent Status

Check the Agent status after restarting:

```bash
sudo datadog-agent status
```

### Review Agent Logs

Check for connection errors in agent logs:

```bash
sudo tail -f /var/log/datadog/agent.log
```

Search for proxy-related messages:

```bash
sudo grep -i proxy /var/log/datadog/agent.log
```

### Review Trace Agent Logs

If using APM, check trace agent logs:

```bash
sudo tail -f /var/log/datadog/trace-agent.log
```

### Test Proxy Connectivity

Test connectivity through proxy:

```bash
curl -x http://proxy-server:8080 https://api.datadoghq.com/api/v1/validate \
  -H "DD-API-KEY: your_api_key"
```

Verify HTTP status code (should be 200):

```bash
curl -x http://proxy-server:8080 https://api.datadoghq.com/api/v1/validate \
  -H "DD-API-KEY: your_api_key" -w "\nHTTP Status: %{http_code}\n"
```

---

## FIPS Proxy (US1-FED)

For Datadog accounts in the US1-FED region:

- FIPS proxy is available only in US1-FED region
- FIPS proxy cannot be used with a regular proxy simultaneously
- See [Datadog FIPS Compliance](https://docs.datadoghq.com/agent/configuration/fips-compliance/) for setup details

---

## Troubleshooting

### Proxy Connection Issues

If the Agent cannot connect through the proxy:

1. **Verify proxy is accessible**:
   ```bash
   nc -zv proxy-server 8080
   ```

2. **Check firewall rules**:
   ```bash
   sudo iptables -L -n | grep 8080
   ```

3. **Test with curl**:
   ```bash
   curl -v -x http://proxy-server:8080 https://api.datadoghq.com/api/v1/validate
   ```

### Authentication Failures

If authentication is failing:

1. **Verify credentials are correct**:
   ```bash
   curl -v -x http://username:password@proxy-server:8080 https://api.datadoghq.com/api/v1/validate
   ```

2. **Check Agent logs for auth errors**:
   ```bash
   sudo grep -i "auth\|401\|403" /var/log/datadog/agent.log
   ```

### SSL/TLS Certificate Issues

If certificate validation is failing:

1. **Check system CA certificates**:
   ```bash
   ls -la /etc/ssl/certs/
   ```

2. **Update CA certificates**:
   ```bash
   sudo update-ca-certificates
   ```

3. **Import custom proxy certificate**:
   ```bash
   sudo cp /path/to/proxy-cert.pem /etc/ssl/certs/
   sudo update-ca-certificates
   ```

### Agent Not Sending Data

If Agent is not sending metrics/logs through proxy:

1. **Check Agent status**:
   ```bash
   sudo datadog-agent status
   ```

2. **Verify proxy configuration**:
   ```bash
   sudo grep -A 5 "^proxy:" /etc/datadog-agent/datadog.yaml
   ```

3. **Review recent errors**:
   ```bash
   sudo tail -50 /var/log/datadog/agent.log | grep -i "error\|proxy"
   ```

---

## Best Practices

### Security

Use credentials with limited proxy access:

```yaml
proxy:
  https: http://datadog-user:limited-password@proxy.example.com:8080
```

Use HTTPS for proxy connections:

```yaml
proxy:
  https: https://user:pass@proxy.example.com:8443
```

Store credentials securely:

- Use secret management systems
- Avoid hardcoding in configuration files
- Use environment variables for sensitive data

### Performance

Configure no-proxy for internal hosts to avoid unnecessary proxy hops:

```yaml
proxy:
  no_proxy:
    - internal-api.example.com
    - monitoring-server.local
    - 10.0.0.0/8
```

Use non-exact matching for better performance:

```yaml
no_proxy_nonexact_match: true
```

### Monitoring

Monitor proxy health:

```bash
# Check proxy connectivity regularly
curl -s -x http://proxy-server:8080 https://api.datadoghq.com/api/v1/validate \
  -H "DD-API-KEY: test" -w "HTTP %{http_code}\n"
```

Enable debug logging if needed:

```bash
sudo datadog-agent config --set log_level:debug
```

---

## Related Documentation

- **One-Line Commands**: [Essential Linux Commands](../linux/oneline-commands.md)
- **Proxy Testing**: [Datadog Proxy Testing Guide](./datadog-proxy-testing.md)
- **CentOS Setup**: [Datadog CentOS Setup](../linux/datadog-centos-setup.md)
- **Official Docs**: [Datadog Agent Configuration](https://docs.datadoghq.com/agent/configuration/)
- **Squid Setup**: [Using Squid Proxy](https://docs.datadoghq.com/agent/configuration/proxy_squid/)
- **FIPS Compliance**: [Datadog FIPS Compliance](https://docs.datadoghq.com/agent/configuration/fips-compliance/)
