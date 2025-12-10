// 模拟 AI 回复的富文本内容
export const mockResponses: Record<string, string> = {
  default: `你好！我是一个 AI 助手，很高兴为你服务。

我可以帮你：
- 回答问题
- 编写代码
- 解释概念

有什么我可以帮助你的吗？`,

  code: `好的，让我给你展示一个 **JavaScript** 的快速排序算法实现：

\`\`\`javascript
function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);

  return [...quickSort(left), ...middle, ...quickSort(right)];
}

// 使用示例
const numbers = [3, 6, 8, 10, 1, 2, 1];
console.log(quickSort(numbers)); // [1, 1, 2, 3, 6, 8, 10]
\`\`\`

这个实现的**时间复杂度**：
- 平均情况：O(n log n)
- 最坏情况：O(n²)

还有 **Python** 版本：

\`\`\`python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr

    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    return quick_sort(left) + middle + quick_sort(right)

# 使用示例
numbers = [3, 6, 8, 10, 1, 2, 1]
print(quick_sort(numbers))  # [1, 1, 2, 3, 6, 8, 10]
\`\`\`

希望这个例子对你有帮助！`,

  markdown: `# Markdown 示例

这是一段展示 **Markdown** 渲染能力的文本。

## 列表示例

### 无序列表
- 第一项
- 第二项
  - 嵌套项目 A
  - 嵌套项目 B
- 第三项

### 有序列表
1. 步骤一
2. 步骤二
3. 步骤三

## 表格示例

| 功能 | 状态 | 描述 |
|------|------|------|
| SSE 流式输出 | ✅ | 已实现 |
| Markdown 渲染 | ✅ | 已实现 |
| 代码高亮 | ✅ | 已实现 |

## 引用

> 这是一段引用文本。
> 可以包含多行内容。

## 图片示例

这里展示一张示例图片：

![示例图片](https://via.placeholder.com/400x200/4F46E5/FFFFFF?text=AI+SSE+Chat)

## 代码块

行内代码：\`const x = 1;\`

代码块：
\`\`\`typescript
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}
\`\`\`

以上就是 Markdown 的各种渲染效果！`,

  image: `当然可以！这里有一些精美的图片展示：

## 风景图片

![山脉风景](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop)

*这是一张美丽的山脉风景照*

## 城市夜景

![城市夜景](https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&h=400&fit=crop)

## 技术图表

还可以展示技术相关的图片：

![代码示意图](https://via.placeholder.com/500x300/1F2937/10B981?text=Code+Visualization)

图片可以和文字、代码混合展示，实现丰富的图文混排效果。`
};

// 根据用户输入选择合适的回复
export function selectResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('代码') || lowerMessage.includes('code') || lowerMessage.includes('排序') || lowerMessage.includes('算法')) {
    return mockResponses.code;
  }

  if (lowerMessage.includes('markdown') || lowerMessage.includes('格式') || lowerMessage.includes('表格')) {
    return mockResponses.markdown;
  }

  if (lowerMessage.includes('图片') || lowerMessage.includes('image') || lowerMessage.includes('图')) {
    return mockResponses.image;
  }

  return mockResponses.default;
}
