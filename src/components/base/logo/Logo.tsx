import { FC } from 'react';
import { SX } from '@/types/sx';
import Image from 'next/image';
import Link from 'next/link';

export type LogoProps = {
  sx?: SX;
};

export const Logo: FC<LogoProps> = () => (
    <Link href={'/'}>
      <Image src={'/images/logo.png'} alt={'404hub'} width={100} height={30}/>
    </Link>
);
