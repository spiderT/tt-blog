// 排名方法
const A = {
  score: 10,
  changeTo: function (score) {
    this.score = score;
    // 通过中介者获取
    rankMediator(A);
  },
};

const B = {
  score: 20,
  changeTo: function (score) {
    this.score = score;
    rankMediator(B);
  },
};

const C = {
  score: 30,
  changeTo: function (score) {
    this.score = score;
    rankMediator(C);
  },
};

// 中介者，计算排名
function rankMediator(person) {
  const scores = [A.score, B.score, C.score].sort(function (a, b) {
    return a < b;
  });
  console.log(scores.indexOf(person.score) + 1, scores);
}

A.changeTo(100); // 1 [ 100, 30, 20 ]
B.changeTo(200); // 1 [ 200, 100, 30 ]
C.changeTo(50); // 3 [ 200, 100, 50 ]
