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
  console.log({ charactersInitSearchParams, searchValue, name });
  // const charactersInitSearchParams = {
  //   name: searchValue || undefined,
  // } as CharactersInitSearchParams;

  charactersInitSearchParams.page = searchValue === name ? page : '1';

  return charactersInitSearchParams;
};
