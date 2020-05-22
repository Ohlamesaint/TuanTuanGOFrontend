if("serviceWorker" in navigator){
    navigator.serviceWorker.register('./sw.js')
    .then(res => {
        console.log(res);
    }).catch(err => {
        console.error(err);
    });
}










