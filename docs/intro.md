---
sidebar_position: 0
---

# 🚀 DevOps Bash Commands

Welcome to the comprehensive DevOps documentation portal! This site contains 100+ essential Linux commands, Datadog integration guides, and service management procedures for CentOS/RHEL systems.

## 📚 Documentation Overview

### 🐧 [Linux Commands](./docs/linux/)
Essential bash one-liners and advanced system diagnostics for DevOps professionals.
- **50+ one-liner commands** for file management, backup, and monitoring
- **Advanced diagnostics** with color output and automated logging
- **Datadog integration** with 50+ setup and configuration commands
- **Environment variable** management and API key security

**Popular sections:**
- One-line bash commands
- Datadog Agent setup for CentOS
- Application process monitoring

### 🔧 [Service Management](./docs/services/)
Complete guide to systemd service management using `systemctl` and `journalctl`.
- **33+ systemctl commands** for all service operations
- **Specific service guides** (Nginx, MySQL, PHP-FPM, Redis, PostgreSQL, SSH)
- **Troubleshooting procedures** for failed services
- **Performance monitoring** of running services

**Popular sections:**
- Service status and control
- Log monitoring and analysis
- Port and network checking
- Dependency management

### 📊 [Datadog Monitoring](./docs/datadog/)
Enterprise-grade monitoring setup and network connectivity testing.
- **25+ network proxy testing** commands
- **Connectivity verification** for all Datadog endpoints
- **SSL/TLS certificate validation**
- **Performance and load testing** procedures

**Popular sections:**
- Datadog proxy configuration
- API endpoint testing
- Proxy troubleshooting
- Performance diagnostics

---

## 🎯 Quick Start

### Find Commands by Task

**System Monitoring**
- Check system health: `one-line-commands#command-6`
- Monitor services: `service-check-commands#command-21`
- Datadog status: `datadog-centos-setup#command-22`

**File Management**
- Find large files: `one-line-commands#command-1`
- Search and replace: `one-line-commands#command-2`
- Create backups: `one-line-commands#command-3`

**Network & Proxy**
- Test DNS: `datadog-proxy-testing#command-2`
- Check port connectivity: `datadog-proxy-testing#command-3`
- Full proxy diagnostics: `datadog-proxy-testing#command-18`

**Datadog Setup**
- Install agent: `datadog-centos-setup#command-1`
- Configure logging: `datadog-centos-setup#command-6`
- Run diagnostics: `datadog-centos-setup#command-22`

---

## 📊 Command Statistics

| Category | Count | Type |
|----------|-------|------|
| Linux One-Liners | 50+ | Bash |
| Datadog Setup | 50+ | Datadog CLI |
| Service Management | 33+ | systemctl |
| Proxy Testing | 25+ | Network |
| **Total** | **158+** | **Mixed** |

---

## 🛠️ Key Features

✅ **Production-Ready**: All commands tested in CentOS/RHEL environments  
✅ **Complete Examples**: Include explanations and use cases  
✅ **Error Handling**: Fallback commands for different system configurations  
✅ **Real-World Scenarios**: Actual DevOps workflows included  
✅ **Searchable**: Full-text search across all commands  
✅ **Well-Organized**: Logical grouping by functionality  

---

## 🔍 Search the Documentation

Use the search bar at the top to find commands by:
- Function: "find files", "check status", "restart service"
- Application: "nginx", "mysql", "php", "datadog"
- Technology: "systemctl", "curl", "ssl", "proxy"
- Keywords: "error", "log", "monitoring", "connectivity"

---

## 📋 Command Format

Each command includes:

1. **Command code** - Copy-paste ready bash command
2. **Explanation** - What each flag and parameter does
3. **Use cases** - Real-world scenarios
4. **Variations** - Alternative approaches and fallbacks
5. **Output examples** - What to expect

Example:
```bash
# Find all log files modified in last 24 hours
find /var/log -type f -name "*.log" -mtime -1 2>/dev/null

# Breakdown:
# find /var/log              - Search in logs directory
# -type f                    - Files only
# -name "*.log"              - Matching pattern
# -mtime -1                  - Modified in last 1 day
# 2>/dev/null                - Suppress permission errors
```

---

## 🚀 Getting Started

### First Time Users
1. Browse the **Linux Commands** section
2. Start with **One-Line Bash Commands**
3. Try the **System Diagnostics** examples
4. Move to service and Datadog topics as needed

### Experienced DevOps
- Jump to **Advanced Diagnostics** for powerful one-liners
- Use **Service Management** for complete service control
- Reference **Proxy Testing** for network diagnostics

### Troubleshooting
- Start with **Quick Reference Tables** at the end of each section
- Check **Troubleshooting Commands** for your specific issue
- Review **Related Documentation** for context

---

## 💡 Pro Tips

:::tip Best Practices
1. **Test First**: Always test commands in development before production
2. **Use Sudo Carefully**: Understand which commands need elevated privileges
3. **Read Explanations**: Understand what each command does before running
4. **Check Timeouts**: Some commands include timeout protection
5. **Monitor Output**: Watch command output for unexpected results
6. **Keep Logs**: Enable logging for troubleshooting later
7. **Document Changes**: Record configuration modifications
8. **Secure Keys**: Never commit API keys to version control
9. **Set Alerts**: Use proxy and connectivity checks for monitoring
10. **Stay Updated**: Refer to official documentation for latest versions
:::

---

## 📞 Common Issues

### Command not found
- Verify the command is installed: `which nginx`
- Check if you need `sudo`: Try `sudo systemctl status nginx`
- Check syntax: Copy the exact command from the docs

### Permission denied
- Most system commands require `sudo`
- Check user permissions: `sudo -l`
- Consider running as service user for apps

### Timeout issues
- Check network connectivity: `ping 8.8.8.8`
- Verify proxy settings: `echo $HTTP_PROXY`
- Increase timeout: `curl -m 30 ...`

### Connection refused
- Verify service is running: `sudo systemctl status nginx`
- Check port is listening: `sudo ss -tlnp | grep 8080`
- Check firewall rules: `sudo firewall-cmd --list-all`

---

## 🔗 External Resources

- [Datadog Official Docs](https://docs.datadoghq.com/)
- [systemd Documentation](https://systemd.io/)
- [Bash Reference Manual](https://www.gnu.org/software/bash/manual/)
- [CentOS Documentation](https://docs.centos.org/)

---

## 📝 Navigation

**Browse by Category:**
- **Linux** - System administration and one-liners
- **Services** - Systemd service management
- **Datadog** - Monitoring and proxy testing

**Quick Links:**
- [One-Line Bash Commands](./linux/oneline-commands.md)
- [Datadog Setup](./linux/datadog-centos-setup.md)
- [Service Management](./services/service-check-commands.md)
- [Proxy Testing](./datadog/datadog-proxy-testing.md)

---

**Last Updated**: October 23, 2025  
**Total Commands**: 158+  
**Platforms**: CentOS 7/8/9, RHEL 7/8/9  
**Status**: ✅ Production Ready
