
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartDataPoint } from '../types';
import { CPU_USAGE_DATA, MEMORY_USAGE_DATA, REQUESTS_PER_SEC_DATA, RESPONSE_TIME_DATA } from '../constants';

interface ChartCardProps {
  title: string;
  data: ChartDataPoint[];
  color: string;
  unit: string;
  currentValue: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, data, color, unit, currentValue }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200/80">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <div className="text-right">
            <p className="text-3xl font-bold" style={{ color }}>{currentValue}</p>
            <p className="text-sm text-gray-500">Current</p>
        </div>
      </div>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" unit={unit} />
            <Tooltip
                contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(5px)',
                    border: '1px solid #e0e0e0',
                    borderRadius: '0.5rem',
                }}
                />
            <Line type="monotone" dataKey="value" stroke={color} strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const MonitoringView: React.FC = () => {
    const charts = [
        {
            title: 'CPU Usage',
            data: CPU_USAGE_DATA,
            color: '#F59E0B', // Orange
            unit: '%',
            currentValue: `${CPU_USAGE_DATA[CPU_USAGE_DATA.length - 1].value}%`,
        },
        {
            title: 'Memory Usage',
            data: MEMORY_USAGE_DATA,
            color: '#8B5CF6', // Purple
            unit: 'MB',
            currentValue: `${MEMORY_USAGE_DATA[MEMORY_USAGE_DATA.length - 1].value}MB`,
        },
        {
            title: 'Requests/sec',
            data: REQUESTS_PER_SEC_DATA,
            color: '#3B82F6', // Blue
            unit: '',
            currentValue: `${REQUESTS_PER_SEC_DATA[REQUESTS_PER_SEC_DATA.length - 1].value}/sec`,
        },
        {
            title: 'Response Time',
            data: RESPONSE_TIME_DATA,
            color: '#F59E0B', // Orange
            unit: 'ms',
            currentValue: `${RESPONSE_TIME_DATA[RESPONSE_TIME_DATA.length - 1].value}ms`,
        }
    ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {charts.map(chart => <ChartCard key={chart.title} {...chart} />)}
    </div>
  );
};

export default MonitoringView;
