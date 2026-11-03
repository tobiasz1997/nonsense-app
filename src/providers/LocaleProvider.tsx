import { FC, PropsWithChildren, useEffect, useState } from "react";
import { NextIntlClientProvider } from "next-intl";
import pl from "../../messages/pl.json";
import en from "../../messages/en.json";

type Locale = "pl" | "en";

const LocaleProvider: FC<PropsWithChildren> = (props) => {
  const [locale, setLocale] = useState<Locale>("pl");

  useEffect(() => {
    const savedLocale = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("locale="))
      ?.split("=")[1];

    const selectedLocale: Locale = savedLocale === "en" ? "en" : "pl";

    setLocale(selectedLocale);
    document.documentElement.lang = selectedLocale;
  }, []);

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={locale === "pl" ? pl : en}
      timeZone="Europe/Warsaw"
    >
      {props.children}
    </NextIntlClientProvider>
  );
};

export default LocaleProvider;
