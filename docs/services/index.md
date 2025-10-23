---
sidebar_position: 2
sidebar_label: Services
---

# Service Management Documentation

Comprehensive guide to checking, monitoring, and managing systemd services on CentOS systems using `systemctl` and `journalctl`.

## Common Commands

### Status Checking

Check service status:
```bash
sudo systemctl status nginx
```

Check if service is running:
```bash
sudo systemctl is-active nginx
```

Check if service auto-starts on boot:
```bash
sudo systemctl is-enabled nginx
```

### Control Operations

Start service:
```bash
sudo systemctl start nginx
```

Stop service:
```bash
sudo systemctl stop nginx
```

Restart service:
```bash
sudo systemctl restart nginx
```

Reload configuration without restarting:
```bash
sudo systemctl reload nginx
```

### Enable/Disable

Enable service to auto-start on boot:
```bash
sudo systemctl enable nginx
```

Disable service auto-start:
```bash
sudo systemctl disable nginx
```

Prevent service from being started:
```bash
sudo systemctl mask nginx
```

Allow service to be started:
```bash
sudo systemctl unmask nginx
```

### Logging

Follow service logs in real-time:
```bash
sudo journalctl -u nginx -f
```

Show last 50 lines of logs:
```bash
sudo journalctl -u nginx -n 50
```

Show error messages only:
```bash
sudo journalctl -u nginx -p err
```

---

## Related Sections

- **Linux Commands**: [One-Line Bash Commands](../linux/oneline-commands.md)
- **Datadog**: [Datadog Setup](../linux/datadog-centos-setup.md)
- **Networking**: [Proxy Testing](../datadog/datadog-proxy-testing.md)
