console.log("読み込み完了");
const fileList = [];
// ドロップするエリアを取得 クラスがreport-form
const dropArea = document.querySelector(".report-form");
const inputForm = document.querySelector(".form-input-file");

// ドロップエリアの色をページ読み込み時に無条件で薄い赤色に上書き
// ページ読み込み時の動作
window.onload = function () {
  dropArea.style.backgroundColor = "rgba(255, 0, 0, 0.1)";
  const testArea = document.createElement("p");
  testArea.style.backgroundColor = "grey";
  testArea.style.height = "100px";
  testArea.innerText =
    "ドラッグアンドドロップでファイルを追加することができます";
  dropArea.appendChild(testArea);
  // testAreaにondropイベントを追加
  testArea.addEventListener("drop", (e) => {
    dropHandler(e);
  });
  testArea.addEventListener("ondragover", (e) => {
    // ドラッグされた要素がドロップ要素の上にあるときの処理
    e.preventDefault();
  });

  testArea.addEventListener("ondragleave", (e) => {
    // ドラッグされた要素がドロップ要素から外れたときの処理
    e.preventDefault();
  });
};

// testArea.addEventListener("drop", (e) => {
function dropHandler(e) {
  e.preventDefault();

  console.log("イベント発生");
  // 既定の動作で防ぐ（ファイルが開かれないようにする）

  const dt = new DataTransfer();
  const uploaded = e.dt.files;

  // すでにアップロードされているファイルを取得
  fileList.forEach((file) => {
    dt.items.add(file);
  });

  // ドロップしたファイルを取得
  for (let i = 0; i < uploaded.length; i++) {
    dt.items.add(uploaded[i]);
    fileList.push(uploaded[i]);
  }

  // if (e.dt.items) {
  //   // DataTransferItemList インターフェイスを使用して、ファイルにアクセスする
  //   [...e.dt.items].forEach((item, i) => {
  //     // ドロップしたものがファイルでない場合は拒否する
  //     if (item.kind === "file") {
  //       dt.items.add(item.getAsFile());
  //     }
  //   });
  // } else {
  //   // DataTransfer インターフェイスを使用してファイルにアクセスする
  //   [...e.dt.files].forEach((file, i) => {
  //     dt.items.add(file);
  //   });
  // }

  // name.textContent = fileList
  //   .map((file) => {
  //     return file.name;
  //   })
  //   .join();
  // names.appendChild(name);
  inputForm.files = dt.files;
}
