function TrendArrow({ up }) {
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3" fill="currentColor" aria-hidden="true">
      {up ? <path d="M6 2.25 10 8.25H2L6 2.25Z" /> : <path d="M6 9.75 2 3.75h8L6 9.75Z" />}
    </svg>
  )
}

export default function StatsCard({ title, value, change, isPositive }) {
  const trendClass = isPositive ? 'text-[#2fb344]' : 'text-[#d63939]'

  return (
    <article className="rounded border border-[#e6e7e9] bg-white px-3 py-5 text-center shadow-[0_1px_2px_rgba(18,24,38,0.05)]">
      <p className={`flex items-center justify-center gap-0.5 text-xs font-medium ${trendClass}`}>
        <span>{change}</span>
        <TrendArrow up={isPositive} />
      </p>
      <p className="mt-2 text-2xl leading-none font-semibold tracking-tight text-[#1d273b] sm:text-[1.75rem]">
        {value}
      </p>
      <p className="mt-2 text-sm text-[#667085]">{title}</p>
    </article>
  )
}
