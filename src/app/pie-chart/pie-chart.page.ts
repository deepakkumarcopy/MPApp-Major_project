import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FirebaseAuthService } from "../firebase-auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Chart } from "chart.js";

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.page.html",
  styleUrls: ["./pie-chart.page.scss"],
})
export class PieChartPage implements OnInit {
  @ViewChild("barCanvas") barCanvas: ElementRef;
  // @ViewChild("barChart") barChart: ElementRef;
  savingsList = [];
  data: any;
  sub: any;
  length: any;
  private barChart: Chart;

  // bars: any;
  colorArray: any;
  constructor(
    private route: Router,
    private authService: FirebaseAuthService
  ) {}
  //initialization function for getting the data from previous pages
  ngOnInit() {
    this.data = this.authService.pieParam;
    this.authService.read_saving_by_month(this.data).subscribe((data) => {
      this.length == data.length;

      this.savingsList = data.map((e) => {
        console.log("Month", e.payload.doc.data()["timestamp"].toDate());
        console.log(
          "Date",
          e.payload.doc.data()["timestamp"].toDate().getDate()
        );
        console.log(
          "Month",
          e.payload.doc.data()["timestamp"].toDate().getMonth()
        );
        console.log(
          "Year",
          e.payload.doc.data()["timestamp"].toDate().getFullYear()
        );
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Amount: e.payload.doc.data()["amountSaved"],
          // description: e.payload.doc.data()["description"],
          timestamp:
            e.payload.doc.data()["timestamp"].toDate().getDate().toString() +
            "-" +
            e.payload.doc.data()["timestamp"].toDate().getMonth().toString() +
            "-" +
            e.payload.doc.data()["timestamp"].toDate().getFullYear().toString(),
        };
      });
      console.log("date check", this.savingsList);

      this.createBarChart();
    });
  }

  //function for creating pie chart
  createBarChart() {
    let savingsList = this.savingsList;
    let arrayListAmount = [];
    let arrayListTime = [];
    for (let i in savingsList) {
      arrayListAmount.push(savingsList[i].Amount);
      arrayListTime.push(savingsList[i].timestamp);
    }
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: arrayListTime,
        datasets: [
          {
            label: "Transaction per day",
            data: arrayListAmount,
            backgroundColor: [
              // "rgb(38, 194, 129)",
              // "rgb(38, 194, 129)",
              // "rgb(38, 194, 129)",
              // "rgb(38, 194, 129)",
              // "rgb(38, 194, 129)",
              // "rgb(38, 194, 129)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(38, 194, 129, 0.5)",

              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(255, 159, 64, 0.5)",
              "rgba(164, 186, 32, 0.5)",
              "rgba(255, 118, 86, 0.5)",
              "rgba(54, 102, 64, 0.5)",
              "rgba(159, 235, 23, 0.5)",
              "rgba(96, 38, 32, 0.5)",
              "rgba(255, 159, 235, 0.5)",
            ],
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }
  //routed to details page
  showdetails() {
    this.authService.details(this.savingsList);
    console.log(this.savingsList);
    this.route.navigate(["/details"]);
  }
}
