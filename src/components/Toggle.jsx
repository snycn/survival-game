import { usePressFeedback } from '../pressFeedback.js'

/**
 * Shared show/hide toggle. Built on native <details>/<summary>, so keyboard
 * support and the expanded/collapsed state are announced without extra ARIA.
 *
 * label:       content of the always-visible toggle control.
 * defaultOpen: whether the content starts expanded.
 * onToggle:    called with the new open state (true/false) after each toggle.
 * Clicking the label plays the click sound and shakes the surrounding PhoneFrame.
 * Any extra props are passed through to the <details>.
 */
function Toggle({ label, defaultOpen = false, onToggle, className, children, ...props }) {
  const pressFeedback = usePressFeedback()
  const classes = ['toggle', className].filter(Boolean).join(' ')

  return (
    <details
      className={classes}
      open={defaultOpen}
      onToggle={onToggle && ((event) => onToggle(event.currentTarget.open))}
      {...props}
    >
      <summary className="toggle__label" onClick={pressFeedback}>{label}</summary>
      {children}
    </details>
  )
}

export default Toggle
