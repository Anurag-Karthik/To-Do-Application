import { Injectable } from "@angular/core";
import { Task } from "../Tasks";
import { SignUpService } from "../user-authorization/sign-up.service";

@Injectable({
  providedIn: "root",
})
export class DelTaskService {
  constructor(private signUpSer: SignUpService) {}

  delTask(task: Task) {
    this.signUpSer.deleteTask(task);
  }
}
