import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatMenuModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatSidenavModule,
  MatInputModule,
  MatDatepickerModule,
  MatRadioModule,
  MatNativeDateModule,
  MatListModule,
  MatDividerModule,
  MatSelectModule,
  MatOptionModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatTableModule,
  MatPaginatorModule, MatCardModule, MatSpinner,
} from "@angular/material";
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    HomeComponent,
    EmployeeListComponent,
    LoginComponent,
    AdminComponent,
    MatSpinner


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    HttpClientModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserTransferStateModule,
    MatListModule,
    MatDividerModule,
    MatSelectModule,
    MatOptionModule,
    MatSelectCountryModule,
    Ng2SearchPipeModule,
    MatToolbarModule,
    MatCheckboxModule,
      MatTableModule,
      MatDatepickerModule,
      MatPaginatorModule,
      MatCardModule,



],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
