import React, { useCallback, useState } from 'react';

const FileUpload = () => {
    const [files, setFiles] = useState([]);
    const [isDragActive, setIsDragActive] = useState(false);

    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        setIsDragActive(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragActive(false);
    }, []);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
    }, []);

    const handleDrop = useCallback(
        (e) => {
            e.preventDefault();
            setIsDragActive(false);
            const droppedFiles = Array.from(e.dataTransfer.files);
            setFiles((prv) => {
              return [...prv, ...droppedFiles];
            });
        },
        [files]
    );

    const handleFileChange = useCallback((e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles((prv) => {
          return [...prv, ...selectedFiles];
        });
    }, [files]);


    return (
        <div className=" mt-7 mb-12 mx-5 m flex-col items-center justify-center">
            <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`bg-white rounded-md shadow-md p-8 border-2 border-dashed ${isDragActive ? 'border-blue-500' : 'border-gray-300'}`}
            >
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                />
                <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center cursor-pointer"
                >
                    <div className="flex items-center justify-center mb-4">

                        <img src="/icons/cloud.png" alt="" />
                    </div>
                    <div className="text-center text-gray-600 mb-4">
                        {isDragActive ? (
                            <p>Drop the files here...</p>
                        ) : (
                            <>
                                <p>Drag &amp; drop files or <span className=' text-indigo-700 font-medium  underline'>Browse</span></p>

                            </>
                        )}
                    </div>
                </label>
                <div className="text-sm text-gray-500 flex  justify-center">
                    Supported formats: JPG, PNG, GIF, MP4, PDF. Max 20 MB.
                </div>

            </div>

            {files.length > 0 && (
                <div className='flex flex-wrap gap-3 mt-4'>
                    {files.map((file) => (
                        <div className="flex items-center bg-green-500 text-slate-100 p-2 rounded-md" key={file.name}>
                            <img className='h-8 mr-2' src="/icons/file-icon.png" alt="" />
                            <p>{file.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileUpload;