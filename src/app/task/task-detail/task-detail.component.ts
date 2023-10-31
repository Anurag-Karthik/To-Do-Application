import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Tasks,
  Task,
} from 'S:/Angular Devolepment Internship/ToDo/src/app/Tasks';
import { DelTaskService } from '../del-task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
})
export class TaskDetailComponent implements OnInit {
  task: Task | undefined = undefined;
  activeRoute = inject(ActivatedRoute);
  id = Number(this.activeRoute.snapshot.paramMap.get('id'));
  router = inject(Router);

  constructor(private delTaskService: DelTaskService) {}

  ngOnInit(): void {
    this.task = Tasks.find((i) => i.id === this.id);
  }

  deleteTask(task: Task) {
    this.delTaskService.delTask(task);
    this.router.navigateByUrl('tasks');
  }

  navTasks() {
    this.router.navigateByUrl('tasks');
  }
}
