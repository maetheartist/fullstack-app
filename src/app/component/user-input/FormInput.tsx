// components/form-input/FormInput.tsx (adjust path as needed)
import  {FC, InputHTMLAttributes } from "react";
// import "./form-input.scss";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string; 
}

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
  return (
    <div className="">
        <label>
          {label}
        </label>
      <input className="form-input input" {...otherProps} />
    </div>
  );
};

export default FormInput;
