import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpHeaders} from "@angular/common/http";
import {HttpParams} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  private baseUrl = 'http://localhost:8081';


  paramName="skills";
  constructor(private http: HttpClient) {
  }

  addEmployee(employee): Observable<any> {
    return this.http.post(this.baseUrl + "/addEmployee/", employee,
      {responseType: 'json'});
  }
  addProject(project): Observable<any> {
    return this.http.post(this.baseUrl + "/addProject/", project,
        {responseType: 'json'});
  }

  addSkill(skillName): Observable<any> {
    let params = new HttpParams().set('systemParameterRequest',skillName);
    return this.http.post(this.baseUrl + "/addSkill/", params);
  }

  getEmployeeList(): Observable< any > {
    return this.http.get(`${this.baseUrl}/availableEmployeeList`);
  }


  deleteEmployee(empId): Observable<any> {
    let params = new HttpParams().set('employeeId',empId);
    return this.http.post(this.baseUrl + "/deleteEmployee/", params);
  }

  getSkillNames(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getSkillNames`);
  }



  getProjectList(): Observable< any > {
    return this.http.get(`${this.baseUrl}/getProjectList`);
  }
}
