import { useState, useCallback } from 'react';
import type { Message } from '../types';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { useSSE } from '../hooks/useSSE';

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);

  const updateAssistantMessage = useCallback((content: string) => {
    setMessages(prev => {
      const lastMessage = prev[prev.length - 1];
      if (lastMessage?.role === 'assistant' && lastMessage.isStreaming) {
        return [
          ...prev.slice(0, -1),
          { ...lastMessage, content }
        ];
      }
      return prev;
    });
  }, []);

  const { isLoading, start, stop } = useSSE({
    onMessage: updateAssistantMessage,
    onComplete: () => {
      setMessages(prev => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage?.role === 'assistant') {
          return [
            ...prev.slice(0, -1),
            { ...lastMessage, isStreaming: false }
          ];
        }
        return prev;
      });
    },
  });

  const handleSend = (content: string) => {
    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
    };

    // 添加空的 AI 消息（准备接收流式内容）
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      isStreaming: true,
    };

    setMessages(prev => [...prev, userMessage, assistantMessage]);

    // 开始 SSE 请求
    start(content);
  };

  const handleStop = () => {
    stop();
    setMessages(prev => {
      const lastMessage = prev[prev.length - 1];
      if (lastMessage?.role === 'assistant') {
        return [
          ...prev.slice(0, -1),
          { ...lastMessage, isStreaming: false }
        ];
      }
      return prev;
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-700 px-6 py-4 bg-gray-800">
        <h1 className="text-xl font-semibold text-white text-center">
          AI Chat - SSE 流式对话
        </h1>
      </header>

      {/* Message List */}
      <MessageList messages={messages} />

      {/* Input */}
      <ChatInput
        onSend={handleSend}
        disabled={isLoading}
        onStop={handleStop}
      />
    </div>
  );
}
