export default {
    port: 8000,
    nodeResolve: true, // 解决你之前提到的 node_modules 导入问题
    
    // 使用中间件拦截请求并修改 Header
    middlewares: [
      (context, next) => {
        // 检查请求的文件是否以 .br 结尾
        if (context.url.endsWith('.br')) {
          // 1. 设置压缩类型为 br
          context.set('Content-Encoding', 'br');
          
          // 2. 修正 Content-Type（否则浏览器可能将其识别为下载文件）
          // 如果是 JS 的压缩包
          if (context.url.endsWith('.js.br')) {
            context.set('Content-Type', 'application/javascript');
          } 
          // 如果是 JSON 的压缩包
          else if (context.url.endsWith('.json.br')) {
            context.set('Content-Type', 'application/json');
          }
        }
        return next();
      },
    ],
  };
  