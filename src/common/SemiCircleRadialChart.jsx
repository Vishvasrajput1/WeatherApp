import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LabelList,
  Customized,
} from 'recharts';
import { CalculateValueAndMaxvalue } from '../utils/helper';
import { useTheme } from '../context/useTheme';

const SpeedometerChart = ({ data, isWeek = false }) => {
  const { value, maxValue } = CalculateValueAndMaxvalue(data, isWeek);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const RADIAN = Math.PI / 180;

  const CustomTooltip = ({ active, payload, isDark }) => {
    if (!active || !payload?.length) return null;
    return (
      <div
        className='px-3 py-2 rounded-lg text-xs'
        style={{
          backgroundColor: isDark ? '#1f2937' : '#ffffff',
          border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
          color: isDark ? '#f9fafb' : '#111827',
        }}
      >
        <div>{payload[0].payload.name}</div>
        <div>
          UV Index:{' '}
          <strong>
            {payload[0].payload.name === 'Max' ? maxValue : payload[0].value}
          </strong>
        </div>
      </div>
    );
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
  }) => {
    const desiredLabels = [0, 5, 10, 12];
    if (!desiredLabels.includes(value)) return null;

    const r = innerRadius + (outerRadius - innerRadius) * 0.75;
    const x = cx + r * Math.cos(-midAngle * RADIAN);
    const y = cy + r * Math.sin(-midAngle * RADIAN);

    if (isNaN(x) || isNaN(y)) {
      return null;
    }

    return (
      <text
        x={x}
        y={y}
        fill='#9ca3af'
        fontSize='12'
        textAnchor='middle'
        dominantBaseline='central'
      >
        {value}
      </text>
    );
  };

  const ArcValueIndicator = ({ width, height }) => {
    const cx = width / 2;
    const cy = height * 0.9;

    const chartRadius = Math.min(width / 2, height * 0.9);
    const r = chartRadius * 0.9; // Position between inner/outer radius

    const angle = 180 - (value / maxValue) * 180;
    const x = cx + r * Math.cos(-angle * RADIAN);
    const y = cy + r * Math.sin(-angle * RADIAN);

    if (isNaN(x) || isNaN(y)) return null;

    return <circle cx={x} cy={y} r={4} fill={isDark ? '#f9fafb' : '#111827'} />;
  };

  const Weatherdata = [
    { name: 'Current', value },
    { name: 'Max', value: maxValue - value },
  ];
  const ScaleTicksData = [
    { name: '0', value: 0 },
    { name: '5', value: 5 },
    { name: '10', value: 10 },
    { name: '12', value: 12 },
  ];
  return (
    <div
      style={{
        width: '100%',
        height:
          window.innerWidth >= 1440
            ? 245
            : window.innerWidth >= 1024
            ? 150
            : 100,
      }}
      className={`${
        isWeek ? 'card-bg' : 'child-card-bg'
      }  rounded-[15px] 2xl:p-3 p-2  py-3 2xl:space-y-4 space-y-3`}
    >
      <div>UV Index</div>

      <ResponsiveContainer
        width='100%'
        height='100%'
        maxHeight={
          window.innerWidth >= 1440 ? 150 : window.innerWidth >= 1024 ? 100 : 80
        }
      >
        <PieChart>
          <defs>
            <linearGradient
              id='speedometerGradient'
              x1='0'
              y1='0'
              x2='1'
              y2='0'
            >
              <stop offset='0%' stopColor={isDark ? '#20E647' : '#038fda'} />
            </linearGradient>
          </defs>

          <Tooltip
            content={(props) => <CustomTooltip {...props} isDark={isDark} />}
            cursor={{
              fill: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
            }}
          />

          <Pie
            data={Weatherdata}
            cx='50%'
            cy='90%'
            startAngle={180}
            endAngle={0}
            innerRadius='85%'
            outerRadius='95%'
            dataKey='value'
            stroke='none'
          >
            <Cell fill='url(#speedometerGradient)' />
            <Cell fill='#333' />
          </Pie>
          {/* <Pie
            data={ScaleTicksData}
            cx='50%'
            cy='90%'
            startAngle={180}
            endAngle={0}
            innerRadius='85%'
            outerRadius='95%'
            fill='transparent' // Make the arc invisible
            stroke='none'
          >
            <LabelList dataKey='value' content={renderCustomizedLabel} />
          </Pie> */}

          <Customized component={ArcValueIndicator} />
          <LabelList dataKey='value' content={renderCustomizedLabel} />
        </PieChart>
      </ResponsiveContainer>

      <div className='text-base font-semibold text-center'>
        {value} <span className='text-xs font-normal'>UV</span>
      </div>
    </div>
  );
};

export default SpeedometerChart;
