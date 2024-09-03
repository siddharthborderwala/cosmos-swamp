import { matchChain } from "@/lib/match";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import { CaretUp, CaretDown, Globe } from "@phosphor-icons/react/dist/ssr";
import SubmitButton from "./form-status";
import CopyButton from "./copy-button";

async function ChainPage({ params }: { params: { chainId: string } }) {
	const bestMatch = await matchChain(params.chainId, false);

	if (!bestMatch) {
		return notFound();
	}

	// Fetch block height from chain RPC
	const blockHeight = await fetchBlockHeight(bestMatch.rpcUrl);

	// Fetch price data
	const priceData = await fetchPriceData(bestMatch.chainId);

	return (
		<div className="min-h-screen bg-background text-foreground p-8">
			<header className="flex justify-between items-start mb-8">
				<div className="flex items-center gap-4">
					<Image
						src={bestMatch.icon}
						alt={bestMatch.chainName}
						width={72}
						height={72}
						className="rounded-full"
					/>
					<div className="flex flex-col gap-2">
						<h1 className="text-3xl font-bold">{bestMatch.chainName}</h1>
						<div className="flex items-center gap-4 text-sm text-gray-400">
							<div className="flex items-center gap-2">
								<span className="flex items-center gap-2 px-2 py-1 bg-gray-800 rounded-full">
									<span className="w-2 h-2 bg-green-500 rounded-full" />
									{bestMatch.chainId}
								</span>
								<CopyButton text={bestMatch.chainId} />
							</div>
							<div className="flex items-center gap-2">
								<a
									href={bestMatch.txExplorer.mainnet.txUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2 px-2 py-1 bg-gray-800 rounded-full"
								>
									<Globe size={16} />
									{bestMatch.txExplorer.mainnet.name}
								</a>
								<CopyButton text={bestMatch.txExplorer.mainnet.txUrl} />
							</div>
						</div>
					</div>
				</div>
				<div className="relative">
					<form action={searchAction} className="relative">
						<input
							type="text"
							name="query"
							placeholder="Search for a cosmos chain..."
							className="bg-gray-800 text-white rounded-full py-2 px-4 pr-10 w-96"
						/>
						<SubmitButton />
					</form>
				</div>
			</header>

			<main className="grid grid-cols-3 gap-8">
				<section>
					<h2 className="text-2xl font-bold mb-4">
						{bestMatch.baseDenom} • ${priceData.price.toFixed(2)}{" "}
						<span
							className={`text-sm font-bold inline-flex items-center gap-1 ${priceData.priceChange >= 0 ? "text-green-400" : "text-red-400"}`}
						>
							{priceData.priceChange >= 0 ? <CaretUp weight='fill' /> : <CaretDown weight='fill' />}
							{Math.abs(priceData.priceChange).toFixed(2)}% (1d)
						</span>
					</h2>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-4">
							<InfoItem label="Height" value={blockHeight.toString()} />
							<InfoItem label="Coin Type" value={bestMatch.coinType.toString()} />
							<InfoItem label="Addr Prefix" value={bestMatch.addressPrefix} />
						</div>
						<div className="space-y-4">
							<InfoItem label="Base Denom" value={bestMatch.baseDenom} />
							<InfoItem label="Decimals" value={bestMatch.chainId} />
							<InfoItem label="CoinGecko ID" value={bestMatch.chainName} />
						</div>
					</div>
				</section>

				<section>
					<h3 className="text-2xl font-bold mb-4">Nodes</h3>
					<NodeList title="Public Nodes" nodes={{ rpc: bestMatch.rpcUrl, rest: bestMatch.restUrl }} />
					{bestMatch.privateInfra ? (
						<NodeList title="Private Nodes" nodes={{ rpc: bestMatch.privateInfra.numia.rpcUrl, rest: bestMatch.privateInfra.numia.restUrl }} />
					) : null}
				</section>

				<section>
					<h3 className="text-2xl font-bold mb-4">Swap Tokens</h3>
					<iframe
						allow="clipboard-read; clipboard-write"
						src={`https://swapfast.app/embed/swaps?sourceChainId=undefined&destinationChainId=${bestMatch.chainId}&sourceAsset=undefined&destinationAsset=${bestMatch.baseDenom}`}
						height="540"
						width="420"
						title="Swap Tokens"
						className="rounded-xl border"
					/>
				</section>
			</main>
		</div>
	);
}

function InfoItem({ label, value }: { label: string; value: string }) {
	return (
		<div>
			<dt className="text-sm text-gray-400">{label}</dt>
			<dd className="text-white mt-1 flex items-center">
				<span className="mr-2">
					{value}
				</span>
				<CopyButton text={value} />
			</dd>
		</div>
	);
}

function NodeList({
	title,
	nodes,
}: { title: string; nodes: { rpc: string; rest: string } }) {
	return (
		<div className="mb-4">
			<h4 className="text-lg mb-2">{title}</h4>
			<div className="grid grid-cols-1 gap-2">
				<div>
					<p className="text-sm text-gray-400">RPC</p>
					<div className="flex items-center">
						<a
							href={nodes.rpc}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-400 hover:underline mr-2"
						>
							{nodes.rpc}
						</a>
						<CopyButton text={nodes.rpc} />
					</div>
				</div>
				<div>
					<p className="text-sm text-gray-400">REST</p>
					<div className="flex items-center">
						<a
							href={nodes.rest}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-400 hover:underline mr-2"
						>
							{nodes.rest}
						</a>
						<CopyButton text={nodes.rest} />
					</div>
				</div>
			</div>
		</div>
	);
}

async function fetchBlockHeight(rpcUrl: string): Promise<number> {
	try {
		const response = await fetch(`${rpcUrl}/block`);
		if (!response.ok) {
			throw new Error('Failed to fetch block height');
		}
		const data = await response.json();
		return parseInt(data.result.block.header.height, 10);
	} catch (error) {
		console.error('Error fetching block height:', error);
		throw error;
	}
}

async function fetchPriceData(
	coinGeckoId: string,
): Promise<{ price: number; priceChange: number }> {
	// Implement API call to fetch price data
	// For now, return placeholder values
	return { price: 4.73, priceChange: -4.13 };
}

async function searchAction(formData: FormData) {
	'use server'
	const query = formData.get('query') as string;
	if (query) {
		const chain = await matchChain(query);
		if (chain) {
			redirect(`/${chain.chainId}`);
		}
	}
	return null;
}

export default ChainPage;
