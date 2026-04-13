export function toSentenceCase(str: string, toUPPER: boolean = true): string {
  if (!str) return '';

  let result = str.replace(/[-_]/g, ' ');

  result = result.replace(/([a-z])([A-Z])/g, '$1 $2');

  result = result.toLowerCase();
  result = result.charAt(0).toUpperCase() + result.slice(1);

  result = result.replace(/\s+/g, ' ').trim();

  if(toUPPER) {
    result = result.toUpperCase();
  }
  return result;
}
