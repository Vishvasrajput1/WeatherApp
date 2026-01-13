import { BarChart, Bar, Tooltip } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import {
  formatHourlyTime,
  getWindForChart,
  getWindForWeekChart,
} from '../utils/helper';
import { useTheme } from '../context/useTheme';
import { g } from 'framer-motion/client';

const TinyBarChart = ({ data, isWeek = false }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const CustomTooltip = ({ active, payload, label, isDark }) => {
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
        <div>{payload[0].payload.lable}</div>
        <div>
          Wind: <strong>{payload[0].value} km/h</strong>
        </div>
      </div>
    );
  };
  const getWindColor = (value, isDark) => {
    if (value < 5) {
      return '#9ca3af';
    }

    if (value < 10) {
      return isDark ? '#22c55e' : '#3b82f6';
    }

    return isDark ? '#16a34a' : '#1d4ed8';
  };

  return (
    <div
      className={`w-full ${
        isWeek ? 'card-bg' : 'child-card-bg'
      } rounded-[15px] 2xl:p-3 p-2 2xl:space-y-3 space-y-2`}
    >
      <div>Wind Status</div>
      <BarChart
        style={{
          width: '100%',
          maxWidth: '290px',
          maxHeight: '100px',
          aspectRatio: 1.618,
        }}
        responsive
        data={isWeek ? getWindForWeekChart(data) : getWindForChart(data)}
      >
        <Tooltip
          content={(props) => <CustomTooltip {...props} isDark={isDark} />}
          cursor={{
            fill: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
          }}
        />

        <Bar
          dataKey='value'
          barSize={4}
          radius={[4, 4, 0, 0]}
          fillOpacity={1}
          shape={(props) => {
            const { x, y, width, height, value } = props;
            return (
              <rect
                x={x}
                y={y}
                width={width}
                height={height}
                rx={4}
                fill={getWindColor(value, isDark)}
              />
            );
          }}
        />
      </BarChart>

      <div className='flex justify-between p-2'>
        <span className='text-base'>
          {!isWeek
            ? data?.current?.wind_speed_10m
            : Math.max(...data?.daily?.wind_speed_10m_max)}{' '}
          <span className='text-xs'>
            {!isWeek
              ? data?.hourly_units?.wind_speed_10m
              : data?.daily_units?.wind_speed_10m_max}
          </span>
        </span>
        <span className='text-xs'>
          {formatHourlyTime(
            data?.current?.time,
            data?.hourly_units?.time,
            true
          )}
        </span>
      </div>
    </div>
  );
};

export default TinyBarChart;
