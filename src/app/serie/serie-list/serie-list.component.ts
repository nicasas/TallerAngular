import { Component, OnInit } from '@angular/core';
import { Serie } from '../serie';
import { SerieService } from '../serie.service';

@Component({
  selector: 'app-serie-list',
  templateUrl: './serie-list.component.html',
  styleUrls: ['./serie-list.component.css']
})
export class SerieListComponent implements OnInit {
  series: Array<Serie> = [];
  average: number = 0;
  dataShow: string = "";

  constructor(private serieService: SerieService) {}

  getSeries(): void {
    this.serieService.getSeries().subscribe((series) => {
      this.series = series;
      // Calculate the average after data is loaded
      this.getAverage();
    });
  }

  getAverage(): void {
    let series = 0;
    let suma = 0;
    for (var serie of this.series) {
      series++;
      suma += serie.seasons;
    }
    this.average = suma / series;
  }
  
  showData(): void {
    this.dataShow = "El promedio de temporadas es: " + this.average;
  }

  ngOnInit(): void {
    this.serieService.getSeries().subscribe((series) => {
      this.series = series;
      // Calculate the average after data is loaded
      this.getAverage();
      this.showData();
    });
  }

}
