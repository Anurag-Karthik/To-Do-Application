import { Injectable } from "@angular/core";
import { Task } from "../Tasks";
import { SignUpService } from "../user-authorization/sign-up.service";

@Injectable({
  providedIn: "root",
})
export class EditTaskService {
  constructor(private signUpSer: SignUpService) {}

  editTask(
    name: string,
    detail: string,
    dateAndTime: Date,
    priority: number,
    taskValidity: boolean,
    oldTask: Task
  ) {
    name = name.toUpperCase();
    if (taskValidity) {
      let taskToBeAdded: Task = {
        id: Math.random() * 100,
        name: name,
        dateTime: dateAndTime,
        detail: detail,
        priority: priority!,
      };
      this.signUpSer.updateTask(oldTask, taskToBeAdded);
    }
  }
}
