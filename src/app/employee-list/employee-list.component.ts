
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
  employeeList = new MatTableDataSource<EmployeeListComponent>();
  employeeObject: any[];

  displayedColumns: string[] = ['empId', 'empName', 'designation', 'primaryWorkLocation','overallExperience'];
  //dataSource = new MatTableDataSource<EmployeeListComponent>();

  constructor(private employeeService: EmployeeServiceService, private router: Router) {
  }

 /* applyFilter(filterValue: string) {
    let filter = {
      empId: filterValue.trim().toLowerCase(),
      empName: filterValue.trim().toLowerCase(),
      topFilter: true
    }
    this.employeeList.filter = JSON.stringify(filter)
  }
*/

  applyFilter(filterValue: string, column) {
    empId : filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.employeeList.filter = filterValue;
  }

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
  /*  this.employeeList.filterPredicate =
        (data: EmployeeListComponent, filtersJson: string) => {
          const matchFilter = [];
          const filters = JSON.parse(filtersJson);

          filters.forEach(filter => {
            const val = data[filter.id] === null ? '' : data[filter.id];
            matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
          });
          return matchFilter.every(Boolean);
        };*/
  }
}
