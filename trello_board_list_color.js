// ==UserScript==
// @name         TrelloBoardListColor
// @namespace    TrelloBoardListColor
// @version      0.1
// @description  custom list color in trello board
// @author       sakagami0615
// @grant        none
// @require      https://code.jquery.com/jquery-3.3.1.slim.min.js
// ==/UserScript==


const CHECK_LOAD_QUERY = '#chrome-container';


(function() {
    'use strict';

    // DOMが読み込まれた際に、main処理を実施
    let interval_id = setInterval(waitLoad, 1000);
    function waitLoad() {
        if ($(CHECK_LOAD_QUERY)) {
            clearInterval(interval_id);
            main();
        }
    }

})();


// --------------------------------------------------
// 処理記載関数
// --------------------------------------------------
function main() {

    // Columnリストを取得
    $(".js-list.list-wrapper").each(function(i) {

        // リスト名取得
        let list_name = $(this).find('.list-header-name').text();

        // 色を取得し、null以外の場合はセットする
        let color_code = selectListColor(list_name);
        if (color_code) {
            $(this).find('.list-header-name').css('background-color', color_code);
        }
    });
}


// リスト名から背景色を取得
function selectListColor(list_name) {

    let color_code = null;

    switch(true) {
        case /^【BackLog】/.test(list_name):
            color_code = "#85eb8a";     // light green
            break;
        case /^【Do】/.test(list_name):
            color_code = "#5a85ff";     // light blue
            break;
        case /^【Temp】/.test(list_name):
            color_code = "#b7b7b7";     // light gray
            break;
        case /^【Done】/.test(list_name):
            color_code = "#777777";     // gray
            break;
    }

    return color_code
}
