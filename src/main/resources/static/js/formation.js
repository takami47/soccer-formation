// ==============================
// 要素取得
// ==============================

const playerNameInput =
    document.getElementById("playerName");

const addPlayerButton =
    document.getElementById("addPlayerButton");

const playerList =
    document.getElementById("playerList");

const formationSelect =
    document.getElementById("formationSelect");

const formationArea =
    document.getElementById("formation");


// ==============================
// 選手登録
// ==============================

addPlayerButton.addEventListener("click", function () {

    const playerName =
        playerNameInput.value.trim();


    // 名前が空なら何もしない
    if (playerName === "") {
        return;
    }


    // 選手一覧に追加
    const listItem =
        document.createElement("li");

    listItem.textContent =
        playerName;

    playerList.appendChild(listItem);


    // 全てのプルダウンに追加
    const playerSelects =
        document.querySelectorAll(".player-select");


    playerSelects.forEach(function (select) {

        addPlayerOption(
            select,
            playerName
        );

    });


    // 入力欄を空にする
    playerNameInput.value = "";
});


// ==============================
// プルダウンに選手を追加
// ==============================

function addPlayerOption(select, playerName) {

    const option =
        document.createElement("option");


    option.textContent =
        playerName;

    option.value =
        playerName;


    select.appendChild(option);
}


// ==============================
// 交代ボタン
// ==============================

function setupSubstituteButton(button) {

    button.addEventListener("click", function () {

        const slot =
            button.parentElement;


        const selects =
            slot.querySelectorAll(
                ".player-select"
            );


        // ==========================
        // 2人目を追加
        // ==========================

        if (selects.length === 1) {

            const newSelect =
                document.createElement("select");


            newSelect.classList.add(
                "player-select"
            );


            // 初期選択肢
            const defaultOption =
                document.createElement("option");


            defaultOption.textContent =
                "選手を選択";

            defaultOption.value =
                "";


            newSelect.appendChild(
                defaultOption
            );


            // 登録済み選手を追加
            const players =
                playerList.querySelectorAll("li");


            players.forEach(function (player) {

                addPlayerOption(
                    newSelect,
                    player.textContent
                );

            });


            // ボタンの上に追加
            slot.insertBefore(
                newSelect,
                button
            );


            // ＋ → −
            button.textContent = "−";

        }


        // ==========================
        // 2人目を削除
        // ==========================

        else {

            selects[1].remove();


            // − → ＋
            button.textContent = "＋";
        }

    });
}


// ==============================
// フォーメーション変更
// ==============================

formationSelect.addEventListener(
    "change",
    function () {

        const formation =
            formationSelect.value;


        changeFormation(formation);
    }
);


// ==============================
// フォーメーション生成
// ==============================

function changeFormation(formation) {

    // 一旦フィールドを空にする
    formationArea.innerHTML = "";


    // 自由配置モードを解除
    formationArea.classList.remove(
        "free-mode"
    );


    // ==========================
    // 2-3-1
    // ==========================

    if (formation === "2-3-1") {

        createLine(
            ["FW"]
        );

        createLine(
            ["MF", "MF", "MF"]
        );

        createLine(
            ["DF", "DF"]
        );

        createLine(
            ["GK"]
        );
    }


    // ==========================
    // 3-2-1
    // ==========================

    if (formation === "3-2-1") {

        createLine(
            ["FW"]
        );

        createLine(
            ["MF", "MF"]
        );

        createLine(
            ["DF", "DF", "DF"]
        );

        createLine(
            ["GK"]
        );
    }


    // ==========================
    // 3-3-0
    // ==========================

    if (formation === "3-3-0") {

        // FWがない分、上に余白を作る
        createSpacerLine();

        createLine(
            ["MF", "MF", "MF"]
        );

        createLine(
            ["DF", "DF", "DF"]
        );

        createLine(
            ["GK"]
        );
    }


    // ==========================
    // 自由配置
    // ==========================

    if (formation === "free") {

        createFreeFormation();
    }
}


// ==============================
// 通常のラインを作成
// ==============================

function createLine(positions) {

    const line =
        document.createElement("div");


    line.classList.add("line");


    positions.forEach(function (position) {

        const slot =
            createPlayerSlot(position);


        line.appendChild(slot);

    });


    formationArea.appendChild(line);
}


// ==============================
// 空のラインを作成
// ==============================

function createSpacerLine() {

    const line =
        document.createElement("div");


    line.classList.add(
        "line",
        "formation-spacer"
    );


    // 4つのライン構成にするための空行
    line.innerHTML = "&nbsp;";


    formationArea.appendChild(line);
}


// ==============================
// 選手枠を作成
// ==============================

function createPlayerSlot(position) {

    const slot =
        document.createElement("div");


    slot.classList.add("slot");


    // ポジション名
    const positionLabel =
        document.createElement("div");


    positionLabel.textContent =
        position;


    slot.appendChild(
        positionLabel
    );


    // 選手選択
    const select =
        createPlayerSelect();


    slot.appendChild(
        select
    );


    // 交代ボタン
    const substituteButton =
        document.createElement("button");


    substituteButton.classList.add(
        "substitute-button"
    );


    substituteButton.textContent =
        "＋";


    slot.appendChild(
        substituteButton
    );


    // 交代ボタンを有効化
    setupSubstituteButton(
        substituteButton
    );


    return slot;
}


// ==============================
// 選手プルダウン作成
// ==============================

function createPlayerSelect() {

    const select =
        document.createElement("select");


    select.classList.add(
        "player-select"
    );


    // 初期選択肢
    const defaultOption =
        document.createElement("option");


    defaultOption.textContent =
        "選手を選択";

    defaultOption.value =
        "";


    select.appendChild(
        defaultOption
    );


    // 登録済み選手
    const players =
        playerList.querySelectorAll("li");


    players.forEach(function (player) {

        addPlayerOption(
            select,
            player.textContent
        );

    });


    return select;
}


// ==============================
// 自由配置
// ==============================

function createFreeFormation() {

    // 自由配置モード
    formationArea.classList.add(
        "free-mode"
    );


    // フィールドプレイヤー6人
    const positions = [

        { x: 50, y: 20 },

        { x: 30, y: 35 },
        { x: 70, y: 35 },

        { x: 25, y: 55 },
        { x: 50, y: 50 },
        { x: 75, y: 55 }

    ];


    positions.forEach(function (position) {

        createFreePlayer(
            position.x,
            position.y
        );

    });


    // GK
    createFreeGK();
}


// ==============================
// 自由配置の選手
// ==============================

function createFreePlayer(x, y) {

    const player =
        document.createElement("div");


    player.classList.add(
        "free-player"
    );


    player.style.left =
        x + "%";

    player.style.top =
        y + "%";


    // 選手選択
    const select =
        createPlayerSelect();


    player.appendChild(
        select
    );


    // 交代ボタン
    const substituteButton =
        document.createElement("button");


    substituteButton.classList.add(
        "substitute-button"
    );


    substituteButton.textContent =
        "＋";


    player.appendChild(
        substituteButton
    );


    setupSubstituteButton(
        substituteButton
    );


    // ドラッグ処理
    setupDrag(player);


    formationArea.appendChild(
        player
    );
}


// ==============================
// 自由配置のGK
// ==============================

function createFreeGK() {

    const gk =
        document.createElement("div");


    gk.classList.add(
        "free-gk"
    );


    // GKの選手選択
    const select =
        createPlayerSelect();


    gk.appendChild(
        select
    );


    // 交代ボタン
    const substituteButton =
        document.createElement("button");


    substituteButton.classList.add(
        "substitute-button"
    );


    substituteButton.textContent =
        "＋";


    gk.appendChild(
        substituteButton
    );


    setupSubstituteButton(
        substituteButton
    );


    formationArea.appendChild(
        gk
    );
}


// ==============================
// ドラッグ処理
// ==============================

function setupDrag(player) {

    let isDragging = false;


    player.addEventListener(
        "mousedown",
        function (event) {

            // selectやbuttonをクリックした場合は
            // ドラッグを開始しない
            if (
                event.target.tagName === "SELECT" ||
                event.target.tagName === "BUTTON"
            ) {
                return;
            }


            isDragging = true;


            player.classList.add(
                "dragging"
            );

        }
    );


    document.addEventListener(
        "mousemove",
        function (event) {

            if (!isDragging) {
                return;
            }


            const rect =
                formationArea.getBoundingClientRect();


            let x =
                event.clientX - rect.left;


            let y =
                event.clientY - rect.top;


            // フィールド外に出ないようにする
            x = Math.max(
                0,
                Math.min(x, rect.width)
            );


            y = Math.max(
                0,
                Math.min(y, rect.height)
            );


            player.style.left =
                x + "px";

            player.style.top =
                y + "px";

        }
    );


    document.addEventListener(
        "mouseup",
        function () {

            if (!isDragging) {
                return;
            }


            isDragging = false;


            player.classList.remove(
                "dragging"
            );

        }
    );
}


// ==============================
// 初期状態
// ==============================

changeFormation("2-3-1");