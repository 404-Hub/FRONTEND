import { useSession, signIn } from 'next-auth/react';
import { useState } from 'react';

const ShowModal = () => {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);

  const handleTakeTask = async () => {
    if (!session) {
      setShowModal(true);
      return;
    }

    try {
      // Как связать номер задачи
      const response = await fetch('https://hubdev.svyat404.com/api/v1/apps/assign/2', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      if (response.status === 401) {
        setShowModal(true);
      } else {
        // Обработка успешного ответа
        console.log('Task assigned successfully');
      }
    } catch (error) {
      console.error('Error assigning task:', error);
    }
  };

  const handleLogin = () => {
    signIn();
  };

  const handleRegister = () => {
    // Перенаправьте пользователя на страницу регистрации
    window.location.href = '/register';
  };

  return (
    <div>
      <button onClick={handleTakeTask}>Take Task</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Login Required</h2>
            <p>Please log in to take this task.</p>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Register</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowModal;
