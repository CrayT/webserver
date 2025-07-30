
const ServerAddr = 'ws://127.0.0.1:8080/demo/'


class Client{
    initialize() {
        if (this.websocket_?.readyState === window.WebSocket.OPEN) return;
        this.websocket_ = new window.WebSocket(ServerAddr);
        this.websocket_.binaryType = "arraybuffer";
        this.openTime = Date.now();
        this.websocket_.onerror = this.onError;
        this.websocket_.onmessage = this.onMessage;
        this.websocket_.onopen = this.onOpen.bind(this);
        this.websocket_.onclose = this.onClose;
    }
    onError(e){
        console.log('error', e)
    }
    onMessage(event){
        try{
            const data = JSON.parse(event.data);
            console.log('收到server数据:', data, "延迟：", (Date.now() - data.time) / 1000)
        } catch(e) {
            console.error(e)
        }
        
    }
    onOpen(e){
        console.log('open', e)
        console.time('testSend')
        const a = new ArrayBuffer(123456)
        console.log(a)
        const view = new DataView(a)
        view.setInt16(0, 11)
        this.websocket_.send(a)
        console.timeEnd('testSend')

    }
    onClose(e){
        console.log('close', e)
    }

    send(data){
        console.log('向server发送消息')
        this.websocket_.send(data ? data :'发送测试数据')
    }

}
const client = new Client();

console.log("-----opening----")

client.initialize();
window.client = client;

// setInterval(() => {
//     // testJsRun()
// }, 150)    
