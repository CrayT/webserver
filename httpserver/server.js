const express = require('express');
const cors = require('cors');
const app = express();
const port = 3002;

const duration = 91000;
let current = 0;
setInterval(() => {
    current += 2000;
    if(current > duration) {
        current = 0;
    }
}, 1000);

app.use(cors()); // 允许所有域的跨域请求
app.get('/state', (req, res) => {
    console.log('state')
    const flag =  Math.random() < 0.5 ? -1 : 1;
    setTimeout(() => {
        res.send({
            detail: {
                currentMs: current + flag * Math.random() * 200,
                startMs: 0,
                endMs: duration,
            },
            result: true,
        });
    }, 100)
});

app.listen(port, () => {
  console.log(`服务器正在监听端口 ${port}`);
});