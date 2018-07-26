/**
 * The SVG images of playing cards used in this component are from the following source:
 * ------------------------------------------------------------------------------------
 * Vectorized Playing Cards 2.0 - http://sourceforge.net/projects/vector-cards/
 * Copyright 2015 - Chris Aguilar - conjurenation@gmail.com
 * Licensed under LGPL 3 - www.gnu.org/copyleft/lesser.html
 * ------------------------------------------------------------------------------------
 */

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Card } from '../interfaces/card.interface';

@Component({
  selector: 'ab-poker-card',
  templateUrl: './poker-card.component.html',
  styleUrls: ['./poker-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokerCardComponent implements OnInit {
  @Input() card: Card;

  backgroundImage: SafeStyle;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle(`url(./assets/images/cards/${this.card.rank}_${this.card.suite}.svg)`);
  }

}
