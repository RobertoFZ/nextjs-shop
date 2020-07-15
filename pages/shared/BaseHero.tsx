import React from 'react';

const BaseHero = ({ title, backgroundImage = '/assets/base-hero-bg.jpg' }: { title: string, backgroundImage?: string }) => {
  return (<div className='base-hero' style={{ backgroundImage: `url(${backgroundImage})` }}>
    <div className='base-hero__overlay'>
      <div>
        <h1 className='base-hero__title'>{title}</h1>
      </div>
    </div>
  </div>)
}

export default BaseHero;