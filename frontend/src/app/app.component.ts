import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Config from "../config.json";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  environment = Config.ENV;
  baseUrl = Config.BASE_URL;

  constructor(private router: Router) { }

  title = 'frontend';

  logout(){
    localStorage.setItem('user', "");
    this.router.navigate(['/login'])
  }

  isLoggedIn(){
    const userRaw :any = localStorage.getItem('user');
    let isLoggedIn = false;
    if(userRaw){
      isLoggedIn = true;
    }
    return isLoggedIn;
  }

  isAdmin(){
    const userRaw = localStorage.getItem('user');
    if(userRaw){
      const userJson = JSON.parse(userRaw)
      if(userJson["isAdmin"]){
        return true;
      }
    }
    return false;
  }
}

