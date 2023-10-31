import { windowTime } from 'rxjs';
import { SignUpService } from './user-authorization/sign-up.service';

export interface Task {
  id: number;
  name: string;
  dateTime: Date;
  detail: string;
  priority: number;
}

export class TasksClass {
  tasksList: Task[] = [];

  constructor(private signUpSer: SignUpService) {}
}

export const Tasks: Task[] = [
  {
    id: 1,
    name: 'Wash Clothes'.toUpperCase(),
    dateTime: new Date(2021, 9, 12, 15, 15),
    detail: 'Collect All Clothes and Wash Them in Super Clean Mode',
    priority: 3,
  },
  {
    id: 2,
    name: 'Pick Aaron'.toUpperCase(),
    dateTime: new Date(2023, 10, 30, 18, 30),
    detail: 'Pick Aaron From His Karate Class',
    priority: 5,
  },
  {
    id: 3,
    name: 'Do Revision'.toUpperCase(),
    dateTime: new Date(2023, 11, 1, 6, 45),
    detail:
      'Revise the 4th & 5th Chapters from IME for Upcoming Semester Exams',
    priority: 4,
  },
];
