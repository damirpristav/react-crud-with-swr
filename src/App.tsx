/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast, { Toaster } from 'react-hot-toast';

import { useContacts } from 'hooks/useContacts';
import { useDeleteContactMutation } from 'hooks/useContactsMutations';
import { columns } from 'columns';
import { Button, Modal, Table } from 'components';
import { ActiveCrudType, Contact } from 'types';
import { SaveContact } from 'modules';

function App() {
  const [activeCrudType, setActiveCrudType] = useState<ActiveCrudType | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const {
    data,
    isLoading,
    search,
    debouncedSearch,
    birthDate,
    birthDateBefore,
    sortBy,
    sortDirection,
    pages,
    currentPage,
    setSearch,
    setBirthDate,
    setBirthDateBefore,
    onSort,
    clearFilters,
    goToNextPage,
    goToPrevPage,
    onPageChange,
    mutate,
  } = useContacts();

  const { trigger: triggerDelete, isMutating: isDeleting } = useDeleteContactMutation(selectedContact?.id ?? '');

  const openSaveContactSidebar = () => {
    setActiveCrudType(ActiveCrudType.Create);
  };

  const closeSaveContactSidebar = () => {
    setActiveCrudType(null);
    setSelectedContact(null);
  };

  const onEditClick = (contact: Contact) => {
    setSelectedContact(contact);
    setActiveCrudType(ActiveCrudType.Edit);
  };

  const onDeleteClick = (contact: Contact) => {
    setSelectedContact(contact);
    setActiveCrudType(ActiveCrudType.Delete);
  };

  const onContactDelete = async (callback?: () => void) => {
    try {
      await triggerDelete();
      toast.success('Contact deleted!');
      // if on last page and only one contact is on last page go to prev page otherwise refetch contacts
      if (data && data.last_page === currentPage && data.data.length === 1 && currentPage > 1) {
        goToPrevPage();
      } else {
        mutate();
      }
      callback?.();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
      <main className="main-wrapper">
        <h1>Contacts</h1>
        <div className="data-wrapper">
          <div className="filters">
            <input
              type="text"
              placeholder="Search by first name, last name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            <DatePicker
              selected={birthDate}
              onChange={(date) => {
                setBirthDate(date ?? undefined);
                onPageChange(1);
              }}
              showYearDropdown
              className="date-input"
              placeholderText="Birth date"
              maxDate={birthDateBefore}
            />
            <DatePicker
              selected={birthDateBefore}
              onChange={(date) => {
                setBirthDateBefore(date ?? undefined);
                onPageChange(1);
              }}
              showYearDropdown
              className="date-input"
              placeholderText="Birth date before"
              minDate={birthDate}
            />
            <Button label="Add new contact" onClick={openSaveContactSidebar} />
            {(!!debouncedSearch || !!birthDate || !!birthDateBefore || !!sortBy) && (
              <button type="button" onClick={clearFilters} className="clear-button">
                Clear filters
              </button>
            )}
          </div>
          <div className="table-wrapper">
            {isLoading && (
              <div className="loading-wrapper">
                <p>Loading...</p>
              </div>
            )}
            <div className="table-container">
              <Table<Contact>
                data={data?.data ?? []}
                columns={columns({
                  onEdit: onEditClick,
                  onDelete: onDeleteClick,
                })}
                onSort={onSort}
                sortBy={sortBy}
                sortDirection={sortDirection}
              />
            </div>
          </div>
          <div className="pagination">
            <Button label="prev" onClick={goToPrevPage} disabled={data && data.current_page === 1} isSmall />
            {pages.map(({ page, active, skip }, index) =>
              !skip ? (
                <Button
                  key={page}
                  label={`${page}`}
                  onClick={() => onPageChange(page)}
                  disabled={active}
                  isPaginationButton
                />
              ) : (
                <span key={`dots_${index}`}>...</span>
              )
            )}
            <Button label="next" onClick={goToNextPage} disabled={data && data.last_page === currentPage} isSmall />
          </div>
        </div>
      </main>

      {((activeCrudType === ActiveCrudType.Edit && !!selectedContact) || activeCrudType === ActiveCrudType.Create) && (
        <SaveContact contact={selectedContact} onSuccess={() => mutate()} onClose={closeSaveContactSidebar} />
      )}

      {!!selectedContact && activeCrudType === ActiveCrudType.Delete && (
        <Modal onClose={() => setSelectedContact(null)}>
          {({ onModalClose }) => (
            <>
              <p>Are you sure you want to delete this contact({selectedContact.first_name}) ?</p>
              <div className="modal-actions">
                <Button label="Cancel" variant="outline" onClick={onModalClose} />
                <Button
                  label="Delete"
                  variant="danger"
                  disabled={isDeleting}
                  isLoading={isDeleting}
                  onClick={() => onContactDelete(onModalClose)}
                />
              </div>
            </>
          )}
        </Modal>
      )}
    </>
  );
}

export default App;
