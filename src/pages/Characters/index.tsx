import { ChangeEvent, useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Pagination from '@mui/material/Pagination';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Typography from '@mui/material/Typography';

import { CharacterList } from './CharacterList';
import { GET_CHARACTERS } from '../../graphql/queries';
import { useDebounce } from '../../hooks/useDebounce';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { CharactersResponse } from '../../models/characters';

import { buildCharactersInitSearchParams } from './characters.utils';

const Characters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  useScrollToTop(searchParams);
  const [getCharacters, { data, loading: charactersLoading }] =
    useLazyQuery<CharactersResponse>(GET_CHARACTERS);
  const [searchValue, setSearchValue] = useState(
    searchParams.get('name') || '',
  );
  const debouncedSearchValue = useDebounce(searchValue, 500);

  /**
   * Effect to handle the search params changes
   */
  useEffect(() => {
    if (searchParams.has('page')) {
      getCharacters({
        variables: {
          page: Number(searchParams.get('page')) || 1,
          name: debouncedSearchValue,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  /**
   * Effect to handle the search value changes
   */
  useEffect(() => {
    setSearchParams(
      buildCharactersInitSearchParams(
        debouncedSearchValue,
        searchParams.get('name') || '',
        searchParams.get('page') || '1',
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue]);

  if (!searchParams.has('page')) {
    return <Navigate to="/characters?page=1" replace />;
  }

  return (
    <>
      <Grid container>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <Typography variant="h4">Characters</Typography>
          </Grid>
        </Grid>
        <Grid container m={2} justifyContent="center">
          <FormControl sx={{ width: '24rem' }} variant="outlined" size="small">
            <InputLabel htmlFor="search-character">Search Character</InputLabel>
            <OutlinedInput
              label="Search Character"
              id="search-character"
              type="search"
              size="small"
              value={searchValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchValue(e.target.value)
              }
              endAdornment={
                <InputAdornment position="end">
                  <SearchOutlinedIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <CharacterList
          isLoading={charactersLoading}
          characters={data?.characters?.results || []}
        />
      </Grid>
      {data?.characters?.info?.pages && (
        <Pagination
          variant="outlined"
          shape="rounded"
          size="large"
          color="primary"
          sx={{ margin: '2rem auto' }}
          page={Number(searchParams.get('page')) || 1}
          count={data?.characters?.info?.pages || 0}
          onChange={(_: ChangeEvent<unknown>, page: number) => {
            setSearchParams(
              buildCharactersInitSearchParams(
                debouncedSearchValue,
                searchParams.get('name') || '',
                String(page),
              ),
            );
          }}
        />
      )}
    </>
  );
};

export default Characters;
