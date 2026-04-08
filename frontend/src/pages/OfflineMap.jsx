import { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const SIPALAY_CENTER = [9.7493737, 122.4070027];
const ALIJIS_CENTER = [10.6431164, 122.9435287];

export default function OfflineMapTest({ selectedReport, selectedMap }) {
  const [markerPos, setMarkerPos] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    // Reset marker when map changes
    setMarkerPos(null);

    const defaultCenter = selectedMap === "Sipalay" ? SIPALAY_CENTER : ALIJIS_CENTER;

    if (!selectedReport) {
      mapRef.current?.setView(defaultCenter, 15, { animate: true });
      return;
    }

    const lat = parseFloat(selectedReport.lat);
    const lon = parseFloat(selectedReport.lon);

    if (isNaN(lat) || isNaN(lon) || lat === 0 || lon === 0) {
      mapRef.current?.setView(defaultCenter, 15, { animate: true });
      return;
    }

    // Bounds validation
    // Sipalay ≈ lat 9.x, Alijis ≈ lat 10.x
    const isSipalayCoords = lat >= 9.0 && lat < 10.0;
    const isAlijisCoords = lat >= 10.0 && lat < 11.0;

    const isValidForSipalay = selectedMap === "Sipalay" && isSipalayCoords;
    const isValidForAlijis = selectedMap === "Alijis" && isAlijisCoords;

    if (isValidForSipalay || isValidForAlijis) {
      setMarkerPos([lat, lon]);
      mapRef.current?.setView([lat, lon], 16, { animate: true });
    } else {
      // Valid coordinates but belong to the other map region
      mapRef.current?.setView(defaultCenter, 15, { animate: true });
    }
  }, [selectedReport, selectedMap]);

  return (
    <div className="w-full h-full min-h-[400px] flex justify-center dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl overflow-hidden shadow-inner">
      <MapContainer
        key={selectedMap} // Forces complete re-render when switching maps
        center={selectedMap === "Sipalay" ? SIPALAY_CENTER : ALIJIS_CENTER}
        zoom={19}
        minZoom={14}
        maxZoom={16}
        className="h-full w-full"
        whenCreated={(map) => (mapRef.current = map)} // As requested
        ref={mapRef} // Note: Keeping ref={mapRef} because react-leaflet v5 strictly requires it over whenCreated
      >
        <TileLayer
          url={selectedMap === "Sipalay" ? "/tiles1/{z}/{x}/{y}.png" : "/tiles/{z}/{x}/{y}.png"}
          minZoom={14}
          maxZoom={16}
        />

        {markerPos && (
          <Marker position={markerPos}>
            <Popup className="dark:bg-slate-800 dark:text-white">
              <div className="font-bold">
                {selectedReport?.family_info} Family - {selectedReport?.warning_message?.text}
              </div>
              <div className="text-xs opacity-80">{selectedReport?.location}</div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
