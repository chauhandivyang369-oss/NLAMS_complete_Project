import React from 'react';
import LeafletGisMap from '../../../../components/gis/LeafletGisMap.jsx';

export default function RRResettlementMap({ 
  height = '460px', 
  onSelectPlot,
  selectedPlotId = null,
  showControls = true 
}) {
  return (
    <div className="w-full">
      <LeafletGisMap
        height={height}
        onSelectParcel={(parcel) => {
          if (onSelectPlot) {
            onSelectPlot(parcel.ulpin || parcel.id);
          }
        }}
        onConfirmSelection={(ulpins, selectedList) => {
          if (onSelectPlot && selectedList?.[0]) {
            onSelectPlot(selectedList[0].ulpin || selectedList[0].id);
          }
        }}
      />
    </div>
  );
}
