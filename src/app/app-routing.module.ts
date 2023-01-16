import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbidenComponent } from './forbiden/forbiden.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PersonalDetailComponent } from './personal/personal-detail/personal-detail.component';
import { PersonalComponent } from './personal/personal.component';

const routes: Routes = [
  { path: "", component: HomeComponent, data: { active: "home" }, },
  { path: "personal", component: PersonalComponent, data: { active: "personal" }, },
  { path: "personal/detail/:id", component: PersonalDetailComponent, data: { active: "personal" }, },
  
  { path: "forbiden", component: ForbidenComponent, data: { active: "" }, },
  { path: "nofound", component: NotfoundComponent, data: { active: "" }, },
  { path: "**", component: NotfoundComponent, data: { active: "404" } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
