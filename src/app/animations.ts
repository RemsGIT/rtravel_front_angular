import {
  trigger,
  animate,
  transition,
  style,
  query, group,
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  trigger('routerTransition', [
    transition('* <=> *', [
      query(':enter, :leave', style({ position: 'fixed', opacity: 1 })),
      group([
        query(':enter', [
          style({ opacity:0 }),
          animate('1200ms ease-in-out', style({ opacity:1 }))
        ]),
        query(':leave', [
          style({ opacity:1 }),
          animate('1200ms ease-in-out', style({ opacity:0 }))]),
      ])
    ])
  ])
]);
