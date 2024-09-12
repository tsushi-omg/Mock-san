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
        if(moveAble % 2 == 0){
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
                //元の背景色を保存
                var currentBG = window.getComputedStyle(element).backgroundColor;
                BGMap.set(element.id,currentBG);
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
    element.addEventListener('click', function(event) {
        if(event.ctrlKey){
            choiceMulti(element,bunrui);
        }else if(startChoice==false){
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
    element.addEventListener('click', function(event) {
        if(event.ctrlKey){
            choiceMulti(element,bunrui);
        }else if(startChoice==false){
        //元の背景色を保存
        var currentBG = window.getComputedStyle(element).backgroundColor;
        BGMap.set(element.id,currentBG);

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
        // //リンクのときフォーカス
        // if(bunrui=="リンク"){
        //     URLBox.focus();
        // }
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
                randomID(textarea);
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
                randomID(textarea);
            }
            //テキストエリア複製
            if(element.name=="textarea"){
                const editArea = document.getElementById("editArea");
                const textarea = document.createElement("input");
                textarea.type="text";
                textarea.name = "textarea";
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
                openSetting1(textarea,"テキストエリア");
                settingStyle(textarea,"テキストエリア");//スタイル設定画面
                randomID(textarea);
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
                randomID(textarea);
            }
            //コピーボタン複製
            if(element.name=="copy"){
                const editArea = document.getElementById("editArea");
                const textarea = document.createElement("input");
                textarea.type="input";
                textarea.name = "copy";
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
                openSetting1(textarea,"文字列コピーボタン");
                settingStyle(textarea,"文字列コピーボタン");//スタイル設定画面
                randomID(textarea);
                openSettingParts(textarea);
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
                randomID(textarea);
            }
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
    if(startChoice==false){
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
    }
    };
    });
};




//要素を引数に取り，ランダムなidを設定する関数
function randomID(element){
    var newID =(Math.random() * Math.random()).toString().replace("0.","").substring(0,5);
    element.id=newID;
    // if(document.getElementById(newID)){
    //     randomID(element);
    // };
};



//ctrl+クリックで要素を複数選択
var countChoice = 0;//選択数
var startChoice = false;//複数選択の開始。これがtrueのときは本来のクリックイベントが起こらないよう制御
let BGMap = new Map();
function choiceMulti(element,bunrui){

    //変数定義
    var settingForm  = document.getElementById('settingForm');
    var groupForm  = document.getElementById('groupForm');
    var URLForm  = document.getElementById('URLForm');
    var sampleForm  = document.getElementById('sampleForm');
    var backgroundForm  = document.getElementById('backgroundForm');
    var selectSettingForm  = document.getElementById('selectSettingForm');
    var sampleFormSelect  = document.getElementById('sampleFormSelect');
    var optionForm  = document.getElementById('optionForm');
    var functionForm  = document.getElementById('functionForm');
    var multiChoiceForm  = document.getElementById('multiChoiceForm');
    var multiChoiceTextForm  = document.getElementById('multiChoiceTextForm');
    var unChoiceButton  = document.getElementById('unChoiceButton');
    // var choiceCopyButton  = document.getElementById('choiceCopyButton');
    var choiceDeleteButton  = document.getElementById('choiceDeleteButton');
    var newTextSubmitButton = document.getElementById('newTextSubmitButton');
    var newTextBox = document.getElementById('newTextBox');
    // 非表示画面
    settingForm.hidden=true;
    groupForm.hidden=true;
    URLForm.hidden=true;
    sampleForm.hidden=true;
    backgroundForm.hidden=true;
    selectSettingForm.hidden=true;
    sampleFormSelect.hidden=true;
    optionForm.hidden=true;
    functionForm.hidden=true;
    newTextBox.value=""; 
    newTextBox.focus(); 
    // 画面展開
    multiChoiceForm.hidden=false;
    multiChoiceTextForm.hidden=false;
    //選択モード開始
    startChoice=true;
    // 条件分岐
    if(element.classList.contains('choiceOn')){//選択解除
        element.classList.remove('choiceOn');
        element.style.backgroundColor=BGMap.get(element.id) || "transparent";
        countChoice--;
        if(countChoice==0){
            multiChoiceForm.hidden=true;
            multiChoiceTextForm.hidden=true;
            startChoice=false;
        }
    }else{
        element.classList.add('choiceOn');//選択する
        element.style.backgroundColor="gray";
        countChoice++;
    };
    //選択解除イベント
    unChoiceButton.onclick=function(){
        let array = document.getElementsByClassName('choiceOn');
        for(var i = array.length-1; i >= 0; i--){
            array[i].style.backgroundColor=BGMap.get(array[i].id) || "transparent";
            array[i].classList.remove('choiceOn');
        }
        multiChoiceForm.hidden=true;
        multiChoiceTextForm.hidden=true;
        startChoice=false;
    };
    //削除ボタンイベント
    choiceDeleteButton.onclick=function(){
        let array = document.getElementsByClassName('choiceOn');
        for(var i = array.length-1; i >= 0; i--){
            array[i].remove();
        }
        multiChoiceForm.hidden=true;
        multiChoiceTextForm.hidden=true;
        startChoice=false;
    };
    //適用ボタンイベント
    newTextSubmitButton.onclick=function(){
        let array = document.getElementsByClassName('choiceOn');
        for(var i = array.length-1; i >= 0; i--){
            array[i].value=newTextBox.value;
            array[i].style.backgroundColor=BGMap.get(array[i].id) || "transparent";
            array[i].classList.remove('choiceOn');
        }
        multiChoiceForm.hidden=true;
        multiChoiceTextForm.hidden=true;
        startChoice=false;
    };
};









//グリッド線表示or非表示
var forGrid = 0;
function onOffGrid(){
    forGrid++;
    if(forGrid % 2 != 0){
        document.getElementById('editTableGrid').hidden=true;
    }else{
        document.getElementById('editTableGrid').hidden=false;   
    };
};


//移動制限
var moveAble = 0;
function noMovePosition(){
    moveAble++;
};









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



//テキストエリア要素作成 ok!

var countTextarea = 0;
function createElementTextarea(){
    //【共通】メニューを閉じる
    var menu = document.getElementById('selectMenuObj');
    menu.hidden=true;
    menuOpen=false;
    //要素作成
    if(countTextarea<30){
        const editArea = document.getElementById("editArea");
        const textbox = document.createElement("input");
        countTextarea ++;
        textbox.style="text";
        textbox.id = "textarea"+countTextarea;
        textbox.name = "textarea";
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
        if(countTextarea==30){
            var manuLabel = document.getElementById('manuTextareabox');
            manuLabel.disabled=true;
        };

        //マウスドラッグ関数を適用
        mouseDrag(textbox);
        areaCheck(textbox);
        openSetting1(textbox,"テキストエリア");
        settingStyle(textbox,"テキストエリア");//スタイル設定画面
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
    if(countRadio<4){
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
        if(countRadio==4){
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


//部品クリック
function createElementParts(){
    //【共通】メニューを閉じる
    var menu = document.getElementById('selectMenuObj');
    menu.hidden=true;
    menuOpen=false;
    //変数定義
    var form = document.getElementById('selectPartsForm');
    var close = document.getElementById('closePartsButton');
    var select = document.getElementById('partsSelect');
    var submit = document.getElementById('submitPartsButton');
    //初期表示
    form.hidden = false;
    select.value="";
    //×ボタン
    close.onclick=function(){
        form.hidden = true;
    };
    // 追加ボタン
    submit.onclick=function(){
        if(select.value=="文字列コピーボタン"){
            form.hidden = true;
            partsCopy();
        }else if(select.value=="タイマー"){
            form.hidden = true;
            document.getElementById('opTimer').disabled=true;
            partsTimer();
        }
    };
};



// コピーボタンパーツ作成
function partsCopy() {
    var area = document.getElementById('editArea'); // 'editArea'が存在するか確認
    
    // ボタン要素の作成
    var button = document.createElement('input');
    button.type = "text";
    button.value = "コピー";
    button.name = "copy";
    button.style.position = "absolute";
    button.style.left = mouseX;
    button.style.top = mouseY;
    button.style.width = "63px";
    button.style.border = "outset";
    button.style.backgroundColor = "transparent";
    button.style.zIndex = "7"; // zIndexを文字列として設定
    area.appendChild(button); // ボタンをエリアに追加
    button.style.left=mouseX +"px";
    button.style.top=mouseY+"px";
    mouseDrag(button);
    areaCheck(button);
    openSettingParts(button);
    openSetting1(button,"文字列コピーボタン");
    settingStyle(button,"文字列コピーボタン");
    randomID(button);

}



//コピーボタン部品クリックイベント
let copiedMap = new Map();
function openSettingParts(element){
    element.addEventListener('click',function(event){
        if(event.ctrlKey){
            choiceMulti(element,"文字列コピーボタン");
        }else if(startChoice==false){
            //変数定義
            var form = document.getElementById('settingCopyButtonForm');
            var close = document.getElementById('closeSettingCopyButton');
            var box = document.getElementById('copiedBox');
            var submit = document.getElementById('submitSettingCopyButton');
            //初期表示
            form.hidden=false;
            box.value=copiedMap.get(element.id) || "";
            mouseDrag(form);
            //×クリック
            close.onclick=function(){
                form.hidden=true;
            };
            //保存クリック
            submit.onclick=function(){
                if(box.value==""){
                    alert("コピー元要素のIDを入力してください。");
                }else if(!document.getElementById(box.value)){
                    alert("入力されたIDは存在しません。");
                }else{
                    copiedMap.set(element.id,box.value);
                    form.hidden=true;
                };
            };
        };
    });
};


//タイマー要素作成 
function partsTimer(){
    var menu = document.getElementById('selectMenuObj');
    menu.hidden=true;
    menuOpen=false;
    //要素作成
        const editArea = document.getElementById("editArea");
        const textbox = document.createElement("input");
        countTextbox ++;
        textbox.type="text"
        textbox.readOnly=true;
        textbox.value="00：00：00⌛";
        textbox.id = "timer";
        textbox.name = "timer";
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

        //マウスドラッグ関数を適用
        mouseDrag(textbox);
        areaCheck(textbox);
        openSetting1(textbox,"タイマー");
        settingStyle(textbox,"タイマー");//スタイル設定画面
        // autoFontSize(textbox);
};



//テンプレートを選択
function createElementTemplate(){
    //変数定義
    var selectTemplateForm = document.getElementById('selectTemplateForm');//１フォーム
    var checkTemplateForm = document.getElementById('checkTemplateForm');//２フォーム

    var closeTemplateButton = document.getElementById('closeTemplateButton');//１close
    var templateSelect = document.getElementById('templateSelect');//１select　submitTemplateButton
    var submitTemplateButton = document.getElementById('submitTemplateButton');//１適用

    var checkYesButton = document.getElementById('checkYesButton');//２　はい
    var checkNoButton = document.getElementById('checkNoButton');//２　いいえ

    //初期表示
    selectTemplateForm.hidden=false;
    document.getElementById('selectMenuObj').hidden=true;
    templateSelect.value="";
    //閉じるボタンクリック
    closeTemplateButton.onclick=function(){
        selectTemplateForm.hidden=true;
    };
    //適用ボタンクリック
    submitTemplateButton.onclick=function(){
        if(templateSelect.value==""){
            alert("テンプレートを選択してください。");
        }else{
            selectTemplateForm.hidden=true;
            checkTemplateForm.hidden=false;
        };
    };
    //いいえボタンクリック
    checkNoButton.onclick=function(){
        checkTemplateForm.hidden=true;
    };
    //はいクリック
    checkYesButton.onclick=function(){
        checkTemplateForm.hidden=true;
        deleteAll();
        if(templateSelect.value=="リンク集[A]"){
            createTMPLinkA();
        }else if(templateSelect.value=="リンク集[B]"){
            createTMPLinkB();
        }else if(templateSelect.value=="パスワード管理表"){
            createTMPPass();
        }
    };
}


//全要素削除
function deleteAll(){
    deleteLabel();
    deleteTextbox();
    deleteCommand();
    deleteLink();
    deleteRadio1();
    deleteRadio2();
    deleteRadio3();
    deleteRadio4();
    deleteSelect();
    deleteBG();
}

//ラベル削除
function deleteLabel(){
    let array = document.getElementsByName('label');
    for(var i = array.length - 1; i >= 0; i--){//後ろからループすることでインデックスのズレを回避
        array[i].remove();
    };
};

//テキストボックス削除
function deleteTextbox(){
    let array = document.getElementsByName('textbox');
    for(var i = array.length - 1; i >= 0; i--){
        array[i].remove();
    };
};

//コマンド削除
function deleteCommand(){
    let array = document.getElementsByName('command');
    for(var i = array.length - 1; i >= 0; i--){
        array[i].remove();
    };
};

//コマンド削除
function deleteLink(){
    let array = document.getElementsByName('link');
    for(var i = array.length - 1; i >= 0; i--){
        array[i].remove();
    };
};

//ラジオ削除
function deleteRadio1(){
    let array = document.getElementsByName('radio1');
    for(var i = array.length - 1; i >= 0; i--){
        array[i].remove();
    };
};

function deleteRadio2(){
    let array = document.getElementsByName('radio2');
    for(var i = array.length - 1; i >= 0; i--){
        array[i].remove();
    };
};

function deleteRadio3(){
    let array = document.getElementsByName('radio3');
    for(var i = array.length - 1; i >= 0; i--){
        array[i].remove();
    };
};

function deleteRadio4(){
    let array = document.getElementsByName('radio4');
    for(var i = array.length - 1; i >= 0; i--){
        array[i].remove();
    };
};

//セレクト削除
function deleteSelect(){
    let array = document.getElementsByName('select');
    for(var i = array.length - 1; i >= 0; i--){
        array[i].remove();
    };
};

//背景削除
function deleteBG(){
    let array = document.getElementsByName('BG');
    for(var i = array.length - 1; i >= 0; i--){
        array[i].remove();
    };
};





//パスワード管理表　テンプレ
function createTMPPass(){
    //作成場所
    const area = document.getElementById("editArea");
    //背景色
    // document.getElementById('editTable').style.backgroundColor="red";
    //生成
    //
    var element1 = document.createElement('input');
    element1.type="text";
    element1.name="label";
    element1.style.position="absolute";
    element1.style.backgroundColor="transparent";
    element1.style.top="150px";
    element1.style.left="90px";
    element1.style.fontSize="30px";
    element1.style.fontWeight="bold";
    element1.style.zIndex=7;
    element1.value="パスワード管理🔒";
    area.appendChild(element1);
    mouseDrag(element1);
    areaCheck(element1);
    openSetting1(element1,"ラベル");
    settingStyle(element1,"ラベル");
    //
    var element2 = document.createElement('input');
    element2.type="text";
    element2.name="label";
    element2.style.position="absolute";
    element2.style.backgroundColor="transparent";
    element2.style.top="160px";
    element2.style.left="450px";
    element2.style.width="37%";
    element2.style.color="red";
    element2.style.fontSize="20px";
    element2.style.zIndex=7;
    element2.value="※クリックして機能を追加してください。例，ボタンにパスワードを埋め込む";
    area.appendChild(element2);
    mouseDrag(element2);
    areaCheck(element2);
    openSetting1(element2,"ラベル");
    settingStyle(element2,"ラベル");
    //
    var element3 = document.createElement('input');
    element3.type="text";
    element3.name="label";
    element3.style.position="absolute";
    element3.style.backgroundColor="transparent";
    element3.style.top="250px";
    element3.style.left="140px";
    element3.style.fontSize="20px";
    element3.style.zIndex=7;
    element3.value="・NNNNNNNNNN";
    area.appendChild(element3);
    mouseDrag(element3);
    areaCheck(element3);
    openSetting1(element3,"ラベル");
    settingStyle(element3,"ラベル");
    //
    var element4 = document.createElement('input');
    element4.type="text";
    element4.name="command";
    element4.id="tmp1";
    element4.style.position="absolute";
    element4.style.backgroundColor="transparent";
    element4.style.top="250px";
    element4.style.left="450px";
    element4.style.width="35px";
    element4.style.fontSize="20px";
    // element4.style.border="outset";
    element4.style.zIndex=7;
    element4.value="ID";
    area.appendChild(element4);
    mouseDrag(element4);
    areaCheck(element4);
    openSetting1(element4,"コマンドボタン");
    settingStyle(element4,"コマンドボタン");
    //
    var element5 = document.createElement('input');
    element5.type="text";
    element5.name="command";
    element5.id="tmp2";
    element5.style.position="absolute";
    element5.style.backgroundColor="transparent";
    element5.style.top="250px";
    element5.style.left="520px";
    element5.style.width="55px";
    element5.style.fontSize="20px";
    // element5.style.border="outset";
    element5.style.zIndex=7;
    element5.value="PASS";
    area.appendChild(element5);
    mouseDrag(element5);
    areaCheck(element5);
    openSetting1(element5,"コマンドボタン");
    settingStyle(element5,"コマンドボタン");
    //
    //
    var element6 = document.createElement('input');
    element6.type="text";
    element6.name="label";
    element6.style.position="absolute";
    element6.style.backgroundColor="transparent";
    element6.style.top="300px";
    element6.style.left="140px";
    element6.style.fontSize="20px";
    element6.style.zIndex=7;
    element6.value="・NNNNNNNNNN";
    area.appendChild(element6);
    mouseDrag(element6);
    areaCheck(element6);
    openSetting1(element6,"ラベル");
    settingStyle(element6,"ラベル");
    //
    var element7 = document.createElement('input');
    element7.type="text";
    element7.name="command";
    element7.id="tmp3";
    element7.style.position="absolute";
    element7.style.backgroundColor="transparent";
    element7.style.top="300px";
    element7.style.left="450px";
    element7.style.width="35px";
    element7.style.fontSize="20px";
    // element7.style.border="outset";
    element7.style.zIndex=7;
    element7.value="ID";
    area.appendChild(element7);
    mouseDrag(element7);
    areaCheck(element7);
    openSetting1(element7,"コマンドボタン");
    settingStyle(element7,"コマンドボタン");
    //
    var element8 = document.createElement('input');
    element8.type="text";
    element8.name="command";
    element8.id="tmp4";
    element8.style.position="absolute";
    element8.style.backgroundColor="transparent";
    element8.style.top="300px";
    element8.style.left="520px";
    element8.style.width="55px";
    element8.style.fontSize="20px";
    // element8.style.border="outset";
    element8.style.zIndex=7;
    element8.value="PASS";
    area.appendChild(element8);
    mouseDrag(element8);
    areaCheck(element8);
    openSetting1(element8,"コマンドボタン");
    settingStyle(element8,"コマンドボタン");
    //
    //
    //
    var element9 = document.createElement('input');
    element9.type="text";
    element9.name="label";
    element9.style.position="absolute";
    element9.style.backgroundColor="transparent";
    element9.style.top="350px";
    element9.style.left="140px";
    element9.style.fontSize="20px";
    element9.style.zIndex=7;
    element9.value="・NNNNNNNNNN";
    area.appendChild(element9);
    mouseDrag(element9);
    areaCheck(element9);
    openSetting1(element9,"ラベル");
    settingStyle(element9,"ラベル");
    //
    var element10 = document.createElement('input');
    element10.type="text";
    element10.name="command";
    element10.id="tmp5";
    element10.style.position="absolute";
    element10.style.backgroundColor="transparent";
    element10.style.top="350px";
    element10.style.left="450px";
    element10.style.width="35px";
    element10.style.fontSize="20px";
    // element10.style.border="outset";
    element10.style.zIndex=7;
    element10.value="ID";
    area.appendChild(element10);
    mouseDrag(element10);
    areaCheck(element10);
    openSetting1(element10,"コマンドボタン");
    settingStyle(element10,"コマンドボタン");
    //
    var element11 = document.createElement('input');
    element11.type="text";
    element11.name="command";
    element11.id="tmp6";
    element11.style.position="absolute";
    element11.style.backgroundColor="transparent";
    element11.style.top="350px";
    element11.style.left="520px";
    element11.style.width="55px";
    element11.style.fontSize="20px";
    // element11.style.border="outset";
    element11.style.zIndex=7;
    element11.value="PASS";
    area.appendChild(element11);
    mouseDrag(element11);
    areaCheck(element11);
    openSetting1(element11,"コマンドボタン");
    settingStyle(element11,"コマンドボタン");
    //
    //
    //
    var element12 = document.createElement('input');
    element12.type = "text";
    element12.name = "label";
    element12.style.position = "absolute";
    element12.style.backgroundColor = "transparent";
    element12.style.top = "400px";
    element12.style.left = "140px";
    element12.style.fontSize = "20px";
    element12.style.zIndex = 7;
    element12.value = "・NNNNNNNNNN";
    area.appendChild(element12);
    mouseDrag(element12);
    areaCheck(element12);
    openSetting1(element12, "ラベル");
    settingStyle(element12, "ラベル");

    var element13 = document.createElement('input');
    element13.type = "text";
    element13.name = "command";
    element13.id = "tmp7";
    element13.style.position = "absolute";
    element13.style.backgroundColor = "transparent";
    element13.style.top = "400px";
    element13.style.left = "450px";
    element13.style.width = "35px";
    element13.style.fontSize = "20px";
    element13.style.zIndex = 7;
    element13.value = "ID";
    area.appendChild(element13);
    mouseDrag(element13);
    areaCheck(element13);
    openSetting1(element13, "コマンドボタン");
    settingStyle(element13, "コマンドボタン");

    var element14 = document.createElement('input');
    element14.type = "text";
    element14.name = "command";
    element14.id = "tmp8";
    element14.style.position = "absolute";
    element14.style.backgroundColor = "transparent";
    element14.style.top = "400px";
    element14.style.left = "520px";
    element14.style.width = "55px";
    element14.style.fontSize = "20px";
    element14.style.zIndex = 7;
    element14.value = "PASS";
    area.appendChild(element14);
    mouseDrag(element14);
    areaCheck(element14);
    openSetting1(element14, "コマンドボタン");
    settingStyle(element14, "コマンドボタン");

    //
    var element15 = document.createElement('input');
    element15.type = "text";
    element15.name = "label";
    element15.style.position = "absolute";
    element15.style.backgroundColor = "transparent";
    element15.style.top = "450px";
    element15.style.left = "140px";
    element15.style.fontSize = "20px";
    element15.style.zIndex = 7;
    element15.value = "・NNNNNNNNNN";
    area.appendChild(element15);
    mouseDrag(element15);
    areaCheck(element15);
    openSetting1(element15, "ラベル");
    settingStyle(element15, "ラベル");

    var element16 = document.createElement('input');
    element16.type = "text";
    element16.name = "command";
    element16.id = "tmp9";
    element16.style.position = "absolute";
    element16.style.backgroundColor = "transparent";
    element16.style.top = "450px";
    element16.style.left = "450px";
    element16.style.width = "35px";
    element16.style.fontSize = "20px";
    element16.style.zIndex = 7;
    element16.value = "ID";
    area.appendChild(element16);
    mouseDrag(element16);
    areaCheck(element16);
    openSetting1(element16, "コマンドボタン");
    settingStyle(element16, "コマンドボタン");

    var element17 = document.createElement('input');
    element17.type = "text";
    element17.name = "command";
    element17.id = "tmp10";
    element17.style.position = "absolute";
    element17.style.backgroundColor = "transparent";
    element17.style.top = "450px";
    element17.style.left = "520px";
    element17.style.width = "55px";
    element17.style.fontSize = "20px";
    element17.style.zIndex = 7;
    element17.value = "PASS";
    area.appendChild(element17);
    mouseDrag(element17);
    areaCheck(element17);
    openSetting1(element17, "コマンドボタン");
    settingStyle(element17, "コマンドボタン");

    //
    var element18 = document.createElement('input');
    element18.type = "text";
    element18.name = "label";
    element18.style.position = "absolute";
    element18.style.backgroundColor = "transparent";
    element18.style.top = "500px";
    element18.style.left = "140px";
    element18.style.fontSize = "20px";
    element18.style.zIndex = 7;
    element18.value = "・NNNNNNNNNN";
    area.appendChild(element18);
    mouseDrag(element18);
    areaCheck(element18);
    openSetting1(element18, "ラベル");
    settingStyle(element18, "ラベル");

    var element19 = document.createElement('input');
    element19.type = "text";
    element19.name = "command";
    element19.id = "tmp11";
    element19.style.position = "absolute";
    element19.style.backgroundColor = "transparent";
    element19.style.top = "500px";
    element19.style.left = "450px";
    element19.style.width = "35px";
    element19.style.fontSize = "20px";
    element19.style.zIndex = 7;
    element19.value = "ID";
    area.appendChild(element19);
    mouseDrag(element19);
    areaCheck(element19);
    openSetting1(element19, "コマンドボタン");
    settingStyle(element19, "コマンドボタン");

    var element20 = document.createElement('input');
    element20.type = "text";
    element20.name = "command";
    element20.id = "tmp12";
    element20.style.position = "absolute";
    element20.style.backgroundColor = "transparent";
    element20.style.top = "500px";
    element20.style.left = "520px";
    element20.style.width = "55px";
    element20.style.fontSize = "20px";
    element20.style.zIndex = 7;
    element20.value = "PASS";
    area.appendChild(element20);
    mouseDrag(element20);
    areaCheck(element20);
    openSetting1(element20, "コマンドボタン");
    settingStyle(element20, "コマンドボタン");

    // element4 (ID)
element4.style.border = "outset";
element4.style.borderColor = "white";

// element5 (PASS)
element5.style.border = "outset";
element5.style.borderColor = "white";

// element7 (ID)
element7.style.border = "outset";
element7.style.borderColor = "white";

// element8 (PASS)
element8.style.border = "outset";
element8.style.borderColor = "white";

// element10 (ID)
element10.style.border = "outset";
element10.style.borderColor = "white";

// element11 (PASS)
element11.style.border = "outset";
element11.style.borderColor = "white";

// element13 (ID)
element13.style.border = "outset";
element13.style.borderColor = "white";

// element14 (PASS)
element14.style.border = "outset";
element14.style.borderColor = "white";

// element16 (ID)
element16.style.border = "outset";
element16.style.borderColor = "white";

// element17 (PASS)
element17.style.border = "outset";
element17.style.borderColor = "white";

// element19 (ID)
element19.style.border = "outset";
element19.style.borderColor = "white";

// element20 (PASS)
element20.style.border = "outset";
element20.style.borderColor = "white";

}



//リンク集A　テンプレ  +"2"
function createTMPLinkA(){
    //作成場所
    const area = document.getElementById("editArea");
    //生成
    //
    var element12 = document.createElement('input');
    element12.type="text";
    element12.name="label";
    element12.style.position="absolute";
    element12.style.backgroundColor="transparent";
    element12.style.top="150px";
    element12.style.left="90px";
    element12.style.fontSize="30px";
    element12.style.zIndex=7;
    element12.style.fontWeight="bold";
    element12.value="リンク集📋";
    area.appendChild(element12);
    mouseDrag(element12);
    areaCheck(element12);
    openSetting1(element12,"ラベル");
    settingStyle(element12,"ラベル");
    //
    var element22 = document.createElement('input');
    element22.type="text";
    element22.name="label";
    element22.style.position="absolute";
    element22.style.backgroundColor="transparent";
    element22.style.top="160px";
    element22.style.left="450px";
    element22.style.width="30%";
    element22.style.color="red";
    element22.style.fontSize="20px";
    element22.style.zIndex=7;
    element22.value="※クリックしてURLを埋め込んでください";
    area.appendChild(element22);
    mouseDrag(element22);
    areaCheck(element22);
    openSetting1(element22,"ラベル");
    settingStyle(element22,"ラベル");
    //
    var element32 = document.createElement('input');
    element32.type="text";
    element32.name="label";
    element32.style.position="absolute";
    element32.style.backgroundColor="transparent";
    element32.style.top="250px";
    element32.style.left="140px";
    element32.style.fontSize="20px";
    element32.style.zIndex=7;
    element32.style.fontWeight="bold";
    element32.value="分類１";
    area.appendChild(element32);
    mouseDrag(element32);
    areaCheck(element32);
    openSetting1(element32,"ラベル");
    settingStyle(element32,"ラベル");
    //
    //
    //
    var element32 = document.createElement('input');
    element32.type="text";
    element32.name="label";
    element32.style.position="absolute";
    element32.style.backgroundColor="transparent";
    element32.style.top="250px";
    element32.style.left="500px";
    element32.style.fontSize="20px";
    element32.style.zIndex=7;
    element32.style.fontWeight="bold";
    element32.value="分類２";
    area.appendChild(element32);
    mouseDrag(element32);
    areaCheck(element32);
    openSetting1(element32,"ラベル");
    settingStyle(element32,"ラベル");
    //
    var element52 = document.createElement('input');
    element52.type="text";
    element52.name="link";
    element52.id="tmp12";
    element52.style.position="absolute";
    element52.style.backgroundColor="transparent";
    element52.style.top="300px";
    element52.style.left="140px";
    element52.style.fontSize="20px";
    element52.style.zIndex=7;
    element52.style.color="blue";
    element52.style.textDecoration="underline";
    element52.value="NNNNNNNNNN";
    area.appendChild(element52);
    mouseDrag(element52);
    areaCheck(element52);
    openSetting1(element52,"リンク");
    settingStyle(element52,"リンク");
    //
    //
    var element62 = document.createElement('input');
    element62.type="text";
    element62.name="link";
    element62.id="tmp22";
    element62.style.position="absolute";
    element62.style.backgroundColor="transparent";
    element62.style.top="300px";
    element62.style.left="500px";
    element62.style.fontSize="20px";
    element62.style.zIndex=7;
    element62.style.color="blue";
    element62.style.textDecoration="underline";
    element62.value="NNNNNNNNNN";
    area.appendChild(element62);
    mouseDrag(element62);
    areaCheck(element62);
    openSetting1(element62,"リンク");
    settingStyle(element62,"リンク");
    //
    //
    //
    var element72 = document.createElement('input');
    element72.type="text";
    element72.name="link";
    element72.id="tmp32";
    element72.style.position="absolute";
    element72.style.backgroundColor="transparent";
    element72.style.top="350px";
    element72.style.left="140px";
    element72.style.fontSize="20px";
    element72.style.zIndex=7;
    element72.style.color="blue";
    element72.style.textDecoration="underline";
    element72.value="NNNNNNNNNN";
    area.appendChild(element72);
    mouseDrag(element72);
    areaCheck(element72);
    openSetting1(element72,"リンク");
    settingStyle(element72,"リンク");
    //
    var element82 = document.createElement('input');
    element82.type="text";
    element82.name="link";
    element82.id="tmp42";
    element82.style.position="absolute";
    element82.style.backgroundColor="transparent";
    element82.style.top="350px";
    element82.style.left="500px";
    element82.style.fontSize="20px";
    element82.style.zIndex=7;
    element82.style.color="blue";
    element82.style.textDecoration="underline";
    element82.value="NNNNNNNNNN";
    area.appendChild(element82);
    mouseDrag(element82);
    areaCheck(element82);
    openSetting1(element82,"リンク");
    settingStyle(element82,"リンク");
    //
    // 追加列 1
    var element92 = document.createElement('input');
    element92.type = "text";
    element92.name = "link";
    element92.id = "tmp52";
    element92.style.position = "absolute";
    element92.style.backgroundColor = "transparent";
    element92.style.top = "400px";
    element92.style.left = "140px";
    element92.style.fontSize = "20px";
    element92.style.zIndex = 7;
    element92.style.color = "blue";
    element92.style.textDecoration = "underline";
    element92.value = "NNNNNNNNNN";
    area.appendChild(element92);
    mouseDrag(element92);
    areaCheck(element92);
    openSetting1(element92, "リンク");
    settingStyle(element92, "リンク");

    var element102 = document.createElement('input');
    element102.type = "text";
    element102.name = "link";
    element102.id = "tmp62";
    element102.style.position = "absolute";
    element102.style.backgroundColor = "transparent";
    element102.style.top = "400px";
    element102.style.left = "500px";
    element102.style.fontSize = "20px";
    element102.style.zIndex = 7;
    element102.style.color = "blue";
    element102.style.textDecoration = "underline";
    element102.value = "NNNNNNNNNN";
    area.appendChild(element102);
    mouseDrag(element102);
    areaCheck(element102);
    openSetting1(element102, "リンク");
    settingStyle(element102, "リンク");

    // 追加列 2
    var element112 = document.createElement('input');
    element112.type = "text";
    element112.name = "link";
    element112.id = "tmp72";
    element112.style.position = "absolute";
    element112.style.backgroundColor = "transparent";
    element112.style.top = "450px";
    element112.style.left = "140px";
    element112.style.fontSize = "20px";
    element112.style.zIndex = 7;
    element112.style.color = "blue";
    element112.style.textDecoration = "underline";
    element112.value = "NNNNNNNNNN";
    area.appendChild(element112);
    mouseDrag(element112);
    areaCheck(element112);
    openSetting1(element112, "リンク");
    settingStyle(element112, "リンク");

    var element122 = document.createElement('input');
    element122.type = "text";
    element122.name = "link";
    element122.id = "tmp82";
    element122.style.position = "absolute";
    element122.style.backgroundColor = "transparent";
    element122.style.top = "450px";
    element122.style.left = "500px";
    element122.style.fontSize = "20px";
    element122.style.zIndex = 7;
    element122.style.color = "blue";
    element122.style.textDecoration = "underline";
    element122.value = "NNNNNNNNNN";
    area.appendChild(element122);
    mouseDrag(element122);
    areaCheck(element122);
    openSetting1(element122, "リンク");
    settingStyle(element122, "リンク");

    // 追加列 3
    var element132 = document.createElement('input');
    element132.type = "text";
    element132.name = "link";
    element132.id = "tmp92";
    element132.style.position = "absolute";
    element132.style.backgroundColor = "transparent";
    element132.style.top = "500px";
    element132.style.left = "140px";
    element132.style.fontSize = "20px";
    element132.style.zIndex = 7;
    element132.style.color = "blue";
    element132.style.textDecoration = "underline";
    element132.value = "NNNNNNNNNN";
    area.appendChild(element132);
    mouseDrag(element132);
    areaCheck(element132);
    openSetting1(element132, "リンク");
    settingStyle(element132, "リンク");

    var element142 = document.createElement('input');
    element142.type = "text";
    element142.name = "link";
    element142.id = "tmp102";
    element142.style.position = "absolute";
    element142.style.backgroundColor = "transparent";
    element142.style.top = "500px";
    element142.style.left = "500px";
    element142.style.fontSize = "20px";
    element142.style.zIndex = 7;
    element142.style.color = "blue";
    element142.style.textDecoration = "underline";
    element142.value = "NNNNNNNNNN";
    area.appendChild(element142);
    mouseDrag(element142);
    areaCheck(element142);
    openSetting1(element142, "リンク");
    settingStyle(element142, "リンク");

    // 追加列 4
    var element152 = document.createElement('input');
    element152.type = "text";
    element152.name = "link";
    element152.id = "tmp112";
    element152.style.position = "absolute";
    element152.style.backgroundColor = "transparent";
    element152.style.top = "550px";
    element152.style.left = "140px";
    element152.style.fontSize = "20px";
    element152.style.zIndex = 7;
    element152.style.color = "blue";
    element152.style.textDecoration = "underline";
    element152.value = "NNNNNNNNNN";
    area.appendChild(element152);
    mouseDrag(element152);
    areaCheck(element152);
    openSetting1(element152, "リンク");
    settingStyle(element152, "リンク");

    var element162 = document.createElement('input');
    element162.type = "text";
    element162.name = "link";
    element162.id = "tmp122";
    element162.style.position = "absolute";
    element162.style.backgroundColor = "transparent";
    element162.style.top = "550px";
    element162.style.left = "500px";
    element162.style.fontSize = "20px";
    element162.style.zIndex = 7;
    element162.style.color = "blue";
    element162.style.textDecoration = "underline";
    element162.value = "NNNNNNNNNN";
    area.appendChild(element162);
    mouseDrag(element162);
    areaCheck(element162);
    openSetting1(element162, "リンク");
    settingStyle(element162, "リンク");

    // 追加列 5
    var element172 = document.createElement('input');
    element172.type = "text";
    element172.name = "link";
    element172.id = "tmp132";
    element172.style.position = "absolute";
    element172.style.backgroundColor = "transparent";
    element172.style.top = "600px";
    element172.style.left = "140px";
    element172.style.fontSize = "20px";
    element172.style.zIndex = 7;
    element172.style.color = "blue";
    element172.style.textDecoration = "underline";
    element172.value = "NNNNNNNNNN";
    area.appendChild(element172);
    mouseDrag(element172);
    areaCheck(element172);
    openSetting1(element172, "リンク");
    settingStyle(element172, "リンク");

    var element182 = document.createElement('input');
    element182.type = "text";
    element182.name = "link";
    element182.id = "tmp142";
    element182.style.position = "absolute";
    element182.style.backgroundColor = "transparent";
    element182.style.top = "600px";
    element182.style.left = "500px";
    element182.style.fontSize = "20px";
    element182.style.zIndex = 7;
    element182.style.color = "blue";
    element182.style.textDecoration = "underline";
    element182.value = "NNNNNNNNNN";
    area.appendChild(element182);
    mouseDrag(element182);
    areaCheck(element182);
    openSetting1(element182, "リンク");
    settingStyle(element182, "リンク");

    // 追加列 6
    var element192 = document.createElement('input');
    element192.type = "text";
    element192.name = "link";
    element192.id = "tmp152";
    element192.style.position = "absolute";
    element192.style.backgroundColor = "transparent";
    element192.style.top = "650px";
    element192.style.left = "140px";
    element192.style.fontSize = "20px";
    element192.style.zIndex = 7;
    element192.style.color = "blue";
    element192.style.textDecoration = "underline";
    element192.value = "NNNNNNNNNN";
    area.appendChild(element192);
    mouseDrag(element192);
    areaCheck(element192);
    openSetting1(element192, "リンク");
    settingStyle(element192, "リンク");

    var element202 = document.createElement('input');
    element202.type = "text";
    element202.name = "link";
    element202.id = "tmp162";
    element202.style.position = "absolute";
    element202.style.backgroundColor = "transparent";
    element202.style.top = "650px";
    element202.style.left = "500px";
    element202.style.fontSize = "20px";
    element202.style.zIndex = 7;
    element202.style.color = "blue";
    element202.style.textDecoration = "underline";
    element202.value = "NNNNNNNNNN";
    area.appendChild(element202);
    mouseDrag(element202);
    areaCheck(element202);
    openSetting1(element202, "リンク");
    settingStyle(element202, "リンク");
}




//リンク集B
function createTMPLinkB(){
    //作成場所
    const area = document.getElementById("editArea");
    //生成
    //
    var element1b = document.createElement('input');
    element1b.type="text";
    element1b.name="label";
    element1b.style.position="absolute";
    element1b.style.backgroundColor="transparent";
    element1b.style.top="150px";
    element1b.style.left="90px";
    element1b.style.fontSize="20px";
    element1b.style.zIndex=7;
    element1b.style.fontWeight="bold";
    element1b.value="リンク集📋";
    area.appendChild(element1b);
    mouseDrag(element1b);
    areaCheck(element1b);
    openSetting1(element1b,"ラベル");
    settingStyle(element1b,"ラベル");
//
var element2b = document.createElement('input');
element2b.type="text";
element2b.name="label";
element2b.style.position="absolute";
element2b.style.backgroundColor="transparent";
element2b.style.top="150px";
element2b.style.left="450px";
element2b.style.width="30%";
element2b.style.color="red";
element2b.style.fontSize="15px";
element2b.style.zIndex=7;
element2b.value="※クリックしてURLを埋め込んでください";
area.appendChild(element2b);
mouseDrag(element2b);
areaCheck(element2b);
openSetting1(element2b,"ラベル");
settingStyle(element2b,"ラベル");
//
//1列目
var element3b = document.createElement('input');
element3b.type="text";
element3b.name="label";
element3b.style.position="absolute";
element3b.style.backgroundColor="transparent";
element3b.style.top="200px";
element3b.style.left="110px";
element3b.style.fontSize="15px";
element3b.style.zIndex=7;
element3b.style.fontWeight="bold";
element3b.value="分類１";
area.appendChild(element3b);
mouseDrag(element3b);
areaCheck(element3b);
openSetting1(element3b,"ラベル");
settingStyle(element3b,"ラベル");
//
//
var element4b = document.createElement('input');
element4b.type="text";
element4b.name="link";
element4b.style.position="absolute";
element4b.style.backgroundColor="transparent";
element4b.style.top="200px";
element4b.style.left="300px";
element4b.style.fontSize="15px";
element4b.style.zIndex=7;
element4b.style.color="blue";
element4b.style.textDecoration="underline";
element4b.value="NNNNNNNNNN";
element4b.autocomplete="off";
area.appendChild(element4b);
mouseDrag(element4b);
areaCheck(element4b);
openSetting1(element4b,"リンク");
settingStyle(element4b,"リンク");
randomID(element4b);
//
//
var element5b = document.createElement('input');
element5b.type="text";
element5b.name="link";
element5b.style.position="absolute";
element5b.style.backgroundColor="transparent";
element5b.style.top="200px";
element5b.style.left="480px";
element5b.style.fontSize="15px";
element5b.style.zIndex=7;
element5b.style.color="blue";
element5b.style.textDecoration="underline";
element5b.value="NNNNNNNNNN";
element5b.autocomplete="off";
area.appendChild(element5b);
mouseDrag(element5b);
areaCheck(element5b);
openSetting1(element5b,"リンク");
settingStyle(element5b,"リンク");
randomID(element5b);
//
//
//
var element6b = document.createElement('input');
element6b.type="text";
element6b.name="link";
element6b.style.position="absolute";
element6b.style.backgroundColor="transparent";
element6b.style.top="200px";
element6b.style.left="660px";
element6b.style.fontSize="15px";
element6b.style.zIndex=7;
element6b.style.color="blue";
element6b.style.textDecoration="underline";
element6b.value="NNNNNNNNNN";
element6b.autocomplete="off";
area.appendChild(element6b);
mouseDrag(element6b);
areaCheck(element6b);
openSetting1(element6b,"リンク");
settingStyle(element6b,"リンク");
randomID(element6b);
//
//
//
var element7b = document.createElement('input');
element7b.type="text";
element7b.name="link";
element7b.style.position="absolute";
element7b.style.backgroundColor="transparent";
element7b.style.top="200px";
element7b.style.left="840px";
element7b.style.fontSize="15px";
element7b.style.zIndex=7;
element7b.style.color="blue";
element7b.style.textDecoration="underline";
element7b.value="NNNNNNNNNN";
element7b.autocomplete="off";
area.appendChild(element7b);
mouseDrag(element7b);
areaCheck(element7b);
openSetting1(element7b,"リンク");
settingStyle(element7b,"リンク");
randomID(element7b);
//
//
var element8b = document.createElement('input');
element8b.type="text";
element8b.name="link";
element8b.style.position="absolute";
element8b.style.backgroundColor="transparent";
element8b.style.top="200px";
element8b.style.left="1020px";
element8b.style.fontSize="15px";
element8b.style.zIndex=7;
element8b.style.color="blue";
element8b.style.textDecoration="underline";
element8b.value="NNNNNNNNNN";
element8b.autocomplete="off";
area.appendChild(element8b);
mouseDrag(element8b);
areaCheck(element8b);
openSetting1(element8b,"リンク");
settingStyle(element8b,"リンク");
randomID(element8b);
//
//2列目
//
var element9b = document.createElement('input');
element9b.type="text";
element9b.name="label";
element9b.style.position="absolute";
element9b.style.backgroundColor="transparent";
element9b.style.top="230px";
element9b.style.left="110px";
element9b.style.fontSize="15px";
element9b.style.zIndex=7;
element9b.style.fontWeight="bold";
element9b.value="分類２";
area.appendChild(element9b);
mouseDrag(element9b);
areaCheck(element9b);
openSetting1(element9b,"ラベル");
settingStyle(element9b,"ラベル");
//
//
var element10b = document.createElement('input');
element10b.type="text";
element10b.name="link";
element10b.style.position="absolute";
element10b.style.backgroundColor="transparent";
element10b.style.top="230px";
element10b.style.left="300px";
element10b.style.fontSize="15px";
element10b.style.zIndex=7;
element10b.style.color="blue";
element10b.style.textDecoration="underline";
element10b.value="NNNNNNNNNN";
element10b.autocomplete="off";
area.appendChild(element10b);
mouseDrag(element10b);
areaCheck(element10b);
openSetting1(element10b,"リンク");
settingStyle(element10b,"リンク");
randomID(element10b);
//
//
var element11b = document.createElement('input');
element11b.type="text";
element11b.name="link";
element11b.style.position="absolute";
element11b.style.backgroundColor="transparent";
element11b.style.top="230px";
element11b.style.left="480px";
element11b.style.fontSize="15px";
element11b.style.zIndex=7;
element11b.style.color="blue";
element11b.style.textDecoration="underline";
element11b.value="NNNNNNNNNN";
element11b.autocomplete="off";
area.appendChild(element11b);
mouseDrag(element11b);
areaCheck(element11b);
openSetting1(element11b,"リンク");
settingStyle(element11b,"リンク");
randomID(element11b);
//
//
//
var element12b = document.createElement('input');
element12b.type="text";
element12b.name="link";
element12b.style.position="absolute";
element12b.style.backgroundColor="transparent";
element12b.style.top="230px";
element12b.style.left="660px";
element12b.style.fontSize="15px";
element12b.style.zIndex=7;
element12b.style.color="blue";
element12b.style.textDecoration="underline";
element12b.value="NNNNNNNNNN";
element12b.autocomplete="off";
area.appendChild(element12b);
mouseDrag(element12b);
areaCheck(element12b);
openSetting1(element12b,"リンク");
settingStyle(element12b,"リンク");
randomID(element12b);
//
//
//
var element13b = document.createElement('input');
element13b.type="text";
element13b.name="link";
element13b.style.position="absolute";
element13b.style.backgroundColor="transparent";
element13b.style.top="230px";
element13b.style.left="840px";
element13b.style.fontSize="15px";
element13b.style.zIndex=7;
element13b.style.color="blue";
element13b.style.textDecoration="underline";
element13b.value="NNNNNNNNNN";
element13b.autocomplete="off";
area.appendChild(element13b);
mouseDrag(element13b);
areaCheck(element13b);
openSetting1(element13b,"リンク");
settingStyle(element13b,"リンク");
randomID(element13b);
//
//
var element14b = document.createElement('input');
element14b.type="text";
element14b.name="link";
element14b.style.position="absolute";
element14b.style.backgroundColor="transparent";
element14b.style.top="230px";
element14b.style.left="1020px";
element14b.style.fontSize="15px";
element14b.style.zIndex=7;
element14b.style.color="blue";
element14b.style.textDecoration="underline";
element14b.value="NNNNNNNNNN";
element14b.autocomplete="off";
area.appendChild(element14b);
mouseDrag(element14b);
areaCheck(element14b);
openSetting1(element14b,"リンク");
settingStyle(element14b,"リンク");
randomID(element14b);
//
//

//3列目
var element15b = document.createElement('input');
element15b.type="text";
element15b.name="label";
element15b.style.position="absolute";
element15b.style.backgroundColor="transparent";
element15b.style.top="260px";
element15b.style.left="110px";
element15b.style.fontSize="15px";
element15b.style.zIndex=7;
element15b.style.fontWeight="bold";
element15b.value="分類３";
area.appendChild(element15b);
mouseDrag(element15b);
areaCheck(element15b);
openSetting1(element15b,"ラベル");
settingStyle(element15b,"ラベル");
//
//
var element16b = document.createElement('input');
element16b.type="text";
element16b.name="link";
element16b.style.position="absolute";
element16b.style.backgroundColor="transparent";
element16b.style.top="260px";
element16b.style.left="300px";
element16b.style.fontSize="15px";
element16b.style.zIndex=7;
element16b.style.color="blue";
element16b.style.textDecoration="underline";
element16b.value="NNNNNNNNNN";
element16b.autocomplete="off";
area.appendChild(element16b);
mouseDrag(element16b);
areaCheck(element16b);
openSetting1(element16b,"リンク");
settingStyle(element16b,"リンク");
randomID(element16b);
//
//
var element17b = document.createElement('input');
element17b.type="text";
element17b.name="link";
element17b.style.position="absolute";
element17b.style.backgroundColor="transparent";
element17b.style.top="260px";
element17b.style.left="480px";
element17b.style.fontSize="15px";
element17b.style.zIndex=7;
element17b.style.color="blue";
element17b.style.textDecoration="underline";
element17b.value="NNNNNNNNNN";
element17b.autocomplete="off";
area.appendChild(element17b);
mouseDrag(element17b);
areaCheck(element17b);
openSetting1(element17b,"リンク");
settingStyle(element17b,"リンク");
randomID(element17b);
//
//
var element18b = document.createElement('input');
element18b.type="text";
element18b.name="link";
element18b.style.position="absolute";
element18b.style.backgroundColor="transparent";
element18b.style.top="260px";
element18b.style.left="660px";
element18b.style.fontSize="15px";
element18b.style.zIndex=7;
element18b.style.color="blue";
element18b.style.textDecoration="underline";
element18b.value="NNNNNNNNNN";
element18b.autocomplete="off";
area.appendChild(element18b);
mouseDrag(element18b);
areaCheck(element18b);
openSetting1(element18b,"リンク");
settingStyle(element18b,"リンク");
randomID(element18b);
//
//
var element19b = document.createElement('input');
element19b.type="text";
element19b.name="link";
element19b.style.position="absolute";
element19b.style.backgroundColor="transparent";
element19b.style.top="260px";
element19b.style.left="840px";
element19b.style.fontSize="15px";
element19b.style.zIndex=7;
element19b.style.color="blue";
element19b.style.textDecoration="underline";
element19b.value="NNNNNNNNNN";
element19b.autocomplete="off";
area.appendChild(element19b);
mouseDrag(element19b);
areaCheck(element19b);
openSetting1(element19b,"リンク");
settingStyle(element19b,"リンク");
randomID(element19b);
//
//
var element20b = document.createElement('input');
element20b.type="text";
element20b.name="link";
element20b.style.position="absolute";
element20b.style.backgroundColor="transparent";
element20b.style.top="260px";
element20b.style.left="1020px";
element20b.style.fontSize="15px";
element20b.style.zIndex=7;
element20b.style.color="blue";
element20b.style.textDecoration="underline";
element20b.value="NNNNNNNNNN";
element20b.autocomplete="off";
area.appendChild(element20b);
mouseDrag(element20b);
areaCheck(element20b);
openSetting1(element20b,"リンク");
settingStyle(element20b,"リンク");
randomID(element20b);
//
//4列目
//
var element21b = document.createElement('input');
element21b.type="text";
element21b.name="label";
element21b.style.position="absolute";
element21b.style.backgroundColor="transparent";
element21b.style.top="290px";
element21b.style.left="110px";
element21b.style.fontSize="15px";
element21b.style.zIndex=7;
element21b.style.fontWeight="bold";
element21b.value="分類４";
area.appendChild(element21b);
mouseDrag(element21b);
areaCheck(element21b);
openSetting1(element21b,"ラベル");
settingStyle(element21b,"ラベル");
//
//
var element22b = document.createElement('input');
element22b.type="text";
element22b.name="link";
element22b.style.position="absolute";
element22b.style.backgroundColor="transparent";
element22b.style.top="290px";
element22b.style.left="300px";
element22b.style.fontSize="15px";
element22b.style.zIndex=7;
element22b.style.color="blue";
element22b.style.textDecoration="underline";
element22b.value="NNNNNNNNNN";
element22b.autocomplete="off";
area.appendChild(element22b);
mouseDrag(element22b);
areaCheck(element22b);
openSetting1(element22b,"リンク");
settingStyle(element22b,"リンク");
randomID(element22b);
//
//
var element23b = document.createElement('input');
element23b.type="text";
element23b.name="link";
element23b.style.position="absolute";
element23b.style.backgroundColor="transparent";
element23b.style.top="290px";
element23b.style.left="480px";
element23b.style.fontSize="15px";
element23b.style.zIndex=7;
element23b.style.color="blue";
element23b.style.textDecoration="underline";
element23b.value="NNNNNNNNNN";
element23b.autocomplete="off";
area.appendChild(element23b);
mouseDrag(element23b);
areaCheck(element23b);
openSetting1(element23b,"リンク");
settingStyle(element23b,"リンク");
randomID(element23b);
//
//
var element24b = document.createElement('input');
element24b.type="text";
element24b.name="link";
element24b.style.position="absolute";
element24b.style.backgroundColor="transparent";
element24b.style.top="290px";
element24b.style.left="660px";
element24b.style.fontSize="15px";
element24b.style.zIndex=7;
element24b.style.color="blue";
element24b.style.textDecoration="underline";
element24b.value="NNNNNNNNNN";
element24b.autocomplete="off";
area.appendChild(element24b);
mouseDrag(element24b);
areaCheck(element24b);
openSetting1(element24b,"リンク");
settingStyle(element24b,"リンク");
randomID(element24b);
//
//
var element25b = document.createElement('input');
element25b.type="text";
element25b.name="link";
element25b.style.position="absolute";
element25b.style.backgroundColor="transparent";
element25b.style.top="290px";
element25b.style.left="840px";
element25b.style.fontSize="15px";
element25b.style.zIndex=7;
element25b.style.color="blue";
element25b.style.textDecoration="underline";
element25b.value="NNNNNNNNNN";
element25b.autocomplete="off";
area.appendChild(element25b);
mouseDrag(element25b);
areaCheck(element25b);
openSetting1(element25b,"リンク");
settingStyle(element25b,"リンク");
randomID(element25b);
//
//
var element26b = document.createElement('input');
element26b.type="text";
element26b.name="link";
element26b.style.position="absolute";
element26b.style.backgroundColor="transparent";
element26b.style.top="290px";
element26b.style.left="1020px";
element26b.style.fontSize="15px";
element26b.style.zIndex=7;
element26b.style.color="blue";
element26b.style.textDecoration="underline";
element26b.value="NNNNNNNNNN";
element26b.autocomplete="off";
area.appendChild(element26b);
mouseDrag(element26b);
areaCheck(element26b);
openSetting1(element26b,"リンク");
settingStyle(element26b,"リンク");
randomID(element26b);
//
//5列目
//
var element27b = document.createElement('input');
element27b.type="text";
element27b.name="label";
element27b.style.position="absolute";
element27b.style.backgroundColor="transparent";
element27b.style.top="320px";
element27b.style.left="110px";
element27b.style.fontSize="15px";
element27b.style.zIndex=7;
element27b.style.fontWeight="bold";
element27b.value="分類５";
area.appendChild(element27b);
mouseDrag(element27b);
areaCheck(element27b);
openSetting1(element27b,"ラベル");
settingStyle(element27b,"ラベル");
//
//
var element28b = document.createElement('input');
element28b.type="text";
element28b.name="link";
element28b.style.position="absolute";
element28b.style.backgroundColor="transparent";
element28b.style.top="320px";
element28b.style.left="300px";
element28b.style.fontSize="15px";
element28b.style.zIndex=7;
element28b.style.color="blue";
element28b.style.textDecoration="underline";
element28b.value="NNNNNNNNNN";
element28b.autocomplete="off";
area.appendChild(element28b);
mouseDrag(element28b);
areaCheck(element28b);
openSetting1(element28b,"リンク");
settingStyle(element28b,"リンク");
randomID(element28b);
//
//
var element29b = document.createElement('input');
element29b.type="text";
element29b.name="link";
element29b.style.position="absolute";
element29b.style.backgroundColor="transparent";
element29b.style.top="320px";
element29b.style.left="480px";
element29b.style.fontSize="15px";
element29b.style.zIndex=7;
element29b.style.color="blue";
element29b.style.textDecoration="underline";
element29b.value="NNNNNNNNNN";
element29b.autocomplete="off";
area.appendChild(element29b);
mouseDrag(element29b);
areaCheck(element29b);
openSetting1(element29b,"リンク");
settingStyle(element29b,"リンク");
randomID(element29b);
//
//
var element30b = document.createElement('input');
element30b.type="text";
element30b.name="link";
element30b.style.position="absolute";
element30b.style.backgroundColor="transparent";
element30b.style.top="320px";
element30b.style.left="660px";
element30b.style.fontSize="15px";
element30b.style.zIndex=7;
element30b.style.color="blue";
element30b.style.textDecoration="underline";
element30b.value="NNNNNNNNNN";
element30b.autocomplete="off";
area.appendChild(element30b);
mouseDrag(element30b);
areaCheck(element30b);
openSetting1(element30b,"リンク");
settingStyle(element30b,"リンク");
randomID(element30b);
//
//
var element31b = document.createElement('input');
element31b.type="text";
element31b.name="link";
element31b.style.position="absolute";
element31b.style.backgroundColor="transparent";
element31b.style.top="320px";
element31b.style.left="840px";
element31b.style.fontSize="15px";
element31b.style.zIndex=7;
element31b.style.color="blue";
element31b.style.textDecoration="underline";
element31b.value="NNNNNNNNNN";
element31b.autocomplete="off";
area.appendChild(element31b);
mouseDrag(element31b);
areaCheck(element31b);
openSetting1(element31b,"リンク");
settingStyle(element31b,"リンク");
randomID(element31b);
//
//
var element32b = document.createElement('input');
element32b.type="text";
element32b.name="link";
element32b.style.position="absolute";
element32b.style.backgroundColor="transparent";
element32b.style.top="320px";
element32b.style.left="1020px";
element32b.style.fontSize="15px";
element32b.style.zIndex=7;
element32b.style.color="blue";
element32b.style.textDecoration="underline";
element32b.value="NNNNNNNNNN";
element32b.autocomplete="off";
area.appendChild(element32b);
mouseDrag(element32b);
areaCheck(element32b);
openSetting1(element32b,"リンク");
settingStyle(element32b,"リンク");
randomID(element32b);
//
//6列目
//
var element33b = document.createElement('input');
element33b.type="text";
element33b.name="label";
element33b.style.position="absolute";
element33b.style.backgroundColor="transparent";
element33b.style.top="350px";
element33b.style.left="110px";
element33b.style.fontSize="15px";
element33b.style.zIndex=7;
element33b.style.fontWeight="bold";
element33b.value="分類６";
area.appendChild(element33b);
mouseDrag(element33b);
areaCheck(element33b);
openSetting1(element33b,"ラベル");
settingStyle(element33b,"ラベル");
//
//
var element34b = document.createElement('input');
element34b.type="text";
element34b.name="link";
element34b.style.position="absolute";
element34b.style.backgroundColor="transparent";
element34b.style.top="350px";
element34b.style.left="300px";
element34b.style.fontSize="15px";
element34b.style.zIndex=7;
element34b.style.color="blue";
element34b.style.textDecoration="underline";
element34b.value="NNNNNNNNNN";
element34b.autocomplete="off";
area.appendChild(element34b);
mouseDrag(element34b);
areaCheck(element34b);
openSetting1(element34b,"リンク");
settingStyle(element34b,"リンク");
randomID(element34b);
//
//
var element35b = document.createElement('input');
element35b.type="text";
element35b.name="link";
element35b.style.position="absolute";
element35b.style.backgroundColor="transparent";
element35b.style.top="350px";
element35b.style.left="480px";
element35b.style.fontSize="15px";
element35b.style.zIndex=7;
element35b.style.color="blue";
element35b.style.textDecoration="underline";
element35b.value="NNNNNNNNNN";
element35b.autocomplete="off";
area.appendChild(element35b);
mouseDrag(element35b);
areaCheck(element35b);
openSetting1(element35b,"リンク");
settingStyle(element35b,"リンク");
randomID(element35b);
//
//
var element36b = document.createElement('input');
element36b.type="text";
element36b.name="link";
element36b.style.position="absolute";
element36b.style.backgroundColor="transparent";
element36b.style.top="350px";
element36b.style.left="660px";
element36b.style.fontSize="15px";
element36b.style.zIndex=7;
element36b.style.color="blue";
element36b.style.textDecoration="underline";
element36b.value="NNNNNNNNNN";
element36b.autocomplete="off";
area.appendChild(element36b);
mouseDrag(element36b);
areaCheck(element36b);
openSetting1(element36b,"リンク");
settingStyle(element36b,"リンク");
randomID(element36b);
//
//
var element37b = document.createElement('input');
element37b.type="text";
element37b.name="link";
element37b.style.position="absolute";
element37b.style.backgroundColor="transparent";
element37b.style.top="350px";
element37b.style.left="840px";
element37b.style.fontSize="15px";
element37b.style.zIndex=7;
element37b.style.color="blue";
element37b.style.textDecoration="underline";
element37b.value="NNNNNNNNNN";
element37b.autocomplete="off";
area.appendChild(element37b);
mouseDrag(element37b);
areaCheck(element37b);
openSetting1(element37b,"リンク");
settingStyle(element37b,"リンク");
randomID(element37b);
//
//
var element38b = document.createElement('input');
element38b.type="text";
element38b.name="link";
element38b.style.position="absolute";
element38b.style.backgroundColor="transparent";
element38b.style.top="350px";
element38b.style.left="1020px";
element38b.style.fontSize="15px";
element38b.style.zIndex=7;
element38b.style.color="blue";
element38b.style.textDecoration="underline";
element38b.value="NNNNNNNNNN";
element38b.autocomplete="off";
area.appendChild(element38b);
mouseDrag(element38b);
areaCheck(element38b);
openSetting1(element38b,"リンク");
settingStyle(element38b,"リンク");
randomID(element38b);
//
//7列目
//
var element39b = document.createElement('input');
element39b.type="text";
element39b.name="label";
element39b.style.position="absolute";
element39b.style.backgroundColor="transparent";
element39b.style.top="380px";
element39b.style.left="110px";
element39b.style.fontSize="15px";
element39b.style.zIndex=7;
element39b.style.fontWeight="bold";
element39b.value="分類７";
area.appendChild(element39b);
mouseDrag(element39b);
areaCheck(element39b);
openSetting1(element39b,"ラベル");
settingStyle(element39b,"ラベル");
//
//
var element40b = document.createElement('input');
element40b.type="text";
element40b.name="link";
element40b.style.position="absolute";
element40b.style.backgroundColor="transparent";
element40b.style.top="380px";
element40b.style.left="300px";
element40b.style.fontSize="15px";
element40b.style.zIndex=7;
element40b.style.color="blue";
element40b.style.textDecoration="underline";
element40b.value="NNNNNNNNNN";
element40b.autocomplete="off";
area.appendChild(element40b);
mouseDrag(element40b);
areaCheck(element40b);
openSetting1(element40b,"リンク");
settingStyle(element40b,"リンク");
randomID(element40b);
//
//
var element41b = document.createElement('input');
element41b.type="text";
element41b.name="link";
element41b.style.position="absolute";
element41b.style.backgroundColor="transparent";
element41b.style.top="380px";
element41b.style.left="480px";
element41b.style.fontSize="15px";
element41b.style.zIndex=7;
element41b.style.color="blue";
element41b.style.textDecoration="underline";
element41b.value="NNNNNNNNNN";
element41b.autocomplete="off";
area.appendChild(element41b);
mouseDrag(element41b);
areaCheck(element41b);
openSetting1(element41b,"リンク");
settingStyle(element41b,"リンク");
randomID(element41b);
//
//
var element42b = document.createElement('input');
element42b.type="text";
element42b.name="link";
element42b.style.position="absolute";
element42b.style.backgroundColor="transparent";
element42b.style.top="380px";
element42b.style.left="660px";
element42b.style.fontSize="15px";
element42b.style.zIndex=7;
element42b.style.color="blue";
element42b.style.textDecoration="underline";
element42b.value="NNNNNNNNNN";
element42b.autocomplete="off";
area.appendChild(element42b);
mouseDrag(element42b);
areaCheck(element42b);
openSetting1(element42b,"リンク");
settingStyle(element42b,"リンク");
randomID(element42b);
//
//
var element43b = document.createElement('input');
element43b.type="text";
element43b.name="link";
element43b.style.position="absolute";
element43b.style.backgroundColor="transparent";
element43b.style.top="380px";
element43b.style.left="840px";
element43b.style.fontSize="15px";
element43b.style.zIndex=7;
element43b.style.color="blue";
element43b.style.textDecoration="underline";
element43b.value="NNNNNNNNNN";
element43b.autocomplete="off";
area.appendChild(element43b);
mouseDrag(element43b);
areaCheck(element43b);
openSetting1(element43b,"リンク");
settingStyle(element43b,"リンク");
randomID(element43b);
//
//
var element44b = document.createElement('input');
element44b.type="text";
element44b.name="link";
element44b.style.position="absolute";
element44b.style.backgroundColor="transparent";
element44b.style.top="380px";
element44b.style.left="1020px";
element44b.style.fontSize="15px";
element44b.style.zIndex=7;
element44b.style.color="blue";
element44b.style.textDecoration="underline";
element44b.value="NNNNNNNNNN";
element44b.autocomplete="off";
area.appendChild(element44b);
mouseDrag(element44b);
areaCheck(element44b);
openSetting1(element44b,"リンク");
settingStyle(element44b,"リンク");
randomID(element44b);
//
//8列目
//
var element45b = document.createElement('input');
element45b.type="text";
element45b.name="label";
element45b.style.position="absolute";
element45b.style.backgroundColor="transparent";
element45b.style.top="410px";
element45b.style.left="110px";
element45b.style.fontSize="15px";
element45b.style.zIndex=7;
element45b.style.fontWeight="bold";
element45b.value="分類８";
area.appendChild(element45b);
mouseDrag(element45b);
areaCheck(element45b);
openSetting1(element45b,"ラベル");
settingStyle(element45b,"ラベル");
//
//
var element46b = document.createElement('input');
element46b.type="text";
element46b.name="link";
element46b.style.position="absolute";
element46b.style.backgroundColor="transparent";
element46b.style.top="410px";
element46b.style.left="300px";
element46b.style.fontSize="15px";
element46b.style.zIndex=7;
element46b.style.color="blue";
element46b.style.textDecoration="underline";
element46b.value="NNNNNNNNNN";
element46b.autocomplete="off";
area.appendChild(element46b);
mouseDrag(element46b);
areaCheck(element46b);
openSetting1(element46b,"リンク");
settingStyle(element46b,"リンク");
randomID(element46b);
//
//
var element47b = document.createElement('input');
element47b.type="text";
element47b.name="link";
element47b.style.position="absolute";
element47b.style.backgroundColor="transparent";
element47b.style.top="410px";
element47b.style.left="480px";
element47b.style.fontSize="15px";
element47b.style.zIndex=7;
element47b.style.color="blue";
element47b.style.textDecoration="underline";
element47b.value="NNNNNNNNNN";
element47b.autocomplete="off";
area.appendChild(element47b);
mouseDrag(element47b);
areaCheck(element47b);
openSetting1(element47b,"リンク");
settingStyle(element47b,"リンク");
randomID(element47b);
//
//
var element48b = document.createElement('input');
element48b.type="text";
element48b.name="link";
element48b.style.position="absolute";
element48b.style.backgroundColor="transparent";
element48b.style.top="410px";
element48b.style.left="660px";
element48b.style.fontSize="15px";
element48b.style.zIndex=7;
element48b.style.color="blue";
element48b.style.textDecoration="underline";
element48b.value="NNNNNNNNNN";
element48b.autocomplete="off";
area.appendChild(element48b);
mouseDrag(element48b);
areaCheck(element48b);
openSetting1(element48b,"リンク");
settingStyle(element48b,"リンク");
randomID(element48b);
//
//
var element49b = document.createElement('input');
element49b.type="text";
element49b.name="link";
element49b.style.position="absolute";
element49b.style.backgroundColor="transparent";
element49b.style.top="410px";
element49b.style.left="840px";
element49b.style.fontSize="15px";
element49b.style.zIndex=7;
element49b.style.color="blue";
element49b.style.textDecoration="underline";
element49b.value="NNNNNNNNNN";
element49b.autocomplete="off";
area.appendChild(element49b);
mouseDrag(element49b);
areaCheck(element49b);
openSetting1(element49b,"リンク");
settingStyle(element49b,"リンク");
randomID(element49b);
//
//
var element50b = document.createElement('input');
element50b.type="text";
element50b.name="link";
element50b.style.position="absolute";
element50b.style.backgroundColor="transparent";
element50b.style.top="410px";
element50b.style.left="1020px";
element50b.style.fontSize="15px";
element50b.style.zIndex=7;
element50b.style.color="blue";
element50b.style.textDecoration="underline";
element50b.value="NNNNNNNNNN";
element50b.autocomplete="off";
area.appendChild(element50b);
mouseDrag(element50b);
areaCheck(element50b);
openSetting1(element50b,"リンク");
settingStyle(element50b,"リンク");
randomID(element50b);

// 9列目
//
var element51b = document.createElement('input');
element51b.type="text";
element51b.name="label";
element51b.style.position="absolute";
element51b.style.backgroundColor="transparent";
element51b.style.top="440px";
element51b.style.left="110px";
element51b.style.fontSize="15px";
element51b.style.zIndex=7;
element51b.style.fontWeight="bold";
element51b.value="分類９";
area.appendChild(element51b);
mouseDrag(element51b);
areaCheck(element51b);
openSetting1(element51b,"ラベル");
settingStyle(element51b,"ラベル");
//
//
var element52b = document.createElement('input');
element52b.type="text";
element52b.name="link";
element52b.style.position="absolute";
element52b.style.backgroundColor="transparent";
element52b.style.top="440px";
element52b.style.left="300px";
element52b.style.fontSize="15px";
element52b.style.zIndex=7;
element52b.style.color="blue";
element52b.style.textDecoration="underline";
element52b.value="NNNNNNNNNN";
element52b.autocomplete="off";
area.appendChild(element52b);
mouseDrag(element52b);
areaCheck(element52b);
openSetting1(element52b,"リンク");
settingStyle(element52b,"リンク");
randomID(element52b);
//
//
var element53b = document.createElement('input');
element53b.type="text";
element53b.name="link";
element53b.style.position="absolute";
element53b.style.backgroundColor="transparent";
element53b.style.top="440px";
element53b.style.left="480px";
element53b.style.fontSize="15px";
element53b.style.zIndex=7;
element53b.style.color="blue";
element53b.style.textDecoration="underline";
element53b.value="NNNNNNNNNN";
element53b.autocomplete="off";
area.appendChild(element53b);
mouseDrag(element53b);
areaCheck(element53b);
openSetting1(element53b,"リンク");
settingStyle(element53b,"リンク");
randomID(element53b);
//
//
var element54b = document.createElement('input');
element54b.type="text";
element54b.name="link";
element54b.style.position="absolute";
element54b.style.backgroundColor="transparent";
element54b.style.top="440px";
element54b.style.left="660px";
element54b.style.fontSize="15px";
element54b.style.zIndex=7;
element54b.style.color="blue";
element54b.style.textDecoration="underline";
element54b.value="NNNNNNNNNN";
element54b.autocomplete="off";
area.appendChild(element54b);
mouseDrag(element54b);
areaCheck(element54b);
openSetting1(element54b,"リンク");
settingStyle(element54b,"リンク");
randomID(element54b);
//
//
var element55b = document.createElement('input');
element55b.type="text";
element55b.name="link";
element55b.style.position="absolute";
element55b.style.backgroundColor="transparent";
element55b.style.top="440px";
element55b.style.left="840px";
element55b.style.fontSize="15px";
element55b.style.zIndex=7;
element55b.style.color="blue";
element55b.style.textDecoration="underline";
element55b.value="NNNNNNNNNN";
element55b.autocomplete="off";
area.appendChild(element55b);
mouseDrag(element55b);
areaCheck(element55b);
openSetting1(element55b,"リンク");
settingStyle(element55b,"リンク");
randomID(element55b);
//
//
var element56b = document.createElement('input');
element56b.type="text";
element56b.name="link";
element56b.style.position="absolute";
element56b.style.backgroundColor="transparent";
element56b.style.top="440px";
element56b.style.left="1020px";
element56b.style.fontSize="15px";
element56b.style.zIndex=7;
element56b.style.color="blue";
element56b.style.textDecoration="underline";
element56b.value="NNNNNNNNNN";
element56b.autocomplete="off";
area.appendChild(element56b);
mouseDrag(element56b);
areaCheck(element56b);
openSetting1(element56b,"リンク");
settingStyle(element56b,"リンク");
randomID(element56b);


// 10列目
//
var element57b = document.createElement('input');
element57b.type="text";
element57b.name="label";
element57b.style.position="absolute";
element57b.style.backgroundColor="transparent";
element57b.style.top="470px";
element57b.style.left="110px";
element57b.style.fontSize="15px";
element57b.style.zIndex=7;
element57b.style.fontWeight="bold";
element57b.value="分類１０";
area.appendChild(element57b);
mouseDrag(element57b);
areaCheck(element57b);
openSetting1(element57b,"ラベル");
settingStyle(element57b,"ラベル");
//
//
var element58b = document.createElement('input');
element58b.type="text";
element58b.name="link";
element58b.style.position="absolute";
element58b.style.backgroundColor="transparent";
element58b.style.top="470px";
element58b.style.left="300px";
element58b.style.fontSize="15px";
element58b.style.zIndex=7;
element58b.style.color="blue";
element58b.style.textDecoration="underline";
element58b.value="NNNNNNNNNN";
element58b.autocomplete="off";
area.appendChild(element58b);
mouseDrag(element58b);
areaCheck(element58b);
openSetting1(element58b,"リンク");
settingStyle(element58b,"リンク");
randomID(element58b);
//
//
var element59b = document.createElement('input');
element59b.type="text";
element59b.name="link";
element59b.style.position="absolute";
element59b.style.backgroundColor="transparent";
element59b.style.top="470px";
element59b.style.left="480px";
element59b.style.fontSize="15px";
element59b.style.zIndex=7;
element59b.style.color="blue";
element59b.style.textDecoration="underline";
element59b.value="NNNNNNNNNN";
element59b.autocomplete="off";
area.appendChild(element59b);
mouseDrag(element59b);
areaCheck(element59b);
openSetting1(element59b,"リンク");
settingStyle(element59b,"リンク");
randomID(element59b);
//
//
var element60b = document.createElement('input');
element60b.type="text";
element60b.name="link";
element60b.style.position="absolute";
element60b.style.backgroundColor="transparent";
element60b.style.top="470px";
element60b.style.left="660px";
element60b.style.fontSize="15px";
element60b.style.zIndex=7;
element60b.style.color="blue";
element60b.style.textDecoration="underline";
element60b.value="NNNNNNNNNN";
element60b.autocomplete="off";
area.appendChild(element60b);
mouseDrag(element60b);
areaCheck(element60b);
openSetting1(element60b,"リンク");
settingStyle(element60b,"リンク");
randomID(element60b);
//
//
var element61b = document.createElement('input');
element61b.type="text";
element61b.name="link";
element61b.style.position="absolute";
element61b.style.backgroundColor="transparent";
element61b.style.top="470px";
element61b.style.left="840px";
element61b.style.fontSize="15px";
element61b.style.zIndex=7;
element61b.style.color="blue";
element61b.style.textDecoration="underline";
element61b.value="NNNNNNNNNN";
element61b.autocomplete="off";
area.appendChild(element61b);
mouseDrag(element61b);
areaCheck(element61b);
openSetting1(element61b,"リンク");
settingStyle(element61b,"リンク");
randomID(element61b);
//
//
var element62b = document.createElement('input');
element62b.type="text";
element62b.name="link";
element62b.style.position="absolute";
element62b.style.backgroundColor="transparent";
element62b.style.top="470px";
element62b.style.left="1020px";
element62b.style.fontSize="15px";
element62b.style.zIndex=7;
element62b.style.color="blue";
element62b.style.textDecoration="underline";
element62b.value="NNNNNNNNNN";
element62b.autocomplete="off";
area.appendChild(element62b);
mouseDrag(element62b);
areaCheck(element62b);
openSetting1(element62b,"リンク");
settingStyle(element62b,"リンク");
randomID(element62b);
//
// 11列目
//
var element63b = document.createElement('input');
element63b.type="text";
element63b.name="label";
element63b.style.position="absolute";
element63b.style.backgroundColor="transparent";
element63b.style.top="500px";
element63b.style.left="110px";
element63b.style.fontSize="15px";
element63b.style.zIndex=7;
element63b.style.fontWeight="bold";
element63b.value="分類１１";
area.appendChild(element63b);
mouseDrag(element63b);
areaCheck(element63b);
openSetting1(element63b,"ラベル");
settingStyle(element63b,"ラベル");
//
//
var element64b = document.createElement('input');
element64b.type="text";
element64b.name="link";
element64b.style.position="absolute";
element64b.style.backgroundColor="transparent";
element64b.style.top="500px";
element64b.style.left="300px";
element64b.style.fontSize="15px";
element64b.style.zIndex=7;
element64b.style.color="blue";
element64b.style.textDecoration="underline";
element64b.value="NNNNNNNNNN";
element64b.autocomplete="off";
area.appendChild(element64b);
mouseDrag(element64b);
areaCheck(element64b);
openSetting1(element64b,"リンク");
settingStyle(element64b,"リンク");
randomID(element64b);
//
//
var element65b = document.createElement('input');
element65b.type="text";
element65b.name="link";
element65b.style.position="absolute";
element65b.style.backgroundColor="transparent";
element65b.style.top="500px";
element65b.style.left="480px";
element65b.style.fontSize="15px";
element65b.style.zIndex=7;
element65b.style.color="blue";
element65b.style.textDecoration="underline";
element65b.value="NNNNNNNNNN";
element65b.autocomplete="off";
area.appendChild(element65b);
mouseDrag(element65b);
areaCheck(element65b);
openSetting1(element65b,"リンク");
settingStyle(element65b,"リンク");
randomID(element65b);
//
//
var element66b = document.createElement('input');
element66b.type="text";
element66b.name="link";
element66b.style.position="absolute";
element66b.style.backgroundColor="transparent";
element66b.style.top="500px";
element66b.style.left="660px";
element66b.style.fontSize="15px";
element66b.style.zIndex=7;
element66b.style.color="blue";
element66b.style.textDecoration="underline";
element66b.value="NNNNNNNNNN";
element66b.autocomplete="off";
area.appendChild(element66b);
mouseDrag(element66b);
areaCheck(element66b);
openSetting1(element66b,"リンク");
settingStyle(element66b,"リンク");
randomID(element66b);
//
//
var element67b = document.createElement('input');
element67b.type="text";
element67b.name="link";
element67b.style.position="absolute";
element67b.style.backgroundColor="transparent";
element67b.style.top="500px";
element67b.style.left="840px";
element67b.style.fontSize="15px";
element67b.style.zIndex=7;
element67b.style.color="blue";
element67b.style.textDecoration="underline";
element67b.value="NNNNNNNNNN";
element67b.autocomplete="off";
area.appendChild(element67b);
mouseDrag(element67b);
areaCheck(element67b);
openSetting1(element67b,"リンク");
settingStyle(element67b,"リンク");
randomID(element67b);
//
//
var element68b = document.createElement('input');
element68b.type="text";
element68b.name="link";
element68b.style.position="absolute";
element68b.style.backgroundColor="transparent";
element68b.style.top="500px";
element68b.style.left="1020px";
element68b.style.fontSize="15px";
element68b.style.zIndex=7;
element68b.style.color="blue";
element68b.style.textDecoration="underline";
element68b.value="NNNNNNNNNN";
element68b.autocomplete="off";
area.appendChild(element68b);
mouseDrag(element68b);
areaCheck(element68b);
openSetting1(element68b,"リンク");
settingStyle(element68b,"リンク");
randomID(element68b);
//
// 12列目
//
var element69b = document.createElement('input');
element69b.type="text";
element69b.name="label";
element69b.style.position="absolute";
element69b.style.backgroundColor="transparent";
element69b.style.top="530px";
element69b.style.left="110px";
element69b.style.fontSize="15px";
element69b.style.zIndex=7;
element69b.style.fontWeight="bold";
element69b.value="分類１２";
area.appendChild(element69b);
mouseDrag(element69b);
areaCheck(element69b);
openSetting1(element69b,"ラベル");
settingStyle(element69b,"ラベル");
//
//
var element70b = document.createElement('input');
element70b.type="text";
element70b.name="link";
element70b.style.position="absolute";
element70b.style.backgroundColor="transparent";
element70b.style.top="530px";
element70b.style.left="300px";
element70b.style.fontSize="15px";
element70b.style.zIndex=7;
element70b.style.color="blue";
element70b.style.textDecoration="underline";
element70b.value="NNNNNNNNNN";
element70b.autocomplete="off";
area.appendChild(element70b);
mouseDrag(element70b);
areaCheck(element70b);
openSetting1(element70b,"リンク");
settingStyle(element70b,"リンク");
randomID(element70b);
//
//
var element71b = document.createElement('input');
element71b.type="text";
element71b.name="link";
element71b.style.position="absolute";
element71b.style.backgroundColor="transparent";
element71b.style.top="530px";
element71b.style.left="480px";
element71b.style.fontSize="15px";
element71b.style.zIndex=7;
element71b.style.color="blue";
element71b.style.textDecoration="underline";
element71b.value="NNNNNNNNNN";
element71b.autocomplete="off";
area.appendChild(element71b);
mouseDrag(element71b);
areaCheck(element71b);
openSetting1(element71b,"リンク");
settingStyle(element71b,"リンク");
randomID(element71b);
//
//
var element72b = document.createElement('input');
element72b.type="text";
element72b.name="link";
element72b.style.position="absolute";
element72b.style.backgroundColor="transparent";
element72b.style.top="530px";
element72b.style.left="660px";
element72b.style.fontSize="15px";
element72b.style.zIndex=7;
element72b.style.color="blue";
element72b.style.textDecoration="underline";
element72b.value="NNNNNNNNNN";
element72b.autocomplete="off";
area.appendChild(element72b);
mouseDrag(element72b);
areaCheck(element72b);
openSetting1(element72b,"リンク");
settingStyle(element72b,"リンク");
randomID(element72b);
//
//
var element73b = document.createElement('input');
element73b.type="text";
element73b.name="link";
element73b.style.position="absolute";
element73b.style.backgroundColor="transparent";
element73b.style.top="530px";
element73b.style.left="840px";
element73b.style.fontSize="15px";
element73b.style.zIndex=7;
element73b.style.color="blue";
element73b.style.textDecoration="underline";
element73b.value="NNNNNNNNNN";
element73b.autocomplete="off";
area.appendChild(element73b);
mouseDrag(element73b);
areaCheck(element73b);
openSetting1(element73b,"リンク");
settingStyle(element73b,"リンク");
randomID(element73b);
//
//
var element74b = document.createElement('input');
element74b.type="text";
element74b.name="link";
element74b.style.position="absolute";
element74b.style.backgroundColor="transparent";
element74b.style.top="530px";
element74b.style.left="1020px";
element74b.style.fontSize="15px";
element74b.style.zIndex=7;
element74b.style.color="blue";
element74b.style.textDecoration="underline";
element74b.value="NNNNNNNNNN";
element74b.autocomplete="off";
area.appendChild(element74b);
mouseDrag(element74b);
areaCheck(element74b);
openSetting1(element74b,"リンク");
settingStyle(element74b,"リンク");
randomID(element74b);
//
// 13列目
//
var element75b = document.createElement('input');
element75b.type="text";
element75b.name="label";
element75b.style.position="absolute";
element75b.style.backgroundColor="transparent";
element75b.style.top="560px";
element75b.style.left="110px";
element75b.style.fontSize="15px";
element75b.style.zIndex=7;
element75b.style.fontWeight="bold";
element75b.value="分類１３";
area.appendChild(element75b);
mouseDrag(element75b);
areaCheck(element75b);
openSetting1(element75b,"ラベル");
settingStyle(element75b,"ラベル");
//
//
var element76b = document.createElement('input');
element76b.type="text";
element76b.name="link";
element76b.style.position="absolute";
element76b.style.backgroundColor="transparent";
element76b.style.top="560px";
element76b.style.left="300px";
element76b.style.fontSize="15px";
element76b.style.zIndex=7;
element76b.style.color="blue";
element76b.style.textDecoration="underline";
element76b.value="NNNNNNNNNN";
element76b.autocomplete="off";
area.appendChild(element76b);
mouseDrag(element76b);
areaCheck(element76b);
openSetting1(element76b,"リンク");
settingStyle(element76b,"リンク");
randomID(element76b);
//
//
var element77b = document.createElement('input');
element77b.type="text";
element77b.name="link";
element77b.style.position="absolute";
element77b.style.backgroundColor="transparent";
element77b.style.top="560px";
element77b.style.left="480px";
element77b.style.fontSize="15px";
element77b.style.zIndex=7;
element77b.style.color="blue";
element77b.style.textDecoration="underline";
element77b.value="NNNNNNNNNN";
element77b.autocomplete="off";
area.appendChild(element77b);
mouseDrag(element77b);
areaCheck(element77b);
openSetting1(element77b,"リンク");
settingStyle(element77b,"リンク");
randomID(element77b);
//
//
var element78b = document.createElement('input');
element78b.type="text";
element78b.name="link";
element78b.style.position="absolute";
element78b.style.backgroundColor="transparent";
element78b.style.top="560px";
element78b.style.left="660px";
element78b.style.fontSize="15px";
element78b.style.zIndex=7;
element78b.style.color="blue";
element78b.style.textDecoration="underline";
element78b.value="NNNNNNNNNN";
element78b.autocomplete="off";
area.appendChild(element78b);
mouseDrag(element78b);
areaCheck(element78b);
openSetting1(element78b,"リンク");
settingStyle(element78b,"リンク");
randomID(element78b);
//
//
var element79b = document.createElement('input');
element79b.type="text";
element79b.name="link";
element79b.style.position="absolute";
element79b.style.backgroundColor="transparent";
element79b.style.top="560px";
element79b.style.left="840px";
element79b.style.fontSize="15px";
element79b.style.zIndex=7;
element79b.style.color="blue";
element79b.style.textDecoration="underline";
element79b.value="NNNNNNNNNN";
element79b.autocomplete="off";
area.appendChild(element79b);
mouseDrag(element79b);
areaCheck(element79b);
openSetting1(element79b,"リンク");
settingStyle(element79b,"リンク");
randomID(element79b);
//
//
var element80b = document.createElement('input');
element80b.type="text";
element80b.name="link";
element80b.style.position="absolute";
element80b.style.backgroundColor="transparent";
element80b.style.top="560px";
element80b.style.left="1020px";
element80b.style.fontSize="15px";
element80b.style.zIndex=7;
element80b.style.color="blue";
element80b.style.textDecoration="underline";
element80b.value="NNNNNNNNNN";
element80b.autocomplete="off";
area.appendChild(element80b);
mouseDrag(element80b);
areaCheck(element80b);
openSetting1(element80b,"リンク");
settingStyle(element80b,"リンク");
randomID(element80b);
//
// 14列目
//
var element81b = document.createElement('input');
element81b.type="text";
element81b.name="label";
element81b.style.position="absolute";
element81b.style.backgroundColor="transparent";
element81b.style.top="590px";
element81b.style.left="110px";
element81b.style.fontSize="15px";
element81b.style.zIndex=7;
element81b.style.fontWeight="bold";
element81b.value="分類１４";
area.appendChild(element81b);
mouseDrag(element81b);
areaCheck(element81b);
openSetting1(element81b,"ラベル");
settingStyle(element81b,"ラベル");
//
//
var element82b = document.createElement('input');
element82b.type="text";
element82b.name="link";
element82b.style.position="absolute";
element82b.style.backgroundColor="transparent";
element82b.style.top="590px";
element82b.style.left="300px";
element82b.style.fontSize="15px";
element82b.style.zIndex=7;
element82b.style.color="blue";
element82b.style.textDecoration="underline";
element82b.value="NNNNNNNNNN";
element82b.autocomplete="off";
area.appendChild(element82b);
mouseDrag(element82b);
areaCheck(element82b);
openSetting1(element82b,"リンク");
settingStyle(element82b,"リンク");
randomID(element82b);
//
//
var element83b = document.createElement('input');
element83b.type="text";
element83b.name="link";
element83b.style.position="absolute";
element83b.style.backgroundColor="transparent";
element83b.style.top="590px";
element83b.style.left="480px";
element83b.style.fontSize="15px";
element83b.style.zIndex=7;
element83b.style.color="blue";
element83b.style.textDecoration="underline";
element83b.value="NNNNNNNNNN";
element83b.autocomplete="off";
area.appendChild(element83b);
mouseDrag(element83b);
areaCheck(element83b);
openSetting1(element83b,"リンク");
settingStyle(element83b,"リンク");
randomID(element83b);
//
//
var element84b = document.createElement('input');
element84b.type="text";
element84b.name="link";
element84b.style.position="absolute";
element84b.style.backgroundColor="transparent";
element84b.style.top="590px";
element84b.style.left="660px";
element84b.style.fontSize="15px";
element84b.style.zIndex=7;
element84b.style.color="blue";
element84b.style.textDecoration="underline";
element84b.value="NNNNNNNNNN";
element84b.autocomplete="off";
area.appendChild(element84b);
mouseDrag(element84b);
areaCheck(element84b);
openSetting1(element84b,"リンク");
settingStyle(element84b,"リンク");
randomID(element84b);
//
//
var element85b = document.createElement('input');
element85b.type="text";
element85b.name="link";
element85b.style.position="absolute";
element85b.style.backgroundColor="transparent";
element85b.style.top="590px";
element85b.style.left="840px";
element85b.style.fontSize="15px";
element85b.style.zIndex=7;
element85b.style.color="blue";
element85b.style.textDecoration="underline";
element85b.value="NNNNNNNNNN";
element85b.autocomplete="off";
area.appendChild(element85b);
mouseDrag(element85b);
areaCheck(element85b);
openSetting1(element85b,"リンク");
settingStyle(element85b,"リンク");
randomID(element85b);
//
//
var element86b = document.createElement('input');
element86b.type="text";
element86b.name="link";
element86b.style.position="absolute";
element86b.style.backgroundColor="transparent";
element86b.style.top="590px";
element86b.style.left="1020px";
element86b.style.fontSize="15px";
element86b.style.zIndex=7;
element86b.style.color="blue";
element86b.style.textDecoration="underline";
element86b.value="NNNNNNNNNN";
element86b.autocomplete="off";
area.appendChild(element86b);
mouseDrag(element86b);
areaCheck(element86b);
openSetting1(element86b,"リンク");
settingStyle(element86b,"リンク");
randomID(element86b);
//
// 15列目
//
var element87b = document.createElement('input');
element87b.type="text";
element87b.name="label";
element87b.style.position="absolute";
element87b.style.backgroundColor="transparent";
element87b.style.top="620px";
element87b.style.left="110px";
element87b.style.fontSize="15px";
element87b.style.zIndex=7;
element87b.style.fontWeight="bold";
element87b.value="分類１５";
area.appendChild(element87b);
mouseDrag(element87b);
areaCheck(element87b);
openSetting1(element87b,"ラベル");
settingStyle(element87b,"ラベル");
//
//
var element88b = document.createElement('input');
element88b.type="text";
element88b.name="link";
element88b.style.position="absolute";
element88b.style.backgroundColor="transparent";
element88b.style.top="620px";
element88b.style.left="300px";
element88b.style.fontSize="15px";
element88b.style.zIndex=7;
element88b.style.color="blue";
element88b.style.textDecoration="underline";
element88b.value="NNNNNNNNNN";
element88b.autocomplete="off";
area.appendChild(element88b);
mouseDrag(element88b);
areaCheck(element88b);
openSetting1(element88b,"リンク");
settingStyle(element88b,"リンク");
randomID(element88b);
//
//
var element89b = document.createElement('input');
element89b.type="text";
element89b.name="link";
element89b.style.position="absolute";
element89b.style.backgroundColor="transparent";
element89b.style.top="620px";
element89b.style.left="480px";
element89b.style.fontSize="15px";
element89b.style.zIndex=7;
element89b.style.color="blue";
element89b.style.textDecoration="underline";
element89b.value="NNNNNNNNNN";
element89b.autocomplete="off";
area.appendChild(element89b);
mouseDrag(element89b);
areaCheck(element89b);
openSetting1(element89b,"リンク");
settingStyle(element89b,"リンク");
randomID(element89b);
//
//
var element90b = document.createElement('input');
element90b.type="text";
element90b.name="link";
element90b.style.position="absolute";
element90b.style.backgroundColor="transparent";
element90b.style.top="620px";
element90b.style.left="660px";
element90b.style.fontSize="15px";
element90b.style.zIndex=7;
element90b.style.color="blue";
element90b.style.textDecoration="underline";
element90b.value="NNNNNNNNNN";
element90b.autocomplete="off";
area.appendChild(element90b);
mouseDrag(element90b);
areaCheck(element90b);
openSetting1(element90b,"リンク");
settingStyle(element90b,"リンク");
randomID(element90b);
//
//
var element91b = document.createElement('input');
element91b.type="text";
element91b.name="link";
element91b.style.position="absolute";
element91b.style.backgroundColor="transparent";
element91b.style.top="620px";
element91b.style.left="840px";
element91b.style.fontSize="15px";
element91b.style.zIndex=7;
element91b.style.color="blue";
element91b.style.textDecoration="underline";
element91b.value="NNNNNNNNNN";
element91b.autocomplete="off";
area.appendChild(element91b);
mouseDrag(element91b);
areaCheck(element91b);
openSetting1(element91b,"リンク");
settingStyle(element91b,"リンク");
randomID(element91b);
//
//
var element92b = document.createElement('input');
element92b.type="text";
element92b.name="link";
element92b.style.position="absolute";
element92b.style.backgroundColor="transparent";
element92b.style.top="620px";
element92b.style.left="1020px";
element92b.style.fontSize="15px";
element92b.style.zIndex=7;
element92b.style.color="blue";
element92b.style.textDecoration="underline";
element92b.value="NNNNNNNNNN";
element92b.autocomplete="off";
area.appendChild(element92b);
mouseDrag(element92b);
areaCheck(element92b);
openSetting1(element92b,"リンク");
settingStyle(element92b,"リンク");
randomID(element92b);


}


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
    createTextarea();
    // createRadio();
    createCopyButton();
    createTimer();
    createCommnadURL();
    createCommnadNone();
    createCommnadCB();
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




//textarea
function createTextarea(){
    //要素配列
    var array = document.getElementsByName('textarea');
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
            var templete = `<textarea id="${id}" style="${style}" placeholder="${text}"></textarea>
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



//radio---未完成
function createRadio(){
    //1グループ目
    //要素配列
    var array = document.getElementsByName('radio1');
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

            var radioLeft = (rect.left-areaRect.left)/1136*100-2+"%";
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
            var templete = `<input type="radio" id="${id}" style="position : absolute; left : ${radioLeft} ; top : ${element.style.top} ; " ><label style="${style}">${text}</label>
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
}







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


//copy button--ok
function createCopyButton(){
    //要素配列
    var array = document.getElementsByName('copy');
    if(array.length!=0){
        resultCode+=`<script>
// クリップボードにコピーする関数
function clipCopy(text) {
    var textnew = document.getElementById(text).value;
    navigator.clipboard.writeText(textnew).then(() => {
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
                var templete = `<button id="${id}" style="${style}" onclick="clipCopy('${copiedMap.get(element.id)}')">${text}</button>
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



//タイマー
function createTimer(){
    if(document.getElementsByName('timer').length!=0){
        let array = document.getElementsByName('timer');
        var style = array[0].style.cssText;
        resultCode+=`<div style="${style}">
    <label id="hour">0</label><label id="hourL">時間</label>
    <label id="minute">0</label><label id="minuteL">分</label>
    <label id="second">0</label><label id="secondL">秒⌛</label>
</div>
<script>
    var hour = document.getElementById('hour');
    var hourL = document.getElementById('hourL');
    var minute = document.getElementById('minute');
    var minuteL = document.getElementById('minuteL');
    var second = document.getElementById('second');
    var secondL = document.getElementById('secondL');
    var countS = 0;
    var countM = 0;
    var countH = 0;

    setInterval(() => {
        countS++;
        if(countS==60){
            countS=0;
            second.textContent=0;
            countM++;
            if(countM==60){
                minute.textContent=0;
                countM=0;
                countH++;
                hour.textContent=countH;
            }else{
                minute.textContent=countM;
            }
        }else{
            second.textContent=countS;
        }
    }, 1000);
</script>`
    }
}





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


//command 機能なし
function createCommnadNone(){
    //要素配列
    var array = document.getElementsByName('command');
    for(var i = 0; i < array.length; i++){
        if(array[i].hidden==false){
            var element = array[i];
            if(functionMap.get(element.id)=="" || functionMap.get(element.id)==undefined){
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
                var templete = `<button id="${id}" style="${style}">${text}</button>
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
function createCommnadCB(){
    //要素配列
    var array = document.getElementsByName('command');
    var count = 0;
    for(let i = 0; i < array.length; i++){
        if(functionMap.get(array[i].id)=="指定文字をクリップボードへコピー"){
            count++;
        };
    };
    if(count > 0){//一度だけ関数を追加
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
                var templete = `<button id="${id}" style="${style}" onclick="copyToClipboard('${CB}')">${text}</button>
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



