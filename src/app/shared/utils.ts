export function sortBy<T>(key: string, ref: any[], reverse?: boolean, transform?: (arg: T) => T) {
  // Mapping with indexes for stable sorting
  let map = ref.map((v,i) => {
    return {v,i};
  });
  let standardSort = (a, b) => {
    let keyA = transform ? transform(a[key]) : a[key];
    let keyB = transform ? transform(b[key]) : b[key];
    if (keyA === keyB) {
      let indexA = map.find(v => v.v === a).i;
      let indexB = map.find(v => v.v === b).i;
      return indexA - indexB;
    }
    return keyA > keyB ? -1 : 1;
  };

  return reverse ? ref.sort(standardSort).reverse() : ref.sort(standardSort);
}
