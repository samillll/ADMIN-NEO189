self.addEventListener('install', function() { self.skipWaiting(); });
self.addEventListener('activate', function(e) { e.waitUntil(self.clients.claim()); });

self.addEventListener('notificationclick', function(e) {
    e.notification.close();
    e.waitUntil(
        self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list) {
            for (var i = 0; i < list.length; i++) {
                if ('focus' in list[i]) return list[i].focus();
            }
            if (self.clients.openWindow) return self.clients.openWindow(self.registration.scope);
        })
    );
});

self.addEventListener('push', function(e) {
    var d = {};
    try { d = e.data ? e.data.json() : {}; } catch (x) {}
    e.waitUntil(self.registration.showNotification(d.title || 'NEO189 Admin', {
        body: d.body || '', tag: d.tag || 'neo189-admin', renotify: true
    }));
});
