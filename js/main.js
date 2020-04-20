var belowBar = document.querySelectorAll(".below>ul>li");
var tuanGoer = document.querySelector("#tuanGoer");


function element(ele){
    document.querySelector(`#${ele}`);
}

$(document).ready(function(){
    for(let i=0; i<belowBar.length-1; i++){
        belowBar[i].addEventListener("click", (e)=>{
            axios({
                method:"get",
                withCredentials: true,
                url:"https://tuantuango.herokuapp.com/signin",
            }).then(res=>{
                if(!res.data.signin){    //可以順便獲得會員profile
                    console.log(res);
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
                    // console.log("789");
                }else{
                    console.log(res);
                    console.log("456");
                    console.log(belowBar[i].children[1].textContent);
                    localStorage.setItem("target", i)
                    window.location.replace('https://ohlamesaint.github.io/TuanTuanGOFrontend/pages/func.html');
                }
            }).catch(err=>{
                console.log("123")
                console.log(err);
            })
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
                // setTimeout(() => {
                //     window.location.replace('./pages/login.html');
                // }, );
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
        axios({
            method:"get",
            withCredentials: true,
            url:"https://tuantuango.herokuapp.com/signOut",
        }).then(res=>{
            if(res.data.signin){    //可以順便獲得會員profile
                console.log(res);
                console.log("456");
            }else{
                console.log(res);
                console.log("789");
            }
        }).catch(err=>{
            console.log("123")
            console.log(err);
        })
    }, false)
    
})
