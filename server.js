const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: { origin: "*" } //どこからでも接続OKにする設定
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("誰かが繋がりました：", socket.id);

  socket.on("send_message", (data) => {
    console.log("メッセージ受信：", data);
    io.emit("receive_message", data); //全員にメッセージを送信
  });

  socket.on("disconnect", () => {
    console.log("誰かが切断しました：", socket.id);
  });
});

const PORT = 3001; // サーバが動くポート番号
http.listen(PORT, () => {
  console.log(`サーバがポート${PORT}で起動しました`);
});
