import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { EmploymentDetailComponent } from './employment/employment-detail/employment-detail.component';
import { EmploymentComponent } from './employment/employment.component';
import { ForbidenComponent } from './forbiden/forbiden.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PayrollDetailComponent } from './payroll/payroll-detail/payroll-detail.component';
import { PayrollComponent } from './payroll/payroll.component';
import { PersonalDetailComponent } from './personal/personal-detail/personal-detail.component';
import { PersonalComponent } from './personal/personal.component';
import { TimeManagementEditComponent } from './time-management/time-management-edit/time-management-edit.component';
import { TimeManagementComponent } from './time-management/time-management.component';

const routes: Routes = [
  { path: "", component: EmployeeComponent, data: { active: "home" }, },
  { path: "employee", component: EmployeeComponent, data: { active: "home" }, },
 
  { path: "personal", component: PersonalComponent, data: { active: "master" }, },
  { path: "personal/detail/:id", component: PersonalDetailComponent, data: { active: "master" }, },
  { path: "employment", component: EmploymentComponent, data: { active: "master" }, },
  { path: "employment/detail/:id", component: EmploymentDetailComponent, data: { active: "master" }, },
  { path: "payroll", component: PayrollComponent, data: { active: "master" }, },
  { path: "payroll/detail/:id", component: PayrollDetailComponent, data: { active: "master" }, },
 
  { path: "timeManagement", component: TimeManagementComponent, data: { active: "timeManagement" }, },
  { path: "timeManagement/edit/:id", component: TimeManagementEditComponent, data: { active: "timeManagement" }, },
 

  { path: "forbiden", component: ForbidenComponent, data: { active: "" }, },
  { path: "nofound", component: NotfoundComponent, data: { active: "" }, },
  { path: "**", component: NotfoundComponent, data: { active: "404" } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
