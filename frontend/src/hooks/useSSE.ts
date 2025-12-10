import { useState, useCallback, useRef } from 'react';
import type { SSEData } from '../types';

interface UseSSEOptions {
  onMessage?: (content: string) => void;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

export function useSSE(options: UseSSEOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');
  const eventSourceRef = useRef<EventSource | null>(null);

  const start = useCallback((message: string) => {
    // 关闭之前的连接
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    setIsLoading(true);
    setContent('');

    const encodedMessage = encodeURIComponent(message);
    const eventSource = new EventSource(`/api/chat?message=${encodedMessage}`);
    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      try {
        const data: SSEData = JSON.parse(event.data);

        if (data.done) {
          eventSource.close();
          setIsLoading(false);
          options.onComplete?.();
          return;
        }

        setContent(prev => {
          const newContent = prev + data.content;
          options.onMessage?.(newContent);
          return newContent;
        });
      } catch (error) {
        console.error('Failed to parse SSE data:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      eventSource.close();
      setIsLoading(false);
      options.onError?.(new Error('SSE connection failed'));
    };
  }, [options]);

  const stop = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    content,
    start,
    stop,
  };
}
