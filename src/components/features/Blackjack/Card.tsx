import Image from 'next/image';
import { FC } from 'react';

type Props = {
	src?: string;
	value?: string;
};

const Card: FC<Props> = (props) => {
	const backCardUrl = 'https://deckofcardsapi.com/static/img/back.png';

	return (
		<Image
			src={props.src ?? backCardUrl}
			alt={props.value ?? 'back'}
			width={100}
			height={140}
			style={{ width: 100, height: 140 }}
			className="shadow-xl"
		/>
	);
};

export default Card;
