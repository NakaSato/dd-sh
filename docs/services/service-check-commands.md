---
sidebar_position: 3
sidebar_label: Service Check Commands
description: Comprehensive systemctl commands to check, monitor, and manage services on CentOS
tags: [services, systemctl, linux, monitoring, service-management, troubleshooting]
---

# Service Check Commands for CentOS

Comprehensive guide to checking, monitoring, and managing systemd services on CentOS systems with 33+ commands.

## Basic Service Status Commands

### 1. Check Service Status

```bash
# Check specific service status
sudo systemctl status nginx

# Check multiple services
sudo systemctl status nginx mysql php-fpm

# Check all services
sudo systemctl list-units --type=service

# Check all active services
sudo systemctl list-units --type=service --state=active --no-pager

# Check all running services
sudo systemctl list-units --type=service --state=running --no-pager
```

**Output shows**:
- Service name
- Loaded status
- Active status
- Recent logs

---

### 2. Check Service Enabled Status

```bash
# Check if service is enabled (auto-start on boot)
sudo systemctl is-enabled nginx

# List all enabled services
sudo systemctl list-unit-files --type=service | grep enabled

# List services by enable status
sudo systemctl list-unit-files --type=service --state=enabled --no-pager
```

**Return values**:
- `enabled` - Starts automatically on boot
- `disabled` - Does not start on boot
- `static` - Cannot be enabled/disabled
- `masked` - Service is masked

---

### 3. Check if Service is Running/Stopped

```bash
# Check if service is running
sudo systemctl is-active nginx

# Check if service is enabled
sudo systemctl is-enabled nginx

# Check failed services
sudo systemctl list-units --failed --type=service --no-pager

# Check services in various states
sudo systemctl list-units --type=service --all --state=failed
```

**Return values**:
- `active` - Service is running
- `inactive` - Service is stopped
- `failed` - Service failed to start
- `activating` - Service is starting
- `deactivating` - Service is stopping

---

## Advanced Service Monitoring Commands

### 4. Check Service Resource Usage

```bash
# Show resource usage of specific service
systemctl show -p MemoryCurrent -p CPUUsageNSec -p MainPID nginx

# Monitor service process
ps aux | grep nginx | grep -v grep

# Check memory usage of service
ps aux | grep nginx | awk '{print $2, $3, $4, $11}' | column -t

# Show service process tree
pstree -p $(systemctl show -p MainPID --value nginx)
```

---

### 5. Check Service Dependencies

```bash
# Show what service depends on
sudo systemctl show -p Requires nginx

# Show what depends on this service
sudo systemctl show -p RequiredBy nginx

# Show service wants and wanted-by
sudo systemctl show -p Wants -p WantedBy nginx

# Show all dependencies
sudo systemctl show -p Before -p After nginx
```

---

### 6. Check Service Restart Policy

```bash
# Show restart settings
sudo systemctl show -p Restart -p RestartSec nginx

# Show all properties
sudo systemctl show nginx | grep -E "^(Restart|RestartSec|TimeoutStopSec|TimeoutStartSec)"

# Show service type
sudo systemctl show -p Type nginx
```

---

## Check Specific Common Services

### 7. Check Nginx Service

```bash
# Check Nginx status
sudo systemctl status nginx

# Check Nginx configuration
sudo nginx -t

# Show Nginx master/worker processes
ps aux | grep nginx | grep -v grep

# Check Nginx listening ports
sudo ss -tlnp | grep nginx

# Check Nginx error log
sudo tail -20 /var/log/nginx/error.log

# Check Nginx access log
sudo tail -20 /var/log/nginx/access.log
```

---

### 8. Check MySQL/MariaDB Service

```bash
# Check MySQL status
sudo systemctl status mysql
# or
sudo systemctl status mariadb

# Check MySQL processes
ps aux | grep mysql | grep -v grep

# Check MySQL listening ports
sudo ss -tlnp | grep mysql

# Check MySQL error log
sudo tail -20 /var/log/mysql/error.log

# Check MySQL connection
mysql -u root -p -e "status;"

# Show running MySQL queries
mysql -u root -p -e "SHOW PROCESSLIST;"
```

---

### 9. Check PHP-FPM Service

```bash
# Check PHP-FPM status
sudo systemctl status php-fpm

# Check PHP-FPM version
php-fpm -v

# Check PHP-FPM processes
ps aux | grep php-fpm | grep -v grep

# Check PHP-FPM listening ports
sudo ss -tlnp | grep php-fpm

# Check PHP-FPM configuration
php-fpm -t

# Check PHP-FPM error log
sudo tail -20 /var/log/php-fpm/error.log
```

---

### 10. Check Apache/HTTPD Service

```bash
# Check Apache status
sudo systemctl status apache2
# or for CentOS
sudo systemctl status httpd

# Check Apache configuration
sudo apache2ctl configtest
# or
sudo httpd -t

# Check Apache processes
ps aux | grep apache | grep -v grep

# Check Apache listening ports
sudo ss -tlnp | grep apache

# Check Apache error log
sudo tail -20 /var/log/apache2/error.log
# or
sudo tail -20 /var/log/httpd/error_log
```

---

### 11. Check Redis Service

```bash
# Check Redis status
sudo systemctl status redis

# Check Redis processes
ps aux | grep redis | grep -v grep

# Check Redis listening ports
sudo ss -tlnp | grep redis

# Connect to Redis CLI
redis-cli

# Check Redis info from CLI
redis-cli INFO

# Check Redis memory usage
redis-cli INFO memory
```

---

### 12. Check PostgreSQL Service

```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Check PostgreSQL processes
ps aux | grep postgres | grep -v grep

# Check PostgreSQL listening ports
sudo ss -tlnp | grep postgres

# Check PostgreSQL logs
sudo tail -20 /var/log/postgresql/postgresql.log

# Connect to PostgreSQL
psql -U postgres -l
```

---

### 13. Check SSH Service

```bash
# Check SSH status
sudo systemctl status sshd

# Check SSH processes
ps aux | grep sshd | grep -v grep

# Check SSH listening ports
sudo ss -tlnp | grep sshd

# Check SSH configuration
sudo sshd -t

# Check SSH log
sudo tail -20 /var/log/auth.log
# or
sudo tail -20 /var/log/secure
```

---

## Service Control Commands

### 14. Start/Stop/Restart Services

```bash
# Start service
sudo systemctl start nginx

# Stop service
sudo systemctl stop nginx

# Restart service
sudo systemctl restart nginx

# Reload service configuration (without restart)
sudo systemctl reload nginx

# Enable service (auto-start on boot)
sudo systemctl enable nginx

# Disable service (remove auto-start)
sudo systemctl disable nginx

# Mask service (prevent from starting)
sudo systemctl mask nginx

# Unmask service
sudo systemctl unmask nginx
```

---

### 15. Restart Multiple Services

```bash
# Restart web services
sudo systemctl restart nginx mysql php-fpm

# Restart all modified services
sudo systemctl restart datadog-agent

# Restart in specific order
sudo systemctl restart nginx && sudo systemctl restart php-fpm && sudo systemctl restart mysql
```

---

## Service Logging and Troubleshooting

### 16. Check Service Logs

```bash
# View last 20 lines of service logs
sudo journalctl -u nginx -n 20

# Follow service logs in real-time
sudo journalctl -u nginx -f

# View service logs from specific time
sudo journalctl -u nginx --since "2025-10-23 10:00:00"

# View service errors only
sudo journalctl -u nginx -p err

# View service errors and warnings
sudo journalctl -u nginx -p warn

# View service logs in reverse (newest first)
sudo journalctl -u nginx -r -n 50

# Export service logs to file
sudo journalctl -u nginx > /tmp/nginx_logs.txt
```

---

### 17. Check Service Startup Errors

```bash
# Show service startup status and errors
sudo systemctl status nginx

# Show full journal entry for service
sudo journalctl -u nginx -n 100

# Check if service failed to start
sudo systemctl list-units --failed

# Show detailed error information
sudo journalctl -u nginx -p err --since today

# Show service unit file contents
sudo systemctl cat nginx
```

---

### 18. Check Service Configuration

```bash
# Show service unit file
sudo systemctl cat nginx

# Show service properties
sudo systemctl show nginx

# Show specific properties
sudo systemctl show nginx -p ExecStart -p ExecReload -p ExecStop

# Check service environment variables
sudo systemctl show -p Environment nginx

# Show service working directory
sudo systemctl show -p WorkingDirectory nginx
```

---

## Port and Network Service Checks

### 19. Check Services by Port

```bash
# List all listening ports with services
sudo ss -tlnp

# Show specific port and service
sudo ss -tlnp | grep :80

# Check which service is using specific port
sudo lsof -i :8080

# Show all network connections
sudo netstat -tulnp | grep LISTEN

# Check specific protocol
sudo ss -tcp -listen -process
```

---

### 20. Check UDP Services

```bash
# Show UDP listening ports
sudo ss -ulnp

# Show UDP connections
sudo netstat -ulnp

# Check specific UDP port
sudo ss -u | grep 53
```

---

## Comprehensive Service Monitoring

### 21. Check All Services Summary

```bash
# Show all service units
sudo systemctl list-units --type=service --all

# Show all services with state
sudo systemctl list-units --type=service --all --no-pager | grep -E 'nginx|mysql|php|redis|datadog'

# Count services by state
sudo systemctl list-units --type=service | tail -1

# Show loaded services only
sudo systemctl list-units --type=service --all --state=loaded
```

---

### 22. Check Failed/Problematic Services

```bash
# List all failed services
sudo systemctl list-units --failed --type=service

# Check specific service for errors
sudo systemctl status nginx 2>&1 | grep -i error

# Show services in inactive state
sudo systemctl list-units --type=service --state=inactive

# Show services that failed to load
sudo systemctl list-units --type=service --state=failed
```

---

### 23. Monitor Service Performance

```bash
# Monitor CPU/Memory of service
top -p $(systemctl show -p MainPID --value nginx)

# Show all resource limits
cat /proc/$(systemctl show -p MainPID --value nginx)/limits

# Check file descriptors used by service
ls -la /proc/$(systemctl show -p MainPID --value nginx)/fd | wc -l

# Monitor in real-time
watch -n 1 'systemctl show -p MemoryCurrent nginx'
```

---

## One-Liner Quick Commands

### 24. Check All Web Services Status (One-Liner)

```bash
echo "[NGINX]" && sudo systemctl status nginx -l && echo "" && echo "[MYSQL]" && sudo systemctl status mysql -l && echo "" && echo "[PHP-FPM]" && sudo systemctl status php-fpm -l
```

---

### 25. Check All Listening Services (One-Liner)

```bash
echo "=== LISTENING SERVICES ===" && sudo ss -tlnp 2>/dev/null | grep LISTEN && echo "" && echo "=== BY PORT ===" && sudo ss -tlnp 2>/dev/null | awk 'NR>1 {print $4, $7}' | sort -u
```

---

### 26. Full Service Health Check (One-Liner)

```bash
echo "╔══════════════════════════════════════════════╗" && echo "║     SERVICE HEALTH CHECK REPORT             ║" && echo "╚══════════════════════════════════════════════╝" && echo "" && echo "[ACTIVE SERVICES]" && sudo systemctl list-units --type=service --state=running --no-pager | tail -n +2 | head -20 && echo "" && echo "[FAILED SERVICES]" && sudo systemctl list-units --failed --type=service --no-pager | tail -n +2 || echo "  None" && echo "" && echo "[LISTENING PORTS]" && sudo ss -tlnp 2>/dev/null | tail -20 && echo "" && echo "[DATADOG AGENT]" && sudo systemctl status datadog-agent --no-pager | head -10
```

---

### 27. Check All Services and Recent Errors (One-Liner)

```bash
{ echo "[RUNNING SERVICES]"; sudo systemctl list-units --type=service --state=running --no-pager | grep -E 'nginx|mysql|php|datadog|redis'; echo ""; echo "[SERVICE ERRORS (Last 24h)]"; sudo journalctl --since="24 hours ago" -p err --type=service | head -30; } | tee /tmp/service_check_$(date +%Y%m%d_%H%M%S).log
```

---

### 28. Monitor Service Changes (One-Liner)

```bash
watch -n 5 'echo "=== SERVICE STATUS ===" && sudo systemctl list-units --type=service --state=running | tail -n +2 | wc -l && echo "running services" && echo "" && echo "=== LISTENING PORTS ===" && sudo ss -tlnp 2>/dev/null | tail -20'
```

---

## Service Restart Policies

### 29. Check and Set Restart Policy

```bash
# Check current restart policy
sudo systemctl show -p Restart nginx

# Show restart delay
sudo systemctl show -p RestartSec nginx

# Edit service to change restart policy
sudo systemctl edit nginx

# Add/modify restart policy in service file
# [Service]
# Restart=always
# RestartSec=10s
```

---

### 30. Automatic Service Recovery

```bash
# Check if service auto-restarts
sudo systemctl show -p Restart -p RestartSec nginx

# Show service restart count
sudo journalctl -u nginx | grep "Restart count"

# Check systemd watchdog settings
sudo systemctl show -p WatchdogSec nginx
```

---

## Service Dependency Management

### 31. Check Service Dependencies

```bash
# Show what starts before this service
sudo systemctl show -p Before nginx

# Show what starts after this service
sudo systemctl show -p After nginx

# Show required services
sudo systemctl show -p Requires nginx

# Show required by
sudo systemctl show -p RequiredBy nginx

# Check wants dependencies
sudo systemctl show -p Wants nginx
```

---

### 32. Manage Service Boot Order

```bash
# Show boot sequence
systemd-analyze plot

# Show service startup time
systemd-analyze blame

# Show critical chain
systemd-analyze critical-chain

# Show time spent on services
systemd-analyze verify /etc/systemd/system/nginx.service
```

---

## Comprehensive Monitoring Scripts

### 33. Complete Service Monitoring (One-Liner)

```bash
{ echo "╔════════════════════════════════════════════════════════════╗"; echo "║         COMPLETE SERVICE STATUS REPORT                    ║"; echo "╚════════════════════════════════════════════════════════════╝"; echo ""; echo "[1] RUNNING SERVICES]"; sudo systemctl list-units --type=service --state=running --no-pager | awk 'NR>2 {print "  ✓", $1, $3}' | head -15; echo ""; echo "[2] FAILED SERVICES]"; sudo systemctl list-units --failed --no-pager 2>/dev/null | awk 'NR>2 {print "  ✗", $1}' || echo "  None"; echo ""; echo "[3] LISTENING PORTS]"; sudo ss -tlnp 2>/dev/null | awk 'NR>1 {print "  ", $4, $7}' | head -15; echo ""; echo "[4] TOP CPU SERVICES]"; ps aux --sort=-%cpu | grep -E 'nginx|mysql|php|redis' | head -5 | awk '{print "  ", $1, $3"%", $11}'; echo ""; echo "[5] TOP MEMORY SERVICES]"; ps aux --sort=-%mem | grep -E 'nginx|mysql|php|redis' | head -5 | awk '{print "  ", $1, $4"%", $11}'; echo ""; echo "[6] SERVICE DISK USAGE]"; du -sh /var/log/nginx /var/log/mysql /var/log/php* 2>/dev/null | awk '{print "  ", $2, $1}'; echo ""; echo "╚════════════════════════════════════════════════════════════╝"; } 2>&1 | tee /tmp/service_report_$(date +%Y%m%d_%H%M%S).log
```

---

## Quick Reference Table

| Task | Command |
|------|---------|
| Check service status | `sudo systemctl status nginx` |
| Start service | `sudo systemctl start nginx` |
| Stop service | `sudo systemctl stop nginx` |
| Restart service | `sudo systemctl restart nginx` |
| Enable service | `sudo systemctl enable nginx` |
| Disable service | `sudo systemctl disable nginx` |
| Is service running | `sudo systemctl is-active nginx` |
| Is service enabled | `sudo systemctl is-enabled nginx` |
| View logs | `sudo journalctl -u nginx -f` |
| Check errors | `sudo journalctl -u nginx -p err` |
| List all services | `sudo systemctl list-units --type=service` |
| List running services | `sudo systemctl list-units --type=service --state=running` |
| List failed services | `sudo systemctl list-units --failed` |
| Check listening ports | `sudo ss -tlnp` |
| Check port usage | `sudo lsof -i :8080` |
| Show service file | `sudo systemctl cat nginx` |
| Show service properties | `sudo systemctl show nginx` |
| Reload configuration | `sudo systemctl reload nginx` |
| Enable debug logging | `sudo journalctl -u nginx -p debug` |
| Export logs | `sudo journalctl -u nginx > /tmp/nginx.log` |

---

## Related Documentation

- [One-Line Bash Commands](../linux/oneline-commands.md) - Essential Linux one-liners
- [Datadog CentOS Setup](../linux/datadog-centos-setup.md) - Datadog installation and configuration
- [Datadog Proxy Testing](../datadog/datadog-proxy-testing.md) - Network proxy diagnostics
