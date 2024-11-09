import useSWRMutation from "swr/mutation";

import { api } from "config";
import { ContactSaveData } from "types";

async function createContact(url: string, { arg }: { arg: ContactSaveData }) {
  return await api.post(url, arg);
}

async function updateContact(url: string, { arg }: { arg: ContactSaveData }) {
  return await api.put(url, arg);
}

async function deleteContact(url: string) {
  return await api.delete(url);
}

export const useCreateContactMutation = () => {
  return useSWRMutation('/contacts', createContact);
};

export const useUpdateContactMutation = (id: string) => {
  return useSWRMutation(`/contacts/${id}`, updateContact);
};

export const useDeleteContactMutation = (id: string) => {
  return useSWRMutation(`/contacts/${id}`, deleteContact);
};
