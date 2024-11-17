# Tech Stack

## Frontend and UI

- Frameworks: Vite, React, TypeScript
- UI Libraries: HeadlessUI, Framer Motion
- Web3 Libraries: Viem, Wagmi
- Wallet Integration: Dynamic for wallet connections
- User Features: ENS name and avatar integration via Viem, with custom username and avatar generation based on connected wallet addresses
- Data Handling: Supabase for off-chain signature storage, TanStack Query for fetching and caching data

## Functionality Overview
### Multi-Chain Support

Our application allows users to place predictions across various test networks, including:

- Sepolia
- Polygon Amoy
- Arbitrum Sepolia
- Base Sepolia
- Celo Alfajores
- Scroll Sepolia
- Hedera Testnet
- Flow Testnet
- Mantle Testnet
- Neon Devnet
- Linea

### Key Features

- User-Centric Design:
  - A minimalistic and intuitive UI that simplifies the process of creating transactions, reducing the learning curve for new users.

- Web3 Integration:
  - Viem/Wagmi bundle integration reduces development overhead and accelerates build time for seamless blockchain interactions.

- Prediction Creation:
  - Users initiate a trade by selecting an asset, defining a price movement prediction, choosing execution time, and setting a token amount for the offer.
- No transactions are made at this stage, only an off-chain signature is recorded, saving users from potential costs if no counterparties accept the trade.

- Off-Chain Signature Storage:
  - Signatures are temporarily stored using Supabase, ensuring an efficient and scalable data management approach.

- Future Enhancements

- Meta Transactions: We aim to eliminate the need for server-side signature storage by implementing meta-transactions. Users will be able to grant token spending allowances and execute transactions via a single signature.
- Gasless Relayers: We plan to support transactions through a pool of gasless relayers, enhancing the user experience by reducing transaction costs.

## Conclusion

Our project demonstrates how decentralized prediction markets can be built with a focus on UX and cost efficiency. This repository is ideal for hackathon enthusiasts, Web3 developers, and anyone interested in exploring multi-chain prediction applications.

Feel free to explore, contribute, and build upon our work!


---
---

# TO LAUNCH: React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
