

home_url = "https://shigle.net/"

//言語設定
var language = window.navigator.language

if(language.includes("en")){
    home_url = "https://shigle.net/en/"
}

document.getElementsByTagName("header")[0].innerHTML = `
<a href="`+home_url+`" class="menu">Home</a>
<a href="#" class="menu">About</a>
<a href="`+home_url+`projects/" class="menu">Projects</a>
<a href="#" class="menu">News</a>
<a href="https://forms.gle/j6Lqg6KycMqkgUfd7" class="menu">Contact</a>
`

var pc_footer_html = `
<span class="logo">
                <ul>
                    <li>
                        <img src="`+home_url+`image/shigle_white_horizontal_logo.png" style="width:10em;">
                    </li>
                    <li>https://shigle.net/</li>
                </ul>
            </span>
            
            <span class="menu">
                <ul>
                    <span style="color:#888888">Social</span>
                    <li><a href="https://github.com/shigle-dev">Github</a></li>
                    <li><a href="https://twitter.com/shigledev">Twitter</a></li>
                    <li><a href="https://discord.gg/bEbrRJ4Z">Discord</a></li>
                </ul>
                
                <ul>
                    <span style="color:#888888">Pages</span>
                    <li><a href="`+home_url+`">Home</a></li>
                    <li><a href="`+home_url+`projects/">Project</a></li>
                    <li><a href="https://forms.gle/j6Lqg6KycMqkgUfd7">Contact</a></li>
                </ul>
                <ul>
                    <span style="color:#888888">Projects</span>
                    <li><a href="`+home_url+`projects/YoutubeLiveChatSharp/">YoutubeLiveChatSharp</a></li>
                    <li><a href="`+home_url+`projects/file_bookmarker/">File bookmarker</a></li>
                    <li><a href="`+home_url+`projects/chotmemo/">Chotmemo</a></li>
                </ul>
            </span>
`


var mob_footer_html = `
<span class="logo">
                <ul>
                    <li>
                        <img src="`+home_url+`image/shigle_white_horizontal_logo.png" style="width:10em;">
                    </li>
                    <li>https://shigle.net/</li>
                </ul>
            </span>
`


//レスポンシブ対応
if (window.matchMedia && window.matchMedia('(max-device-width: 640px)').matches) {
    //スマホ
    document.getElementsByTagName("footer")[0].innerHTML = mob_footer_html

    document.getElementsByTagName("footer")[0].getElementsByTagName("ul")[0].style.margin = "0 0 3em 0"

    //タイトルの大きさ
    var title_b = document.getElementsByClassName("title_b")

    for(var i = 0;i < title_b.length;i++){
        title_b[i].style.fontSize = "1.7em"
    }

    var title2 = document.getElementsByClassName("title2")

    for(var i = 0;i < title_b.length;i++){
        title2[i].style.fontSize = "1.3em"
    }

    //画像の大きさ

    var mobile_img = document.getElementsByClassName("mobile_img")

    for(var i = 0;i < mobile_img.length;i++){
        mobile_img[i].style.width = "90vw"
    }

  } else {
    //pc
    document.getElementsByTagName("footer")[0].innerHTML = pc_footer_html
  }


//言語設定
var language = window.navigator.language

if(location.href == "https://shigle.net" || location.href == "https://shigle.net/"){
    if(language.includes("en")){
        location.href="https://shigle.net/en/"
    }
}