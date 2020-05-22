importScripts('https://unpkg.com/dexie@3.0.1/dist/dexie.js')

const staticCacheName = "site-static-v1";      //name of cache, CHANGE EVERY TIME//
const assets = [
    "/",
    "./app.js",
    "./manifest.json",
    "./sw.js",
    "https://code.jquery.com/jquery-3.2.1.slim.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js",
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js",
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css",
    "pages/fallback.html"
];
const dynamicCache = "site-dynamic-v1";

self.addEventListener("install", evt=>{
    console.log("service worker is installed");
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log("caching app shell");
            cache.addAll(assets);              //這事實上一系列的request)
        })
    );   
});

self.addEventListener("activate", evt => {
    console.log("sevice worker is activated");
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key!==staticCacheName && key!==dynamicCache)
                .map(key => caches.delete(key))
            )
        })                  //刪除舊的cache//
    )
});



self.addEventListener("fetch", evt => {
    // console.log("service worker gotvddcdbsffd fetched", evt);
    evt.respondWith(                    //service worker中途攔截
        caches.match(evt.request).then(cacheRes => {
            console.log(evt.request.url);
            return cacheRes || fetch(evt.request).then(fetchRes=>{
                console.log(123);
                return caches.open(dynamicCache).then(cache=>{
                    console.log(456)
                    let backendAPI = /^(https):\/\/(tuantuango-backend.herokuapp.com)\//
                    if(backendAPI.text(evt.request.url)){
                        console.log(evt.reqest.url, 'in cache');
                        cache.put(evt.request.url, fetchRes.clone());       //key and value
                    }
                    return fetchRes; 
                })
            }).catch(err => caches.match("pages/fallback.html").then(fallback => {return fallback}))
        })
    )
});

self.addEventListener('push', async e => { 
    const data = e.data.json();
    console.log('in push');
    console.log(data);
    
        var options = {
            body: data.content,
            icon: './public/img/tuantuango196.png',
            image: './public/img/tuantuango196.png',
            dir: 'ltr',
            lang: 'zh-Hant',
            vibrate: [100],
            badge: './public/img/tuantuango196.png',
            tag: 'confirm-notification',
            renotify: true,
            actions: [{
                action: 'confirm', title: '確認', icon: './public/img/tuantuango196.png'
            },{
                action: 'cancel', title: '取消', icon: './public/img/tuantuango196.png'
            }]
        };
        self.registration.showNotification(data.title, options).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
 });

self.addEventListener('notificationclick', async (event) => {
    var notification = event.notification;
    var action = event.action;
    if(action == 'confirm'){
        console.log('使用者點選確認');
        await indexedDBStoreTargetPage();
        clients.openWindow('https://ohlamesaint.github.io/TuanTuanGOFrontend/pages/func.html');
    } else {
        console.log(action);
    }
})

self.addEventListener('notificationclose', (event) => {
    alert('使用者沒興趣');
})

async function indexedDBStoreTargetPage(){
    
    var db = new Dexie("targetPageDB");
    db.version(1).stores({
        targetPage: "++id,target"
    });
    db.open();
    
    
    if(await db.targetPage.count() == 0){
        db.targetPage.add({ target: 1 })
        return 
    }
    db.targetPage.update(1, { target: 1 })
    console.log(await db.targetPage.get(1));
}