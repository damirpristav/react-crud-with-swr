import ReactDatePicker from 'react-datepicker';
import { useField, useFormikContext } from 'formik';

export const DatePicker = ({ label, name, ...props }: Props) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  return (
    <div className="form-input">
      <label htmlFor={name}>{label}</label>
      <ReactDatePicker
        id={name}
        name={name}
        value={field.value}
        selected={field.value ? new Date(field.value) : null}
        onChange={(date) => setFieldValue(name, date)}
        dateFormat="dd/MM/YYYY"
        className={meta.error && meta.touched ? 'input-error' : ''}
        showYearDropdown
        {...props}
      />
      {meta.error && meta.touched && <p className="form-input__error">{meta.error}</p>}
    </div>
  );
};

interface Props {
  label: string;
  name: string;
}
