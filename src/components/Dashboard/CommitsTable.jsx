import { TbTrash } from 'react-icons/tb'

export default function CommitsTable({ commits = [] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[36rem] border-t border-[#e6e7e9] text-left text-sm">
        <thead>
          <tr className="text-xs tracking-wide text-[#98a2b3] uppercase">
            <th scope="col" className="px-4 py-3 font-medium sm:px-5">
              User
            </th>
            <th scope="col" className="px-4 py-3 font-medium sm:px-5">
              Commit
            </th>
            <th scope="col" className="px-4 py-3 font-medium sm:px-5">
              Date
            </th>
            <th scope="col" className="px-4 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {commits.map((commit) => (
            <tr key={commit.name} className="border-t border-[#eef1f4] transition-colors hover:bg-[#f6f8fb]">
              <td className="px-4 py-3 sm:px-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e9edf2] text-xs font-semibold text-[#626976]">
                    {commit.avatar}
                  </span>
                  <span className="font-medium whitespace-nowrap text-[#1d273b]">{commit.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-[#626976] sm:px-5">{commit.message}</td>
              <td className="px-4 py-3 whitespace-nowrap text-[#667085] sm:px-5">{commit.date}</td>
              <td className="px-4 py-3 text-right">
                <button
                  type="button"
                  aria-label={`Remove commit by ${commit.name}`}
                  className="rounded-md p-1.5 text-[#98a2b3] transition-colors hover:bg-white hover:text-[#d63939]"
                >
                  <TbTrash className="h-4 w-4" aria-hidden="true" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
