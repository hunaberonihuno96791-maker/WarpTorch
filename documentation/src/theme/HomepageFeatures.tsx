import React from 'react';
import styles from './HomepageFeatures.module.css';

const FeatureList: {title: string; Svg: React.ComponentType<React.SVGProps<SVGSVGElement>>; description: JSX.Element}[] = [
  {
    title: 'GPU Accelerated',
    Svg: require('@site/static/img/undraw_gpu.svg').default,
    description: (
      <>
        Massive acceleration with CUDA, ROCm, and Intel Arc support for 10-100x faster computations.
      </>
    ),
  },
  {
    title: 'Comprehensive Library',
    Svg: require('@site/static/img/undraw_metrics.svg').default,
    description: (
      <>
        Vectorized implementations of classical and novel warp metrics including Alcubierre, Lentz, and Schwarzschild.
      </>
    ),
  },
  {
    title: 'Web-Ready',
    Svg: require('@site/static/img/undraw_web_export.svg').default,
    description: (
      <>
        Lightweight JSON exporters designed for immediate integration with WebGL frontends and interactive visualizations.
      </>
    ),
  },
];

function Feature({title, Svg, description}: {title: string; Svg: React.ComponentType<React.SVGProps<SVGSVGElement>>; description: JSX.Element}): JSX.Element {
  return (
    <div className={styles.feature}>
      <div className="col col--4">
        <div className="text--center">
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div className="text--center padding-horiz--md">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}