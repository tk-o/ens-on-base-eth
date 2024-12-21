import { createConfig } from "ponder";
import { createRegistryConfig } from "./src/basenames/registry/config";

const basenamesRegistryConfig = createRegistryConfig();

export default createConfig({
  networks: {
    ...basenamesRegistryConfig.networks
  },
  contracts: {
    ...basenamesRegistryConfig.contracts
  },
});
