export type RoleId =
  | 'platform_admin'
  | 'company_admin'
  | 'hr_manager'
  | 'manager'
  | 'finance'
  | 'employee'

export type NavigationIcon =
  | 'dashboard'
  | 'companies'
  | 'users'
  | 'jobs'
  | 'attendance'
  | 'leave'
  | 'payroll'
  | 'reports'
  | 'settings'
  | 'profile'

export interface WorkspaceNavigationItem {
  id: string
  label: string
  icon: NavigationIcon
}

export interface WorkspaceRole {
  label: string
  scope: string
  navigation: WorkspaceNavigationItem[]
}

const dashboard: WorkspaceNavigationItem = {
  id: 'dashboard',
  label: 'Overview',
  icon: 'dashboard',
}

export const workspaceRoles: Record<RoleId, WorkspaceRole> = {
  platform_admin: {
    label: 'Platform admin',
    scope: 'Platform',
    navigation: [
      dashboard,
      { id: 'companies', label: 'Companies', icon: 'companies' },
      { id: 'subscriptions', label: 'Subscriptions', icon: 'reports' },
      { id: 'users', label: 'Platform users', icon: 'users' },
      { id: 'settings', label: 'Settings', icon: 'settings' },
    ],
  },
  company_admin: {
    label: 'Company admin',
    scope: 'Acme Studio',
    navigation: [
      dashboard,
      { id: 'employees', label: 'Employees', icon: 'users' },
      { id: 'recruitment', label: 'Recruitment', icon: 'jobs' },
      { id: 'attendance', label: 'Attendance', icon: 'attendance' },
      { id: 'leave', label: 'Leave', icon: 'leave' },
      { id: 'payroll', label: 'Payroll', icon: 'payroll' },
      { id: 'reports', label: 'Reports', icon: 'reports' },
      { id: 'settings', label: 'Settings', icon: 'settings' },
    ],
  },
  hr_manager: {
    label: 'HR manager',
    scope: 'Acme Studio',
    navigation: [
      dashboard,
      { id: 'employees', label: 'Employees', icon: 'users' },
      { id: 'recruitment', label: 'Recruitment', icon: 'jobs' },
      { id: 'attendance', label: 'Attendance', icon: 'attendance' },
      { id: 'leave', label: 'Leave', icon: 'leave' },
      { id: 'reports', label: 'Reports', icon: 'reports' },
    ],
  },
  manager: {
    label: 'Manager',
    scope: 'Acme Studio',
    navigation: [
      dashboard,
      { id: 'team', label: 'My team', icon: 'users' },
      { id: 'attendance', label: 'Attendance', icon: 'attendance' },
      { id: 'leave-approvals', label: 'Leave approvals', icon: 'leave' },
    ],
  },
  finance: {
    label: 'Finance',
    scope: 'Acme Studio',
    navigation: [
      dashboard,
      { id: 'payroll', label: 'Payroll', icon: 'payroll' },
      { id: 'reports', label: 'Reports', icon: 'reports' },
    ],
  },
  employee: {
    label: 'Employee',
    scope: 'Acme Studio',
    navigation: [
      dashboard,
      { id: 'profile', label: 'My profile', icon: 'profile' },
      { id: 'attendance', label: 'My attendance', icon: 'attendance' },
      { id: 'leave', label: 'My leave', icon: 'leave' },
    ],
  },
}

const roleIds = [
  'platform_admin',
  'company_admin',
  'hr_manager',
  'manager',
  'finance',
  'employee',
] satisfies RoleId[]

export const roleOptions = roleIds.map((id) => ({
  id,
  label: workspaceRoles[id].label,
}))

export function isRoleId(value: string): value is RoleId {
  return Object.hasOwn(workspaceRoles, value)
}
