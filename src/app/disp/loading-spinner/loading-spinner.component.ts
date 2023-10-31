import { Component } from "@angular/core";
import { DispLoadingSpinnerService } from "../disp-loading-spinner.service";

@Component({
  selector: "app-loading-spinner",
  templateUrl: "./loading-spinner.component.html",
  styleUrls: ["./loading-spinner.component.css"],
})
export class LoadingSpinnerComponent {
  constructor(public dispLoadSer: DispLoadingSpinnerService) {}
}
