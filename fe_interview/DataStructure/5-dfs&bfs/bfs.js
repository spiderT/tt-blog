// 查找dom节点
// 递归版本
function breadthFirstSearch(node) {
  var nodes = [];
  var i = 0;
  if (!(node == null)) {
    nodes.push(node);
    breadthFirstSearch(node.nextElementSibling);
    node = nodes[i++];
    breadthFirstSearch(node.firstElementChild);
  }
  return nodes;
}

// 非递归版本
function breadthFirstSearch(node) {
  var nodes = [];
  var queue = [];
  if (node != null) {
    queue.unshift(node); // 开始位置插入
    while (queue.length != 0) {
      var item = queue.shift(); // 删除第一个元素
      nodes.push(item);
      var children = item.children;
      for (var i = 0; i < children.length; i++) queue.push(children[i]);
    }
  }
  return nodes;
}
