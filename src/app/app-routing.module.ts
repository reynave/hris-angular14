import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeContactComponent } from './employee/employee-contact/employee-contact.component';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmploymentDetailComponent } from './employment/employment-detail/employment-detail.component';
import { EmploymentComponent } from './employment/employment.component';
import { ForbidenComponent } from './forbiden/forbiden.component';
import { BpjsSettingComponent } from './global-masterdata/bpjs-setting/bpjs-setting.component';
import { GlobalMasterdataComponent } from './global-masterdata/global-masterdata.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeHistoryLoanLogComponent } from './home/home-history-loan/home-history-loan-log/home-history-loan-log.component';
import { HomeHistoryLoanComponent } from './home/home-history-loan/home-history-loan.component';
import { HomeHistoryReimbursementComponent } from './home/home-history-reimbursement/home-history-reimbursement.component';
import { HomeLoanDetailComponent } from './home/home-loan-detail/home-loan-detail.component';
import { HomeComponent } from './home/home.component'; 
import { LoanAddComponent } from './loan/loan-add/loan-add.component';
import { LoanApproveLineComponent } from './loan/loan-approve-line/loan-approve-line.component';
import { LoanDetailComponent } from './loan/loan-detail/loan-detail.component';
import { LoanHistoryComponent } from './loan/loan-history/loan-history.component';
import { LoanComponent } from './loan/loan.component';
import { LoginComponent } from './login/login.component';
import { ReloginComponent } from './login/relogin/relogin.component';  
import { MaintenanceDetailComponent } from './maintenance/maintenance-detail/maintenance-detail.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { OrganizationComponent } from './organization/organization.component';
import { PayrollDetailComponent } from './payroll/payroll-detail/payroll-detail.component';
import { PayrollSettingComponent } from './payroll/payroll-setting/payroll-setting.component';
import { PayrollComponent } from './payroll/payroll.component';
import { Pph21SettingComponent } from './payroll/pph21-setting/pph21-setting.component';
import { SalaryDetailReportComponent } from './payroll/salary/salary-detail-report/salary-detail-report.component';
import { SalaryDetailComponent } from './payroll/salary/salary-detail/salary-detail.component';
import { SalaryComponent } from './payroll/salary/salary.component';
import { PersonalDetailComponent } from './personal/personal-detail/personal-detail.component';
import { PersonalComponent } from './personal/personal.component';
import { ReimbursementAddComponent } from './reimbursement/reimbursement-add/reimbursement-add.component';
import { ReimbursementDetailComponent } from './reimbursement/reimbursement-detail/reimbursement-detail.component';
import { ReimbursementHistoryComponent } from './reimbursement/reimbursement-history/reimbursement-history.component';
import { ReimbursementRequestComponent } from './reimbursement/reimbursement-request/reimbursement-request.component';
import { ReimbursementComponent } from './reimbursement/reimbursement.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { TemplateComponent } from './template/template.component';
import { TimeManagementEditComponent } from './time-management/time-management-edit/time-management-edit.component';
import { TimeManagementImportComponent } from './time-management/time-management-import/time-management-import.component';
import { TimeManagementReportsComponent } from './time-management/time-management-reports/time-management-reports.component';
import { TimeManagementComponent } from './time-management/time-management.component';
import { MaintenanceMasterComponent } from './maintenance/maintenance-master/maintenance-master.component';
import { SalaryDetailPrintingComponent } from './payroll/salary/salary-detail-printing/salary-detail-printing.component';
import { TunjanganComponent } from './tunjangan/tunjangan.component';
import { HomeTimeManagementComponent } from './home/home-time-management/home-time-management.component';
import { RequestHolidayComponent } from './home/request-holiday/request-holiday.component';
import { HolidayComponent } from './holiday/holiday.component';
import { RequestHolidayDetailComponent } from './holiday/request-holiday-detail/request-holiday-detail.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { InvetoryComponent } from './invetory/invetory.component';
import { SpComponent } from './sp/sp.component';
import { SpDetailComponent } from './sp/sp-detail/sp-detail.component';
import { InvetoryDetailComponent } from './invetory/invetory-detail/invetory-detail.component';
import { SaleryUploadComponent } from './payroll/salary/salery-upload/salery-upload.component';
import { SaleryDetailFixComponent } from './payroll/salary/salery-detail-fix/salery-detail-fix.component';
import { SdfDetailComponent } from './payroll/salary/salery-detail-fix/sdf-detail/sdf-detail.component';
import { PayrollFixComponent } from './payroll/payroll-fix/payroll-fix.component';

const routes: Routes = [
  { path: "", component: LoginComponent, data: { active: "login" }, },
  { path: "temp", component: TemplateComponent},
 
  { path: "login", component: LoginComponent, data: { active: "login" }, },
  { path: "login/relogin", component: ReloginComponent, data: { active: "login" }, },

  { path: "home", component: HomeComponent, data: { active: "_home" }, canActivate:[AuthGuard]  },
  { path: "home/requestHoliday", component: RequestHolidayComponent, data: { active: "_home" }, canActivate:[AuthGuard]  },

  { path: "home/reimbursement/detail/:id", component: ReimbursementDetailComponent, data: { active: "_home" }, canActivate:[AuthGuard]},
  { path: "home/reimbursement/add", component: ReimbursementAddComponent, data: { active: "_home" },canActivate:[AuthGuard] },
  { path: "home/reimbursement/history", component: HomeHistoryReimbursementComponent, data: { active: "_home" }, canActivate:[AuthGuard]  },
  { path: "home/loan/add", component: LoanAddComponent, data: { active: "_home" }, canActivate:[AuthGuard]  },
  { path: "home/loan/detail/:id", component: HomeLoanDetailComponent, data: { active: "_home" }, canActivate:[AuthGuard]  },
  { path: "home/loan/history", component: HomeHistoryLoanComponent, data: { active: "_home" }, canActivate:[AuthGuard]  },
  { path: "home/loan/history/log/:id", component: LoanDetailComponent, data: { active: "_home" },canActivate:[AuthGuard] },
  
  { path: "maintenance", component: MaintenanceComponent, data: { active: "_maintenance" },canActivate:[AuthGuard] },
  { path: "maintenance/master", component: MaintenanceMasterComponent, data: { active: "_maintenance" },canActivate:[AuthGuard] },
 
  { path: "maintenance/:id", component: MaintenanceDetailComponent, data: { active: "_maintenance" },canActivate:[AuthGuard] },
 
  { path: "schedule", component: ScheduleComponent, data: { active: "_maintenance" },canActivate:[AuthGuard] },
  { path: "announcement", component: AnnouncementComponent, data: { active: "_announcement" },canActivate:[AuthGuard] },
 
 
  { path: "invetory", component: InvetoryComponent , data: { active: "_invetory" }, canActivate:[AuthGuard] },
  { path: "invetory/detail", component: InvetoryDetailComponent , data: { active: "_invetory" }, canActivate:[AuthGuard] },
 
  { path: "sp", component: SpComponent , data: { active: "_sp" }, canActivate:[AuthGuard] },
  { path: "sp/detail", component: SpDetailComponent , data: { active: "_sp" }, canActivate:[AuthGuard] },
 

  { path: "employee", component: EmployeeComponent, data: { active: "_masterData" }, canActivate:[AuthGuard] },
  { path: "employee/detail/:id", component: EmployeeDetailComponent, data: { active: "_masterData" },canActivate:[AuthGuard] },
  { path: "employee/contract/:id", component: EmployeeContactComponent, data: { active: "_masterData" },canActivate:[AuthGuard] },
 
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
  { path: "holiday", component: HolidayComponent, data: { active: "_timeManagement" }, canActivate:[AuthGuard]},
  { path: "holiday/requestHolidayDetail", component: RequestHolidayDetailComponent, data: { active: "_timeManagement" }, canActivate:[AuthGuard]},

  { path: "reimbursement", component: ReimbursementComponent, data: { active: "_reimbursement" }, canActivate:[AuthGuard]},
  { path: "reimbursement/add", component: ReimbursementAddComponent, data: { active: "_reimbursement" },canActivate:[AuthGuard] },
  { path: "reimbursement/history", component: ReimbursementHistoryComponent, data: { active: "_reimbursement" }, canActivate:[AuthGuard]},
  { path: "reimbursement/request/:id", component: ReimbursementRequestComponent, data: { active: "_reimbursement" }, canActivate:[AuthGuard]},

  { path: "loan", component: LoanComponent, data: { active: "_loan" },canActivate:[AuthGuard] },
  { path: "loan/approveLine/:id", component: LoanApproveLineComponent, data: { active: "_loan" },canActivate:[AuthGuard] },
  { path: "loan/history", component: LoanHistoryComponent, data: { active: "_loan" },canActivate:[AuthGuard] },
  { path: "loan/detail/:id", component: LoanDetailComponent, data: { active: "_loan" },canActivate:[AuthGuard] },

  { path: "tunjangan", component: TunjanganComponent, data: { active: "_payroll" },canActivate:[AuthGuard] },
 

  { path: "payroll/pph21-setting", component: Pph21SettingComponent, data: { active: "_payroll" },canActivate:[AuthGuard] },
  { path: "payroll", component: PayrollComponent, data: { active: "_payroll" },canActivate:[AuthGuard] },
  { path: "payroll/fix", component: PayrollFixComponent, data: { active: "_payroll" },canActivate:[AuthGuard] },
 
  { path: "payroll/salary", component: SalaryComponent, data: { active: "_payroll" },canActivate:[AuthGuard] },
  { path: "payroll/salary/detail/:id", component: SalaryDetailComponent, data: { active: "_payroll" },canActivate:[AuthGuard] },


  { path: "payroll/salary/detailFix/:id", component: SaleryDetailFixComponent, data: { active: "_payroll" },canActivate:[AuthGuard] },
  { path: "payroll/salary/detailFix/:id/detail", component: SdfDetailComponent, data: { active: "_payroll" },canActivate:[AuthGuard] },
  
  { path: "payroll/salary/detail/report/:id", component: SalaryDetailReportComponent, data: { active: "_payroll" },canActivate:[AuthGuard] },
  { path: "payroll/salary/detail/printing/:id", component: SalaryDetailPrintingComponent, data: { active: "_payroll" },canActivate:[AuthGuard] },
  { path: "payroll/salary/upload", component: SaleryUploadComponent, data: { active: "_payroll" },canActivate:[AuthGuard] },

  { path: "forbiden", component: NotfoundComponent, data: { active: "" },canActivate:[AuthGuard] },
  { path: "nofound", component: NotfoundComponent, data: { active: "" }, },
  { path: "**", component: NotfoundComponent, data: { active: "404" } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
