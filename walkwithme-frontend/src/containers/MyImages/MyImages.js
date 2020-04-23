import React, { useState, useEffect, Fragment } from 'react'
import classes from './MyImages.module.css'
import ImageCard from './ImageCard/ImageCard'

import axios from 'axios'

export default function MyImages() {

    const [imageDetails, setImageDetails] = useState([]);
    const [modalShowing, setModalShowing] = useState(false)

    const [imageToDelete, setImageToDelete] = useState();

    useEffect(() => {
        axios.get(
            "https://localhost:5001/api/imageservice/getimagesbyuser",
            { withCredentials: true }
        ).then(resp => {
            setImageDetails(resp.data)
        })
    }, [])

    const removeCard = (image) => {
        const newArr = [...imageDetails];
        newArr.splice(newArr.indexOf(image), 1)
        setImageDetails(newArr);
    }

    const deleteImage = () => {
        axios.post(
            "https://localhost:5001/api/imageservice/deleteimage",
            { imageId: imageToDelete.imageId },
            {
                withCredentials: true
            }
        ).then(resp => {
            if (resp.status === 200) {
                removeCard(imageToDelete)
            }
        })
    }

    const showModalSetImage = (image) => {
        setModalShowing(true)
        setImageToDelete(image)
    }

    return (
        <Fragment>
            {modalShowing ?
                <div className={classes.Modal}>
                    <div className={classes.ModalBackground}></div>
                    <div className={classes.ModalWindow}>
                        <h2>Are you sure you want to delete this picture?</h2>
                        <div className={classes.ButtonContainer}>
                            <button onClick={() => {
                                setModalShowing(false)
                                deleteImage()
                            }}>Yes</button>
                            <button onClick={() => {
                                setModalShowing(false)
                                setImageToDelete(null)
                            }}>No</button>
                        </div>
                    </div>
                </div> : null
            }

            <div className={classes.Container}>
                {imageDetails.map(image => {
                    return <ImageCard showModalSetImageToDelete={showModalSetImage} onDelete={removeCard} image={image} />
                })}
            </div>
        </Fragment>
    )
}
