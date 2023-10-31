import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./disp/home/home.component";
import { TasksListComponent } from "./task/tasks-list/tasks-list.component";
import { AddTaskComponent } from "./task/add-task/add-task.component";
import { TaskDetailComponent } from "./task/task-detail/task-detail.component";
import { TaskEditComponent } from "./task/task-edit/task-edit.component";
import { LoadingSpinnerComponent } from "./disp/loading-spinner/loading-spinner.component";

const routes: Routes = [
  { path: "", title: "Home", component: HomeComponent },
  { path: "tasks", title: "Tasks", component: TasksListComponent },
  {
    path: "tasks/add-task",
    title: "Add New Task",
    component: AddTaskComponent,
  },
  { path: "task/:name", title: "Task", component: TaskDetailComponent },
  {
    path: "edit/:name",
    title: "Edit Task",
    component: TaskEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
