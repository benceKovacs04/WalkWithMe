import React, { useState, useEffect, Fragment } from 'react'
import classes from './MyImages.module.css'
import ImageCard from './ImageCard/ImageCard'

import axios from 'axios'

export default function MyImages() {

    const [imageDetails, setImageDetails] = useState([]);
    const [modalShowing, setModalShowing] = useState(false)

    const removeCard = (image) => {
        const newArr = [...imageDetails];
        newArr.splice(newArr.indexOf(image), 1)
        setImageDetails(newArr);

    }

    useEffect(() => {
        axios.get(
            "https://localhost:5001/api/imageservice/getimagesbyuser",
            { withCredentials: true }
        ).then(resp => {
            setImageDetails(resp.data)
        })
    }, [])

    return (
        <Fragment>
            {modalShowing ?
                <div className={classes.Modal}>
                    <div className={classes.ModalBackground}></div>
                    <div className={classes.ModalWindow}>
                        <h2>Are you sure you want to delete this picture?</h2>
                        <div className={classes.ButtonContainer}>
                            <button>Yes</button>
                            <button>No</button>
                        </div>
                    </div>
                </div> : null
            }

            <div className={classes.Container}>
                {imageDetails.map(image => {
                    return <ImageCard showModal={setModalShowing} onDelete={removeCard} image={image} />
                })}
            </div>
        </Fragment>
    )
}
