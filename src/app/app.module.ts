import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyMaskInputMode, NgxCurrencyModule } from "ngx-currency";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PersonalComponent } from './personal/personal.component';
import { ForbidenComponent } from './forbiden/forbiden.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { PersonalDetailComponent } from './personal/personal-detail/personal-detail.component';
import { DataTablesModule } from "angular-datatables";
import { EmploymentComponent } from './employment/employment.component';
import { PayrollComponent } from './payroll/payroll.component';
import { EmploymentDetailComponent } from './employment/employment-detail/employment-detail.component';
import { PayrollDetailComponent } from './payroll/payroll-detail/payroll-detail.component';
import { EmployeeComponent } from './employee/employee.component';
import { TimeManagementComponent } from './time-management/time-management.component';
import { ReimbursementComponent } from './reimbursement/reimbursement.component';
import { LoanComponent } from './loan/loan.component';
import { TimeManagementEditComponent } from './time-management/time-management-edit/time-management-edit.component';
import { ReimbursementAddComponent } from './reimbursement/reimbursement-add/reimbursement-add.component';
import { ReimbursementDetailComponent } from './reimbursement/reimbursement-detail/reimbursement-detail.component';
import { ReimbursementHistoryComponent } from './reimbursement/reimbursement-history/reimbursement-history.component';

import { TimeManagementReportsComponent } from './time-management/time-management-reports/time-management-reports.component';

import { TimeManagementImportComponent } from './time-management/time-management-import/time-management-import.component';
import { OrganizationComponent } from './organization/organization.component';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
import { ReloginComponent } from './login/relogin/relogin.component';
import { GlobalMasterdataComponent } from './global-masterdata/global-masterdata.component';
import { PayrollSettingComponent } from './payroll/payroll-setting/payroll-setting.component';
import { Pph21SettingComponent } from './payroll/pph21-setting/pph21-setting.component';
import { BpjsSettingComponent } from './global-masterdata/bpjs-setting/bpjs-setting.component';
import { ReimbursementDatatablesComponent } from './reimbursement/reimbursement-datatables/reimbursement-datatables.component';
import { HomeHistoryReimbursementComponent } from './home/home-history-reimbursement/home-history-reimbursement.component';
import { ReimbursementRequestComponent } from './reimbursement/reimbursement-request/reimbursement-request.component';
import { LoanAddComponent } from './loan/loan-add/loan-add.component';
import { LoanDetailComponent } from './loan/loan-detail/loan-detail.component';
import { HomeHistoryLoanComponent } from './home/home-history-loan/home-history-loan.component';
import { HomeHistoryLoanLogComponent } from './home/home-history-loan/home-history-loan-log/home-history-loan-log.component';
import { HomeLoanDetailComponent } from './home/home-loan-detail/home-loan-detail.component';
import { LoanApproveLineComponent } from './loan/loan-approve-line/loan-approve-line.component';
import { LoanHistoryComponent } from './loan/loan-history/loan-history.component';
import { SalaryComponent } from './payroll/salary/salary.component';
import { SalaryDetailComponent } from './payroll/salary/salary-detail/salary-detail.component';
import { SalaryDetailReportComponent } from './payroll/salary/salary-detail-report/salary-detail-report.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { MaintenanceDetailComponent } from './maintenance/maintenance-detail/maintenance-detail.component';
import { TemplateComponent } from './template/template.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { EmployeeContactComponent } from './employee/employee-contact/employee-contact.component';
import { MaintenanceMasterComponent } from './maintenance/maintenance-master/maintenance-master.component';
import { SalaryDetailPrintingComponent } from './payroll/salary/salary-detail-printing/salary-detail-printing.component';
import { TunjanganComponent } from './tunjangan/tunjangan.component';


export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 0,
  prefix: "Rp ",
  suffix: "",
  thousands: ".",
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};


@NgModule({
  declarations: [
    AppComponent,
    PersonalComponent,
    ForbidenComponent,
    NotfoundComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    PersonalDetailComponent,
    EmploymentComponent,
    PayrollComponent,
    EmploymentDetailComponent,
    PayrollDetailComponent,
    EmployeeComponent,
    TimeManagementComponent,
    ReimbursementComponent,
    LoanComponent, TimeManagementEditComponent, ReimbursementAddComponent,
    ReimbursementDetailComponent, ReimbursementHistoryComponent,
    TimeManagementReportsComponent, TimeManagementImportComponent, OrganizationComponent,
    EmployeeDetailComponent, ReloginComponent, GlobalMasterdataComponent, PayrollSettingComponent,
    Pph21SettingComponent, BpjsSettingComponent, ReimbursementDatatablesComponent, HomeHistoryReimbursementComponent,
    ReimbursementRequestComponent, LoanAddComponent, LoanDetailComponent, HomeHistoryLoanComponent,
    HomeHistoryLoanLogComponent, HomeLoanDetailComponent, LoanApproveLineComponent, LoanHistoryComponent,
    SalaryComponent, SalaryDetailComponent, SalaryDetailReportComponent, MaintenanceComponent, MaintenanceDetailComponent, TemplateComponent, 
    ScheduleComponent, EmployeeContactComponent, 
    MaintenanceMasterComponent, SalaryDetailPrintingComponent, TunjanganComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
