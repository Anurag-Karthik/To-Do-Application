import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { Task } from "../Tasks";
import { SignUpService } from "../user-authorization/sign-up.service";

@Injectable({
  providedIn: "root",
})
export class AddTaskService {
  constructor(private signUpSer: SignUpService) {}

  addTask(
    name: string,
    detail: string,
    dateAndTime: Date,
    priority: number,
    taskValidity: boolean
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
      this.signUpSer.addTask(taskToBeAdded);
    }
  }
}
