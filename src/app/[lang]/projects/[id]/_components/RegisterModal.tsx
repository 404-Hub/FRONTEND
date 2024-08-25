import React from 'react';
import { Modal, Box, Typography, Link } from '@mui/material';
import NextLink from 'next/link';
import RegisterForm from '@/components/auth/RegisterForm';

const RegisterModal = ({ open, onClose }) => (
  <Modal
    open={open}
    onClose={onClose}
    aria-labelledby="register-modal-title"
    aria-describedby="register-modal-description"
  >
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ mb: 2 }}
      >
        Регистрация | 404 Hub
      </Typography>

      <Typography
        component={'div'}
        variant="body2"
        sx={{ mb: 5 }}
      >
        Уже зарегистрированы? {''}
        <NextLink
          href={'/login'}
          passHref
        >
          <Link
            component={'span'}
            variant="subtitle2"
            sx={{ color: '#1976d2', cursor: 'pointer' }}
          >
            Войти
          </Link>
        </NextLink>
      </Typography>

      <RegisterForm />
    </Box>
  </Modal>
);

export default RegisterModal;
