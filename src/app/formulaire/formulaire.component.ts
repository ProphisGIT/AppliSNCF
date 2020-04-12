import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {
  title = 'applisncf';
  array: any[];
  array2: any[];
  arrayMonnaies: any[];
  monnaies: string[] = [];
  idmonnaie: string;
  cityname: any[];
  cityname2: any[];
  myControl = new FormControl();
  myControl2 = new FormControl();
  city: string;
  city2: string;
  coordcity: Object[] = [];
  today: string;
  voyage: FormGroup;
  datetransform: string;
  submitted: Boolean = false;

  
  constructor(private http: HttpClient, private datepipe: DatePipe, private fb: FormBuilder) {
    this.today = this.datepipe.transform(Date.now(), 'yyyy-MM-dd');
  }

  ngOnInit() {
    this.getListeMonnaies().subscribe((data: any[]) => {
      this.arrayMonnaies = Object.values(data['results']);

      this.arrayMonnaies.forEach(element => {
        this.monnaies.push(element);
      });
    });

    this.voyage = this.fb.group({
      myControl: this.myControl,
      myControl2: this.myControl2,
      monnaie: [],
      dateinput: [],
      heure: []
    });
    this.onChanges();
  }
  getEtatProjetAdmin(val: string) {
    let url: string = 'https://api.sncf.com/v1/coverage/sncf/places?q=' + val + '&type[]=administrative_region';
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'fcacf0a1-8afd-43e1-a8ad-3eb03e0ac2d2'
      })
    };
    let observable: Observable<any> =
    this.http.get(url, httpOptions);
    return observable;
  }

  getListeMonnaies() {
    let url: string = 'https://free.currconv.com/api/v7/currencies?apiKey=f4ccbbbc8e3897627db1';
    let observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  onChanges(): void {
    this.myControl.valueChanges.subscribe(val => {
      if(val != "") {
        this.getEtatProjetAdmin(val).subscribe((data: any[]) => {
          if(data['places'] != undefined) {
            this.cityname = [];
            this.array = data['places'];
            this.city = this.array[0].administrative_region.id;
            this.coordcity['city1'] = this.array[0].administrative_region.coord;
            this.array.forEach(element => {
              this.cityname.push(element.name)
            });
          }
        });
      }
    });

    this.myControl2.valueChanges.subscribe(val => {
      if(val != "") {
        this.getEtatProjetAdmin(val).subscribe((data: any[]) => {
          if(data['places'] != undefined) {
            this.cityname2 = [];
            this.array2 = data['places'];
            // if(data['places'] != undefined) {
            //   this.other2 = data['places'];
            // }
            this.city2 = this.array2[0].administrative_region.id;
            this.coordcity['city2'] = this.array2[0].administrative_region.coord;
            this.array2.forEach(element => {
              this.cityname2.push(element.name);
            });
          }
        });
      }
    });

    this.voyage.valueChanges.subscribe((data: any[]) => {
      // console.log(this.voyage.get('monnaie').value);
      this.submitted = false;
    });
  }

  onSubmit() {
    // console.log(this.voyage.value);
    this.submitted = true;
    const heure = (this.voyage.get('heure').value).replace(':', '') + '00';
    this.datetransform = this.datepipe.transform(this.voyage.get('dateinput').value, 'yyyyMMdd') + 'T' + heure;
    this.idmonnaie = this.voyage.get('monnaie').value;
    console.log(this.submitted);
  }
}
