import { Injectable } from '@angular/core';
import { Tasks, Task } from '../Tasks';
import { SignUpService } from '../user-authorization/sign-up.service';

@Injectable({
  providedIn: 'root',
})
export class DelTaskService {
  constructor(private signUpSer: SignUpService) {}

  delTask(task: Task) {
    let index = Tasks.indexOf(task);
    Tasks.splice(index, 1);
    this.signUpSer.deleteTask(task);
  }
}
