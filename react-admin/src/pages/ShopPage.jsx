import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const categories = ['Genshin', 'HSR', 'Zenless', 'Others'];

const initialItems = {
  Genshin: [
    { id: '1', name: 'Item A', price: 100, visible: true },
    { id: '2', name: 'Item B', price: 200, visible: true },
  ],
  HSR: [
    { id: '3', name: 'Item C', price: 150, visible: true },
    { id: '4', name: 'Item D', price: 250, visible: false },
  ],
  Zenless: [],
  Others: [],
};

const thStyle = {
  border: '1px solid #ccc',
  padding: 8,
  backgroundColor: '#f7f7f7',
};

const tdStyle = {
  border: '1px solid #ccc',
  padding: 8,
  textAlign: 'center',
};

const buttonStyle = {
  padding: '4px 8px',
  cursor: 'pointer',
};

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('Genshin');
  const [items, setItems] = useState(initialItems);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    if (result.source.droppableId !== result.destination.droppableId) return;

    const categoryItems = Array.from(items[activeCategory]);
    const [moved] = categoryItems.splice(result.source.index, 1);
    categoryItems.splice(result.destination.index, 0, moved);

    setItems(prev => ({ ...prev, [activeCategory]: categoryItems }));
  };

  const handlePriceChange = (itemId, e) => {
    const newPrice = e.target.value;
    setItems(prev => {
      const newCatItems = prev[activeCategory].map(item =>
        item.id === itemId ? { ...item, price: newPrice } : item
      );
      return { ...prev, [activeCategory]: newCatItems };
    });
  };

  const updateVisibility = (itemId, visible) => {
    setItems(prev => {
      const newCatItems = prev[activeCategory].map(item =>
        item.id === itemId ? { ...item, visible } : item
      );
      return { ...prev, [activeCategory]: newCatItems };
    });
  };

  return (
    <div>
      <h1>Магазин</h1>
      <div style={{ marginBottom: 20 }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              marginRight: 10,
              padding: '8px 12px',
              cursor: 'pointer',
              backgroundColor: activeCategory === cat ? '#3498db' : '#ccc',
              color: activeCategory === cat ? 'white' : 'black',
              border: 'none',
              borderRadius: 4,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={activeCategory}>
          {(provided) => (
            <table
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ borderCollapse: 'collapse', width: '100%' }}
            >
              <thead>
                <tr>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Название</th>
                  <th style={thStyle}>Цена</th>
                  <th style={thStyle}>Видимость</th>
                  <th style={thStyle}>Управление</th>
                </tr>
              </thead>
              <tbody>
                {items[activeCategory].length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: 20 }}>
                      Нет предметов в этой категории.
                    </td>
                  </tr>
                )}
                {items[activeCategory].map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          backgroundColor: item.visible ? 'inherit' : '#f8d7da',
                          userSelect: 'none',
                          ...snapshot.isDragging && { backgroundColor: '#d0ebff' },
                        }}
                      >
                        <td style={tdStyle}>{item.id}</td>
                        <td style={tdStyle}>{item.name}</td>
                        <td style={tdStyle}>
                          <input
                            type="number"
                            value={item.price}
                            onChange={e => handlePriceChange(item.id, e)}
                            style={{ width: '80px', padding: '4px' }}
                          />
                        </td>
                        <td style={tdStyle}>
                          <input
                            type="checkbox"
                            checked={item.visible}
                            onChange={e => updateVisibility(item.id, e.target.checked)}
                          />
                        </td>
                        <td style={tdStyle}>
                          <button style={buttonStyle} onClick={() => setSelectedItem(item)}>
                            Управление
                          </button>
                        </td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>

      {selectedItem && (
        <div style={{ marginTop: 20, padding: 10, border: '1px solid #ccc', borderRadius: 4 }}>
          <h3>Управление предметом: {selectedItem.name}</h3>
          {/* Тут можно добавить подробное управление: статистика, удаление, скрытие и др */}
          <button onClick={() => setSelectedItem(null)}>Закрыть</button>
        </div>
      )}
    </div>
  );
}
