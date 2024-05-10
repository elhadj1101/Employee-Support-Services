import React from 'react'

function FormInput(
    {handleValueChange = (e)=> e.preventDefault(),
    name = "",
    type = "text",
    inputLabel = "",
    placeholder = "",
    inputClassName = "",
    labelClassName = "",
    value = "",
    error = false,
    errMsg = "",
    isTextarea = false,
    containerClassname =""
}

) {
  return (
    <div className={containerClassname}>
      <label
        for={name}
        className={
          "block mb-2 text-sm font-medium " +
          labelClassName +
          (error ? " text-red-700 " : "")
        }
      >
        {inputLabel}
      </label>
      {!isTextarea ? (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={handleValueChange}
          className={
            "w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-transparent border-1 border-gray-200 outline-none h-12 rounded-lg px-4 text-base " +
            inputClassName +
            (error
              ? " bg-red-50 border border-red-500 text-red-900  placeholder-red-700  focus:ring-red-500 focus:border-red-500"
              : "")
          }
          placeholder={placeholder}
        />
      ) : (
        <textarea
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={handleValueChange}
          className={
            "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 outline-none block w-full sm:text-sm border border-gray-300 rounded-md p-4 " +
            inputClassName +
            (error
              ? " bg-red-50 border border-red-500 text-red-900  placeholder-red-700  focus:ring-red-500 focus:border-red-500"
              : "")
          }
          placeholder={placeholder}
        />
      )}
      {error && <p className="mt-2 text-sm text-red-600 ">{errMsg}</p>}
    </div>
  );
}

export default FormInput