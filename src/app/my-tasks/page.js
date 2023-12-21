'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from '../i18n/client';
import { Footer } from '../../components/Footer/client';

export default function Page() {
  const { t } = useTranslation('my-tasks');
  const [counter, setCounter] = useState(0);
  return (
    <>
      <main>
        <p>{t('counter', { count: counter })}</p>
        <div>
          <button onClick={() => setCounter(Math.max(0, counter - 1))}>-</button>
          <button onClick={() => setCounter(Math.min(10, counter + 1))}>+</button>
        </div>
        <Link href="/">
          <button type="button">
            {t('back-to-home')}
          </button>
        </Link>
      </main>
      <Footer path="/client-page" />
    </>
  );
}
