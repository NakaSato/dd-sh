import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Linux Commands',
      collapsed: false,
      items: [
        'linux/index',
        'linux/oneline-commands',
        'linux/datadog-centos-setup',
      ],
    },
    {
      type: 'category',
      label: 'Windows & PowerShell',
      collapsed: false,
      items: [
        'windows/index',
        'windows/datadog-windows-setup',
        'windows/powershell-commands',
        'windows/windows-service-management',
      ],
    },
    {
      type: 'category',
      label: 'Services Management',
      collapsed: false,
      items: [
        'services/index',
        'services/service-check-commands',
      ],
    },
    {
      type: 'category',
      label: 'Datadog Integration',
      collapsed: false,
      items: [
        'datadog/index',
        'datadog/dynatrace-to-datadog-migration',
        'datadog/agent-proxy-configuration',
        'datadog/openjdk-centos-monitoring',
        'datadog/datadog-proxy-testing',
        'datadog/ssl-certificate-configuration',
      ],
    },
  ],
};

export default sidebars;
