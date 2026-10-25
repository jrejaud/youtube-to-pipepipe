# YouTube to PipePipe

A tiny browser extension for Android that sends YouTube links to your YouTube app of choice
([PipePipe](https://github.com/InfinityLoop1308/PipePipe), [NewPipe](https://newpipe.net),
Tubular, LibreTube...) instead of loading them in the browser.

Android's "Open by default" setting already sends YouTube links from other apps to PipePipe.
It does nothing for links inside the browser: tap a YouTube link on a web page, type a YouTube
URL, or open one in an app's in-app browser, and the browser just loads youtube.com. This
extension closes that gap.

## What it catches

Videos, shorts, live streams, channels (`/@name`, `/channel/`, `/c/`, `/user/`), playlists and
`youtu.be` links, on youtube.com, m.youtube.com, music.youtube.com and youtube-nocookie.com.
YouTube's home page, search and Studio stay in the browser.

## How it works

It rewrites the link to an Android `intent://` URL with no app named, so Android hands it to
whichever app is the default for YouTube links. If no app takes it, the browser falls back to
the normal page (with `pp_skip=1`, so it cannot loop).

## Install

1. Install PipePipe (or NewPipe, etc.).
2. Make it the default for YouTube links: Android Settings → Apps → PipePipe → Open by default →
   turn on "Open supported links" and tick the YouTube addresses. If the official YouTube app is
   installed, turn its supported links off (or disable the app).
3. Load this folder as an unpacked extension in a Chromium browser that runs extensions on
   Android. Tested on [Kiwi Browser](https://github.com/kiwibrowser/src.next).

Easier: point your AI agent at this repo and your phone over adb and ask it to install it.

## Tests

```
node --test yt.test.mjs
```

## License

MIT
