// 'use client';
//
// import { useEffect, useState } from 'react';
//
// import Echo from 'laravel-echo';
// import Pusher from 'pusher-js';
//
// if (typeof window !== 'undefined') {
//   window.Pusher = Pusher;
// }
//
// const useEcho = () => {
//   const [echoInstance, setEchoInstance] = useState<Echo | null>(null);
//
//   useEffect(() => {
//     console.log('Creating Echo instance');
//     const echo = new Echo({
//       broadcaster: 'reverb',
//       key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
//       wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
//       wsPort: process.env.NEXT_PUBLIC_REVERB_PORT,
//       wssPort: process.env.NEXT_PUBLIC_REVERB_PORT,
//       forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? 'https') === 'https',
//       enabledTransports: ['ws', 'wss'],
//     });
//
//     setEchoInstance(echo);
//   }, []);
//
//   return echoInstance;
// };
//
// export default useEcho;
