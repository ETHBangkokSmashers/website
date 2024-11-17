const celoAlfajores = {
  blockExplorerUrls: ["https://celo-alfajores.blockscout.com/"],
  chainId: 44787,
  chainName: "Celo Alfajores",
  iconUrls: ["https://app.dynamic.xyz/assets/networks/celo.svg"],
  name: "Celo",
  nativeCurrency: {
    decimals: 18,
    name: "Celo",
    symbol: "CELO",
    iconUrl: "https://app.dynamic.xyz/assets/networks/celo.svg",
  },
  networkId: 44787,
  rpcUrls: ["https://alfajores-forno.celo-testnet.org"],
  vanityName: "Celo Alfajores",
}

const hederaTestnet = {
  blockExplorerUrls: ["https://hashscan.io/testnet"],
  chainId: 296,
  chainName: "Hedera Testnet",
  iconUrls: ["https://cryptologos.cc/logos/hedera-hbar-logo.svg"],
  name: "Hedera",
  nativeCurrency: {
    decimals: 18,
    name: "Hedera",
    symbol: "HBAR",
    iconUrl: "https://cryptologos.cc/logos/hedera-hbar-logo.svg",
  },
  networkId: 296,
  rpcUrls: ["https://testnet.hashio.io/api"],
  vanityName: "Hedera Testnet",
}

const neonDevnet = {
  blockExplorerUrls: ["https://neon-devnet.blockscout.com"],
  chainId: 245022926,
  chainName: "Neon EVM Devnet",
  iconUrls: [
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNkZjQyYWIiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTEyIDIyYzUuNTIzIDAgMTAtNC40NzQgMTAtOS45OTNDMjIuMDE0IDYuNDc0IDE3LjUyMyAyIDEyIDJTMiA2LjQ3NCAyIDExLjk5M1M2LjQ3NyAyMiAxMiAyMk04LjEzIDcuNzQ1bDMuNzQzIDMuNzRWNy45NDJjMC0uMDI4IDAtLjA3LjAxNC0uMDk5YS4zLjMgMCAwIDEgLjA1Ni0uMDg0Yy4wMjktLjAyOS4wNTctLjA0My4wODUtLjA1N3MuMDctLjAxNC4xLS4wMTRoNC4yMzZjLjAyOSAwIC4wNzEuMDE0LjEuMDE0YS4zLjMgMCAwIDEgLjA4NC4wNTdhLjMuMyAwIDAgMSAuMDU3LjA4NGEuMjQuMjQgMCAwIDEgLjAxNC4xdjguNDExYzAgLjA0MyAwIC4wNy0uMDE0LjA5OWEuMy4zIDAgMCAxLS4wNTcuMDg1YS4zLjMgMCAwIDEtLjA4NS4wNTZjLS4wMjguMDE0LS4wNy4wMTQtLjA5OS4wMTRjLS4wNDIgMC0uMDcgMC0uMTEzLS4wMTRjLS4wMjgtLjAxNC0uMDctLjAyOC0uMDg0LS4wNTZsLTMuNzQzLTMuNzR2My41NTZjMCAuMDI5IDAgLjA3LS4wMTQuMDk5cy0uMDI5LjA1Ni0uMDU3LjA4NWEuMy4zIDAgMCAxLS4wODUuMDU2Yy0uMDI4LjAxNC0uMDcuMDE0LS4wOTkuMDE0SDcuOTMyYy0uMDI4IDAtLjA3LS4wMTQtLjA5OS0uMDE0YS4zLjMgMCAwIDEtLjA4NC0uMDU2Yy0uMDI5LS4wMjktLjA0My0uMDU3LS4wNTctLjA4NXMtLjAxNC0uMDctLjAxNC0uMDk5di00LjIwNmMwLS4wMjggMC0uMDQyLjAxNC0uMDdWNy45NDJjMC0uMDU2LjAxNC0uMDk5LjA0Mi0uMTU1YS4yMy4yMyAwIDAgMSAuMTI4LS4wOTlhLjMuMyAwIDAgMSAuMTU1LS4wMTRjLjAyOC4wMTQuMDg1LjA0Mi4xMTMuMDciIGNsaXAtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==",
  ],
  name: "Neon",
  nativeCurrency: {
    decimals: 18,
    name: "Neon",
    symbol: "NEON",
    iconUrl:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNkZjQyYWIiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTEyIDIyYzUuNTIzIDAgMTAtNC40NzQgMTAtOS45OTNDMjIuMDE0IDYuNDc0IDE3LjUyMyAyIDEyIDJTMiA2LjQ3NCAyIDExLjk5M1M2LjQ3NyAyMiAxMiAyMk04LjEzIDcuNzQ1bDMuNzQzIDMuNzRWNy45NDJjMC0uMDI4IDAtLjA3LjAxNC0uMDk5YS4zLjMgMCAwIDEgLjA1Ni0uMDg0Yy4wMjktLjAyOS4wNTctLjA0My4wODUtLjA1N3MuMDctLjAxNC4xLS4wMTRoNC4yMzZjLjAyOSAwIC4wNzEuMDE0LjEuMDE0YS4zLjMgMCAwIDEgLjA4NC4wNTdhLjMuMyAwIDAgMSAuMDU3LjA4NGEuMjQuMjQgMCAwIDEgLjAxNC4xdjguNDExYzAgLjA0MyAwIC4wNy0uMDE0LjA5OWEuMy4zIDAgMCAxLS4wNTcuMDg1YS4zLjMgMCAwIDEtLjA4NS4wNTZjLS4wMjguMDE0LS4wNy4wMTQtLjA5OS4wMTRjLS4wNDIgMC0uMDcgMC0uMTEzLS4wMTRjLS4wMjgtLjAxNC0uMDctLjAyOC0uMDg0LS4wNTZsLTMuNzQzLTMuNzR2My41NTZjMCAuMDI5IDAgLjA3LS4wMTQuMDk5cy0uMDI5LjA1Ni0uMDU3LjA4NWEuMy4zIDAgMCAxLS4wODUuMDU2Yy0uMDI4LjAxNC0uMDcuMDE0LS4wOTkuMDE0SDcuOTMyYy0uMDI4IDAtLjA3LS4wMTQtLjA5OS0uMDE0YS4zLjMgMCAwIDEtLjA4NC0uMDU2Yy0uMDI5LS4wMjktLjA0My0uMDU3LS4wNTctLjA4NXMtLjAxNC0uMDctLjAxNC0uMDk5di00LjIwNmMwLS4wMjggMC0uMDQyLjAxNC0uMDdWNy45NDJjMC0uMDU2LjAxNC0uMDk5LjA0Mi0uMTU1YS4yMy4yMyAwIDAgMSAuMTI4LS4wOTlhLjMuMyAwIDAgMSAuMTU1LS4wMTRjLjAyOC4wMTQuMDg1LjA0Mi4xMTMuMDciIGNsaXAtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==",
  },
  networkId: 296,
  rpcUrls: ["https://devnet.neonevm.org"],
  vanityName: "Neon EVM Devnet",
}

export const customNetworks = [celoAlfajores, hederaTestnet, neonDevnet]
