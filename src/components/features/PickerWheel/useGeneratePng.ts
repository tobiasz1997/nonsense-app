import { WheelOption } from '@interfaces/wheelOption';
import { useCallback } from 'react';

const useGeneratePng = () => {
	return useCallback((winner: WheelOption) => {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');

		if (!ctx || !winner) return;

		const width = 700;
		const height = 350;

		canvas.width = width;
		canvas.height = height;

		ctx.imageSmoothingEnabled = true;
		ctx.imageSmoothingQuality = 'high';

		ctx.fillStyle = String(winner.color || '#eab308');
		ctx.fillRect(0, 0, width, height);

		ctx.fillStyle = '#ffffff';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		ctx.fillStyle = '#ffffff';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
		ctx.shadowBlur = 6;
		ctx.shadowOffsetX = 2;
		ctx.shadowOffsetY = 2;

		const lines = ['Congratulations 🎉🎉🎉', 'Winner:', winner.name];

		const fontSize = 32;
		const lineHeight = 41;

		ctx.font = `bold ${fontSize}px Arial`;

		const totalHeight = (lines.length - 1) * lineHeight;
		const centerY = height / 2;

		lines.forEach((line, index) => {
			const y = centerY - totalHeight / 2 + index * lineHeight;
			ctx.fillText(line, width / 2, y);
		});

		const imageUrl = canvas.toDataURL('image/png');
		const link = document.createElement('a');

		link.href = imageUrl;
		link.download = `winner-${winner.name}.png`;
		link.click();
	}, []);
};

export default useGeneratePng;
