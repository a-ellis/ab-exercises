import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { fadeInOut, transitionInOut } from './animations/poker.animations';
import { Hand } from './interfaces/hand.interface';
import { HandRankMessage } from './models/hand-rank-message.model';
import { PokerService } from './services/poker.service';
import { pokerHandValidator } from './validators/poker-hand.validator';

@Component({
  selector: 'ab-exercises',
  templateUrl: './poker.component.html',
  styleUrls: ['./poker.component.scss'],
  animations: [transitionInOut(), fadeInOut()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokerComponent implements OnInit {
  pokerForm: FormGroup;
  rank$: Observable<HandRankMessage>;
  hand$: Observable<Hand>;
  throttleSubmit: boolean;

  constructor(private formBuilder: FormBuilder, public pokerService: PokerService) { }

  ngOnInit() {
    this.pokerForm = this.formBuilder.group({
      pokerHand: ['', [
        Validators.required,
        pokerHandValidator
      ]
    ]
    });

    this.rank$ = this.pokerService.rank$;
    this.hand$ = this.pokerService.hand$;
  }

  evaluateHand() {
    if (this.pokerForm.valid) {
      this.pokerService.evaluateHandRank(this.pokerForm.value.pokerHand);
      this.throttleSubmit = true;
    }
  }

  handIsChanging() {
    this.throttleSubmit = false;
    this.pokerService.handIsChanging();
  }

}
