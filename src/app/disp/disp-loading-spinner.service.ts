import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DispLoadingSpinnerService {
  private loadingSpinnerVisibility: boolean = false;

  constructor() {}

  isLoading() {
    return this.loadingSpinnerVisibility;
  }

  showLoadingSpinner() {
    this.loadingSpinnerVisibility = true;
  }

  hideLoadingSpinner() {
    this.loadingSpinnerVisibility = false;
  }
}
