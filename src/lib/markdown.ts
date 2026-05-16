export const preprocessLaTeX = (content: string): string => {
  if (!content) return ''

  let processed = content.replace(
    /\\\[([\s\S]*?)\\\]/g,
    (_, equation) => `$$${equation.trim()}$$`,
  )

  processed = processed.replace(
    /\\\(([\s\S]*?)\\\)/g,
    (_, equation) => `$${equation.trim()}$`,
  )

  return processed
}
