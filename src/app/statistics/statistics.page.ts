import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { Chart } from "chart.js";
import { FirebaseAuthService } from '../firebase-auth.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
 

  constructor(private authService: FirebaseAuthService) { }

  ngOnInit() {
   

  }
 

}
