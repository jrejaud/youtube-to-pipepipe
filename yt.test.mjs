import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const { ytTarget, toIntent } = createRequire(import.meta.url)('./yt.js');

const yes = ['https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://youtu.be/dQw4w9WgXcQ?t=5',
  'https://m.youtube.com/watch?v=x&list=y', 'https://music.youtube.com/watch?v=x', 'https://youtube.com/shorts/abc',
  'https://www.youtube.com/@mkbhd', 'https://www.youtube.com/@mkbhd/videos', 'https://www.youtube.com/channel/UC123',
  'https://www.youtube.com/playlist?list=PL1', 'https://www.youtube.com/live/abc'];
const no = ['https://www.youtube.com/', 'https://www.youtube.com/results?search_query=x', 'https://www.youtube.com/watch',
  'https://studio.youtube.com/channel/UC1', 'https://accounts.google.com/x', 'https://youtu.be/',
  'https://www.youtube.com/watch?v=x&pp_skip=1', 'https://notyoutube.com/watch?v=x', 'https://example.com/?u=youtube.com/watch'];

test('YouTube content URLs are routed', () => { for (const h of yes) assert.ok(ytTarget(h), h); });
test('everything else is left alone', () => { for (const h of no) assert.equal(ytTarget(h), null, h); });
test('intent leaves the app choice to Android and falls back without looping', () => {
  const i = toIntent(ytTarget('https://youtu.be/dQw4w9WgXcQ?t=5'));
  assert.match(i, /^intent:\/\/youtu\.be\/dQw4w9WgXcQ\?t=5#Intent;scheme=https;S\.browser_fallback_url=/);
  assert.doesNotMatch(i, /package=/);
  const fb = decodeURIComponent(i.match(/browser_fallback_url=([^;]+)/)[1]);
  assert.equal(ytTarget(fb), null);
});
