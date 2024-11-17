export const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/

function formatBotResponse(responseText: string): string {
  const formattedText: string = responseText
    .replace(/\*([^*]+)\*/g, '<b>$1</b>') // In đậm các từ trong dấu *
    .replace(/\n/g, '<br>') // Thêm ngắt dòng
    .replace(/^\s*\*\s+/gm, '<ul><li>') // Thêm danh sách
    .replace(/\*+$/, '</li></ul>') // Đóng thẻ ul

  return formattedText
}
