import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-affichage-infos',
  templateUrl: './affichage-infos.component.html',
  styleUrls: ['./affichage-infos.component.css']
})
export class AffichageInfosComponent implements OnInit, OnChanges {
  @Input() city: string;
  @Input() city2: string;
  @Input() myControl: FormControl;
  @Input() myControl2: FormControl;
  @Input() datetransform: string;
  @Input() coordcity: Object[];
  @Input() submitted: Boolean;
  @Input() idmonnaie: string;

  traveldata: any[];
  distance: number;
  distancestring: string;
  cityname1: string;
  cityname2: string;
  prixtotal: number;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getVoyage(this.city, this.city2, this.datetransform).subscribe((data: any[]) => {
      let city1 = this.myControl.value.split(" ");
      let city2 = this.myControl2.value.split(" ");

      this.cityname1 = city1[0];
      this.cityname2 = city2[0];

      // this.city = city1[0];
      // this.city2 = city2[0];

      this.traveldata = data['journeys'];
      // console.log(this.traveldata);
    });
    this.setCalculDistance().subscribe((data: any) => {
      this.distance = data.return;
      this.distancestring = this.distance.toFixed(2);
      this.calculPrix(this.idmonnaie, this.distancestring);
    });
    // this.setCalculPrix(this.idmonnaie, this.distance).subscribe((data: any) => {
    //   console.log(data);
    // });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getVoyage(this.city, this.city2, this.datetransform).subscribe((data: any[]) => {
      let city1 = this.myControl.value.split(" ");
      let city2 = this.myControl2.value.split(" ");

      this.cityname1 = city1[0];
      this.cityname2 = city2[0];

      // this.city = city1[0];
      // this.city2 = city2[0];

      this.traveldata = data['journeys'];
      console.log(this.coordcity);
    });
  }

  calculPrix(idmonnaie, distance) {
    this.setCalculPrix(idmonnaie, distance).subscribe((data: any) => {
      this.prixtotal = data;
    });
  }

  getVoyage(source: string, dest: string, heure: string) {
    let url: string = 'https://api.sncf.com/v1/coverage/sncf/journeys?from=' + source + '&to=' + dest + '&datetime=' + heure + '&count=10&data_freshness=realtime&max_nb_journeys=1&max_nb_transfers=0';
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'fcacf0a1-8afd-43e1-a8ad-3eb03e0ac2d2'
      })
    };
    let observable: Observable<any> =
    this.http.get(url, httpOptions);
    return observable;
  }

  setCalculDistance(): Observable<any> {
    const url = '/api/calcul';
    const data = {arg0: this.coordcity['city1'].lat, arg1: this.coordcity['city1'].lon, arg2: this.coordcity['city2'].lat, arg3: this.coordcity['city2'].lon, arg4: 'K'};
    console.log(data);

    // console.log(JSON.stringify(data));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }

  setCalculPrix(idmonnaie: string, distance: string): Observable<any> {
    const url = '/api/calculprix';
    const data = { idmonnaie: idmonnaie, distance: distance };
    // console.log(data);

    // console.log(JSON.stringify(data));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }

}
