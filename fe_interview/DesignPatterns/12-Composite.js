// 使用组合模式来实现扫描文件夹中的文件

// 文件夹 组合对象
function Folder(name) {
  this.name = name;
  this.parent = null;
  this.files = [];
}

Folder.prototype = {
  constructor: Folder,

  add(file) {
    file.parent = this;
    this.files.push(file);

    return this;
  },

  scan() {
    // 委托给叶对象处理
    for (const i = 0; i < this.files.length; ++i) {
      this.files[i].scan();
    }
  },

  remove(file) {
    if (typeof file === "undefined") {
      this.files = [];
      return;
    }

    for (const i = 0; i < this.files.length; ++i) {
      if (this.files[i] === file) {
        this.files.splice(i, 1);
      }
    }
  },
};

// 文件 叶对象
function File(name) {
  this.name = name;
  this.parent = null;
}

File.prototype = {
  constructor: File,

  add() {
    console.log("文件里面不能添加文件");
  },

  scan() {
    const name = [this.name];
    const parent = this.parent;
    while (parent) {
      name.unshift(parent.name);
      parent = parent.parent;
    }

    console.log(name.join(" / "));
  },
};

const web = new Folder('Web');
const fe = new Folder('前端');
const css = new Folder('CSS');
const js = new Folder('js');
const rd = new Folder('后端');

web.add(fe).add(rd);

const file1 = new File('HTML权威指南.pdf');
const file2 = new File('CSS权威指南.pdf');
const file3 = new File('JavaScript权威指南.pdf');
const file4 = new File('MySQL基础.pdf');
const file5 = new File('Web安全.pdf');
const file6 = new File('Linux菜鸟.pdf');

css.add(file2);
fe.add(file1).add(file3).add(css).add(js);
rd.add(file4).add(file5);
web.add(file6);

rd.remove(file4);

// 扫描
web.scan();
