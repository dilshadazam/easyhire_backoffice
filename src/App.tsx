import { useState, type FormEvent, type ReactNode } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { useDemoSession } from './auth/DemoSessionContext'
import { isRoleId, roleOptions, type RoleId } from './auth/roles'
import {
  WorkspaceDashboard,
  WorkspaceLayout,
  WorkspaceModulePreview,
} from './layouts/WorkspaceLayout'
import {
  ArrowRight,
  Building2,
  Check,
  Clock3,
  CreditCard,
  Menu,
  ShieldCheck,
  Users,
  WalletCards,
  X,
} from 'lucide-react'

const navLinks = [
  { label: 'Features', to: '/features' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
]

function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link to="/" className={`flex items-center gap-2 font-bold ${inverse ? 'text-white' : 'text-slate-900'}`} aria-label="Easyhire HR home">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
        <Users size={20} strokeWidth={2.3} />
      </span>
      <span>Easyhire <span className="text-indigo-600">HR</span></span>
    </Link>
  )
}

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Brand />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="text-sm font-semibold text-slate-600 transition hover:text-indigo-600">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link to="/login" className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600">Log in</Link>
          <Link to="/register" className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700">
            Register company
          </Link>
        </div>
        <button type="button" className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-slate-100 px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="font-semibold text-slate-700" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link to="/login" className="font-semibold text-slate-700" onClick={() => setOpen(false)}>Log in</Link>
            <Link to="/register" className="rounded-xl bg-indigo-600 px-5 py-3 text-center font-semibold text-white" onClick={() => setOpen(false)}>Register company</Link>
          </div>
        </nav>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between lg:px-8">
        <Brand />
        <p className="text-sm text-slate-500">© 2026 Easyhire HR. One Platform. Every Employee. Every Company.</p>
      </div>
    </footer>
  )
}

function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

const features = [
  { icon: Users, title: 'People management', text: 'Keep employee records, documents, reporting lines and work history in one secure place.' },
  { icon: Building2, title: 'Multi-company workspaces', text: 'Give every company a private workspace with independent teams, roles and settings.' },
  { icon: Clock3, title: 'Attendance & leave', text: 'Simplify check-ins, leave requests, approvals and attendance reporting.' },
  { icon: WalletCards, title: 'Payroll & finance', text: 'Configure salary structures and prepare accurate, approval-ready payroll.' },
  { icon: ShieldCheck, title: 'Role-based access', text: 'Control what every employee, manager, HR and finance user can view or change.' },
  { icon: CreditCard, title: 'Subscription ready', text: 'Manage plans, renewals, Razorpay payments and workspace entitlements.' },
]

function DashboardPreview() {
  return (
    <div className="relative mx-auto max-w-xl">
      <div className="absolute -inset-8 rounded-full bg-indigo-200/50 blur-3xl" />
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-300/70">
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400">GOOD MORNING</p>
              <p className="font-bold text-slate-900">Easyhire Dashboard</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-indigo-100" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              ['Employees', '248', 'text-indigo-600'],
              ['On leave', '12', 'text-amber-600'],
              ['Open jobs', '9', 'text-emerald-600'],
            ].map(([label, value, color]) => (
              <div key={label} className="rounded-xl bg-white p-3 shadow-sm">
                <p className="text-[10px] font-semibold text-slate-400">{label}</p>
                <p className={`mt-1 text-xl font-bold ${color}`}>{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-[1fr_0.8fr] gap-3">
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-xs font-bold text-slate-700">Attendance overview</p>
              <div className="mt-5 flex h-28 items-end gap-2">
                {[45, 72, 58, 88, 64, 92, 78].map((height, index) => (
                  <div key={index} className="flex-1 rounded-t-md bg-indigo-500" style={{ height: `${height}%`, opacity: 0.55 + index * 0.06 }} />
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-xs font-bold text-slate-700">New employees</p>
              {[['AR', 'Aarav R.', 'Engineering'], ['MS', 'Mia S.', 'Marketing'], ['KD', 'Kabir D.', 'Finance']].map(([initials, name, team]) => (
                <div key={name} className="mt-3 flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-indigo-100 text-[9px] font-bold text-indigo-700">{initials}</span>
                  <div className="min-w-0">
                    <p className="truncate text-[10px] font-bold text-slate-700">{name}</p>
                    <p className="text-[9px] text-slate-400">{team}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HomePage() {
  return (
    <PageShell>
      <section className="overflow-hidden bg-gradient-to-b from-indigo-50/80 via-white to-white">
        <div className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-3 py-1.5 text-xs font-bold text-indigo-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Built for growing teams
            </div>
            <h1 className="max-w-2xl text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl">
              People operations, <span className="text-indigo-600">without the chaos.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Run recruitment, onboarding, attendance, leave and payroll from one reliable HR platform built for every company in your network.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/register" className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 font-bold text-white shadow-xl shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700">
                Start free <ArrowRight size={18} />
              </Link>
              <Link to="/pricing" className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-4 font-bold text-slate-800 transition hover:border-indigo-300 hover:text-indigo-600">
                View pricing
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-slate-500">
              {['No setup fee', 'Secure workspaces', 'Role-based access'].map((item) => (
                <span key={item} className="flex items-center gap-2"><Check size={16} className="text-emerald-500" />{item}</span>
              ))}
            </div>
          </div>
          <DashboardPreview />
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">Everything in one place</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-950">Manage the complete employee journey</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-slate-100">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600"><feature.icon size={21} /></span>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{feature.title}</h3>
                <p className="mt-2 leading-7 text-slate-600">{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-5 text-center md:flex-row md:text-left lg:px-8">
          <div>
            <h2 className="text-3xl font-extrabold text-white">Ready to simplify your HR operations?</h2>
            <p className="mt-2 text-slate-400">Create your company workspace and invite your team.</p>
          </div>
          <Link to="/register" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-slate-900">
            Register company <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </PageShell>
  )
}

function FeaturesPage() {
  return (
    <PageShell>
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">Platform features</p>
            <h1 className="mt-3 text-5xl font-extrabold tracking-tight text-slate-950">HR operations that scale with your company</h1>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="rounded-2xl border border-slate-200 p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600"><feature.icon size={21} /></span>
                <h2 className="mt-5 text-lg font-bold text-slate-900">{feature.title}</h2>
                <p className="mt-2 leading-7 text-slate-600">{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}

function PricingPage() {
  const [annual, setAnnual] = useState(true)
  const plans = [
    { name: 'Starter', monthly: 1499, description: 'For small teams getting organized.', features: ['Up to 25 employees', 'Employee directory', 'Leave management', 'Email support'] },
    { name: 'Growth', monthly: 3999, description: 'For growing companies managing multiple HR processes.', features: ['Up to 100 employees', 'Recruitment and onboarding', 'Attendance and reports', 'Priority support'], popular: true },
    { name: 'Enterprise', monthly: 7999, description: 'For larger organizations with advanced needs.', features: ['Unlimited employees', 'Payroll and finance', 'Custom roles and permissions', 'Dedicated support'] },
  ]

  return (
    <PageShell>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">Simple pricing</p>
            <h1 className="mt-3 text-5xl font-extrabold tracking-tight text-slate-950">Choose a plan for every stage</h1>
            <div className="mt-8 inline-flex rounded-xl border border-slate-200 bg-white p-1">
              <button type="button" onClick={() => setAnnual(false)} className={`rounded-lg px-4 py-2 text-sm font-bold ${!annual ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}>Monthly</button>
              <button type="button" onClick={() => setAnnual(true)} className={`rounded-lg px-4 py-2 text-sm font-bold ${annual ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}>Annual · Save 20%</button>
            </div>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => {
              const price = annual ? Math.round(plan.monthly * 0.8) : plan.monthly
              return (
                <article key={plan.name} className={`relative rounded-3xl border bg-white p-7 ${plan.popular ? 'border-indigo-600 shadow-2xl shadow-indigo-100' : 'border-slate-200'}`}>
                  {plan.popular && <span className="absolute right-6 top-6 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">Most popular</span>}
                  <h2 className="text-xl font-extrabold text-slate-950">{plan.name}</h2>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">{plan.description}</p>
                  <div className="mt-6 flex items-end gap-1">
                    <span className="text-4xl font-extrabold text-slate-950">₹{price.toLocaleString('en-IN')}</span>
                    <span className="pb-1 text-sm text-slate-500">/ month</span>
                  </div>
                  <Link to="/register" className={`mt-6 flex justify-center rounded-xl px-5 py-3 font-bold ${plan.popular ? 'bg-indigo-600 text-white' : 'border border-slate-300 text-slate-800'}`}>
                    Get started
                  </Link>
                  <ul className="mt-7 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-slate-600"><Check size={17} className="text-emerald-500" />{feature}</li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </PageShell>
  )
}

function ContactPage() {
  const [sent, setSent] = useState(false)
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <PageShell>
      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">Contact us</p>
            <h1 className="mt-3 text-5xl font-extrabold tracking-tight text-slate-950">Let’s talk about your HR needs</h1>
            <p className="mt-5 leading-7 text-slate-600">Tell us about your company and team size. Our team will help you choose the right Easyhire HR setup.</p>
          </div>
          {sent ? (
            <div className="grid min-h-80 place-items-center rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center">
              <div>
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-500 text-white"><Check size={24} /></span>
                <h2 className="mt-4 text-2xl font-extrabold text-slate-900">Message received</h2>
                <p className="mt-2 text-slate-600">Our team will get back to you shortly.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-100 sm:grid-cols-2 sm:p-8">
              <label className="text-sm font-bold text-slate-700">Name<input required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500" /></label>
              <label className="text-sm font-bold text-slate-700">Work email<input required type="email" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500" /></label>
              <label className="text-sm font-bold text-slate-700 sm:col-span-2">Company name<input required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500" /></label>
              <label className="text-sm font-bold text-slate-700 sm:col-span-2">How can we help?<textarea required rows={5} className="mt-2 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500" /></label>
              <button type="submit" className="rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white sm:col-span-2">Send message</button>
            </form>
          )}
        </div>
      </section>
    </PageShell>
  )
}

function AuthPage({ mode }: { mode: 'login' | 'register' }) {
  const [selectedRole, setSelectedRole] = useState<RoleId>('company_admin')
  const [message, setMessage] = useState('')
  const isRegister = mode === 'register'
  const { enterPreview } = useDemoSession()
  const navigate = useNavigate()

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isRegister) {
      setMessage('Company registration is not connected yet. No account has been created.')
      return
    }

    if (!import.meta.env.DEV) {
      setMessage('Authentication is not connected. No login was attempted.')
      return
    }

    enterPreview(selectedRole)
    navigate('/workspace')
  }

  return (
    <div className="grid min-h-screen bg-slate-50 lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-slate-950 p-12 text-white lg:flex">
        <Brand inverse />
        <div className="max-w-lg">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-300">Easyhire HR</p>
          <h1 className="mt-4 text-5xl font-extrabold leading-tight">One platform for every employee and every company.</h1>
        </div>
        <p className="text-sm text-slate-400">Secure multi-tenant HR management</p>
      </div>
      <main className="flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden"><Brand /></div>
          <h1 className="text-3xl font-extrabold text-slate-950">{isRegister ? 'Create your company workspace' : 'Welcome back'}</h1>
          <p className="mt-2 text-slate-500">{isRegister ? 'Start your Easyhire HR subscription.' : import.meta.env.DEV ? 'Preview the workspace for a role.' : 'Sign-in is not available yet.'}</p>
          <form className="mt-8 space-y-5" onSubmit={submit}>
            {isRegister && (
              <>
                <label className="block text-sm font-bold text-slate-700">Company name<input required className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-500" /></label>
                <label className="block text-sm font-bold text-slate-700">Full name<input required className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-500" /></label>
              </>
            )}
            {isRegister ? (
              <>
                <label className="block text-sm font-bold text-slate-700">Work email<input required type="email" className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-500" /></label>
                <label className="block text-sm font-bold text-slate-700">Password<input required type="password" className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-500" /></label>
              </>
            ) : import.meta.env.DEV ? (
              <>
                <div role="note" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                  Demo preview only. This does not verify credentials or authenticate an account.
                </div>
                <label className="block text-sm font-bold text-slate-700">
                  Preview role
                  <select
                    value={selectedRole}
                    onChange={(event) => {
                      if (isRoleId(event.target.value)) {
                        setSelectedRole(event.target.value)
                      }
                    }}
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-500"
                  >
                    {roleOptions.map((option) => (
                      <option key={option.id} value={option.id}>{option.label}</option>
                    ))}
                  </select>
                </label>
              </>
            ) : (
              <div role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                Authentication is not connected. Connect the backend sign-in service before enabling this page.
              </div>
            )}
            {message && <p role="status" className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">{message}</p>}
            <button
              type="submit"
              disabled={!isRegister && !import.meta.env.DEV}
              className="w-full rounded-xl bg-indigo-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none"
            >
              {isRegister ? 'Continue to plans' : import.meta.env.DEV ? 'Open demo workspace' : 'Sign-in unavailable'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500">
            {isRegister ? 'Already have an account?' : 'New to Easyhire HR?'}{' '}
            <Link to={isRegister ? '/login' : '/register'} className="font-bold text-indigo-600">{isRegister ? 'Log in' : 'Register company'}</Link>
          </p>
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/register" element={<AuthPage mode="register" />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/workspace" element={<WorkspaceLayout />}>
        <Route index element={<WorkspaceDashboard />} />
        <Route path=":sectionId" element={<WorkspaceModulePreview />} />
      </Route>
    </Routes>
  )
}

export default App
