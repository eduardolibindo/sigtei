import { Role } from './role';

export class Account {
    id: string;
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    rg: string;
    institution: string;
    course: string;
    phone: string;
    address: string;
    role: Role;
    jwtToken?: string;

}
