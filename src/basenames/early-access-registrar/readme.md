# Early Access Registrar Controller

Contract deployment: https://basescan.org/address/0xd3e6775ed9b7dc12b205c8e608dc3767b9e5efda#code

A permissioned controller for managing registering names against the `base` registrar. This contract enables only a `discountedRegister` flow which is validated by calling external implementations of the `IDiscountValidator` interface. Pricing, denominated in wei, is determined by calling out to a contract that implements `IPriceOracle`.

Inspired by the ENS ETHRegistrarController: https://github.com/ensdomains/ens-contracts/blob/staging/contracts/ethregistrar/ETHRegistrarController.sol