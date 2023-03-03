'use strict';
window.onload = function () {
  // コンストラクタ作成
  function coffeeCard(kind) {
    this.kind = kind;
    this.front;
    this.setFront = function () {
      this.front = `${this.kind}.jpeg`;
    };
  }
  // カード配列作成
  const coffeeCards = [];
  const kinds1 = ['bor', 'hon', 'ken', 'per'];
  const kinds2 = ['bor', 'hon', 'ken', 'per'];
  for (let i = 0; i < kinds1.length; i++) {
    let card = new coffeeCard(kinds1[i]);
    card.setFront();
    coffeeCards.push(card);
  }
  for (let i = 0; i < kinds2.length; i++) {
    let card = new coffeeCard(kinds2[i]);
    card.setFront();
    coffeeCards.push(card);
  }
  // カードシャッフル;
  function shuffle() {
    let i = coffeeCards.length;
    while (i) {
      let index = Math.floor(Math.random() * i--);
      var temp = coffeeCards[index];
      coffeeCards[index] = coffeeCards[i];
      coffeeCards[i] = temp;
    }
  }
  shuffle();
  // floorは与えられた引数の数値以下の最大の整数を返す
  // randomは０以上１未満の範囲で浮動小数店の値をランダムで返す
  // 上記二つを使うことでCard[0]~Card[51]までのインスタンスを取得できるようなる
  // i はトランプの枚数(Cardインスタンスの数)なので52
  // i-- で次の繰り返し時に51.50.49...とすることで同じCardインスタンスを取得しないようにしている
  // テーブル作成
  // const table = document.getElementById('table');
  const container = document.getElementById('container');
  // let tr = document.createElement('tr');
  for (let i = 0; i < coffeeCards.length; i++) {
    // let td = document.createElement('td');
    let item = document.createElement('div');
    item.classList.add('item', 'card', 'back');
    let tempCard = coffeeCards[i];
    // td.classList.add('card', 'back');
    item.onclick = flip;
    item.kind = tempCard.kind;
    item.style.backgroundImage = `url(images/${tempCard.front})`;
    container.appendChild(item);
    // td.onclick = flip;
    // td.kind = tempCard.kind;
    // td.style.backgroundImage = `url(images/${tempCard.front})`;
    // tr.appendChild(td);
  }
  // table.appendChild(tr);
  let firstCard = null;
  let flipTimerId = NaN;
  function flip(evt) {
    let item = evt.target;
    if (!item.classList.contains('back') || flipTimerId) {
      return;
    }
    item.classList.remove('back');
    if (firstCard === null) {
      firstCard = item;
    } else {
      if (firstCard.kind === item.kind) {
        document.getElementById('true').play();
        firstCard = null;
      } else {
        flipTimerId = setTimeout(function () {
          document.getElementById('false').play();
          firstCard.classList.add('back');
          item.classList.add('back');
          flipTimerId = NaN;
          firstCard = null;
        }, 1200);
      }
    }
  }
};
