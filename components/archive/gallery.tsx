'use client';

import { DisplayArchiveItem } from '@/lib/archive';
import React from 'react';
import GalleryItem from './gallery-item';
import { Filter, handleFilter } from './filter';

type GalleryProps = {
  displayArchive: DisplayArchiveItem[];
};

const Gallery: React.FC<GalleryProps> = ({ displayArchive }) => {
  const keywords = Array.from(
    new Set(displayArchive.map((item) => item.keywords).flat())
  );

  const [filteredArchive, setFilteredArchive] = React.useState(displayArchive);

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center m-4">
        <div className="border p-1">
          <h2 className="text-xl font-semibold">telegram archive.</h2>
        </div>
        <Filter
          keywords={keywords}
          onChange={(filter) => setFilteredArchive(handleFilter(filter, displayArchive))}
        />
      </div>
      <hr></hr>
      <ul className="m-4 flex flex-col sm:flex-row flex-wrap gap-2">
        {filteredArchive.map((item, index) => (
          <li key={index}>
            <GalleryItem displayArchiveItem={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Gallery;
