import fetchServer from '@/lib/fetch-server';

export default async function VerifyEmail(props: { token: string }) {
  // const router = useRouter();
  // const { update } = useSession();
  // const searchParams = useSearchParams();

  // async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  // eslint-disable-next-line no-console
  // console.log('Here: ', props.token);
  // eslint-disable-next-line no-console
  // console.log('Test: ', props.token);

  const response = await fetchServer({
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/verify-email/${props.token}`,
  });

  // eslint-disable-next-line no-console
  // console.log(response);

  if (!response.ok) {
    throw response;
  }

  return (
    <>Email Verified</>
    // <form onSubmit={handleSubmit}>
    //   <button type="submit">Verify</button>
    // </form>
  );
}
