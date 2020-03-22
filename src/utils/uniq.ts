export function uniq(arr: string[]) {
  let seen: { [key: string]: boolean } = {};
  return arr.filter(function(item) {
    if (seen[item]) return false;
    seen[item] = true;
    return true;
  });
}
