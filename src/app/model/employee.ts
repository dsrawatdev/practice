export class Employee{
    employeeId: number;
    fullname: string;
    email: string;
    phone: string;
    gender: string;
    dateOfJoining: string;
    departmentId: string;
    designationId: string;
    employeeType: string;
    salary: number;

    constructor(){
        this.employeeId = 0;
        this.fullname = '';
        this.email = '';
        this.phone = '';
        this.gender = '';
        this.dateOfJoining  = '';
        this.departmentId = '';
        this.designationId = '';
        this.employeeType = '';
        this.salary = 0;
    }
}

export interface IEmployeeType{
    employeeId: number;
    fullName: string;
    email: string;
    phone: string;
    gender: string;
    dateOfJoining: string;
    departmentId: string;
    designationId: string;
    employeeType: string;
    salary: number;
    departmentName: string;
    designationName: string;
}

export interface IDepartment {
    departmentId: string,
    departmentName: string
}

export interface IDesignation {
    designationId: number,
    designationName: string
}