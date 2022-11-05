class VNode {
  constructor(tag, data, value, type) {
    this.tag = tag && tag.toLowerCase();
    this.data = data;
    this.value = value;
    this.type = type;
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
    let attrs = node.attributes;
    let _data = {};
    for (let i = 0, len = attrs.length; i < len; i++) {
      _data[attrs[i].nodeName] = attrs[i].nodeValue;
    }
    _vnode = new VNode(tag, _data, undefined, nodeType);

    let childNodes = node.childNodes;
    for (let i = 0, len = childNodes.length; i < len; i++) {
      _vnode.appendChild(getVNode(childNodes[i]));
    }
  } else if (nodeType == 3) {
    // 3 Element 或者 Attr 中实际的  文字
    _vnode = new VNode(undefined, undefined, node.nodeValue, nodeType);
  }
  return _vnode;
}

let root = document.querySelector("#root");
let vroot = getVNode(root);
console.log(vroot);
