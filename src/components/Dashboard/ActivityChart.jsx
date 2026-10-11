import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export default function ActivityChart({ data = [] }) {
  return (
    <div className="px-5 pt-4 pb-2">
      <h2 className="text-base font-medium text-[#1d273b]">Development Activity</h2>
      <p className="mt-3 flex items-center gap-2 text-xs text-[#667085]">
        <span className="h-2.5 w-2.5 bg-[#206bc4]" aria-hidden="true" />
        Purchases
      </p>
      <div className="mt-2 h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
            <XAxis dataKey="month" hide height={0} />
            <YAxis hide width={0} />
            <Tooltip
              formatter={(value) => [value, 'Purchases']}
              contentStyle={{
                border: '1px solid #e6e7e9',
                borderRadius: 4,
                fontSize: 12,
                boxShadow: '0 1px 2px rgba(18, 24, 38, 0.06)',
              }}
            />
            <Line
              type="monotone"
              dataKey="purchases"
              stroke="#206bc4"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0, fill: '#206bc4' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
