import { getCurrentUser } from '@/lib/session';
import { ChangePasswordForm } from '@/components/auth/ChangePasswordForm';
import UpdateUserForm from '@/components/auth/UpdateUserForm';

export default async function Page() {
  const user = await getCurrentUser();

  return (
    <div>
      <h1>Settings</h1>

      <section>
        <h2>Update user</h2>
        <UpdateUserForm user={user} />
      </section>

      <section>
        <h2>Change password</h2>
        <ChangePasswordForm />
      </section>
    </div>
  );
}
