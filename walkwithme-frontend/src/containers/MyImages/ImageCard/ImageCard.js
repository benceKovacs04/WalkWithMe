import React, { Fragment } from 'react'
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
        ).then(resp => {
            if (resp.status === 200) {
                props.onDelete(props.image)
            }
        })
    }

    return (
        <div className={classes.Container}>
            <div className={classes.OpacityContainer}></div>
            <h5>{props.image.title}</h5>
            <div className={classes.ImgContainer}>
                <img src={`https://localhost:5001/api/imageservice/getimage?FileName=${props.image.imageId}`} />
            </div>
            <p>{props.image.points} people walkerd here</p>
            <button onClick={() => props.showModal(true)}>Delete</button>
        </div>
    )
}
