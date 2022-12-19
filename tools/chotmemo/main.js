
var main_box_elem = document.getElementById("main_box")

document.getElementById("memo_text").onkeydown = function(e){
    write_text(e)
}

document.getElementById("memo_text").onkeyup = function(e){
    if(e.key == "Enter" && !e.shiftKey){ //Enterが押された&&shiftキーが押されていない
        document.getElementById("memo_text").value = ""
    }
}

//メモを書き込む処理
function write_text(e){

    //shiftキーが押されていない
    if (!e.shiftKey) {
        //Enterキーが押された && 入力ボックスが空白ではない
        if(e.key == "Enter" && document.getElementById("memo_text").value.replaceAll(" ","") != ""){
            display_write_text("text") //テキストを書き込み&表示

            //一番最後までスクロール
            var element = document.getElementById("main_box");
            var bottom = element.scrollHeight - element.clientHeight;
            element.scroll(0, bottom);
        }
    }
}

//str == "text" 書き込むやつが文字列である
//str == "img" 書き込むやつが画像
function display_write_text(str){
    var now = new Date();

    var memo_elem = document.createElement("div")
    memo_elem.classList.add("memo_box")

    memo_elem.innerHTML += ''
    +'<div class="add_pin" onclick="add_pin(event)"></div>' //ピン止めボタン
    +'<div class="edit" onclick="edit_memo(event)"></div>' //編集ボタン
    +'<div class="delete" onclick="delete_writing(event)"></div>'  //書き込み削除ボタン
    +'<div class="time">' //時間
    +''+now.getFullYear()+'/'+(now.getMonth()+1)+'/'+now.getDate()+' - '+now.getHours()+':'+now.getMinutes()+''


    if(str == "text"){ //書き込むやつがテキストの場合そのまま書き込む
        memo_elem.innerHTML += ''
        +'</div>'
        +'<div class="main">'
        +    document.getElementById("memo_text").value.replaceAll("\n","\n<br>") //入力されたやつの改行を<br>に変換した後ぶちこむ //\nは残しておく
        +'</div>'
    }else if(str == "img"){ //画像の場合imgタグで囲む
        memo_elem.innerHTML += ''
        +'</div>'
        +'<div class="main">'
        +'<img src="'+document.getElementById("memo_text").value+'">'
        +'</div>'
    }

    main_box_elem.append(memo_elem)

    //ファイルを上書き
    save_file_data(1)

    document.getElementById("memo_text").value = ""
}



//add_file_nameでenterおすとファイル追加
document.getElementById("add_file_name").onkeydown = function(e){
    if(e.key == "Enter"){
        add_file()
    }
}



//edit memoボタンが押されたとき編集
function edit_memo(e){
    var memo_elem = e.target.parentElement //memo element

    var memo_text = memo_elem.getElementsByClassName("main")[0].textContent

    console.log(memo_text)

    var line_num = 0;


    var memo_text_tmp = memo_text
    //改行\nの数
    while(memo_text){
        if(memo_text_tmp[0] == "\n"){
            line_num += 1
        }
        if(memo_text_tmp == ""){
            break;
        }

        memo_text_tmp = memo_text_tmp.slice(1)
    }

    //編集ボックスを追加
    var edit_box = document.createElement("div")

    //改行の数+2こ行を作る
    edit_box.innerHTML = ''
    +'<textarea class="memo_text" onkeydown="m_keyd(event)" name="memo_text" rows="'+(line_num+2)+'" style="width:50vw;">'+memo_text+'</textarea>'

    memo_elem.appendChild(edit_box)

    memo_elem.getElementsByClassName("main")[0].textContent = "改行は[shift]+[Enter],書き込みは[Enter]"
}


function m_keyd(e){
    //shiftキーが押されていない
    if (!e.shiftKey) {
        //Enterキーが押された && 入力ボックスが空白ではない
        if(e.key == "Enter" && e.target.value.replaceAll(" ","") != ""){
            console.log("hogehoge")

            e.target.parentElement.parentElement.getElementsByClassName("main")[0].innerHTML = e.target.value.replaceAll("\n","\n<br>")

            e.target.remove()

            //ファイルを上書き
            save_file_data(1)
        }
    }
}



function close_result_box(){
    var result_box = document.getElementById("result_box")
    result_box.style.display = "none"
}

document.getElementById("search_box").onkeydown = function(e){
    if(e.key == "Enter" && document.getElementById("search_box").value != ""){
        var result_box = document.getElementById("result_box")
        result_box.style.display = "block" //result boxを表示
        read_search_file()
    }
}

document.getElementById("search_box").onmousedown = function(e){
    result_box.style.display = "block" //result boxを表示
}


//画像を貼り付ける
document.getElementById("image_up_btn").addEventListener( "change", function() {
    // フォームで選択された全ファイルを取得
	var fileList = this.files ;

	blob = fileList[0] ;

	// FileReaderオブジェクトを作成
	var fileReader = new FileReader() ;

	// 読み込み後の処理を決めておく
	fileReader.onload = function() {
		// Data URIを取得
		var dataUri = this.result ;

        //書き込み
        document.getElementById("memo_text").value = dataUri
        
        display_write_text("img")

        //一番最後までスクロール
        var element = document.getElementById("main_box");
        var bottom = element.scrollHeight - element.clientHeight;
        element.scroll(0, bottom);
	}

	// ファイルをData URIとして読み込む
	fileReader.readAsDataURL(fileList[0]);
});


function add_pin(e){
    var pin_text_data = ""

    if(e.target.parentElement.getElementsByClassName("main")[0].getElementsByTagName("img").length != 0){
        //画像
        pin_text_data += e.target.parentElement.getElementsByClassName("main")[0].getElementsByTagName("img")[0].src+"$cut&&$;"
    }else{ //テキスト
        //保存形式は変わらないので省略
        pin_text_data += e.target.parentElement.getElementsByClassName("main")[0].textContent+"$cut&&$;"
    }

    pin_text_data += e.target.parentElement.getElementsByClassName("time")[0].textContent+"$cut&&$;"

    //ピン止めを追加
    add_pin_file(pin_text_data)
}

//ピン止めのリストボックス、ピン止めリストを表示
function display_pin_box(){
    document.getElementById("pin_list_box").style.display = "block"
    display_pin_file()
}
//ピン止めボックスを閉じる
function close_pin_box(){
    document.getElementById("pin_list_box").style.display = "none"
}

//ピン止めを追加
function add_pin_file(pin_text_data){

    //openging_file = 今開いているファイル
    console.log(opening_file)
    var openReq = indexedDB.open(opening_file); //今のファイルデータを抽出

    openReq.onsuccess = function(event){
        var db = event.target.result;
        var trans = db.transaction("pin", "readonly");
        var store = trans.objectStore("pin"); //dataを開く
        var getReq = store.get("1");  //データを追加した時の{id:"数字"}の数字を入れる
  
        getReq.onsuccess = function(event){
          console.log(event.target.result); // {"id":"1","data":"AAAAAA"}
  
          var ret = event.target.result //保存されたデータ

          console.log(ret)
          //retがundefined(ピン止めをしたとこがない)なら空白+pin
          if(ret == undefined){
            add_pin_write("",pin_text_data)
          }else{
            var saved_data = ret["data"] //テキストデータ
            add_pin_write(saved_data,pin_text_data)
          }

        }
    }
}

//saved_data もともとあったデータ
//pin_text_data 新しく追加するデータ
function add_pin_write(saved_data,pin_text_data){
    var dbName = opening_file

    var request = window.indexedDB.open(dbName,1);

    //成功したらエディタに書かれた要素を追加
    request.onsuccess = function(event){

        db = event.target.result;
        var objStoreName = "pin";
        console.log("add")

        console.log(db.objectStoreNames)
    
        //トランザクション
        var transaction = db.transaction(objStoreName, 'readwrite');
        //オブジェクトストアにアクセスします。
        var objectStore = transaction.objectStore(objStoreName);

        var text_data = saved_data+pin_text_data
    
        objectStore.delete('1') //データを更新するために一旦削除
    
        //オブジェクトストアに追加のリクエストします。

        var save_data = {"id":"1","data":text_data}//object形式にして{id:"数字",..}にしないとだめ
        console.log(save_data)
        var request = objectStore.add(save_data);
    }
}

//ボタンが押されたら書き込みを削除
function delete_writing(e){
    e.target.parentElement.remove()

    save_file_data(1)
}
