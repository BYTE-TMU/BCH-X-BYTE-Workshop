/**
 * One spring vocabulary for the whole app.
 *
 * Apple describes springs with two designer-facing numbers rather than the
 * physics triplet: *damping ratio* (overshoot — 1.0 settles without bounce,
 * below 1.0 oscillates) and *response* (how quickly the value reaches the
 * target, in seconds — not a duration, since a spring has no fixed one).
 * Motion's `bounce` + `duration` map onto those directly.
 *
 * The default is critically damped. Bounce is reserved for motion that follows
 * a real momentum gesture — overshoot on a menu that merely appeared reads as
 * a glitch, while overshoot on a card you flicked reads as physics.
 */

/** damping 1.0 / response 0.35 — anything that appears, moves or resizes. */
export const ui = { type: 'spring', bounce: 0, duration: 0.35 }

/** damping 1.0 / response 0.4 — repositioning an element that stays on screen. */
export const move = { type: 'spring', bounce: 0, duration: 0.4 }

/** damping ~0.8 / response 0.3 — drawers and sheets, which are dragged. */
export const sheet = { type: 'spring', bounce: 0.18, duration: 0.32 }

/** damping ~0.8 / response 0.4 — settling after a flick. Momentum only. */
export const flick = { type: 'spring', bounce: 0.22, duration: 0.4 }

export const springs = { ui, move, sheet, flick }
