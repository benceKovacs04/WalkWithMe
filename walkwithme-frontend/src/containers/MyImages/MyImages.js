import React, { useState, useEffect } from 'react'
import classes from './MyImages.module.css'
import ImageCard from './ImageCard/ImageCard'

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
        <div className={classes.Container}>
            {imageDetails.map(image => {
                return <ImageCard image={image} />
            })}
        </div>
    )
}
