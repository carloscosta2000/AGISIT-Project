import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task-service';
import { Task } from 'src/models/task';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css']
})
export class UserTasksComponent implements OnInit {

  constructor(private taskService :TaskService) { }

  task :Task = { _id: '', taskName:'', priority:'', progressPerc:0, user: [], project:'', startDate: new Date(), endDate: new Date() }
  tasksOfUser :Task[] = []

  ngOnInit(): void {
    const userRaw = localStorage.getItem('user');
    if(userRaw){
      const userJson = JSON.parse(userRaw);
      this.taskService.getTasksByUser(userJson["username"]).subscribe(tasks => {
        this.tasksOfUser = tasks
      }); 
    }
  }

}
