import { Component, inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AddTaskService } from "../add-task.service";
import { DispLoadingSpinnerService } from "src/app/disp/disp-loading-spinner.service";

@Component({
  selector: "app-add-task",
  templateUrl: "./add-task.component.html",
  styleUrls: ["./add-task.component.css"],
})
export class AddTaskComponent {
  router = inject(Router);
  improperInput = "";
  errorMsg = "";

  constructor(
    private addTaskService: AddTaskService,
    private dispLoad: DispLoadingSpinnerService
  ) {}

  newTask = new FormGroup({
    name: new FormControl("", Validators.required),
    detail: new FormControl(""),
    date: new FormControl("", Validators.required),
    time: new FormControl("", Validators.required),
    priority: new FormControl<number>(1, Validators.required),
  });

  navBack() {
    this.router.navigateByUrl("/tasks");
  }

  addTask() {
    this.dispLoad.showLoadingSpinner();
    let name = this.newTask.value.name ?? "";
    let detail = this.newTask.value.detail ?? "";
    let dateArray = this.newTask.value.date?.split("-");
    let timeArray = this.newTask.value.time?.split(":");
    let dateAndTime: Date = new Date(
      parseInt(dateArray![2]),
      parseInt(dateArray![1]),
      parseInt(dateArray![0]),
      parseInt(timeArray![0]),
      parseInt(timeArray![1])
    );
    let priority = this.newTask.value.priority;

    this.addTaskService.addTask(
      name,
      detail,
      dateAndTime,
      priority!,
      this.newTask.valid
    );

    this.newTask.reset();
    this.dispLoad.hideLoadingSpinner();
    this.navBack();
  }
}
