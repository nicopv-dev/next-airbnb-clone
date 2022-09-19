import Image from 'next/image';
import React from 'react';

export default function Map() {
  return (
    <div className="py-12 w-full">
      <Image
        alt="map"
        src="/images/map.jpg"
        width={'100%'}
        height={'30%'}
        layout="responsive"
        objectFit="cover"
        className="object-cover"
      />
    </div>
  );
}
