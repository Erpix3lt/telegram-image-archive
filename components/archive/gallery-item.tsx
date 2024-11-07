import { DisplayArchiveItem } from '@/lib/archive';
import React from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../ui/hover-card';
import { Badge } from '../ui/badge';
import { formatDate } from '@/lib/utils';

export type GalleryItemProps = {
  displayArchiveItem: DisplayArchiveItem;
};

const GalleryItem: React.FC<GalleryItemProps> = ({ displayArchiveItem }) => {
  const handleButtonClick = () => {
    window.location.href = `/image/${displayArchiveItem.file_id}`;
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button onClick={handleButtonClick}>
          <img
            className='w-full sm:w-96'
            alt={displayArchiveItem.artist}
            src={displayArchiveItem.imageUrl}
            loading="lazy"
          />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-64 gap-y-2 flex flex-col">
        <h4 className="text-sm font-semibold mb-2">
          {displayArchiveItem.artist}
        </h4>
        <div className="flex flex-row gap-2">
          {displayArchiveItem.keywords.map((keyword) => (
            <Badge key={keyword} variant={'secondary'}>
              {keyword}
            </Badge>
          ))}
        </div>
        <div className="flex items-center pt-2">
          <span className="text-sm flex flex-row gap-x-2 w-full">
            <p className="text-muted-foreground">
              {formatDate(displayArchiveItem.date)}
            </p>
            <a className="underline" href={displayArchiveItem.imageUrl}>
              Download here
            </a>
          </span>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default GalleryItem;
