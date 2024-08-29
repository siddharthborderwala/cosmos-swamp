import type { CosmosChainData } from "@leapwallet/elements-hooks";

export async function matchChain(
	query: string,
	loose = false,
): Promise<CosmosChainData | null> {
	// 1. get chain data from "https://assets.leapwallet.io/cosmos-registry/v1/elements-data/chains.json"
	// 2. use fuzzy search to find the chain that matches the query the best
	// based on chainId, chainName and key
	// 3. return the chain data
	throw new Error("unimplemented");
}
