import { windowTime } from "rxjs";
import { SignUpService } from "./user-authorization/sign-up.service";

export interface Task {
  id: number;
  name: string;
  dateTime: Date;
  detail: string;
  priority: number;
}
