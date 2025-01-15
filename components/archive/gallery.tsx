'use client';

import { DisplayArchiveItem } from '@/lib/utils';
import React from 'react';
import GalleryItem from './gallery-item';
import { Filter, handleFilter } from './filter';
import Header from '../ui/header';
import { ToggleSort } from './toggleSort';
import { ToggleGridStyling } from './toggleGridStyling';

type GalleryProps = {
  displayArchive: DisplayArchiveItem[];
};

const Gallery: React.FC<GalleryProps> = ({ displayArchive }) => {
  const gridBigStyling = "m-2 gap-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4";
  const gridSmallStyling= "m-2 gap-2 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5";
  const keywords = Array.from(
    new Set(displayArchive.map((item) => item.keywords).flat())
  );  

  const [gridStyling, setGridStyling] = React.useState(gridBigStyling);

  function sortArchiveDescending(archive: DisplayArchiveItem[]) {
    return [...archive].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  function sortArchiveAscending(archive: DisplayArchiveItem[]) {
    return [...archive].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  const [filteredArchive, setFilteredArchive] = React.useState(sortArchiveDescending(displayArchive));

  const handleSortClick = (isActive: boolean) => {
    if (!isActive) {
      setFilteredArchive(sortArchiveDescending(filteredArchive));
    } else {
      setFilteredArchive(sortArchiveAscending(filteredArchive));
    }
  };

  const handleGridStylingCLick = (isSmallGrid: boolean) => {
    if (!isSmallGrid) {
      setGridStyling(gridBigStyling);
    } else {
      setGridStyling(gridSmallStyling);
    }
  };

  return (
    <div className="w-full">
      <Header>
        <div className='flex flex-row gap-1'>
          <ToggleSort onClick={handleSortClick} />
          <ToggleGridStyling onClick={handleGridStylingCLick}></ToggleGridStyling>
        </div>
        <Filter
          keywords={keywords}
          onChange={(filter) => setFilteredArchive(handleFilter(filter, displayArchive))}
        />
      </Header>
      <hr />
      <ul className={gridStyling}>
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