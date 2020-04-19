import React, { Fragment } from "react";
import classes from "./FeedItem.module.css";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from 'axios'


export default function FeedItem(props) {

    const getImageBaseUrl =
        "https://localhost:5001/api/imageservice/getimage?FileName=";

    const mapPosition = [props.image.latitude, props.image.longitude];

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });

    const onWalkClick = () => {
        props.onWalk(props.image.userName);
        axios.patch(
            "https://localhost:5001/api/imageservice/updatepoints",
            {
                imageId: props.image.imageId
            }
        ).then(resp => {
            if (resp.status === 200) {
                props.image.points++
            }
        })
    }


    return (
        <Fragment>
            <div className={classes.Opacity}></div>
            <div className={classes.ItemContainer}>
                <div className={classes.ImageContainer}>
                    <h5 className={classes.FeedItemTitle}>
                        {props.image.title}
                    </h5>
                    <img
                        className={classes.FeedItem}
                        src={getImageBaseUrl + props.image.imageId}
                    ></img>
                    <div className={classes.ImageFooter}>
                        <p>By: {props.image.userName}</p>
                        <p>{props.image.points} people have walked here</p>
                    </div>
                </div>
                <div className={classes.MapContainer}>
                    <Map
                        center={mapPosition}
                        zoom={18}
                        style={{ width: "100%", height: "300px" }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={mapPosition}>
                            <Popup>This photo was taken here!</Popup>
                        </Marker>
                    </Map>
                    <a
                        className={classes.MapsLink}
                        href={
                            "http://maps.google.com/?cbll=" +
                            props.image.latitude +
                            "," +
                            props.image.longitude +
                            "&cbp=12,90,0,0,5&layer=c"
                        }
                        target="_blank"
                        onClick={onWalkClick}

                    >
                        Let's Walk!
                    </a>
                    <textarea
                        className={classes.Description}
                        value={props.image.description}
                    ></textarea>
                    <button
                        className={classes.NextImage}
                        onClick={props.newImage}
                    >
                        Take me somewhere else!
                    </button>
                </div>
            </div>
        </Fragment>
    );
}

