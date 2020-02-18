import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeComponent} from "./employee/employee.component";
import {HomeComponent} from "./home/home.component";
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";
import {AuthGuard} from "./authentication/auth.guard";



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'home', component: HomeComponent},
  { path: 'employeeDetails', component: EmployeeComponent},
  {path: 'search', component: EmployeeListComponent},
  {path:'**', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent,canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
