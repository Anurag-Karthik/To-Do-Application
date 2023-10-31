import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UserAuthorizationModule } from "./user-authorization/user-authorization.module";
import { AddTaskComponent } from "./task/add-task/add-task.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { fireBaseAPIDet } from "./fireBaseAPICon";
import { HomeComponent } from "./disp/home/home.component";
import { AppHeaderComponent } from "./disp/app-header/app-header.component";
import { TasksListComponent } from "./task/tasks-list/tasks-list.component";
import { TaskDetailComponent } from "./task/task-detail/task-detail.component";
import { DispModalComponent } from "./disp/disp-modal/disp-modal.component";
import { TaskEditComponent } from "./task/task-edit/task-edit.component";
import { DelTaskComponent } from "./task/del-task/del-task.component";
import { LoadingSpinnerComponent } from "./disp/loading-spinner/loading-spinner.component";

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    HomeComponent,
    AppHeaderComponent,
    TasksListComponent,
    TaskDetailComponent,
    DispModalComponent,
    TaskEditComponent,
    DelTaskComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserAuthorizationModule,
    AngularFireModule.initializeApp(fireBaseAPIDet),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
