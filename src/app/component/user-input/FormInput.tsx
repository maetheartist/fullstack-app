import React from 'react'

type Props = {}

export default function FormInput({label,...otherProps}) {
  return (
    <div className="group">
    <input className="form-input" {...otherProps} />
    {label && (
      <label>
        {label}
      </label>
    )}
  </div>
  )
}