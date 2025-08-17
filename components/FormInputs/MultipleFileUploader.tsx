import React from 'react'
import { UploadDropzone } from '@/lib/uploadthing'
import { Pencil, XCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import {
    FaFilePdf,
    FaImage,
    FaFileWord,
    FaFileExcel,
    FaFilePowerpoint,
    FaFileArchive,
    FaFileAlt
} from 'react-icons/fa'
import {MdTextSnippet} from 'react-icons/md'

type MultipleImageInputProps = {
    label: string;
    files: FileProps[];
    setFiles: any;
    className?: string;
    endPoint?: any;
}

export type FileProps = {
    title: string;
    type: string;
    size: number;
    url: string;
}

const MultipleImageInput = ({ label, files, setFiles, className, endPoint }: MultipleImageInputProps) => {
    return (
        <div className={className}>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</label>
            <div className="grid grid-cols-2 gap-2">
                {files.map((file, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2"
                    >                       
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                                {file.title}
                            </span>
                            <button onClick={() => {
                                setFiles(files.filter((_, i) => i !== index));
                            }}>
                                <XCircle />
                            </button>
                        </div>
                    </div>
                ))} 
            </div>
            <UploadDropzone 
                endpoint={endPoint}
                onClientUploadComplete={(res) => {                    
                    if (res && res[0]) {
                        setFiles([...files, res[0]]);
                    }
                }}
                onUploadError={(error: Error) => {
                    console.log('Error Message: ', error.message)
                }}            
            />
        </div>
    )
}

export default MultipleImageInput