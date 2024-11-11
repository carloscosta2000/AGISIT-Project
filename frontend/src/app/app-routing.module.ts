import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateTaskComponent } from './create-task/create-task.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { UserTasksComponent } from './user-tasks/user-tasks.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { AssociateTasksProjectComponent } from './associatetasksproject/associatetasksproject.component';
import { AssociateUserTaskComponent } from './associate-user-task/associate-user-task.component';
import { HomePageComponent } from './home-page/home-page.component';



const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'createProject', component: CreateProjectComponent},
  {path: 'usertasks', component: UserTasksComponent},
  {path: 'taskss', component: CreateTaskComponent},
  {path: 'associateTasksProjects', component: AssociateTasksProjectComponent},
  {path: 'associateUserTask', component: AssociateUserTaskComponent},
  {path: '', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, FormsModule, ReactiveFormsModule]
})
export class AppRoutingModule { }
