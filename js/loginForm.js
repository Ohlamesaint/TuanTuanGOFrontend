const submit = document.querySelector("#accountSubmit");
const accountTextfield = document.querySelector("#account");
const passwordTextfield = document.querySelector("#password");
const signinLoading = document.querySelector("#signinLoading");
const loading = document.querySelector("#loading");
const greeting = document.querySelector("#greeting");

const login = {
}

function animateCSS(element, animationName, callback) {
    const node = element;
    node.classList.add('animated', animationName);
    
    function handleAnimationEnd() {
        node.classList.remove('animated', animationName);
        node.removeEventListener('animationend', handleAnimationEnd);
        
        if (typeof callback === 'function') callback();
    }
    
    node.addEventListener('animationend', handleAnimationEnd);
}


$(document).ready(function(){
    $(signinLoading).hide();
    submit.addEventListener("click", (event)=>{
        event.preventDefault();
        login.account = document.querySelector("#account").value;
        login.password = document.querySelector("#password").value;
        if(!login.account){
            document.querySelector("#accountWrong").textContent = "請輸入會員帳號!";
        }
        else if(!login.password){
            document.querySelector("#passwordWrong").textContent = "請輸入帳號密碼!"
        }
        else{
            $(signinLoading).show();
            window.setInterval(animateCSS(loading, 'bounce'), 1000);
            axios({
                headers: { 'Content-Type': 'application/json' },
                method: 'post',
                url: 'https://tuantuango-backend.herokuapp.com/api/v1/user/login',
                data: login,
                responseType: 'json',
                withCredentials: true
            })
            .then(function (response) {
                localStorage.setItem('token', response.data.data.token);
                document.querySelector("#passwordWrong").textContent = "";
                document.querySelector("#accountWrong").textContent = "";
                signinLoading.setAttribute("style", "opacity: 0.8; background-color: white");
                loading.setAttribute("style", "opacity: 0.0;");
                signinLoading.addEventListener("transitionend", ()=>{
                    greeting.textContent = `HI, ${response.data.data.user[0].username}:D`;
                    animateCSS(greeting, 'flipInX', function(){
                        greeting.setAttribute("style", "opacity: 0.0;");
                        console.log(response);
                        setTimeout(() => {
                            window.location.replace('../main.html');
                        }, 1000);
                    });
                })
            })
            .catch(function (error) {
                document.querySelector("#passwordWrong").textContent = "帳號密碼錯誤!"
                $(signinLoading).hide();
            });
        }
    })
    accountTextfield.addEventListener("focus", ()=>{
        document.querySelector("#accountWrong").textContent = "";
    });
    passwordTextfield.addEventListener("focus", ()=>{
        document.querySelector("#passwordWrong").textContent = "";
    })
})
