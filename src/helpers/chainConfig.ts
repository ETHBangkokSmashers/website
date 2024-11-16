import {
  sepolia,
  mainnet,
  polygon,
  bitkub,
  kinto,
  worldchain,
  arbitrum,
  scroll,
  mantle,
  gnosis,
  hedera,
  celo,
  base,
  zircuit,
  linea,
} from "viem/chains"

export const chainConfig = {
  [sepolia.id]: {
    tradeEntryAddress: "0x8CE9c3a167A6a82Fd8d81877488C873AE181B16f",
    tokens: {
      usdc: {
        address: "0x5d6074b2B8F83E819b1C0957AD4497F0C9e01A21",
        decimals: 18,
      },
      usdt: {
        address: "0x0093b27da6a4a611f31e5c00a89897e874132e66",
        decimals: 6,
      },
    },
  },
  [mainnet.id]: {
    tradeEntryAddress: null,
    tokens: {
      usdc: {
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        decimals: 6,
      },
      usdt: {
        address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        decimals: 6,
      },
    },
  },
  [polygon.id]: {
    tradeEntryAddress: null,
    tokens: {
      usdc: {
        address: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
        decimals: 6,
      },
      usdt: {
        address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
        decimals: 6,
      },
    },
  },
  [bitkub.id]: {
    tradeEntryAddress: null,
    tokens: {
      usdc: {
        address: "0x3a5d71f3e0db649f5b1c9F96Da657A36dBC03eFD",
        decimals: 6,
      },
      usdt: {
        address: "0xE5DEC503CD76CE8777cb2FfD8ffe0a15DB10ec38",
        decimals: 6,
      },
    },
  },
  [kinto.id]: {
    tradeEntryAddress: null,
    tokens: {
      usdc: {
        address: "0x05DC0010C9902EcF6CBc921c6A4bd971c69E5A2E",
        decimals: 6,
      },
      usdt: null,
    },
  },
  [worldchain.id]: {
    tradeEntryAddress: null,
    tokens: {
      usdc: {
        address: "0x79A02482A880bCE3F13e09Da970dC34db4CD24d1",
        decimals: 6,
      },
      usdt: null,
    },
  },
  [arbitrum.id]: {
    tradeEntryAddress: null,
    tokens: {
      usdc: {
        address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        decimals: 6,
      },
      usdt: {
        address: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
        decimals: 6,
      },
    },
  },
  [scroll.id]: {
    tradeEntryAddress: null,
    tokens: {
      usdc: {
        address: "0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4",
        decimals: 6,
      },
      usdt: {
        address: "0xf55bec9cafdbe8730f096aa55dad6d22d44099df",
        decimals: 6,
      },
    },
  },
  [mantle.id]: {
    tradeEntryAddress: null,
    tokens: {
      usdc: {
        address: "0x09bc4e0d864854c6afb6eb9a9cdf58ac190d0df9",
        decimals: 6,
      },
      usdt: {
        address: "0x201eba5cc46d216ce6dc03f6a759e8e766e956ae",
        decimals: 6,
      },
    },
  },
  [gnosis.id]: {
    tradeEntryAddress: null,
    tokens: {
      usdc: {
        address: "0xddafbb505ad214d7b80b1f830fccc89b60fb7a83",
        decimals: 6,
      },
      usdt: {
        address: "0x4ECaBa5870353805a9F068101A40E0f32ed605C6",
        decimals: 6,
      },
    },
  },
  [hedera.id]: {
    tradeEntryAddress: null,
    tokens: {
      usdc: {
        address: "0x000000000000000000000000000000000006f89a",
        decimals: 6,
      },
      usdt: null,
    },
  },
  [celo.id]: {
    tradeEntryAddress: null,
    tokens: {
      usdc: {
        address: "0xcebA9300f2b948710d2653dD7B07f33A8B32118C",
        decimals: 6,
      },
      usdt: {
        address: "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e",
        decimals: 6,
      },
    },
  },
  [base.id]: {
    tradeEntryAddress: null,
    tokens: {
      usdc: {
        address: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
        decimals: 6,
      },
      usdt: null,
    },
  },
  [zircuit.id]: {
    tradeEntryAddress: null,
    tokens: {
      usdc: null,
      usdt: {
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        decimals: 6,
      },
    },
  },
  [linea.id]: {
    tradeEntryAddress: null,
    tokens: {
      usdc: {
        address: "0x176211869cA2b568f2A7D4EE941E073a821EE1ff",
        decimals: 6,
      },
      usdt: {
        address: "0xA219439258ca9da29E9Cc4cE5596924745e12B93",
        decimals: 6,
      },
    },
  },
} as Record<
  number,
  {
    tradeEntryAddress: `0x${string}` | null
    tokens: {
      [token: string]: null | {
        address: `0x${string}`
        decimals: number
      }
    }
  }
>
