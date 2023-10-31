import { Component, inject } from "@angular/core";
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Task } from "../../Tasks";
import { SignUpService } from "src/app/user-authorization/sign-up.service";
import { EditTaskService } from "../edit-task.service";
import { DispLoadingSpinnerService } from "src/app/disp/disp-loading-spinner.service";

@Component({
  selector: "app-task-edit",
  templateUrl: "./task-edit.component.html",
  styleUrls: ["./task-edit.component.css"],
})
export class TaskEditComponent {
  router = inject(Router);
  improperInput = "";
  errorMsg = "";
  task: Task | undefined = undefined;
  gotTask: boolean = false;
  activatedRoute = inject(ActivatedRoute);
  name = this.activatedRoute.snapshot.paramMap.get("name");

  strDate: string = "";

  strTime: string = "";

  editingTask: FormGroup = new FormGroup({
    name: new FormControl(this.task?.name, Validators.required),
    detail: new FormControl(this.task?.detail),

    date: new FormControl(this.strDate, Validators.required),
    time: new FormControl(this.strTime, Validators.required),
    priority: new FormControl<number>(1, Validators.required),
  });

  constructor(
    private editTaskService: EditTaskService,
    private signUpSer: SignUpService,
    private loadSer: DispLoadingSpinnerService
  ) {}

  getDoc() {
    this.signUpSer.getTask(this.name!).subscribe((doc) => {
      doc.dateTime = doc.dateTime.toDate();
      this.task = doc;
      this.gotTask = true;
    });
  }

  async ngOnInit() {
    this.loadSer.showLoadingSpinner();
    this.getDoc();
    while (!this.gotTask) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    this.strDate =
      this.task?.dateTime.getDate().toString() +
      "-" +
      this.task?.dateTime.getMonth().toString() +
      "-" +
      this.task?.dateTime.getFullYear().toString();

    this.strTime =
      this.task?.dateTime.getHours().toString() +
      ":" +
      this.task?.dateTime.getMinutes().toString();

    this.editingTask = new FormGroup({
      name: new FormControl(this.task?.name, Validators.required),
      detail: new FormControl(this.task?.detail),

      date: new FormControl(this.strDate, Validators.required),
      time: new FormControl(this.strTime, Validators.required),
      priority: new FormControl<number>(1, Validators.required),
    });
    this.loadSer.hideLoadingSpinner();
  }

  navBack() {
    this.router.navigateByUrl("/tasks");
  }

  editTask() {
    this.loadSer.showLoadingSpinner();
    let name = this.editingTask.value.name ?? "";
    let detail = this.editingTask.value.detail ?? "";
    let dateArray = this.editingTask.value.date?.split("-");
    let timeArray = this.editingTask.value.time?.split(":");
    let dateAndTime: Date = new Date(
      parseInt(dateArray![2]),
      parseInt(dateArray![1]),
      parseInt(dateArray![0]),
      parseInt(timeArray![0]),
      parseInt(timeArray![1])
    );
    let priority = this.editingTask.value.priority;

    this.editTaskService.editTask(
      name,
      detail,
      dateAndTime,
      priority!,
      this.editingTask.valid,
      this.task!
    );

    this.editingTask.reset();
    this.loadSer.hideLoadingSpinner();
    this.navBack();
  }
}
