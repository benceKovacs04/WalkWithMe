import React from 'react'
import classes from './ImageCard.module.css'
import axios from 'axios';

export default function ImageCard(props) {

    const deleteImage = () => {
        axios.post(
            "https://localhost:5001/api/imageservice/deleteimage",
            { imageId: props.image.imageId },
            {
                withCredentials: true
            }
        ).then(resp => console.log(resp))
    }

    return (
        <div className={classes.Container}>
            <p>{props.image.title}</p>
            <img src={`https://localhost:5001/api/imageservice/getimage?FileName=${props.image.imageId}`} />
            <button onClick={deleteImage}>Delete</button>
        </div>
    )
}
