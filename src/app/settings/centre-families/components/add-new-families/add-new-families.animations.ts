import {
  state, trigger, style,
  animate, keyframes, transition,
  AnimationEntryMetadata
} from '@angular/core';

const animationCurve = 'cubic-bezier(0.47,0,0.745,0.715)';
const timingCurve = (time: number = .2) => time + 's ' + animationCurve;

export const addFamiliesModalAnimations: AnimationEntryMetadata[] = [
  trigger('modal', [
    state('true', style({ transform: 'none' })),
    state('false', style({ transform: 'translateY(-80vh)' })),
    transition('0 => 1', [
      animate(timingCurve(0.3), style(
        { transform: 'none', opacity: 1 }
      ))
    ]),
    transition('1 => 0', [
      style({ opacity: 0.3 }),
      animate(timingCurve(), style(
        { transform: 'translateY(-80vh)', opacity: 0 }
      ))
    ])
  ]),
  trigger('backdrop', [
    state('true', style({ visibility: 'visible' })),
    state('false', style({ visibility: 'hidden' })),
    transition('0 => 1', [
      animate(timingCurve(), style({ opacity: 1 }))
    ]),
    transition('1 => 0', [
      animate(timingCurve(), style({ opacity: 0 }))
    ])
  ])
]
