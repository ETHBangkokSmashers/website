export const shortenAddress = (
  address: string,
  countBefore: number = 6,
  countAfter: number = 4,
) => `${address.substr(0, countBefore + 2)}…${address.substr(-1 * countAfter)}`
