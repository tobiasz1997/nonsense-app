import { ChangeEvent, FC } from "react";
import { useThemeContext } from "@providers/ThemeProvider";
import ThemeTileButton from "@components/features/Header/ThemeTileButton";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useLocale } from "next-intl";
import Image from "next/image";

const LocalePanel: FC = () => {
  const locale = useLocale();

  const handleChange = (locale: "pl" | "en") => {
    if (locale !== "pl" && locale !== "en") return;

    document.cookie = `locale=${locale}; path=/; max-age=31536000; SameSite=Lax`;

    window.location.reload();
  };

  return (
    <div className="flex h-full border rounded border-green-dark dark:border-pistachio">
      <ThemeTileButton
        active={locale === "pl"}
        icon={<Image src="/flags/pl.svg" alt="Polski" width={24} height={24} />}
        onClick={() => handleChange("pl")}
      />
      <ThemeTileButton
        active={locale === "en"}
        icon={
          <Image src="/flags/en.svg" alt="English" width={24} height={24} />
        }
        onClick={() => handleChange("en")}
      />
    </div>
  );
};

export default LocalePanel;
