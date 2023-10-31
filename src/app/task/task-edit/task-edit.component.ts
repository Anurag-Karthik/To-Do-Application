import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Task, Tasks } from '../../Tasks';
import { AddTaskService } from '../add-task.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
})
export class TaskEditComponent {
  router = inject(Router);
  improperInput = '';
  errorMsg = '';
  task: Task | undefined = undefined;
  activatedRoute = inject(ActivatedRoute);
  id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

  strDate: string = '';

  strTime: string = '';

  editingTask: FormGroup = new FormGroup({
    name: new FormControl(this.task?.name, Validators.required),
    detail: new FormControl(this.task?.detail),

    date: new FormControl(this.strDate, Validators.required),
    time: new FormControl(this.strTime, Validators.required),
    priority: new FormControl<number>(1, Validators.required),
  });

  constructor(private addTaskService: AddTaskService) {}

  ngOnInit(): void {
    this.task = Tasks.find((i) => i.id === this.id);

    this.strDate =
      this.task?.dateTime.getDate().toString() +
      '-' +
      this.task?.dateTime.getMonth().toString() +
      '-' +
      this.task?.dateTime.getFullYear().toString();

    console.log(this.task?.dateTime.getDate());

    this.strTime =
      this.task?.dateTime.getHours().toString() +
      ':' +
      this.task?.dateTime.getMinutes().toString();

    this.editingTask = new FormGroup({
      name: new FormControl(this.task?.name, Validators.required),
      detail: new FormControl(this.task?.detail),

      date: new FormControl(this.strDate, Validators.required),
      time: new FormControl(this.strTime, Validators.required),
      priority: new FormControl<number>(1, Validators.required),
    });
  }

  navBack() {
    this.router.navigateByUrl('/tasks');
  }

  editTask() {
    let name = this.editingTask.value.name ?? '';
    let detail = this.editingTask.value.detail ?? '';
    let dateArray = this.editingTask.value.date?.split('-');
    let timeArray = this.editingTask.value.time?.split(':');
    let dateAndTime: Date = new Date(
      parseInt(dateArray![2]),
      parseInt(dateArray![1]),
      parseInt(dateArray![0]),
      parseInt(timeArray![0]),
      parseInt(timeArray![1])
    );
    let priority = this.editingTask.value.priority;

    this.addTaskService.addTask(
      name,
      detail,
      dateAndTime,
      priority!,
      this.editingTask.valid
    );

    this.editingTask.reset();
    this.navBack();
  }
}
