

const home_url = "https://shigle.net/"


document.getElementsByTagName("header")[0].innerHTML = `
<a href="`+home_url+`" class="menu">Home</a>
<a href="#" class="menu">About</a>
<a href="${home_url}projects/" class="menu">Projects</a>
<a href="#" class="menu">News</a>
<a href="#" class="menu">Contact</a>
`


document.getElementsByTagName("footer")[0].innerHTML = `
<span class="logo">
                <ul>
                    <li>
                        <img src="${home_url}image/shigle_white_horizontal_logo.png" style="width:11vw;">
                    </li>
                    <li>https://shigle.net/</li>
                </ul>
            </span>
            
            <span class="menu">
                <ul>
                    <span style="color:#888888">Social</span>
                    <li><a href="#">Github</a></li>
                    <li><a href="#">Twitter</a></li>
                    <li><a href="#">Discord</a></li>
                </ul>
                
                <ul>
                    <span style="color:#888888">Pages</span>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Project</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
                <ul>
                    <span style="color:#888888">Projects</span>
                    <li><a href="#">hoge</a></li>
                    <li><a href="#">fuga</a></li>
                </ul>
            </span>
`