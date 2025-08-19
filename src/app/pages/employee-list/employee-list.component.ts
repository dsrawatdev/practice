import { Component,inject } from '@angular/core';
import { EmployeeService } from '../../Service/employee.service';
import { Employee, IEmployeeType } from '../../model/employee';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  imports: [DatePipe],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  empService = inject(EmployeeService);

  router = inject(Router);

  employeeList: IEmployeeType[] =[];

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee(){
    this.empService.getEmployeeList().subscribe((res: IEmployeeType[])=>{
      this.employeeList = res;
    })
  }

  onEdit(empId : number){
    this.router.navigateByUrl("/edit-employee/"+ empId)
  }

  onDelete(empId : number){
    const isDelete = confirm('Are You Sure want to delete.');
    if(isDelete){
      this.empService.deleteEmpID(empId).subscribe((res: any)=>{
        alert('Employee Deleted Succesfully');
        this.getEmployee();
      })
    }
  }

}
