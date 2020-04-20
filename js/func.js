var belowBar = document.querySelectorAll(".below>ul>li");
var title = document.querySelector("#title");
var middleWraps = document.querySelectorAll(".wrap>div");
var back = document.querySelector("#back");
var middleWrapRowList = document.querySelectorAll(".wrap>div>div>.row")  
var headPaste = document.querySelector( "#headPaste" );


$(document).ready(function(){
    var targetPage = localStorage.getItem("target");
    $(belowBar[targetPage]).addClass("actived");
    $(belowBar[targetPage]).children().addClass("actived-word");
    title.innerHTML=`
    ${belowBar[targetPage].dataset.name}
    `;
    $(middleWraps[targetPage]).siblings().removeClass("activePage");
    $(middleWraps[targetPage]).addClass("activePage");
    back.addEventListener("click", (evt)=>{
        evt.preventDefault();
        window.location.replace('../main.html');
    })
    let init = middleWrapRowList[targetPage].children;
    $(init).addClass("fadeIn");
    
    if(targetPage == 0){     //my profile 利用req.session來查詢並獲得
        axios({
            method: "GET",
            url: "https://tuantuango.herokuapp.com/profile",
            withCredentials: true,
        }).then(res=>{
            // if(!res.data.signin){    //做保險
            //     console.log(res);
            //     console.log("789");
            //     setTimeout(() => {
            //         window.location.replace('./login.html');
            //     }, );
            // }else{
                console.log(res.data.headPaste);
                console.log(res);
                document.querySelector("#user").textContent = res.data.user;
                // document.querySelector("#region").textContent = res.data.username;
                var blob = new Blob( [res.data.headPaste], { type: "image/jpg" } );
                console.log(blob);
                var urlCreator = window.URL || window.webkitURL;
                var imageUrl = urlCreator.createObjectURL( blob );
                var reader = new FileReader();
                reader.onload = (()=>{
                    console.log(reader.result);
                    var image = new Image();
                    image.src = reader.result;
                    document.body.appendChild(image);
                    // headPaste.setAttribute("style", `backgound-image: url(${reader.result})`);
                })
                reader.readAsDataURL(blob);
            // }
        }).catch(err=>{
            throw new Error(err);  
        })
    }
    
    for(let i=0; i<belowBar.length-1; i++){
        belowBar[i].addEventListener("click", (e)=>{
            $(belowBar[i]).siblings().removeClass("actived");
            $(belowBar[i]).siblings().children().removeClass("actived-word");
            $(belowBar[i]).siblings().children().css("color", "gray");
            $(belowBar[4]).children().css("color", "rgb(145, 93, 93)");
            $(belowBar[i]).addClass("actived");
            $(belowBar[i]).children().addClass("actived-word");
            title.innerHTML=`
            ${belowBar[i].dataset.name}
            `;
            $(middleWraps[i]).siblings().removeClass("activePage");
            $(middleWraps[i]).addClass("activePage");
            
            for(let j=0; j<middleWrapRowList.length; j++){
                if(j==i){
                    let ch = middleWrapRowList[j].children;
                    $(ch).addClass("fadeIn");
                }
                else{
                    let cs = middleWrapRowList[j].children;
                    $(cs).removeClass("fadeIn")
                }
            }
            
            // var ch = middleWraps[i].children;
            // let animateArray = Array.prototype.slice.call(animate);
            // console.log(ch);
            // var chArray = Array.from(ch);
            // console.log(chArray)
            // var list = animateArray.filter(ele => ch.include(ele));
            // console.log(list);
            // console.log(middleWraps[i])
            
            
            if(i == 0){     //my profile 利用req.session來查詢並獲得
                axios({
                    method: "GET",
                    url: "https://tuantuango.herokuapp.com/profile",
                    withCredentials: true,
                }).then(res=>{
                    if(!res.data.signin){    //做保險
                        console.log(res);
                        console.log("789");
                        setTimeout(() => {
                            window.location.replace('./login.html');
                        }, );
                    }else{
                        console.log("success");
                        console.log(res);
                        document.querySelector("#user").textContent = res.data.username;
                        // document.querySelector("#region").textContent = res.data.username;
                        var blob = new Blob( res.data.headPaste, { type: "image/jpg" } );
                        var urlCreator = window.URL || window.webkitURL;
                        var imageUrl = urlCreator.createObjectURL( blob );
                        headPaste.setAttribute("style", `backgound-image: url(${imageUrl})`);
                    }
                }).catch(err=>{
                    throw new Error(err);
                })
            }
            // <i class="fas ${belowBar[i].dataset.icon} mb-1 fa-1x"></i> |
            // if(i == 1){                     //會員資料
            //     axios({
            //         method:"get",
            //         withCredentials: true,
            //         url:"https://tuantuango.herokuapp.com/signin",
            //     }).then(res=>{
            //         if(!res.data.signin){    //可以順便獲得會員profile
            //             console.log(res);                                    
            //             console.log("789");
            //             setTimeout(() => {
            //                 window.location.replace('./pages/login.html');
            //             }, 1000);
            //         }else{
            //             console.log(res);
            //             console.log("456");
            //             window.location.replace('./pages/functions.html');
            //         }
            //     }).catch(err=>{
            //         console.log("123")
            //         console.log(err);
            //     })
            // }
            // else if(i == 2){
            //     //目前參與
            
            // }
            // else if(i == 3){
            //     //電子錢包
            // }
            // else if(i == 4){
            //     //sns
            // }
            
        }, false)
    }
})

// belowBar[4].addEventListener("click", ()=>{
//     axios({
//         method:"get",
//         withCredentials: true,
//         url:"https://tuantuango.herokuapp.com/signin",
//     }).then(res=>{
//         if(!res.data.signin){    //可以順便獲得會員profile
//             console.log(res);
//             console.log("789");
//             setTimeout(() => {
//                 window.location.replace('./pages/login.html');
//             }, );
//         }else{
//             console.log(res);
//             // console.log("45612357464");
//             // localStorage.setItem("target", 4)
//             $(tuanGoer).addClass("tuanGoeranimate");
//             tuanGoer.addEventListener("animationend", ()=>{
//                 window.location.replace('./pages/tuanGo.html');
//             })
//         }
//     }).catch(err=>{
//         console.log("123")
//         throw new Error(err);
//     })
// }, false)