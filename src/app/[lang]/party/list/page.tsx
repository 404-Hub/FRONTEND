'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPartyRequests } from '@/api/client/party';
import { Box, Button, Typography } from '@mui/material';

interface Party {
  id: number;
  requirements: string;
  duration: string;
}

const PartyListPage = () => {
  const router = useRouter();
  const [parties, setParties] = useState<Party[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchParties = async () => {
    try {
      const ideaId = 11;
      const data = await getPartyRequests(ideaId);
      if (data) {
        setParties(data);
      } else {
        setError('Запросы не найдены');
      }
    } catch (err) {
      setError('Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParties();
  }, []);

  const handleViewParty = (id: number) => {
    router.push(`/party/list/${id}`);
  };

  return (
    <Box>
      <Typography variant="h1">Список партий</Typography>

      {loading && <Typography>Загрузка...</Typography>}
      {error && <Typography>{error}</Typography>}

      {!loading && !error && (
        <Box>
          {parties.length === 0 ? (
            <Typography>Нет доступных партий.</Typography>
          ) : (
            parties.map((party) => (
              <Box
                key={party.id}
                sx={{ marginBottom: 2 }}
              >
                <Typography variant="h6">{party.requirements}</Typography>
                <Button
                  variant="contained"
                  onClick={() => handleViewParty(party.id)}
                >
                  Посмотреть детали
                </Button>
              </Box>
            ))
          )}
        </Box>
      )}
    </Box>
  );
};

export default PartyListPage;
