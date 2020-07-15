import React from 'react';
import { Category } from '../../../api/Product/Product';

const Categories = ({
  categories = [],
  selectedCategories = [],
  onClick = () => true
}: {
  categories?: Category[];
  selectedCategories?: number[];
  onClick?: Function;
}) => {
  function isSelected(category: Category) {
    const found = selectedCategories.find((id: number) => id === category.id);
    return found !== undefined;
  }
  return (<div className='categories'>
    <h3 className='categories__title'>Categorías</h3>
    <ul className='categories__list'>
      {categories.map((category: Category) => <li className={`${isSelected(category) ? 'categories__list-active' : ''}`} key={category.id} onClick={() => onClick(category)}>{category.name}</li>)}
    </ul>
  </div>)
}

export default Categories;