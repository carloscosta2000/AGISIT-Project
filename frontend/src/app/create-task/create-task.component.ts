import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task-service';
import { Task } from 'src/models/task';
import { forbiddenTaskValidator } from '../validators/forbidden-task-directive';
import { Router } from '@angular/router';
import { forbiddenNumberValidator } from '../validators/forbidden-number.directive';
import { forbiddenStartDateValidator } from '../validators/forbidden-startDate.directive';


@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  task :any = { _id: '', taskName:'', priority:'', progressPerc:0, user: [], project: '', startDate: '', endDate: ''}
  tasks :any[] = []
  taskForm!: FormGroup;
  progressForm!: FormGroup;
  isLoggedIn: boolean = false;
  taskCreated: boolean = false;
  progressUpdated: boolean = false;
  tasksOfUser :any[] = [];
  number :number = 30;
  overlappingTask : boolean = false;

  constructor(private taskService :TaskService, private router: Router) { }

  ngOnInit(): void {
    const userRaw = localStorage.getItem('user');
    if(userRaw){
      this.isLoggedIn = true;
      const userJson = JSON.parse(userRaw);
      /* this.taskService.getTasksByUser(userJson["username"]).subscribe(tasks => {
        const newTaskOfUsers = []
        for(const task of tasks){
          let startDate = ""
          try{  
            startDate = new Date(task.startDate).toISOString().split("T")[0].split("-")[2] + "-" 
                      + new Date(task.startDate).toISOString().split("T")[0].split("-")[1] + "-" 
                      + new Date(task.startDate).toISOString().split("T")[0].split("-")[0] + " "
                      + new Date(task.startDate).toISOString().split("T")[1].split(":")[0] + ":"
                      + new Date(task.startDate).toISOString().split("T")[1].split(":")[1]
          }catch{

          }
          let endDate = "";
          try{
            endDate = new Date(task.endDate).toISOString().split("T")[0].split("-")[2] + "-" 
                    + new Date(task.endDate).toISOString().split("T")[0].split("-")[1] + "-" 
                    + new Date(task.endDate).toISOString().split("T")[0].split("-")[0] + " "
                    + new Date(task.endDate).toISOString().split("T")[1].split(":")[0] + ":"
                    + new Date(task.endDate).toISOString().split("T")[1].split(":")[1]
          }catch{

          }

          newTaskOfUsers.push({ _id: task._id, taskName:task.taskName, priority:task.priority, progressPerc:task.progressPerc, user: task.user, project: task.project, startDate: startDate, endDate: endDate})
        }
        console.log(newTaskOfUsers)
        this.tasksOfUser = newTaskOfUsers
      }); */ 

      this.taskService.getAllTasks().subscribe(tasks => {
        const newTaskOfUsers = []
        for(const task of tasks){
          let startDate = ""
          try{  
            startDate = new Date(task.startDate).toISOString().split("T")[0].split("-")[2] + "-" 
                      + new Date(task.startDate).toISOString().split("T")[0].split("-")[1] + "-" 
                      + new Date(task.startDate).toISOString().split("T")[0].split("-")[0] + " "
                      + new Date(task.startDate).toISOString().split("T")[1].split(":")[0] + ":"
                      + new Date(task.startDate).toISOString().split("T")[1].split(":")[1]
          }catch{

          }
          let endDate = "";
          try{
            endDate = new Date(task.endDate).toISOString().split("T")[0].split("-")[2] + "-" 
                    + new Date(task.endDate).toISOString().split("T")[0].split("-")[1] + "-" 
                    + new Date(task.endDate).toISOString().split("T")[0].split("-")[0] + " "
                    + new Date(task.endDate).toISOString().split("T")[1].split(":")[0] + ":"
                    + new Date(task.endDate).toISOString().split("T")[1].split(":")[1]
          }catch{

          }

          newTaskOfUsers.push({ _id: task._id, taskName:task.taskName, priority:task.priority, progressPerc:task.progressPerc, user: task.user, project: task.project, startDate: startDate, endDate: endDate})
        }
        console.log(newTaskOfUsers)
        this.tasks = newTaskOfUsers
      });
    }
    else
      this.router.navigate(['/login'])

    this.taskForm = new FormGroup({
      taskName: new FormControl(this.task.taskName,[
        Validators.required,
        Validators.minLength(4),
        forbiddenTaskValidator(),
      ]),
      priority: new FormControl(this.task.priority,[
        Validators.required,
      ]),
    });

    this.progressForm = new FormGroup({
      progress: new FormControl(this.task.progressPerc,[
        Validators.required,
        forbiddenNumberValidator(),
      ]),
      startDate: new FormControl(this.task.startDate,[
        //Validators.required,
        forbiddenStartDateValidator()
      ]),
      endDate: new FormControl(this.task.endDate, [
        forbiddenStartDateValidator()
      ])
    });
  }


  onSubmit(){
    if (this.taskForm.valid) {
      const userStr = localStorage.getItem('user');
      if(userStr){
        const userJson = JSON.parse(userStr);
        var userArray = [];
        userArray.push(userJson["username"])
        console.log(userArray)
        this.taskService.addTask({_id: '', taskName: this.taskForm.value.taskName, priority: this.taskForm.value.priority, progressPerc: 0, user: userArray, project: ''} as any).subscribe(task => {
          this.tasks.push(task);
          this.tasksOfUser.push(task);
          console.log("Task Nova: " + task.user)
        }); 
        this.taskCreated = true;
      }
    }
  }

  returnProgress(number: number) {
    return number.toString()
  }

  delete(task: Task) {
    this.tasksOfUser = this.tasksOfUser.filter(t => t !== task);
    this.tasks = this.tasks.filter(t => t !== task);
    this.taskService.deleteTask(task._id).subscribe();
  }

  updateProgress(task: Task) {
    this.taskService.updateProgress(task, this.progressForm.value.progress).subscribe();
    this.progressUpdated = true;
    window.location.reload()
  }

  updateDates(task: any) {
    //VERIFICACOES
    if (this.progressForm.value.startDate == "") {
      console.log("AQUI1")
      if(this.progressForm.value.endDate != "" && !this.verifyEndDateStr(this.progressForm.value.endDate, task.startDate)){
        this.progressForm.setErrors({
          endDate: true
        })
        return;
      }
    } else if (this.progressForm.value.endDate == "") {
      console.log("AQUI2")
      if(!this.verifyEndDateStr2(task.endDate, this.progressForm.value.startDate)){
        this.progressForm.setErrors({
          endDate: true
        })
        return;
      }
    } else {
      //tem os 2
      if(!this.verifyEndDate(this.progressForm.value.endDate, this.progressForm.value.startDate)){
        console.log("AQUI3")
        this.progressForm.setErrors({
          endDate: true
        })
        return;
      }
    }


    //ATUALIZAÇOES
    if (this.progressForm.value.startDate != "" && this.progressForm.value.endDate != "") {
      console.log("AMBAS")
      this.taskService.updateDates(task, this.progressForm.value.startDate, this.progressForm.value.endDate).subscribe(response => {
        if (response.toString() == "ERROR") {
          this.overlappingTask = true;        
        } else {
          window.location.reload()
        }
      })
    } else if (this.progressForm.value.startDate != "" && this.progressForm.value.endDate == "") {
      console.log("SO INICIO")
      this.taskService.updateStartDate(task, this.progressForm.value.startDate).subscribe(response => {
        if (response.toString() == "ERROR") {
          this.overlappingTask = true;        
        } else {
          window.location.reload()
        }
      })
    } else if (this.progressForm.value.startDate == "" && this.progressForm.value.endDate != "") {
      console.log("SO FIM")
      this.taskService.updateEndDate(task, this.progressForm.value.endDate).subscribe(response => {
        if (response.toString() == "ERROR") {
          this.overlappingTask = true;        
        } else {
          window.location.reload()
        }
      })
    }

  }

  verifyEndDate(endDateStr :string, startDateStr:string): boolean {
    const endDateObj: Date = new Date(endDateStr);
    const startDateObj: Date = new Date(startDateStr);
    return endDateObj >= startDateObj;
  }

  verifyEndDateStr(endDateStr :string, startDateStr:string): boolean {
    console.log(startDateStr)
    if (startDateStr == "" || startDateStr == undefined) {
      return true
    }
    const endDateObj: Date = new Date(endDateStr);
    const startDateObj: Date = new Date();
    startDateObj.setUTCFullYear(parseInt(startDateStr.split(" ")[0].split("-")[2]))
    startDateObj.setUTCMonth(parseInt(startDateStr.split(" ")[0].split("-")[1]) - 1)
    startDateObj.setUTCDate(parseInt(startDateStr.split(" ")[0].split("-")[0]))
    startDateObj.setHours(parseInt(startDateStr.split(" ")[0].split("-")[0]), parseInt(startDateStr.split(" ")[0].split("-")[1]))
    return endDateObj >= startDateObj;
  }

  verifyEndDateStr2(endDateStr :string, startDateStr:string): boolean {
    console.log(endDateStr)
    if (endDateStr == "" || endDateStr == undefined) {
      return true
    }
    const endDateObj: Date = new Date();
    const startDateObj: Date = new Date(startDateStr);
    endDateObj.setUTCFullYear(parseInt(endDateStr.split(" ")[0].split("-")[2]))
    endDateObj.setUTCMonth(parseInt(endDateStr.split(" ")[0].split("-")[1]) - 1)
    endDateObj.setUTCDate(parseInt(endDateStr.split(" ")[0].split("-")[0]))
    endDateObj.setHours(parseInt(endDateStr.split(" ")[0].split("-")[0]), parseInt(endDateStr.split(" ")[0].split("-")[1]))
    return endDateObj >= startDateObj;
  }

  getDateFormat(dateStr : Date) {
    
    return new Date(dateStr).toISOString().split("T")[0]
    // let returnValue = "";

    // if(typeof dateStr === "string" && dateStr != " "){
    //   let date = new Date(dateStr);
    //   console.log("1")

    //   let month :any = date.getMonth();
    //   if(date.getMonth() <= 9){
    //     month = "0" + date.getMonth()
    //   }

    //   let day :any = date.getDay();
    //   if(date.getDay() <= 9){
    //     day = "0" + date.getDay()
    //   }


    //   console.log(month + "/" + date.getDay() + "/" + date.getFullYear())
    //   return  date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear()
    // }
    // else if(typeof dateStr == "object"){
    //   let date = new Date(dateStr);
    //   console.log("2")
    //   console.log(date)
    //   return date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear()
    // }else{
    //   console.log("3")
    //   console.log(typeof dateStr)
    // }
    // return returnValue;
  }

  get progress() {return this.progressForm.get("progress")};

  get taskName() {return this.taskForm.get("taskName")};
  get priority() {return this.taskForm.get("priority")};
  //get progressPerc() {return this.taskForm.get("progressPerc")};
  get user() {return this.taskForm.get("user")};
  get startDate() {return this.progressForm.get("startDate")};
  get endDate() {return this.progressForm.get("endDate")};

  isToday(date: Date) {
    let today = new Date()
    //se tiverem menos de 1 segundo de diferença consideram-se iguais
    return (today.getTime() - date.getTime()) < 1000
  }
}
