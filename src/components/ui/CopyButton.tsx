import Button from '@components/ui/Button';
import { CheckIcon } from '@heroicons/react/24/solid';
import copy from 'copy-to-clipboard';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React, {
	ButtonHTMLAttributes,
	FC,
	useEffect,
	useRef,
	useState
} from 'react';

type Props = {
	copyValue: string;
	label?: string;
	copiedLabel?: string;
};
const CopyButton: FC<ButtonHTMLAttributes<HTMLButtonElement> & Props> = ({
	copyValue,
	label,
	copiedLabel
}) => {
	const t = useTranslations('common');
	const [isCopied, setIsCopied] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const DELAY = 1_000;
	const text = isCopied ? (copiedLabel ?? t('copied')) : (label ?? t('copy'));
	const letters = text.split('');

	const handleCopy = async () => {
		if (!copyValue || isCopied) return;

		await copy(copyValue);

		setIsCopied(true);

		timeoutRef.current = setTimeout(() => {
			setIsCopied(false);
		}, DELAY);
	};

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return (
		<Button
			disabled={copyValue.length === 0 || isCopied}
			onClick={handleCopy}
			className="flex items-center justify-center min-w-32"
		>
			<AnimatePresence mode="wait" initial={false}>
				<motion.span
					key={text}
					className="flex items-center gap-2"
					initial="hidden"
					animate="visible"
					exit={{
						opacity: 0,
						y: -4
					}}
					variants={{
						hidden: {},
						visible: {
							transition: {
								staggerChildren: 0.04
							}
						}
					}}
				>
					{isCopied && (
						<motion.span
							variants={{
								hidden: {
									opacity: 0,
									scale: 0.7
								},
								visible: {
									opacity: 1,
									scale: 1,
									transition: {
										duration: 0.1
									}
								}
							}}
						>
							<CheckIcon className="h-5 w-5" />
						</motion.span>
					)}

					<span className="flex">
						{letters.map((letter, index) => (
							<motion.span
								key={`${letter}-${index}`}
								className="inline-block"
								variants={{
									hidden: {
										opacity: 0,
										y: 4
									},
									visible: {
										opacity: 1,
										y: 0,
										transition: {
											duration: 0.1
										}
									}
								}}
							>
								{letter === ' ' ? '\u00A0' : letter}
							</motion.span>
						))}
					</span>
				</motion.span>
			</AnimatePresence>
		</Button>
	);
};

export default CopyButton;
