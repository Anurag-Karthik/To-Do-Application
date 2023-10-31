import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import userInterface from "./userModel";
import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";
import { Task } from "../Tasks";

@Injectable({
  providedIn: "root",
})
export class SignUpService {
  public isAuthenticated$: Observable<boolean>;
  private userCollection: AngularFirestoreCollection | undefined;
  public userName = "";

  constructor(
    private fireAuth: AngularFireAuth,
    private fireDB: AngularFirestore
  ) {
    this.isAuthenticated$ = fireAuth.user.pipe(map((user) => !!user));
  }

  public getUserCollection(): AngularFirestoreCollection {
    return this.userCollection!;
  }

  public async signUpUser(userData: userInterface) {
    this.userName = userData.name;
    this.userCollection = this.fireDB.collection(this.userName);

    const userCred = await this.fireAuth.createUserWithEmailAndPassword(
      userData.eMail!,
      userData.passWord!
    );

    if (!userCred.user) {
      throw new Error("User Creation Failed Due to Some Unknown Error");
    }

    await userCred.user.updateProfile({
      displayName: userData.name,
    });
  }

  public async addTask(task: Task) {
    this.userCollection = this.fireDB.collection(this.userName);
    await this.userCollection!.doc(task.name).set(task);
  }

  public async deleteTask(task: Task) {
    this.userCollection = this.fireDB.collection(this.userName);
    await this.userCollection!.doc(task.name).delete();
  }

  public async updateTask(oldTask: Task, newTask: Task) {
    this.userCollection = this.fireDB.collection(this.userName);
    this.deleteTask(oldTask);
    this.addTask(newTask);
  }

  public getTasks() {
    this.userCollection = this.fireDB.collection(this.userName);
    return from(this.userCollection!.snapshotChanges());
  }

  async doesCollectionExist(collectionName: string): Promise<boolean> {
    const collectionRef = this.fireDB.collection(collectionName);
    const snapshot = await collectionRef.get().toPromise();
    if (snapshot?.empty) {
      return false;
    } else {
      return true;
    }
  }

  getNoOfTasksinDB(): Promise<number> {
    this.userCollection = this.fireDB.collection(this.userName);
    return new Promise((resolve, reject) => {
      this.userCollection!.get().subscribe(
        (querySnapshot) => {
          const numberOfDocuments = querySnapshot.size;
          resolve(numberOfDocuments);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getTask(name: string): Observable<any> {
    return this.fireDB.collection(this.userName).doc(name).valueChanges();
  }
}
