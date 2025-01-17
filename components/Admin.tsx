import Link from "next/link"

export default function Admin() {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center gap-2 p-4 text-center">
      <div className="flex flex-col gap-1">
        <LockIcon className="w-14 h-14 m-auto text-red-500" />
        <h1 className="text-3xl font-semibold tracking-tighter">Access Denied</h1>
        <p className="text-gray-500 dark:text-gray-400">You cannot view this page because you are not an admin.</p>
      </div>
      <div className="flex w-full max-w-sm flex-col gap-2 mt-4">
        <Link
          className="flex-1 inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm text-sm dark:border-gray-800 dark:bg-gray-950"
          href="/api/auth/signout"
        >
          Sign Out
        </Link>
      </div>
    </div>
  )
}

function LockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
