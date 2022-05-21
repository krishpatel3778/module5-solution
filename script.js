 //browser-sync start --server --directory --files "*"
//

function $(value){return document.querySelector(value);}

document.addEventListener("DOMContentLoaded",
    function(event){
        function $(value){return document.querySelector(value);}
        ajaxUtils.sendGetRequest("snippets/intial-load.html",function(request){  
            $("#main-content").innerHTML=request.responseText;
            menuFunction();
        },false);
        $(".navbar-toggler").addEventListener("click",function(event){
             $(".navbar-toggler").focus();
        });
        $(".navbar-toggler").addEventListener("blur",function(event){
             var screenwidth=window.innerWidth;
            if(screenwidth<768){
                $("#navbarNav").className="navbar-collapse collapse";
            }
        });
        function menuFunction(){
            $("#home-tiles>div:nth-child(1)>a").addEventListener("click",getData);
            function getData(){
                var menuTitle;
                var onlineData;
                var menuContent;
                ajaxUtils.sendGetRequest("snippets/menuc-title.html",function(request){
                    menuTitle=request.responseText;
                },false);
                 ajaxUtils.sendGetRequest("snippets/menu-content.html",function(request){
                    menuContent=request.responseText;
                },false);
                ajaxUtils.sendGetRequest("https://davids-restaurant.herokuapp.com/categories.json",function(request){
                    onlineData=JSON.parse(request.responseText);
                    buildMenu(menuTitle,menuContent,onlineData);
                },true);
            }
            function buildMenu(menuTitle,menuContent,onlineData){
                var html=menuTitle;
                var html2="";
                var copy=menuContent;
                for(var i=0;i<onlineData.length;i++){
                       copy=copy.replace(/short_name/g,onlineData[i].short_name);
                       copy=copy.replace(/name/g,onlineData[i].name);
                       html2+=copy;
                       copy=menuContent;
                }
               $('#main-content').innerHTML=html;
            $('#menu-tiles').innerHTML=html2;

            }
    }
}
);
    
 
 

