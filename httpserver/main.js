console.log('123')
import brotliPromise from 'brotli-wasm';
// fetch('./public/hmi_80.hmi');

async function test() {
    // const d = await fetch("./public/hmi_80.hmi.br");
    // const tt = await d.text(); // 浏览器自动解压br后，就是解压后的原始文件
    // console.log(tt)

    return;
    // 浏览器没有解压时的处理
    const text = await d.arrayBuffer();
    console.log(text)
    const brotli = await brotliPromise;
    console.time('brotli')
    const result = await brotli.decompress(new Uint8Array(text));
    console.timeEnd('brotli')
    console.log(result)
    // 如果是文本（如 JSON 字符串），进行转码
    const text1 = new TextDecoder().decode(result);
    console.log(text1)

}
test();