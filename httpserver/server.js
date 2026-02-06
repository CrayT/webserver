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

/** 设置浏览器缓存策略
 * 强缓存：过期时间内 不会向服务器发送请求，从浏览器缓存获取资源
 * 协商缓存：向服务器发送请求，如果资源未改变，则返回304状态码，从浏览器缓存获取资源，如果资源改变过，重新发送资源到客户端
1, max-age, 过期时间，缓存在本地，单位秒，刷新请求后开始计时，计时内不再重新请求，过时后重新请求
2, no-cache, 不强缓存，每次请求都重新发起请求
3, no-store, 不强缓存，不协商缓存
 */
/**
 * 缓存位置：内存缓存，磁盘缓存
 * 1，内存缓存快于磁盘缓存，浏览器查找顺序：内存缓存 -> 磁盘缓存 -> 网络请求
 * 2，js异步资源 如果异步加载时浏览器渲染进程还未结束，可能会被存入内存缓存
 *  (表现不一定，本地测试有时候会存入磁盘缓存，长时间未刷新 可能会磁盘缓存，再次频繁刷新可能是内存缓存，要看浏览器缓存策略)
 * 3，css资源被磁盘缓存的概率较大
 */
app.use( function(req, res, next) {
    res.setHeader("Cache-Control", "max-age=5"); //no-cache,max-age=5
    next();
});

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

// 设置一个静态资源
app.use('/p', express.static('public'));


app.listen(port, () => {
  console.log(`服务器正在监听端口 ${port}`);
});