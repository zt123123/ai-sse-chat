# AI SSE Chat

基于 SSE (Server-Sent Events) 技术的类 ChatGPT 聊天应用，支持流式输出和富文本渲染。

## 技术栈

- **前端**: React + TypeScript + Vite + Tailwind CSS
- **后端**: Node.js + Express + TypeScript
- **富文本**: react-markdown + react-syntax-highlighter

## 功能特性

- SSE 流式输出（打字机效果）
- Markdown 渲染
- 代码语法高亮（支持多种编程语言）
- 图片展示
- 表格、引用、列表等富文本支持

## 环境要求

- Node.js >= 18.0.0 (推荐 LTS 版本)
- npm >= 8.0.0

## 快速开始

### 1. 安装依赖

```bash
# 安装所有依赖
npm run install:all
```

### 2. 启动开发服务器

```bash
# 同时启动前后端
npm run dev
```

或者分别启动：

```bash
# 启动后端 (端口 3001)
cd backend && npm run dev

# 启动前端 (端口 5173)
cd frontend && npm run dev
```

### 3. 访问应用

打开浏览器访问: http://localhost:5173

## 测试功能

在聊天框中输入以下关键词查看不同效果：

- 输入「代码」或「算法」：查看代码高亮效果
- 输入「markdown」或「表格」：查看 Markdown 渲染效果
- 输入「图片」：查看图片展示效果
- 其他内容：显示默认问候

## 项目结构

```
ai-sse/
├── backend/                 # 后端项目
│   ├── src/
│   │   ├── index.ts         # 入口文件
│   │   ├── routes/
│   │   │   └── chat.ts      # SSE 聊天接口
│   │   └── utils/
│   │       └── mockData.ts  # 模拟数据
│   └── package.json
│
├── frontend/                # 前端项目
│   ├── src/
│   │   ├── components/      # React 组件
│   │   │   ├── Chat.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   ├── MessageList.tsx
│   │   │   ├── MessageItem.tsx
│   │   │   └── MarkdownRenderer.tsx
│   │   ├── hooks/
│   │   │   └── useSSE.ts    # SSE Hook
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
│
└── package.json             # 根目录配置
```

## SSE 接口说明

### GET /api/chat

流式返回 AI 回复内容。

**请求参数**:
- `message`: 用户消息内容

**响应格式** (text/event-stream):
```
data: {"content": "H", "done": false}
data: {"content": "i", "done": false}
...
data: {"content": "", "done": true}
```

## 扩展开发

如需接入真实 AI API (如 OpenAI)，修改 `backend/src/routes/chat.ts` 中的逻辑，将模拟数据替换为实际 API 调用即可。
