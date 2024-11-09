/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form } from 'formik';
import toast from 'react-hot-toast';

import { Button, DatePicker, Input, Sidebar } from 'components';
import { Contact, ContactSaveData } from 'types';
import { useCreateContactMutation, useUpdateContactMutation } from 'hooks/useContactsMutations';
import { defaultData, validationSchema } from './formHelpers';

export const SaveContact = ({ contact, onClose, onSuccess }: Props) => {
  const { trigger: createContactTrigger } = useCreateContactMutation();
  const { trigger: updateContactTrigger } = useUpdateContactMutation(contact?.id ?? '');

  const onSubmit = async (values: ContactSaveData) => {
    try {
      const birthDate = values.birth_date ? new Date(values.birth_date) : null;
      const data: ContactSaveData = {
        ...values,
        phone_number: values.phone_number || null,
        address: values.address || null,
        birth_date: birthDate ? `${birthDate.getFullYear()}-${birthDate.getMonth() + 1}-${birthDate.getDate()}` : null,
      };
      if (contact) {
        await updateContactTrigger(data, { onSuccess });
      } else {
        await createContactTrigger(data, { onSuccess });
      }
      toast.success(`Contact successfully ${contact ? 'updated' : 'created'}`);
      onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Sidebar onClose={onClose}>
      <h2>{contact ? 'Edit contact' : 'Create contact'}</h2>
      <Formik<ContactSaveData>
        initialValues={defaultData(contact)}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <Input name="first_name" label="First name" />
            <Input name="last_name" label="Last name" />
            <Input name="email" label="Email" />
            <Input name="phone_number" label="Phone number" />
            <Input name="address" label="Address" />
            <DatePicker name="birth_date" label="Date of birth" />
            <Button type="submit" label="Save" disabled={isSubmitting} isLoading={isSubmitting} />
          </Form>
        )}
      </Formik>
    </Sidebar>
  );
};

type Props = {
  contact: Contact | null;
  onClose: () => void;
  onSuccess: () => void;
};
