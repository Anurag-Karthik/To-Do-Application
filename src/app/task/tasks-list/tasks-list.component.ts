import { Component, OnInit } from "@angular/core";
import { DispModalService } from "src/app/disp/disp-modal.service";
import { SignUpService } from "src/app/user-authorization/sign-up.service";
import { map } from "rxjs";
import { DispLoadingSpinnerService } from "src/app/disp/disp-loading-spinner.service";

@Component({
  selector: "app-tasks-list",
  templateUrl: "./tasks-list.component.html",
  styleUrls: ["./tasks-list.component.css"],
})
export class TasksListComponent implements OnInit {
  tasks: any = [];

  constructor(
    private dispModSer: DispModalService,
    private signUpSer: SignUpService,
    private loadSer: DispLoadingSpinnerService
  ) {}

  async ngOnInit() {
    this.loadSer.showLoadingSpinner();
    await this.getTasks();
    this.loadSer.hideLoadingSpinner();
  }

  async getTasks() {
    let noOfTasksInDB = 0;
    let noOfTasksObt = 0;

    await this.signUpSer
      .getNoOfTasksinDB()
      .then((noOfTasks) => {
        noOfTasksInDB = noOfTasks;
      })
      .catch((err) => {
        console.error("Error in Getting Data");
      });

    await this.signUpSer
      .getTasks()
      .pipe(
        map((res) => {
          if (noOfTasksObt == noOfTasksInDB) throw new Error("Completed");
          return res;
        })
      )
      .subscribe((res) => {
        this.tasks = res.map((e: any) => {
          const data = e.payload.doc.data();

          if (data.name != this.signUpSer.userName) {
            data.id = e.payload.doc.id;
            data.dateTime = data.dateTime.toDate();
            noOfTasksObt++;
            return data;
          }
        });
      });
  }

  openDeleteTask() {
    this.dispModSer.register("deleteTask");
    this.dispModSer.openModal("deleteTask");
  }
}
