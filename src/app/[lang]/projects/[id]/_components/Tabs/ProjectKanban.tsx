import { Avatar, AvatarGroup, Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import Soon from '@/components/base/Soon';

const ProjectKanban = () => {
  const i = 0;
  return <Soon />;
  // return (
  //   <Grid
  //     container
  //     spacing={2}
  //     sx={{ mt: 3 }}
  //   >
  //     {/* Column 1: Данные */}
  //     <Grid
  //       item
  //       xs={3}
  //     >
  //       <Typography variant="h6">Данные</Typography>
  //       <Card sx={{ mt: 2 }}>
  //         <CardContent>
  //           <Chip
  //             label="Low"
  //             color="primary"
  //           />
  //           <Typography
  //             variant="body1"
  //             sx={{ mt: 1 }}
  //           >
  //             Нужно сделать канбан доску для проекта
  //           </Typography>
  //           <AvatarGroup
  //             max={4}
  //             sx={{ mt: 1 }}
  //           >
  //             <Avatar alt="Person 1" />
  //             <Avatar alt="Person 2" />
  //             <Avatar alt="Person 3" />
  //           </AvatarGroup>
  //         </CardContent>
  //       </Card>
  //     </Grid>
  //
  //     {/* Column 2: Нужно сделать */}
  //     <Grid
  //       item
  //       xs={3}
  //     >
  //       <Typography variant="h6">Нужно сделать</Typography>
  //       <Card sx={{ mt: 2 }}>
  //         <CardContent>
  //           <Typography variant="body1">Создать карточку товара и корзину</Typography>
  //         </CardContent>
  //       </Card>
  //     </Grid>
  //
  //     {/* Column 3: В работе */}
  //     <Grid
  //       item
  //       xs={3}
  //     >
  //       <Typography variant="h6">В работе</Typography>
  //       <Card sx={{ mt: 2 }}>
  //         <CardContent>
  //           <Chip
  //             label="Medium"
  //             color="warning"
  //           />
  //           <Typography variant="body1">Обновить данные в профиле</Typography>
  //           <AvatarGroup
  //             max={4}
  //             sx={{ mt: 1 }}
  //           >
  //             <Avatar alt="Person 1" />
  //             <Avatar alt="Person 2" />
  //           </AvatarGroup>
  //         </CardContent>
  //       </Card>
  //     </Grid>
  //
  //     {/* Column 4: Пул реквест */}
  //     <Grid
  //       item
  //       xs={3}
  //     >
  //       <Typography variant="h6">Пул реквест</Typography>
  //       <Card sx={{ mt: 2 }}>
  //         <CardContent>
  //           <Typography variant="body1">Создать статусы для заявок</Typography>
  //           <AvatarGroup
  //             max={4}
  //             sx={{ mt: 1 }}
  //           >
  //             <Avatar alt="Person 1" />
  //           </AvatarGroup>
  //         </CardContent>
  //       </Card>
  //     </Grid>
  //
  //     {/* Column 5: Выполненно */}
  //     <Grid
  //       item
  //       xs={3}
  //     >
  //       <Typography variant="h6">Выполненно</Typography>
  //       <Card sx={{ mt: 2 }}>
  //         <CardContent>
  //           <Typography variant="body1">Добавить фото профиля</Typography>
  //         </CardContent>
  //       </Card>
  //     </Grid>
  //   </Grid>
  // );
};

export default ProjectKanban;
