import useSWR from "swr";

import { fetcher } from "config";
import { Contact } from "types";

export const useContactsSwr = ({ page, per_page, birth_date, birth_date_before, search, sort_by, sort_direction }: Filters) => {
  let url = `/contacts?page=${page}`;

  if (per_page) {
    url += `&per_page=${per_page}`;
  }

  if (search) {
    url += `&search=${search}`;
  }

  if (birth_date) {
    const date = new Date(birth_date);
    url += `&birth_date=${birth_date.getFullYear()}-${birth_date.getMonth() + 1}-${date.getDate()}`;
  }

  if (birth_date_before) {
    const date = new Date(birth_date_before);
    url += `&birth_date_before=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  if (sort_by) {
    url += `&sort_by=${sort_by}`;
  }

  if (sort_direction) {
    url += `&sort_direction=${sort_direction}`;
  }

  return useSWR(url, fetcher<Contact>, { revalidateOnFocus: false });
};

type Filters = {
  page: number;
  per_page?: number;
  birth_date?: Date;
  birth_date_before?: Date;
  search?: string;
  sort_by?: string;
  sort_direction?: string;
};
