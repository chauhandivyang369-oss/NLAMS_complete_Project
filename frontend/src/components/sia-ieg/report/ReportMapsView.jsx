import React from 'react';
import LeafletGisMap from '../../gis/LeafletGisMap.jsx';

export default function ReportMapsView() {
  return (
    <div className="w-full space-y-3">
      <LeafletGisMap />
    </div>
  );
}
