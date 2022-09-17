import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import es from './es.json';

i18n.use(initReactI18next).init({
lng: 'es',
fallbackLng: 'es',
resources: {
	es: es,
	en: en,
},
interpolation: {
	escapeValue: false // react already safes from xss
}
});

export default i18n;
