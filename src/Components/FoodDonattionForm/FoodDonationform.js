import React, { useState, useEffect } from 'react';
import './FoodDonationForm.css';

const FoodDonationForm = ({ language }) => {
  // حالة النموذج
  const [formData, setFormData] = useState({
    donorType: 'individual',
    organizationName: '',
    contactPerson: '',
    phone: '',
    email: '',
    foodType: 'cooked',
    foodName: '',
    quantity: '',
    quantityUnit: 'meals',
    preparationTime: '',
    expiryDate: '',
    packaging: 'packaged',
    packagingType: 'disposable',
    storageConditions: 'room',
    specialNotes: '',
    pickupDate: '',
    pickupTime: '',
    address: '',
    city: '',
    district: '',
    availableUntil: '',
    donationFrequency: 'once',
    photos: [],
    termsAccepted: false
  });

  // حالة التقديم
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [photoPreviews, setPhotoPreviews] = useState([]);

  // أنواع المتبرعين
  const donorTypes = [
    { id: 'individual', ar: 'فرد', en: 'Individual', icon: 'fas fa-user' },
    { id: 'restaurant', ar: 'مطعم/مقهى', en: 'Restaurant/Cafe', icon: 'fas fa-utensils' },
    { id: 'hotel', ar: 'فندق', en: 'Hotel', icon: 'fas fa-hotel' },
    { id: 'catering', ar: 'خدمات التغذية', en: 'Catering Services', icon: 'fas fa-truck' },
    { id: 'bakery', ar: 'مخبز', en: 'Bakery', icon: 'fas fa-bread-slice' },
    { id: 'supermarket', ar: 'سوبرماركت', en: 'Supermarket', icon: 'fas fa-shopping-cart' },
    { id: 'event', ar: 'مناسبة/حدث', en: 'Event/Occasion', icon: 'fas fa-calendar' }
  ];

  // أنواع الطعام
  const foodTypes = [
    { id: 'cooked', ar: 'وجبات مطبوخة', en: 'Cooked Meals', icon: 'fas fa-drumstick-bite' },
    { id: 'fastfood', ar: 'وجبات سريعة', en: 'Fast Food', icon: 'fas fa-hamburger' },
    { id: 'bakery', ar: 'مخبوزات ومعجنات', en: 'Bakery & Pastries', icon: 'fas fa-cookie-bite' },
    { id: 'fruits', ar: 'فواكه وخضروات', en: 'Fruits & Vegetables', icon: 'fas fa-apple-alt' },
    { id: 'dry', ar: 'مواد جافة (أرز، سكر، دقيق)', en: 'Dry Food (Rice, Sugar, Flour)', icon: 'fas fa-weight' },
    { id: 'beverages', ar: 'مشروبات وعصائر', en: 'Beverages & Juices', icon: 'fas fa-wine-bottle' },
    { id: 'dairy', ar: 'منتجات ألبان', en: 'Dairy Products', icon: 'fas fa-cheese' },
    { id: 'other', ar: 'أخرى', en: 'Other', icon: 'fas fa-ellipsis-h' }
  ];

  // وحدات الكمية
  const quantityUnits = [
    { id: 'meals', ar: 'وجبات', en: 'Meals' },
    { id: 'kg', ar: 'كيلوجرام', en: 'Kilograms' },
    { id: 'pieces', ar: 'قطع', en: 'Pieces' },
    { id: 'boxes', ar: 'صناديق', en: 'Boxes' },
    { id: 'liters', ar: 'لترات', en: 'Liters' },
    { id: 'plates', ar: 'أطباق', en: 'Plates' }
  ];

  // أنواع التغليف
  const packagingTypes = [
    { id: 'disposable', ar: 'أطباق/أكياس تستخدم لمرة واحدة', en: 'Disposable Plates/Bags' },
    { id: 'reusable', ar: 'أطباق/حاويات قابلة لإعادة الاستخدام', en: 'Reusable Plates/Containers' },
    { id: 'professional', ar: 'تغليف احترافي', en: 'Professional Packaging' },
    { id: 'none', ar: 'بدون تغليف', en: 'No Packaging' }
  ];

  // ظروف التخزين
  const storageConditions = [
    { id: 'room', ar: 'درجة حرارة الغرفة', en: 'Room Temperature' },
    { id: 'refrigerated', ar: 'مبرد (1-4°C)', en: 'Refrigerated (1-4°C)' },
    { id: 'frozen', ar: 'مجمّد (-18°C)', en: 'Frozen (-18°C)' },
    { id: 'heated', ar: 'ساخن (فوق 60°C)', en: 'Heated (Above 60°C)' }
  ];

  // المدن
  const cities = [
    { id: 'riyadh', ar: 'الرياض', en: 'Riyadh' },
    { id: 'jeddah', ar: 'جدة', en: 'Jeddah' },
    { id: 'dammam', ar: 'الدمام', en: 'Dammam' },
    { id: 'makkah', ar: 'مكة المكرمة', en: 'Makkah' },
    { id: 'madina', ar: 'المدينة المنورة', en: 'Madinah' },
    { id: 'taif', ar: 'الطائف', en: 'Taif' },
    { id: 'abha', ar: 'أبها', en: 'Abha' },
    { id: 'qassim', ar: 'القصيم', en: 'Qassim' },
    { id: 'hail', ar: 'حائل', en: 'Hail' },
    { id: 'jazan', ar: 'جازان', en: 'Jazan' }
  ];

  // تكرار التبرع
  const donationFrequencies = [
    { id: 'once', ar: 'مرة واحدة', en: 'One Time' },
    { id: 'daily', ar: 'يومياً', en: 'Daily' },
    { id: 'weekly', ar: 'أسبوعياً', en: 'Weekly' },
    { id: 'monthly', ar: 'شهرياً', en: 'Monthly' },
    { id: 'occasional', ar: 'عند التوفر', en: 'Occasionally' }
  ];

  // معالجة تغيير المدخلات
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // حذف الخطأ عند التعديل
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // معالجة رفع الصور
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = [];
    
    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) { // 5MB
        alert(language === 'ar' ? 'الحد الأقصى لحجم الصورة 5MB' : 'Maximum image size is 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === files.length) {
          setPhotoPreviews(prev => [...prev, ...newPreviews].slice(0, 5)); // الحد الأقصى 5 صور
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // حذف صورة
  const handleRemovePhoto = (index) => {
    setPhotoPreviews(prev => prev.filter((_, i) => i !== index));
  };

  // الانتقال للخطوة التالية
  const nextStep = () => {
    // التحقق من صحة الخطوة الحالية
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    
    setCurrentStep(prev => Math.min(prev + 1, 4));
    setErrors({});
  };

  // الرجوع للخطوة السابقة
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setErrors({});
  };

  // التحقق من صحة الخطوة
  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1: // معلومات المتبرع
        if (!formData.contactPerson.trim()) {
          newErrors.contactPerson = language === 'ar' ? 'اسم المتبرع مطلوب' : 'Donor name is required';
        }
        if (!formData.phone.trim()) {
          newErrors.phone = language === 'ar' ? 'رقم الهاتف مطلوب' : 'Phone number is required';
        } else if (!/^05\d{8}$/.test(formData.phone)) {
          newErrors.phone = language === 'ar' ? 'رقم الهاتف يجب أن يبدأ بـ 05 ويتكون من 10 أرقام' : 'Phone must start with 05 and be 10 digits';
        }
        if (!formData.email.trim()) {
          newErrors.email = language === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = language === 'ar' ? 'البريد الإلكتروني غير صالح' : 'Email is invalid';
        }
        if (formData.donorType !== 'individual' && !formData.organizationName.trim()) {
          newErrors.organizationName = language === 'ar' ? 'اسم المؤسسة مطلوب' : 'Organization name is required';
        }
        break;
        
      case 2: // معلومات الطعام
        if (!formData.foodName.trim()) {
          newErrors.foodName = language === 'ar' ? 'اسم الطعام مطلوب' : 'Food name is required';
        }
        if (!formData.quantity.trim()) {
          newErrors.quantity = language === 'ar' ? 'الكمية مطلوبة' : 'Quantity is required';
        } else if (isNaN(formData.quantity) || parseInt(formData.quantity) <= 0) {
          newErrors.quantity = language === 'ar' ? 'الكمية يجب أن تكون رقماً موجباً' : 'Quantity must be a positive number';
        }
        if (!formData.preparationTime) {
          newErrors.preparationTime = language === 'ar' ? 'وقت التحضير مطلوب' : 'Preparation time is required';
        }
        if (!formData.expiryDate) {
          newErrors.expiryDate = language === 'ar' ? 'تاريخ الانتهاء مطلوب' : 'Expiry date is required';
        }
        break;
        
      case 3: // معلومات التوصيل
        if (!formData.pickupDate) {
          newErrors.pickupDate = language === 'ar' ? 'تاريخ الاستلام مطلوب' : 'Pickup date is required';
        }
        if (!formData.pickupTime) {
          newErrors.pickupTime = language === 'ar' ? 'وقت الاستلام مطلوب' : 'Pickup time is required';
        }
        if (!formData.address.trim()) {
          newErrors.address = language === 'ar' ? 'العنوان التفصيلي مطلوب' : 'Detailed address is required';
        }
        if (!formData.city) {
          newErrors.city = language === 'ar' ? 'المدينة مطلوبة' : 'City is required';
        }
        break;
    }
    
    return newErrors;
  };

  // التحقق من صحة النموذج الكامل
  const validateForm = () => {
    const errors = {};
    
    // التحقق من جميع الخطوات
    [1, 2, 3].forEach(step => {
      Object.assign(errors, validateStep(step));
    });
    
    if (!formData.termsAccepted) {
      errors.termsAccepted = language === 'ar' ? 'يجب الموافقة على الشروط والأحكام' : 'You must accept the terms and conditions';
    }
    
    return errors;
  };

  // معالجة تقديم النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setCurrentStep(1); // الرجوع للخطوة الأولى لرؤية الأخطاء
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // محاكاة إرسال البيانات للخادم
      const donationData = {
        ...formData,
        photos: photoPreviews,
        submittedAt: new Date().toISOString()
      };
      
      console.log('Donation data:', donationData);
      
      // انتظار لمحاكاة الطلب
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitSuccess(true);
      
      // إعادة تعيين النموذج بعد 5 ثواني
      setTimeout(() => {
        resetForm();
        setSubmitSuccess(false);
        setCurrentStep(1);
      }, 5000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({
        submit: language === 'ar' ? 'حدث خطأ أثناء إرسال التبرع' : 'An error occurred while submitting donation'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // إعادة تعيين النموذج
  const resetForm = () => {
    setFormData({
      donorType: 'individual',
      organizationName: '',
      contactPerson: '',
      phone: '',
      email: '',
      foodType: 'cooked',
      foodName: '',
      quantity: '',
      quantityUnit: 'meals',
      preparationTime: '',
      expiryDate: '',
      packaging: 'packaged',
      packagingType: 'disposable',
      storageConditions: 'room',
      specialNotes: '',
      pickupDate: '',
      pickupTime: '',
      address: '',
      city: '',
      district: '',
      availableUntil: '',
      donationFrequency: 'once',
      termsAccepted: false
    });
    setPhotoPreviews([]);
    setErrors({});
  };

  // الحصول على الحد الأدنى للتاريخ (اليوم)
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  // الحصول على الحد الأقصى للتاريخ (سنة من الآن)
  const getMaxDate = () => {
    const oneYearLater = new Date();
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
    return oneYearLater.toISOString().split('T')[0];
  };

  // مكونات الخطوات
  const renderStep1 = () => (
    <div className="form-step">
      <h3>
        <i className="fas fa-user-circle"></i>
        {language === 'ar' ? 'معلومات المتبرع' : 'Donor Information'}
      </h3>
      
      <div className="form-group">
        <label>{language === 'ar' ? 'نوع المتبرع *' : 'Donor Type *'}</label>
        <div className="donor-types">
          {donorTypes.map(type => (
            <div 
              key={type.id}
              className={`donor-type-card ${formData.donorType === type.id ? 'selected' : ''}`}
              onClick={() => setFormData({...formData, donorType: type.id})}
            >
              <i className={type.icon}></i>
              <span>{language === 'ar' ? type.ar : type.en}</span>
            </div>
          ))}
        </div>
      </div>
      
      {formData.donorType !== 'individual' && (
        <div className="form-group">
          <label htmlFor="organizationName">
            {language === 'ar' ? 'اسم المؤسسة *' : 'Organization Name *'}
          </label>
          <input
            type="text"
            id="organizationName"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleChange}
            placeholder={language === 'ar' ? 'اسم المطعم/الفندق/المؤسسة' : 'Restaurant/Hotel/Organization name'}
            className={errors.organizationName ? 'error' : ''}
          />
          {errors.organizationName && <span className="error-message">{errors.organizationName}</span>}
        </div>
      )}
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="contactPerson">
            {language === 'ar' ? 'اسم المتبرع/المسؤول *' : 'Donor/Contact Person *'}
          </label>
          <input
            type="text"
            id="contactPerson"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            placeholder={language === 'ar' ? 'الاسم الكامل' : 'Full name'}
            className={errors.contactPerson ? 'error' : ''}
          />
          {errors.contactPerson && <span className="error-message">{errors.contactPerson}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">
            {language === 'ar' ? 'رقم الهاتف *' : 'Phone Number *'}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={language === 'ar' ? '05XXXXXXXX' : '05XXXXXXXX'}
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="email">
          {language === 'ar' ? 'البريد الإلكتروني *' : 'Email Address *'}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={language === 'ar' ? 'example@email.com' : 'example@email.com'}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="form-step">
      <h3>
        <i className="fas fa-utensils"></i>
        {language === 'ar' ? 'معلومات الطعام' : 'Food Information'}
      </h3>
      
      <div className="form-group">
        <label>{language === 'ar' ? 'نوع الطعام *' : 'Food Type *'}</label>
        <div className="food-types">
          {foodTypes.map(type => (
            <div 
              key={type.id}
              className={`food-type-card ${formData.foodType === type.id ? 'selected' : ''}`}
              onClick={() => setFormData({...formData, foodType: type.id})}
            >
              <i className={type.icon}></i>
              <span>{language === 'ar' ? type.ar : type.en}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="foodName">
          {language === 'ar' ? 'اسم/وصف الطعام *' : 'Food Name/Description *'}
        </label>
        <input
          type="text"
          id="foodName"
          name="foodName"
          value={formData.foodName}
          onChange={handleChange}
          placeholder={language === 'ar' ? 'مثال: كبسة دجاج، معكرونة باللحم' : 'e.g., Chicken Kabsa, Pasta with Meat'}
          className={errors.foodName ? 'error' : ''}
        />
        {errors.foodName && <span className="error-message">{errors.foodName}</span>}
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="quantity">
            {language === 'ar' ? 'الكمية *' : 'Quantity *'}
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            placeholder={language === 'ar' ? 'الكمية' : 'Quantity'}
            className={errors.quantity ? 'error' : ''}
          />
          {errors.quantity && <span className="error-message">{errors.quantity}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="quantityUnit">
            {language === 'ar' ? 'وحدة القياس' : 'Unit of Measurement'}
          </label>
          <select
            id="quantityUnit"
            name="quantityUnit"
            value={formData.quantityUnit}
            onChange={handleChange}
          >
            {quantityUnits.map(unit => (
              <option key={unit.id} value={unit.id}>
                {language === 'ar' ? unit.ar : unit.en}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="preparationTime">
            {language === 'ar' ? 'وقت التحضير *' : 'Preparation Time *'}
          </label>
          <input
            type="datetime-local"
            id="preparationTime"
            name="preparationTime"
            value={formData.preparationTime}
            onChange={handleChange}
            className={errors.preparationTime ? 'error' : ''}
          />
          {errors.preparationTime && <span className="error-message">{errors.preparationTime}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="expiryDate">
            {language === 'ar' ? 'تاريخ الانتهاء *' : 'Expiry Date *'}
          </label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            min={getTodayDate()}
            max={getMaxDate()}
            className={errors.expiryDate ? 'error' : ''}
          />
          {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="packaging">
            {language === 'ar' ? 'حالة التغليف' : 'Packaging Status'}
          </label>
          <div className="toggle-switch">
            <button
              type="button"
              className={`toggle-btn ${formData.packaging === 'packaged' ? 'active' : ''}`}
              onClick={() => setFormData({...formData, packaging: 'packaged'})}
            >
              {language === 'ar' ? 'مغلف' : 'Packaged'}
            </button>
            <button
              type="button"
              className={`toggle-btn ${formData.packaging === 'unpackaged' ? 'active' : ''}`}
              onClick={() => setFormData({...formData, packaging: 'unpackaged'})}
            >
              {language === 'ar' ? 'غير مغلف' : 'Unpackaged'}
            </button>
          </div>
        </div>
        
        {formData.packaging === 'packaged' && (
          <div className="form-group">
            <label htmlFor="packagingType">
              {language === 'ar' ? 'نوع التغليف' : 'Packaging Type'}
            </label>
            <select
              id="packagingType"
              name="packagingType"
              value={formData.packagingType}
              onChange={handleChange}
            >
              {packagingTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {language === 'ar' ? type.ar : type.en}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="storageConditions">
          {language === 'ar' ? 'ظروف التخزين المطلوبة' : 'Required Storage Conditions'}
        </label>
        <select
          id="storageConditions"
          name="storageConditions"
          value={formData.storageConditions}
          onChange={handleChange}
        >
          {storageConditions.map(condition => (
            <option key={condition.id} value={condition.id}>
              {language === 'ar' ? condition.ar : condition.en}
            </option>
          ))}
        </select>
      </div>
      
      {/* تحميل الصور */}
      <div className="form-group">
        <label>{language === 'ar' ? 'صور الطعام (اختياري)' : 'Food Photos (Optional)'}</label>
        <div className="photo-upload">
          <div className="upload-area">
            <i className="fas fa-camera"></i>
            <p>{language === 'ar' ? 'اسحب وأسقط الصور هنا أو' : 'Drag & drop photos here or'}</p>
            <input
              type="file"
              id="photoUpload"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
              style={{ display: 'none' }}
            />
            <label htmlFor="photoUpload" className="btn btn-outline">
              {language === 'ar' ? 'اختر الصور' : 'Choose Photos'}
            </label>
            <small>{language === 'ar' ? 'الحد الأقصى 5 صور - حجم كل صورة أقل من 5MB' : 'Max 5 photos - Each under 5MB'}</small>
          </div>
          
          {photoPreviews.length > 0 && (
            <div className="photo-preview">
              {photoPreviews.map((preview, index) => (
                <div key={index} className="preview-item">
                  <img src={preview} alt={`Food ${index + 1}`} />
                  <button
                    type="button"
                    className="remove-photo"
                    onClick={() => handleRemovePhoto(index)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="form-step">
      <h3>
        <i className="fas fa-truck"></i>
        {language === 'ar' ? 'معلومات الاستلام' : 'Pickup Information'}
      </h3>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="pickupDate">
            {language === 'ar' ? 'تاريخ الاستلام *' : 'Pickup Date *'}
          </label>
          <input
            type="date"
            id="pickupDate"
            name="pickupDate"
            value={formData.pickupDate}
            onChange={handleChange}
            min={getTodayDate()}
            className={errors.pickupDate ? 'error' : ''}
          />
          {errors.pickupDate && <span className="error-message">{errors.pickupDate}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="pickupTime">
            {language === 'ar' ? 'وقت الاستلام *' : 'Pickup Time *'}
          </label>
          <input
            type="time"
            id="pickupTime"
            name="pickupTime"
            value={formData.pickupTime}
            onChange={handleChange}
            className={errors.pickupTime ? 'error' : ''}
          />
          {errors.pickupTime && <span className="error-message">{errors.pickupTime}</span>}
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="city">
            {language === 'ar' ? 'المدينة *' : 'City *'}
          </label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={errors.city ? 'error' : ''}
          >
            <option value="">{language === 'ar' ? 'اختر المدينة' : 'Select city'}</option>
            {cities.map(city => (
              <option key={city.id} value={city.id}>
                {language === 'ar' ? city.ar : city.en}
              </option>
            ))}
          </select>
          {errors.city && <span className="error-message">{errors.city}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="district">
            {language === 'ar' ? 'الحي/المنطقة' : 'District/Area'}
          </label>
          <input
            type="text"
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChange}
            placeholder={language === 'ar' ? 'اسم الحي' : 'District name'}
          />
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="address">
          {language === 'ar' ? 'العنوان التفصيلي *' : 'Detailed Address *'}
        </label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder={language === 'ar' ? 'شارع، رقم المبنى، أقرب معلم...' : 'Street, building number, nearest landmark...'}
          rows="3"
          className={errors.address ? 'error' : ''}
        />
        {errors.address && <span className="error-message">{errors.address}</span>}
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="availableUntil">
            {language === 'ar' ? 'متاح حتى' : 'Available Until'}
          </label>
          <input
            type="datetime-local"
            id="availableUntil"
            name="availableUntil"
            value={formData.availableUntil}
            onChange={handleChange}
            min={getTodayDate()}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="donationFrequency">
            {language === 'ar' ? 'تكرار التبرع' : 'Donation Frequency'}
          </label>
          <select
            id="donationFrequency"
            name="donationFrequency"
            value={formData.donationFrequency}
            onChange={handleChange}
          >
            {donationFrequencies.map(freq => (
              <option key={freq.id} value={freq.id}>
                {language === 'ar' ? freq.ar : freq.en}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="form-group full-width">
        <label htmlFor="specialNotes">
          {language === 'ar' ? 'ملاحظات إضافية' : 'Additional Notes'}
        </label>
        <textarea
          id="specialNotes"
          name="specialNotes"
          value={formData.specialNotes}
          onChange={handleChange}
          placeholder={language === 'ar' 
            ? 'أي تعليمات خاصة للاستلام أو معلومات إضافية...' 
            : 'Any special instructions for pickup or additional information...'}
          rows="4"
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="form-step">
      <h3>
        <i className="fas fa-file-signature"></i>
        {language === 'ar' ? 'المراجعة والموافقة' : 'Review & Approval'}
      </h3>
      
      <div className="review-section">
        <h4>{language === 'ar' ? 'مراجعة المعلومات' : 'Information Review'}</h4>
        
        <div className="review-grid">
          <div className="review-card">
            <h5><i className="fas fa-user"></i> {language === 'ar' ? 'معلومات المتبرع' : 'Donor Info'}</h5>
            <p><strong>{language === 'ar' ? 'النوع:' : 'Type:'}</strong> {
              donorTypes.find(t => t.id === formData.donorType)[language === 'ar' ? 'ar' : 'en']
            }</p>
            <p><strong>{language === 'ar' ? 'الاسم:' : 'Name:'}</strong> {formData.contactPerson}</p>
            <p><strong>{language === 'ar' ? 'الهاتف:' : 'Phone:'}</strong> {formData.phone}</p>
            <p><strong>{language === 'ar' ? 'البريد:' : 'Email:'}</strong> {formData.email}</p>
          </div>
          
          <div className="review-card">
            <h5><i className="fas fa-utensils"></i> {language === 'ar' ? 'معلومات الطعام' : 'Food Info'}</h5>
            <p><strong>{language === 'ar' ? 'النوع:' : 'Type:'}</strong> {
              foodTypes.find(t => t.id === formData.foodType)[language === 'ar' ? 'ar' : 'en']
            }</p>
            <p><strong>{language === 'ar' ? 'الاسم:' : 'Name:'}</strong> {formData.foodName}</p>
            <p><strong>{language === 'ar' ? 'الكمية:' : 'Quantity:'}</strong> {formData.quantity} {
              quantityUnits.find(u => u.id === formData.quantityUnit)[language === 'ar' ? 'ar' : 'en']
            }</p>
            <p><strong>{language === 'ar' ? 'التحضير:' : 'Preparation:'}</strong> {formData.preparationTime}</p>
          </div>
          
          <div className="review-card">
            <h5><i className="fas fa-map-marker-alt"></i> {language === 'ar' ? 'معلومات الاستلام' : 'Pickup Info'}</h5>
            <p><strong>{language === 'ar' ? 'التاريخ:' : 'Date:'}</strong> {formData.pickupDate}</p>
            <p><strong>{language === 'ar' ? 'الوقت:' : 'Time:'}</strong> {formData.pickupTime}</p>
            <p><strong>{language === 'ar' ? 'المدينة:' : 'City:'}</strong> {
              cities.find(c => c.id === formData.city)?.[language === 'ar' ? 'ar' : 'en'] || '-'
            }</p>
            <p><strong>{language === 'ar' ? 'العنوان:' : 'Address:'}</strong> {formData.address}</p>
          </div>
        </div>
      </div>
      
      <div className="terms-section">
        <div className="form-group">
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className={errors.termsAccepted ? 'error' : ''}
            />
            <label htmlFor="termsAccepted">
              {language === 'ar' 
                ? 'أوافق على الشروط والأحكام وأعطي الإذن لجمعيات بالهنا باستلام الطعام الفائض وتوزيعه على المحتاجين.'
                : 'I agree to the terms and conditions and authorize Balhana charities to receive the surplus food and distribute it to those in need.'}
            </label>
          </div>
          {errors.termsAccepted && <span className="error-message">{errors.termsAccepted}</span>}
        </div>
        
        <div className="terms-details">
          <h5>{language === 'ar' ? 'الشروط والأحكام:' : 'Terms & Conditions:'}</h5>
          <ul>
            <li>{language === 'ar' ? 'الطعام يجب أن يكون صالحاً للاستهلاك الآدمي' : 'Food must be safe for human consumption'}</li>
            <li>{language === 'ar' ? 'عدم المسؤولية عن أي أضرار بعد التسليم' : 'No liability for any damages after delivery'}</li>
            <li>{language === 'ar' ? 'حق المنصة في رفض الطعام غير المناسب' : 'Platform\'s right to reject unsuitable food'}</li>
            <li>{language === 'ar' ? 'التبرع طوعي وغير قابل للاسترجاع' : 'Donation is voluntary and non-refundable'}</li>
          </ul>
        </div>
      </div>
    </div>
  );

  // الخطوات
  const steps = [
    { number: 1, title: language === 'ar' ? 'المتبرع' : 'Donor', icon: 'fas fa-user' },
    { number: 2, title: language === 'ar' ? 'الطعام' : 'Food', icon: 'fas fa-utensils' },
    { number: 3, title: language === 'ar' ? 'الاستلام' : 'Pickup', icon: 'fas fa-truck' },
    { number: 4, title: language === 'ar' ? 'المراجعة' : 'Review', icon: 'fas fa-check' }
  ];

  return (
    <div className="food-donation-form">
      {submitSuccess ? (
        <div className="success-message">
          <div className="success-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <h3>{language === 'ar' ? 'تم تقديم تبرعك بنجاح!' : 'Your donation has been submitted successfully!'}</h3>
          <p>
            {language === 'ar' 
              ? 'شكراً لتبرعك الكريم. سنقوم بمراجعة طلبك والاتصال بك خلال 24 ساعة.'
              : 'Thank you for your generous donation. We will review your request and contact you within 24 hours.'}
          </p>
          <div className="donation-summary">
            <p><strong>{language === 'ar' ? 'رقم الطلب:' : 'Request ID:'}</strong> DON-{Date.now().toString().slice(-6)}</p>
            <p><strong>{language === 'ar' ? 'الطعام:' : 'Food:'}</strong> {formData.foodName}</p>
            <p><strong>{language === 'ar' ? 'الكمية:' : 'Quantity:'}</strong> {formData.quantity} {
              quantityUnits.find(u => u.id === formData.quantityUnit)[language === 'ar' ? 'ar' : 'en']
            }</p>
          </div>
        </div>
      ) : (
        <>
          <div className="form-header">
            <h2>
              <i className="fas fa-donate"></i>
              {language === 'ar' ? 'نموذج التبرع بالطعام' : 'Food Donation Form'}
            </h2>
            <p>
              {language === 'ar' 
                ? 'املأ النموذج أدناه للتبرع بطعامك الفائض. سيتم توجيهه للمحتاجين عبر الجمعيات الخيرية.'
                : 'Fill out the form below to donate your surplus food. It will be directed to those in need through charitable organizations.'}
            </p>
          </div>
          
          {/* شريط التقدم */}
          <div className="progress-bar">
            <div className="steps-indicator">
              {steps.map(step => (
                <div 
                  key={step.number} 
                  className={`step-indicator ${step.number === currentStep ? 'active' : ''} ${step.number < currentStep ? 'completed' : ''}`}
                >
                  <div className="step-number">
                    {step.number < currentStep ? <i className="fas fa-check"></i> : step.number}
                  </div>
                  <span className="step-title">{step.title}</span>
                </div>
              ))}
            </div>
            <div className="progress-line">
              <div 
                className="progress-fill" 
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {errors.submit && (
            <div className="alert alert-error">
              <i className="fas fa-exclamation-circle"></i>
              {errors.submit}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {/* عرض الخطوة الحالية */}
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            
            {/* أزرار التنقل */}
            <div className="form-navigation">
              {currentStep > 1 && (
                <button 
                  type="button" 
                  className="btn btn-outline"
                  onClick={prevStep}
                  disabled={isSubmitting}
                >
                  <i className="fas fa-arrow-right"></i>
                  {language === 'ar' ? 'السابق' : 'Previous'}
                </button>
              )}
              
              <div className="navigation-right">
                {currentStep < steps.length ? (
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={nextStep}
                    disabled={isSubmitting}
                  >
                    {language === 'ar' ? 'التالي' : 'Next'}
                    <i className="fas fa-arrow-left"></i>
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    className="btn btn-success"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        {language === 'ar' ? 'جاري الإرسال...' : 'Submitting...'}
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i>
                        {language === 'ar' ? 'إرسال التبرع' : 'Submit Donation'}
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default FoodDonationForm;
