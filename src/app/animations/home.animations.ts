import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';

const swipeToRight = [
	style({ position: 'relative' }),
	query(':enter, :leave', [
		style({
			position: 'absolute',
			top: 0,
			right: 0,
			width: '100%'
		})
	]),
	query(':enter', [style({ right: '-100%', opacity: 0 })]),
	query(':leave', animateChild()),
	group([
		query(':leave', [animate('1s ease-in-out', style({ right: '100%', opacity: 0 }))]),
		query(':enter', [animate('1s ease-in-out', style({ right: '0%', opacity: 1 }))])
	]),
	query(':enter', animateChild())
];

const swipeToLeft = [
	style({ position: 'relative' }),
	query(':enter, :leave', [
		style({
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%'
		})
	]),
	query(':enter', [style({ left: '-100%', opacity: 0 })]),
	query(':leave', animateChild()),
	group([
		query(':leave', [animate('1s ease-in-out', style({ left: '100%', opacity: 0 }))]),
		query(':enter', [animate('1s ease-in-out', style({ left: '0%', opacity: 1 }))])
	]),
	query(':enter', animateChild())
];

const outEffect = [
	style({ position: 'relative' }),
	query(':enter, :leave', [
		style({
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%'
		})
	]),
	query(':enter', [style({ top: '-100%', opacity: 0 })]),
	query(':leave', animateChild()),
	group([
		query(':leave', [animate('1s ease-in-out', style({ top: '100%', opacity: 0 }))]),
		query(':enter', [animate('1s ease-in-out', style({ top: '0%', opacity: 1 }))])
	]),
	query(':enter', animateChild())
];

const slideToBottom = [
	query(':enter, :leave', style({ position: 'fixed', left: 0, right: 0, top: 0, bottom: 0 }), { optional: true }),
	query(':leave', style({ transform: 'translateY(0%)' }), { optional: true }),
	query(':enter', style({ transform: 'translateY(-100%)' }), { optional: true }),
	group([
		query(':leave', [
			animate('1s ease-in-out', style({ transform: 'translateY(100%)' })),
		], { optional: true }),
		query(':enter', [
			animate('1s ease-in-out', style({ transform: 'translateY(0%)' })),
		], { optional: true })
	])
];

const slideToTop = [
    query(':enter, :leave', style({ position: 'fixed', left: 0, right: 0, top: 0, bottom: 0 }),{ optional: true }),
    query(':leave', style({ transform: 'translateY(0%)' }), { optional: true }),
    query(':enter', style({ transform: 'translateY(100%)' }),{ optional: true }),
    group([
        query(':leave', [
            animate('1s ease-in-out', style({ transform: 'translateY(-100%)' })),
        ], { optional: true }),
        query(':enter', [
            animate('1s ease-in-out', style({ transform: 'translateY(0%)' })),
        ],{ optional: true })
    ])
];

export const homeTransitionAnimations = trigger('routeAnimations', [
	transition('PublicacoesAnimation => ChatsAnimation, PublicacoesAnimation => PerfilAnimation, ChatsAnimation => PerfilAnimation, ChatUserAnimation => PerfilAnimation, PublicacoesAnimation => ChatUserAnimation',
		swipeToRight),
	transition('ChatsAnimation => PublicacoesAnimation, PerfilAnimation => ChatsAnimation, PerfilAnimation => PublicacoesAnimation, PerfilAnimation => ChatUserAnimation,  ChatUserAnimation => PublicacoesAnimation', 
		swipeToLeft),
	transition('EditAnimation => PerfilAnimation, PerfilAnimation => EditAnimation', 
		outEffect),
	transition('ChatUserAnimation => ChatsAnimation', 
		slideToBottom),
		transition('ChatsAnimation => ChatUserAnimation', 
		slideToTop)
]);
