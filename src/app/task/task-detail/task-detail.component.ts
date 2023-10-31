import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Task } from "S:/Angular Devolepment Internship/ToDo/src/app/Tasks";
import { DelTaskService } from "../del-task.service";
import { SignUpService } from "src/app/user-authorization/sign-up.service";
import { DispLoadingSpinnerService } from "src/app/disp/disp-loading-spinner.service";

@Component({
  selector: "app-task-detail",
  templateUrl: "./task-detail.component.html",
  styleUrls: ["./task-detail.component.css"],
})
export class TaskDetailComponent implements OnInit {
  task: any;
  activeRoute = inject(ActivatedRoute);
  name = this.activeRoute.snapshot.paramMap.get("name");
  router = inject(Router);

  constructor(
    private delTaskService: DelTaskService,
    private signUpSer: SignUpService,
    private dispLoad: DispLoadingSpinnerService
  ) {}

  async ngOnInit() {
    this.dispLoad.showLoadingSpinner();
    this.signUpSer.getTask(this.name!).subscribe((doc) => {
      this.task = doc;
    });
    this.dispLoad.hideLoadingSpinner();
  }

  deleteTask(task: Task) {
    this.delTaskService.delTask(task);
    this.router.navigateByUrl("tasks");
  }

  navTasks() {
    this.router.navigateByUrl("tasks");
  }
}
