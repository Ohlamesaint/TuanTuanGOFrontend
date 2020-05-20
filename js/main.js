var belowBar = document.querySelectorAll(".below>ul>li");
var tuanGoer = document.querySelector("#tuanGoer");


function element(ele){
    document.querySelector(`#${ele}`);
}

$(document).ready(function(){
    const TOKEN = 'Bearer '+localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = TOKEN;
    $("#TuanGOerJoinPage>div").on("transitionend", (e) => {
        e.stopPropagation();
    })
    for(let i=0; i<belowBar.length-1; i++){
        belowBar[i].addEventListener("click", async (e)=>{
            if(!localStorage.getItem('token')){   
                $("body").addClass("modal-open");
                $("#loginPrompt").addClass("show").css("display", "block");
                $("#not").on('click', ()=>{
                    $("body").removeClass("modal-open");
                    $("#loginPrompt").removeClass("show").css("display", "none");
                })
                $("#yes").on('click', ()=>{
                    setTimeout(() => {
                        window.location.replace('https://ohlamesaint.github.io/TuanTuanGOFrontend/pages/login.html');
                    }, );
                })
            }else{
                console.log(belowBar[i].children[1].textContent);
                await indexedDBStoreTargetPage(i);
                localStorage.setItem("target", i)
                window.location.replace('https://ohlamesaint.github.io/TuanTuanGOFrontend/pages/func.html');
            }
        }, false)
    }
    
    belowBar[4].addEventListener("click", ()=>{
        if(!localStorage.getItem('token')){    //可以順便獲得會員profile
            $("body").addClass("modal-open");
            $("#loginPrompt").addClass("show").css("display", "block");
            $("#not").on('click', ()=>{
                $("body").removeClass("modal-open");
                $("#loginPrompt").removeClass("show").css("display", "none");
            })
            $("#yes").on('click', ()=>{
                setTimeout(() => {
                    window.location.replace('https://ohlamesaint.github.io/TuanTuanGOFrontend/pages/login.html');
                }, );
            })
        }else{
            $(tuanGoer).addClass("tuanGoeranimate");
            tuanGoer.addEventListener("animationend", ()=>{
                window.location.replace('https://ohlamesaint.github.io/TuanTuanGOFrontend/pages/tuanGo.html');
            })
        }
    }, false)
    
    var signOut = document.querySelector("#signOut");
    signOut.addEventListener("click", (e)=>{
        localStorage.removeItem('token');
    }, false)
    
    document.querySelector("#JoinTuanGO").addEventListener("click", ()=>{
        if(!localStorage.getItem('token')){    
            $("body").addClass("modal-open");
            $("#loginPrompt").addClass("show").css("display", "block");
            $("#not").on('click', ()=>{
                $("body").removeClass("modal-open");
                $("#loginPrompt").removeClass("show").css("display", "none");
            })
            $("#yes").on('click', ()=>{
                setTimeout(() => {
                    window.location.replace('https://ohlamesaint.github.io/TuanTuanGOFrontend/pages/login.html');
                }, );
            })
        } else {
            document.querySelector("#TuanGOerJoinPage").classList.add("show");
            document.querySelector('body').setAttribute('style', "overflow: hidden");
        }
    })
    document.querySelector("#back").addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector("#TuanGOerJoinPage").classList.remove("show");
        document.querySelector("#TuanGOerJoinPageWrap").classList.remove("show");
        document.querySelector("#unpackedTabInJoin").classList.remove('active')
        document.querySelector("#JoinPageTopNav").classList.remove('show')
        document.querySelector("#footerInJoin").classList.remove('show')
        document.querySelector("#promoteTabInJoin").classList.remove('active')
        document.querySelector("#TuanGOerPurchaseAmountInPromote").value = 0;
        document.querySelector("#TuanGOerPurchaseAmountInUnpack").value = 0;
        $("body").css('overflow', '');
    })
    document.querySelector("#TuanGOerJoinPage").addEventListener("transitionend", (e)=>{
        e.preventDefault();
        e.stopPropagation();
        if($("#TuanGOerJoinPage").hasClass("show")) {
            let TuanGOInform = JSON.parse(localStorage.getItem("TuanGOInform"));
            document.querySelector("#TuanGOerJoinPageWrap>#topPhoto").style.backgroundImage = `url("${TuanGOInform.productPhoto}")`;
            document.querySelector("#TuanGOerJoinPageWrap>#name").textContent = TuanGOInform.productName;
            document.querySelector("#TuanGOerJoinPageWrap>#TuanGOType").textContent = TuanGOInform.TuanGOType?'unpack':'promote';
            if(TuanGOInform.TuanGOType){
                // unpack
                document.querySelector("#availableAmountInUnpack").textContent = `less than ${JSON.parse(localStorage.getItem('unsoldProductAmount'))+1}`
                document.querySelector("#unpackedTabInJoin").addEventListener('transitionend', (e) => {
                    e.stopPropagation();
                })
                document.querySelector("#unpackedTabInJoin").classList.add('active')
                
            } else{
                document.querySelector("#availableAmountInPromote").textContent = `less than ${JSON.parse(localStorage.getItem('unsoldProductAmount'))+1}`
                document.querySelector("#promoteTabInJoin").addEventListener('transitionend', (e) => {
                    e.stopPropagation();
                })
                document.querySelector("#promoteTabInJoin").classList.add('active')
                
            }
            document.querySelector("#JoinPageTopNav").classList.add('show');
            document.querySelector("#TuanGOerJoinPageWrap").classList.add('show');
        }
    })
    document.querySelector("#TuanGOerPurchaseAmountInUnpack").addEventListener("change", ()=>{
        let TuanGOInform = JSON.parse(localStorage.getItem("TuanGOInform"));
        if(!checkNum(document.querySelector("#TuanGOerPurchaseAmountInUnpack").value, JSON.parse(localStorage.getItem('unsoldProductAmount')))){
            document.querySelector("#unpackedWarningText").textContent = 'invalid number!'
            document.querySelector("#footerInJoin").classList.remove('show')
        } else {
            document.querySelector("#unpackedWarningText").textContent = ''
            document.querySelector("#footerInJoin").classList.add('show')
            document.querySelector("#comfirmMoveOnInJoin").addEventListener("click", (e)=>{
                axios({
                    method: "put",
                    url: "https://tuantuango-backend.herokuapp.com/api/v1/tuango/joinTuango",
                    withCredentials: true,
                    data: {
                        tuangoID: TuanGOInform.id,
                        amount: document.querySelector("#TuanGOerPurchaseAmountInUnpack").value,
                    }
                }).then((res)=>{
                    alert(res);
                    setTimeout(()=>{
                        window.location.replace("https://ohlamesaint.github.io/TuanTuanGOFrontend/pages/login.html");
                    }, 100);
                }).catch((err)=>{
                    console.log(err);
                })
            })
        }
    })
    document.querySelector("#TuanGOerPurchaseAmountInPromote").addEventListener("change", ()=>{
        let TuanGOInform = JSON.parse(localStorage.getItem("TuanGOInform"));
        if(!checkNum(document.querySelector("#TuanGOerPurchaseAmountInPromote").value, JSON.parse(localStorage.getItem('unsoldProductAmount')))){
            document.querySelector("#unpackedWarningText").textContent = 'invalid number!'
            document.querySelector("#footerInJoin").classList.remove('show')
        } else {
            document.querySelector("#unpackedWarningText").textContent = ''
            document.querySelector("#footerInJoin").classList.add('show');
            document.querySelector("#comfirmMoveOnInJoin").addEventListener("click", (event)=>{
                event.preventDefault();
                event.stopPropagation();
                axios({
                    method: "put",
                    url: "https://tuantuango-backend.herokuapp.com/api/v1/tuango/joinTuango",
                    withCredentials: true,
                    data: {
                        tuangoID: TuanGOInform.id,
                        amount: document.querySelector("#TuanGOerPurchaseAmountInPromote").value,
                    }
                }).then((res)=>{
                    alert("JOIN TUANGO SUCCESS");
                    setTimeout(()=>{
                        window.location.replace("https://ohlamesaint.github.io/TuanTuanGOFrontend/main.html");
                    }, 100);
                }).catch((err)=>{
                    console.log(err);
                })
            })
        }
    })
})

async function indexedDBStoreTargetPage(num){

    if(!window.indexedDB){
        throw new Error('Browser does not support indexedDB');
    }
    const DBName = 'target'
    let request = await window.indexedDB.open(DBName, 1);       //version 1 => create database
    let db, transaction, store, index;

    request.onerror = e => {
        console.log('Something went wrong in indexDB', e.target.errorCode);
    }

    request.onsuccess = async e => {      // when the db open request is done
        db = e.target.result;       // request.result
        transaction = db.transaction('targetPageStore', 'readwrite');       // establish the connection 
        store = transaction.objectStore('targetPageStore');
        index = store.index('target');

        // because of the propagation of the error 
        // the error in here is global
        db.error = e => {       
            console.log('ERROR', e.target.errorCode)
        }

        await store.put({ targetPage: num });

        transaction.oncomplete = async () => {
            await db.close();
        }
        
        return;
    }

    request.onupgradeneeded = async e => {
        let db = e.target.result,
            store = await db.createObjectStore('targetPageStore',{ keyPath: 'target' }),
            index = await store.createIndex('target', 'target', { unique: true });
    }
}

function checkNum(num, border){
    console.log(num, border);
    if(num == undefined||num == 0||num>border){
        return false;
    } else {
        return true;
    }
}