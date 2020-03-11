import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {EmployeeServiceService} from "../service/employee-service.service";
import {NavigationExtras, Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, MatPaginator} from "@angular/material";
import * as XLSX from 'xlsx';
import {FormControl} from "@angular/forms";



declare var $: any;

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {


    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild(MatPaginator, {static: true}) page: MatPaginator;
    @ViewChild('TABLE',{static:true}) table: ElementRef;
    employeeList = new MatTableDataSource<EmployeeListComponent>();
    employeeDetail= new MatTableDataSource<EmployeeListComponent>();
    employeeObject: any[];
    tableHeaders: string[] = ['empId', 'empName', 'projectName', 'primarySkills',
        'overallExperience', 'officialEmailAddr', 'primaryWorkLocation', 'update', 'delete'];
    columnList: string[] = ['empId', 'empName', 'projectName', 'primarySkills','overallExperience', 'officialEmailAddr',
        'primaryWorkLocation', 'emailAddr', 'extensionNumber', 'mobileNumber', 'htcExperience', 'addressLine','city', 'state', 'country'];
    columns = new FormControl();
    selectAllColumns :boolean;

    constructor(private employeeService: EmployeeServiceService, private router: Router) {
        this.selectAllColumns = false;
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
        this.employeeDetail = employee;
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
        this.employeeList.sort = this.sort;
        this.employeeList.paginator = this.page;

    }

    generateTable(tableData: string,column) {
       var obj ={id:column,value:tableData}
        this.employeeList.filterPredicate = (data: any, filter: string) => {
            let matchFound = false;
            let filters = JSON.parse(filter);

                    if (data[filters.id]) {
                        matchFound = (matchFound || data[filters.id].toString().trim().toLowerCase().indexOf(filters.value.trim().toLowerCase()) !== -1)
                    }
            return matchFound;
        }
        this.employeeList.filter=JSON.stringify(obj);
    }

    filterStartsWith(tableData: string,column) {
        var obj ={id:column,value:tableData}
        this.employeeList.filterPredicate = (data: any, filter: string) => {
            let matchFound = false;
            let filters = JSON.parse(filter);
            if (data[filters.id]) {
                matchFound = (matchFound || data[filters.id].toString().trim().toLowerCase().startsWith(filters.value.trim().toLowerCase()))
            }
            return matchFound;
        }
        this.employeeList.filter=JSON.stringify(obj);
    }

    experienceFilter(tableData: string,column) {
        var obj ={id:column,value:tableData}
        this.employeeList.filterPredicate = (data: any, filter: string) => {

            let matchFound = false;
            let filters = JSON.parse(filter);

            if (data[filters.id]) {
                matchFound = (matchFound || data[filters.id]>=(filters.value))
            }
            return matchFound;
        }
        this.employeeList.filter=JSON.stringify(obj);
    }

    exportExcel() {
        let empArray =[];
        this.employeeList.filteredData.forEach(filteredEmployee => {
            empArray.push(this.getRequiredFields(filteredEmployee));
        })
        const workSheet = XLSX.utils.json_to_sheet(empArray);
        const workBook: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
        XLSX.writeFile(workBook, 'filename.xlsx');
    }

    getRequiredFields(filteredEmployee){
        let columnArray=[];
        let json = {};
        this.columns.value.forEach(selectedColumns => {
           json[selectedColumns] = filteredEmployee[selectedColumns];
        })
        return json;
    }

    showExportFields(){
        $("#exportFields").modal("show")
    }

    selectAllColumnsToExport() {
        console.log('call',[this.selectAllColumns,this.columns]);
        if  (this.selectAllColumns === false) {
            this.columns = new FormControl();
            return;
        }else if (this.selectAllColumns === true) {
            this.columns = new FormControl();
            this.columns.setValue(this.columnList);
        }
    }
}

