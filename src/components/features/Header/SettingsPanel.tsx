import LocalePanel from '@components/features/Header/LocalePanel';
import ThemePanel from '@components/features/Header/ThemePanel';
import Button from '@components/ui/Button';
import Popup from '@components/ui/Popup';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import cx from 'classnames';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function SettingsPanel({ ...props }) {
	const t = useTranslations('settings');
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Popup
			isOpen={isOpen}
			onOpenChange={setIsOpen}
			className={cx('shrink-0 self-center', props.className)}
			contentClassName="space-y-4"
			trigger={(triggerProps) => (
				<Button
					{...triggerProps}
					className="w-9! h-9! p-2 border dark:border-0"
					variant="secondary"
					size="fit"
					icon={<Cog6ToothIcon />}
					aria-label={t('title')}
				/>
			)}
		>
			<fieldset className="flex flex-col gap-3">
				<ThemePanel />

				<LocalePanel />
			</fieldset>
		</Popup>
	);
}
