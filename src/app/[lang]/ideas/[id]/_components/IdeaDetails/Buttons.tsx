import { Box, Button, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

type TIdeaButtons = {
  idea: any;
  handleIsIdeaTakenChange: () => void;
};
const Buttons = (props: TIdeaButtons) => {
  const router = useRouter();
  const { idea, handleIsIdeaTakenChange } = props;

  const isTaken = idea?.is_assigned;
  const isPartyExist = idea?.party;

  const projectButtonText = isTaken ? 'Перейти в проект' : 'Начать проект';
  const partyButtonText = isPartyExist ? 'Перейти в команду' : 'Собрать команду';

  const handelPartyClick = () => {
    if (idea.party) {
      router.push(`/party/${idea.party.id}`);
      return;
    }
    router.push(`/party/new?ideaId=${idea?.id.toString()}`);
  };
  return (
    <Box>
      <Grid
        container
        rowSpacing={4}
      >
        <Grid
          item
          xs={12}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          {isPartyExist && (
            <>
              <Typography variant="h6">Ожидание сбора команды</Typography>
              <Typography variant="body1">
                Получайте заявки на вступление в команду и добавляете участников в проект
              </Typography>
            </>
          )}
          {!isPartyExist && (
            <>
              <Typography variant="h6">Хочешь попробовать совместную разработку?</Typography>
              <Typography variant="body1">Собери команду за 3 простых шага, чтобы начать совместный проект</Typography>
            </>
          )}

          <Button
            variant={'contained'}
            color={'warning'}
            size={'large'}
            sx={{ mt: 2, color: 'white' }}
            onClick={() => {
              handelPartyClick();
            }}
          >
            {partyButtonText}
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          {isTaken && <Typography variant="body1">Проект уже в работе</Typography>}
          {!isTaken && (
            <>
              <Typography variant="h6">Хочешь начать собственный проект?</Typography>
              <Typography variant="body1">Ты сможешь собрать команду или вступить в уже созданную позже</Typography>
            </>
          )}

          <Button
            variant="contained"
            color="success"
            size={'large'}
            sx={{ mt: 2 }}
            onClick={() => {
              if (isTaken) {
                router.push(`/projects/${idea.project.id}`);
              } else {
                handleIsIdeaTakenChange();
              }
            }}
          >
            {projectButtonText}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Buttons;
