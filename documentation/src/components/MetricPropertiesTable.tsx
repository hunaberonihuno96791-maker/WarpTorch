import React from 'react';

interface MetricPropertiesTableProps {
  properties: Array<{
    property: string;
    value: string;
  }>;
}

const MetricPropertiesTable: React.FC<MetricPropertiesTableProps> = ({ properties }) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid #374151' }}>
          <th style={{ padding: '12px', textAlign: 'left', color: '#F9FAFB', fontWeight: '600' }}>
            Property
          </th>
          <th style={{ padding: '12px', textAlign: 'left', color: '#F9FAFB', fontWeight: '600' }}>
            Value
          </th>
        </tr>
      </thead>
      <tbody>
        {properties.map((prop, index) => (
          <tr
            key={index}
            style={{ borderBottom: index < properties.length - 1 ? '1px solid #374151' : 'none' }}
          >
            <td
              style={{
                padding: '12px',
                color: '#9CA3AF',
                fontWeight: '500',
                verticalAlign: 'top',
              }}
              dangerouslySetInnerHTML={{ __html: prop.property }}
            />
            <td
              style={{ padding: '12px', color: '#D1D5DB', verticalAlign: 'top' }}
              dangerouslySetInnerHTML={{ __html: prop.value }}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MetricPropertiesTable;
