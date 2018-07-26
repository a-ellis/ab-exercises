import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export function transitionInOut(): AnimationTriggerMetadata {
  return trigger('transitionInOut', [
    state('in', style({ opacity: 1, transform: 'translate3d(0,0,0)'})),
    transition(':enter', [
      style({ opacity: 0, transform: 'translate3d(0,50%,0)'}),
      animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')
    ]),
    transition(':leave', [
      animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ opacity: 0, transform: 'translate3d(0,25%,0)' }))
    ])
  ]);
}

export function fadeInOut(): AnimationTriggerMetadata {
  return trigger('fadeInOut', [
    state('in', style({ opacity: 1})),
    transition(':enter', [
      style({ opacity: 0}),
      animate('300ms 200ms cubic-bezier(0.4, 0.0, 0.2, 1)')
    ]),
    transition(':leave', [
      animate('150ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ opacity: 0}))
    ])
  ]);
}
