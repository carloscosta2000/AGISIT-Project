import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forbiddenAcronymValidator } from '../validators/forbidden-acronym.directive';
import { forbiddenStartDateValidator } from '../validators/forbidden-startDate.directive';
import { forbiddenProjectNameValidator } from '../validators/forbidden-project-name.directive';
import { Project } from 'src/models/project';
import { ProjectService } from '../services/project-service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  project :any = {_id: "", projectName: "", acronym: "", startDate: "", endDate: ""};
  projectForm!: FormGroup;
  projects: Project[] = [];
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  projectCreated :boolean = false;

  
  ngOnInit(): void {
 
    const userRaw = localStorage.getItem('user');
    if(userRaw){
      this.isLoggedIn = true;
      const userJson = JSON.parse(userRaw)
      if(userJson["isAdmin"]){
        this.isAdmin = true;
      }
    }else{
      this.router.navigate(['/login'])
    }

    this.projectForm = new FormGroup({
      projectName: new FormControl(this.project.projectName,[
        Validators.required,
        Validators.minLength(4),
        forbiddenProjectNameValidator(),
      ]),
      acronym: new FormControl(this.project.acronym,[
        Validators.required,
        Validators.minLength(3),
        forbiddenAcronymValidator(),
      ]),
      startDate: new FormControl(this.project.startDate,[
        Validators.required,
        forbiddenStartDateValidator()
      ]),
      endDate: new FormControl(this.project.endDate)
    });
  }

  onSubmit() {
    //Verificar se a Endate é válida
    if(this.projectForm.value.endDate != "" && !this.verifyEndDate(this.projectForm.value.endDate, this.projectForm.value.startDate)){
      this.projectForm.setErrors({
        endDate: true
      })
      return;
    }


    //verificar se acronimo é unico
    this.projectService.getProjectByAcronym(this.projectForm.value.acronym).subscribe(project => {
      if(project == undefined){
        //criar projecto
        if (this.projectForm.value.endDate != null) {
          //com endDate
          this.projectService.addProject({projectName: this.projectForm.value.projectName, acronym: this.projectForm.value.acronym, 
            startDate: this.projectForm.value.startDate, endDate: this.projectForm.value.endDate} as Project).subscribe(project => {
            this.projects.push(project);
            })
        } else {
          //sem endDate
          this.projectService.addProject({projectName: this.projectForm.value.projectName, acronym: this.projectForm.value.acronym, 
          startDate: this.projectForm.value.startDate} as Project).subscribe(project => {
          this.projects.push(project);
          })
        }
        this.projectCreated = true;
      }else{
        this.projectForm.setErrors({
          uniqueName: true
        })
      }
    });

    
    
    
  }

  verifyEndDate(endDateStr :string, startDateStr:string): boolean {
    const endDateObj: Date = new Date(endDateStr);
    const startDateObj: Date = new Date(startDateStr);
    return endDateObj >= startDateObj;
  }

  get projectName() {return this.projectForm.get("projectName")};
  get acronym() {return this.projectForm.get("acronym")};
  get startDate() {return this.projectForm.get("startDate")};
  get endDate() {return this.projectForm.get("endDate")};

  constructor(private projectService :ProjectService, private router: Router) { }

}
