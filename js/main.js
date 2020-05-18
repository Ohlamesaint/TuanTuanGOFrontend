var belowBar = document.querySelectorAll(".below>ul>li");
var tuanGoer = document.querySelector("#tuanGoer");


function element(ele){
    document.querySelector(`#${ele}`);
}

$(document).ready(function(){
    $("#TuanGOerJoinPage>div").on("transitionend", (e) => {
        e.stopPropagation();
    })
    for(let i=0; i<belowBar.length-1; i++){
        belowBar[i].addEventListener("click", (e)=>{
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
                localStorage.setItem("target", i)
                window.location.replace('https://ohlamesaint.github.io/TuanTuanGOFrontend/pages/func.html');
            }
        }, false)
    }
    
    belowBar[4].addEventListener("click", ()=>{
        axios({
            method:"get",
            withCredentials: true,
            url:"https://tuantuango.herokuapp.com/signin",
        }).then(res=>{
            if(!res.data.signin){    //可以順便獲得會員profile
                console.log(res);
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
                console.log(res);
                console.log("45612357464");
                // localStorage.setItem("target", 4)
                $(tuanGoer).addClass("tuanGoeranimate");
                tuanGoer.addEventListener("animationend", ()=>{
                    window.location.replace('https://ohlamesaint.github.io/TuanTuanGOFrontend/pages/tuanGo.html');
                })
            }
        }).catch(err=>{
            console.log("123")
            throw new Error(err);
        })
    }, false)
    
    var signOut = document.querySelector("#signOut");
    signOut.addEventListener("click", (e)=>{
        // axios({
        //     method:"get",
        //     withCredentials: true,
        //     url:"https://tuantuango.herokuapp.com/signOut",
        // }).then(res=>{
        //     if(res.data.signin){    //可以順便獲得會員profile
        //         console.log(res);
        //         console.log("456");
        //     }else{
        //         console.log(res);
        //         console.log("789");
        //     }
        // }).catch(err=>{
        //     console.log("123")
        //     console.log(err);
        // })
        localStorage.removeItem('token');
    }, false)
    document.querySelector("#JoinTuanGO").addEventListener("click", ()=>{
        axios({
            method:"get",
            withCredentials: true,
            url:"https://tuantuango.herokuapp.com/signin",
        }).then(res=>{
            if(!res.data.signin){    //可以順便獲得會員profile
                console.log(res);
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
                console.log("show the tuango");
                document.querySelector('body').setAttribute('style', "overflow: hidden");
            }
        })
    })
    document.querySelector("#TuanGOerJoinPage").addEventListener("transitionend", (e)=>{
        e.preventDefault();
        e.stopPropagation();
        let TuanGOInform = JSON.parse(localStorage.getItem("TuanGOInform"));
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
                    method: "post",
                    url: "https://tuantuango.herokuapp.com/join",
                    withCredentials: true,
                    data: {
                        contractAddress: TuanGOInform.TuanGOAddress,
                        amount: document.querySelector("#TuanGOerPurchaseAmountInUnpack").value,
                    }
                }).then((res)=>{
                    alert(res);
                    setTimeout(()=>{
                        window.location.replace("https://ohlamesaint.github.io/TuanTuanGOFrontend/main.html")
                    }, 3000);
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
                    method: "post",
                    url: "https://tuantuango.herokuapp.com/join",
                    withCredentials: true,
                    data: {
                        contractAddress: TuanGOInform.TuanGOAddress,
                        amount: document.querySelector("#TuanGOerPurchaseAmountInPromote").value,
                    }
                }).then((res)=>{
                    alert("JOIN TUANGO SUCCESS");
                    setTimeout(()=>{
                        window.location.replace("https://ohlamesaint.github.io/TuanTuanGOFrontend/main.html")
                    }, 3000);
                }).catch((err)=>{
                    console.log(err);
                })
            })
        }
    })
})

function checkNum(num, border){
    console.log(num, border);
    if(num == undefined||num == 0||num>border){
        return false;
    } else {
        return true;
    }
}