import { Router, Request, Response } from 'express';
import { selectResponse } from '../utils/mockData.js';

const router = Router();

// SSE 聊天接口
router.get('/chat', async (req: Request, res: Response) => {
  const message = req.query.message as string;

  if (!message) {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  // 设置 SSE 响应头
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // 获取回复内容
  const responseText = selectResponse(message);

  // 模拟流式输出 - 逐字符发送
  const chars = [...responseText];

  for (let i = 0; i < chars.length; i++) {
    // 检查客户端是否断开连接
    if (res.writableEnded) {
      return;
    }

    const chunk = chars[i];
    const data = JSON.stringify({ content: chunk, done: false });
    res.write(`data: ${data}\n\n`);

    // 模拟打字延迟 - 随机 20-50ms
    await delay(Math.random() * 30 + 20);
  }

  // 发送完成标识
  res.write(`data: ${JSON.stringify({ content: '', done: true })}\n\n`);
  res.end();
});

// POST 方式的 SSE 接口（用于发送较长的消息）
router.post('/chat', async (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message) {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  // 设置 SSE 响应头
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // 获取回复内容
  const responseText = selectResponse(message);

  // 模拟流式输出
  const chars = [...responseText];

  for (let i = 0; i < chars.length; i++) {
    if (res.writableEnded) {
      return;
    }

    const chunk = chars[i];
    const data = JSON.stringify({ content: chunk, done: false });
    res.write(`data: ${data}\n\n`);

    await delay(Math.random() * 30 + 20);
  }

  res.write(`data: ${JSON.stringify({ content: '', done: true })}\n\n`);
  res.end();
});

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default router;
