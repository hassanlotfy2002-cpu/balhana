import React, { useState, useEffect } from 'react';
import './AvailableFood.css';

const AvailableFood = ({ language }) => {
  // بيانات الطعام المتاحة
  const initialFoodItems = [
    {
      id: 1,
      name: { ar: 'وجبة كبسة دجاج', en: 'Chicken Kabsa Meal' },
      type: { ar: 'وجبة مطبخ', en: 'Cooked Meal' },
      quantity: { ar: '15 وجبة', en: '15 Meals' },
      location: { ar: 'الرياض - الملز', en: 'Riyadh - Al Malaz' },
      timeLeft: { ar: '2 ساعة', en: '2 Hours' },
      donor: { ar: 'مطعم الحكواتي', en: 'Al Hakawati Restaurant' },
      status: 'available',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
      tags: ['حلال', 'طازج', 'ساخن'],
      distance: '2.5 كم',
      rating: 4.8,
      deliveryType: { ar: 'توصيل مجاني', en: 'Free Delivery' }
    },
    {
      id: 2,
      name: { ar: 'ساندوتشات برجر', en: 'Burger Sandwiches' },
      type: { ar: 'وجبات سريعة', en: 'Fast Food' },
      quantity: { ar: '25 قطعة', en: '25 Pieces' },
      location: { ar: 'جدة - الشرفية', en: 'Jeddah - Al Sharafiyah' },
      timeLeft: { ar: '4 ساعة', en: '4 Hours' },
      donor: { ar: 'مطعم برجر نجم', en: 'Burger Star Restaurant' },
      status: 'available',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
      tags: ['سريع', 'جاهز', 'حلال'],
      distance: '1.8 كم',
      rating: 4.5,
      deliveryType: { ar: 'توصيل سريع', en: 'Fast Delivery' }
    },
    {
      id: 3,
      name: { ar: 'معجنات وحلويات', en: 'Pastries & Desserts' },
      type: { ar: 'مخبوزات', en: 'Bakery' },
      quantity: { ar: '50 قطعة', en: '50 Pieces' },
      location: { ar: 'الدمام - الراكة', en: 'Dammam - Al Rakah' },
      timeLeft: { ar: '3 ساعة', en: '3 Hours' },
      donor: { ar: 'مخبز الفرسان', en: 'Al Forsan Bakery' },
      status: 'reserved',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
      tags: ['حلويات', 'معجنات', 'طازج'],
      distance: '3.2 كم',
      rating: 4.9,
      deliveryType: { ar: 'استلام من الموقع', en: 'Pickup' }
    },
    {
      id: 4,
      name: { ar: 'وجبات أرز وخضار', en: 'Rice & Vegetables Meals' },
      type: { ar: 'وجبات منزلية', en: 'Home Cooked' },
      quantity: { ar: '10 وجبة', en: '10 Meals' },
      location: { ar: 'مكة - العزيزية', en: 'Makkah - Al Aziziyah' },
      timeLeft: { ar: '1 ساعة', en: '1 Hour' },
      donor: { ar: 'متبرع خاص', en: 'Private Donor' },
      status: 'available',
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop',
      tags: ['منزلي', 'صحي', 'نباتي'],
      distance: '5.1 كم',
      rating: 4.7,
      deliveryType: { ar: 'توصيل مجاني', en: 'Free Delivery' }
    },
    {
      id: 5,
      name: { ar: 'فواكه طازجة', en: 'Fresh Fruits' },
      type: { ar: 'فواكه', en: 'Fruits' },
      quantity: { ar: '8 كيلو', en: '8 Kg' },
      location: { ar: 'الطائف - الشفا', en: 'Taif - Al Shifa' },
      timeLeft: { ar: '5 ساعة', en: '5 Hours' },
      donor: { ar: 'سوق الخضار المركزي', en: 'Central Vegetable Market' },
      status: 'available',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=300&fit=crop',
      tags: ['طازج', 'صحي', 'فواكه'],
      distance: '2.3 كم',
      rating: 4.6,
      deliveryType: { ar: 'توصيل مجاني', en: 'Free Delivery' }
    },
    {
      id: 6,
      name: { ar: 'مشروبات وعصائر', en: 'Drinks & Juices' },
      type: { ar: 'مشروبات', en: 'Beverages' },
      quantity: { ar: '30 عبوة', en: '30 Bottles' },
      location: { ar: 'المدينة - العيون', en: 'Madinah - Al Oyoun' },
      timeLeft: { ar: '6 ساعة', en: '6 Hours' },
      donor: { ar: 'مصنع العصائر الطازجة', en: 'Fresh Juice Factory' },
      status: 'delivered',
      image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=300&fit=crop',
      tags: ['مشروبات', 'بارد', 'صحي'],
      distance: '4.7 كم',
      rating: 4.8,
      deliveryType: { ar: 'توصيل سريع', en: 'Fast Delivery' }
    }
  ];

  const [foodItems] = useState(initialFoodItems);
  const [filteredItems, setFilteredItems] = useState(initialFoodItems);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // أنواع الطعام
  const foodTypes = [
    { id: 'all', ar: 'الكل', en: 'All' },
    { id: 'cooked', ar: 'وجبات مطبخ', en: 'Cooked Meals' },
    { id: 'fastfood', ar: 'وجبات سريعة', en: 'Fast Food' },
    { id: 'bakery', ar: 'مخبوزات', en: 'Bakery' },
    { id: 'fruits', ar: 'فواكه', en: 'Fruits' },
    { id: 'beverages', ar: 'مشروبات', en: 'Beverages' },
  ];

  // المدن
  const cities = [
    { id: 'all', ar: 'جميع المدن', en: 'All Cities' },
    { id: 'riyadh', ar: 'الرياض', en: 'Riyadh' },
    { id: 'jeddah', ar: 'جدة', en: 'Jeddah' },
    { id: 'dammam', ar: 'الدمام', en: 'Dammam' },
    { id: 'makkah', ar: 'مكة', en: 'Makkah' },
    { id: 'madina', ar: 'المدينة', en: 'Madinah' },
    { id: 'taif', ar: 'الطائف', en: 'Taif' },
  ];

  // خيارات الترتيب
  const sortOptions = [
    { id: 'newest', ar: 'الأحدث', en: 'Newest' },
    { id: 'quantity', ar: 'الأكثر كمية', en: 'Highest Quantity' },
    { id: 'time', ar: 'الأقل وقتاً', en: 'Least Time' },
    { id: 'distance', ar: 'الأقرب مسافة', en: 'Nearest' },
  ];

  // تصفية وترتيب العناصر
  useEffect(() => {
    let filtered = [...foodItems];
    
    // تصفية حسب النوع
    if (selectedType !== 'all') {
      filtered = filtered.filter(item => {
        if (selectedType === 'cooked') return item.type.ar.includes('مطبخ');
        if (selectedType === 'fastfood') return item.type.ar.includes('سريعة');
        if (selectedType === 'bakery') return item.type.ar.includes('مخبوزات') || item.type.ar.includes('معجنات');
        if (selectedType === 'fruits') return item.type.ar.includes('فواكه');
        if (selectedType === 'beverages') return item.type.ar.includes('مشروبات');
        return true;
      });
    }
    
    // تصفية حسب المدينة
    if (selectedCity !== 'all') {
      const cityNames = {
        riyadh: 'الرياض',
        jeddah: 'جدة',
        dammam: 'الدمام',
        makkah: 'مكة',
        madina: 'المدينة',
        taif: 'الطائف'
      };
      filtered = filtered.filter(item => 
        item.location.ar.includes(cityNames[selectedCity])
      );
    }
    
    // تصفية حسب الحالة (إظهار المتاح والمحجوز فقط)
    filtered = filtered.filter(item => item.status !== 'delivered');
    
    // الترتيب
    filtered.sort((a, b) => {
      if (sortBy === 'quantity') {
        const aQty = parseInt(a.quantity.ar);
        const bQty = parseInt(b.quantity.ar);
        return bQty - aQty;
      } else if (sortBy === 'time') {
        const aTime = parseInt(a.timeLeft.ar);
        const bTime = parseInt(b.timeLeft.ar);
        return aTime - bTime;
      } else if (sortBy === 'distance') {
        const aDist = parseFloat(a.distance);
        const bDist = parseFloat(b.distance);
        return aDist - bDist;
      }
      // الأحدث (حسب ID)
      return b.id - a.id;
    });
    
    setFilteredItems(filtered);
  }, [selectedType, selectedCity, sortBy, foodItems]);

  // معالجة حجز الوجبة
  const handleReserveMeal = (id) => {
    const updatedItems = foodItems.map(item => 
      item.id === id ? { ...item, status: 'reserved' } : item
    );
    setFilteredItems(updatedItems.filter(item => item.status !== 'delivered'));
    alert(language === 'ar' ? 'تم حجز الوجبة بنجاح!' : 'Meal reserved successfully!');
  };

  // الحصول على لون الحالة
  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return '#4CAF50';
      case 'reserved': return '#FF9800';
      case 'delivered': return '#9E9E9E';
      default: return '#757575';
    }
  };

  // الحصول على نص الحالة
  const getStatusText = (status) => {
    if (language === 'ar') {
      switch (status) {
        case 'available': return 'متاح';
        case 'reserved': return 'محجوز';
        case 'delivered': return 'تم التوصيل';
        default: return 'غير معروف';
      }
    } else {
      switch (status) {
        case 'available': return 'Available';
        case 'reserved': return 'Reserved';
        case 'delivered': return 'Delivered';
        default: return 'Unknown';
      }
    }
  };

  return (
    <div className="available-food">
      {/* فلترة البحث */}
      <div className="food-filters">
        <div className="filter-section">
          <h4>{language === 'ar' ? 'تصفية حسب:' : 'Filter by:'}</h4>
          
          <div className="filter-row">
            {/* تصفية حسب النوع */}
            <div className="filter-group">
              <label>{language === 'ar' ? 'نوع الطعام:' : 'Food Type:'}</label>
              <div className="filter-buttons">
                {foodTypes.map(type => (
                  <button
                    key={type.id}
                    className={`filter-btn ${selectedType === type.id ? 'active' : ''}`}
                    onClick={() => setSelectedType(type.id)}
                  >
                    {language === 'ar' ? type.ar : type.en}
                  </button>
                ))}
              </div>
            </div>
            
            {/* تصفية حسب المدينة */}
            <div className="filter-group">
              <label>{language === 'ar' ? 'المدينة:' : 'City:'}</label>
              <select 
                className="filter-select"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                {cities.map(city => (
                  <option key={city.id} value={city.id}>
                    {language === 'ar' ? city.ar : city.en}
                  </option>
                ))}
              </select>
            </div>
            
            {/* ترتيب النتائج */}
            <div className="filter-group">
              <label>{language === 'ar' ? 'ترتيب حسب:' : 'Sort by:'}</label>
              <select 
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {language === 'ar' ? option.ar : option.en}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* عد النتائج */}
      <div className="results-count">
        <p>
          {language === 'ar' ? 'عرض' : 'Showing'} {filteredItems.length} 
          {language === 'ar' ? ' من أصل ' : ' of '} {foodItems.length} 
          {language === 'ar' ? ' وجبة متاحة' : ' available meals'}
        </p>
      </div>
      
      {/* قائمة الطعام */}
      <div className="food-grid">
        {filteredItems.map(item => (
          <div key={item.id} className="food-card">
            {/* حالة الوجبة */}
            <div 
              className="food-status"
              style={{ backgroundColor: getStatusColor(item.status) }}
            >
              {getStatusText(item.status)}
            </div>
            
            {/* صورة الوجبة */}
            <div className="food-image">
              <img src={item.image} alt={language === 'ar' ? item.name.ar : item.name.en} />
              <div className="food-overlay">
                <span className="food-distance">
                  <i className="fas fa-location-dot"></i> {item.distance}
                </span>
                <span className="food-rating">
                  <i className="fas fa-star"></i> {item.rating}
                </span>
              </div>
            </div>
            
            {/* تفاصيل الوجبة */}
            <div className="food-details">
              <h3>{language === 'ar' ? item.name.ar : item.name.en}</h3>
              
              <div className="food-info">
                <div className="info-item">
                  <i className="fas fa-utensils"></i>
                  <span>{language === 'ar' ? item.type.ar : item.type.en}</span>
                </div>
                
                <div className="info-item">
                  <i className="fas fa-box"></i>
                  <span>{language === 'ar' ? item.quantity.ar : item.quantity.en}</span>
                </div>
                
                <div className="info-item">
                  <i className="fas fa-clock"></i>
                  <span>{language === 'ar' ? item.timeLeft.ar : item.timeLeft.en}</span>
                </div>
                
                <div className="info-item">
                  <i className="fas fa-store"></i>
                  <span>{language === 'ar' ? item.donor.ar : item.donor.en}</span>
                </div>
                
                <div className="info-item">
                  <i className="fas fa-truck"></i>
                  <span>{language === 'ar' ? item.deliveryType.ar : item.deliveryType.en}</span>
                </div>
              </div>
              
              {/* تاجات */}
              <div className="food-tags">
                {item.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
              
              {/* الموقع */}
              <div className="food-location">
                <i className="fas fa-map-marker-alt"></i>
                <span>{language === 'ar' ? item.location.ar : item.location.en}</span>
              </div>
              
              {/* زر الحجز */}
              <div className="food-actions">
                <button 
                  className={`reserve-btn ${item.status !== 'available' ? 'disabled' : ''}`}
                  onClick={() => handleReserveMeal(item.id)}
                  disabled={item.status !== 'available'}
                >
                  {item.status === 'available' 
                    ? (language === 'ar' ? 'احجز الوجبة' : 'Reserve Meal')
                    : (language === 'ar' ? 'غير متاح' : 'Not Available')}
                </button>
                
                <button className="details-btn">
                  {language === 'ar' ? 'تفاصيل أكثر' : 'More Details'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* إذا لم توجد نتائج */}
      {filteredItems.length === 0 && (
        <div className="no-results">
          <i className="fas fa-utensils-slash"></i>
          <h3>{language === 'ar' ? 'لا توجد وجبات متاحة' : 'No meals available'}</h3>
          <p>
            {language === 'ar' 
              ? 'لا توجد وجبات تطابق معايير البحث. جرب تغيير عوامل التصفية.'
              : 'No meals match your search criteria. Try changing your filters.'}
          </p>
        </div>
      )}
      
      {/* زر تحميل المزيد */}
      <div className="load-more">
        <button className="btn btn-outline">
          <i className="fas fa-sync-alt"></i>
          {language === 'ar' ? 'تحميل المزيد' : 'Load More'}
        </button>
      </div>
    </div>
  );
};

export default AvailableFood;
