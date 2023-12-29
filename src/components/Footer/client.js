'use client';

import { FooterBase } from './FooterBase';
import { useTranslation } from '../../app/i18n/client';

export const Footer = ({ path }) => {
  const { t, i18n } = useTranslation('translation');
  return <FooterBase t={t} i18n={i18n} path={path} attachOnClick/>;
};
