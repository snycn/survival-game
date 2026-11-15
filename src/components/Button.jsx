import { usePressFeedback } from '../pressFeedback.js'

/**
 * Shared clickable control. Always renders a real <button> so every action is
 * keyboard- and screen-reader-accessible.
 *
 * variant: 'plain' (no chrome, for icon/row/tile buttons) or 'solid' (bordered pixel panel).
 * Clicking plays the click sound and shakes the surrounding PhoneFrame.
 * Any extra props (aria-label, ref, disabled, …) are passed through to the <button>.
 */
function Button({ variant = 'plain', type = 'button', className, onClick, children, ...props }) {
  const pressFeedback = usePressFeedback()
  const classes = ['button', `button--${variant}`, className].filter(Boolean).join(' ')

  function handleClick(event) {
    pressFeedback()
    onClick?.(event)
  }

  return (
    <button type={type} className={classes} onClick={handleClick} {...props}>
      {children}
    </button>
  )
}

export default Button
