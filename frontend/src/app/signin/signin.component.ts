import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forbiddenNameValidator } from '../validators/forbidden-name.directive';
import { forbiddenPasswordValidator } from '../validators/forbidden-password.directive';
import { specialCharsValidator } from '../validators/specialCharsValidator';
import { UserService } from '../services/user-service';
import { User } from 'src/models/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  validUsername: boolean = false;
  user :User = { _id: '', username: '', password: '', isAdmin: false};
  users :User[] = [];

  userForm!: FormGroup;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  userCreated: boolean = false;

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

    console.log("isLoggedIn: " + this.isLoggedIn)
    console.log("isAdmin: " + this.isAdmin)

    this.userForm = new FormGroup({
      name: new FormControl(this.user.username, [
        Validators.required,
        Validators.minLength(3),
        forbiddenNameValidator(),
      ]),
      password: new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(8),
        forbiddenPasswordValidator(),
        specialCharsValidator(),
      ]),
      // uniqueName: new FormControl(this.user.name, {
      //   asyncValidators: [this.nameValidator.validate.bind(this.nameValidator)],
      // })
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.getUser(this.userForm.value.name).subscribe(user => {
        if(user == undefined){
          this.userService.addUser({username: this.userForm.value.name, password: this.userForm.value.password, isAdmin: false} as User).subscribe(user => {
            this.users.push(user);
            this.userCreated = true;
          });
        }else{
          this.userForm.setErrors({
            uniqueName: true
          })
        }
      });  
    }
  }

  get name() { return this.userForm.get('name')!; }

  get password() { return this.userForm.get('password')!; }

  get uniqueName() {return this.userForm.get('uniqueName')!; }

  constructor(private userService: UserService, private router: Router) { }

}
