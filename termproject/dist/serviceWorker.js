"use strict";
var CACHE = 'termproject';
function installCB(e) {
    console.log(CACHE, e);
}
addEventListener('install', installCB);
function save(req, resp) {
    if (!req.url.includes("github"))
        return resp;
    return caches.open(CACHE)
        .then(function (cache) {
        cache.put(req, resp.clone());
        return resp;
    })["catch"](console.error);
}
function report(req) {
    console.log(CACHE + ' matches ' + req.url);
    return req;
}
function fetchCB(e) {
    var req = e.request;
    e.respondWith(fetch(req).then(function (r2) { return save(req, r2); })["catch"](function () { return caches.match(req).then(report); }));
}
addEventListener('fetch', fetchCB);
function activateCB(e) {
    console.log(CACHE, e);
}
addEventListener('activate', activateCB);
