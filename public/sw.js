// Minimal service worker: network passthrough. Its presence makes the app
// installable; it intentionally does no offline caching of private data.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
self.addEventListener("fetch", () => {});
