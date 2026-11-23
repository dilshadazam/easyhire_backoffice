import type { NavigationIcon, RoleId } from './roles'

export interface DemoMetric {
  label: string
  value: string
  detail: string
  icon: NavigationIcon
}

export interface DemoActivity {
  title: string
  detail: string
  time: string
  status: string
}

export interface DemoDashboard {
  welcomeName: string
  description: string
  metrics: DemoMetric[]
  activities: DemoActivity[]
}

export const demoDashboards: Record<RoleId, DemoDashboard> = {
  platform_admin: {
    welcomeName: 'Platform team',
    description: 'Here is a sample overview of companies and subscriptions across the platform.',
    metrics: [
      { label: 'Companies', value: '24', detail: '+3 this month', icon: 'companies' },
      { label: 'Active plans', value: '19', detail: '79% of workspaces', icon: 'reports' },
      { label: 'Platform users', value: '1,284', detail: 'Across all companies', icon: 'users' },
      { label: 'Renewals soon', value: '3', detail: 'Due in the next 7 days', icon: 'settings' },
    ],
    activities: [
      { title: 'NovaWorks joined the platform', detail: 'Growth plan · 42 employees', time: '10 min ago', status: 'New company' },
      { title: 'Brightlane upgraded its plan', detail: 'Starter to Growth', time: '1 hour ago', status: 'Plan updated' },
      { title: 'Subscription review needed', detail: 'Three renewals are due this week', time: 'Today', status: 'Action needed' },
    ],
  },
  company_admin: {
    welcomeName: 'Maya',
    description: 'A sample snapshot of your company team and current people operations.',
    metrics: [
      { label: 'Employees', value: '248', detail: '+8 this month', icon: 'users' },
      { label: 'On leave today', value: '12', detail: 'Across all departments', icon: 'leave' },
      { label: 'Open positions', value: '9', detail: '4 in final interviews', icon: 'jobs' },
      { label: 'Payroll this month', value: '₹84.6L', detail: 'Ready for review', icon: 'payroll' },
    ],
    activities: [
      { title: 'Leave request from Priya Nair', detail: 'Product · 2 days · 12–13 Dec', time: '12 min ago', status: 'Needs review' },
      { title: 'Aarav Shah completed onboarding', detail: 'Engineering · Started today', time: '1 hour ago', status: 'Completed' },
      { title: 'November payroll is ready', detail: '248 employees · Review before approval', time: 'Today', status: 'Ready' },
    ],
  },
  hr_manager: {
    welcomeName: 'Jordan',
    description: 'A sample view of recruitment, onboarding and employee requests for your HR team.',
    metrics: [
      { label: 'Active employees', value: '248', detail: 'Across 8 departments', icon: 'users' },
      { label: 'Candidates', value: '36', detail: 'In active pipelines', icon: 'jobs' },
      { label: 'Onboarding', value: '5', detail: 'Joining this month', icon: 'profile' },
      { label: 'Leave requests', value: '12', detail: 'Waiting for review', icon: 'leave' },
    ],
    activities: [
      { title: 'New candidate applied', detail: 'Senior Product Designer · Riya Kapoor', time: '18 min ago', status: 'New applicant' },
      { title: 'Onboarding checklist updated', detail: 'Aarav Shah · Engineering', time: '1 hour ago', status: 'In progress' },
      { title: 'Leave requests need review', detail: '12 requests across 5 teams', time: 'Today', status: 'Needs review' },
    ],
  },
  manager: {
    welcomeName: 'Alex',
    description: 'A sample view of your team attendance and approvals that need your attention.',
    metrics: [
      { label: 'Direct reports', value: '12', detail: 'Across 2 projects', icon: 'users' },
      { label: 'Present today', value: '10 / 12', detail: '2 team members away', icon: 'attendance' },
      { label: 'Leave approvals', value: '3', detail: 'Awaiting your decision', icon: 'leave' },
      { label: 'Upcoming time off', value: '2', detail: 'In the next 7 days', icon: 'reports' },
    ],
    activities: [
      { title: 'Leave request from Sam Patel', detail: '2 days · 14–15 Dec', time: '20 min ago', status: 'Needs approval' },
      { title: 'Team attendance updated', detail: '10 of 12 checked in today', time: '9:15 AM', status: 'Updated' },
      { title: 'Upcoming time off', detail: 'Nina and Ravi are away next week', time: 'Yesterday', status: 'For awareness' },
    ],
  },
  finance: {
    welcomeName: 'Taylor',
    description: 'A sample payroll and reimbursement snapshot for your finance workspace.',
    metrics: [
      { label: 'Payroll total', value: '₹84.6L', detail: 'November payroll', icon: 'payroll' },
      { label: 'Employees to pay', value: '248', detail: 'Across 8 departments', icon: 'users' },
      { label: 'Reimbursements', value: '8', detail: 'Awaiting review', icon: 'reports' },
      { label: 'Payroll progress', value: '92%', detail: 'Ready for approval', icon: 'attendance' },
    ],
    activities: [
      { title: 'Payroll review is ready', detail: 'November · 248 employee records', time: '30 min ago', status: 'Needs review' },
      { title: 'Reimbursement submitted', detail: 'Sam Patel · Travel · ₹8,450', time: '2 hours ago', status: 'Pending' },
      { title: 'Salary adjustment approved', detail: 'Engineering · Effective 1 Dec', time: 'Yesterday', status: 'Approved' },
    ],
  },
  employee: {
    welcomeName: 'Riya',
    description: 'A sample snapshot of your attendance, leave balance and upcoming pay day.',
    metrics: [
      { label: 'Leave balance', value: '14 days', detail: 'Annual leave available', icon: 'leave' },
      { label: 'Attendance', value: '96.2%', detail: 'This month', icon: 'attendance' },
      { label: 'Next payday', value: '30 Nov', detail: 'In 7 days', icon: 'payroll' },
      { label: 'My requests', value: '1', detail: 'Waiting for approval', icon: 'profile' },
    ],
    activities: [
      { title: 'Leave request submitted', detail: 'Annual leave · 2 days · 12–13 Dec', time: 'Yesterday', status: 'Pending' },
      { title: 'Attendance checked in', detail: 'Today · 9:02 AM', time: 'Today', status: 'Recorded' },
      { title: 'Payslip available', detail: 'October payslip is ready to view', time: '2 days ago', status: 'Available' },
    ],
  },
}
