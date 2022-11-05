// // var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
// // 扁平化，去重，升序

// var arr1 = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];

// const flat = (arr) => arr.flat(5);

// const v1 = flat(arr1);

// const repeat = (arr) => new Set(arr);

// const v2 = repeat(v1)

// const sort = (arr) => [...arr].sort((a,b) => a - b);

// console.log(v2)

// const v3 = sort(v2)

// console.log('v3', v3)

// // console.log(sort(repeat(flat(arr1))));

// function flat1 (arr) {
//   const result = [];

// }

const a = {
  name: "a",
  children: [
    {
      name: "a11",
      children: [
        {
          name: "a21",
          children: [],
        },
      ],
    },
    {
      name: "a12",
      children: [
        {
          name: "a22",
          children: [
            {
              name: "a31",
              children: [],
            },
          ],
        },
        {
          name: "a23",
          children: [],
        },
      ],
    },
  ],
};

// const getDeps = node=> {
//   let len = 0;
//   node.children.map(item=>{
//     const max = Math.max(...getDeps(item))
//     len = max + 1;
//     return len;
//   })
// }

// https://juejin.cn/post/6882627409393221646
// 广度优先
const breadth = (node) => {
  const result = [];
  const stack = [];
  if (node) {
    stack.push(node);
    while (stack.length) {
      // 队列：取第一个
      const item = stack.shift();
      result.push(item.name);
      const children = item.children;
      for (let i = 0; i < children.length; i++) {
        stack.push(children[i]);
      }
    }
  }
  return result;
};

// 深度
function deepFirstSearch(node) {
  const result = [];
  const stack = [];
  if (node) {
    stack.push(node);
    while (stack.length) {
      //  栈 每次取最后一个
      const item = stack.pop();
      result.push(item.name);
      const children = item.children;
      for (let i = children.length - 1; i >= 0; i--) {
        stack.push(children[i]);
      }
    }
  }
  return result;
}

console.log(deepFirstSearch(a));
