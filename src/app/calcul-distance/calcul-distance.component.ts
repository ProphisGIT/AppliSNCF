import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calcul-distance',
  templateUrl: './calcul-distance.component.html',
  styleUrls: ['./calcul-distance.component.css']
})
export class CalculDistanceComponent implements OnInit {
  distance: Number;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    console.log('test');
    this.setCalculDistance().subscribe((data: any) => {
      this.distance = data.return;
      console.log(this.distance);
    });
  }

  setCalculDistance(): Observable<any> {
    const url = 'http://localhost:8001/calcul';
    const data = {arg0: 45.902016, arg1: 6.121056, arg2: 45.571351, arg3: 5.919557, arg4: 'K'};

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
