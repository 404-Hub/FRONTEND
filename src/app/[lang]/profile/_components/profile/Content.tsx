import { Avatar, Box, Button, Grid, Paper, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MenuIcon from '@/components/icons/MenuIcon';
import Image from 'next/image';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { grey } from '@mui/material/colors';
import SendIcon from '@mui/icons-material/Send';

const Content = () => {
  const i = 1;

  return (
    <Grid
      item
      xs={12}
      md={8}
    >
      <Paper
        elevation={2}
        sx={{ padding: '1rem' }}
      >
        <Box>
          <TextField
            id={'new-post'}
            label={'New post'}
            variant={'outlined'}
            multiline
            fullWidth
            minRows={4}
          />
        </Box>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          sx={{ marginTop: '1rem' }}
        >
          <Box
            display={'flex'}
            gap={'1rem'}
            alignItems={'center'}
          >
            <AttachFileIcon />
            <Typography variant="body2">add file</Typography>
          </Box>
          <Box
            display={'flex'}
            gap={'1.5rem'}
          >
            <Button
              variant={'outlined'}
              color={'success'}
            >
              Очистить
            </Button>
            <Button
              variant={'contained'}
              color={'success'}
            >
              Опубликовать
            </Button>
          </Box>
        </Box>
      </Paper>

      <Paper
        elevation={2}
        sx={{ marginTop: '1.5rem', padding: '1rem' }}
      >
        <Box
          className={'post-header'}
          display={'flex'}
          justifyContent={'space-between'}
        >
          <Box
            display={'flex'}
            gap={'1rem'}
          >
            <Avatar
              src={'/images/default_avatar.png'}
              sx={{ width: '56px', height: '56px' }}
            />
            <Box>
              <Typography variant="subtitle1">Alex Smith</Typography>
              <Typography variant="caption">12 Aug 2023, 10:00 PM</Typography>
            </Box>
          </Box>
          <Box
            display={'flex'}
            alignItems={'center'}
          >
            <MenuIcon />
          </Box>
        </Box>
        <Box
          className={'post-content'}
          sx={{ marginTop: '1.5rem' }}
        >
          <Typography variant={'subtitle2'}>
            {`Обучение - ключ к бескрайним возможностям и развитию! 📚💡 Неважно, на каком этапе жизни ты находишься,
              всегда есть что учить, и мир полон удивительных знаний. В нашем новом посте мы поделимся с вами несколькими
              секретами успешного обучения, а также расскажем, как найти мотивацию и ресурсы для саморазвития. Поднимайте
              свой уровень знаний и умений вместе с нами! 🌱✨ #Обучение #Саморазвитие #Учись и #Развивайся"`}
          </Typography>
          <Box sx={{ marginTop: '1rem' }}>
            <Image
              src={'/images/post_img.png'}
              alt={'post_img'}
              width={600}
              height={400}
            />
          </Box>
        </Box>
        <Box
          className={'post-like-share'}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Box
            display={'flex'}
            gap={'1rem'}
            alignItems={'center'}
          >
            <Box
              display={'flex'}
              gap={'1rem'}
              alignItems={'center'}
            >
              <FavoriteIcon color={'error'} />
              <Typography variant={'h6'}>44</Typography>
            </Box>
            <Box>
              <Avatar sx={{ width: '32px', height: '32px' }} />
            </Box>
          </Box>
          <Box>
            <ShareIcon />
          </Box>
        </Box>
        <Box
          className={'post-comments'}
          sx={{ marginTop: '1rem' }}
        >
          <Box
            className={'post-comment'}
            display={'flex'}
            gap={'12px'}
          >
            <Box>
              <Avatar sx={{ width: '56px', height: '56px' }} />
            </Box>
            <Box sx={{ padding: '1rem', borderRadius: '0.5rem', backgroundColor: grey[100] }}>
              <Box
                display={'flex'}
                alignItems={'center'}
                gap={'0.5rem'}
              >
                <Typography variant={'body1'}>Jenny Wilson</Typography>
                <Typography variant={'caption'}>12 Jan 2023</Typography>
              </Box>
              <Box sx={{ marginTop: '12px' }}>
                <Typography variant="body2">
                  расскажем, как найти мотивацию и ресурсы для саморазвития. Поднимайте свой уровень знаний и умений
                  вместе с нами!
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          className={'post-leave-comment'}
          display={'flex'}
          gap={'0.5rem'}
          sx={{ marginTop: '1rem' }}
        >
          <Box>
            <Avatar sx={{ width: '56px', height: '56px' }} />
          </Box>
          <Box
            sx={{
              position: 'relative',
              flex: 1,
            }}
          >
            <TextField
              label={'write a comment'}
              multiline
              fullWidth
            />
            <Box
              sx={{
                position: 'absolute',
                right: '1rem',
                bottom: '1rem',
                display: 'flex',
                gap: '1rem',
              }}
            >
              <AttachFileIcon />
              <SendIcon />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Content;
