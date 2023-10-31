import { Component, Input } from '@angular/core';
import { Task } from 'src/app/Tasks';
import { DelTaskService } from '../del-task.service';
import { DispModalService } from 'src/app/disp/disp-modal.service';

@Component({
  selector: 'app-del-task',
  templateUrl: './del-task.component.html',
  styleUrls: ['./del-task.component.css'],
})
export class DelTaskComponent {
  @Input() taskInput: Task = {
    id: -1,
    name: 'Task',
    detail: 'Task Detail',
    dateTime: new Date(),
    priority: 1,
  };

  constructor(
    private delTaskService: DelTaskService,
    public dispModSer: DispModalService
  ) {}

  deleteTask(task: Task) {
    this.delTaskService.delTask(task);
  }
}
