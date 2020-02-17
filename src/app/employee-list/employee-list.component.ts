
import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {EmployeeServiceService} from "../service/employee-service.service";
import {EmployeeList} from "./employee-list";
import {NavigationExtras, Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material";

declare var $: any;

@Component({
  selector: 'app-employee-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList: Observable<EmployeeList[]>;
  employeeObject: [];

  displayedColumns: string[] = ['empId', 'empName', 'designation', 'primaryWorkLocation'];
  dataSource = new MatTableDataSource<EmployeeListComponent>();

  constructor(private employeeService: EmployeeServiceService, private router: Router) {
  }

  /*applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
*/

getEmployeeList() {
    this.employeeService.getEmployeeList().subscribe(data => {
      this.employeeList = data;
    });
  }

  toggleModel(employee) {
    this.employeeObject = employee;
    $("#myModal").modal("show")
  }

  editEmployee(employee) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "employee": JSON.stringify(employee)
      }
    };
    this.router.navigate(['employeeDetails'], navigationExtras)
  }

  deleteEmployee(employee) {
    this.employeeService.deleteEmployee(employee.empId).subscribe(data => {
      this.getEmployeeList();
    });

  }

  deleteModel(employee) {
    this.employeeObject = employee;
    $("#delete").modal("show")
  }

  ngOnInit() {
    this.getEmployeeList();
  }
}
/*
import {Component} from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

/!**
 * @title Basic use of `<table mat-table>`
 *!/
@Component({
  selector: 'app-employee-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent{
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
*/
