import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeComponent} from "./employee/employee.component";
import {HomeComponent} from "./home/home.component";
import {EmployeeListComponent} from "./employee-list/employee-list.component";


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:'home', component: HomeComponent},
  { path: 'employeeDetails', component: EmployeeComponent},
  {path: 'search', component: EmployeeListComponent},
  {path:'**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
