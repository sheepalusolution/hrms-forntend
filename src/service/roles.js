export const ROLE_PERMISSIONS = {
  employee: [
    "dashboard",
    "attendance",
    "apply-leave",
    "report-submit",
    "report-review",
    "profile",
    "about",
    "payslip"
  ],

  recruiter: [
    "dashboard",
    "attendance",
    "report-submit",
    "candidates",
    "profile",
    "payslip"
  ],

  manager: [
    "dashboard",
    "attendance",
    "leave-request",
    "report-review",
    "profile",
    "payroll-processing",
    "payslip"
  ],

  "hr_admin": [
    "dashboard",
    "employees",
    "attendance",
    "leave-management",
    "report-review",
    "departments",
    "profile",
    "salary-mgmt",
    "payroll-processing",
    "payslip"
  ],

  financer: [
    "dashboard",
    "attendance",
    "finance",
    "profile",
    "salary-mgmt",
    "payroll-processing",
    "payslip"
  ],

  superadmin: ["*"]
};
