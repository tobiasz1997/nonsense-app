import React, { FC, useEffect, useState } from 'react';
import styles from './Confetti.module.css';

type Props = {
	active: boolean;
};

const Confetti: FC<Props> = ({ active }) => {
	const [isActive, setIsActive] = useState(true);

	useEffect(() => {
		if (!active) return;
		setIsActive(true);

		const timer = setTimeout(() => setIsActive(false), 7_000);
		return () => clearTimeout(timer);
	}, [active]);

	return (
		<>
			{isActive && (
				<div className={styles.confettiWrapper}>
					{Array.from({ length: 140 }).map((_, i) => (
						<span key={i} className={styles.confettiPiece} />
					))}
				</div>
			)}
		</>
	);
};

export default Confetti;
