export const formatNumber = (price?: number): string =>
  String(price).replace(/(d)(?=(d{3})+(?!d))/g, '$1.');
