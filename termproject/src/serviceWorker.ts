// blm305 22 sw file cb functions converted to arrow functions
// to do fix

const CACHE: string = 'termproject'

addEventListener('install', (e: Event) => {
    console.log(CACHE, e);
});

function save(req: Request, resp: Response): undefined | any {
    if (!req.url.includes("github"))
        return resp;
    return caches.open(CACHE)
        .then(cache => { // save request
            cache.put(req, resp.clone());
            return resp;
        })
        .catch(console.error)
}

addEventListener('fetch', (e: any) => {  //fetch first
    let req = e.request
    e.respondWith(
        fetch(req).then(r2 => save(req, r2))
            .catch(() => caches.match(req).then((req: any) => {  // report
                console.log(CACHE + ' matches ' + req.url)
                return req
            }))
    )
});

addEventListener('activate', (e: any) => {
    console.log(CACHE, e);
});
