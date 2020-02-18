import {Component, OnInit} from '@angular/core';
import {EmployeeServiceService} from "../service/employee-service.service";
import {FormBuilder, FormGroup, FormArray, Validators} from "@angular/forms";
import { employee} from "./employee";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  disabled = false;
  panelOpenState = false;
  addEmployeeForm: FormGroup;
  submitted = false;
  startDate = new Date();
  endDate = new Date();
  constructor(public fb: FormBuilder,private employeeService: EmployeeServiceService,private activatedRoute: ActivatedRoute,private  route:Router,
  private location: Location){

    this.reactiveForm();

    this.activatedRoute.queryParams.subscribe(params => {
      if (params['employee']) {
          let emp = JSON.parse(params['employee']);
          this.addEmployeeForm.patchValue({
            empId : emp.empId,
            empName: emp.empName,
            designation: emp.designation,
            personalDetailsId: emp.personalDetailsId,
            primaryWorkLocation: emp.primaryWorkLocation,
            htcExperience: emp.htcExperience,
            overallExperience: emp.overallExperience,
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

        this.skillsArray().removeAt(0);
        this.projectsArray().removeAt(0);

        emp.skills.forEach(skill=>{
          this.skillsArray().push(this.bindSkill(skill));
        })
        emp.projects.forEach(project=>{
          this.projectsArray().push(this.bindProject(project));
        })

        this.addEmployeeForm;
      }
    })
}
 ngOnInit(){

}
  reactiveForm() {
    this.addEmployeeForm = this.fb.group({
      empId: ['',[Validators.required,Validators.pattern("[0-9]")]],
      empName: ['',[Validators.required,Validators.maxLength(100)]],
      designation: ['',Validators.required],
      primaryWorkLocation: ['',Validators.required],
      htcExperience: ['',Validators.required],
      overallExperience: ['',Validators.required],
      personalDetailsId: [''],
      officialEmailAddr: ['',[Validators.required,Validators.email]],
      emailAddr: ['',[Validators.required,Validators.email]],
      extensionNumber: ['',Validators.required],
      mobileNumber: [null,[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
        alternativeMobileNumber:[null,[Validators.minLength(10),Validators.maxLength(10)]],
      addressId: [''],
      addressLine: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      country: ['',Validators.required],
      pincode: [null,[Validators.required,Validators.maxLength(6),Validators.minLength(6)]],
      skills: this.fb.array([this.newSkill()]),
      projects: this.fb.array([this.newProject()]),

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

  removeSkill(i:number) {
    this.skillsArray().removeAt(i);
 }

  projectsArray(): FormArray {
    return this.addEmployeeForm.get('projects') as FormArray;
  }


  newProject(): FormGroup {
    return this.fb.group({
      projectId: [''],
      projectName: [''],
      reportingTo: [''],
      deliveryHead: [''],
        projectLocation:[''],
        startDate:[''],
        endDate:[''],
        skillSet:[''],
        projectDescription:['']
    })
  }
  bindProject(project): FormGroup {
    return this.fb.group({
      projectId: [project.projectId],
      projectName: [project.projectName],
      reportingTo: [project.reportingTo],
      deliveryHead:[project.deliveryHead],
        projectLocation:[project.projectLocation],
        startDate:[project.startDate],
        endDate:[project.endDate],
        skillSet:[project.skillSet],
        projectDescription:[project.projectDescription]
    })
  }
  addProject() {
    this.projectsArray().push(this.newProject());
  }

  removeProject(i:number) {
    this.projectsArray().removeAt(i);
  }
  onSubmit(addEmployee) {
    this.submitted = true;
    if (this.addEmployeeForm.invalid) {
     this.addEmployeeForm.reset();
      return;
    }
    this.employeeService.addEmployee(this.addEmployeeForm.value)
      .subscribe(data => {
        console.log(data);

      });
    alert("Saved Successfully");
    //this.addEmployeeForm;
    addEmployee.reset();
  }
  countrySelect(event){
    this.addEmployeeForm.patchValue({
      country: event.name
    });
  }

  getSkillSetNames(skills){

    this.employeeService.getSkillNames(skills).subscribe(data => {
    console.log(this.getSkillSetNames(skills));
    });

  }
}



