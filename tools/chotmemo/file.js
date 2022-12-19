

//今開いているファイル
var opening_file = "";
var file_list = []


if(localStorage.getItem("file_list") == null || localStorage.getItem("file_list") == ""){ //はじめてつかうなら初期化(ファイル作成)
    opening_file = "note1"
    display_file_name() //display_file_name()にファイル名リストを作成/初期化する処理が入っている
    save_file_data(2) //新規作成

}else{ //二回目以降は0番目のファイルを開く
    opening_file = localStorage.getItem("file_list").split(",")[0]
}


display_file_name() //これは最初に実行すること
up_filelist()

read_saved_file()


//ファイルを追加する
function add_file(){
    opening_file = document.getElementById("add_file_name").value

    document.getElementById("add_file_name").value = ""

    save_file_data(2) //新規作成
    up_filelist() //ファイルリストをアップデート
    read_saved_file() //ファイルを読み込む
}

//localStorage.clear()
//update file list localStorageにファイルの名前を追加
function up_filelist(){

    //file listをアップデート(ファイルの新規作成など)
    if(localStorage.getItem("file_list").split(",").indexOf(opening_file) == -1){
        if(localStorage.getItem("file_list") == null){ //file_listがなかったら新規作成
            opening_file = "note1"
            console.log("hoge")
            localStorage.setItem("file_list",opening_file)
        }

        var file_list = localStorage.getItem("file_list") //file listを取得 hoge.bin,piyo.txt,test.exeのように入っている
    
        console.log(file_list)
    
        file_list += ","+opening_file //追加
    
        localStorage.setItem("file_list",file_list)

        display_file_name()
    }else{
        //ファイル名が重複しています
    }
    
}

//保存されたファイル一覧を表示
function display_file_name(){
    if(localStorage.getItem("file_list") == null){ //file_listがなかったら新規作成
        console.log("hoge")
        opening_file = "note1"
        localStorage.setItem("file_list",opening_file) //note1と言うやつも追加
        //save_file_data()
    }

    var file_name = localStorage.getItem("file_list") //file listを取得

    var file_list = file_name.split(",") //,で区切られているのでそれをリストにする hoge.bin,piyo.exe → [hoge.bin,piyo.exe]

    console.log(file_list)

    var file_list_html = document.getElementById("file_list")

    var display_html = ""

    for(var i = 0;i < file_list.length;i++){
        display_html += '<div onclick="open_file(event);" class="name">'+file_list[i]+'</div>'
    }

    file_list_html.innerHTML = display_html //追加

    
}

//ファイルを保存
//n == 1 上書き保存
//n == 2 新規作成
function save_file_data(n){

    var dbName = opening_file

    var request = window.indexedDB.open(dbName,1);

    //DBが存在しない場合、またはバージョン引数よりも小さい場合の作成処理
    request.onupgradeneeded = function(event){

        var db;
        var objStoreName = "data";

        //データベースインスタンス保存
        db = event.target.result;
    
        //オブジェクトストア名の確認
        if (!db.objectStoreNames.contains(objStoreName)) {
            //オブジェクトストアが無い場合
            var objStoreKey = { keyPath: 'id' };    //キー設定
            //オブジェクトストア生成
            db.createObjectStore(objStoreName, objStoreKey);
            console.log("オブジェクトストア生成");
        }

        //pinも追加
        var objStoreName = "pin";
        console.log("add")

        //オブジェクトストア名の確認
        if (!db.objectStoreNames.contains(objStoreName)) {
            //オブジェクトストアが無い場合
            var objStoreKey = { keyPath: 'id' };    //キー設定
            //オブジェクトストア生成
            db.createObjectStore(objStoreName, objStoreKey);
            console.log("オブジェクトストア生成");
        }

        console.log(db.objectStoreNames)

    }

    //成功したらエディタに書かれた要素を追加
    request.onsuccess = function(event){

        db = event.target.result;
        var objStoreName = "data";
        console.log("add")
    
        //トランザクション
        var transaction = db.transaction(objStoreName, 'readwrite');
        //オブジェクトストアにアクセスします。
        var objectStore = transaction.objectStore(objStoreName);
    
        objectStore.delete('1') //データを更新するために一旦削除
    
        //オブジェクトストアに追加のリクエストします。

        //保存形式
        //$cut&&$; メタ文字
        //メッセージと　それを作った時間を交互に入れる
        //メッセージ メタ文字 時間    メタ文字 メッセージメタ文字 時間   メタ文字 メッセージ 時間
        //hogefuga$cut&&$;1/1 - 23:00$cut&&$;piyo$cut&&$;1/2 - 12:00$cut&&$;fuga$cut&&$;1/5 - 8:00
        var text_data = "";

        //名前を付けて保存
        if(n == 1){
            //メッセージボックスを取得
            var box_elem = document.getElementById("main_box").getElementsByClassName("memo_box")
            //メッセージボックスをメッセージ、時間交互に区切る
            for(var i = 0;i < box_elem.length;i++){
                if(box_elem[i].getElementsByTagName("img").length == 0){ //テキストなら //(画像が含まれていないなら)
                    text_data += box_elem[i].getElementsByClassName("main")[0].textContent+"$cut&&$;"
                    text_data += box_elem[i].getElementsByClassName("time")[0].textContent+"$cut&&$;"
                }else{ //画像なら data urlを取得
                    console.log(box_elem[i].getElementsByClassName("main")[0].getElementsByTagName("img")[0])
                    text_data += box_elem[i].getElementsByClassName("main")[0].getElementsByTagName("img")[0].src+"$cut&&$;"
                    text_data += box_elem[i].getElementsByClassName("time")[0].textContent+"$cut&&$;"
                }
            }
        }else{
            //n == 2だったら新規作成
            text_data = ""
        }

        var save_data = {"id":"1","data":text_data}//object形式にして{id:"数字",..}にしないとだめ
        console.log(save_data)
        var request = objectStore.add(save_data);
    }
}


//セーブされたファイルを読み込む
function read_saved_file(){
    //openging_file = 今開いているファイル
    console.log(opening_file)
    var openReq = indexedDB.open(opening_file); //今のファイルデータを抽出

    openReq.onsuccess = function(event){
      var db = event.target.result;
      var trans = db.transaction("data", "readonly");
      var store = trans.objectStore("data"); //dataを開く
      var getReq = store.get("1");  //データを追加した時の{id:"数字"}の数字を入れる

      getReq.onsuccess = function(event){
        console.log(event.target.result); // {"id":"1","data":"AAAAAA"}

        var ret = event.target.result //保存されたデータ

        var text_data = ret["data"] //テキストデータ

        console.log(ret["data"])

        var text_list = text_data.split("$cut&&$;")

        text_list.pop()

        var main_box_html = ""

        for(var i = 0;i < text_list.length/2/*メッセージ&時間(2つの区切り)で1セットなので1/2している*/;i++){
            main_box_html += '<div class="memo_box">'
            +'<div class="add_pin" onclick="add_pin(event)"></div>' //ピン止めボタン
            +'<div class="edit" onclick="edit_memo(event)"></div>' //編集ボタン
            +'<div class="delete" onclick="delete_writing(event)"></div>'  //書き込み削除ボタン
            +'<div class="time">'+text_list[i*2+1]+'</div>' //時間

            if(text_list[i*2].indexOf("data:image/png;base64,") == -1){ //テキストなら　//(画像かどうかを判定する)
                main_box_html += '<div class="main">'+text_list[i*2].replaceAll("\n","\n<br>")+'</div></div>' //書き込み
            }else{ //画像なら
                main_box_html += '<div class="main"><img src="'+text_list[i*2].replaceAll("\n","\n<br>")+'"></div></div>' //画像
            }
        }
        var main_box = document.getElementById("main_box")
        main_box.innerHTML = main_box_html //いろいろを表示


        document.getElementById("file_name_big").textContent = opening_file; //ファイルの名前を表示
      }
    }
    
}

//ファイルを開くボタンが押されたとき
function open_file(e){

    //前のファイルを上書き保存する。openinf_fileを更新していないため新しいファイルのことではない
    save_file_data(1)

    //ファイル名を取得してファイルを開く
    opening_file = e.target.textContent


    read_saved_file()
}



//search_boxに入力した文字列が含まれている書き込みを検索
function read_search_file(){
    //openging_file = 今開いているファイル
    console.log(opening_file)
    var openReq = indexedDB.open(opening_file); //今のファイルデータを抽出

    openReq.onsuccess = function(event){
      var db = event.target.result;
      var trans = db.transaction("data", "readonly");
      var store = trans.objectStore("data"); //dataを開く
      var getReq = store.get("1");  //データを追加した時の{id:"数字"}の数字を入れる

      getReq.onsuccess = function(event){
        console.log(event.target.result); // {"id":"1","data":"AAAAAA"}

        var ret = event.target.result //保存されたデータ

        var text_data = ret["data"] //テキストデータ

        console.log(ret["data"])

        var input_str = document.getElementById("search_box").value

        var text_list = text_data.split("$cut&&$;")

        text_list.pop()

        var list_tmp = []


        for(var i = 0;i < text_list.length/2;i++){
            if(text_list[i*2].indexOf(input_str) != -1){ //検索した文字が含まれていたら
                list_tmp.push(text_list[i*2]) //string
                list_tmp.push(text_list[i*2+1]) //time (number)
            }
        }

        text_list = list_tmp


        var result_box_html = ""

        for(var i = 0;i < text_list.length/2/*メッセージ&時間(2つの区切り)で1セットなので1/2している*/;i++){
            result_box_html += '<div class="search_memo_box">'
            +'<div class="time">'+text_list[i*2+1]+'</div>' //時間
            +'<div class="main">'+text_list[i*2].replaceAll("\n","\n<br>")+'</div></div>' //書き込み
        }
        var result_box = document.getElementById("result_box")
        result_box.innerHTML = result_box_html //いろいろを表示
      }
    }
    
}


//ピン止め一覧を表示
function display_pin_file(){
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

        var text_data = ret["data"] //テキストデータ

        console.log(ret["data"])

        var text_list = text_data.split("$cut&&$;")

        text_list.pop()


        var pin_box_html = ""

        for(var i = 0;i < text_list.length/2/*メッセージ&時間(2つの区切り)で1セットなので1/2している*/;i++){
            pin_box_html += '<div class="search_memo_box" style="width:30vw;">'
            +'<div class="time">'+text_list[i*2+1]+'</div>' //時間
            if(text_list[i*2].indexOf("data:image/png;base64,") == -1){ //テキストなら
                pin_box_html += '<div class="main">'+text_list[i*2].replaceAll("\n","\n<br>")+'</div></div>' //書き込み
            }else{ //画像なら
                pin_box_html += '<div class="main"><img src="'+text_list[i*2].replaceAll("\n","\n<br>")+'"></div></div>' //画像
            }
        }
        var pin_box = document.getElementById("pin_list_box")
        pin_box.innerHTML = pin_box_html //いろいろを表示
      }
    }
    
}