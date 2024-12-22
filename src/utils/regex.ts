export const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/

function formatBotResponse(responseText: string): string {
  const formattedText: string = responseText
    .replace(/\*([^*]+)\*/g, '<b>$1</b>')
    .replace(/\n/g, '<br>')
    .replace(/^\s*\*\s+/gm, '<ul><li>')
    .replace(/\*+$/, '</li></ul>')

  return formattedText
}
