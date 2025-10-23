---
sidebar_position: 2
sidebar_label: Services
---

# Service Management Documentation

Comprehensive guide to checking, monitoring, and managing systemd services on CentOS systems using `systemctl` and `journalctl`.

## Commands in This Section

### 📊 Service Check Commands
Comprehensive systemctl commands to check, monitor, and manage services with 33+ commands for different scenarios.

**Topics covered:**
- Basic service status checking
- Service enable/disable management
- Advanced service monitoring
- Specific service checks (Nginx, MySQL, PHP-FPM, etc.)
- Service control and restart policies
- Logging and troubleshooting
- Performance monitoring
- Port and network service checks
- Dependency management

**👉 [View Service Check Commands](./service-check-commands.md)**

---

## Service Categories Covered

### Web Servers
- **Nginx** - HTTP reverse proxy and web server
- **Apache/HTTPD** - Traditional web server

### Databases
- **MySQL/MariaDB** - Relational database
- **PostgreSQL** - Advanced relational database
- **Redis** - In-memory data store

### Application Runtime
- **PHP-FPM** - PHP FastCGI Process Manager
- **Node.js** - JavaScript runtime
- **Java** - Enterprise applications

### Infrastructure
- **SSH** - Secure shell service
- **Datadog Agent** - Monitoring agent
- **Custom services** - User-defined services

---

## Common Commands

### Status Checking
```bash
sudo systemctl status nginx              # Check service status
sudo systemctl is-active nginx           # Check if running
sudo systemctl is-enabled nginx          # Check if auto-starts
```

### Control Operations
```bash
sudo systemctl start nginx               # Start service
sudo systemctl stop nginx                # Stop service
sudo systemctl restart nginx             # Restart service
sudo systemctl reload nginx              # Reload config
```

### Enable/Disable
```bash
sudo systemctl enable nginx              # Enable auto-start
sudo systemctl disable nginx             # Disable auto-start
sudo systemctl mask nginx                # Prevent starting
sudo systemctl unmask nginx              # Allow starting
```

### Logging
```bash
sudo journalctl -u nginx -f              # Follow logs
sudo journalctl -u nginx -n 50           # Last 50 lines
sudo journalctl -u nginx -p err          # Errors only
```

---

## Command Statistics

- **Total Service Commands**: 33+
- **Service Types Covered**: 10+
- **One-Liner Checks**: 10+
- **Troubleshooting Procedures**: 5+

---

## Quick Navigation

### By Operation

**Monitoring**
- Service status checking
- Resource usage monitoring
- Port and network checking
- Logging and error tracking

**Management**
- Start/stop/restart services
- Enable/disable auto-start
- Service lifecycle control
- Dependency management

**Troubleshooting**
- Failed services
- Configuration validation
- Performance issues
- Connection problems

---

## Pro Tips

:::tip
- Use `--no-pager` flag to prevent paged output
- Combine multiple checks for comprehensive diagnostics
- Monitor logs while restarting services
- Test configuration with `nginx -t` before reload
- Use `journalctl` for persistent log analysis
:::

---

## Related Sections

- **Linux Commands**: [One-Line Bash Commands](../linux/oneline-commands.md)
- **Datadog**: [Datadog Setup](../linux/datadog-centos-setup.md)
- **Networking**: [Proxy Testing](../datadog/datadog-proxy-testing.md)
