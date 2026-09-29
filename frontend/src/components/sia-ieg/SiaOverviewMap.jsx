import React from 'react';
import LeafletGisMap from '../gis/LeafletGisMap.jsx';

export default function SiaOverviewMap({ parcels = [], corridorLine = [], activeFilter = null, onSelectParcel }) {
  return (
    <div className="w-full">
      <LeafletGisMap
        onSelectParcel={onSelectParcel}
      />
    </div>
  );
}
