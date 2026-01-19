export const ROLE_PERMISSIONS = {
  employee: [
    "dashboard",
    "attendance",
    "apply-leave",
    "report-submit",
    "report-review",
    "profile",
    "about"
  ],

  recruiter: [
    "dashboard",
    "attendance",
    "report-submit",
    "candidates",
    "profile"
  ],

  manager: [
    "dashboard",
    "attendance",
    "leave-request",
    "report-review",
    "profile"
  ],

  "hr-admin": [
    "dashboard",
    "employees",
    "attendance",
    "leave-management",
    "report-review",
    "departments",
    "profile"
  ],

  financer: [
    "dashboard",
    "attendance",
    "finance",
    "payroll",
    "profile",
    "attendance"
  ],

  sysadmin: ["*"]
};
