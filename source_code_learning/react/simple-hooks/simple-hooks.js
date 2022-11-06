let isMount = true; // 区分组件是mount，还是update
let workInProgressHook = null; // 指针

const fiber = {
  stateNode: App,
  memozedState: null,
};

function useState(initialState) {
  let hook;
  if (isMount) {
    hook = {
      memozedState: initialState,
      next: null,
      queue: {
        pending: null,
      },
    };
    if (!fiber.memozedState) {
      fiber.memozedState = hook;
    } else {
      workInProgressHook.next = hook;
    }
    workInProgressHook = hook;
  } else {
    hook = workInProgressHook;
    workInProgressHook = workInProgressHook.next;
  }

  let baseState = hook.memozedState;
  if (hook.queue.pending) {
    let firstUpdate = hook.queue.pending.next;

    do {
      const action = firstUpdate.action;
      baseState = action(baseState);
      firstUpdate = firstUpdate.next;
    } while (firstUpdate !== hook.queue.pending.next);

    hook.queue.pending = null;
  }

  hook.memozedState = baseState;
  return [baseState, dispatchAction.bind(null, hook.queue)];
}

function dispatchAction(queue, action) {
  const update = {
    action,
    next: null,
  };

  if (queue.pending === null) {
    // 环状链表
    // u0->u0->u0
    update.next = update;
  } else {
    // u1->u0->u1
    update.next = queue.pending.next;
    queue.pending.next = update;
  }
  queue.pending = update;
  schedule();
}

function schedule() {
  workInProgressHook = fiber.memozedState;
  const app = fiber.stateNode();
  isMount = false;
  return app;
}

function App() {
  const [num, updateNum] = useState(0);
  const [num1, updateNum1] = useState(1);
  const [num2, updateNum2] = useState(1);
  console.log("isMount--->", isMount);
  console.log("num--->", num);
  console.log("num1--->", num1);
  console.log("num2--->", num2);

  return {
    handle() {
      updateNum((num) => num + 1);
    },
    handle1() {
      updateNum1((num) => num * 2);
    },
    handle2() {
      updateNum2((num) => num * 3);
    },
  };
}

window.app = schedule();
