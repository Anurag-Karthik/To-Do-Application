import { Component, inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SignUpService } from "../sign-up.service";
import { DispLoadingSpinnerService } from "src/app/disp/disp-loading-spinner.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"],
})
export class SignUpComponent {
  errorMsgP: string = "";
  errorMsgRP: string = "";
  errorMsgEM: string = "Email is Invalid";
  signUpErrorColor: string = "";
  signUpErrorMsg: string = "";

  formInvalid = true;
  passwordInvalid = false;
  retypePasswordInvaild = false;
  emailInvalid = false;
  inSubmission = false;

  router = inject(Router);

  constructor(
    private signUpService: SignUpService,
    private dispLoad: DispLoadingSpinnerService
  ) {}

  signUpFormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    eMail: new FormControl("", [
      Validators.required,
      Validators.email,
      Validators.minLength(5),
    ]),
    passWord: new FormControl("", [Validators.required]),
    confirmPassword: new FormControl("", [Validators.required]),
  });

  checkEmail() {
    if (
      this.signUpFormGroup.value.eMail?.indexOf(".") == -1 &&
      this.signUpFormGroup.value.eMail?.indexOf("@") == -1 &&
      this.signUpFormGroup.value.eMail?.length < 5
    ) {
      this.emailInvalid = true;
    } else {
      this.emailInvalid = false;
      if (
        !this.retypePasswordInvaild &&
        !this.passwordInvalid &&
        !this.emailInvalid &&
        this.signUpFormGroup.valid
      ) {
        this.formInvalid = false;
      }
    }
  }

  checkRetypePassword() {
    if (
      this.signUpFormGroup.value.passWord !=
      this.signUpFormGroup.value.confirmPassword
    ) {
      this.errorMsgRP = "Password and Retype Password are Not Matching";
      this.retypePasswordInvaild = true;
      this.formInvalid = true;
      return;
    }
    if (
      !this.retypePasswordInvaild &&
      !this.passwordInvalid &&
      !this.emailInvalid &&
      this.signUpFormGroup.valid
    ) {
      this.formInvalid = false;
    }
    this.retypePasswordInvaild = false;
  }

  checkPassword() {
    let containsCapital: boolean = false;
    let containsSpecial: boolean = false;
    let containsNumber: boolean = false;
    if (this.signUpFormGroup.value.passWord!.length < 8) {
      this.errorMsgP = "Password Length Must be Greater than 8";
      this.passwordInvalid = true;
      this.formInvalid = true;
      return;
    }
    if (this.signUpFormGroup.value.passWord!.indexOf(" ") != -1) {
      this.errorMsgP = "Password Must Not Contain Spaces";
      this.passwordInvalid = true;
      this.formInvalid = true;
      return;
    }
    for (
      let charIndex = 0;
      charIndex <= this.signUpFormGroup.value.passWord!.length;
      charIndex++
    ) {
      if (this.signUpFormGroup.value.passWord!.charCodeAt(charIndex) == 33) {
        containsSpecial = true;
      } else {
        if (
          this.signUpFormGroup.value.passWord!.charCodeAt(charIndex) >= 35 &&
          this.signUpFormGroup.value.passWord!.charCodeAt(charIndex) <= 47
        ) {
          containsSpecial = true;
        } else {
          if (
            this.signUpFormGroup.value.passWord!.charCodeAt(charIndex) >= 58 &&
            this.signUpFormGroup.value.passWord!.charCodeAt(charIndex) <= 64
          ) {
            containsSpecial = true;
          } else {
            if (
              this.signUpFormGroup.value.passWord!.charCodeAt(charIndex) >=
                93 &&
              this.signUpFormGroup.value.passWord!.charCodeAt(charIndex) <= 95
            ) {
              containsSpecial = true;
            } else {
              if (
                this.signUpFormGroup.value.passWord!.charCodeAt(charIndex) == 91
              ) {
                containsSpecial = true;
              }
            }
          }
        }
      }
      if (
        this.signUpFormGroup.value.passWord!.charCodeAt(charIndex) >= 65 &&
        this.signUpFormGroup.value.passWord!.charCodeAt(charIndex) <= 90
      ) {
        containsCapital = true;
      }
      if (
        this.signUpFormGroup.value.passWord!.charCodeAt(charIndex) >= 48 &&
        this.signUpFormGroup.value.passWord!.charCodeAt(charIndex) <= 57
      ) {
        containsNumber = true;
      }
    }
    if (!containsCapital) {
      this.errorMsgP = "Password Must Contain a Capital Letter";
      this.passwordInvalid = true;
      this.formInvalid = true;
      return;
    }
    if (!containsSpecial) {
      this.errorMsgP = "Password Must Contain a Special Character";
      this.passwordInvalid = true;
      this.formInvalid = true;
      return;
    }
    if (!containsNumber) {
      this.passwordInvalid = true;
      this.formInvalid = true;
      return;
    }
    this.passwordInvalid = false;
    if (
      !this.retypePasswordInvaild &&
      !this.passwordInvalid &&
      !this.emailInvalid &&
      this.signUpFormGroup.valid
    ) {
      this.formInvalid = false;
    }
  }

  async signUpUser() {
    this.inSubmission = true;
    this.dispLoad.showLoadingSpinner();
    try {
      await this.signUpService.signUpUser({
        name: this.signUpFormGroup.value.name!,
        eMail: this.signUpFormGroup.value.eMail!,
        passWord: this.signUpFormGroup.value.passWord!,
      });
    } catch (e) {
      this.dispLoad.hideLoadingSpinner();
      this.signUpErrorMsg = e as string;
      this.signUpErrorColor = "red";
      this.inSubmission = false;
      return;
    }
    this.signUpErrorMsg = "Your Account Has been Created!";
    this.signUpErrorColor = "green";
    this.inSubmission = false;
    this.dispLoad.hideLoadingSpinner();
    this.router.navigateByUrl("tasks");
  }
}
