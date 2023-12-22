import { Footer as AnyFooter } from '@/components/Footer';
import { useTranslation } from '@/app/i18n';
import { Navigation } from '@/components/layout/Navigation';
import { MainCover as AnyMainCover } from '../components/MainCover';

const Footer = AnyFooter as any;
const MainCover = AnyMainCover as any;

export default async function Page() {
  const { t } = await useTranslation('translation');
  console.log(t('h4Main'));
  return (
    <>
      <Navigation/>
      <main style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '12px',
        marginBottom: '120px',
        padding: '4px',
      }}>
        <MainCover/>
      </main>
      <footer style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '12px',
        padding: '4px',
      }}>
        <Footer path="/"/>
      </footer>
    </>
  );
}
