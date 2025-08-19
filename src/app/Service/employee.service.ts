import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee, IDepartment, IDesignation, IEmployeeType } from '../model/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl: string = "https://api.freeprojectapi.com/api/EmployeeApp/";
  constructor(private http: HttpClient) { }

  createNewEmployee(obj: Employee): Observable<Employee>{
    return this.http.post<Employee>(this.apiUrl + "CreateEmployee", obj);
  }

  getEmployeeList(): Observable<IEmployeeType[]>{
    return this.http.get<IEmployeeType[]>(`${this.apiUrl}GetEmployees`);
  }

  getAllDepartment(): Observable<IDepartment[]>{
    return this.http.get<IDepartment[]>(`${this.apiUrl}GetDepartments`);
  }

  getDesignationByDeptId(deptId : string): Observable<IDesignation[]>{
    return this.http.get<IDesignation[]>(`${this.apiUrl}GetDesignationsByDeptId?deptId=${deptId}`);
  }

  getEditEmployeeList(id: number): Observable<Employee>{
    return this.http.get<Employee>(`${this.apiUrl}${id}`);
  }

  updateEmployee(obj: Employee): Observable<Employee>{
    return this.http.put<Employee>(this.apiUrl + "UpdateEmployee", obj);
  }

  deleteEmpID(id: number): Observable<Employee>{
    return this.http.get<Employee>(`${this.apiUrl}DeleteEmployee?id=${id}`);
  }
}
