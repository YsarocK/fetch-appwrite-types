const normalizeContent = (content: string) =>
  content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n');

export default normalizeContent;