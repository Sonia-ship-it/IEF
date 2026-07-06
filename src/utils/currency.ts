export function formatCurrency(amount: number): string {
  // Format as RWF 15,000 without decimal places.
  return `RWF ${Math.round(amount).toLocaleString('en-US')}`;
}
