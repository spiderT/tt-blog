class VNode {
  constructor(tag) {
    this.tag = tag && tag.toLowerCase();
    this.children = [];
  }
  appendChild(vnode) {
    this.children.push(vnode);
  }
}

function getVNode(node) {
  // https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType
  let nodeType = node.nodeType;
  let _vnode = null;
  // 1 一个 元素 节点，例如 <p> 和 <div>。
  if (nodeType == 1) {
    let tag = node.nodeName;
    _vnode = new VNode(tag);
    let childNodes = node.childNodes;
    for (let i = 0, len = childNodes.length; i < len; i++) {
      _vnode.appendChild(getVNode(childNodes[i]));
    }
  }
  return _vnode;
}

let root = document.querySelector("#root");
let vroot = getVNode(root);
console.log(vroot);
