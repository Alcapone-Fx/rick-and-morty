import { useLazyQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import { GET_CHARACTER } from '../../graphql/queries';
import { Character, CHARACTER_STATUS } from '../../models/characters';

type CharacterListProps = {
  isLoading: boolean;
  characters: Character[];
};

export const CharacterList = ({
  isLoading,
  characters = [],
}: CharacterListProps) => {
  const [getCharacter] = useLazyQuery(GET_CHARACTER);

  if (isLoading) {
    return (
      <Grid container gap={2} justifyContent="center">
        {Array(12)
          .fill(0)
          .map((_, index) => (
            <Box
              key={index}
              mb={1}
              sx={{
                width: 300,
                height: 360,
              }}
            >
              <Skeleton
                variant="rectangular"
                sx={{
                  width: 300,
                  height: 360,
                }}
              />
            </Box>
          ))}
      </Grid>
    );
  }

  if (!isLoading && !characters) {
    return <Typography variant="h4">No characters found</Typography>;
  }

  return (
    <Grid container justifyContent="center" gap={2} pl={2} pr={2}>
      {characters?.map((character) => (
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
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              onClick={() => {
                getCharacter({
                  variables: { id: character.id },
                });
              }}
            >
              {character.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Origin: </strong>
              {character.origin.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Location: </strong>
              {character.location.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Species: </strong>
              {character.species}
            </Typography>
            <Chip
              sx={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
              }}
              label={character.status}
              color={CHARACTER_STATUS[character.status]}
              size="small"
            />
          </CardContent>
        </Card>
      ))}
    </Grid>
  );
};
