import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import en from './en.json';
import ru from './ru.json';

console.log('init i18n');
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {en, ru},
    lng: "en",
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
