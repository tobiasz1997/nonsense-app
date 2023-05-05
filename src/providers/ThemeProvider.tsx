import {
	createContext,
	FC,
	ReactNode,
	useContext,
	useEffect,
	useState
} from 'react';
import useLocalStorage from '@hooks/useLocalStorage';

type ThemeType = 'light' | 'dark';
type ThemeContext = {
	theme: ThemeType;
	setNewTheme: (type: ThemeType) => void;
};

const ThemeContext = createContext<ThemeContext>({} as ThemeContext);

type Props = {
	children: ReactNode;
};

const ThemeProvider: FC<Props> = (props) => {
	const [theme, setTheme] = useState<ThemeType>('light');
	const { set, get, remove } = useLocalStorage();

	useEffect(() => {
		const theme = get('theme');
		if (
			theme === 'dark' ||
			(!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			setNewTheme('dark');
		} else {
			setNewTheme('light');
		}
	}, []);

	const setNewTheme = (type: ThemeType) => {
		if (type === 'dark') {
			document.documentElement.classList.add('dark');
			setTheme('dark');
			set('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			setTheme('light');
			set('theme', 'light');
		}
	};

	return (
		<ThemeContext.Provider value={{ theme, setNewTheme }}>
			{props.children}
		</ThemeContext.Provider>
	);
};

export const useThemeContext = () => useContext<ThemeContext>(ThemeContext);
export default ThemeProvider;
