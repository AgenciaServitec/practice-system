import React, { useState } from "react";
import { common } from "../../config";

export const ShowStaticMap = ({ address = null }) => {
  const [url, setUrl] = useState(null);

  const claveAPI = common?.apis.mapsStatic.key;

  const mapSize = "600x1000";
  const zoom = "16";
  const mapType = "roadmap";
  const codifiedAddress = encodeURIComponent(address);

  const getStaticMapWithAddress = () => {
    const marker = `color:red|label:*|${codifiedAddress}`;

    return `https://maps.googleapis.com/maps/api/staticmap?center=${codifiedAddress}&zoom=${zoom}&size=${mapSize}&maptype=${mapType}&markers=${marker}&key=${claveAPI}`;
  };

  return (
    <div>
      <img src={getStaticMapWithAddress()} alt="address map" />
    </div>
  );
};
