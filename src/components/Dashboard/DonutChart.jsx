import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

function PercentLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent, payload }) {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.52
  const angle = (-midAngle * Math.PI) / 180
  const x = cx + radius * Math.cos(angle)
  const y = cy + radius * Math.sin(angle)
  const value = percent > 1 ? percent : percent * 100

  return (
    <text
      x={x}
      y={y}
      fill={payload.labelColor}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      {`${value.toFixed(1)}%`}
    </text>
  )
}

export default function DonutChart({ title, data = [], innerRadius = '58%' }) {
  return (
    <article className="min-w-0 rounded border border-[#e6e7e9] bg-white px-3 pt-4 pb-2 shadow-[0_1px_2px_rgba(18,24,38,0.05)]">
      <h3 className="px-1 text-sm font-medium text-[#1d273b]">{title}</h3>
      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={innerRadius}
              outerRadius="78%"
              stroke="#ffffff"
              strokeWidth={2}
              label={PercentLabel}
              labelLine={false}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value}%`, name]}
              contentStyle={{
                border: '1px solid #e6e7e9',
                borderRadius: 4,
                fontSize: 12,
                boxShadow: '0 1px 2px rgba(18, 24, 38, 0.06)',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </article>
  )
}
