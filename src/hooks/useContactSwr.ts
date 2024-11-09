import useSWR from 'swr';

import { fetcher } from 'config';
import { Contact } from 'types';

// use this if you want to use new page for contact save(update/create) instead of sidebar
export const useContactSwr = (id: string) => {
  return useSWR(id ? `/contacts/${id}` : null, fetcher<Contact>, { revalidateOnFocus: false });
};
