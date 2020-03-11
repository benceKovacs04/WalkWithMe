import React from "react";
import classes from "./FeedItem.module.css";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const feedItem = props => {
    const getImageBaseUrl =
        "https://localhost:5001/api/imageservice/getimage?FileName=";

    const mapPosition = [props.image.latitude, props.image.longitude];

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });

    return (
        <div className={classes.ItemContainer}>
            <div className={classes.ImageContainer}>
                <h5 className={classes.FeedItemTitle}>{props.image.title}</h5>
                <img
                    className={classes.FeedItem}
                    src={getImageBaseUrl + props.image.imageId}
                ></img>
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
            </div>
        </div>
    );
};

export default feedItem;
