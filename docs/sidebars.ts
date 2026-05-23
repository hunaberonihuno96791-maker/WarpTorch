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
      label: 'Metrics Catalog',
      items: [
        'metrics/alcubierre',
        'metrics/lentz',
        'metrics/schwarzschild',
        'metrics/vandenbroeck',
        'metrics/minkowski',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      items: [
        'core-concepts/metrics',
        'core-concepts/finite-difference',
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