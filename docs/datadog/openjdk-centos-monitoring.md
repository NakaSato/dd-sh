---
sidebar_position: 4
sidebar_label: OpenJDK CentOS 8.2 Monitoring
description: Complete guide for monitoring OpenJDK applications on CentOS 8.2 with Datadog agent integration
tags: [openjdk, java, centos, datadog, monitoring, jvm, performance]
---

# OpenJDK CentOS 8.2 Datadog Monitoring

Comprehensive guide for installing, configuring, and monitoring OpenJDK applications on CentOS 8.2 with Datadog agent integration.

## Prerequisites

### System Requirements

```bash
cat /etc/redhat-release
```

```bash
uname -r
```

```bash
free -h
```

```bash
df -h
```

---

## OpenJDK Installation

### 1. Check Available OpenJDK Versions

```bash
dnf list java*openjdk*
```

```bash
dnf search openjdk
```

```bash
alternatives --display java
```

---

### 2. Install OpenJDK 8

```bash
sudo dnf install java-1.8.0-openjdk
```

```bash
sudo dnf install java-1.8.0-openjdk-devel
```

```bash
sudo dnf install java-1.8.0-openjdk-headless
```

---

### 3. Install OpenJDK 11

```bash
sudo dnf install java-11-openjdk
```

```bash
sudo dnf install java-11-openjdk-devel
```

```bash
sudo dnf install java-11-openjdk-headless
```

---

### 4. Install OpenJDK 17

```bash
sudo dnf install java-17-openjdk
```

```bash
sudo dnf install java-17-openjdk-devel
```

```bash
sudo dnf install java-17-openjdk-headless
```

---

## Java Environment Configuration

### 5. Set Default Java Version

```bash
sudo alternatives --config java
```

```bash
sudo alternatives --config javac
```

```bash
sudo alternatives --install /usr/bin/java java /usr/lib/jvm/java-11-openjdk/bin/java 1
```

---

### 6. Configure JAVA_HOME

```bash
echo 'export JAVA_HOME=/usr/lib/jvm/java-11-openjdk' >> ~/.bashrc
```

```bash
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.bashrc
```

```bash
source ~/.bashrc
```

```bash
echo $JAVA_HOME
```

---

### 7. Verify Java Installation

```bash
java -version
```

```bash
javac -version
```

```bash
which java
```

```bash
readlink -f $(which java)
```

---

## JVM Monitoring Setup

### 8. Enable JMX for Monitoring

```bash
java -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=9999 -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false -jar your-app.jar
```

```bash
java -Dcom.sun.management.jmxremote.port=9999 -Dcom.sun.management.jmxremote.rmi.port=9999 -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false -Djava.rmi.server.hostname=localhost -jar your-app.jar
```

---

### 9. JVM Memory Configuration

```bash
java -Xms512m -Xmx2g -XX:+UseG1GC -jar your-app.jar
```

```bash
java -Xms1g -Xmx4g -XX:+UseParallelGC -XX:+UseParallelOldGC -jar your-app.jar
```

```bash
java -XX:+PrintGCDetails -XX:+PrintGCTimeStamps -Xloggc:/var/log/gc.log -jar your-app.jar
```

---

## Datadog Agent Configuration

### 10. Install Datadog Agent

```bash
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=your_api_key DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"
```

```bash
sudo systemctl enable datadog-agent
```

```bash
sudo systemctl start datadog-agent
```

```bash
sudo systemctl status datadog-agent
```

---

### 11. Configure JMX Integration

```bash
sudo cp /etc/datadog-agent/conf.d/jmx.d/conf.yaml.example /etc/datadog-agent/conf.d/jmx.d/conf.yaml
```

```bash
sudo vim /etc/datadog-agent/conf.d/jmx.d/conf.yaml
```

**JMX Configuration Content:**
```yaml
init_config:
  is_jmx: true
  collect_default_metrics: true

instances:
  - host: localhost
    port: 9999
    tags:
      - env:production
      - service:java-app
```

---

### 12. Configure Java Integration

```bash
sudo cp /etc/datadog-agent/conf.d/java.d/conf.yaml.example /etc/datadog-agent/conf.d/java.d/conf.yaml
```

```bash
sudo vim /etc/datadog-agent/conf.d/java.d/conf.yaml
```

**Java Integration Configuration:**
```yaml
init_config:

instances:
  - host: localhost
    port: 9999
    name: java-app
    tags:
      - env:production
      - java_version:11
```

---

### 13. Restart Datadog Agent

```bash
sudo systemctl restart datadog-agent
```

```bash
sudo systemctl status datadog-agent
```

```bash
sudo datadog-agent status
```

---

## Java Application Monitoring

### 14. Check Java Processes

```bash
ps aux | grep java
```

```bash
jps -v
```

```bash
jps -l
```

```bash
pgrep -f java
```

---

### 15. Monitor JVM Memory Usage

```bash
jstat -gc $(pgrep java) 1s
```

```bash
jstat -gcutil $(pgrep java) 5s
```

```bash
jmap -heap $(pgrep java)
```

```bash
jmap -histo $(pgrep java) | head -20
```

---

### 16. Monitor JVM Thread Usage

```bash
jstack $(pgrep java)
```

```bash
jstack $(pgrep java) | grep "java.lang.Thread.State" | sort | uniq -c
```

```bash
top -H -p $(pgrep java)
```

---

### 17. JVM Performance Analysis

```bash
jstat -compiler $(pgrep java)
```

```bash
jstat -class $(pgrep java)
```

```bash
jcmd $(pgrep java) VM.uptime
```

```bash
jcmd $(pgrep java) VM.system_properties
```

---

## Log Configuration

### 18. Configure Java Application Logging

```bash
java -Djava.util.logging.config.file=logging.properties -jar your-app.jar
```

```bash
java -Dlogback.configurationFile=logback.xml -jar your-app.jar
```

```bash
java -Dlog4j.configuration=log4j.properties -jar your-app.jar
```

---

### 19. Datadog Log Collection

```bash
sudo vim /etc/datadog-agent/conf.d/java.d/conf.yaml
```

**Add logging configuration:**
```yaml
logs:
  - type: file
    path: "/var/log/java/application.log"
    service: "java-app"
    source: "java"
    sourcecategory: "sourcecode"
    tags:
      - env:production
```

---

### 20. Enable Log Collection

```bash
sudo vim /etc/datadog-agent/datadog.yaml
```

**Enable logs:**
```yaml
logs_enabled: true
```

```bash
sudo systemctl restart datadog-agent
```

---

## Performance Monitoring

### 21. CPU and Memory Monitoring

```bash
top -p $(pgrep java)
```

```bash
htop -p $(pgrep java)
```

```bash
pidstat -p $(pgrep java) 1
```

```bash
iostat -x 1
```

---

### 22. Network Monitoring

```bash
ss -tulnp | grep java
```

```bash
netstat -tulnp | grep java
```

```bash
lsof -i -P | grep java
```

```bash
tcpdump -i any port 8080
```

---

### 23. File Descriptor Monitoring

```bash
lsof -p $(pgrep java) | wc -l
```

```bash
cat /proc/$(pgrep java)/limits | grep "Max open files"
```

```bash
ls -la /proc/$(pgrep java)/fd | wc -l
```

---

## Health Checks

### 24. Application Health Checks

```bash
curl -f http://localhost:8080/health
```

```bash
curl -s http://localhost:8080/actuator/health | jq
```

```bash
curl -s http://localhost:8080/metrics | grep jvm
```

```bash
wget --spider -q http://localhost:8080/health && echo "OK" || echo "FAIL"
```

---

### 25. JMX Health Monitoring

```bash
jconsole localhost:9999
```

```bash
jcmd $(pgrep java) GC.run
```

```bash
jcmd $(pgrep java) VM.classloader_stats
```

```bash
jcmd $(pgrep java) Thread.print
```

---

## Troubleshooting

### 26. Common Java Issues

```bash
jcmd $(pgrep java) VM.flags
```

```bash
jinfo $(pgrep java)
```

```bash
jmap -dump:format=b,file=/tmp/heapdump.hprof $(pgrep java)
```

```bash
kill -3 $(pgrep java)
```

---

### 27. Datadog Agent Debugging

```bash
sudo datadog-agent status
```

```bash
sudo datadog-agent check jmx
```

```bash
sudo datadog-agent check java
```

```bash
sudo tail -f /var/log/datadog/agent.log
```

---

### 28. JMX Connection Testing

```bash
telnet localhost 9999
```

```bash
nc -zv localhost 9999
```

```bash
jcmd $(pgrep java) ManagementAgent.status
```

---

## Security Configuration

### 29. JMX Security Setup

```bash
java -Dcom.sun.management.jmxremote.password.file=/path/to/jmxremote.password -Dcom.sun.management.jmxremote.access.file=/path/to/jmxremote.access -jar your-app.jar
```

**Create password file:**
```bash
echo "monitor readonly" > /etc/java/jmxremote.password
```

```bash
echo "control readwrite" >> /etc/java/jmxremote.password
```

```bash
chmod 600 /etc/java/jmxremote.password
```

---

### 30. Firewall Configuration

```bash
sudo firewall-cmd --permanent --add-port=9999/tcp
```

```bash
sudo firewall-cmd --permanent --add-port=8080/tcp
```

```bash
sudo firewall-cmd --reload
```

```bash
sudo firewall-cmd --list-ports
```

---

## Automated Monitoring Scripts

### 31. Java Process Monitor Script

```bash
#!/bin/bash
# java_monitor.sh
JAVA_PID=$(pgrep java)
if [ -z "$JAVA_PID" ]; then
  echo "Java process not running"
  exit 1
fi

echo "Java PID: $JAVA_PID"
echo "Memory Usage:"
jstat -gc $JAVA_PID 1 1
echo "Thread Count:"
jstack $JAVA_PID | grep "java.lang.Thread.State" | wc -l
```

---

### 32. Health Check Script

```bash
#!/bin/bash
# health_check.sh
APP_URL="http://localhost:8080/health"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $APP_URL)

if [ $RESPONSE -eq 200 ]; then
  echo "Application healthy"
  exit 0
else
  echo "Application unhealthy: HTTP $RESPONSE"
  exit 1
fi
```

---

### 33. GC Log Analysis

```bash
tail -f /var/log/gc.log | grep "Full GC"
```

```bash
awk '/Full GC/ {print $1, $2, $NF}' /var/log/gc.log
```

```bash
grep "Total time for which application threads were stopped" /var/log/gc.log
```

---

## Performance Tuning

### 34. JVM Tuning Parameters

```bash
java -XX:+UseG1GC -XX:MaxGCPauseMillis=100 -XX:G1HeapRegionSize=16m -jar your-app.jar
```

```bash
java -XX:+UseConcMarkSweepGC -XX:+CMSParallelRemarkEnabled -XX:+UseCMSInitiatingOccupancyOnly -XX:CMSInitiatingOccupancyFraction=70 -jar your-app.jar
```

```bash
java -XX:+UnlockExperimentalVMOptions -XX:+UseZGC -jar your-app.jar
```

---

### 35. Memory Optimization

```bash
java -XX:NewRatio=3 -XX:SurvivorRatio=8 -jar your-app.jar
```

```bash
java -XX:+UseStringDeduplication -jar your-app.jar
```

```bash
java -XX:+UseCompressedOops -XX:+UseCompressedClassPointers -jar your-app.jar
```

---

## Monitoring Dashboard Setup

### 36. Custom Metrics Collection

**Create custom metrics configuration:**
```yaml
# /etc/datadog-agent/conf.d/jmx.d/conf.yaml
init_config:
  is_jmx: true

instances:
  - host: localhost
    port: 9999
    conf:
      - include:
          domain: java.lang
          type: Memory
          attribute:
            HeapMemoryUsage.used:
              alias: jvm.heap_memory.used
              metric_type: gauge
            HeapMemoryUsage.max:
              alias: jvm.heap_memory.max
              metric_type: gauge
```

---

### 37. Application Performance Monitoring

```bash
java -javaagent:/opt/datadog/dd-java-agent.jar -jar your-app.jar
```

```bash
export DD_SERVICE_NAME="java-app"
```

```bash
export DD_ENV="production"
```

```bash
export DD_VERSION="1.0.0"
```

---

## Quick Reference Commands

### 38. Essential Java Commands

```bash
java -version
```

```bash
ps aux | grep java
```

```bash
jps -v
```

```bash
jstat -gc $(pgrep java)
```

```bash
jstack $(pgrep java)
```

```bash
jmap -heap $(pgrep java)
```

```bash
sudo systemctl status datadog-agent
```

```bash
sudo datadog-agent status
```

```bash
curl http://localhost:8080/health
```

```bash
telnet localhost 9999
```

---

## Quick Reference Table

| Task | Command |
|------|---------|
| Check Java version | `java -version` |
| List Java processes | `jps -v` |
| Monitor GC | `jstat -gc $(pgrep java)` |
| Thread dump | `jstack $(pgrep java)` |
| Heap dump | `jmap -dump:file=heap.hprof $(pgrep java)` |
| Datadog status | `sudo datadog-agent status` |
| Check JMX | `telnet localhost 9999` |
| Application health | `curl http://localhost:8080/health` |
| GC logs | `tail -f /var/log/gc.log` |
| Memory usage | `jmap -heap $(pgrep java)` |
| JVM flags | `jcmd $(pgrep java) VM.flags` |
| Thread analysis | `jstack $(pgrep java) \| grep State \| sort \| uniq -c` |

---

## Related Documentation

- [Datadog Agent Setup](../linux/datadog-centos-setup.md) - Datadog agent installation
- [Service Management](../services/service-check-commands.md) - Systemctl service commands
- [Proxy Configuration](./agent-proxy-configuration.md) - Datadog proxy setup
- [Proxy Testing](./datadog-proxy-testing.md) - Network diagnostics