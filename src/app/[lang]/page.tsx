import { MainCover } from '@/components/MainCover';
import { Container } from '@mui/material';

export default async function Page() {
  return (
        <Container sx={{
          marginTop: '12px',
          marginBottom: '120px',
        }}>
            <div>
                <MainCover/>
            </div>
        </Container>
  );
}
