// Plain ES module: loaded only when the presentation component is rendered.
// No names, routes, or concept counts belong in this interaction layer.
export function focusWrapTarget(items, active, backwards) {
  if (!items.length) return undefined;
  if (backwards && (active === items[0] || !items.includes(active))) return items.at(-1);
  if (!backwards && (active === items.at(-1) || !items.includes(active))) return items[0];
}

export function mountConceptSwitcher(root) {
  const launch = root.querySelector('[data-cs-launch]');
  const dialog = root.querySelector('[data-cs-dialog]');
  const panel = root.querySelector('[data-cs-panel]');
  const fallback = root.querySelector('[data-cs-fallback]');
  const close = root.querySelector('[data-cs-close]');
  if (!launch || !dialog || !panel || !fallback || !close || typeof dialog.showModal !== 'function') return;
  let unlock;
  const lockScroll = () => {
    const body = document.body;
    const html = document.documentElement;
    const x = window.scrollX, y = window.scrollY;
    const bodyStyle = body.getAttribute('style');
    const htmlOverflow = html.style.overflow;
    const scrollbar = window.innerWidth - html.clientWidth;
    body.style.position = 'fixed'; body.style.top = `-${y}px`; body.style.left = `-${x}px`;
    body.style.width = '100%';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    html.style.overflow = 'hidden';
    return () => {
      if (bodyStyle === null) body.removeAttribute('style'); else body.setAttribute('style', bodyStyle);
      html.style.overflow = htmlOverflow;
      const behavior = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto'; window.scrollTo({ left: x, top: y, behavior: 'instant' }); html.style.scrollBehavior = behavior;
    };
  };
  const finishClose = () => {
    unlock?.(); unlock = undefined;
    launch.setAttribute('aria-expanded', 'false');
    launch.focus({ preventScroll: true });
  };
  dialog.append(panel);
  fallback.hidden = true; close.hidden = false; launch.hidden = false;
  launch.addEventListener('click', () => {
    if (dialog.open) return;
    dialog.showModal(); unlock = lockScroll();
    launch.setAttribute('aria-expanded', 'true'); close.focus({ preventScroll: true });
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', finishClose);
  // Keep Tab within the panel rather than allowing a jump to browser chrome.
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const items = [...dialog.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]')];
    const target = focusWrapTarget(items, document.activeElement, event.shiftKey);
    if (target) { event.preventDefault(); target.focus(); }
  });
  // Native modal dialogs supply Escape handling and background inertness.
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  panel.addEventListener('click', event => { if (event.target.closest('a[href]')) dialog.close(); });
  // Keep a restored bfcache page unlocked, with its control in the closed state.
  window.addEventListener('pagehide', () => { if (dialog.open) dialog.close(); unlock?.(); unlock = undefined; });
}
if (typeof document !== 'undefined') document.querySelectorAll('[data-concept-switcher]').forEach(mountConceptSwitcher);
