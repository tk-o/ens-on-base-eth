import { getAddress, Hex, http } from "viem";
import REGISTRY_ABI from './abi'
import { start } from "repl";

export function createRegistryConfig() {
  return {
    networks: {
      'base-mainnet': {
        chainId: 8453,
        transport: http(process.env.PONDER_RPC_URL_8453),
        pollingInterval: 15_000,
        startBlock: 17571480
      },
    },
    contracts: {
      registry: {
        address: '0xb94704422c2a1e396835a571837aa5ae53285a95' as Hex,
        abi: REGISTRY_ABI,
        network: 'base-mainnet' as const,
        startBlock: 17571480
      }
    },
  };
}