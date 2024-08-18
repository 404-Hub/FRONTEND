'use client';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box, Grid } from '@mui/material';
import { useState, type SyntheticEvent } from 'react';
import Info from '@/app/[lang]/account/_components/account/Info';
import Security from '@/app/[lang]/account/_components/account/Security';

type TAccountType = 'info' | 'security' | (string & {});

const Account = () => {
  const [tab, setTab] = useState<TAccountType>('info');

  const tabsContent: Record<TAccountType, any> = {
    info: <Info />,
    security: <Security />,
  };

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };
  return (
    <Box>
      <Tabs
        value={tab}
        onChange={handleChange}
      >
        <Tab
          value={'info'}
          label={'Information'}
        />
        <Tab
          value={'security'}
          label={'Security'}
        />
      </Tabs>
      <Grid container>
        <Grid
          item
          xs={12}
        >
          {tabsContent[tab]}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Account;
