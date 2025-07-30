import React, { useState } from 'react';

const initialPartners = [
  {
    id: 'partner1',
    referralLink: 'https://example.com/ref/partner1',
    commissionPercent: 10,
    stats: {
      totalRefs: 100,
      monthRefs: 20,
      totalCommission: 500,
      monthCommission: 100,
    },
  },
  {
    id: 'partner2',
    referralLink: 'https://example.com/ref/partner2',
    commissionPercent: 15,
    stats: {
      totalRefs: 50,
      monthRefs: 10,
      totalCommission: 300,
      monthCommission: 70,
    },
  },
];

export default function PartnersPage() {
  const [partners, setPartners] = useState(initialPartners);
  const [editingPartner, setEditingPartner] = useState(null);
  const [formData, setFormData] = useState({
    referralLink: '',
    commissionPercent: 0,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPartners, setFilteredPartners] = useState(partners);

  // Для добавления нового партнёра
  const [newPartnerId, setNewPartnerId] = useState('');
  const [newReferralLink, setNewReferralLink] = useState('');
  const [newCommissionPercent, setNewCommissionPercent] = useState(0);

  const openEdit = (partner) => {
    setEditingPartner(partner);
    setFormData({
      referralLink: partner.referralLink,
      commissionPercent: partner.commissionPercent,
    });
  };

  const closeEdit = () => {
    setEditingPartner(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'commissionPercent' ? Number(value) : value,
    }));
  };

  const handleSave = () => {
    setPartners(prev =>
      prev.map(p =>
        p.id === editingPartner.id
          ? { ...p, referralLink: formData.referralLink, commissionPercent: formData.commissionPercent }
          : p
      )
    );
    setFilteredPartners(prev =>
      prev.map(p =>
        p.id === editingPartner.id
          ? { ...p, referralLink: formData.referralLink, commissionPercent: formData.commissionPercent }
          : p
      )
    );
    closeEdit();
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredPartners(partners);
      return;
    }
    const filtered = partners.filter(p =>
      p.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPartners(filtered);
  };

  const handleAddPartner = () => {
    if (!newPartnerId.trim()) {
      alert('Введите ID партнера');
      return;
    }
    if (partners.some(p => p.id === newPartnerId.trim())) {
      alert('Партнер с таким ID уже существует');
      return;
    }
    const newPartner = {
      id: newPartnerId.trim(),
      referralLink: newReferralLink.trim() || 'https://example.com/ref/' + newPartnerId.trim(),
      commissionPercent: Number(newCommissionPercent),
      stats: {
        totalRefs: 0,
        monthRefs: 0,
        totalCommission: 0,
        monthCommission: 0,
      },
    };
    const updated = [...partners, newPartner];
    setPartners(updated);
    setFilteredPartners(updated);
    setNewPartnerId('');
    setNewReferralLink('');
    setNewCommissionPercent(0);
    alert('Партнер добавлен');
  };

  return (
    <div>
      <h1>Партнеры</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Поиск по ID партнера"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ padding: 6, marginRight: 10 }}
        />
        <button onClick={handleSearch} style={{ padding: '6px 12px' }}>
          Найти
        </button>
      </div>

      <div style={{ marginBottom: 30, padding: 10, border: '1px solid #ccc', borderRadius: 4, maxWidth: 500 }}>
        <h2>Добавить нового партнера</h2>
        <div style={{ marginBottom: 10 }}>
          <label>ID партнера:</label><br />
          <input
            type="text"
            value={newPartnerId}
            onChange={e => setNewPartnerId(e.target.value)}
            style={{ width: '100%', padding: 6 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Реферальная ссылка (опционально):</label><br />
          <input
            type="text"
            value={newReferralLink}
            onChange={e => setNewReferralLink(e.target.value)}
            style={{ width: '100%', padding: 6 }}
            placeholder="Если пусто, сгенерируется автоматически"
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Процент отчислений (%):</label><br />
          <input
            type="number"
            value={newCommissionPercent}
            onChange={e => setNewCommissionPercent(e.target.value)}
            min={0}
            max={100}
            style={{ width: '100%', padding: 6 }}
          />
        </div>
        <button onClick={handleAddPartner} style={{ padding: '8px 16px' }}>
          Добавить партнера
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thStyle}>ID партнера</th>
            <th style={thStyle}>Реферальная ссылка</th>
            <th style={thStyle}>Управление</th>
          </tr>
        </thead>
        <tbody>
          {filteredPartners.map(partner => (
            <tr key={partner.id}>
              <td style={tdStyle}>{partner.id}</td>
              <td style={tdStyle}>
                <a href={partner.referralLink} target="_blank" rel="noreferrer">
                  {partner.referralLink}
                </a>
              </td>
              <td style={tdStyle}>
                <button onClick={() => openEdit(partner)}>Управление</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingPartner && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h2>Управление партнером: {editingPartner.id}</h2>

            <label>
              Реферальная ссылка:<br />
              <input
                type="text"
                name="referralLink"
                value={formData.referralLink}
                onChange={handleChange}
                style={{ width: '100%', marginBottom: 10 }}
              />
            </label>

            <label>
              Процент отчислений (%):<br />
              <input
                type="number"
                name="commissionPercent"
                value={formData.commissionPercent}
                onChange={handleChange}
                min={0}
                max={100}
                style={{ width: '100%', marginBottom: 10 }}
              />
            </label>

            <h3>Статистика рефералов</h3>
            <p>Всего рефералов: {editingPartner.stats.totalRefs}</p>
            <p>Рефералов в этом месяце: {editingPartner.stats.monthRefs}</p>
            <p>Отчисления всего: {editingPartner.stats.totalCommission} монеток</p>
            <p>Отчисления в этом месяце: {editingPartner.stats.monthCommission} монеток</p>

            <button onClick={handleSave} style={{ marginRight: 10 }}>Сохранить</button>
            <button onClick={closeEdit}>Отмена</button>
          </div>
        </div>
      )}
    </div>
  );
}

const thStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  backgroundColor: '#f0f0f0',
  textAlign: 'left',
};

const tdStyle = {
  border: '1px solid #ccc',
  padding: '8px',
};

const modalStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: 20,
  borderRadius: 8,
  width: '400px',
  maxHeight: '80vh',
  overflowY: 'auto',
};
