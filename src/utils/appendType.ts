import { createWriteStream, readFileSync } from 'fs';

const appendType = (type: string, filePath: string) => new Promise<void>((resolve) => {
  const writeStream = createWriteStream(filePath, { flags: 'a' });
  const getTypeFile = readFileSync(`./src/types/fields/${type}.ts`, 'utf8');
  writeStream.write(`${getTypeFile}\r\n\r\n`, () => { resolve() })
})

export default appendType