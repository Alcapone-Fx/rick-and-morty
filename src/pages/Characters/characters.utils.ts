type CharactersInitSearchParams = {
  name: string;
  page: string;
};

export const buildCharactersInitSearchParams = (
  searchValue = '',
  name = '',
  page = '1',
) => {
  const charactersInitSearchParams = {} as CharactersInitSearchParams;
  if (searchValue) {
    charactersInitSearchParams.name = searchValue;
  }

  charactersInitSearchParams.page = searchValue === name ? page : '1';

  return charactersInitSearchParams;
};
