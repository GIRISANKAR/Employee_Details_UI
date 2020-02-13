import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpHeaders} from "@angular/common/http";
import {HttpParams} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  addEmployee(employee): Observable<object> {
    return this.http.post(this.baseUrl + "/addEmployee/", employee,
      {headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }


  getEmployeeList(): Observable< any > {
    return this.http.get(`${this.baseUrl}/availableEmployeeList`);
  }


  deleteEmployee(empId): Observable<object> {
    let params = new HttpParams().set('employeeId',empId);
    return this.http.post(this.baseUrl + "/deleteEmployee/", params);
  }

}
