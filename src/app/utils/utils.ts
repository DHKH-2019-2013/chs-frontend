export function getCode(column: number, row: number): string {
  return `${String.fromCharCode(column)}${row}`;
}
