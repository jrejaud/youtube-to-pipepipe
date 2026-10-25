// Shared by content.js and the node test. Decides which URLs leave the browser.
var YT_HOSTS = ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com'];
var YT_PATHS = /^\/(watch|playlist)$|^\/(shorts|live|embed|channel|c|user)\/[^/]+|^\/@[^/]+/;

function ytTarget(href) {
  var u;
  try { u = new URL(href); } catch (e) { return null; }
  if (!/^https?:$/.test(u.protocol) || u.searchParams.has('pp_skip')) return null;
  if (u.hostname === 'youtu.be') return u.pathname.length > 1 ? u : null;
  if (YT_HOSTS.indexOf(u.hostname) < 0) return null;
  if (!YT_PATHS.test(u.pathname)) return null;
  if (u.pathname === '/watch' && !u.searchParams.has('v')) return null;
  if (u.pathname === '/playlist' && !u.searchParams.has('list')) return null;
  return u;
}

// No package in the intent: Android sends it to whichever app is the default for YouTube
// links (PipePipe, NewPipe, Tubular, LibreTube...). If none is, the browser falls back to
// the page itself with pp_skip=1 so the redirect cannot loop.
function toIntent(u) {
  var fb = new URL(u.href);
  fb.searchParams.set('pp_skip', '1');
  return 'intent://' + u.host + u.pathname + u.search + '#Intent;scheme=https;' +
    'S.browser_fallback_url=' + encodeURIComponent(fb.href) + ';end';
}

if (typeof module !== 'undefined') module.exports = { ytTarget: ytTarget, toIntent: toIntent };
