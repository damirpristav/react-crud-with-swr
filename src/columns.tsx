import { createColumnHelper } from '@tanstack/react-table';

import { Contact } from 'types';

const columnHelper = createColumnHelper<Contact>();

export const columns = ({ onEdit, onDelete }: ColumnsParameters) => [
  columnHelper.accessor('first_name', {
    header: 'First name',
    meta: {
      isSortable: true,
    },
  }),
  columnHelper.accessor('last_name', {
    header: 'Last name',
    meta: {
      isSortable: true,
    },
  }),
  columnHelper.accessor('email', {
    header: 'Email',
  }),
  columnHelper.accessor('phone_number', {
    header: 'Phone number',
  }),
  columnHelper.accessor('birth_date', {
    header: 'Date of birth',
    meta: {
      isSortable: true,
    },
  }),
  columnHelper.accessor('address', {
    header: 'Address',
  }),
  columnHelper.display({
    id: 'actions',
    meta: {
      headerCellClassName: 'align-right',
      bodyCellClassName: 'align-right',
    },
    cell: ({ row }) => {
      return (
        <div className="actions">
          <button type="button" onClick={() => onEdit(row.original)}>
            edit
          </button>
          <button type="button" onClick={() => onDelete(row.original)} className="delete">
            delete
          </button>
        </div>
      );
    },
  }),
];

type ColumnsParameters = {
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
};
