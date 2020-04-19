import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function MyImages() {

    const [imageDetails, setImageDetails] = useState([]);

    useEffect(() => {
        axios.get(
            "https://localhost:5001/api/imageservice/getimagesbyuser",
            { withCredentials: true }
        ).then(resp => {
            setImageDetails(resp.data)
        })
    }, [])

    return (
        <div>
            {imageDetails.map(image => {
                return <p>{image.imageId}</p>
            })}
        </div>
    )
}
