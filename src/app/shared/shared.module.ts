import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { LayoutComponent } from './layout/layout.component';
import { SharedMaterialModule } from './material.module';

@NgModule({
  imports: [
    CommonModule,
    // Material imports
    SharedMaterialModule
  ],
  declarations: [
    LayoutComponent
  ],
  exports: [
    CommonModule,
    LayoutComponent,
    MatButtonModule
  ]
})
export class SharedModule { }
