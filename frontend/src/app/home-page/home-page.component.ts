import { Component, OnInit } from '@angular/core';
import { DBService } from '../services/db-service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private dbService: DBService) { }

  dbReseted :boolean = false;

  ngOnInit(): void {
  }

  resetDB(): void {

    this.dbService.resetDB().subscribe(object => {
      this.dbReseted = true;
    });
  }

}
