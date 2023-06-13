var url="https://gnews.io/api/v4/search?"
var query="dog";
var per_page=10;
var count=5;
var total=0; 
$(function(){
   console.log (`${url}q=${query}&apikey=${accessKey}`);
 
    $("#searchButton").on("click",function(){
        searchnews(1);
    });
    $(".page-link").on("click",function(){
        $(".page-link").css("background-color", "");
        $(".page-link").css("color", "black");
        $(this).css("background-color", "green");
        $(this).css("color","white")
    })
})
function searchnews(page){

    document.body.scrollTop=document.documentElement.scrollTop =0;
    var temp=document.getElementById("search");
    query=temp.value
    console.log(temp);
   
    $.getJSON(`${url}q=${query}&lang=zh&page=${page}&apikey=${accessKey}`)
    .done(function(data){console.log(data.articles);
 
        total=Math.floor(data.totalArticles/10);
        $(".page-icon").empty();
        $(".page-icon").append(
            `<li><a class="page-link" href="javascript:searchnews(${1});">${1}</a></li>`);
         for(var i=page-3;i<total;i++)
         {
            if(i<2)
            {
             continue;
            }
         $(".page-icon").append(
            `<li><a class="page-link" href="javascript:searchnews(${i});">${i}</a></li>`);
         if(i===page+10&&total>i+3)
         {
            $(".page-icon").append(
                `<li><a>...</a></li>`);
            i=total-2;
         }
         }
//show news
        console.log(data);
        $(".image-container").empty();
        for(var i=0;i<data.articles.length;i++)
        {
        $(".image-container").append
        (`<p>  ${data.articles[i].title} </p>
        <br>
        <img src=${data.articles[i].image}>
        <br>
        <a href=${data.articles[i].url} target="_blank"> 更多新聞 </a>`);
        }
    })
    .fail(function(){console.log("fail")})
    .always(function(){console.log("always")})
}