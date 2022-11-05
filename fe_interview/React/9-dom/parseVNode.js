function parseVNode(vnode) {
  let type = vnode.type;
  let _node = null;
  if (type == 3) {
    return document.createTextNode(vnode.value);
  } else if (type == 1) {
    _node = document.createElement(vnode.tag);

    let data = vnode.data;
    let attrName, attrValue;
    Object.keys(data).forEach((key) => {
      attrName = key;
      attrValue = data[key];
      _node.setAttribute(attrName, attrValue);
    });
    // 考虑子元素
    let children = vnode.children;
    children.forEach((subvnode) => {
      _node.appendChild(parseVNode(subvnode));
    });
  }
  return _node;
}

let root = querySelector("#root");
let vroot = getVNode(root);
console.log(vroot);
let root1 = parseVNode(vroot);
console.log(root1);
