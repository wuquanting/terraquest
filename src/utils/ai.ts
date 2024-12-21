// 添加新的工具函数来处理AI响应的语言
export async function translateToChineseIfNeeded(message: Message) {
  try {
    // 这里可以集成翻译API
    // 例如使用Google Translate API或其他翻译服务
    const translatedContent = await translateToChineseAPI(message.content);
    message.content = translatedContent;
  } catch (error) {
    console.error('Translation failed:', error);
  }
}

// 在发送到AI之前设置语言偏好
export function prepareAIRequest(prompt: string) {
  return {
    ...prompt,
    systemMessage: "请用中文回答所有问题。" + (prompt.systemMessage || "")
  };
} 