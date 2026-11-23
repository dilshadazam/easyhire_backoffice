import {
  Activity,
  ArrowUpRight,
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  CalendarDays,
  ChartNoAxesCombined,
  CircleUserRound,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from 'lucide-react'
import { Link, NavLink, Navigate, Outlet, useNavigate, useParams } from 'react-router-dom'
import { demoDashboards } from '../auth/demoData'
import { useDemoSession } from '../auth/DemoSessionContext'
import {
  workspaceRoles,
  type NavigationIcon,
  type RoleId,
} from '../auth/roles'

const navigationIcons = {
  dashboard: LayoutDashboard,
  companies: Building2,
  users: Users,
  jobs: BriefcaseBusiness,
  attendance: CalendarCheck,
  leave: CalendarDays,
  payroll: CreditCard,
  reports: ChartNoAxesCombined,
  settings: Settings,
  profile: CircleUserRound,
} satisfies Record<NavigationIcon, typeof LayoutDashboard>

function WorkspaceNavigation({ role, onNavigate }: { role: RoleId; onNavigate?: () => void }) {
  const navigation = workspaceRoles[role].navigation

  return (
    <nav aria-label="Workspace navigation" className="space-y-1">
      {navigation.map((item) => {
        const Icon = navigationIcons[item.icon]
        const path = item.id === 'dashboard' ? '/workspace' : `/workspace/${item.id}`

        return (
          <NavLink
            key={item.id}
            to={path}
            end={item.id === 'dashboard'}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`
            }
          >
            <Icon size={18} />
            {item.label}
          </NavLink>
        )
      })}
    </nav>
  )
}

export function WorkspaceLayout() {
  const { role, exitPreview } = useDemoSession()
  const navigate = useNavigate()

  if (!role) {
    return <Navigate to="/login" replace />
  }

  const roleDetails = workspaceRoles[role]
  const leavePreview = () => {
    exitPreview()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 md:grid md:grid-cols-[256px_minmax(0,1fr)]">
      <aside className="hidden border-r border-slate-200 bg-white md:flex md:flex-col">
        <Link to="/" className="flex h-[72px] items-center gap-3 border-b border-slate-100 px-6">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white">
            <Users size={20} />
          </span>
          <span className="font-bold tracking-tight">Easyhire <span className="text-indigo-600">HR</span></span>
        </Link>
        <div className="border-b border-slate-100 px-4 py-4">
          <p className="px-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Workspace</p>
          <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 p-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-violet-50 text-violet-700">
              <Building2 size={18} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-slate-800">{roleDetails.scope}</span>
              <span className="block text-xs text-slate-500">{roleDetails.label}</span>
            </span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-5">
          <WorkspaceNavigation role={role} />
        </div>
        <div className="border-t border-slate-100 p-4">
          <div className="mb-3 rounded-xl bg-amber-50 px-3 py-2.5 text-xs leading-5 text-amber-800">
            Preview mode: sample interface only. No account is authenticated.
          </div>
          <button
            type="button"
            onClick={leavePreview}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            <LogOut size={18} />
            Exit preview
          </button>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex h-[72px] items-center justify-between gap-4 px-5 lg:px-8">
            <div className="flex items-center gap-3">
              <Link to="/" className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white md:hidden" aria-label="Easyhire HR home">
                <Users size={20} />
              </Link>
              <div>
                <p className="text-sm font-bold text-slate-900">People operations</p>
                <p className="text-xs text-slate-500">{roleDetails.scope} · {roleDetails.label}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800 sm:inline-flex">
                Demo preview
              </span>
              <span className="relative grid h-10 w-10 place-items-center rounded-xl text-slate-500" aria-label="Notifications preview">
                <Bell size={19} />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-white" />
              </span>
              <button
                type="button"
                onClick={leavePreview}
                className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 md:hidden"
                aria-label="Exit preview"
              >
                <LogOut size={18} />
              </button>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                {roleDetails.label.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()}
              </span>
            </div>
          </div>
          <details className="border-t border-slate-100 px-5 py-3 md:hidden">
            <summary className="cursor-pointer text-sm font-semibold text-slate-700">Open navigation</summary>
            <div className="pt-3">
              <WorkspaceNavigation role={role} />
            </div>
          </details>
        </header>
        <main className="mx-auto w-full max-w-[1440px] px-5 py-7 lg:px-8 lg:py-9">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export function WorkspaceDashboard() {
  const { role } = useDemoSession()

  if (!role) {
    return <Navigate to="/login" replace />
  }

  const roleDetails = workspaceRoles[role]
  const demo = demoDashboards[role]
  const quickLinks = roleDetails.navigation.filter((item) => item.id !== 'dashboard').slice(0, 3)

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 p-7 text-white shadow-xl shadow-indigo-200 sm:p-9">
        <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full border-[36px] border-white/10" />
        <div className="absolute -bottom-28 right-36 h-56 w-56 rounded-full bg-violet-400/20 blur-2xl" />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold">
            <Activity size={14} /> {roleDetails.label} workspace
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Good morning, {demo.welcomeName}</h1>
          <p className="mt-3 max-w-xl leading-7 text-indigo-100">
            {demo.description}
          </p>
          <p className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-indigo-100">
            Sample demo data <span className="h-1 w-1 rounded-full bg-indigo-200" /> Not live company data
          </p>
        </div>
      </section>

      <section aria-labelledby="workspace-overview-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="workspace-overview-heading" className="text-lg font-bold text-slate-900">Your overview</h2>
            <p className="mt-1 text-sm text-slate-500">Example metrics tailored to the {roleDetails.label.toLowerCase()} role.</p>
          </div>
          <span className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">Demo dataset</span>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {demo.metrics.map((metric) => {
            const Icon = navigationIcons[metric.icon]

            return (
              <article key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500">{metric.label}</span>
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-50 text-indigo-600"><Icon size={18} /></span>
                </div>
                <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">{metric.value}</p>
                <p className="mt-1 text-xs text-slate-500">{metric.detail}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section aria-labelledby="recent-activity-heading" className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 id="recent-activity-heading" className="font-bold text-slate-900">Recent activity</h2>
            <p className="mt-1 text-sm text-slate-500">Example updates visible to this role.</p>
          </div>
          <span className="hidden rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500 sm:inline-flex">Sample activity</span>
        </div>
        <ul className="mt-4 divide-y divide-slate-100">
          {demo.activities.map((activity) => (
            <li key={activity.title} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Activity size={17} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{activity.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{activity.detail}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pl-12 sm:pl-0">
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">{activity.status}</span>
                <time className="text-xs text-slate-400">{activity.time}</time>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-bold text-slate-900">Your modules</h2>
            <p className="mt-1 text-sm text-slate-500">Available for the {roleDetails.label.toLowerCase()} role.</p>
          </div>
          <span className="hidden rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500 sm:inline-flex">Role-based navigation</span>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {quickLinks.map((item) => {
            const Icon = navigationIcons[item.icon]

            return (
              <Link
                key={item.id}
                to={`/workspace/${item.id}`}
                className="group flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/50"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-white group-hover:text-indigo-600">
                  <Icon size={19} />
                </span>
                <span className="flex-1 text-sm font-semibold text-slate-700">{item.label}</span>
                <ArrowUpRight size={17} className="text-slate-400 transition group-hover:text-indigo-600" />
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export function WorkspaceModulePreview() {
  const { sectionId } = useParams()
  const { role } = useDemoSession()

  if (!role || !sectionId) {
    return <Navigate to="/workspace" replace />
  }

  const item = workspaceRoles[role].navigation.find((entry) => entry.id === sectionId)

  if (!item) {
    return <Navigate to="/workspace" replace />
  }

  const Icon = navigationIcons[item.icon]

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-50 text-indigo-600"><Icon size={22} /></span>
      <h1 className="mt-5 text-2xl font-bold text-slate-900">{item.label}</h1>
      <p className="mt-2 max-w-xl leading-7 text-slate-600">
        This module is included in the {workspaceRoles[role].label.toLowerCase()} navigation. Its workflow and data views will be added after the API contract is connected.
      </p>
      <div className="mt-6 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800">
        Frontend preview · Not connected to live data
      </div>
    </section>
  )
}
