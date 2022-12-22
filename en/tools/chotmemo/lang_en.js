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

    memo_elem.getElementsByClassName("main")[0].textContent = "making new line: [shift]+[Enter],save: [Enter]"
}