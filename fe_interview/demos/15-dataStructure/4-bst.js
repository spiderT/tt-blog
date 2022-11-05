// 二分搜索树
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
class BST {
  constructor() {
    this.root = null;
    this.size = 0;
  }
  getSize() {
    return this.size;
  }
  isEmpty() {
    return this.size === 0;
  }
  addNode(v) {
    this.root = this._addChild(this.root, v);
  }
  // 添加节点时，需要比较添加的节点值和当前
  // 节点值的大小
  _addChild(node, v) {
    if (!node) {
      this.size++;
      return new Node(v);
    }
    if (node.value > v) {
      node.left = this._addChild(node.left, v);
    } else if (node.value < v) {
      node.right = this._addChild(node.right, v);
    }
    return node;
  }

  // 先序遍历可用于打印树的结构
  // 先序遍历先访问根节点，然后访问左节点，最后访问右节点。
  preTraversal() {
    this._pre(this.root);
  }
  _pre(node) {
    if (node) {
      console.log(node.value);
      this._pre(node.left);
      this._pre(node.right);
    }
  }
  // 中序遍历可用于排序
  // 对于 BST 来说，中序遍历可以实现一次遍历就得到有序的值
  // 中序遍历表示先访问左节点，然后访问根节点，最后访问右节点。
  midTraversal() {
    this._mid(this.root);
  }
  _mid(node) {
    if (node) {
      this._mid(node.left);
      console.log(node.value);
      this._mid(node.right);
    }
  }
  // 后序遍历可用于先操作子节点, 再操作父节点的场景
  // 后序遍历表示先访问左节点，然后访问右节点，最后访问根节点。
  backTraversal() {
    this._back(this.root);
  }
  _back(node) {
    if (node) {
      this._back(node.left);
      this._back(node.right);
      console.log(node.value);
    }
  }

  // 在树中寻找最小值或最大数, 因为二分搜索树的特性，所以最小值一定在根节点的最左边，最大值相反
  getMin() {
    return this._getMin(this.root).value;
  }
  _getMin(node) {
    if (!node.left) return node;
    return this._getMin(node.left);
  }
  getMax() {
    return this._getMax(this.root).value;
  }
  _getMax(node) {
    if (!node.right) return node;
    return this._getMin(node.right);
  }

  /**
   删除节点。因为对于删除节点来说，会存在以下几种情况
   需要删除的节点没有子树
   需要删除的节点只有一条子树
   需要删除的节点有左右两条树
  */

  // 除最小节点
  delectMin() {
    this.root = this._delectMin(this.root);
    console.log(this.root);
  }
  _delectMin(node) {
    // 一直递归左子树
    // 如果左子树为空，就判断节点是否拥有右子树
    // 有右子树的话就把需要删除的节点替换为右子树
    if ((node != null) & !node.left) return node.right;
    node.left = this._delectMin(node.left);
    // 最后需要重新维护下节点的 `size`
    node.size = this._getSize(node.left) + this._getSize(node.right) + 1;
    return node;
  }
}
