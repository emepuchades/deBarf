import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import es from "./es.json";
import * as SQLite from "expo-sqlite";
import { getLanguage } from "../utils/db/dbMenu";

export const initializeI18n = async () => {
  const defaultLanguage = await getLanguage(SQLite.openDatabase("debarf.db"));

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    lng: defaultLanguage.data.tag,
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
  return i18n;
};
initializeI18n();