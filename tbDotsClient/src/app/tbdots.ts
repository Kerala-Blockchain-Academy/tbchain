export interface Tbdots {
}

export interface User {
    ManuName: string;
    UserName: string;
    Password: string;
    TimeStamp: string;
}

export interface Login {
    UserName: string;
    Password: string;
}

export interface Medicine {
    Name:string;
    medid:string;
    combination:string;
    CreatedBy:string;
    Status:string;
    TimeStamp:string;
}

export interface PatientIntake {
    patientName:string;
    medid:string;
    status:string;
    TimeStamp:string;
}

export interface Patient {
    FullName: string;
    UserName: string;
    Password: string;
    TimeStamp: string;
}

export interface Patients {
    FullName: string;
    UserName: string;
}