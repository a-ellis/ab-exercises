import { NgModule } from '@angular/core';
import { MatButtonModule, MatDividerModule, MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatDividerModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatDividerModule
  ]
})
export class SharedMaterialModule { }
