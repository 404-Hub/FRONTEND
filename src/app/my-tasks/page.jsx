'use client';

import { useTranslation } from '../i18n/client';
import { Footer } from '../../components/Footer/client';

export default function Page() {
  const { t } = useTranslation('translation');
  return (
    <>
      <h4>{t('h4')}</h4>
      <Footer path="/client-page" />
    </>
  );
}
