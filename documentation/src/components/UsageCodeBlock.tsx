import React from 'react';

interface UsageCodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

const UsageCodeBlock: React.FC<UsageCodeBlockProps> = ({ code, language = 'python', title }) => {
  return (
    <div style={{ margin: '20px 0' }}>
      {title && (
        <h3 style={{ color: '#F9FAFB', marginBottom: '10px', fontSize: '1.2em' }}>{title}</h3>
      )}
      <pre
        style={{
          backgroundColor: '#1F2937',
          padding: '15px',
          borderRadius: '8px',
          overflowX: 'auto',
          border: '1px solid #374151',
        }}
      >
        <code
          style={{
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
            fontSize: '14px',
            lineHeight: '1.5',
            color: '#E5E7EB',
          }}
        >
          {code}
        </code>
      </pre>
    </div>
  );
};

export default UsageCodeBlock;
