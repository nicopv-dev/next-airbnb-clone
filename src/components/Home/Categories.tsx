import Category from '../../interfaces/Category';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

interface ICategoriesProps {
  categories: Category[];
}

interface ICategoryItemProps {
  category: Category;
  isActive: boolean;
  onChangeCategoryActive: (id: number) => void;
}

export default function Categories({ categories }: ICategoriesProps) {
  const [categoryActive, setCategoryActive] = useState<number>(1);
  const [isMoved, setIsMoved] = useState<boolean>(false);
  const categoriesRef = useRef<HTMLDivElement>(null);

  const onChangeCategoryActive = (categoryId: number): void => {
    setCategoryActive(categoryId);
  };

  const handleClickChevron = (direction: string) => {
    setIsMoved(true);
    if (categoriesRef.current) {
      const { scrollLeft, clientWidth } = categoriesRef.current;
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth / 3
          : scrollLeft + clientWidth / 3;
      if (direction === 'left') {
        if (scrollLeft < 681) {
          setIsMoved(false);
        }
      }
      categoriesRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <>
      {isMoved && (
        <button
          className="absolute top-8 left-0 z-20 p-2 border bg-white border-grey_light rounded-full transtion-all duration-300 ease-in-out scale-100 shadow-none hover:scale-105 hover:shadow-md"
          onClick={() => handleClickChevron('left')}
        >
          <FiChevronLeft />
        </button>
      )}
      <div
        className="grow flex items-center gap-12 overflow-x-scroll scrollbar-hide"
        ref={categoriesRef}
      >
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            isActive={categoryActive === category.id ? true : false}
            onChangeCategoryActive={onChangeCategoryActive}
          />
        ))}
      </div>
      <button
        className="p-2 border border-grey_light rounded-full transtion-all duration-300 ease-in-out scale-100 shadow-none hover:scale-105 hover:shadow-md"
        onClick={() => handleClickChevron('right')}
      >
        <FiChevronRight />
      </button>
    </>
  );
}

function CategoryItem({
  category,
  isActive,
  onChangeCategoryActive,
}: ICategoryItemProps) {
  const selectCategory = (): void => {
    onChangeCategoryActive(category.id);
  };

  return (
    <button
      type="button"
      className={`flex flex-col items-center gap-2 py-[10px] outline-none font-bold transition-all duration-300 ease-in-out ${
        isActive
          ? 'border-b-[3px] border-b-black text-black'
          : 'border-none text-grey_light hover:border-b-[3px] hover:border-b-grey_light'
      }`}
      onClick={selectCategory}
    >
      <Image
        alt={category.title}
        src={category.icon}
        width={24}
        height={24}
        objectFit="cover"
        className={`transition-all duration-300 ease-linear ${
          isActive ? 'opacity-100' : 'opacity-50'
        }`}
      />
      <p className="text-xs whitespace-nowrap">{category.title}</p>
    </button>
  );
}
