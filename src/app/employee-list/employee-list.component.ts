
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {EmployeeServiceService} from "../service/employee-service.service";
import {EmployeeList} from "./employee-list";
import {NavigationExtras, Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, MatSort} from "@angular/material";

declare var $: any;

@Component({
  selector: 'app-employee-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, AfterViewInit  {
  employeeList = new MatTableDataSource<EmployeeListComponent>();
  employeeObject: any[];

  displayedColumns: string[] = ['empId','empName','primaryWorkLocation','update', 'delete'];
  //dataSource = new MatTableDataSource<EmployeeListComponent>();
 paginator: MatPaginator;
 sort: MatSort;

  constructor(private employeeService: EmployeeServiceService, private router: Router) {
  }

  doFilter = (value: string) => {
    this.employeeList.filter = value.trim().toLocaleLowerCase();
  }


  getEmployeeList() {
    this.employeeService.getEmployeeList().subscribe(data => {
      this.employeeList.data = data;
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

  public redirectToUpdate = (id: string) => {

  }

  public redirectToDelete = (id: string) => {

  }

  ngOnInit() {
    this.getEmployeeList();
    this.generateTable(this.employeeList);

  }


ngAfterViewInit(): void {
  this.employeeList.sort = this.sort;
this.employeeList.paginator = this.paginator;
}

/*applyColumnFilter() {

    this.employeeList.filterPredicate = function (data, filter: string): boolean {
        return data.empId.toLowerCase().includes(filter) || data.empName.toLowerCase().includes(filter) || data.primaryWorkLocation.toString().includes(filter);
    };
}*/
    generateTable(tableData: any) {
        this.employeeList = new MatTableDataSource(tableData);
        this.employeeList.paginator = this.paginator;
        this.employeeList.sort = this.sort;
        this.employeeList.filterPredicate = (data: any, filter: string) => {
            console.log(data);
            console.log(filter);
            let matchFound = false;
            for (let column of this.displayedColumns) {
                if(column in data) {
                    if(data[column]) {
                        matchFound = (matchFound || data[column].toString().trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1)
                    }
                }
            }
            return matchFound;
        }
    }
}


/*
applyFilter(filterValue: string, column) {
  filterValue : filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  let filtersJson = {id:column,value:filterValue}
  this.employeeList.filterPredicate = (data: EmployeeListComponent, filtersJson: string) => {
    const matchFilter = [];
    const filters = JSON.parse(filtersJson);
    const val = data[filters.id] === null ? '' : data[filters.id];
    matchFilter.push(val.toLowerCase().includes(filters.value.toLowerCase()));

    return matchFilter.every(Boolean);
  };
  //this.employeeList.filter = filtersJson;
}*/
