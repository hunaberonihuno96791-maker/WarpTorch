import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: ['intro', 'installation'],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      items: [
        'core-concepts/metrics',
        'core-concepts/energy-conditions',
        'core-concepts/kinematic-scalars',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/metrics',
        'api/solvers',
        'api/analyzers',
      ],
    },
    {
      type: 'category',
      label: 'Tutorials',
      items: [
        'tutorials/alcubierre-simulation',
        'tutorials/lentz-simulation',
        'tutorials/custom-metrics',
      ],
    },
  ],
};

export default sidebars;