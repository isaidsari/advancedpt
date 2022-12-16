const CACHE : string ='termproject'

function installCB(e: any) {
  console.log(CACHE, e);
}
addEventListener('install', installCB)

function save(req: Request, resp : Response) : undefined | any {
  if (!req.url.includes("github")) 
     return resp;
  return caches.open(CACHE)
  .then(cache => { // save request
    cache.put(req, resp.clone());
    return resp;
  }) 
  .catch(console.error)
}
function report(req : any) {
  console.log(CACHE+' matches '+req.url)
  return req
}
function fetchCB(e: any) { //fetch first
  let req = e.request
  e.respondWith(
    fetch(req).then(r2 => save(req, r2))
    .catch(() => caches.match(req).then(report))
  )
}
addEventListener('fetch', fetchCB)

function activateCB(e: any) {
  console.log(CACHE, e);
}
addEventListener('activate', activateCB);
