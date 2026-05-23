import React from 'react';
import Footer from '@theme-original/Footer';
import type FooterType from '@theme/Footer';

type FooterWrapperProps = {
  // Add any additional props here
};

export default function FooterWrapper(props: FooterWrapperProps): JSX.Element {
  return (
    <>
      <Footer {...props} />
      {/* Add additional footer content here if needed */}
    </>
  );
}