
var cacheName = 'offlineCache';
//var BASEURL = self.registration.scope;
//var BASEURL = window.location.origin;
var BASEURL = "localhost:8000";

var cachedRoutes = [
    BASEURL,
    // BASEURL + "linksDashboard",
    BASEURL + "#",
    BASEURL + "home-dashboard",
    BASEURL + "#login",
    BASEURL + "#logout",
    BASEURL + "img",
    BASEURL + "login"

    // BASEURL + "#track-links",
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(cachedRoutes)
        }).catch(function (err) { console.log('Could not open cache', err); })
    )
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (names) {
            return Promise.all(
                names.filter(function (name) {
                    return (name !== cacheName);
                }).map(function (name) {
                    console.log('Cachename  will be deleted', name);
                    return caches.delete(name);
                })
            )
        })
    )
});

// // no
// // self.addEventListener('fetch', function (event) {
// //     event.respondWith(
// //         caches.open(cacheName).then(function (cache) {
// //             return cache.match(event.request);
// //         })
// //     );
// // });

// // self.addEventListener('fetch', function (event) {
// //     event.respondWith(
// //         caches.match(event.request).then(function (resp) {
// //             return resp || fetch(event.request).then(function (response) {
// //                 caches.open(cacheName).then(function (cache) {
// //                     cache.put(event.request, response.clone());
// //                     return response;
// //                 });
// //             });
// //         })
// //     );
// // });
// //no

// //------
// self.addEventListener('fetch', function (event) {

//     event.respondWith(
//         caches.match(event.request).then(function (resp) {
//             console.log(event.request);
//             if (resp) {
//                 console.log('Result is in the cache');
//                 console.log(resp);
//                     return resp;

//             } else {
//                 var clonedRequest = event.request.clone();
//                 fetch(clonedRequest).then(function (response) {
//                     console.log('Request fetched is ', event.request.url);
//                     if (response) {
//                         caches.open(cacheName).then(function (cache) {
//                             cache.put(event.request, response.clone());
//                             return response;
//                         });
//                     } else {
//                         console.log('Data not fetched!', response);
//                     }
//                 }).catch(function (err) {
//                     console.log('[serviceWorker] Error caching & fetching data', err);
//                 });
//             }
//         })
//     );
// });


// from the official documentation
// self.addEventListener('fetch', event => {
//   // Let the browser do its default thing
//   // for non-GET requests.
//   if (event.request.method != 'GET') return;

//   // Prevent the default, and handle the request ourselves.
//   event.respondWith(async function() {
//     // Try to get the response from a cache.
//     const cache = await caches.open('dynamic-v1');
//     const cachedResponse = await cache.match(event.request);

//     if (cachedResponse) {
//       // If we found a match in the cache, return it, but also
//       // update the entry in the cache in the background.
//       event.waitUntil(cache.add(event.request));
//       return cachedResponse;
//     }

//     // If we didn't find a match in the cache, use the network.
//     return fetch(event.request);
//   }());
// });



//update cache

self.addEventListener('fetch', function (evt) {
    console.log('The service worker is serving the asset.');
  if (navigator.onLine === false) {
        evt.respondWith(fromCache(evt.request));
    }else {
        evt.waitUntil(
            update(evt.request)
            .then(refresh)
        );
   }
});

function fromCache(request) {
    return caches.open(cacheName).then(function (cache) {
        return cache.match(request);
    });
}

function update(request) {
    return caches.open(cacheName).then(function (cache) {
        return fetch(request).then(function (response) {
            return cache.put(request, response.clone()).then(function () {
                return response;
            });
        });
    });
}

function refresh(response) {
    return self.clients.matchAll().then(function (clients) {
        clients.forEach(function (client) {

            var message = {
                type: 'refresh',
                url: response.url,

                eTag: response.headers.get('ETag')
            };
            client.postMessage(JSON.stringify(message));
        });
    });
}
