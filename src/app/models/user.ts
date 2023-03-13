import { Role } from "./role";

export class User {
    nom : string="";
    prenom : string ="";
    id : number = 0;
    role : Role = new Role();
    email : string = "";
}
