import ThemeTileButton from "@components/features/Header/ThemeTileButton";
import { LayoutGroup } from "framer-motion";
import { useLocale } from "next-intl";
import Image from "next/image";
import { FC, useId, useState } from "react";

const LocalePanel: FC = () => {
  const locale = useLocale();
  const layoutGroupId = useId();
  const [pendingLocale, setPendingLocale] = useState<"pl" | "en" | null>(null);

  const selectedLocale = pendingLocale ?? locale;

  const handleChange = (nextLocale: "pl" | "en") => {
    if (nextLocale === selectedLocale || pendingLocale !== null) return;

    setPendingLocale(nextLocale);
  };

  const handleAnimationComplete = () => {
    if (pendingLocale === null) return;

    document.cookie = `locale=${pendingLocale}; path=/; max-age=31536000; SameSite=Lax`;

    window.location.reload();
  };

  return (
    <LayoutGroup id={layoutGroupId}>
      <div className="flex h-full border rounded border-green-dark dark:border-pistachio">
        <ThemeTileButton
          layoutId={layoutGroupId}
          active={selectedLocale === "pl"}
          shouldAnimate={pendingLocale !== null}
          icon={
            <Image src="/flags/pl.svg" alt="Polski" width={24} height={24} />
          }
          onClick={() => handleChange("pl")}
          onAnimationComplete={handleAnimationComplete}
        />
        <ThemeTileButton
          layoutId={layoutGroupId}
          active={selectedLocale === "en"}
          shouldAnimate={pendingLocale !== null}
          icon={
            <Image src="/flags/en.svg" alt="English" width={24} height={24} />
          }
          onClick={() => handleChange("en")}
          onAnimationComplete={handleAnimationComplete}
        />
      </div>
    </LayoutGroup>
  );
};

export default LocalePanel;
