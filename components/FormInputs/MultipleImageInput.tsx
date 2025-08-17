import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import React from 'react'
import { UploadButton } from '@uploadthing/react'
import Image from 'next/image'

type ImageInputProps = {
  title: string,
  imageUrls: string[],
  setImageUrls: any
  endPoint: any,
  className?: string
}

const MultipleImageInput = ({title, imageUrls, setImageUrls, endPoint, className}: ImageInputProps) => {
  return (
    <div>
        <Card className='w-full'>
            <CardHeader>    
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>    
                {imageUrls.map((imageUrl, index) => (
                    <Image 
                        key={index}
                        src={imageUrl}
                        alt={title}
                        width={300}
                        height={300}
                        className='h-40 w-full object-cover rounded-md'
                    />
                ))}
                <UploadButton
                    className={className}
                    endpoint={endPoint}
                    onClientUploadComplete={(res: any) => {
                        if (res && res[0]) {  
                            setImageUrls([...imageUrls, res[0].url])
                        }
                    }}
                    onUploadError={(error: Error) => {  
                        console.log('Error Message: ', error.message)
                    }}
                />  
            </CardContent>  
        </Card>
    </div>    
  )
}

export default MultipleImageInput     
