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
            <div className={classes.OpacityContainer}></div>
            <h5>{props.image.title}</h5>
            <div className={classes.ImgContainer}>
                <img src={`https://localhost:5001/api/imageservice/getimage?FileName=${props.image.imageId}`} />
            </div>
            <p>{props.image.points} people walkerd here</p>
            <button onClick={deleteImage}>Delete</button>
        </div>
    )
}
