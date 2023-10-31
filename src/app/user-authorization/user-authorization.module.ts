import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { TabsContainerComponent } from './tabs-container/tabs-container.component';
import { TabComponent } from './tab/tab.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    UserAuthComponent,
    TabsContainerComponent,
    TabComponent,
    SignInComponent,
    SignUpComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [UserAuthComponent],
})
export class UserAuthorizationModule {}
