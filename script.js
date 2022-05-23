 //browser-sync start --server --directory --files "*"
//

function $(value){return document.querySelector(value);}

document.addEventListener("DOMContentLoaded",
    function(event){
        function $(value){return document.querySelector(value);}
        $("#main-content").innerHTML='<div class="text-center"><img src=images/ajax-loader.gif></div>';
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
            $("#specials").addEventListener("click",function(event){
                $("#menu").click();
                var check=setInterval(function () {
                    var random=Math.floor(Math.random()*20)+1;
                    if($("#menu-tiles>div:nth-child("+random+")")!=null){
                        $("#menu-tiles>div:nth-child("+random+")").click();
                        clearInterval(check);
                    }
                }, .5);
                        
            });
            $("#home-tiles>div:nth-child(1)>a").addEventListener("click",getData);
            $("#menu").addEventListener("click",getData);
            function getData(){
                $("#menu").className="nav-link active";
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
                singleCategory();
            }
    }
    function singleCategory(){
        
        var allButtons=document.querySelectorAll("#category");
        for(var x=0;x<allButtons.length;x++){
            allButtons[x].addEventListener("click",function(event){
                var url="https://davids-restaurant.herokuapp.com/menu_items.json?category="+this.getAttribute("alt");
                var category=this.getAttribute("type");
                getIdata(url,category);
            });
        }
        function getIdata(url,category){
            var singleTitle;
            var onlineIdata;
            var singleContent;
            ajaxUtils.sendGetRequest("snippets/singlet.html",function(request){
                    singleTitle=request.responseText;
                },false);
                 ajaxUtils.sendGetRequest("snippets/singlec.html",function(request){
                   singleContent=request.responseText;
                },false);
                ajaxUtils.sendGetRequest(url,function(request){
                    onlineIdata=JSON.parse(request.responseText);
                    buildSingle(singleTitle,singleContent,onlineIdata,category);
                },true);
        }
        function buildSingle(singleTitle,singleContent,onlineIdata,category){
                var html=singleTitle.replace("name",category);
                html=html.replace('special-instructions',onlineIdata.category.special_instructions);
                var html2="";
                var copy=singleContent;
                for(var i=0;i<onlineIdata.menu_items.length;i++){
                    
                        if(onlineIdata.menu_items[i].price_small==null){
                            copy=copy.replace(/ps/g,"");
                            copy=copy.replace(/small_portion/g,"");
                        }if(onlineIdata.menu_items[i].price_large==null){
                            copy=copy.replace(/pl/g,"");
                            copy=copy.replace(/large_portion/g,"");
                        }
                        if(onlineIdata.menu_items[i].price_small!=null){
                            copy=copy.replace(/ps/g,"$"+onlineIdata.menu_items[i].price_small);
                            if(onlineIdata.menu_items[i].small_portion_name!=null){
                            copy=copy.replace(/small_portion/g,onlineIdata.menu_items[i].small_portion_name);
                            }else{
                                copy=copy.replace(/small_portion/g,"");
                            }
                        }if(onlineIdata.menu_items[i].price_large!=null){
                            copy=copy.replace(/pl/g,"$"+onlineIdata.menu_items[i].price_large);
                            if(onlineIdata.menu_items[i].large_portion_name!=null){
                            copy=copy.replace(/large_portion/g,onlineIdata.menu_items[i].large_portion_name);
                            }else{
                                copy=copy.replace(/large_portion/g,"");
                            }
                        }else{
                            copy=copy.replace(/ps/g,"$"+onlineIdata.menu_items[i].price_small);
                            copy=copy.replace(/small_portion/g,onlineIdata.menu_items[i].small_portion_name);
                             copy=copy.replace(/pl/g,"$"+onlineIdata.menu_items[i].price_large);
                             copy=copy.replace(/large_portion/g,onlineIdata.menu_items[i].large_portion_name);
                        }
                    
                       copy=copy.replace(/same/g,onlineIdata.menu_items[i].short_name);
                       copy=copy.replace(/name/g,onlineIdata.menu_items[i].name);
                       copy=copy.replace(/descriptions/g,onlineIdata.menu_items[i].description);
                       copy=copy.replace(/categoryy/g,onlineIdata.category.short_name);
                       copy=copy.replace(/categories/g,onlineIdata.menu_items[i].short_name);
                       html2+=copy;
                       copy=singleContent;
                }
               $('#main-content').innerHTML=html;
                $('#menu-tiles').innerHTML=html2;
            }
    }
}
);
    
 
 

