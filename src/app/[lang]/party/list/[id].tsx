'use client';

import findPageStyles from '@/styles/findProjectStyles/pageStyles';
import { Box } from '@mui/material';
import IdeaDetails from '@/app/[lang]/ideas/[id]/_components/IdeaDetails';
import { getPartyById } from '@/api/client/party';

export default async function PartyPage({ params }: { params: { id: string } }) {
  const partyId = Number(params.id);

  const partyData = await getPartyById(partyId);

  return (
    <Box sx={findPageStyles.mainContainer}>{partyData ? <IdeaDetails id={partyId} /> : <p>Данные не найдены</p>}</Box>
  );
}
