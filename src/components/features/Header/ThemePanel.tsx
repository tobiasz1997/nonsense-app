import ThemeTileButton from '@components/features/Header/ThemeTileButton';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useThemeContext } from '@providers/ThemeProvider';
import { FC } from 'react';

const ThemePanel: FC = () => {
	const { theme, setNewTheme } = useThemeContext();

	return (
		<div className="flex h-full border rounded border-green-dark dark:border-pistachio">
			<ThemeTileButton
				active={theme === 'light'}
				icon={<SunIcon className="text-yellow" />}
				onClick={() => setNewTheme('light')}
			/>
			<ThemeTileButton
				active={theme === 'dark'}
				icon={<MoonIcon className="text-cyan-500" />}
				onClick={() => setNewTheme('dark')}
			/>
		</div>
	);
};

export default ThemePanel;
