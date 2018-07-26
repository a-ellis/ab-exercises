import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokerComponent } from './poker.component';

const routes: Routes = [
  {
    path: '',
    component: PokerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokerRoutingModule { }
