import dictionary from '../../dictionary';

export function dictionaryFilter() {
  return (selector: string): string => {
    return selector
        .replace(/\[([^[\]]*)\]/g, '.$1.')
        .split('.')
        .filter((t) => t !== '')
        .reduce((prev, cur) => prev?.[cur], dictionary);
  };
}
