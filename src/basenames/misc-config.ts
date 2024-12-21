export function createPonderConfig() {
  
}


// Follow: https://github.com/base-org/contract-deployments/blob/6b5a9175a1a804009ff8dd32aaca2fa914105a94/mainnet/2024-07-23-set-l1-resolver/README.md

/**
 * @title L1 Resolver
 *
 * @notice Resolver for the `base.eth` domain on Ethereum mainnet.
 *         It serves two primary functions:
 *             1. Resolve base.eth using existing records stored on the `rootResolver` via the `fallback` passthrough
 *             2. Initiate and verify wildcard resolution requests, compliant with CCIP-Read aka. ERC-3668
 *                 https://eips.ethereum.org/EIPS/eip-3668
 *
 *         Inspired by ENS's `OffchainResolver`:
 *         https://github.com/ensdomains/offchain-resolver/blob/main/packages/contracts/contracts/OffchainResolver.sol
 */
const L1_RESOLVER_ADDRESS = "0xde9049636F4a1dfE0a64d1bFe3155C0A14C54F31";

const L2_RESOLVER_ADDRESS = "0x51a16746af2247dca3665c078cccf5678d19e366";

/**
 * @notice address of the rootResolver for `base.eth`.
 */
const ROOT_RESOLVER_ADDRESS = "0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41";

// @param ETH_NODE The node hash of "eth"
const ETH_NODE =
  "0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae";
// @param BASE_ETH_NODE The node hash of "base.eth"
const BASE_ETH_NODE =
  "0xff1e3c0eb00ec714e34b6114125fbde1dea2f24a72fbf672e7b7fd5690328e10";
// @param REVERSE_NODE The node hash of "reverse"
const REVERSE_NODE =
  "0xa097f6721ce401e757d1223a763fef49b8b5f90bb18567ddb86fd205dff71d34";
// @param ADDR_REVERSE_NODE The node hash of "addr.reverse"
const ADDR_REVERSE_NODE =
  "0x91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e2";
// @param BASE_REVERSE_NODE The ENSIP-19 compliant base-specific reverse node hash of "80002105.reverse"
const BASE_REVERSE_NODE =
  "0x08d9b0993eb8c4da57c37a4b84a6e384c2623114ff4e9370ed51c9b8935109ba";
// @param GRACE_PERIOD the grace period for expired names
const GRACE_PERIOD = "90 days";
// @param BASE_ETH_NAME The dnsName of "base.eth" returned by NameEncoder.dnsEncode("base.eth")
const BASE_ETH_NAME = "04626173650365746800";
