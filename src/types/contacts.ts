export type Contact = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
  address: string | null;
  birth_date: Date | string | null;
  created_at: Date;
  updated_at: Date;
};

export type ContactSaveData = Omit<Contact, 'id' | 'created_at' | 'updated_at'>;

export enum ActiveCrudType {
  Create,
  Edit,
  Delete,
}
