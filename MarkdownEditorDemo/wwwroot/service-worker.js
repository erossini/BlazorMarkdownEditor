// In development, do not enable offline support. Caching would make changes
// invisible until the next worker activation, which hurts the edit/refresh loop.
// No fetch handler is registered on purpose — a no-op handler would force every
// navigation through the worker for no benefit and is flagged as an anti-pattern
// by recent versions of Chrome.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
