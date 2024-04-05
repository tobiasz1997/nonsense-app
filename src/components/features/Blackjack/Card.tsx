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

	return (
		<Image
			src={props.src ?? backCardUrl}
			alt={props.value ?? 'back'}
			width={100}
			height={140}
			style={{ width: 100, height: 140 }}
			className="shadow-xl rounded"
			placeholder="blur"
			blurDataURL={backgroundBase64}
		/>
	);
};

export default Card;
