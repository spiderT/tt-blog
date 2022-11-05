// then方法的第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数。

getJSON("/post/1.json").then(
  post => getJSON(post.commentURL)
).then(
  comments => console.log("resolved: ", comments),
  err => console.log("rejected: ", err)
);