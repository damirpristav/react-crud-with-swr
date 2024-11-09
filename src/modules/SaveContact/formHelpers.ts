/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup';

import { Contact, ContactSaveData } from 'types';

export const validationSchema = yup.object().shape<{ [key in keyof ContactSaveData]: yup.Schema<any> }>({
  email: yup.string().trim().required('Email is required').email('Email is invalid'),
  first_name: yup.string().trim().required('First name is required'),
  last_name: yup.string().trim().required('Last name is required'),
  address: yup.string().trim(),
  phone_number: yup.string().trim(),
  birth_date: yup.string().trim().nullable(),
});

export const defaultData = (contact: Contact | null): ContactSaveData => {
  return {
    first_name: contact?.first_name ?? '',
    last_name: contact?.last_name ?? '',
    email: contact?.email ?? '',
    address: contact?.address ?? '',
    phone_number: contact?.phone_number ?? '',
    birth_date: contact?.birth_date ? new Date(contact.birth_date) : null,
  };
};
