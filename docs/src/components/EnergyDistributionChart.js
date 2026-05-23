import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EnergyDistributionChart = () => {
  // Данные распределения энергии для разных метрик
  const data = [
    {
      metric: 'Алькубьерре',
      positiveEnergy: 0.1,
      negativeEnergy: -10.5,
      exoticMatter: 10.4,
    },
    {
      metric: 'Ленц',
      positiveEnergy: 5.2,
      negativeEnergy: -1.5,
      exoticMatter: 1.5,
    },
    {
      metric: 'Ван den Брок',
      positiveEnergy: 0.2,
      negativeEnergy: -3.8,
      exoticMatter: 3.6,
    },
    {
      metric: 'Шварцшильд',
      positiveEnergy: 0,
      negativeEnergy: 0,
      exoticMatter: 0,
    },
  ];

  return (
    <div style={{ margin: '20px 0' }}>
      <h3>Сравнение энергетических требований варп-метрик</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="metric" label={{ value: 'Метрика', position: 'insideBottom', offset: -5 }} />
          <YAxis label={{ value: 'Энергия (условные единицы)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="positiveEnergy" fill="#10b981" name="Положительная энергия" />
          <Bar dataKey="negativeEnergy" fill="#ef4444" name="Отрицательная энергия" />
          <Bar dataKey="exoticMatter" fill="#8b5cf6" name="Экзотическая материя" />
        </BarChart>
      </ResponsiveContainer>
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
        <h4>Анализ энергетических условий:</h4>
        <ul>
          <li><strong>Алькубьерре:</strong> Требует огромное количество экзотической материи (отрицательная энергия)</li>
          <li><strong>Ленц:</strong> Минимальные требования к экзотической материи, положительная энергия</li>
          <li><strong>Ван den Брок:</strong> Сокращенные требования за счет микро-пузыря</li>
          <li><strong>Шварцшильд:</strong> Вакуумное решение, не требует экзотической материи</li>
        </ul>
      </div>
    </div>
  );
};

export default EnergyDistributionChart;