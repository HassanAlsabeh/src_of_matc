import I18n from 'react-native-i18n';
import en from '../assets/locale/en';
import fr from '../assets/locale/fr';
import ar from '../assets/locale/ar';

I18n.fallbacks = true;

I18n.translations = {
  ar,
  fr,
  en,
};

export default I18n;
