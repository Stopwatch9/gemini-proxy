export const config = {
  runtime: 'edge',
  regions: ['iad1'], // 核心关键：强制限定在美国华盛顿节点执行
};

export default async function handler(req) {
  const url = new URL(req.url);
  
  // 去除内部的 /api 前缀，还原 Google 真实的 API 路径
  url.pathname = url.pathname.replace(/^\/api/, '');
  url.host = 'generativelanguage.googleapis.com';

  const newReq = new Request(url.toString(), req);

  // 彻底清除可能暴露 VPS 真实 IP 的请求头
  newReq.headers.delete('x-forwarded-for');
  newReq.headers.delete('x-real-ip');
  newReq.headers.delete('cf-connecting-ip');

  return fetch(newReq);
}
