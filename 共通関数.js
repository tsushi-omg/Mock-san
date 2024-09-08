document.addEventListener('DOMContentLoaded',function(){


// //マウス座標を取得

// var mouseX = 0;
// var mouseY = 0;
// document.addEventListener('mousemove', function(event) {
//     mouseX = event.clientX;
//     mouseY = event.clientY;
// });


//editTableもしくはeditTableGrid右クリックでドロップダウンメニューを表示

var menuOpen = false;
const editTable = document.getElementById('editTable');

editTable.addEventListener('contextmenu', function() {
    if(menuOpen==false){
        event.preventDefault();//ブラウザの右クリックメニューを無効化
        var menu = document.getElementById('selectMenuObj');
        menu.hidden=false;
        menu.style.left=mouseX+"px";
        menu.style.top=mouseY+"px";
        menuOpen=true;
    }
    
});

//editTableクリックでメニューを閉じる

editTable.addEventListener('click', function() {
    if(menuOpen==true){
        var menu = document.getElementById('selectMenuObj');
        menu.hidden=true;
        menuOpen=false;
    }
});


const editTableGrid = document.getElementById('editTableGrid');

editTableGrid.addEventListener('contextmenu', function() {
    if(menuOpen==false){
        event.preventDefault();//ブラウザの右クリックメニューを無効化
        var menu = document.getElementById('selectMenuObj');
        menu.hidden=false;
        menu.style.left=mouseX+"px";
        menu.style.top=mouseY+"px";
        menuOpen=true;
    }
    
});

//editTableクリックでメニューを閉じる

editTableGrid.addEventListener('click', function() {
    if(menuOpen==true){
        var menu = document.getElementById('selectMenuObj');
        menu.hidden=true;
        menuOpen=false;
    }
});



const customBGArea = document.getElementById('customBGArea');

customBGArea.addEventListener('contextmenu', function() {
    if(menuOpen==false){
        event.preventDefault();//ブラウザの右クリックメニューを無効化
        var menu = document.getElementById('selectMenuObj');
        menu.hidden=false;
        menu.style.left=mouseX+"px";
        menu.style.top=mouseY+"px";
        menuOpen=true;
    }
    
});

//editTableクリックでメニューを閉じる

customBGArea.addEventListener('click', function() {
    if(menuOpen==true){
        var menu = document.getElementById('selectMenuObj');
        menu.hidden=true;
        menuOpen=false;
    }
});







//説明書


var explainWindow = document.getElementById('explainWindow');
var explainButton = document.getElementById('explainButton');

explainButton.addEventListener('mouseenter', function() {
    explainWindow.hidden=false;
});

explainButton.addEventListener('mouseleave', function() {
    explainWindow.hidden=true;
});







}) //dom終わり

//DOMの外************************************************************




//マウス座標を取得

var mouseX = 0;
var mouseY = 0;
document.addEventListener('mousemove', function(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
});




function mouseDrag(element) {
    element.onpointermove = function(event) {
        // 要素のサイズを取得
        const elementRect = this.getBoundingClientRect();
        // 右から20pxの範囲内にマウスがあるか確認
        // if (event.clientX > elementRect.right - 20) {
        //     // 右端20pxはドラッグを無効にする
        //     return;
        // }
        if (event.buttons) {
            this.style.left     = this.offsetLeft + event.movementX + 'px';
            this.style.top      = this.offsetTop  + event.movementY + 'px';
            this.style.position = 'absolute';
            this.draggable      = false;
            this.setPointerCapture(event.pointerId);
        }
    };
}




//編集範囲外に出ることを禁止する関数　角度に対する縦横の増分を考慮　数学っぽくてさすがにわからないのでGPT

function areaCheck(element) {
    setInterval(() => {
        var elementRect = element.getBoundingClientRect();
        var areaRect = document.getElementById('editTable').getBoundingClientRect();
        
        // 要素のスタイルを取得して回転角度を考慮
        const elementStyle = window.getComputedStyle(element);
        const matrix = elementStyle.transform;

        // // 回転している場合、行列から要素のサイズを計算
        // let elementWidth = elementRect.width;
        // let elementHeight = elementRect.height;
        
        if (matrix !== 'none') {
            const values = matrix.split('(')[1].split(')')[0].split(',');
            const a = parseFloat(values[0]);
            const b = parseFloat(values[1]);
            const angle = Math.atan2(b, a) * (180 / Math.PI);

            // 角度に応じて、回転後の幅と高さを再計算
            const radians = angle * (Math.PI / 180);
            const rotatedWidth = Math.abs(elementRect.width * Math.cos(radians)) + Math.abs(elementRect.height * Math.sin(radians));
            const rotatedHeight = Math.abs(elementRect.width * Math.sin(radians)) + Math.abs(elementRect.height * Math.cos(radians));

            elementWidth = rotatedWidth;
            elementHeight = rotatedHeight;
        }

        // 回転後も編集エリア内に収まるように位置を調整
        if (elementRect.top < areaRect.top) { // 上
            element.style.top = (parseFloat(element.style.top) + (areaRect.top - elementRect.top)) + "px";
        }
        if (elementRect.bottom > areaRect.bottom) { // 下
            element.style.top = (parseFloat(element.style.top) - (elementRect.bottom - areaRect.bottom)) + "px";
        }
        if (elementRect.left < areaRect.left) { // 左
            element.style.left = (parseFloat(element.style.left) + (areaRect.left - elementRect.left)) + "px";
        }
        if (elementRect.right > areaRect.right) { // 右
            element.style.left = (parseFloat(element.style.left) - (elementRect.right - areaRect.right)) + "px";
        }
    }, 10);
}




//フォントサイズをheightに合わせる関数

function autoFontSize(element){
    // setInterval(() => {
    //     var rect = element.getBoundingClientRect();
    //     element.style.fontSize=rect.height-1 +"px";
    // },100);
};






//スタイル設定画面　機能
function settingStyle(element,bunrui){
    element.addEventListener('click', function() {
        //変数定義
            //作成先エリア
            var sampleForm = document.getElementById('sampleForm');
            // //文字色　要素
            // var fontColor = document.getElementById('fontColor');

            // //背景色　要素
            // var BGColor = document.getElementById('BGColor');

            // //背景透明　チェック
            // var BGTransCheck = document.getElementById('BGTransCheck');

            // //枠線色　要素
            // var borderColor = document.getElementById('borderColor');

            // //枠線属性　セレクト
            // var borderSelect = document.getElementById('borderSelect');

            // //枠線有無　チェック
            // var borderCheck = document.getElementById('borderCheck');

            // //太字　チェック
            // var fontBoldCheck = document.getElementById('fontBoldCheck');

            // //下線　チェック
            // var underlineCheck = document.getElementById('underlineCheck');
        //背景設定エリア表示
        var backgroundForm = document.getElementById('backgroundForm');
        var BGColorSetter = document.getElementById('BGColorSetter');
        if(bunrui=="背景要素"){
            backgroundForm.hidden= false;
        }
        //背景設定エリア初期表示
        var editTable = document.getElementById('editTable');
        var comColor = window.getComputedStyle(editTable);
        BGColorSetter.value=rgbToHex(comColor.backgroundColor);
        //全体　背景色　input
        BGColorSetter.addEventListener('input', function() {
            editTable.style.backgroundColor=BGColorSetter.value;
        });
        //編集要素作成
            //文字色　要素
            var fontColor = document.createElement('input');
            fontColor.type="color";
            fontColor.style.position="absolute";
            fontColor.style.height="20px";
            fontColor.style.top="61px";
            fontColor.style.left="100px";
            sampleForm.appendChild(fontColor);
            //背景色　要素
            var BGColor = document.createElement('input');
            BGColor.type="color";
            BGColor.style.position="absolute";
            BGColor.style.height="20px";
            BGColor.style.top="92px";
            BGColor.style.left="100px";
            sampleForm.appendChild(BGColor);
            //枠線色　要素
            var borderColor = document.createElement('input');
            borderColor.type="color";
            borderColor.style.position="absolute";
            borderColor.style.height="20px";
            borderColor.style.top="123px";
            borderColor.style.left="100px";
            sampleForm.appendChild(borderColor);
            //背景透明　チェック
            var BGTransCheck = document.createElement('input');
            BGTransCheck.type="checkbox";
            BGTransCheck.style.position="absolute";
            BGTransCheck.style.top="96px";
            BGTransCheck.style.left="262px";
            sampleForm.appendChild(BGTransCheck);
            //枠線属性　セレクト
            var borderSelect = document.createElement('select');
            borderSelect.style.position="absolute";
            borderSelect.style.top="120px";
            borderSelect.style.left="161px";
            borderSelect.style.backgroundColor="rgb(122, 122, 122)";
                // オプションの追加
                var options = ["", "solid", "dotted", "dashed", "double", "groove", "ridge", "inset", "outset"];
                options.forEach(function(optionText) {
                    var option = document.createElement('option');
                    option.value = optionText;
                    option.textContent = optionText;
                    borderSelect.appendChild(option);
                });
            sampleForm.appendChild(borderSelect);
            //枠線有無　チェック
            var borderCheck = document.createElement('input');
            borderCheck.type="checkbox";
            borderCheck.style.position="absolute";
            borderCheck.style.top="127px";
            borderCheck.style.left="262px";
            sampleForm.appendChild(borderCheck);
            //太字　チェック
            var fontBoldCheck = document.createElement('input');
            fontBoldCheck.type="checkbox";
            fontBoldCheck.style.position="absolute";
            fontBoldCheck.style.top="160.5px";
            fontBoldCheck.style.left="100px";
            sampleForm.appendChild(fontBoldCheck);
            //下線　チェック
            var underlineCheck = document.createElement('input');
            underlineCheck.type="checkbox";
            underlineCheck.style.position="absolute";
            underlineCheck.style.top="192.5px";
            underlineCheck.style.left="100px";
            sampleForm.appendChild(underlineCheck);
        //初期表示
            //初期設定　文字色
            var computedColor = window.getComputedStyle(element).color;
            var hex = rgbToHex(computedColor);
            fontColor.value=hex;
            //初期設定　背景色
            if(element.style.backgroundColor=="transparent"){
                BGTransCheck.checked=true;//ok
            }else{
                var computedBGColor = window.getComputedStyle(element).backgroundColor;
                var hex = rgbToHex(computedBGColor);
                BGColor.value=hex;
                BGTransCheck.checked=false;//ok
            }
            //初期設定　枠線色
            if(element.style.borderStyle!="none" || element.style.borderStyle!=""){
                var computedBorderColor = window.getComputedStyle(element).backgroundColor;
                var hex = rgbToHex(computedBorderColor);
                borderColor.value=hex;
                // alert("ok"); //ok
            }
            //初期設定　枠線　有無
            if(element.style.borderStyle=="none" || element.style.borderStyle==""){//noneもしくは未設定
                borderCheck.checked=true;
                borderSelect.value="";//空文字を選択
            }else{
                // alert(window.getComputedStyle(element).borderStyle);  //[solid]
                borderSelect.value=window.getComputedStyle(element).borderStyle;//ok
                borderCheck.checked=false;
                // alert("ok"); //ok
            }
            //初期設定　太字　有無
            if(element.style.fontWeight=="normal" || element.style.fontWeight==""){//デフォルトもしくは未設定
                fontBoldCheck.checked=false;
                // alert("ok");  //ok
            }else{
                fontBoldCheck.checked=true;
                // alert("ok");  //ok
            }
            //初期設定　下線　有無
            if(element.style.textDecoration=="none" || element.style.textDecoration==""){//デフォルトもしくは未設定
                underlineCheck.checked=false;
                // alert("ok"); //ok
            }else{
                underlineCheck.checked=true;
                // alert("ok"); //ok
            }
        //inputイベント追加
            //文字色　　　　color---ok
            fontColor.addEventListener('input', function() {
                element.style.color=fontColor.value;
            });
            //背景色　　　　color---ok
            BGColor.addEventListener('input', function() {
                element.style.backgroundColor=BGColor.value;
                BGTransCheck.checked=false;
            });
            //背景色　透明　check!---ok
            BGTransCheck.addEventListener('input', function() {
                if(BGTransCheck.checked==true){
                    element.style.backgroundColor="transparent";
                }else{
                    element.style.backgroundColor=BGColor.value;
                }
            });
            //枠線色　　　　color---ok
            borderColor.addEventListener('input', function() {
                element.style.borderColor=borderColor.value;
                borderCheck.checked=false;
            });
            //枠線　　属性　select...---ok
            borderSelect.addEventListener('input', function() {
                if(borderSelect.value==""){
                    element.border="none"
                    borderCheck.checked=true;
                }else{
                    element.style.border=borderSelect.value;
                    element.style.borderColor=borderColor.value;
                    borderCheck.checked=false;
                }
            });
            //枠線　　有無　check!---ok
            borderCheck.addEventListener('input', function() {
                if(borderCheck.checked==true){
                    borderSelect.value="";
                    element.style.border="none";
                }else{
                    element.style.border=borderSelect.value;
                }
            });
            //太字　　有無　check!---ok
            fontBoldCheck.addEventListener('input', function() {
                if(fontBoldCheck.checked==true){
                    element.style.fontWeight="bold";
                }else{
                    element.style.fontWeight="normal";
                }
            });
            //下線　　有無　check!---ok
            underlineCheck.addEventListener('input', function() {
                if(underlineCheck.checked==true){
                    element.style.textDecoration="underLine";
                }else{
                    element.style.textDecoration="none";
                }
            });
    });
}




//セレクトワン用スタイル

function settingStyleSelect(element,bunrui){
    element.addEventListener('click', function() {
        //変数定義
            //作成先エリア
            var sampleFormSelect = document.getElementById('sampleFormSelect');
            var optionForm = document.getElementById('optionForm');
            //他form
            var sampleForm = document.getElementById('sampleForm');
            var groupForm = document.getElementById('groupForm');

        //form表示
        sampleFormSelect.hidden=false;
        optionForm.hidden=false;
        //他form非表示
        sampleForm.hidden=true;
        //編集要素作成
            //文字色　要素
            var fontColor = document.createElement('input');
            fontColor.type="color";
            fontColor.style.position="absolute";
            fontColor.style.height="20px";
            fontColor.style.top="61px";
            fontColor.style.left="100px";
            sampleFormSelect.appendChild(fontColor);
            //背景色　要素
            var BGColor = document.createElement('input');
            BGColor.type="color";
            BGColor.style.position="absolute";
            BGColor.style.height="20px";
            BGColor.style.top="92px";
            BGColor.style.left="100px";
            sampleFormSelect.appendChild(BGColor);
            //枠線色　要素
            var borderColor = document.createElement('input');
            borderColor.type="color";
            borderColor.style.position="absolute";
            borderColor.style.height="20px";
            borderColor.style.top="123px";
            borderColor.style.left="100px";
            sampleFormSelect.appendChild(borderColor);
            //背景透明　チェック
            var BGTransCheck = document.createElement('input');
            BGTransCheck.type="checkbox";
            BGTransCheck.style.position="absolute";
            BGTransCheck.style.top="96px";
            BGTransCheck.style.left="262px";
            sampleFormSelect.appendChild(BGTransCheck);
            //枠線属性　セレクト
            var borderSelect = document.createElement('select');
            borderSelect.style.position="absolute";
            borderSelect.style.top="120px";
            borderSelect.style.left="161px";
            borderSelect.style.backgroundColor="rgb(122, 122, 122)";
                // オプションの追加
                var options = ["", "solid", "dotted", "dashed", "double", "groove", "ridge", "inset", "outset"];
                options.forEach(function(optionText) {
                    var option = document.createElement('option');
                    option.value = optionText;
                    option.textContent = optionText;
                    borderSelect.appendChild(option);
                });
                sampleFormSelect.appendChild(borderSelect);
            //枠線有無　チェック
            var borderCheck = document.createElement('input');
            borderCheck.type="checkbox";
            borderCheck.style.position="absolute";
            borderCheck.style.top="127px";
            borderCheck.style.left="262px";
            sampleFormSelect.appendChild(borderCheck);
            //太字　チェック
            var fontBoldCheck = document.createElement('input');
            fontBoldCheck.type="checkbox";
            fontBoldCheck.style.position="absolute";
            fontBoldCheck.style.top="160.5px";
            fontBoldCheck.style.left="100px";
            sampleFormSelect.appendChild(fontBoldCheck);
        //初期表示
            //初期設定　文字色
            var computedColor = window.getComputedStyle(element).color;
            var hex = rgbToHex(computedColor);
            fontColor.value=hex;
            //初期設定　背景色
            if(element.style.backgroundColor=="transparent"){
                BGTransCheck.checked=true;//ok
            }else{
                var computedBGColor = window.getComputedStyle(element).backgroundColor;
                var hex = rgbToHex(computedBGColor);
                BGColor.value=hex;
                BGTransCheck.checked=false;//ok
            }
            //初期設定　枠線色
            if(element.style.borderStyle!="none" || element.style.borderStyle!=""){
                var computedBorderColor = window.getComputedStyle(element).backgroundColor;
                var hex = rgbToHex(computedBorderColor);
                borderColor.value=hex;
                // alert("ok"); //ok
            }
            //初期設定　枠線　有無
            if(element.style.borderStyle=="none" || element.style.borderStyle==""){//noneもしくは未設定
                borderCheck.checked=true;
                borderSelect.value="";//空文字を選択
            }else{
                // alert(window.getComputedStyle(element).borderStyle);  //[solid]
                borderSelect.value=window.getComputedStyle(element).borderStyle;//ok
                borderCheck.checked=false;
                // alert("ok"); //ok
            }
            //初期設定　太字　有無
            if(element.style.fontWeight=="normal" || element.style.fontWeight==""){//デフォルトもしくは未設定
                fontBoldCheck.checked=false;
                // alert("ok");  //ok
            }else{
                fontBoldCheck.checked=true;
                // alert("ok");  //ok
            }
        //inputイベント追加
            //文字色　　　　color---ok
            fontColor.addEventListener('input', function() {
                element.style.color=fontColor.value;
            });
            //背景色　　　　color---ok
            BGColor.addEventListener('input', function() {
                element.style.backgroundColor=BGColor.value;
                BGTransCheck.checked=false;
            });
            //背景色　透明　check!---ok
            BGTransCheck.addEventListener('input', function() {
                if(BGTransCheck.checked==true){
                    element.style.backgroundColor="transparent";
                }else{
                    element.style.backgroundColor=BGColor.value;
                }
            });
            //枠線色　　　　color---ok
            borderColor.addEventListener('input', function() {
                element.style.borderColor=borderColor.value;
                borderCheck.checked=false;
            });
            //枠線　　属性　select...---ok
            borderSelect.addEventListener('input', function() {
                if(borderSelect.value==""){
                    element.border="none"
                    borderCheck.checked=true;
                }else{
                    element.style.border=borderSelect.value;
                    element.style.borderColor=borderColor.value;
                    borderCheck.checked=false;
                }
            });
            //枠線　　有無　check!---ok
            borderCheck.addEventListener('input', function() {
                if(borderCheck.checked==true){
                    borderSelect.value="";
                    element.style.border="none";
                }else{
                    element.style.border=borderSelect.value;
                }
            });
            //太字　　有無　check!---ok
            fontBoldCheck.addEventListener('input', function() {
                if(fontBoldCheck.checked==true){
                    element.style.fontWeight="bold";
                }else{
                    element.style.fontWeight="normal";
                }
            });
    });
}





//ok



//ok

function openSetting2(element,bunrui){  //for radio
    element.addEventListener('click', function() {
        //rangeを削除
        var elements = document.getElementsByName('range');
        if (elements.length > 0) {
            for (var i = 0; i < elements.length; i++) {
                elements[i].remove();
            }
        }

        var elements = document.getElementsByName('range2');
        if (elements.length > 0) {
            for (var i = 0; i < elements.length; i++) {
                elements[i].remove();
            }
        }

        var elements = document.getElementsByName('range3');
        if (elements.length > 0) {
            for (var i = 0; i < elements.length; i++) {
                elements[i].remove();
            }
        }

        var elements = document.getElementsByName('range4');
        if (elements.length > 0) {
            for (var i = 0; i < elements.length; i++) {
                elements[i].remove();
            }
        }
        //width用のrangeを作成
        const editArea = document.getElementById("settingForm");
        const range = document.createElement("input");
        range.type="range";
        range.max="1132"
        range.min="0"
        range.name = "range";
        range.style.width="300px";
        range.style.position="absolute";
        range.style.left="90px";
        range.style.top="129px";
        editArea.appendChild(range); 
        var widthRange = document.getElementsByName('range')[0];
        
        //height用のrangeを作成
        const range2 = document.createElement("input");
        range2.type="range";
        range2.max="638"
        range2.min="0"
        range2.name = "range2";
        range2.style.width="300px";
        range2.style.position="absolute";
        range2.style.left="90px";
        range2.style.top="161px";
        editArea.appendChild(range2); 
        var heightRange = document.getElementsByName('range2')[0];

        //傾き用のrangeを作成
        const range3 = document.createElement("input");
        range3.type="range";
        range3.max="180"
        range3.min="-180"
        range3.name = "range3";
        range3.style.width="300px";
        range3.style.position="absolute";
        range3.style.left="90px";
        range3.style.top="225px";
        editArea.appendChild(range3); 
        var degreeRange = document.getElementsByName('range3')[0];

        //フォントサイズのrangeを作成
        const range4 = document.createElement("input");
        range4.type="range";
        range4.max="150"
        range4.min="20"
        range4.name = "range4";
        range4.style.width="300px";
        range4.style.position="absolute";
        range4.style.left="90px";
        range4.style.top="193px";
        editArea.appendChild(range4); 
        var fontSizeRange = document.getElementsByName('range4')[0];

        //要素取得
        var elementRect = element.getBoundingClientRect();
        var elementTransform = window.getComputedStyle(element).transform;
        var settingForm = document.getElementById('settingForm');
        var sampleForm = document.getElementById('sampleForm');
        var deleteButton = document.getElementById('deleteButton');
        var submitButton = document.getElementById('submitButton');
        var copyButton = document.getElementById('copyButton');
        var degreeResetButton = document.getElementById('degreeResetButton');
        var backgroundForm = document.getElementById('backgroundForm');
        var selectSettingForm = document.getElementById('selectSettingForm');
        var groupForm = document.getElementById('groupForm');
        var copyButton = document.getElementById('copyButton');
        var groupNameBox = document.getElementById('groupNameBox');
        var URLForm = document.getElementById('URLForm');
        var functionForm = document.getElementById('functionForm');
        //セレクトワン用オプション設定エリア
        var optionForm = document.getElementById('optionForm');
        //セレクトワンメニュー用スタイル設定エリア
        var sampleFormSelect = document.getElementById('sampleFormSelect');
            //設定を表示
            settingForm.hidden=false;
            sampleForm.hidden=false;
            groupForm.hidden=false;
            backgroundForm.hidden=true;
            selectSettingForm.hidden=true;
            optionForm.hidden=true;
            sampleFormSelect.hidden=true;
            copyButton.hidden=true;
            URLForm.hidden=true;
            functionForm.hidden=true;
            deleteButton.style.marginLeft="350px";
        //分類を表示
        bunruiLabel.textContent=bunrui;
        //idを表示
        var idBox = document.getElementById('idBox');
        idBox.value=element.id;
        //グループ名を表示
        groupNameBox.value=element.name;
        //スライダー初期表示
        widthRange.value = elementRect.width;
        heightRange.value = elementRect.height;
        //構成数初期表示
        var countRadioNumber = document.getElementById('countRadioNumber');
        var array = document.getElementsByName(element.name);
        var count = array.length;
        countRadioNumber.value=count;
        //傾きrange初期表示
            //degに変換。さすがに分からんので変換処理だけGPT
            let elementDeg = 0; // 角度を格納する変数を初期化
            if (elementTransform !== 'none') {
                // 行列形式の値を分割
                const values = elementTransform.split('(')[1].split(')')[0].split(',');

                // 行列から回転角度を計算（ラジアンを度に変換）
                const a = parseFloat(values[0]); // 行列の1列目1行目の値
                const b = parseFloat(values[1]); // 行列の1列目2行目の値
                elementDeg = Math.round(Math.atan2(b, a) * (180 / Math.PI)); // ラジアンを度に変換してelementDegに格納
            }
        degreeRange.value=elementDeg;//格納

        // スライダーのinputイベントで幅と高さを更新
        widthRange.addEventListener('input', function() {
            element.style.width = widthRange.value + 'px';
        });

        heightRange.addEventListener('input', function() {
            // var elementRect = element.getBoundingClientRect();
            element.style.height = heightRange.value + 'px';
            // element.style.fontSize = elementRect.height + "px"
        });
        //傾き
        degreeRange.addEventListener('input', function() {
            element.style.transform = 'rotate(' + degreeRange.value + 'deg)';
        });
        //フォントサイズ
        fontSizeRange.addEventListener('input', function() {
            element.style.fontSize=fontSizeRange.value+"px";
        });

        //傾きリセットボタン
        degreeResetButton.onclick = function(){
            element.style.transform = 'rotate(0deg)';
            range3.value=0;
        };
        // 削除ボタンでhidden
        deleteButton.onclick = function() {
            element.remove();
            //設定画面を閉じる
            settingForm.hidden=true;
            sampleForm.hidden=true;
            groupForm.hidden=true;
            backgroundForm.hidden=true;
            deleteKensuu++;
            document.getElementById('gabageRed').hidden=false;
            document.getElementById('deleteKensuu').hidden=false;
            document.getElementById('deleteKensuu').textContent=deleteKensuu;
            addGabage(element,bunrui);
        };
        // 保存ボタンでIDを保存
        submitButton.onclick = function() {
            // ID重複チェック
            var newId = idBox.value;
            var groupNameBox = document.getElementById('groupNameBox');
            var newName = groupNameBox.value;
            var countRadioNumber = document.getElementById('countRadioNumber');
            if (document.getElementById(newId) && newId !== element.id) {
                alert('このIDはすでに存在しています。');
            }else if(document.getElementsByName(groupNameBox.value)&& groupNameBox.value !== element.name){
                alert('このグループ名はすでに存在しています。');
            }else if(countRadioNumber.value.length != 1 && countRadioNumber.value.length != "" ){
                alert("2～10の整数値を設定してください。");
            }
            else if(countRadioNumber.value=="" || groupNameBox.value==""){
                alert("必須項目を設定してください。");
            }else{
                element.id = newId;
                element.name = newName;
                // 設定画面を閉じる
                settingForm.hidden = true;
                sampleForm.hidden = true;
                backgroundForm.hidden=true;
                addRadio(element,countRadioNumber.value,element.name);//構成数に合わせたradioを作成
            }
        };
    });
};





//構成数に合わせたradioを作成する関数
function addRadio(element,count,name){//要素，構成数の入力値，グループ名
    //作成場所
    var editArea = document.getElementById('editArea');
    //現在の構成数との差分
    var adder = 0;
    var array = document.getElementsByName(name);
    adder = count - array.length;
    if(adder>0){
        for(var i = 1; i <= adder; i++){
            var radio = document.createElement('input');
            radio.type="text";
            radio.value=name;
            radio.name=name;
            radio.style.position="absolute";
            radio.style.backgroundColor="transparent";
            radio.style.top="15%";
            radio.style.left="10%";
            radio.style.zIndex=7;
            radio.style.resize="none";
            //スタイル
            var style = window.getComputedStyle(element);
            radio.style.fontSize=style.fontSize;
            radio.style.backgroundColor=style.backgroundColor;
            radio.style.borderStyle=style.borderStyle;
            radio.style.borderColor=style.borderColor;
            radio.style.textDecoration=style.textDecoration;
            radio.style.color=style.color;
            radio.style.fontWeight=style.fontWeight;
            //追加
            editArea.appendChild(radio);
            //各関数
            mouseDrag(radio);
            areaCheck(radio);
            openSetting2(radio,"ラジオボタン");
            settingStyle(radio,"ラジオボタン");//スタイル設定画面
        }
    }
}


// function openSetting2(element,bunrui){ //for radio
//     element.addEventListener('click', function() {
//         //rangeを削除
//         var elements = document.getElementsByName('range');
//         if (elements.length > 0) {
//             for (var i = 0; i < elements.length; i++) {
//                 elements[i].remove();
//             }
//         }

//         var elements = document.getElementsByName('range2');
//         if (elements.length > 0) {
//             for (var i = 0; i < elements.length; i++) {
//                 elements[i].remove();
//             }
//         }
//         //width用のrangeを作成
//         const editArea = document.getElementById("settingForm");
//         const range = document.createElement("input");
//         range.type="range";
//         range.max="1132"
//         range.min="0"
//         range.name = "range";
//         range.style.width="300px";
//         range.style.position="absolute";
//         range.style.left="90px";
//         range.style.top="129px";
//         editArea.appendChild(range); 
//         var widthRange = document.getElementsByName('range')[0];
        
//         //height用のrangeを作成
//         const range2 = document.createElement("input");
//         range2.type="range";
//         range2.max="638"
//         range2.min="0"
//         range2.name = "range2";
//         range2.style.width="300px";
//         range2.style.position="absolute";
//         range2.style.left="90px";
//         range2.style.top="161px";
//         editArea.appendChild(range2); 
//         var heightRange = document.getElementsByName('range2')[0];

//         //要素取得
//         var elementRect = element.getBoundingClientRect();
//         var settingForm = document.getElementById('settingForm');
//         var sampleForm = document.getElementById('sampleForm');
//         var deleteButton = document.getElementById('deleteButton');
//         var submitButton = document.getElementById('submitButton');
//         var groupForm = document.getElementById('groupForm');
//         var copyButton = document.getElementById('copyButton');
//         var backgroundForm = document.getElementById('backgroundForm');
//         var selectSettingForm = document.getElementById('selectSettingForm');
//         var optionForm = document.getElementById('optionForm');
//         var sampleFormSelect = document.getElementById('sampleFormSelect');
//         //設定を表示
//         settingForm.hidden=false;
//         sampleForm.hidden=false;
//         copyButton.hidden=false;
//         copyButton.hidden=true;
//         groupForm.hidden=false;
//         deleteButton.style.marginLeft="350px";
//         backgroundForm.hidden=true;
//         selectSettingForm.hidden=true;
//         optionForm.hidden=true;
//         sampleFormSelect.hidden=true;
//         //構成数初期表示
//         // if(a){//変数　構成数が２以上のとき
//         // }
//         //グループ名表示
//         document.getElementById('groupNameBox').value=element.name;
//         //分類を表示
//         bunruiLabel.textContent=bunrui;
//         //idを表示
//         var idBox = document.getElementById('idBox');
//         idBox.value=element.id;
//         //スライダー初期表示
//         widthRange.value = elementRect.width;
//         heightRange.value = elementRect.height;
//             // // //スライダーvalueをwidthに代入
//             // setInterval(() => {
//             //     element.style.width = widthRange.value + 'px';
//             //     element.style.height = heightRange.value + 'px';
//             // }, 10);
//         // スライダーのinputイベントで幅と高さを更新
//         widthRange.addEventListener('input', function() {
//             element.style.width = widthRange.value + 'px';
//         });

//         heightRange.addEventListener('input', function() {
//             element.style.height = heightRange.value + 'px';
//         });

//         //削除ボタンでhidden
//         deleteButton.onclick = function() {
//             element.hidden=true;
//             //設定画面を閉じる
//             settingForm.hidden=true;
//             sampleForm.hidden=true;
//             groupForm.hidden=true;
//             deleteKensuu++;
//             document.getElementById('gabageRed').hidden=false;
//             document.getElementById('deleteKensuu').textContent=deleteKensuu;
//         };
//         // 保存ボタンでIDを保存
//         submitButton.onclick = function() {
//             // ID重複チェック
//             var newId = idBox.value;
//             var groupNameBox = document.getElementById('groupNameBox');
//             var newName = groupNameBox.value;
//             if (document.getElementById(newId) && newId !== element.id) {
//                 alert('このIDはすでに存在しています。');
//             }
//             var countRadioNumber = document.getElementById('countRadioNumber');
//             // var groupNameBox = document.getElementById('groupNameBox');
//             if(countRadioNumber.value.length != 1 && countRadioNumber.value.length != "" ){
//                 alert("2～10の整数値を設定してください。");
//             }
//             else if(countRadioNumber.value=="" || groupNameBox.value=="" || newId==""){
//                 alert("必須項目を設定してください。");
//             }else{
//                 element.id = newId;
//                 element.name = newName;
//                 // 設定画面を閉じる
//                 settingForm.hidden = true;
//                 sampleForm.hidden = true;
//             }
//         };
//     });
// };






//ok

function openSetting1(element,bunrui){  //for label,textbox,comd,link  ok!
    element.addEventListener('click', function() {
        //rangeを削除
        var elements = document.getElementsByName('range');
        if (elements.length > 0) {
            for (var i = 0; i < elements.length; i++) {
                elements[i].remove();
            }
        }

        var elements = document.getElementsByName('range2');
        if (elements.length > 0) {
            for (var i = 0; i < elements.length; i++) {
                elements[i].remove();
            }
        }

        var elements = document.getElementsByName('range3');
        if (elements.length > 0) {
            for (var i = 0; i < elements.length; i++) {
                elements[i].remove();
            }
        }

        var elements = document.getElementsByName('range4');
        if (elements.length > 0) {
            for (var i = 0; i < elements.length; i++) {
                elements[i].remove();
            }
        }
        //width用のrangeを作成
        const editArea = document.getElementById("settingForm");
        const range = document.createElement("input");
        range.type="range";
        range.max="1132"
        range.min="0"
        range.name = "range";
        range.style.width="300px";
        range.style.position="absolute";
        range.style.left="90px";
        range.style.top="129px";
        editArea.appendChild(range); 
        var widthRange = document.getElementsByName('range')[0];
        
        //height用のrangeを作成
        const range2 = document.createElement("input");
        range2.type="range";
        range2.max="638"
        range2.min="0"
        range2.name = "range2";
        range2.style.width="300px";
        range2.style.position="absolute";
        range2.style.left="90px";
        range2.style.top="161px";
        editArea.appendChild(range2); 
        var heightRange = document.getElementsByName('range2')[0];

        //傾き用のrangeを作成
        const range3 = document.createElement("input");
        range3.type="range";
        range3.max="180"
        range3.min="-180"
        range3.name = "range3";
        range3.style.width="300px";
        range3.style.position="absolute";
        range3.style.left="90px";
        range3.style.top="225px";
        editArea.appendChild(range3); 
        var degreeRange = document.getElementsByName('range3')[0];

        //フォントサイズのrangeを作成
        const range4 = document.createElement("input");
        range4.type="range";
        range4.max="150"
        range4.min="20"
        range4.name = "range4";
        range4.style.width="300px";
        range4.style.position="absolute";
        range4.style.left="90px";
        range4.style.top="193px";
        editArea.appendChild(range4); 
        var fontSizeRange = document.getElementsByName('range4')[0];

        //要素取得
        var elementRect = element.getBoundingClientRect();
        var elementTransform = window.getComputedStyle(element).transform;
        var settingForm = document.getElementById('settingForm');
        var sampleForm = document.getElementById('sampleForm');
        var deleteButton = document.getElementById('deleteButton');
        var submitButton = document.getElementById('submitButton');
        var copyButton = document.getElementById('copyButton');
        var degreeResetButton = document.getElementById('degreeResetButton');
        var backgroundForm = document.getElementById('backgroundForm');
        var selectSettingForm = document.getElementById('selectSettingForm');
        var groupForm = document.getElementById('groupForm');
        var URLForm = document.getElementById('URLForm');
        var URLBox = document.getElementById('URLBox');
        var functionForm = document.getElementById('functionForm');
        //セレクトワン用オプション設定エリア
        var optionForm = document.getElementById('optionForm');
        //セレクトワンメニュー用スタイル設定エリア
        var sampleFormSelect = document.getElementById('sampleFormSelect');
            //設定を表示
            settingForm.hidden=false;
            sampleForm.hidden=false;
            groupForm.hidden=true;
            backgroundForm.hidden=true;
            selectSettingForm.hidden=true;
            optionForm.hidden=true;
            sampleFormSelect.hidden=true;
            if(bunrui=="リンク"){
                URLForm.hidden=false;
            }else{
                URLForm.hidden=true;
            }
            if(bunrui=="コマンドボタン"){
                openFunction(element);
            }else{
                functionForm.hidden = true;
            }
        //分類を表示
        bunruiLabel.textContent=bunrui;
        //idを表示
        var idBox = document.getElementById('idBox');
        idBox.value=element.id;
        //スライダー初期表示
        widthRange.value = elementRect.width;
        heightRange.value = elementRect.height;
        //URL表示
        URLBox.value = URLmap.get(element.id) || ''; // URLが無い場合は空文字列を設定
        //傾きrange初期表示
            //degに変換。さすがに分からんので変換処理だけGPT
            let elementDeg = 0; // 角度を格納する変数を初期化
            if (elementTransform !== 'none') {
                // 行列形式の値を分割
                const values = elementTransform.split('(')[1].split(')')[0].split(',');

                // 行列から回転角度を計算（ラジアンを度に変換）
                const a = parseFloat(values[0]); // 行列の1列目1行目の値
                const b = parseFloat(values[1]); // 行列の1列目2行目の値
                elementDeg = Math.round(Math.atan2(b, a) * (180 / Math.PI)); // ラジアンを度に変換してelementDegに格納
            }
        degreeRange.value=elementDeg;//格納

        // スライダーのinputイベントで幅と高さを更新
        widthRange.addEventListener('input', function() {
            element.style.width = widthRange.value + 'px';
        });

        heightRange.addEventListener('input', function() {
            // var elementRect = element.getBoundingClientRect();
            element.style.height = heightRange.value + 'px';
            // element.style.fontSize = elementRect.height + "px"
        });
        //傾き
        degreeRange.addEventListener('input', function() {
            element.style.transform = 'rotate(' + degreeRange.value + 'deg)';
        });
        //フォントサイズ
        fontSizeRange.addEventListener('input', function() {
            element.style.fontSize=fontSizeRange.value+"px";
        });

        //傾きリセットボタン
        degreeResetButton.onclick = function(){
            element.style.transform = 'rotate(0deg)';
            range3.value=0;
        };
        //削除ボタンでhidden
        deleteButton.onclick = function() {
            element.hidden=true;
            //設定画面を閉じる
            settingForm.hidden=true;
            sampleForm.hidden=true;
            groupForm.hidden=true;
            backgroundForm.hidden=true;
            functionForm.hidden=true;
            deleteKensuu++;
            document.getElementById('gabageRed').hidden=false;
            document.getElementById('deleteKensuu').hidden=false;
            document.getElementById('deleteKensuu').textContent=deleteKensuu;
            addGabage(element,bunrui);
        };
        // 保存ボタンでIDを保存
        submitButton.onclick = function() {
            // ID重複チェック
            var newId = idBox.value;
            if (document.getElementById(newId) && newId !== element.id) {
                alert('このIDはすでに存在しています。');
            }else{
                element.id = newId;
                // 設定画面を閉じる
                settingForm.hidden = true;
                sampleForm.hidden = true;
                URLForm.hidden = true;
                backgroundForm.hidden=true;
                functionForm.hidden=true;
            };
            if(bunrui=="リンク"){
                submitURL(element);
            }
        };
        // 複製ボタンで同じ要素を作成
        copyButton.onclick = function() {
        //複製元の幅を取得しなおす
        var elementRectNew = element.getBoundingClientRect();
            //ラベル複製
            if(element.name=="label"){
                const editArea = document.getElementById("editArea");
                const textarea = document.createElement("input");
                textarea.type="input";
                textarea.name = "label";
                textarea.style.position="absolute";
                textarea.style.resize="none";
                textarea.style.zIndex=7;
                textarea.value=element.value;
                textarea.style.backgroundColor="transparent";
                textarea.style.top="16%";
                textarea.style.left="5%";
                textarea.style.width=elementRectNew.width+"px";
                textarea.style.height=elementRectNew.height+"px";
                textarea.autocomplete="off";
                textarea.value=element.value;//追加
                textarea.style.border=element.style.border;//追加
                textarea.style.borderColor=element.style.borderColor;//追加
                textarea.style.fontWeight=element.style.fontWeight;//追加
                textarea.style.fontSize=window.getComputedStyle(element).fontSize;//追加
                textarea.style.color=window.getComputedStyle(element).color;//追加
                textarea.style.backgroundColor=window.getComputedStyle(element).backgroundColor;//追加
                textarea.style.textDecoration=window.getComputedStyle(element).textDecoration;//追加
                editArea.appendChild(textarea);
                mouseDrag(textarea);
                areaCheck(textarea);
                openSetting1(textarea,"ラベル");
                settingStyle(textarea,"ラベル");//スタイル設定画面
            }
            //テキストボックス複製
            if(element.name=="textbox"){
                const editArea = document.getElementById("editArea");
                const textarea = document.createElement("input");
                textarea.type="text";
                textarea.name = "textbox";
                textarea.style.position="absolute";
                textarea.style.resize="none";
                textarea.style.zIndex=7;
                textarea.value=element.value;
                textarea.style.backgroundColor="transparent";
                textarea.style.top="16%";
                textarea.style.left="5%";
                textarea.style.width=elementRectNew.width+"px";
                textarea.style.height=elementRectNew.height+"px";
                textarea.autocomplete="off";
                textarea.value=element.value;//追加
                textarea.style.border=element.style.border;//追加
                textarea.style.borderColor=element.style.borderColor;//追加
                textarea.style.fontWeight=element.style.fontWeight;//追加
                textarea.style.fontSize=window.getComputedStyle(element).fontSize;//追加
                textarea.style.color=window.getComputedStyle(element).color;//追加
                textarea.style.backgroundColor=window.getComputedStyle(element).backgroundColor;//追加
                textarea.style.textDecoration=window.getComputedStyle(element).textDecoration;//追加
                editArea.appendChild(textarea);
                mouseDrag(textarea);
                areaCheck(textarea);
                openSetting1(textarea,"テキストボックス");
                settingStyle(textarea,"テキストボックス");//スタイル設定画面
            }
            //コマンドボタン複製
            if(element.name=="command"){
                const editArea = document.getElementById("editArea");
                const textarea = document.createElement("input");
                textarea.type="input";
                textarea.name = "command";
                textarea.style.position="absolute";
                textarea.style.resize="none";
                textarea.style.zIndex=7;
                textarea.value=element.value;
                textarea.style.backgroundColor="transparent";
                textarea.style.top="16%";
                textarea.style.left="5%";
                textarea.style.width=elementRectNew.width+"px";
                textarea.style.height=elementRectNew.height+"px";
                textarea.autocomplete="off";
                textarea.value=element.value;//追加
                textarea.style.border=element.style.border;//追加
                textarea.style.borderColor=element.style.borderColor;//追加
                textarea.style.fontWeight=element.style.fontWeight;//追加
                textarea.style.fontSize=window.getComputedStyle(element).fontSize;//追加
                textarea.style.color=window.getComputedStyle(element).color;//追加
                textarea.style.backgroundColor=window.getComputedStyle(element).backgroundColor;//追加
                textarea.style.textDecoration=window.getComputedStyle(element).textDecoration;//追加
                editArea.appendChild(textarea);
                mouseDrag(textarea);
                areaCheck(textarea);
                openSetting1(textarea,"コマンドボタン");
                settingStyle(textarea,"コマンドボタン");//スタイル設定画面
            }
            //リンク複製
            if(element.name=="link"){
                const editArea = document.getElementById("editArea");
                const textarea = document.createElement("input");
                textarea.type="input";
                textarea.name = "link";
                textarea.style.position="absolute";
                textarea.style.resize="none";
                textarea.style.zIndex=7;
                textarea.value=element.value;
                textarea.style.backgroundColor="transparent";
                textarea.style.top="16%";
                textarea.style.left="5%";
                textarea.style.width=elementRectNew.width+"px";
                textarea.style.height=elementRectNew.height+"px";
                textarea.autocomplete="off";
                textarea.value=element.value;//追加
                textarea.style.border=element.style.border;//追加
                textarea.style.borderColor=element.style.borderColor;//追加
                textarea.style.fontWeight=element.style.fontWeight;//追加
                textarea.style.fontSize=window.getComputedStyle(element).fontSize;//追加
                textarea.style.color=window.getComputedStyle(element).color;//追加
                textarea.style.backgroundColor=window.getComputedStyle(element).backgroundColor;//追加
                textarea.style.textDecoration=window.getComputedStyle(element).textDecoration;//追加
                editArea.appendChild(textarea);
                mouseDrag(textarea);
                areaCheck(textarea);
                openSetting1(textarea,"リンク");
                settingStyle(textarea,"リンク");//スタイル設定画面
            }
        };
    });
};



//URL保存
let URLmap = new Map();
function submitURL(element){
    var URLBox = document.getElementById('URLBox');
    var URL = URLBox.value;
    URLmap.set(element.id,URL);
    // alert(URLmap.get(newId));--ok
};


//機能設定画面
let functionMap = new Map();
let clipCopyMap = new Map();
let URLCopyMap = new Map();
function openFunction(element){
    //変数定義
    var functionForm = document.getElementById('functionForm');
    // var settingIcon = document.getElementById('settingIcon');
    var clipBordForm = document.getElementById('clipBordForm');
    var closeClipButton = document.getElementById('closeClipButton')
    var clipCopyBox = document.getElementById('clipCopyBox');
    var disabled1 = document.getElementById('disabled1');
    var clipSubmitButton = document.getElementById('clipSubmitButton');
    var linkFuncSubmitButton = document.getElementById('linkFuncSubmitButton');
    var linkFuncForm = document.getElementById('linkFuncForm');
    var closeLinkFuncButton = document.getElementById('closeLinkFuncButton');
    //表示非表示
    functionForm.hidden = false;
    //既存のボタンを削除
    if(document.getElementById('settingIconURL')){
        document.getElementById('settingIconURL').remove();//複数作成を回避
    }else if(document.getElementById('settingIconCB')){
        document.getElementById('settingIconCB').remove();//複数作成を回避
    };
    //セレクト要素作成
    var functionSelect = document.createElement('select');
    functionSelect.style.position="absolute";
    functionSelect.style.top="57px";
    functionSelect.style.left="90px";
    functionSelect.style.backgroundColor="rgb(122, 122, 122)";
    //設定ボタン宣言
    var settingIconCB, settingIconURL;
        // オプションの追加
        var options = ["", "指定文字をクリップボードへコピー", "リンクを埋め込んで遷移"];
        options.forEach(function(optionText) {
            var option = document.createElement('option');
            option.value = optionText;
            option.textContent = optionText;
            functionSelect.appendChild(option);
        });
    functionForm.appendChild(functionSelect);
    // //機能ボックス初期表示
    functionSelect.value=functionMap.get(element.id);
    //　設定ボタン初期作成
    if(functionMap.get(element.id) == "指定文字をクリップボードへコピー"){
        //設定アイコン作成＆イベリス
        settingIconCB = document.createElement('div');
        settingIconCB.textContent="⚙️";
        settingIconCB.style.cursor="pointer";
        settingIconCB.id='settingIconCB';
        settingIconCB.style.position="absolute";
        settingIconCB.style.top="48.5%";
        settingIconCB.style.left="79%";
        settingIconCB.style.fontSize="20px";
        // settingIconCB.hidden=true;
        functionForm.appendChild(settingIconCB);
            //イベントリスナー settingIconCB
            settingIconCB.addEventListener('click',function(){
                //詳細設定を開く
                clipBordForm.hidden=false;
                //他すべてhidden
                // disabled1.hidden=true;
                //テキストボックス　初期表示
                clipCopyBox.value=clipCopyMap.get(element.id)||"";
                //×ボタンクリックイベント
                closeClipButton.addEventListener('click',function(){
                    clipBordForm.hidden=true;
                    // disabled1.hidden=false;
                });
                clipSubmitButton.onclick = function() {
                    // 入力をmapに保存
                    clipCopyMap.set(element.id, clipCopyBox.value);
                    clipBordForm.hidden = true;
                    // disabled1.hidden = false;
                };
            });
    }else if(functionMap.get(element.id) == "リンクを埋め込んで遷移"){
        //設定アイコン作成＆イベリス
        //設定アイコン作成 settingIconURL
        settingIconURL = document.createElement('div');
        settingIconURL.textContent="⚙️";
        settingIconURL.style.cursor="pointer";
        settingIconURL.id='settingIconURL';
        settingIconURL.style.position="absolute";
        settingIconURL.style.top="48.5%";
        settingIconURL.style.left="79%";
        settingIconURL.style.fontSize="20px";
        functionForm.appendChild(settingIconURL);
        //イベントリスナー settingIconURL
        settingIconURL.addEventListener('click',function(){
            //詳細設定を開く
            linkFuncForm.hidden=false;
            //他すべてhidden
            // disabled1.hidden=true;
            //テキストボックス　初期表示
            linkFuncBox.value="";
            linkFuncBox.value=URLCopyMap.get(element.id)||"";
            //×ボタンクリックイベント
            closeLinkFuncButton.addEventListener('click',function(){
                linkFuncForm.hidden=true;
                // disabled1.hidden=false;
            });
            //保存ボタンクリックイベント
            linkFuncSubmitButton.onclick = function() {
                // 入力をmapに保存
                URLCopyMap.set(element.id, linkFuncBox.value);
                linkFuncForm.hidden = true;
                disabled1.hidden = false;
            };

        });
    }
    //************セレクトワン選択時処理********************************************************
    functionSelect.addEventListener('input',function(event){
        //選択情報を保存
        var selection = event.target.value;
        functionMap.set(element.id,selection);
        //選択に合わせた設定アイコン表示　空文字なら非表示
        if(selection==""){
            //既存のボタンを削除
            if(document.getElementById('settingIconURL')){
                document.getElementById('settingIconURL').remove();//複数作成を回避
                // alert("ok");--ok
            }else if(document.getElementById('settingIconCB')){
                document.getElementById('settingIconCB').remove();//複数作成を回避
            };
        }else if(selection=="指定文字をクリップボードへコピー"){
            //既存のボタンを削除
            if(document.getElementById('settingIconURL')){
                document.getElementById('settingIconURL').remove();//複数作成を回避
            }else if(document.getElementById('settingIconCB')){
                document.getElementById('settingIconCB').remove();//複数作成を回避
            };
            //設定アイコン作成 settingIconCB
            settingIconCB = document.createElement('div');
            settingIconCB.textContent="⚙️";
            settingIconCB.style.cursor="pointer";
            settingIconCB.id='settingIconCB';
            settingIconCB.style.position="absolute";
            settingIconCB.style.top="48.5%";
            settingIconCB.style.left="79%";
            settingIconCB.style.fontSize="20px";
            functionForm.appendChild(settingIconCB);
                //イベントリスナー settingIconCB
                settingIconCB.addEventListener('click',function(){
                    //詳細設定を開く
                    clipBordForm.hidden=false;
                    //他すべてhidden
                    // disabled1.hidden=true;
                    //テキストボックス　初期表示
                    clipCopyBox.value=clipCopyMap.get(element.id)||"";
                    //×ボタンクリックイベント
                    closeClipButton.addEventListener('click',function(){
                        clipBordForm.hidden=true;
                        // disabled1.hidden=false;
                    });
                    //保存ボタンクリックイベント
                    clipSubmitButton.onclick = function() {
                        // 入力をmapに保存
                        clipCopyMap.set(element.id, clipCopyBox.value);
                        clipBordForm.hidden = true;
                        // disabled1.hidden = false;
                    };

                });

        }else if(selection=="リンクを埋め込んで遷移"){
            //既存のボタンを削除
            if(document.getElementById('settingIconURL')){
                document.getElementById('settingIconURL').remove();//複数作成を回避
            }else if(document.getElementById('settingIconCB')){
                document.getElementById('settingIconCB').remove();//複数作成を回避
            }
            //設定アイコン作成 settingIconURL
            settingIconURL = document.createElement('div');
            settingIconURL.textContent="⚙️";
            settingIconURL.style.cursor="pointer";
            settingIconURL.id='settingIconURL';
            settingIconURL.style.position="absolute";
            settingIconURL.style.top="48.5%";
            settingIconURL.style.left="79%";
            settingIconURL.style.fontSize="20px";
            functionForm.appendChild(settingIconURL);
            //イベントリスナー settingIconURL
            settingIconURL.addEventListener('click',function(){
                //詳細設定を開く
                linkFuncForm.hidden=false;
                //他すべてhidden
                // disabled1.hidden=true;
                //テキストボックス　初期表示
                linkFuncBox.value="";
                linkFuncBox.value=URLCopyMap.get(element.id)||"";
                //×ボタンクリックイベント
                closeLinkFuncButton.addEventListener('click',function(){
                    linkFuncForm.hidden=true;
                    // disabled1.hidden=false;
                });
                //保存ボタンクリックイベント
                linkFuncSubmitButton.onclick = function() {
                    // 入力をmapに保存
                    URLCopyMap.set(element.id, linkFuncBox.value);
                    linkFuncForm.hidden = true;
                    disabled1.hidden = false;
                };

            });
        }
    });
};



//クリップボード設定ボタン
function CBSetting(element){
    //変数定義
    var clipBordForm = document.getElementById('clipBordForm');
    var clipCopyBox = document.getElementById('clipCopyBox');
    var disabled1 = document.getElementById('disabled1');
    //処理
    clipBordForm.hidden=false;
    disabled1.hidden=true;
    //ボタン押下時処理
    
};




// RGBからHEXへの変換関数
function rgbToHex(rgb) {
    var rgbArray = rgb.match(/\d+/g);
    var hex = "#" + rgbArray.map(function(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }).join("");
    return hex;
}



// 背景設定
function settingBackground(element) {
    element.addEventListener('click', function() {
        // メニューを閉じる
        var menu = document.getElementById('selectMenuObj');
        var settingForm = document.getElementById('settingForm');
        var groupForm = document.getElementById('groupForm');
        var sampleForm = document.getElementById('sampleForm');
        menu.hidden = true;
        menuOpen = false;
        settingForm.hidden = true;
        groupForm.hidden = true;
        sampleForm.hidden = true;

        // 背景設定画面を表示
        var backgroundForm = document.getElementById('backgroundForm');
        backgroundForm.hidden = false;

        var BGColorSetter = document.getElementById('BGColorSetter');
        var editTable = document.getElementById('editTable');

        // 初期値＝テーブルの背景色
        var computedStyle = window.getComputedStyle(editTable);
        var backColor = computedStyle.backgroundColor;
        var colorHex = rgbToHex(backColor);
        BGColorSetter.value = colorHex;

        // 色変更イベントを設定
        BGColorSetter.addEventListener('input', function() {
            editTable.style.backgroundColor = BGColorSetter.value;
    });
    });
}






//セレクトワンopensetting
function openSettingSelect(element,bunrui){
    element.addEventListener('click', function() {
    //変数定義
        //セレクトform
        var selectSettingForm = document.getElementById('selectSettingForm');
        //他form
        var settingForm = document.getElementById('settingForm');
        var URLForm = document.getElementById('URLForm');
        var functionForm = document.getElementById('functionForm');
    //form表示
    selectSettingForm.hidden=false;
    //他form非表示
    settingForm.hidden=true;
    URLForm.hidden=true;
    functionForm.hidden=true;
    //初期設定処理
        //分類表示
        bunruiLabelSelect.textContent=bunrui;
        //id表示
        idBoxSelect.value=element.id;
    //削除ボタンでhidden
    var deleteButtonSelect = document.getElementById('deleteButtonSelect');
    deleteButtonSelect.onclick = function() {
        element.hidden=true;
        //設定画面を閉じる
        selectSettingForm.hidden=true;
        sampleForm.hidden=true;
        backgroundForm.hidden=true;
        deleteKensuu++;
        document.getElementById('gabageRed').hidden=false;
        document.getElementById('deleteKensuu').hidden=false;
        document.getElementById('deleteKensuu').textContent=deleteKensuu;
        addGabage(element,bunrui);
    };
    // 保存ボタンでIDを保存
    var submitButtonSelect = document.getElementById('submitButtonSelect');
    submitButtonSelect.onclick = function() {
        // ID重複チェック
        var newId = idBoxSelect.value;
        if (document.getElementById(newId) && newId !== element.id) {
            alert('このIDはすでに存在しています。');
        }else{
            element.id = newId;
            // 設定画面を閉じる
            selectSettingForm.hidden = true;
            sampleForm.hidden = true;
        };
    };
    });
};


















//グリッド線表示or非表示
var forGrid = 0;
function onOffGrid(){
    forGrid++;
    if(forGrid % 2 != 0){
        document.getElementById('editTableGrid').hidden=true;
    }else{
        document.getElementById('editTableGrid').hidden=false;   
    }
}








//説明表示

function openExplain(){
    var element = document.getElementById('explainWindow');
    if(element.hidden==true){
        element.hidden=false;
    }else if(element.hidden==false){
        element.hidden=true;
    }
}

//説明非表示

function closeExplain(){
    var element = document.getElementById('explainWindow');
    element.hidden=true;
}






//ゴミ箱押下時処理
var deleteKensuu = 0;//ゴミ箱内の件数
function openGabage(){
    //変数定義
    var gabageIn = document.getElementById('gabageIn');
    var msgLabel = document.getElementById('msgLabel');
    var closeGabageButton = document.getElementById('closeGabageButton');
    //表示
    gabageIn.hidden=false;
    //データがなければ「データがありません」を表示
    if(deleteKensuu==0){
        msgLabel.textContent="データがありません。";
    }else{
        msgLabel.textContent="ポイ捨てはやめましょう。";
    }
    //削除ボタン処理
    closeGabageButton.onclick=function(){
        gabageIn.hidden=true;
    };
};

//削除要素をゴミ箱に追加する関数
function addGabage(element,bunrui){
    //変数定義
    var id = element.id;
    var gabageData = document.getElementById('gabageData');
    //付随データ作成
    var parentData = document.createElement('div');
    parentData.style.display="flex";
    gabageData.appendChild(parentData);
    //１　分類名
    var bunruiName = document.createElement('div');
    bunruiName.textContent = "　・[" + bunrui + "]";
    bunruiName.style.color="rgb(229, 229, 229)";
    parentData.appendChild(bunruiName);
    //１　分類名
    var bunruiName = document.createElement('div');
    bunruiName.textContent = "　・[ " + bunrui + " ]";
    bunruiName.style.color="rgb(229, 229, 229)";
    parentData.appendChild(bunruiName);
    //２　ＩＤ
    var idData = document.createElement('div');
    bunruiName.textContent = "　" + id;
    bunruiName.style.color="rgb(229, 229, 229)";
    parentData.appendChild(idData);
    //３　完全削除ボタン
    var deleteButton = document.createElement('div');
    deleteButton.textContent = "完全削除";
    deleteButton.style.position = "absolute";
    deleteButton.style.left = "70%";
    deleteButton.style.color="rgb(290, 40, 40)";
    deleteButton.style.textDecoration="underline";
    deleteButton.style.cursor = "pointer";
    deleteButton.onclick=function(){
        element.remove();
        parentData.remove();
        //件数表示
        deleteKensuu--;
        document.getElementById('deleteKensuu').textContent=deleteKensuu;
        if(deleteKensuu==0){
            document.getElementById('gabageRed').hidden=true;
            document.getElementById('deleteKensuu').hidden=true;
        }
    }
    parentData.appendChild(deleteButton);
    //４　復元ボタン
    var resotoreButton = document.createElement('div');
    resotoreButton.textContent = "復元";
    resotoreButton.style.position = "absolute";
    resotoreButton.style.left = "88%";
    resotoreButton.style.color="rgb(40, 190, 125)";
    resotoreButton.style.textDecoration="underline";
    resotoreButton.style.cursor = "pointer";
    resotoreButton.onclick=function(){
        element.hidden=false;
        parentData.remove();
        //件数表示
        deleteKensuu--;
        document.getElementById('deleteKensuu').textContent=deleteKensuu;
        if(deleteKensuu==0){
            document.getElementById('gabageRed').hidden=true;
            document.getElementById('deleteKensuu').hidden=true;
        }
    }
    parentData.appendChild(resotoreButton);
    //空行
    var p = document.createElement('p');
    parentData.appendChild(p);
}


// //テーブル罫線

// function openLarge(){
//     document.getElementById('editTable').hidden=true;
//     document.getElementById('editTableS').hidden=true;
//     document.getElementById('editTableL').hidden=false;
// }
// function openMedium(){
//     document.getElementById('editTableL').hidden=true;
//     document.getElementById('editTableS').hidden=true;
//     document.getElementById('editTable').hidden=false;
// }
// function openSmall(){
//     document.getElementById('editTableL').hidden=true;
//     document.getElementById('editTable').hidden=true;
//     document.getElementById('editTableS').hidden=false;
// }


//ラベル要素作成 ok!

var countLabel = 0;
function createElementLabel(){
    //【共通】メニューを閉じる
    var menu = document.getElementById('selectMenuObj');
    menu.hidden=true;
    menuOpen=false;
    //ラベル要素作成
    if(countLabel<100){
        const editArea = document.getElementById("editArea");
        const textarea = document.createElement("input");
        textarea.type="text";
        countLabel ++;
        textarea.id = "label"+countLabel;
        textarea.name = "label";
        editArea.appendChild(textarea); 
        //マウスの位置に移動
        textarea.style.left=mouseX +"px";
        textarea.style.top=mouseY+"px";
        textarea.style.position="absolute";
        textarea.style.resize="none";
        textarea.autocomplete="off";
        // textarea.style.border="dashed";
        // textarea.style.fontWeight="bold";
        // textarea.style.textDecoration="underLine";
        textarea.style.zIndex=7;
            // textarea.classList.add('label_area');
            // textarea.style.fontSize="22px";
        textarea.style.backgroundColor="transparent";
        if(countLabel==100){
            var manuLabel = document.getElementById('manuLabel');
            manuLabel.disabled=true;
        };
        //マウスドラッグ関数を適用
        mouseDrag(textarea);
        areaCheck(textarea);
        openSetting1(textarea,"ラベル");
        settingStyle(textarea,"ラベル");//スタイル設定画面

        // // //test
        // setInterval(() => {
        //     var rect = textarea.getBoundingClientRect();
        //     textarea.style.fontSize=rect.height+"px";
        // }, 100);
        
    };
};






//テキストボックス要素作成 ok!

var countTextbox = 0;
function createElementTextbox(){
    //【共通】メニューを閉じる
    var menu = document.getElementById('selectMenuObj');
    menu.hidden=true;
    menuOpen=false;
    //要素作成
    if(countTextbox<30){
        const editArea = document.getElementById("editArea");
        const textbox = document.createElement("input");
        countTextbox ++;
        textbox.type="text"
        textbox.id = "textbox"+countTextbox;
        textbox.name = "textbox";
        editArea.appendChild(textbox); 
        //マウスの位置に移動
        textbox.style.left=mouseX +"px";
        textbox.style.top=mouseY+"px";
        textbox.style.position="absolute";
        textbox.style.resize="none";
        // textbox.style.color="gray";
        textbox.style.zIndex=7;
        textbox.style.backgroundColor="transparent";
        textbox.autocomplete="off";
        if(countTextbox==30){
            var manuLabel = document.getElementById('manuTextbox');
            manuLabel.disabled=true;
        };

        //マウスドラッグ関数を適用
        mouseDrag(textbox);
        areaCheck(textbox);
        openSetting1(textbox,"テキストボックス");
        settingStyle(textbox,"テキストボックス");//スタイル設定画面
        // autoFontSize(textbox);
    };
};






//ラジオボタン要素作成 ok!

var countRadio = 0;
function createElementRadio(){
    //【共通】メニューを閉じる
    var menu = document.getElementById('selectMenuObj');
    menu.hidden=true;
    menuOpen=false;
    //ラベル要素作成
    if(countRadio<10){
        const editArea = document.getElementById("editArea");
        const textarea = document.createElement("input");
        textarea.type="text";
        countRadio ++;
        // textarea.id = "radio"+countRadio;
        textarea.name = "radio"+countRadio;
        editArea.appendChild(textarea); 
        //マウスの位置に移動
        textarea.style.left=mouseX +"px";
        textarea.style.top=mouseY+"px";
        textarea.style.position="absolute";
        textarea.style.resize="none";
        textarea.style.zIndex=7;
        textarea.style.backgroundColor="transparent";
        textarea.autocomplete="off";
        // mouseDrag(textarea.id);
        if(countRadio==10){
            var manuRadio = document.getElementById('manuRadio');
            manuRadio.disabled=true;
        };
        //マウスドラッグ関数を適用
        mouseDrag(textarea);
        areaCheck(textarea);
        openSetting2(textarea,"ラジオボタン");
        settingStyle(textarea,"ラジオボタン");//スタイル設定画面
        // autoFontSize(textarea);
    };
};





//コマンドボタン要素作成 ok!

var countCommand = 0;
function createElementCommand(){
    //【共通】メニューを閉じる
    var menu = document.getElementById('selectMenuObj');
    menu.hidden=true;
    menuOpen=false;
    //ラベル要素作成
    if(countCommand<30){
        const editArea = document.getElementById("editArea");
        const textarea = document.createElement("input");
        textarea.type="text";
        countCommand ++;
        textarea.id = "command"+countCommand;
        textarea.name = "command";
        editArea.appendChild(textarea); 
        //マウスの位置に移動
        textarea.style.left=mouseX +"px";
        textarea.style.top=mouseY+"px";
        textarea.style.position="absolute";
        textarea.style.resize="none";
        textarea.style.zIndex=7;
        textarea.style.backgroundColor="transparent";
        textarea.autocomplete="off";
        // mouseDrag(textarea.id);
        if(countCommand==30){
            var manuCommand = document.getElementById('manuCommand');
            manuCommand.disabled=true;
        };
        //マウスドラッグ関数を適用
        mouseDrag(textarea);
        areaCheck(textarea);
        openSetting1(textarea,"コマンドボタン");
        settingStyle(textarea,"コマンドボタン");//スタイル設定画面
        // autoFontSize(textarea);
    };
};





//リンク要素作成 ok!

var countLink = 0;
function createElementLink(){
    //【共通】メニューを閉じる
    var menu = document.getElementById('selectMenuObj');
    menu.hidden=true;
    menuOpen=false;
    //リンク要素作成
    if(countLink<30){
        const editArea = document.getElementById("editArea");
        const textarea = document.createElement("input");
        textarea.type="text";
        countLink ++;
        textarea.id = "link"+countLink;
        textarea.name = "link";
        editArea.appendChild(textarea); 
        //マウスの位置に移動
        textarea.style.left=mouseX +"px";
        textarea.style.top=mouseY+"px";
        textarea.style.position="absolute";
        textarea.style.resize="none";
        textarea.style.zIndex=7;
        textarea.style.textDecoration="underline";
        textarea.style.color="blue";
        textarea.style.backgroundColor="transparent";
        textarea.autocomplete="off";
        // mouseDrag(textarea.id);
        if(countLink==30){
            var manuLink = document.getElementById('manuLink');
            manuLink.disabled=true;
        };
        //マウスドラッグ関数を適用
        mouseDrag(textarea);
        areaCheck(textarea);
        openSetting1(textarea,"リンク");
        settingStyle(textarea,"リンク");//スタイル設定画面
        // autoFontSize(textarea);
    };
};



//背景要素作成

var countBG = 0;
function createElementBG(){
    //【共通】メニューを閉じる
    var menu = document.getElementById('selectMenuObj');
    menu.hidden=true;
    menuOpen=false;
    //背景要素作成
    if(countBG<100){
        const editArea = document.getElementById("editArea");
        const textarea = document.createElement("input");
        textarea.type="text";
        countBG ++;
        textarea.id = "BG"+countBG;
        textarea.name = "BG";
        editArea.appendChild(textarea); 
        //マウスの位置に移動
        textarea.style.left=mouseX +"px";
        textarea.style.top=mouseY+"px";
        textarea.style.position="absolute";
        textarea.style.resize="none";
        textarea.style.zIndex=5;
        textarea.style.backgroundColor="transparent";
        textarea.autocomplete="off";
        // mouseDrag(textarea.id);
        if(countBG==100){
            var manuBG = document.getElementById('manuBG');
            manuBG.disabled=true;
        };
        //マウスドラッグ関数を適用
        mouseDrag(textarea);
        areaCheck(textarea);
        // settingBackground(textarea);
        openSetting1(textarea,"背景要素");
        settingStyle(textarea,"背景要素");//スタイル設定画面
    };
};




//セレクトワン要素作成 ok!

var countSelectone = 0;
function createElementSelectone(){
    //【共通】メニューを閉じる
    var menu = document.getElementById('selectMenuObj');
    menu.hidden=true;
    menuOpen=false;
    //セレクトワン要素作成
    if(countSelectone<10){
        const editArea = document.getElementById("editArea");
        const textarea = document.createElement("select");
        countSelectone ++;
        textarea.id = "selectone"+countSelectone;
        textarea.name = "selectone";
        editArea.appendChild(textarea); 
        //マウスの位置に移動
        textarea.style.left=mouseX +"px";
        textarea.style.top=mouseY+"px";
        textarea.style.position="absolute";
        textarea.style.resize="none";
        textarea.style.zIndex=7;
        textarea.style.backgroundColor="transparent";
        if(countSelectone==10){
            var manuSelectone = document.getElementById('manuSelectone');
            manuSelectone.disabled=true;
        };
        //マウスドラッグ関数を適用
        mouseDrag(textarea);
        areaCheck(textarea);
        openSettingSelect(textarea,"セレクトワンメニュー");
        settingStyleSelect(textarea,"セレクトワンメニュー");//スタイル設定画面
        
    };
};


















//html生成*********************************************************************************



//最終格納場所
var resultCode = "";


//大元関数
function createHTML(){
    //初期化
    resultCode="";
    addStartCode();
    createLabel();
    createTextbox();
    // createRadio();
    createCommnadURL();
    createLink();
    // createSelectone();
    createBG();
    resultCode += `</body>`;
    //メニュー系処理
    openResult();
};


//結果無しのテンプレ
var noResult = `<!doctype html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body{
            background-color: ${BGColor};
        }
    </style>
</head>
<body>
</body>
undefined`;





//結果表示 Mock - sanクリック
var currentfileName = "";
function openResult(){
    //変数定義
    var resultForm = document.getElementById('resultForm');
    var closeResultButton = document.getElementById('closeResultButton');
    var copyResultButton = document.getElementById('copyResultButton');
    var previewResultButton = document.getElementById('previewResultButton');
    var downloadResultButton = document.getElementById('downloadResultButton');
    var resultArea = document.getElementById('resultArea');

    var submitNameForm = document.getElementById('submitNameForm');
    var closeNamingButton = document.getElementById('closeNamingButton');
    var downloadButton = document.getElementById('downloadButton');
    var submitNameBox = document.getElementById('submitNameBox');
    //初期表示
    resultForm.hidden=false;
    resultArea.value=resultCode;
    //×ボタンクリック
    closeResultButton.onclick=function(){
        resultForm.hidden=true;
    };
    //コピーボタンクリック
    copyResultButton.onclick=function(){
        copyToClipboard(resultCode);//ボードにコピー
    };
    //ダウンロードアイコンクリック
    downloadResultButton.onclick=function(){
        submitNameForm.hidden=false;
        //×クリック
        closeNamingButton.onclick=function(){
            submitNameForm.hidden=true;
        };
        //ダウンロードボタンクリック
        downloadButton.onclick=function(){
            if(submitNameBox.value==""){
                alert("ファイル名を入力してください。");
            }else{
                currentfileName=submitNameBox.value;
                downloadHTML();
            }
        };
    };
    //プレビューボタンクリック
    previewResultButton.onclick=function(){
        const newWindow = window.open('preview.html', '_blank', `width=${screen.width},height=${screen.height},top=0,left=0`);
        newWindow.onload = function() {
            newWindow.postMessage(resultCode, '*');
        };
    };
}

//ダウンロード
function downloadHTML(){
    const content = resultCode;
            const fileName = currentfileName+'.html'; // 保存するファイル名

            // Blobオブジェクトを作成
            const blob = new Blob([content], { type: 'text/html' });
            const url = URL.createObjectURL(blob);

            // ダウンロード用のリンクを作成
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;

            // リンクをクリックしてファイルを保存
            document.body.appendChild(a);
            a.click();

            // リンクを削除してメモリを解放
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
};








// クリップボードにコピーする関数
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('クリップボードにコピーされました');
    }).catch(err => {
        alert('コピーに失敗しました: ' + err);
    });
};


//開始
function addStartCode(){
    var BGColor = document.getElementById('BGColorSetter').value;
    var startHTML = `<!doctype html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body{
            background-color: ${BGColor};
        }
    </style>
</head>
<body>
`;
    resultCode += startHTML;
}

//終了
var endHTML = `
</body>`;


//label---絵文字以外ok　uFE0Fを取り除けば理論的にはできるはずなんだけど……。
function createLabel(){
    //要素配列
    var array = document.getElementsByName('label');
    for(var i = 0; i < array.length; i++){
        if(array[i].hidden==false){
            var element = array[i];
            //変数定義
            var rect = element.getBoundingClientRect();
            var area = document.getElementById('editTable');
            var areaRect = area.getBoundingClientRect();
            //計算(width,height,left,top)(編集エリアのwidth=1136)
            element.style.width=rect.width/1136*100+"%";
            element.style.height=rect.height/639*100+"%";
            element.style.top=(rect.top-areaRect.top)/639*100+"%";
            element.style.left=(rect.left-areaRect.left)/1136*100+"%";
            //フォントサイズ計算
            var fs = window.getComputedStyle(element).fontSize;
            var fsNum = parseFloat(fs);
            element.style.fontSize=fsNum*980/639+"px";
            //idとstyleを取得
            var id = element.id;
            var style = element.style.cssText;
            var text = element.value;
            // U+FE0F を省略する
            text = text.replace(/\uFE0F/g, ''); // U+FE0F を空文字に置換
            //テンプレ
            var templete = `<label id="${id}" style="${style}">${text}</label>
`;
            resultCode += templete;
            //計算された値を元に戻して終了
            element.style.width = rect.width + "px";
            element.style.height = rect.height + "px";
            element.style.top = rect.top + "px";
            element.style.left = rect.left + "px";
            element.style.fontSize = fs;
        };
    };
};



//textbox
function createTextbox(){
    //要素配列
    var array = document.getElementsByName('textbox');
    for(var i = 0; i < array.length; i++){
        if(array[i].hidden==false){
            var element = array[i];
            //変数定義
            var rect = element.getBoundingClientRect();
            var area = document.getElementById('editTable');
            var areaRect = area.getBoundingClientRect();
            //計算(width,height,left,top,fontSize)(編集エリアのwidth=1136)
            element.style.width=rect.width/1136*100+"%";
            element.style.height=rect.height/639*100+"%";
            element.style.top=(rect.top-areaRect.top)/639*100+"%";
            element.style.left=(rect.left-areaRect.left)/1136*100+"%";
            //フォントサイズ計算
            var fs = window.getComputedStyle(element).fontSize;
            var fsNum = parseFloat(fs);
            element.style.fontSize=fsNum*980/639+"px";
            //idとstyleを取得
            var id = element.id;
            var style = element.style.cssText;
            var text = element.value;
            // U+FE0F を省略する
            text = text.replace(/\uFE0F/g, ''); // U+FE0F を空文字に置換
            //テンプレ
            var templete = `<input type="text" id="${id}" style="${style}" placeholder="${text}">
`;
            resultCode += templete;
            //計算された値を元に戻して終了
            element.style.width = rect.width + "px";
            element.style.height = rect.height + "px";
            element.style.top = rect.top + "px";
            element.style.left = rect.left + "px";
            element.style.fontSize = fs;
        };
    };
};


//link
function createLink(){
    //要素配列
    var array = document.getElementsByName('link');
    for(var i = 0; i < array.length; i++){
        if(array[i].hidden==false){
            var element = array[i];
            //変数定義
            var rect = element.getBoundingClientRect();
            var area = document.getElementById('editTable');
            var areaRect = area.getBoundingClientRect();
            var url = URLmap.get(element.id);
            //計算(width,height,left,top,fontSize)(編集エリアのwidth=1136)
            element.style.width=rect.width/1136*100+"%";
            element.style.height=rect.height/639*100+"%";
            element.style.top=(rect.top-areaRect.top)/639*100+"%";
            element.style.left=(rect.left-areaRect.left)/1136*100+"%";
            //フォントサイズ計算
            var fs = window.getComputedStyle(element).fontSize;
            var fsNum = parseFloat(fs);
            element.style.fontSize=fsNum*980/639+"px";
            //idとstyleを取得
            var id = element.id;
            var style = element.style.cssText;
            var text = element.value;
            // U+FE0F を省略する
            text = text.replace(/\uFE0F/g, ''); // U+FE0F を空文字に置換
            //テンプレ
            var templete = `<a id="${id}" style="${style}" target="_blank" rel="noopener noreferrer" href="${url}">${text}</a>
`;
            resultCode += templete;
            //計算された値を元に戻して終了
            element.style.width = rect.width + "px";
            element.style.height = rect.height + "px";
            element.style.top = rect.top + "px";
            element.style.left = rect.left + "px";
            element.style.fontSize = fs;
        };
    };
};

//command リンクを埋め込んで遷移
function createCommnadURL(){
    //要素配列
    var array = document.getElementsByName('command');
    for(var i = 0; i < array.length; i++){
        if(array[i].hidden==false){
            var element = array[i];
            if(functionMap.get(element.id)=="リンクを埋め込んで遷移"){
                //変数定義
                var rect = element.getBoundingClientRect();
                var area = document.getElementById('editTable');
                var areaRect = area.getBoundingClientRect();
                var url = URLCopyMap.get(element.id);
                //計算(width,height,left,top,fontSize)(編集エリアのwidth=1136)
                element.style.width=rect.width/1136*100+"%";
                element.style.height=rect.height/639*100+"%";
                element.style.top=(rect.top-areaRect.top)/639*100+"%";
                element.style.left=(rect.left-areaRect.left)/1136*100+"%";
                //フォントサイズ計算
                var fs = window.getComputedStyle(element).fontSize;
                var fsNum = parseFloat(fs);
                element.style.fontSize=fsNum*980/639+"px";
                //idとstyleを取得
                var id = element.id;
                var style = element.style.cssText;
                var text = element.value;
                // U+FE0F を省略する
                text = text.replace(/\uFE0F/g, ''); // U+FE0F を空文字に置換
                //テンプレ
                var templete = `<button id="${id}" style="${style}" onclick="window.open('${url}','_blank','noopener,noreferrer')">${text}</button>
    `;
                resultCode += templete;
                //計算された値を元に戻して終了
                element.style.width = rect.width + "px";
                element.style.height = rect.height + "px";
                element.style.top = rect.top + "px";
                element.style.left = rect.left + "px";
                element.style.fontSize = fs;
            };
        };
    };
};



//command 指定文字をクリップボードへコピー
var addScript = false;
function createCommnadURL(){
    //要素配列
    var array = document.getElementsByName('command');
    if(array.length!=0){//一度だけ関数を追加
        resultCode += `<script>
// クリップボードにコピーする関数
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
    alert('クリップボードにコピーされました');
    }).catch(err => {
    alert('コピーに失敗しました: ' + err);
    });
};
</script>
`;
    }
    for(var i = 0; i < array.length; i++){
        if(array[i].hidden==false){
            var element = array[i];
            if(functionMap.get(element.id)=="指定文字をクリップボードへコピー"){
                //変数定義
                var rect = element.getBoundingClientRect();
                var area = document.getElementById('editTable');
                var areaRect = area.getBoundingClientRect();
                var url = URLCopyMap.get(element.id);
                //計算(width,height,left,top,fontSize)(編集エリアのwidth=1136)
                element.style.width=rect.width/1136*100+"%";
                element.style.height=rect.height/639*100+"%";
                element.style.top=(rect.top-areaRect.top)/639*100+"%";
                element.style.left=(rect.left-areaRect.left)/1136*100+"%";
                //フォントサイズ計算
                var fs = window.getComputedStyle(element).fontSize;
                var fsNum = parseFloat(fs);
                element.style.fontSize=fsNum*980/639+"px";
                //idとstyleを取得
                var id = element.id;
                var style = element.style.cssText;
                var text = element.value;
                var CB = clipCopyMap.get(element.id);
                // U+FE0F を省略する
                text = text.replace(/\uFE0F/g, ''); // U+FE0F を空文字に置換
                //テンプレ
                var templete = `<script>
    var text = "${CB}";
</script>
<button id="${id}" style="${style}" onclick="copyToClipboard(text)">${text}</button>
`;
                resultCode += templete;
                //計算された値を元に戻して終了
                element.style.width = rect.width + "px";
                element.style.height = rect.height + "px";
                element.style.top = rect.top + "px";
                element.style.left = rect.left + "px";
                element.style.fontSize = fs;
            };
        };
    };
};














//背景
function createBG(){
    //要素配列
    var array = document.getElementsByName('BG');
    for(var i = 0; i < array.length; i++){
        if(array[i].hidden==false){
            var element = array[i];
            //変数定義
            var rect = element.getBoundingClientRect();
            var area = document.getElementById('editTable');
            var areaRect = area.getBoundingClientRect();
            //計算(width,height,left,top)(編集エリアのwidth=1136)
            element.style.width=rect.width/1136*100+"%";
            element.style.height=rect.height/639*100+"%";
            element.style.top=(rect.top-areaRect.top)/639*100+"%";
            element.style.left=(rect.left-areaRect.left)/1136*100+"%";
            //フォントサイズ計算
            var fs = window.getComputedStyle(element).fontSize;
            var fsNum = parseFloat(fs);
            element.style.fontSize=fsNum*980/639+"px";
            //idとstyleを取得
            var id = element.id;
            var style = element.style.cssText;
            var text = element.value;
            // U+FE0F を省略する
            text = text.replace(/\uFE0F/g, ''); // U+FE0F を空文字に置換
            //テンプレ
            var templete = `<label id="${id}" style="${style}">${text}</label>
`;
            resultCode += templete;
            //計算された値を元に戻して終了
            element.style.width = rect.width + "px";
            element.style.height = rect.height + "px";
            element.style.top = rect.top + "px";
            element.style.left = rect.left + "px";
            element.style.fontSize = fs;
        };
    };
};



