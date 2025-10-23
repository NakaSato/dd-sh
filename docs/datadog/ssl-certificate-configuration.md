---
sidebar_position: 3
sidebar_label: "SSL Certificate Configuration"
---

# Configuring Datadog Agent with Internal Root CA Certificates

You're on the right track; this is the best and most secure way to solve it.

Here are the detailed steps to configure the Datadog agent to trust your company's internal root CA certificate.

## 1. Get Your Company's Root CA Certificate

First, you need the public certificate file for your company's internal root CA.

* This file is usually a `.pem` or `.crt` file (e.g., `company-ca.pem`).
* You will need to get this from your **IT security** or **Network team**. Ask them for the "root CA certificate used for SSL inspection."

## 2. Copy the Certificate to the Host

Place this certificate file onto the server (or inside the container) where the Datadog agent is running.

For example, you might copy it to:

* `/etc/datadog-agent/certs/company-ca.pem`
* `/opt/datadog-agent/etc/company-ca.crt`

Make sure the `dd-agent` user has permission to read this file. You can run `chmod 644 /path/to/your/company-ca.pem` to be safe.

## 3. Edit `datadog.yaml`

Now, you need to tell the agent to use this certificate.

1. Find your `datadog.yaml` configuration file.

   * **Linux:** `/etc/datadog-agent/datadog.yaml`
   * **Windows:** `C:\ProgramData\Datadog\datadog.yaml`
   * **Docker:** You'll pass this as an environment variable or mount a custom `datadog.yaml`.
   * **Kubernetes (Helm):** You'll add this to your `values.yaml` file.

2. Add the `ssl_cert_file` setting, pointing to the path from Step 2.

   ```yaml
   # datadog.yaml

   # ... other configurations ...

   # --- SSL ---
   # Path to a file containing a PEM-formatted certificate
   ssl_cert_file: /etc/datadog-agent/certs/company-ca.pem

   # --- OR ---
   # If your team gave you a directory of certs, you can use this instead:
   # ssl_cert_dir: /etc/ssl/certs/
   ```

   * **For Docker:** Set the environment variable `DD_SSL_CERT_FILE=/path/inside/container/company-ca.pem`.
   * **For Kubernetes (Helm):** Add this to your `values.yaml`:
     ```yaml
     datadog:
       # ...
       ssl_cert_file: /path/inside/pod/company-ca.pem
     ```
     You'll also need to mount this certificate file into the pod using a secret or configmap.

## 4. Restart the Datadog Agent

For the changes to take effect, you must restart the agent.

* **Linux (systemd):**
  ```bash
  sudo systemctl restart datadog-agent
  ```
* **Linux (init.d):**
  ```bash
  sudo /etc/init.d/datadog-agent restart
  ```
* **Docker/Kubernetes:** Restart the container/pod.

After restarting, check the agent's logs (using `datadog-agent status` or by looking at the logs again). The `x509: certificate signed by unknown authority` errors should be gone, and you'll see messages about "Payloads processed" or "Successfully posted."

## Troubleshooting

### Common Issues

1. **Permission denied errors:**
   ```bash
   sudo chown dd-agent:dd-agent /etc/datadog-agent/certs/company-ca.pem
   sudo chmod 644 /etc/datadog-agent/certs/company-ca.pem
   ```

2. **Certificate format issues:**
   - Ensure the certificate is in PEM format
   - Check that the file contains `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----` headers

3. **Path verification:**
   ```bash
   # Verify the certificate file exists and is readable
   sudo -u dd-agent cat /etc/datadog-agent/certs/company-ca.pem
   ```

### Verification Commands

```bash
# Check agent status
sudo datadog-agent status

# View recent logs
sudo tail -f /var/log/datadog/agent.log

# Test connectivity
curl -v --cacert /etc/datadog-agent/certs/company-ca.pem https://api.datadoghq.com
```

## Docker Example

If you're running Datadog agent in Docker:

```bash
# Create volume for certificates
docker volume create datadog-certs

# Copy certificate to volume
docker run --rm -v datadog-certs:/certs -v /path/to/local/company-ca.pem:/tmp/company-ca.pem alpine cp /tmp/company-ca.pem /certs/

# Run Datadog agent with certificate
docker run -d \
  --name datadog-agent \
  -v datadog-certs:/etc/datadog-agent/certs:ro \
  -e DD_API_KEY=your_api_key \
  -e DD_SSL_CERT_FILE=/etc/datadog-agent/certs/company-ca.pem \
  -e DD_SITE=datadoghq.com \
  datadog/agent:latest
```

## Kubernetes Example

For Kubernetes deployment using Helm:

```yaml
# values.yaml
datadog:
  apiKey: your_api_key
  site: datadoghq.com
  ssl_cert_file: /etc/datadog-agent/certs/company-ca.pem

# Mount certificate as secret
agents:
  volumes:
    - name: datadog-certs
      secret:
        secretName: datadog-ca-cert
  volumeMounts:
    - name: datadog-certs
      mountPath: /etc/datadog-agent/certs
      readOnly: true
```

Create the secret:
```bash
kubectl create secret generic datadog-ca-cert \
  --from-file=company-ca.pem=/path/to/company-ca.pem
```

## Related Documentation

- [Datadog Proxy Testing](./datadog-proxy-testing.md) - Network diagnostics for Datadog
- [Datadog CentOS Setup](../linux/datadog-centos-setup.md) - Basic Datadog installation
- [Service Check Commands](../services/service-check-commands.md) - Agent management commands

---

**Last Updated**: October 23, 2025  
**Related Topics**: SSL, TLS, Certificate Authority, Corporate Networks, Security