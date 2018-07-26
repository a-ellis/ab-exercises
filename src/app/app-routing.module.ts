import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'poker',
    loadChildren: './poker/poker.module#PokerModule'
  },
  {
    path: '',
    redirectTo: 'poker',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'poker'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
