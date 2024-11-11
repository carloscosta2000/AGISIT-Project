import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/models/task';
import { TaskService } from '../services/task-service';
import { User } from 'src/models/user';
import { UserService } from '../services/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-associate-user-task',
  templateUrl: './associate-user-task.component.html',
  styleUrls: ['./associate-user-task.component.css']
})
export class AssociateUserTaskComponent implements OnInit {

  tasks: Task[] = [];
  task: Task = {_id: "", taskName: "", priority: "", progressPerc: 0, user: [], project: "", startDate: new Date(), endDate: new Date()}
  users: User[] = [];
  user: User = {_id: "", username: "", password: "", isAdmin: false};
  associateForm !: FormGroup;
  taskAssociated :boolean = false;
  taskDisassociated :boolean = false;
  isLoggedIn: boolean = false;



  constructor(private taskService : TaskService, private userService : UserService, private router: Router) { }

  ngOnInit(): void {
    const userRaw = localStorage.getItem('user');
    if(!userRaw){
      this.router.navigate(['/login'])
    }
    this.getTasks();
    this.getUsers();

    this.associateForm = new FormGroup({
      users: new FormControl(this.user.username,[
        Validators.required
      ]),
      tasks: new FormControl(this.task.taskName,[
        Validators.required
      ]),
    });
  }


  getTasks() {
    this.taskService.getAllTasks().subscribe(list_tasks => {this.tasks = list_tasks;});
  }

  getUsers() {
    this.userService.getUsers().subscribe(list_users => this.users = list_users);
  }

  onSubmit(){
    const username = this.associateForm.value.users;
    const taskId = this.associateForm.value.tasks;
    this.taskService.updateUserTask(username, taskId).subscribe(values => {
      this.getTasks()
      this.getUsers();
      this.taskAssociated = true;
      console.log(this.tasks)});
  }

  deleteAssociation(taskId:string, username:string){
    this.taskService.deleteUserTask(username, taskId).subscribe(values => {
      this.getTasks()
      this.getUsers();
      this.taskDisassociated= true;
    });
    
  }
}
