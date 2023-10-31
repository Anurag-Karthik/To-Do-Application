import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Task, Tasks } from '../Tasks';
import { SignUpService } from '../user-authorization/sign-up.service';

@Injectable({
  providedIn: 'root',
})
export class AddTaskService {
  constructor(
    private fireAuth: AngularFireAuth,
    private fireDB: AngularFirestore,
    private signUpSer: SignUpService
  ) {}

  addTask(
    name: string,
    detail: string,
    dateAndTime: Date,
    priority: number,
    taskValidity: boolean
  ) {
    name = name.toUpperCase();
    if (taskValidity) {
      let ids = Tasks.map((a) => a.id);
      let titles = Tasks.map((a) => a.name);
      if (titles.indexOf(name) == -1) {
        let curID = 0;
        if (ids.length > 0) {
          curID = Math.max(...ids);
        }
        let taskToBeAdded: Task = {
          id: curID + 1,
          name: name,
          dateTime: dateAndTime,
          detail: detail,
          priority: priority!,
        };
        Tasks.unshift(taskToBeAdded);
        this.signUpSer.addTask(taskToBeAdded);
      } else {
        Tasks.splice(titles.indexOf(name), 1);
        let taskToBeAdded = {
          id: ids[titles.indexOf(name)],
          name: name,
          dateTime: dateAndTime,
          detail: detail,
          priority: priority!,
        };
        Tasks.unshift(taskToBeAdded);
        let oldTask: Task = Tasks.find((task) => task.name === name)!;
        this.signUpSer.updateTask(oldTask, taskToBeAdded);
      }
    }
  }
}
