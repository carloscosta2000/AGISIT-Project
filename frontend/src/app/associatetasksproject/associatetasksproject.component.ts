import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/models/project';
import { Task } from 'src/models/task';
import { TaskService } from '../services/task-service';
import { ProjectService } from '../services/project-service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-associatetasksproject',
  templateUrl: './associatetasksproject.component.html',
  styleUrls: ['./associatetasksproject.component.css']
})
export class AssociateTasksProjectComponent implements OnInit {
  selectedProject : Project = {_id: "", projectName: "", acronym: "", startDate: new Date() , endDate: new Date()};
  project: Project = {_id: "", projectName: "", acronym: "", startDate: new Date() , endDate: new Date()};
  projects: Project[] = [];
  task: Task = {_id: "", taskName: "", priority: "", progressPerc: 0, user: [], project: "", startDate: new Date(), endDate: new Date()}
  testTask: Task[] = [{_id: "", taskName: "", priority: "", progressPerc: 0, user: [], project: "", startDate: new Date(), endDate: new Date()}]
  tasks: Task[] = [];
  associateForm !: FormGroup;
  taskAssociated : Boolean = false;
  isLoggedIn: boolean = false;
  

  ngOnInit(): void {

    const userRaw = localStorage.getItem('user');
    if(!userRaw){
      this.router.navigate(['/login'])
    }


    this.getProjects();
    this.getTasks();


    this.associateForm = new FormGroup({
      projects: new FormControl(this.project.acronym,[
      ]),
      tasks: new FormControl(this.task.taskName,[
      ]),
    });
  }

  onSubmit() {
    console.log("Projeto recebido:" + this.associateForm.value.projects)
    console.log("Tarefa recebido:" + this.associateForm.value.tasks)
    this.taskService.updateProjectTask(this.associateForm.value.tasks, this.associateForm.value.projects).subscribe(value => {
      window.location.reload()     
    });
    this.taskAssociated = true;
  }

  selectProject(p: Project): void{
    this.selectedProject = p;
  }

  getTasksByUser(username: string): Task[]{
    this.taskService.getTasksByUser(username).subscribe(tasks => this.tasks = tasks);
    return this.tasks;
  }

  addTaskToProject(task: Task): void{
    this.projectService.addTaskProject(task, this.selectedProject.projectName);
  }

  getProjects() {
    this.projectService.getAllProjects().subscribe(list_projects => this.projects = list_projects);
  }

  getTasks() {
    this.taskService.getAllTasks().subscribe(list_tasks => this.tasks = list_tasks);
  }

  deleteAssociation(projectAcronym:string, taskId:string){
    this.taskService.deleteAssociation(projectAcronym, taskId).subscribe(values => {
      window.location.reload()
    });
    
  }

  constructor(private taskService : TaskService, private projectService: ProjectService, private router: Router) { }
}
