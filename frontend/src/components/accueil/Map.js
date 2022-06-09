import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';




function Map() {
  const position = [3.857, 11.504]
        
return(
  <section className="d-flex justify-content-center mt-5 mb-5">
    <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
  </section>
)}

export default Map;