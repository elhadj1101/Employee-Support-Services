import React from 'react'

function FileUploaded({name,size,Delete}) {
  return (
    <div className=' flex bg-slate-200 space-x-3 items-center rounded-lg py-3 px-4'>
       <img src="/icons/Pdf-icon.png" alt="" />
       <div>
               <span>{name}</span>
               <p className=' text-gray-700'>{(size/1024).toFixed(2)}kB</p>
       </div>
       <img data-name={name} onClick={Delete} className=" cursor-pointer " src="/icons/cancel.png" alt="" />
       
    </div>
  )
}

export default FileUploaded

