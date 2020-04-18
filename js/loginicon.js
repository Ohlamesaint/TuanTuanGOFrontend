let svg1 = document.querySelector('svg#blockchain');
let nodelist1 = svg1.querySelectorAll(".path")
let pathes1 = Array.prototype.slice.call(nodelist1);

let svg2 = document.querySelector('svg#buy-sign');
let nodelist2 = svg2.querySelectorAll(".path")
let pathes2 = Array.prototype.slice.call(nodelist2);

let svg3 = document.querySelector('svg#buycar');
let nodelist3 = svg3.querySelectorAll(".path")
let pathes3 = Array.prototype.slice.call(nodelist3);

let svg4 = document.querySelector('svg#buydate');
let nodelist4 = svg4.querySelectorAll(".path")
let pathes4 = Array.prototype.slice.call(nodelist4);

let svg5 = document.querySelector('svg#ethereum');
let nodelist5 = svg5.querySelectorAll(".path")
let pathes5 = Array.prototype.slice.call(nodelist5);

let svg6 = document.querySelector('svg#icon_buy');
let nodelist6 = svg6.querySelectorAll(".path")
let pathes6 = Array.prototype.slice.call(nodelist6);

let svg7 = document.querySelector('svg#smart-contract');
let nodelist7 = svg7.querySelectorAll(".path")
let pathes7 = Array.prototype.slice.call(nodelist7);

let pathALL = [pathes1, pathes2, pathes3, pathes4, pathes5, pathes6, pathes7];
let lengths = [];

$(document).ready(function(){
    var i = 0;
    pathALL.forEach((el)=>{
        el.forEach((el, i) => {
            let len = el.getTotalLength();
            lengths.push(len);
            el.style.strokeDasharray = len;
            el.style.strokeDashoffset = len; 
            setTimeout(()=>{
                el.classList.add("path-line");
            })
        });
    })
    var login = function(el){
        return new Promise(function(resolve, reject){
            setTimeout(()=>{
                el.forEach((el, i) => {
                    el.style.strokeDashoffset = 0;
                })
            });
            setTimeout(()=>{
                el.forEach((el, i) => {
                    let len = el.getTotalLength();
                    lengths.push(len);
                    el.style.strokeDasharray = len;
                    el.style.strokeDashoffset = len; 
                })
            }, 2330);
            setTimeout(()=>{ 
                resolve(i+1);
            }, 4800);
        });
    }
    function iconShowing(){
        login(pathALL[i])
        .then(function(res){
            i++;
            return login(pathALL[i]);
        }).then(function(res){
            i++;
            return login(pathALL[i]);
        }).then(function(res){
            i++;
            return login(pathALL[i]);
        }).then((res)=>{
            i++;
            return login(pathALL[i]);
        }).then((res)=>{
            i++;
            return login(pathALL[i]);
        }).then((res)=>{
            i++;
            return login(pathALL[i]);
        }).then((res)=>{
            i=0;
        })
    };
    iconShowing();
    window.setInterval(function(){
        iconShowing();
    }, 34200);
})