import { Breadcrumbs, Container, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import Header from '@/app/[lang]/p/[slug]/_components/profile/Header';
import LeftAside from '@/app/[lang]/p/[slug]/_components/profile/LeftAside';
import Content from '@/app/[lang]/p/[slug]/_components/profile/Content';
import { getProfileBySlug } from '@/api/server/profile';
import { TContacts, TProfileInfo } from '@/types/profile';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { checkIsOwner } from '@/lib/session';

type TProfilePageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: TProfilePageProps) {
  const data = await getProfileBySlug(params.slug);
  const profile = data?.user || { name: 'Profile' };

  return {
    title: `${profile.name} | 404Hub`,
  };
}

export default async function ProfilePage({ params }: TProfilePageProps) {
  const session = await getServerSession(authOptions);
  const userSlug = params.slug;
  let isPrivate = false;
  let isOwner: boolean = false;
  let isLogged = false;
  let profile: TProfileInfo = {
    name: '',
    role: 'Unknown',
    avatar: '',
    about: '',
    availability: '',
  };
  let userId: number | null = null;
  let contacts: TContacts[] = [];

  if (session) {
    isLogged = true;
  }

  try {
    const data = await getProfileBySlug(userSlug);
    if (data.user) {
      profile = data.user;
      contacts = data.contacts;
      userId = data.user.user_id;
    }
  } catch (error: any) {
    if (error.status === 403) {
      isPrivate = true;
    }
  }

  isOwner = await checkIsOwner(userId as number);

  return (
    <Container>
      <Breadcrumbs>
        <Link href={'/'}>Home</Link>
        <Typography color="text.primary">Profile</Typography>
      </Breadcrumbs>
      <Grid
        container
        marginTop={'0'}
        rowSpacing={'1.5rem'}
        spacing={'1.5rem'}
      >
        {isPrivate ? (
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{ height: '60vh' }}
          >
            <Typography
              variant="h6"
              textAlign="center"
            >
              This profile is private
            </Typography>
          </Grid>
        ) : (
          <>
            <Header profile={profile} />
            <LeftAside
              profile={profile}
              contacts={contacts}
              isLogged={isLogged}
              isOwner={isOwner}
            ></LeftAside>
            <Content
              profile={profile}
              isLogged={isLogged}
              isOwner={isOwner}
            />
          </>
        )}
      </Grid>
    </Container>
  );
}
