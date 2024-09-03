'use client'

import { useState } from 'react';
import { Copy, Check } from "@phosphor-icons/react";

export default function CopyButton({ text }: { text: string }) {
	const [isCopied, setIsCopied] = useState(false);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(text);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 1000); // Revert after 2 seconds
	};

	return (
		<button 
			onClick={handleCopy} 
			disabled={isCopied}
		>
			{isCopied ? <Check className='text-green-400' size={16} /> : <Copy className='text-gray-400' size={16} />}
		</button>
	);
}