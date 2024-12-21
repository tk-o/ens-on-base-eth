# L2 ENS

## Basenames

Base-native Identity

Website: www.base.org/names
Source code: https://github.com/base-org/basenames/tree/main

### CONTRACT ADDRESSES

#### Ethereum Mainnet

| Contract | Address | 
| -------- | ------- |
| L1Resolver | [0xde9049636F4a1dfE0a64d1bFe3155C0A14C54F31](https://etherscan.io/address/0xde9049636F4a1dfE0a64d1bFe3155C0A14C54F31#code) |

#### Base Mainnet

| Contract | Address | 
| -------- | ------- | 
| Registry | [0xb94704422c2a1e396835a571837aa5ae53285a95](https://basescan.org/address/0xb94704422c2a1e396835a571837aa5ae53285a95) | 
| BaseRegistrar | [0x03c4738ee98ae44591e1a4a4f3cab6641d95dd9a](https://basescan.org/address/0x03c4738ee98ae44591e1a4a4f3cab6641d95dd9a) | 
| RegistrarController | [0x4cCb0BB02FCABA27e82a56646E81d8c5bC4119a5](https://basescan.org/address/0x4cCb0BB02FCABA27e82a56646E81d8c5bC4119a5) |
| Launch Price Oracle | [0xd53b558e1f07289acedf028d226974abba258312](https://basescan.org/address/0xd53b558e1f07289acedf028d226974abba258312) |
| Price Oracle | [0x508CFE43aa84b8048cB6d39037cE0dc96d8aDc75](https://basescan.org/address/0x508CFE43aa84b8048cB6d39037cE0dc96d8aDc75) | 
| ReverseRegistrar | [0x79ea96012eea67a83431f1701b3dff7e37f9e282](https://basescan.org/address/0x79ea96012eea67a83431f1701b3dff7e37f9e282) | 
| L2Resolver | [0xC6d566A56A1aFf6508b41f6c90ff131615583BCD](https://basescan.org/address/0xC6d566A56A1aFf6508b41f6c90ff131615583BCD) | 

### Functional Diagram

The system architecture can be functionally organized into three categories:
1. An L1 resolver enabling cross-chain resolution for the `base.eth` 2LD.
2. An ENS-like registry/registrar/resolver system deployed on Base enabling `*.base.eth` subdomains to be registered and managed.
3. An off-chain gateway for serving CCIP requests required to comply with [ENSIP-10](https://docs.ens.domains/ensip/10). 

![Screenshot 2024-06-16 at 8 51 55 PM](https://github.com/base-org/usernames/assets/84420280/3689dd40-2be0-4a7d-8454-155741a1add0)

### ARCHITECTURE

The core functionality of Base Usernames should look familiar to anyone that's looked under the hood  at the [ENS contracts](https://github.com/ensdomains/ens-contracts/tree/staging). We implement a slimmed down fork of the ENS contracts here.

| Contract | Role | ENS Implementation | Base Usernames Implementation |
| -------- | ----- | ------------------ | ----------------------------- | 
|[Registry](https://docs.ens.domains/registry/ens)  | Stores [Records](https://github.com/base-org/usernames/blob/c29119fd327b61f896440c317f3dd898e9fa570b/contracts/src/L2/Registry.sol#L7-L11) of subdomains in a flat structure |  [ENSRegistry.sol](https://github.com/ensdomains/ens-contracts/blob/staging/contracts/registry/ENSRegistry.sol) | [Registry.sol](https://github.com/base-org/usernames/blob/master/contracts/src/L2/Registry.sol) |
| [BaseRegistrar](https://docs.ens.domains/registry/eth) | Tokenizes names,  manages ownership and stores expiry | [BaseRegistrarImplementation.sol](https://github.com/ensdomains/ens-contracts/blob/staging/contracts/ethregistrar/BaseRegistrarImplementation.sol) | [BaseRegistrar.sol](https://github.com/base-org/usernames/blob/master/contracts/src/L2/BaseRegistrar.sol) | 
| [ReverseRegistrar](https://docs.ens.domains/registry/reverse) | Manages the reverse lookup to allow the setting of "primary" names for an address | [ReverseRegistrar.sol](https://github.com/ensdomains/ens-contracts/blob/staging/contracts/reverseRegistrar/ReverseRegistrar.sol) | [ReverseRegistrar.sol](https://github.com/base-org/usernames/blob/master/contracts/src/L2/ReverseRegistrar.sol) |
| [L1 Resolver](https://docs.ens.domains/resolvers/ccip-read) | Enables cross-chain, wildcard resolution from L1 | [OffchainResolver.sol](https://github.com/ensdomains/offchain-resolver/blob/main/packages/contracts/contracts/OffchainResolver.sol) | [L1Resolver.sol](https://github.com/base-org/usernames/blob/master/contracts/src/L1/L1Resolver.sol) | 
| [L2 Resolver](https://docs.ens.domains/resolvers/public) | A standard public resolver for storing records associated with namespaces | [PublicResolver.sol](https://github.com/ensdomains/ens-contracts/blob/staging/contracts/resolvers/PublicResolver.sol) | [L2Resolver.sol](https://github.com/base-org/usernames/blob/master/contracts/src/L2/L2Resolver.sol) | 
| Registrar Controller | A permissioned contract which manages registration payment | [ETHRegistrarController.sol](https://github.com/ensdomains/ens-contracts/blob/staging/contracts/ethregistrar/ETHRegistrarController.sol) | [RegistrarController.sol](https://github.com/base-org/usernames/blob/master/contracts/src/L2/RegistrarController.sol) |
| Stable Price Oracle | The source of pricing based on name length and duration of registration | [StablePriceOracle.sol](https://github.com/ensdomains/ens-contracts/blob/staging/contracts/ethregistrar/StablePriceOracle.sol) | [StablePriceOracle.sol](https://github.com/base-org/usernames/blob/master/contracts/src/L2/StablePriceOracle.sol) |
| Exponential Premium Oracle | A Dutch auction pricing mechanism for fairly pricing names after expiry | [ExponentialPremiumPricingOracle.sol](https://github.com/ensdomains/ens-contracts/blob/staging/contracts/ethregistrar/ExponentialPremiumPriceOracle.sol) | [ExponentialPremiumPricingOracle.sol](https://github.com/base-org/usernames/blob/master/contracts/src/L2/ExponentialPremiumPriceOracle.sol) | 

In addition to replicating the base behavior of the ENS protocol, we are offering a series of promotional discounts associated with various Coinbase product integrations. As such, the Base Usernames Registrar Controller allows users to perform discounted registrations while passing along integration-specific `validationData`. Each discount leverages a common interface: 
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

/// @title Discount Validator Interface
///
/// @notice Common interface which all Discount Validators must implement.
///         The logic specific to each integration must ultimately be consumable as the `bool` returned from
///         `isValidDiscountRegistration`.
interface IDiscountValidator {
    /// @notice Required implementation for compatibility with IDiscountValidator.
    ///
    /// @dev Each implementation will have unique requirements for the data necessary to perform
    ///     a meaningful validation. Implementations must describe here how to pack relevant `validationData`.
    ///     Ex: `bytes validationData = abi.encode(bytes32 key, bytes32[] proof)`
    ///
    /// @param claimer the discount claimer's address.
    /// @param validationData opaque bytes for performing the validation.
    ///
    /// @return `true` if the validation data provided is determined to be valid for the specified claimer, else `false`.
    function isValidDiscountRegistration(address claimer, bytes calldata validationData) external returns (bool);
}
```
The various implementations can be found [in this directory](https://github.com/base-org/basenames/tree/main/src/L2/discounts). 