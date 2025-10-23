import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', 'b2f'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '182'),
    exact: true
  },
  {
    path: '/blog/authors',
    component: ComponentCreator('/blog/authors', '0b7'),
    exact: true
  },
  {
    path: '/blog/authors/all-sebastien-lorber-articles',
    component: ComponentCreator('/blog/authors/all-sebastien-lorber-articles', '4a1'),
    exact: true
  },
  {
    path: '/blog/authors/yangshun',
    component: ComponentCreator('/blog/authors/yangshun', 'a68'),
    exact: true
  },
  {
    path: '/blog/first-blog-post',
    component: ComponentCreator('/blog/first-blog-post', '89a'),
    exact: true
  },
  {
    path: '/blog/long-blog-post',
    component: ComponentCreator('/blog/long-blog-post', '9ad'),
    exact: true
  },
  {
    path: '/blog/mdx-blog-post',
    component: ComponentCreator('/blog/mdx-blog-post', 'e9f'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '287'),
    exact: true
  },
  {
    path: '/blog/tags/docusaurus',
    component: ComponentCreator('/blog/tags/docusaurus', '704'),
    exact: true
  },
  {
    path: '/blog/tags/facebook',
    component: ComponentCreator('/blog/tags/facebook', '858'),
    exact: true
  },
  {
    path: '/blog/tags/hello',
    component: ComponentCreator('/blog/tags/hello', '299'),
    exact: true
  },
  {
    path: '/blog/tags/hola',
    component: ComponentCreator('/blog/tags/hola', '00d'),
    exact: true
  },
  {
    path: '/blog/welcome',
    component: ComponentCreator('/blog/welcome', 'd2b'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '3d7'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '3d0'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '5c1'),
        routes: [
          {
            path: '/docs/tags',
            component: ComponentCreator('/docs/tags', 'fce'),
            exact: true
          },
          {
            path: '/docs/tags/datadog',
            component: ComponentCreator('/docs/tags/datadog', '1eb'),
            exact: true
          },
          {
            path: '/docs/tags/diagnostics',
            component: ComponentCreator('/docs/tags/diagnostics', '849'),
            exact: true
          },
          {
            path: '/docs/tags/linux',
            component: ComponentCreator('/docs/tags/linux', '845'),
            exact: true
          },
          {
            path: '/docs/tags/monitoring',
            component: ComponentCreator('/docs/tags/monitoring', '833'),
            exact: true
          },
          {
            path: '/docs/tags/networking',
            component: ComponentCreator('/docs/tags/networking', '49a'),
            exact: true
          },
          {
            path: '/docs/tags/proxy',
            component: ComponentCreator('/docs/tags/proxy', 'd00'),
            exact: true
          },
          {
            path: '/docs/tags/service-management',
            component: ComponentCreator('/docs/tags/service-management', '792'),
            exact: true
          },
          {
            path: '/docs/tags/services',
            component: ComponentCreator('/docs/tags/services', 'e32'),
            exact: true
          },
          {
            path: '/docs/tags/systemctl',
            component: ComponentCreator('/docs/tags/systemctl', '47b'),
            exact: true
          },
          {
            path: '/docs/tags/testing',
            component: ComponentCreator('/docs/tags/testing', 'd75'),
            exact: true
          },
          {
            path: '/docs/tags/troubleshooting',
            component: ComponentCreator('/docs/tags/troubleshooting', '52e'),
            exact: true
          },
          {
            path: '/docs',
            component: ComponentCreator('/docs', '3dc'),
            routes: [
              {
                path: '/docs/datadog/',
                component: ComponentCreator('/docs/datadog/', '29d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/datadog/datadog-proxy-testing',
                component: ComponentCreator('/docs/datadog/datadog-proxy-testing', 'd36'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/datadog/ssl-certificate-configuration',
                component: ComponentCreator('/docs/datadog/ssl-certificate-configuration', 'eed'),
                exact: true
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '61d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/linux/',
                component: ComponentCreator('/docs/linux/', '243'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/linux/datadog-centos-setup',
                component: ComponentCreator('/docs/linux/datadog-centos-setup', '072'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/linux/oneline-commands',
                component: ComponentCreator('/docs/linux/oneline-commands', '9c1'),
                exact: true
              },
              {
                path: '/docs/services/',
                component: ComponentCreator('/docs/services/', '12e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/services/service-check-commands',
                component: ComponentCreator('/docs/services/service-check-commands', 'ee5'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
