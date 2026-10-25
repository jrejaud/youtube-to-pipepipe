// Any tapped YouTube link goes to PipePipe.
document.addEventListener('click', function (e) {
  var a = e.target && e.target.closest && e.target.closest('a[href]');
  var u = a && ytTarget(a.href);
  if (!u) return;
  e.preventDefault();
  e.stopImmediatePropagation();
  location.href = toIntent(u);
}, true);

// Landing on a YouTube page directly (typed URL, redirect, custom tab from another app):
// hand it to PipePipe and leave this tab where it was.
(function () {
  var u = ytTarget(location.href);
  if (!u || window.top !== window) return;
  var hadHistory = history.length > 1;
  location.href = toIntent(u);
  setTimeout(function () { if (hadHistory) history.back(); else window.close(); }, 800);
})();
