export default [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AcceptionDeadlinePassed",
    type: "error",
  },
  {
    inputs: [],
    name: "ECDSAInvalidSignature",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
    ],
    name: "ECDSAInvalidSignatureLength",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "ECDSAInvalidSignatureS",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidChainlinkRoundId",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidDataSource",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidSignature",
    type: "error",
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error",
  },
  {
    inputs: [],
    name: "NotTradeAcceptor",
    type: "error",
  },
  {
    inputs: [],
    name: "NotTradeInitiator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "value",
        type: "int256",
      },
    ],
    name: "SafeCastOverflowedIntToUint",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  {
    inputs: [],
    name: "TradeNotExpired",
    type: "error",
  },
  {
    inputs: [],
    name: "UnavailableAssetOrDataSource",
    type: "error",
  },
  {
    inputs: [],
    name: "WrongTradeStatus",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [],
    name: "EIP712DomainChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "tradeHash",
        type: "bytes32",
      },
    ],
    name: "TradeCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "tradeHash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "settlementPrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "payoff",
        type: "uint256",
      },
    ],
    name: "TradeSettled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "tradeHash",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "address",
            name: "depositAsset",
            type: "address",
          },
          {
            internalType: "address",
            name: "initiator",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "initiatorAmount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "acceptor",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "acceptorAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "acceptionDeadline",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "expiry",
            type: "uint256",
          },
          {
            internalType: "uint32",
            name: "observationAssetId",
            type: "uint32",
          },
          {
            internalType: "enum BasicTradeDirection",
            name: "direction",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "dataSourceId",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct TradeParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "TradeStarted",
    type: "event",
  },
  {
    inputs: [],
    name: "TRADE_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    name: "assetDataSourceAllowed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "depositAsset",
            type: "address",
          },
          {
            internalType: "address",
            name: "initiator",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "initiatorAmount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "acceptor",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "acceptorAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "acceptionDeadline",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "expiry",
            type: "uint256",
          },
          {
            internalType: "uint32",
            name: "observationAssetId",
            type: "uint32",
          },
          {
            internalType: "enum BasicTradeDirection",
            name: "direction",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "dataSourceId",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
        ],
        internalType: "struct TradeParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "cancelTrade",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    name: "chainlinkAssetPriceFeeds",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      {
        internalType: "bytes1",
        name: "fields",
        type: "bytes1",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "version",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "verifyingContract",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        internalType: "uint256[]",
        name: "extensions",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "assetId",
        type: "uint32",
      },
      {
        internalType: "uint8",
        name: "dataSourceId",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "allowed",
        type: "bool",
      },
    ],
    name: "setAssetDataSourceAllowed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "assetId",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "feedAddress",
        type: "address",
      },
    ],
    name: "setChainlinkAssetPriceFeed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "depositAsset",
            type: "address",
          },
          {
            internalType: "address",
            name: "initiator",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "initiatorAmount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "acceptor",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "acceptorAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "acceptionDeadline",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "expiry",
            type: "uint256",
          },
          {
            internalType: "uint32",
            name: "observationAssetId",
            type: "uint32",
          },
          {
            internalType: "enum BasicTradeDirection",
            name: "direction",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "dataSourceId",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
        ],
        internalType: "struct TradeParams",
        name: "params",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "extraData",
        type: "bytes",
      },
    ],
    name: "settleTrade",
    outputs: [
      {
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "payoff",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "depositAsset",
            type: "address",
          },
          {
            internalType: "address",
            name: "initiator",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "initiatorAmount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "acceptor",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "acceptorAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "acceptionDeadline",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "expiry",
            type: "uint256",
          },
          {
            internalType: "uint32",
            name: "observationAssetId",
            type: "uint32",
          },
          {
            internalType: "enum BasicTradeDirection",
            name: "direction",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "dataSourceId",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
        ],
        internalType: "struct TradeParams",
        name: "params",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "initiatorSignature",
        type: "bytes",
      },
    ],
    name: "startTrade",
    outputs: [
      {
        internalType: "bytes32",
        name: "tradeHash",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "tradeDetails",
    outputs: [
      {
        internalType: "enum TradeStatus",
        name: "status",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "acceptor",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const
