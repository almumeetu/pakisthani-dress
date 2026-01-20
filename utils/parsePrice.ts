export const parsePrice = (price: string | number): number => {
  if (typeof price === 'number') return price;
  if (!price) return 0;
  // Remove "BDT", commas, spaces, etc.
  const cleanPrice = price.toString().replace(/[^\d.]/g, '');
  return parseFloat(cleanPrice) || 0;
};
