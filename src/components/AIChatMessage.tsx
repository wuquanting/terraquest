import React, { useEffect } from 'react';
import { Message } from '../types/Message';
import { translateToChineseIfNeeded } from '../utils/ai';

function AIChatMessage({ message }: { message: Message }) {
  // 确保消息内容始终为中文
  useEffect(() => {
    if (message.content && !isChineseContent(message.content)) {
      // 如果内容不是中文，可以在这里调用翻译API
      translateToChineseIfNeeded(message);
    }
  }, [message]);

  return (
    // 现有代码...
  );
}

// 添加辅助函数检查内容是否为中文
function isChineseContent(text: string): boolean {
  const chineseRegex = /[\u4e00-\u9fa5]/;
  return chineseRegex.test(text);
}

export default AIChatMessage; 