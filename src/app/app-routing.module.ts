import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmploymentDetailComponent } from './employment/employment-detail/employment-detail.component';
import { EmploymentComponent } from './employment/employment.component';
import { ForbidenComponent } from './forbiden/forbiden.component';
import { BpjsSettingComponent } from './global-masterdata/bpjs-setting/bpjs-setting.component';
import { GlobalMasterdataComponent } from './global-masterdata/global-masterdata.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoadDetailComponent } from './loan/load-detail/load-detail.component';
import { LoanComponent } from './loan/loan.component';
import { LoginComponent } from './login/login.component';
import { ReloginComponent } from './login/relogin/relogin.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { OrganizationComponent } from './organization/organization.component';
import { PayrollDetailComponent } from './payroll/payroll-detail/payroll-detail.component';
import { PayrollSettingComponent } from './payroll/payroll-setting/payroll-setting.component';
import { PayrollComponent } from './payroll/payroll.component';
import { Pph21SettingComponent } from './payroll/pph21-setting/pph21-setting.component';
import { PersonalDetailComponent } from './personal/personal-detail/personal-detail.component';
import { PersonalComponent } from './personal/personal.component';
import { ReimbursementAddComponent } from './reimbursement/reimbursement-add/reimbursement-add.component';
import { ReimbursementDetailComponent } from './reimbursement/reimbursement-detail/reimbursement-detail.component';
import { ReimbursementHistoryComponent } from './reimbursement/reimbursement-history/reimbursement-history.component';
import { ReimbursementComponent } from './reimbursement/reimbursement.component';
import { TimeManagementEditComponent } from './time-management/time-management-edit/time-management-edit.component';
import { TimeManagementImportComponent } from './time-management/time-management-import/time-management-import.component';
import { TimeManagementReportsComponent } from './time-management/time-management-reports/time-management-reports.component';
import { TimeManagementComponent } from './time-management/time-management.component';

const routes: Routes = [
  { path: "", component: LoginComponent, data: { active: "login" }, },

  { path: "login", component: LoginComponent, data: { active: "login" }, },
  { path: "login/relogin", component: ReloginComponent, data: { active: "login" }, },

  { path: "employee", component: EmployeeComponent, data: { active: "_masterData" }, canActivate:[AuthGuard] },
  { path: "employee/detail/:id", component: EmployeeDetailComponent, data: { active: "_masterData" },canActivate:[AuthGuard] },
  { path: "organization", component: OrganizationComponent, data: { active: "_masterData" }, canActivate:[AuthGuard]},
  { path: "personal/detail/:id", component: PersonalDetailComponent, data: { active: "_masterData" },canActivate:[AuthGuard] },
  { path: "employment/detail/:id", component: EmploymentDetailComponent, data: { active: "_masterData" },canActivate:[AuthGuard] },
  { path: "payroll/detail/:id", component: PayrollDetailComponent, data: { active: "_masterData" }, canActivate:[AuthGuard]},
  { path: "globalMasterData", component: GlobalMasterdataComponent, data: { active: "_masterData" }, canActivate:[AuthGuard]},
  { path: "bpjs/setting", component: BpjsSettingComponent, data: { active: "_masterData" }, canActivate:[AuthGuard]},




  { path: "timeManagement", component: TimeManagementComponent, data: { active: "_timeManagement" }, canActivate:[AuthGuard]},
  { path: "timeManagement/edit/:id", component: TimeManagementEditComponent, data: { active: "_timeManagement" }, canActivate:[AuthGuard]},
  { path: "timeManagement/reports", component: TimeManagementReportsComponent, data: { active: "_timeManagement" }, canActivate:[AuthGuard]},
  { path: "timeManagement/import", component: TimeManagementImportComponent, data: { active: "_timeManagement" }, canActivate:[AuthGuard]},

  { path: "reimbursement", component: ReimbursementComponent, data: { active: "_reimbursement" }, canActivate:[AuthGuard]},
  { path: "reimbursement/detail/:id", component: ReimbursementDetailComponent, data: { active: "_reimbursement" }, canActivate:[AuthGuard]},
  { path: "reimbursement/add", component: ReimbursementAddComponent, data: { active: "_reimbursement" },canActivate:[AuthGuard] },
  { path: "reimbursement/history", component: ReimbursementHistoryComponent, data: { active: "_reimbursement" }, canActivate:[AuthGuard]},

  { path: "loan", component: LoanComponent, data: { active: "_loan" },canActivate:[AuthGuard] },
  { path: "loan/detail/:id", component: LoadDetailComponent, data: { active: "_loan" },canActivate:[AuthGuard] },

  { path: "payroll/pph21-setting", component: Pph21SettingComponent, data: { active: "_payroll" },canActivate:[AuthGuard] },

  { path: "forbiden", component: ForbidenComponent, data: { active: "" },canActivate:[AuthGuard] },
  { path: "nofound", component: NotfoundComponent, data: { active: "" }, },
  { path: "**", component: NotfoundComponent, data: { active: "404" } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
