export const formatNumber = (price?: number): string =>
  String(price).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
