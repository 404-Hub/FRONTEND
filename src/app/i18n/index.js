import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { cookies, headers } from 'next/headers';
import acceptLanguage from 'accept-language';
import { getOptions, languages, fallbackLng } from './settings';

const initI18next = async (lng, ns) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language, namespace) => import(`./locales/${language}/${namespace}.json`)))
    .init(getOptions(lng, ns));
  return i18nInstance;
};

acceptLanguage.languages(languages);
const cookieName = 'i18next404';

export function detectLanguage() {
  const ckies = cookies();
  // console.log('DL ckies=>', ckies);
  const hders = headers();
  // console.log('DL hders=>', hders);
  let lng;
  const nextUrlHeader = hders.has('next-url') && hders.get('next-url');
  // console.log('nextUrlHeader=>', nextUrlHeader);
  if (nextUrlHeader && nextUrlHeader.indexOf('"lng":"') > -1) {
    const qsObj = JSON.parse(nextUrlHeader.substring(nextUrlHeader.indexOf('{'), nextUrlHeader.indexOf('}') + 1));
    lng = qsObj.lng;
  }
  if (!lng && ckies.has(cookieName)) lng = acceptLanguage.get(ckies.get(cookieName).value);
  if (!lng) lng = acceptLanguage.get(hders.get('Accept-Language'));
  if (!lng) lng = fallbackLng;
  return lng;
}

export async function useTranslation(ns, options = {}) {
  const lng = detectLanguage();
  // console.log('detectLanguage=>', lng);
  // console.log('ns=>', ns);
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
    i18n: i18nextInstance,
  };
}
