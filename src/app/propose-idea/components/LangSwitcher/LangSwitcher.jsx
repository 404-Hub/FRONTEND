import React from 'react';
import { Button } from '@mui/material';
import { useTranslation } from '../../../i18n/client';

export const LangSwitcher = () => {
  const { i18n } = useTranslation('translation');
  const { resolvedLanguage } = i18n;

  const toggleLanguage = () => {
    i18n.changeLanguage(resolvedLanguage === 'ru' ? 'en' : 'ru');
  };

  return (
    <Button onClick={toggleLanguage}>
      {resolvedLanguage === 'ru' ? 'Switch to English' : 'Переключить на русский'}
    </Button>
  );
};
