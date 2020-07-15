import React from 'react';

const ImagesList = ({
  images = [],
  selected,
  onHover = () => { }
}: {
  images: Array<{ id: number, image: string }>
  selected?: string,
  onHover?: Function
}) => {
  return (
    <ul className='images_list'>
      {
        images.map((image: any, index: number) => <li className={image.image === selected ? 'images_list__active' : ''} onMouseOver={() => onHover(image)} key={index} style={{ backgroundImage: `url("${process.env.serverUrl}${image.image}")` }}>

        </li>)
      }
    </ul>
  )
}

export default ImagesList;