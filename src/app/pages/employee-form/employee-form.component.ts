import { Component, inject } from '@angular/core';
import { Employee, IDepartment, IDesignation } from '../../model/employee';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../Service/employee.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { Observable, observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule,AsyncPipe,NgFor],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
  employeeObj: Employee = new Employee();

  employeeService = inject(EmployeeService);
  activatedRoute = inject(ActivatedRoute); 

  deptList$: Observable<IDepartment[]> = new Observable<IDepartment[]>();
  designationList: IDesignation[] = [];

  editEmpId : number = 0;

  constructor(){
    this.deptList$ = this.employeeService.getAllDepartment();
    this.activatedRoute.params.subscribe((res: any)=>{
       this.editEmpId = res.id;
       if(this.editEmpId){
        this.getEmployeeById();
       }
    })
  }

  onSaveEmployee(){
    this.employeeService.createNewEmployee(this.employeeObj).subscribe((res: Employee)=>{
      alert('Employee Created');
    },error=>{
      alert('API Error'+ error.error);
   })
  }

  getDesignation(){
    this.employeeService.getDesignationByDeptId(this.employeeObj.departmentId).subscribe((res: IDesignation[])=>{
      this.designationList = res;
    })
  }

  getEmployeeById(){
    this.employeeService.getEditEmployeeList(this.editEmpId).subscribe((res: Employee)=>{
      this.employeeObj = res;
      this.employeeObj.dateOfJoining = this.convertDate(this.employeeObj.dateOfJoining);
      this.getDesignation();
    })
  }

  onUpdate(){
    this.employeeService.updateEmployee(this.employeeObj).subscribe((res: Employee)=>{
      alert('Employee Updated');
    },error=>{
      alert('API Error'+ error.error);
   })
  }
  
  convertDate(dates : string){
    const isoDate = dates;
    const date = new Date(isoDate);
    const formatted = date.toLocaleDateString('en-GB').replace(/\//g, '-');
    return `${formatted}`;
  }
}
