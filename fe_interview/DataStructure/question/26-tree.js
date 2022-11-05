//二叉搜索树结构(BST)
function BinarySearchTree() {
  //每一个节点的数据结构
  function Node(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
  this.root = null;
  //向树中插入值
  this.insert = function (key) {
    var node = new Node(key);
    if (this.root === null) {
      this.root = node;
    } else {
      this.insertNode(this.root, node);
    }
  };
  //插入节点辅助函数
  this.insertNode = function (node, newNode) {
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  };
  //先序遍历 根左右
  this.preOrder = function (node, res = []) {
    if (node !== null) {
      res.push(node.key);
      this.preOrder(node.left, res);
      this.preOrder(node.right, res);
      return res;
    }
  };
  //中序遍历 左根右
  this.inOrder = function (node, res = []) {
    if (node !== null) {
      this.inOrder(node.left, res);
      res.push(node.key);
      this.inOrder(node.right, res);
      return res;
    }
  };
  //后序遍历 左右根
  this.postOrder = function (node, res = []) {
    if (node !== null) {
      this.postOrder(node.left, res);
      this.postOrder(node.right, res);
      res.push(node.key);
      return res;
    }
  };
  //查找树中最大值
  this.min = function (node) {
    if (node) {
      while (node && node.left) {
        node = node.left;
      }
      return node.key;
    }
    return null;
  };
  //查找树中的最大值
  this.max = function (node) {
    if (node) {
      while (node && node.right) {
        node = node.right;
      }
      return node.key;
    }
    return null;
  };
  //查找一个特定的值
  this.search = function (key) {
    return this.searchNode(this.root, key);
  };
  //查找一个特定的值的辅助函数
  this.searchNode = function (node, key) {
    if (node === null) {
      return false;
    }
    if (node.key === key) {
      return true;
    }
    if (node.key < key) {
      return this.searchNode(node.right, key);
    }
    if (node.key > key) {
      return this.searchNode(node.left, key);
    }
  };
  //移除某一个节点
  this.remove = function (key) {
    this.root = this.removeNode(this.root, key);
  };
  this.removeNode = function (node, key) {
    if (node === null) {
      return null;
    }
    if (node.key < key) {
      this.removeNode(node.right, key);
    } else if (node.key > key) {
      this.removeNode(node.left, key);
    } else {
      if (node.left === null && node.right === null) {
        return null;
      } else if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      } else {
        var tempNode = this.findMinNode(node.right);
        node.key = tempNode.key;
        node.right = this.removeNode(node.right, tempNode.key);
        return node;
      }
    }
  };
  this.findMinNode = function (node) {
    while (node && node.left) {
      node = node.left;
    }
    return node;
  };

  // 二叉树翻转: 如果根节点不为空，左右节点交换
  this.invertTree = function (root) {
    if (root !== null) {
      [root.left, root.right] = [root.right, root.left];
      invertTree(root.left);
      invertTree(root.right);
    }
    return root;
  };
}
var tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);
console.log(tree.preOrder(tree.root));
console.log(tree.inOrder(tree.root));
console.log(tree.postOrder(tree.root));
console.log(tree.min(tree.root));
console.log(tree.max(tree.root));
