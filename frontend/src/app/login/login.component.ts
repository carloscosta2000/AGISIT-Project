import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/models/user';
import { UserService } from '../services/user-service';
import { FormBuilder } from '@angular/forms';
import { isEmpty } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validUsername: boolean = false;
  user :User = { _id: '', username: '', password: '', isAdmin: false};
  users :User[] = [];

 loginForm !: FormGroup 
 
  bool = true;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(this.user.username),
      password: new FormControl(this.user.password)
    })
  }

  onSubmit(): Boolean {
    this.userService.checkLogin(this.loginForm.value.username, this.loginForm.value.password).subscribe(user => {
      
      if (user != undefined) {//existe user, fazer login
        this.bool = true;
        console.log("User logged in!");
        this.router.navigate(['/usertasks'])
        this.user = user;
        console.log(user)
        localStorage.setItem("user", JSON.stringify(user));
        return true;
      } else {
        this.bool = false;
        console.log("User data is wrong, login failed!");
        return false;
      }
    });
    return false;
  }

  checkBool(): Boolean{
    return this.bool;
  }

}
