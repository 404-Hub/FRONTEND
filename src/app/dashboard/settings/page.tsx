import { getCurrentUser } from '@/lib/session';
import { ChangePasswordForm } from '@/containers/change-password-form';
import UpdateUserForm from '@/containers/update-user-form';

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
