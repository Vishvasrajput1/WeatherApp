import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useTheme } from '../context/useTheme';
import {
  formatRainTick,
  getRainChances,
  getRainChancesForWeek,
} from '../utils/helper';

const RainChancesChart = ({ data, height = 250, isWeek = false }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const rainchances = isWeek
    ? getRainChancesForWeek(data)
    : getRainChances(data);
  const CustomTooltip = ({ active, payload, label, isDark }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;

      return (
        <div
          className={`p-3 rounded-lg shadow-lg border-none ${
            isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}
        >
          <p className='font-bold mb-1'>
            {isWeek ? dataPoint.fullName : label}
          </p>
          <p className='text-sm'>
            Status:{' '}
            <span className='font-medium'>
              {formatRainTick(payload[0].value)}
            </span>
          </p>
          <p className='text-sm'>
            Rainfall: <span className='font-medium'>{dataPoint.mm} mm</span>
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <div
      className={`w-full  rounded-[15px] p-4 space-y-3 ${
        isWeek ? 'card-bg' : 'child-card-bg'
      }`}
    >
      <div className='text-base font-medium'>Rain chances</div>
      <div style={{ width: '100%', height: height }}>
        <ResponsiveContainer width='100%' height='100%'>
          <ComposedChart
            data={rainchances}
            margin={{
              top: 10,
              right: 10,
              bottom: 0,
              left: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray='3 3'
              stroke={isDark ? '#333' : '#eee'}
              vertical={false}
            />
            <XAxis
              dataKey='name'
              tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={[0, 3]}
              ticks={[0, 1, 2, 3]}
              tickFormatter={formatRainTick}
              tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={<CustomTooltip isDark={isDark} />}
              cursor={{
                fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              }}
            />
            <Bar
              dataKey='value'
              barSize={6}
              radius={[10, 10, 0, 0]}
              fill={isDark ? '#22c55e' : '#2563eb'}
              background={{
                fill: isDark ? '#374151' : '#e5e7eb',
                radius: [10, 10, 0, 0],
              }}
            />
            <Line
              type='monotone'
              dataKey='value'
              stroke='#ff7300'
              strokeWidth={2}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RainChancesChart;
