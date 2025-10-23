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
sudo systemctl status nginx
```

```bash
sudo systemctl status nginx mysql php-fpm
```

```bash
sudo systemctl list-units --type=service
```

```bash
sudo systemctl list-units --type=service --state=active --no-pager
```

```bash
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
sudo systemctl is-enabled nginx
```

```bash
sudo systemctl list-unit-files --type=service | grep enabled
```

```bash
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
sudo systemctl is-active nginx
```

```bash
sudo systemctl is-enabled nginx
```

```bash
sudo systemctl list-units --failed --type=service --no-pager
```

```bash
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
systemctl show -p MemoryCurrent -p CPUUsageNSec -p MainPID nginx
```

```bash
ps aux | grep nginx | grep -v grep
```

```bash
ps aux | grep nginx | awk '{print $2, $3, $4, $11}' | column -t
```

```bash
pstree -p $(systemctl show -p MainPID --value nginx)
```

---

### 5. Check Service Dependencies

```bash
sudo systemctl show -p Requires nginx
```

```bash
sudo systemctl show -p RequiredBy nginx
```

```bash
sudo systemctl show -p Wants -p WantedBy nginx
```

```bash
sudo systemctl show -p Before -p After nginx
```

---

### 6. Check Service Restart Policy

```bash
sudo systemctl show -p Restart -p RestartSec nginx
```

```bash
sudo systemctl show nginx | grep -E "^(Restart|RestartSec|TimeoutStopSec|TimeoutStartSec)"
```

```bash
sudo systemctl show -p Type nginx
```

---

## Check Specific Common Services

### 7. Check Nginx Service

```bash
sudo systemctl status nginx
```

```bash
sudo nginx -t
```

```bash
ps aux | grep nginx | grep -v grep
```

```bash
sudo ss -tlnp | grep nginx
```

```bash
sudo tail -20 /var/log/nginx/error.log
```

```bash
sudo tail -20 /var/log/nginx/access.log
```

---

### 8. Check MySQL/MariaDB Service

```bash
sudo systemctl status mysql
```

```bash
sudo systemctl status mariadb
```

```bash
ps aux | grep mysql | grep -v grep
```

```bash
sudo ss -tlnp | grep mysql
```

```bash
sudo tail -20 /var/log/mysql/error.log
```

```bash
mysql -u root -p -e "status;"
```

```bash
mysql -u root -p -e "SHOW PROCESSLIST;"
```

---

### 9. Check PHP-FPM Service

```bash
sudo systemctl status php-fpm
```

```bash
php-fpm -v
```

```bash
ps aux | grep php-fpm | grep -v grep
```

```bash
sudo ss -tlnp | grep php-fpm
```

```bash
php-fpm -t
```

```bash
sudo tail -20 /var/log/php-fpm/error.log
```

---

### 10. Check Apache/HTTPD Service

```bash
sudo systemctl status apache2
```

```bash
sudo systemctl status httpd
```

```bash
sudo apache2ctl configtest
```

```bash
sudo httpd -t
```

```bash
ps aux | grep apache | grep -v grep
```

```bash
sudo ss -tlnp | grep apache
```

```bash
sudo tail -20 /var/log/apache2/error.log
```

```bash
sudo tail -20 /var/log/httpd/error_log
```

---

### 11. Check Redis Service

```bash
sudo systemctl status redis
```

```bash
ps aux | grep redis | grep -v grep
```

```bash
sudo ss -tlnp | grep redis
```

```bash
redis-cli
```

```bash
redis-cli INFO
```

```bash
redis-cli INFO memory
```

---

### 12. Check PostgreSQL Service

```bash
sudo systemctl status postgresql
```

```bash
ps aux | grep postgres | grep -v grep
```

```bash
sudo ss -tlnp | grep postgres
```

```bash
sudo tail -20 /var/log/postgresql/postgresql.log
```

```bash
psql -U postgres -l
```

---

### 13. Check SSH Service

```bash
sudo systemctl status sshd
```

```bash
ps aux | grep sshd | grep -v grep
```

```bash
sudo ss -tlnp | grep sshd
```

```bash
sudo sshd -t
```

```bash
sudo tail -20 /var/log/auth.log
```

```bash
sudo tail -20 /var/log/secure
```

---

## Service Control Commands

### 14. Start/Stop/Restart Services

```bash
sudo systemctl start nginx
```

```bash
sudo systemctl stop nginx
```

```bash
sudo systemctl restart nginx
```

```bash
sudo systemctl reload nginx
```

```bash
sudo systemctl enable nginx
```

```bash
sudo systemctl disable nginx
```

```bash
sudo systemctl mask nginx
```

```bash
sudo systemctl unmask nginx
```

---

### 15. Restart Multiple Services

```bash
sudo systemctl restart nginx mysql php-fpm
```

```bash
sudo systemctl restart datadog-agent
```

```bash
sudo systemctl restart nginx && sudo systemctl restart php-fpm && sudo systemctl restart mysql
```

---

## Service Logging and Troubleshooting

### 16. Check Service Logs

```bash
sudo journalctl -u nginx -n 20
```

```bash
sudo journalctl -u nginx -f
```

```bash
sudo journalctl -u nginx --since "2025-10-23 10:00:00"
```

```bash
sudo journalctl -u nginx -p err
```

```bash
sudo journalctl -u nginx -p warn
```

```bash
sudo journalctl -u nginx -r -n 50
```

```bash
sudo journalctl -u nginx > /tmp/nginx_logs.txt
```

---

### 17. Check Service Startup Errors

```bash
sudo systemctl status nginx
```

```bash
sudo journalctl -u nginx -n 100
```

```bash
sudo systemctl list-units --failed
```

```bash
sudo journalctl -u nginx -p err --since today
```

```bash
sudo systemctl cat nginx
```

---

### 18. Check Service Configuration

```bash
sudo systemctl cat nginx
```

```bash
sudo systemctl show nginx
```

```bash
sudo systemctl show nginx -p ExecStart -p ExecReload -p ExecStop
```

```bash
sudo systemctl show -p Environment nginx
```

```bash
sudo systemctl show -p WorkingDirectory nginx
```

---

## Port and Network Service Checks

### 19. Check Services by Port

```bash
sudo ss -tlnp
```

```bash
sudo ss -tlnp | grep :80
```

```bash
sudo lsof -i :8080
```

```bash
sudo netstat -tulnp | grep LISTEN
```

```bash
sudo ss -tcp -listen -process
```

---

### 20. Check UDP Services

```bash
sudo ss -ulnp
```

```bash
sudo netstat -ulnp
```

```bash
sudo ss -u | grep 53
```

---

## Comprehensive Service Monitoring

### 21. Check All Services Summary

```bash
sudo systemctl list-units --type=service --all
```

```bash
sudo systemctl list-units --type=service --all --no-pager | grep -E 'nginx|mysql|php|redis|datadog'
```

```bash
sudo systemctl list-units --type=service | tail -1
```

```bash
sudo systemctl list-units --type=service --all --state=loaded
```

---

### 22. Check Failed/Problematic Services

```bash
sudo systemctl list-units --failed --type=service
```

```bash
sudo systemctl status nginx 2>&1 | grep -i error
```

```bash
sudo systemctl list-units --type=service --state=inactive
```

```bash
sudo systemctl list-units --type=service --state=failed
```

---

### 23. Monitor Service Performance

```bash
top -p $(systemctl show -p MainPID --value nginx)
```

```bash
cat /proc/$(systemctl show -p MainPID --value nginx)/limits
```

```bash
ls -la /proc/$(systemctl show -p MainPID --value nginx)/fd | wc -l
```

```bash
watch -n 1 'systemctl show -p MemoryCurrent nginx'
```

---

## Service Restart Policies

### 29. Check and Set Restart Policy

```bash
sudo systemctl show -p Restart nginx
```

```bash
sudo systemctl show -p RestartSec nginx
```

```bash
sudo systemctl edit nginx
```

```bash
# [Service]
# Restart=always
# RestartSec=10s
```

---

### 30. Automatic Service Recovery

```bash
sudo systemctl show -p Restart -p RestartSec nginx
```

```bash
sudo journalctl -u nginx | grep "Restart count"
```

```bash
sudo systemctl show -p WatchdogSec nginx
```

---

## Service Dependency Management

### 31. Check Service Dependencies

```bash
sudo systemctl show -p Before nginx
```

```bash
sudo systemctl show -p After nginx
```

```bash
sudo systemctl show -p Requires nginx
```

```bash
sudo systemctl show -p RequiredBy nginx
```

```bash
sudo systemctl show -p Wants nginx
```

---

### 32. Manage Service Boot Order

```bash
systemd-analyze plot
```

```bash
systemd-analyze blame
```

```bash
systemd-analyze critical-chain
```

```bash
systemd-analyze verify /etc/systemd/system/nginx.service
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
