function IncrementCommand() {
  this.val = 0; // 当前值
  this.stack = []; // 命令栈
  this.stackPosition = -1; // 栈指针位置
}

IncrementCommand.prototype = {
  constructor: IncrementCommand,

  // 执行
  execute() {
    this.clearRedo();

    // 定义执行的处理
    const command = () => (this.val += 1);

    // 执行并缓存起来
    command();
    this.stack.push(command);
    this.stackPosition++;
    this.getValue();
  },

  canUndo() {
    return this.stackPosition >= 0;
  },

  canRedo() {
    return this.stackPosition < this.stack.length - 1;
  },

  // 撤销
  undo() {
    if (!this.canUndo()) {
      return;
    }
    this.stackPosition--;
    // 命令的撤销，与执行的处理相反
    const command = () => (this.val -= 1);
    // 撤销后不需要缓存
    command();
    this.getValue();
  },

  // 重做
  redo() {
    if (!this.canRedo()) {
      return;
    }

    // 执行栈顶的命令
    this.stack[++this.stackPosition]();
    this.getValue();
  },

  // 在执行时，已经撤销的部分不能再重做
  clearRedo() {
    this.stack = this.stack.slice(0, this.stackPosition + 1);
  },

  // 获取当前值
  getValue() {
    console.log(this.val);
  },
};

const incrementCommand = new IncrementCommand();

// 模拟事件触发，执行命令
const eventTrigger = {
  // 某个事件的处理中，直接调用命令的处理方法
  increment: function () {
    incrementCommand.execute();
  },

  incrementUndo: function () {
    incrementCommand.undo();
  },

  incrementRedo: function () {
    incrementCommand.redo();
  },
};

eventTrigger["increment"](); // 1
eventTrigger["increment"](); // 2
eventTrigger["incrementUndo"](); // 1
eventTrigger["increment"](); // 2
eventTrigger["incrementUndo"](); // 1
eventTrigger["incrementUndo"](); // 0
eventTrigger["incrementUndo"](); // 无输出
eventTrigger["incrementRedo"](); // 1
eventTrigger["incrementRedo"](); // 2
eventTrigger["incrementRedo"](); // 无输出
eventTrigger["increment"](); // 3
