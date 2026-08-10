/**
 * Where a flick would come to rest.
 *
 * Snapping to the nearest boundary from the *release point* ignores how hard
 * the user threw the element, so a fast short flick and a slow short drag land
 * in the same place. Projecting the momentum forward first — the same
 * exponential decay scroll deceleration uses — is what makes a flick feel like
 * a throw.
 *
 * This is Apple's projection from the *Designing Fluid Interfaces* sample code,
 * not the physics-textbook v²/(2·decel) form.
 *
 * @param {number} initialVelocity px/s at the moment of release
 * @param {number} decelerationRate 0.998 for normal scroll feel, 0.99 for snappier
 * @returns {number} distance travelled past the release point, in px
 */
export function project(initialVelocity, decelerationRate = 0.998) {
  return ((initialVelocity / 1000) * decelerationRate) / (1 - decelerationRate)
}

/**
 * Progressive resistance past a boundary. A hard stop reads as frozen; damping
 * that grows with the overshoot reads as "responsive, but there is nothing more
 * here" — which is the truthful signal.
 *
 * @param {number} overshoot how far past the bound the pointer is, in px
 * @param {number} dimension the size of the dragged surface, in px
 */
export function rubberband(overshoot, dimension, constant = 0.55) {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot))
}
