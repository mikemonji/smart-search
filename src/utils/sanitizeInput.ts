export function sanitizeInput(input: string): string {
  return input.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, '');
}
