import { Component, OnInit } from '@angular/core';
import { DispModalService } from 'src/app/disp/disp-modal.service';
import { Tasks, TasksClass } from '../../Tasks';
import { SignUpService } from 'src/app/user-authorization/sign-up.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
})
export class TasksListComponent implements OnInit {
  tasks = Tasks;

  constructor(
    private dispModSer: DispModalService,
    private signUpSer: SignUpService
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  async getTasks() {
    await this.signUpSer.getTasks().subscribe(
      (res) => {
        this.tasks = res.map((e: any) => {
          const data = e.payload.doc.data();

          if (data.name != this.signUpSer.userName) {
            data.id = e.payload.doc.id;
            data.dateTime = data.dateTime.toDate();
            console.log(data);
            return data;
          }
        });
      },
      (err) => {
        alert('Error While Fetching Data. PLease Try Again');
      }
    );
  }

  openDeleteTask() {
    this.dispModSer.register('deleteTask');
    this.dispModSer.openModal('deleteTask');
  }
}
