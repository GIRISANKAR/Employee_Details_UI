import {Component, OnInit} from '@angular/core';
import {EmployeeServiceService} from "../service/employee-service.service";
import {FormBuilder, FormGroup, FormArray, Validators} from "@angular/forms";
import { employee} from "./employee";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  addEmployeeForm: FormGroup;
  projectList : any[];
  submitted = false;
  skillNames: any[];
  resp;


  constructor(public fb: FormBuilder, private employeeService: EmployeeServiceService, private activatedRoute: ActivatedRoute, private router: Router) {

    this.reactiveForm();

    this.activatedRoute.queryParams.subscribe(params => {
      if (params['employee']) {
        let emp = JSON.parse(params['employee']);
        this.addEmployeeForm.patchValue({
          empId: emp.empId,
          empName: emp.empName,
          designation: emp.designation,
          personalDetailsId: emp.personalDetailsId,
          primaryWorkLocation: emp.primaryWorkLocation,
          htcExperience: emp.htcExperience,
          overallExperience: emp.overallExperience,
          primarySkills: emp.primarySkills,
          officialEmailAddr: emp.officialEmailAddr,
          emailAddr: emp.emailAddr,
          extensionNumber: emp.extensionNumber,
          mobileNumber: emp.mobileNumber,
          alternativeMobileNumber: emp.alternativeMobileNumber,
          addressId: emp.addressId,
          addressLine: emp.addressLine,
          city: emp.city,
          state: emp.state,
          country: emp.country,
          pincode: emp.pincode
        })
        emp.skills.forEach(skill => {
          this.skillsArray().push(this.bindSkill(skill));
        })
        emp.projects.forEach(project => {
          this.projectsArray().push(this.bindProject(project));
        })

        this.addEmployeeForm;
      }
    })
  }

  ngOnInit() {
      this.getProjectList();
      this.getSkillSetNames();
  }


  reactiveForm() {
    this.addEmployeeForm = this.fb.group({
      empId: ['', [Validators.required]],
      empName: ['', [Validators.required, Validators.maxLength(100)]],
      designation: ['', Validators.required],
      primaryWorkLocation: ['', Validators.required],
      htcExperience: ['', Validators.required],
      overallExperience: ['', Validators.required],
      primarySkills: ['', Validators.required],
      personalDetailsId: [''],
      officialEmailAddr: ['', [Validators.required, Validators.email]],
      emailAddr: ['', [Validators.required, Validators.email]],
      extensionNumber: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      alternativeMobileNumber: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      addressId: [''],
      addressLine: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pincode: [null, [Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
      skills: this.fb.array([]),
      projects: this.fb.array([])
    })
  }

  get fval() {
    return this.addEmployeeForm.controls;
  }

  skillsArray(): FormArray {
    return this.addEmployeeForm.get('skills') as FormArray;
  }


  newSkill(): FormGroup {
    return this.fb.group({
      skillId: [''],
      skillName: [''],
      experience: [null],
    })
  }

  bindSkill(skill): FormGroup {
    return this.fb.group({
      skillId: [skill.skillId],
      skillName: [skill.skillName],
      experience: [skill.experience],
    })
  }

  addSkill() {
    this.skillsArray().push(this.newSkill());
  }

  removeSkill(i: number) {
    this.skillsArray().removeAt(i);
  }

  projectsArray(): FormArray {
    return this.addEmployeeForm.get('projects') as FormArray;
  }


  newProject(): FormGroup {
    return this.fb.group({
      employeeProjectId: [''],
      projectId: [''],
      projectName: [''],
      reportingTo: [''],
      location: [''],
      startDate: [''],
      endDate: [''],
      active: ['']
    })
  }

  bindProject(project): FormGroup {
    return this.fb.group({
      employeeProjectId: [project.employeeProjectId],
      projectId: [project.projectId],
      reportingTo: [project.reportingTo],
      location: [project.location],
      startDate: [project.startDate],
      endDate: [project.endDate],
      active: [project.active]
    })
  }

  addProject() {
    this.projectsArray().push(this.newProject());
  }

  removeProject(i: number) {
    this.projectsArray().removeAt(i);
  }

  onSubmit(addEmployee) {
    this.resp = '';
    this.submitted = true;
    if(this.addEmployeeForm.invalid) {
      return;
    }
    this.employeeService.addEmployee(this.addEmployeeForm.value)
        .subscribe(resp => {
          if(resp.status === true){
            alert(resp.message);

          }
          else{
            alert(resp.message)
          }
        });
    this.router.navigateByUrl("employeeDetails");

  }

  countrySelect(event) {
    this.addEmployeeForm.patchValue({
      country: event.name
    });
  }

    getProjectList() {
        this.employeeService.getProjectList().subscribe(data => {
            this.projectList = data;
        });
    }

  getSkillSetNames() : void{

    this.employeeService.getSkillNames().subscribe(data =>{
        this.skillNames = data;
    });
  }
}



