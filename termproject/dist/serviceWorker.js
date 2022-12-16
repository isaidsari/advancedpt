"use strict";
var CACHE = 'termproject';
// blm305 22 sw file cb functions converted to arrow functions
addEventListener('install', function (e) {
    console.log(CACHE, e);
});
function save(req, resp) {
    if (!req.url.includes("github"))
        return resp;
    return caches.open(CACHE)
        .then(function (cache) {
        cache.put(req, resp.clone());
        return resp;
    })["catch"](console.error);
}
addEventListener('fetch', function (e) {
    var req = e.request;
    e.respondWith(fetch(req).then(function (r2) { return save(req, r2); })["catch"](function () { return caches.match(req).then(function (req) {
        console.log(CACHE + ' matches ' + req.url);
        return req;
    }); }));
});
addEventListener('activate', function (e) {
    console.log(CACHE, e);
});
