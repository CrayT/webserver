
const socket = require('ws');

const server = new socket.Server({port: 8082, path: '/demo/',verifyClient: (info, callback) => {
  // 鉴权：可以在此处检查请求头 (Cookie, Token)
  // callback(true) 允许，callback(false) 拒绝
  callback(true)
}, });

server.on('connection', (socket) => {
    console.log('Client connected');
  
    // 处理收到的消息
    socket.on('message', (data, isBuffer) => {
      console.log(`Received:`,  data, isBuffer, );
      // 在此处添加处理消息的逻辑
      if(isBuffer) {
        const decoder = new TextDecoder();
        const origin = decoder.decode(new Uint8Array(data))
        console.log('--',origin)
      }
    });

    // 处理连接关闭
    socket.on('close', () => {
      console.log('Client disconnected');
    });
  });