import React from 'react';

interface Reference {
  authors?: string;
  title: string;
  journal?: string;
  year?: string;
  link?: string;
  description?: string;
}

interface ReferencesSectionProps {
  references: Reference[];
}

const ReferencesSection: React.FC<ReferencesSectionProps> = ({ references }) => {
  return (
    <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#1F2937', borderRadius: '8px' }}>
      <h2 style={{ color: '#F9FAFB', marginBottom: '15px', fontSize: '1.5em' }}>References</h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {references.map((ref, index) => (
          <li
            key={index}
            style={{
              marginBottom: index < references.length - 1 ? '15px' : '0',
              paddingBottom: index < references.length - 1 ? '15px' : '0',
              borderBottom: index < references.length - 1 ? '1px solid #374151' : 'none',
            }}
          >
            {ref.link ? (
              <a
                href={ref.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#60A5FA', textDecoration: 'none', fontWeight: '500' }}
              >
                {ref.title}
              </a>
            ) : (
              <span style={{ color: '#D1D5DB', fontWeight: '500' }}>{ref.title}</span>
            )}
            {ref.authors && (
              <span style={{ color: '#9CA3AF', marginLeft: '8px' }}>
                — {ref.authors}
              </span>
            )}
            {ref.journal && (
              <div style={{ color: '#9CA3AF', fontSize: '0.95em', marginTop: '4px' }}>
                {ref.journal}
              </div>
            )}
            {ref.year && (
              <span style={{ color: '#6B7280', fontSize: '0.9em', marginLeft: '8px' }}>
                ({ref.year})
              </span>
            )}
            {ref.description && (
              <div style={{ color: '#9CA3AF', fontSize: '0.9em', marginTop: '4px', fontStyle: 'italic' }}>
                {ref.description}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReferencesSection;
