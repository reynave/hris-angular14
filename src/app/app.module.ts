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
    LoanComponent, TimeManagementEditComponent
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
