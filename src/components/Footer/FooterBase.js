// import Link from 'next/link';
// import { Trans } from 'react-i18next/TransWithoutContext';
// import { languages } from '@/app/i18n/settings';
//
// export const FooterBase = ({
//   t, i18n, path = '/', attachOnClick,
// }) => {
//   const lng = i18n.resolvedLanguage;
//
//   return (
//     <footer>
//       <Trans i18nKey="languageSwitcher" t={t}>
//         Switch from <strong>{{ lng }}</strong> to:{' '}
//       </Trans>
//       {languages.filter((l) => lng !== l).map((l, index) => (
//           <span key={l}>
//             {index > 0 && (' or ')}
//             {attachOnClick && <Link href={`${path}?lng=${l}`} onClick={(e) => {
//               e.preventDefault();
//               i18n.changeLanguage(l);
//             }}>
//               {l}
//             </Link>}
//             {!attachOnClick && <Link href={`${path}?lng=${l}`}>
//               {l}
//             </Link>}
//           </span>
//       ))}
//       <p>{t('description')}</p>
//     </footer>
//   );
// };
