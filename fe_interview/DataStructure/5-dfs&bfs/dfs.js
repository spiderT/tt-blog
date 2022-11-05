// 查找dom节点
// 递归版本
function deepFirstSearch(node, nodeList = []) {
  if (node) {
    nodeList.push(node);
    const children = node.children;
    for (let i = 0; i < children.length; i++)
      //每次递归的时候将 需要遍历的节点 和 节点所存储的数组传下去
      deepFirstSearch(children[i], nodeList);
  }
  return nodeList;
}

// 非递归版本
function deepFirstSearch(node) {
  const nodes = [];
  if (node != null) {
    const stack = [];
    stack.push(node);
    while (stack.length != 0) {
      const item = stack.pop();
      nodes.push(item);
      const children = item.children;
      for (let i = children.length - 1; i >= 0; i--) stack.push(children[i]);
    }
  }
  return nodes;
}
