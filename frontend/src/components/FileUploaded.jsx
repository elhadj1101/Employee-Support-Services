import React from 'react'
import { Link } from 'react-router-dom'
function FileUploaded({name,size,Delete, iconSrc="/icons/Pdf-icon.png",fileLink="" }) {
  return (
    <>
      {fileLink !== "" ? (
        <Link
          to={fileLink}
          target="_blank"
        >
          <div className=" flex bg-slate-200 space-x-3 items-center rounded-lg py-3 px-4 border border-gray-400">
            <img src={iconSrc} alt="" className="h-[48px] w-[48px]" />
            <div>
              <span>{name}</span>
              <p className=" text-gray-700">{(size / 1024).toFixed(2)}kB</p>
            </div>
            {Delete && (
              <img
                data-name={name}
                onClick={Delete}
                className=" cursor-pointer "
                src="/icons/cancel.png"
                alt=""
              />
            )}
          </div>
        </Link>
      ) : (
        <div className=" flex bg-slate-200 space-x-3 items-center rounded-lg py-3 px-4 border border-gray-400">
          <img src={iconSrc} alt="" className="h-[48px] w-[48px]" />
          <div>
            <span>{name}</span>
            <p className=" text-gray-700">{(size / 1024).toFixed(2)}kB</p>
          </div>
          {Delete && (
            <img
              data-name={name}
              onClick={Delete}
              className=" cursor-pointer "
              src="/icons/cancel.png"
              alt=""
            />
          )}
        </div>
      )}
    </>
  );
}

export default FileUploaded

