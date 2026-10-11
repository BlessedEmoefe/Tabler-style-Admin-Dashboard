import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ActivityChart from '../components/Dashboard/ActivityChart'
import CommitsTable from '../components/Dashboard/CommitsTable'
import DonutChart from '../components/Dashboard/DonutChart'
import StatsCard from '../components/Dashboard/StatsCard'
import { fetchDashboardRequest } from '../store/slices/dashboardSlice'

const statCards = [
  { key: 'newTickets', title: 'New Tickets' },
  { key: 'closedToday', title: 'Closed Today' },
  { key: 'newReplies', title: 'New Replies' },
  { key: 'followers', title: 'Followers' },
  { key: 'dailyEarnings', title: 'Daily earnings' },
  { key: 'products', title: 'Products' },
]

function InfoCard({ title }) {
  return (
    <article className="flex h-24 items-center justify-center rounded border border-[#e6e7e9] bg-white px-4 text-sm font-medium text-[#1d273b] shadow-[0_1px_2px_rgba(18,24,38,0.05)]">
      {title}
    </article>
  )
}

function LoadingSpinner() {
  return (
    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#206bc4]/30 border-t-[#206bc4]" />
  )
}

function DashboardSkeleton() {
  return (
    <section aria-busy="true" aria-live="polite">
      <div className="mb-4 flex items-center gap-3">
        <h1 className="text-xl font-medium text-[#1d273b]">Dashboard</h1>
        <p className="flex items-center gap-2 text-sm text-[#667085]">
          <LoadingSpinner />
          Loading dashboard…
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
        {statCards.map((stat) => (
          <div
            key={stat.key}
            className="h-28 animate-pulse rounded border border-[#e6e7e9] bg-white shadow-[0_1px_2px_rgba(18,24,38,0.05)]"
          />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="h-80 animate-pulse rounded border border-[#e6e7e9] bg-white shadow-[0_1px_2px_rgba(18,24,38,0.05)] xl:col-span-2" />
        <div className="h-80 animate-pulse rounded border border-[#e6e7e9] bg-white shadow-[0_1px_2px_rgba(18,24,38,0.05)]" />
      </div>
    </section>
  )
}

export default function Dashboard() {
  const dispatch = useDispatch()
  const { stats, activityData, commits, chartData, error } = useSelector(
    (state) => state.dashboard,
  )

  useEffect(() => {
    dispatch(fetchDashboardRequest())
  }, [dispatch])

  const hasData = activityData.length > 0

  if (!hasData && !error) {
    return <DashboardSkeleton />
  }

  if (!hasData && error) {
    return (
      <section>
        <h1 className="mb-4 text-xl font-medium text-[#1d273b]">Dashboard</h1>
        <div
          role="alert"
          className="max-w-lg rounded border border-red-200 bg-white px-5 py-5 text-sm text-[#1d273b] shadow-[0_1px_2px_rgba(18,24,38,0.05)]"
        >
          <p className="font-medium text-red-700">Couldn’t load the dashboard</p>
          <p className="mt-1 text-[#667085]">{error}</p>
          <button
            type="button"
            onClick={() => dispatch(fetchDashboardRequest())}
            className="mt-4 rounded-md bg-[#206bc4] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#1a5cad]"
          >
            Try again
          </button>
        </div>
      </section>
    )
  }

  return (
    <section>
      <h1 className="mb-4 text-xl font-medium text-[#1d273b]">Dashboard</h1>
      {error ? (
        <p role="alert" className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
        {statCards.map(({ key, title }) => (
          <StatsCard key={key} title={title} {...stats[key]} />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 items-start gap-4 xl:grid-cols-3">
        <div className="min-w-0 overflow-hidden rounded border border-[#e6e7e9] bg-white shadow-[0_1px_2px_rgba(18,24,38,0.05)] xl:col-span-2">
          <ActivityChart data={activityData} />
          <CommitsTable commits={commits} />
        </div>

        <aside className="flex flex-col gap-4">
          <div className="rounded border border-[#c5daf6] bg-[#e8f2fc] px-4 py-3 text-sm text-[#206bc4]">
            Read our documentation with code samples.
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {chartData.map((chart) => (
              <DonutChart
                key={chart.id}
                title={chart.title}
                data={chart.data}
                innerRadius={chart.innerRadius}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoCard title="New feedback" />
            <InfoCard title="Today profit" />
          </div>
        </aside>
      </div>
    </section>
  )
}
