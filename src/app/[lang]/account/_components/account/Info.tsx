import { useEffect, useState } from 'react';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';

const Info = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    setUser(session?.user || ({} as User));
  }, [status, session]);

  return (
    <div>
      <h1>Info</h1>
      <p>{user.email}</p>
      <p>{user.name}</p>
    </div>
  );
};

export default Info;
