import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { PokerCardComponent } from './poker-card/poker-card.component';
import { PokerRoutingModule } from './poker-routing.module';
import { PokerComponent } from './poker.component';
import { PokerService } from './services/poker.service';


@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PokerRoutingModule,
    SharedMaterialModule
  ],
  declarations: [PokerComponent, PokerCardComponent],
  providers: [
    PokerService
  ]
})
export class PokerModule { }
