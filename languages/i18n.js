import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import es from "./es.json";
import { getLanguaguesAsync } from "../utils/db/dbLanguage";
import * as Localization from "expo-localization";
import { parseLanguages } from "../utils/info/languages";

getLanguaguesAsync().then(languages => {
  const languageTag = languages?.data?.tag || parseLanguages(Localization.locale)

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    lng: languageTag,
    fallbackLng: "es",
    resources: {
      es: es,
      us: en,
      gb: en,
    },
    interpolation: {
      escapeValue: false,
    },
  });
}).catch(error => {

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    lng: "es",
    fallbackLng: "es",
    resources: {
      es: es,
      us: en,
      gb: en,
    },
    interpolation: {
      escapeValue: false,
    },
  });
});

export default i18n;