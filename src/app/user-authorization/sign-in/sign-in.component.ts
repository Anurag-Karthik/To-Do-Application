import { Component, inject } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { SignUpService } from "../sign-up.service";
import { Task } from "src/app/Tasks";
import { DispLoadingSpinnerService } from "src/app/disp/disp-loading-spinner.service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
})
export class SignInComponent {
  tasks: Task[] = [];

  emailInvalid = false;
  passwordInvalid = false;
  formInvalid = false;

  errorMsgEM: string = "Email is Invalid";
  errorMsgP: string = "";
  errorMsgUN: string = "";
  signInErrorColor: string = "";
  signInErrorMsg: string = "";
  inSubmission = false;

  eMail = "";
  passWord = "";
  userName = "";

  router = inject(Router);

  constructor(
    private fireAuth: AngularFireAuth,
    private signUpSer: SignUpService,
    private loadSer: DispLoadingSpinnerService
  ) {}

  checkEmail() {
    if (
      this.eMail.indexOf(".") == -1 &&
      this.eMail.indexOf("@") == -1 &&
      this.eMail.length < 5
    ) {
      this.emailInvalid = true;
    } else {
      this.emailInvalid = false;
      if (!this.emailInvalid) {
        this.formInvalid = false;
      }
    }
  }

  checkPassword() {
    if (this.passWord!.length < 8) {
      this.errorMsgP = "Password Length Must be Greater than 8";
      this.passwordInvalid = true;
      this.formInvalid = true;
      return;
    }
    this.passwordInvalid = false;
    if (!this.emailInvalid) {
      this.formInvalid = false;
    }
  }

  async login() {
    this.loadSer.showLoadingSpinner();
    this.inSubmission = true;
    try {
      await this.fireAuth.signInWithEmailAndPassword(this.eMail, this.passWord);
      let userNameExistence = await this.signUpSer.doesCollectionExist(
        this.userName
      );
      if (userNameExistence == false) {
        throw "UserName Doesn't Exist";
      }
    } catch (e) {
      this.loadSer.hideLoadingSpinner();

      this.signInErrorColor = "red";
      this.signInErrorMsg = e as string;
      this.inSubmission = false;
      return;
    }
    this.signInErrorColor = "green";
    this.signInErrorMsg = "Sign in Sucessful!";
    this.inSubmission = false;
    this.signUpSer.userName = this.userName;
    this.loadSer.hideLoadingSpinner();
    this.router.navigateByUrl("tasks");
  }
}
