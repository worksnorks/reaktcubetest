import React, { useState } from 'react';
import ShopList from './ShopList';
import ShopItemModal from './ShopItemModal';

const categories = ['Genshin', 'HSR', 'Zenless', 'Other'];

// Заглушки товаров по категориям
const allProducts = {
  Genshin: [
    {
      id: 1,
      name: 'Genshin Sword',
      price: 100,
      imageSmall: 'https://via.placeholder.com/80?text=GSword',
      imageLarge: 'https://via.placeholder.com/300?text=Genshin+Sword',
      description: 'Меч из Genshin Impact, отличный для новичков.',
    },
    {
      id: 2,
      name: 'Genshin Bow',
      price: 120,
      imageSmall: 'https://via.placeholder.com/80?text=GBow',
      imageLarge: 'https://via.placeholder.com/300?text=Genshin+Bow',
      description: 'Лук из Genshin Impact с высокой точностью.',
    },
  ],
  HSR: [
    {
      id: 3,
      name: 'HSR Katana',
      price: 200,
      imageSmall: 'https://via.placeholder.com/80?text=HKatana',
      imageLarge: 'https://via.placeholder.com/300?text=HSR+Katana',
      description: 'Катана из Honkai: Star Rail для ближнего боя.',
    },
  ],
  Zenless: [
    {
      id: 4,
      name: 'Zenless Rifle',
      price: 180,
      imageSmall: 'https://via.placeholder.com/80?text=ZRifle',
      imageLarge: 'https://via.placeholder.com/300?text=Zenless+Rifle',
      description: 'Винтовка из Zenless, мощный дальний бой.',
    },
  ],
  Other: [
    {
      id: 5,
      name: 'Mystery Box',
      price: 50,
      imageSmall: 'https://via.placeholder.com/80?text=MBox',
      imageLarge: 'https://via.placeholder.com/300?text=Mystery+Box',
      description: 'Загадочный ящик с неожиданными сюрпризами.',
    },
  ],
};

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [selectedItem, setSelectedItem] = useState(null);

  const products = allProducts[activeCategory] || [];

  return (
    <div style={{ maxWidth: 600, margin: '20px auto', fontFamily: 'Arial, sans-serif', paddingBottom: 80 }}>
      <h1 style={{ textAlign: 'center' }}>Магазин</h1>

      {/* Вкладки категорий */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 20 }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: 20,
              border: 'none',
              backgroundColor: cat === activeCategory ? '#145dbf' : '#e0e0e0',
              color: cat === activeCategory ? '#fff' : '#222',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'background-color 0.3s',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Список товаров */}
      <ShopList products={products} onSelect={setSelectedItem} />

      {/* Модальное окно товара */}
      {selectedItem && (
        <ShopItemModal
          product={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
