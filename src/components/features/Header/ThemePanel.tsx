import ThemeTileButton from '@components/features/Header/ThemeTileButton';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useThemeContext } from '@providers/ThemeProvider';
import { LayoutGroup } from 'framer-motion';
import { FC, useId, useState } from 'react';

const ThemePanel: FC = () => {
	const layoutGroupId = useId();
	const [animatedTheme, setAnimatedTheme] = useState<'light' | 'dark' | null>(
		null
	);
	const { theme, setNewTheme } = useThemeContext();

	const shouldAnimate = animatedTheme === theme;

	const handleChange = (nextTheme: 'light' | 'dark') => {
		if (nextTheme === theme) return;

		setAnimatedTheme(nextTheme);
		setNewTheme(nextTheme);
	};

	const handleAnimationComplete = () => {
		setAnimatedTheme((current) => (current === theme ? null : current));
	};

	return (
		<LayoutGroup id={layoutGroupId}>
			<div className="flex h-full border rounded border-green-dark dark:border-pistachio">
				<ThemeTileButton
					layoutId={layoutGroupId}
					active={theme === 'light'}
					shouldAnimate={shouldAnimate}
					icon={<SunIcon className="text-yellow" />}
					onClick={() => handleChange('light')}
					onAnimationComplete={handleAnimationComplete}
				/>
				<ThemeTileButton
					layoutId={layoutGroupId}
					active={theme === 'dark'}
					shouldAnimate={shouldAnimate}
					icon={<MoonIcon className="text-cyan-500" />}
					onClick={() => handleChange('dark')}
					onAnimationComplete={handleAnimationComplete}
				/>
			</div>
		</LayoutGroup>
	);
};

export default ThemePanel;
