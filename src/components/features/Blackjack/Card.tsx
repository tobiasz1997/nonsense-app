import useIsMobile from '@hooks/useIsMobile';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';

type Props = {
	src?: string;
	value?: string;
};

const Card: FC<Props> = (props) => {
	const backCardUrl = 'https://deckofcardsapi.com/static/img/back.png';
	const backgroundBase64 =
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAACMCAYAAACK9Qy7AAAA00lEQVR42u3RMQEAMAgAoJlvJY1oAz2t4AEViMrfjzNCiBCECEGIEIQIQYgQIUIQIgQhQhAiBCFCEIIQIQgRghAhCBGCEIQIQYgQhAhBiBCEIEQIQoQgRAhChCAEIUIQIgQhQhAiBCEIEYIQIQgRghAhCEGIEIQIQYgQhAhBCEKEIEQIQoQgRAhCECIEIUIQIgQhQhAiRIgQhAhBiBCECEGIEIQgRAhChCBECEKEIAQhQhAiBCFCECIEIQgRghAhCBGCECEIQYgQhAhBiBCECEEIawDhYY/U+Jw8rgAAAABJRU5ErkJggg==';

	const isMobile = useIsMobile();
	const t = useTranslations('blackjack');

	return (
		<Image
			src={props.src ?? backCardUrl}
			alt={
				props.value
					? ['ACE', 'KING', 'QUEEN', 'JACK'].includes(props.value)
						? t('cards.' + props.value.toLowerCase())
						: props.value
					: t('cards.back')
			}
			width={isMobile ? 50 : 100}
			height={isMobile ? 70 : 140}
			style={{ width: isMobile ? 50 : 100, height: isMobile ? 70 : 140 }}
			className="shadow-xl rounded"
			placeholder="blur"
			blurDataURL={backgroundBase64}
		/>
	);
};

export default Card;
