import {
  trigger,
  animate,
  transition,
  style,
  query, group, animateChild, stagger, keyframes,
} from '@angular/animations';

export const fadeAnimation =
  trigger('routeAnimations', [
    transition(
      '* <=> *',
      animate(
        '300ms cubic-bezier(0.645, 0.045, 0.355, 1)',
        keyframes([
          style({opacity: 0}),
          style({opacity: 1}),
        ]),
      ),
    ),
  ]);
