import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const GET_CHARACTERS = gql`
  query Character {
    characters(page: 0) {
      results {
        id
        name
        status
        image
        species
        location {
          name
        }
        origin {
          name
        }
      }
    }
  }
`;

interface KV {
  [key: string]: 'primary' | 'error' | 'default';
}

const CHARACTER_STATUS: KV = {
  Alive: 'primary',
  Dead: 'error',
  unknown: 'default',
};

const Characters: React.FC = () => {
  const { data } = useQuery(GET_CHARACTERS);
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <Grid container>
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item>
            <Typography variant='h4'>Characters</Typography>
          </Grid>
        </Grid>
        <Grid container m={2} gap={2} justifyContent='space-evenly'>
          <Grid item>
            <Box
              component='form'
              sx={{
                '& > :not(style)': { width: '24rem' },
              }}
              noValidate
              autoComplete='off'
            >
              <TextField
                id='search-character'
                label='Search Character'
                size='small'
                variant='outlined'
              />
            </Box>
          </Grid>
          <Grid item>
            <Button variant='contained'>Search</Button>
          </Grid>
        </Grid>
        <Grid container gap={2} pl={2} pr={2}>
          {data &&
            data?.characters?.results?.map(
              (character: {
                name: string;
                id: string;
                image: string;
                origin: { name: string };
                location: { name: string };
                species: string;
                status: string;
              }) => (
                <Card
                  sx={{ width: 300, position: 'relative' }}
                  key={character.id}
                  raised
                >
                  <CardMedia
                    sx={{ height: 300 }}
                    image={character.image}
                    title={character.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {character.name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      <strong>Origin: </strong>
                      {character.origin.name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      <strong>Location: </strong>
                      {character.location.name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      <strong>Species: </strong>
                      {character.species}
                    </Typography>
                    <Chip
                      sx={{ position: 'absolute', top: '1rem', right: '1rem' }}
                      label={character.status}
                      color={CHARACTER_STATUS[character.status]}
                      size='small'
                    />
                  </CardContent>
                </Card>
              )
            )}
        </Grid>
      </Grid>
    </>
  );
};

export default Characters;
