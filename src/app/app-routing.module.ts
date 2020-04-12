import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CalculDistanceComponent } from './calcul-distance/calcul-distance.component';


const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'calcul', component: CalculDistanceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
