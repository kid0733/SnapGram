import { useCallback, useState } from "react"
import { FileWithPath, useDropzone } from "react-dropzone"
import { Button } from "../ui/button"


type FileUploaderProps={
    fieldChange: (FILES:File[]) => void 
    mediaUrl: string
}

const FileUploader = ({fieldChange, mediaUrl}:FileUploaderProps) => {
    const [file, setFile] = useState<File[]>([])
    const [fileUrl, setFileUrl] = useState(mediaUrl)
    const onDrop = useCallback((acceptedFiles: FileWithPath[])=> {
        setFile(acceptedFiles)
        fieldChange(acceptedFiles)
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))
    }, [file])

    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept:{
            'image/*': ['.png', '.jpg', '.jpeg', '.svg'],
        }
    })
    
    return (
        <div {...getRootProps()} className="flex flex-center flex-col  bg-dark3 rounded-xl cursor-pointer ">
        <input {...getInputProps()} className="cursor-pointer " />
        {
            fileUrl ?(
                <>
                    
                    
                    <div className="flex flex-1 justify-center w-full p-5 lg:p-10 bg-zinc-900 rounded-3xl">
                        <img 
                            src={fileUrl}
                            alt="image" 
                            className="file_uploader-img rounded-3xl"
                        />
                    </div>
                    <p className="file_uploader-label">Click or Drag Photo to Replace</p>
                </>
            ):(
                <div className="file_uploader-box bg-zinc-800 w-full rounded-md">
                    <img 
                        src="assets/icons/file-upload.svg" 
                        width={96}
                        height={77}
                        alt="file uploader"
                    />
                    <h3 className="text-light-2 base-medium mt-6 mb-2">Drag Photo Here</h3>
                    <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>

                    <Button className="shad-button_dark_4">Select From Computer</Button>
                </div>
            )
        }
    </div>
    )
}

export default FileUploader