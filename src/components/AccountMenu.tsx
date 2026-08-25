import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * The header's account affordance: a disclosure button that reveals a small
 * anchored panel holding the account actions. Today that is Sign out alone,
 * which is deliberate — the header used to spend a whole column on the
 * learner's email address, and the menu exists to take that space back, not to
 * become a settings screen.
 *
 * Deliberately a disclosure (`aria-expanded` + `aria-controls`) rather than an
 * ARIA menu: the panel holds ordinary buttons, so assistive technology and the
 * browser test suite both see a plain `button` named "Sign out" instead of a
 * `menuitem` that would need arrow-key navigation to be honest about its role.
 *
 * Dismissal follows the lightbox convention in `shared.tsx`: Escape closes, and
 * a pointer press outside closes. Focus moves into the panel on open and
 * returns to the trigger whenever the panel closes from the keyboard or from
 * activating an action, so a keyboard learner is never dropped at the top of
 * the document.
 */
export function AccountMenu(props: { onSignOut: () => void }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstItemRef = useRef<HTMLButtonElement>(null);
  const panelId = 'account-menu-panel';

  const closeAndRefocus = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    firstItemRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeAndRefocus();
    };
    // `pointerdown` rather than `click` so a press that starts outside closes
    // the panel before that press can land on whatever is underneath.
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    // Tabbing past the last item is also a dismissal; without this the panel
    // would stay open behind a keyboard learner who has already moved on.
    const onFocusOut = (event: FocusEvent) => {
      const next = event.relatedTarget as Node | null;
      if (next && !wrapRef.current?.contains(next)) setOpen(false);
    };

    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onPointerDown);
    const wrap = wrapRef.current;
    wrap?.addEventListener('focusout', onFocusOut);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onPointerDown);
      wrap?.removeEventListener('focusout', onFocusOut);
    };
  }, [closeAndRefocus, open]);

  return (
    <div className="account-menu" ref={wrapRef}>
      <button
        ref={triggerRef}
        type="button"
        className={`account-menu-trigger${open ? ' open' : ''}`}
        aria-expanded={open}
        // The panel is not rendered while closed, so advertising it would leave
        // a dangling reference. `aria-expanded` carries the state in both.
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((value) => !value)}
      >
        Account
      </button>
      {open && (
        <div className="account-menu-panel" id={panelId} role="group" aria-label="Account">
          <button
            ref={firstItemRef}
            type="button"
            className="account-menu-item"
            onClick={() => {
              // Closed first so the panel cannot outlive the click: a failed
              // sign-out re-renders this component in place.
              closeAndRefocus();
              props.onSignOut();
            }}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
