import React, { useState } from 'react';
import './CharityRequestForm.css';

const CharityRequestForm = ({ language }) => {
  // حالة النموذج
  const [formData, setFormData] = useState({
    charityName: '',
    contactPerson: '',
    phone: '',
    email: '',
    charityId: '',
    charityType: 'registered',
    beneficiariesCount: '',
    foodType: 'cooked',
    quantity: '',
    deliveryDate: '',
    deliveryTime: '',
    address: '',
    city: '',
    district: '',
    specialNeeds: '',
    notes: ''
  });

  // حالة التقديم
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // أنواع الطعام
  const foodTypes = [
    { id: 'cooked', ar: 'وجبات مطبوخة', en: 'Cooked Meals' },
    { id: 'fastfood', ar: 'وجبات سريعة', en: 'Fast Food' },
    { id: 'bakery', ar: 'مخبوزات ومعجنات', en: 'Bakery & Pastries' },
    { id: 'fruits', ar: 'فواكه وخضروات', en: 'Fruits & Vegetables' },
    { id: 'dry', ar: 'مواد جافة (أرز، سكر، دقيق)', en: 'Dry Food (Rice, Sugar, Flour)' },
    { id: 'beverages', ar: 'مشروبات وعصائر', en: 'Beverages & Juices' },
    { id: 'any', ar: 'أي نوع متاح', en: 'Any Available Type' }
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
    { id: 'qassim', ar: 'القصيم', en: 'Qassim' }
  ];

  // عدد المستفيدين
  const beneficiariesOptions = [
    { value: '1-10', ar: '1-10 أشخاص', en: '1-10 People' },
    { value: '11-30', ar: '11-30 شخص', en: '11-30 People' },
    { value: '31-50', ar: '31-50 شخص', en: '31-50 People' },
    { value: '51-100', ar: '51-100 شخص', en: '51-100 People' },
    { value: '100+', ar: 'أكثر من 100 شخص', en: 'More than 100 People' }
  ];

  // معالجة تغيير المدخلات
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // حذف الخطأ عند التعديل
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // التحقق من الصحة
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.charityName.trim()) {
      newErrors.charityName = language === 'ar' ? 'اسم الجمعية مطلوب' : 'Charity name is required';
    }
    
    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = language === 'ar' ? 'اسم المسؤول مطلوب' : 'Contact person is required';
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
    
    if (!formData.beneficiariesCount) {
      newErrors.beneficiariesCount = language === 'ar' ? 'عدد المستفيدين مطلوب' : 'Number of beneficiaries is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = language === 'ar' ? 'العنوان التفصيلي مطلوب' : 'Detailed address is required';
    }
    
    if (!formData.city) {
      newErrors.city = language === 'ar' ? 'المدينة مطلوبة' : 'City is required';
    }
    
    if (!formData.deliveryDate) {
      newErrors.deliveryDate = language === 'ar' ? 'تاريخ التوصيل مطلوب' : 'Delivery date is required';
    }
    
    if (!formData.deliveryTime) {
      newErrors.deliveryTime = language === 'ar' ? 'وقت التوصيل مطلوب' : 'Delivery time is required';
    }
    
    return newErrors;
  };

  // معالجة تقديم النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // محاكاة إرسال البيانات للخادم
      console.log('Form data:', formData);
      
      // انتظار لمحاكاة الطلب
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitSuccess(true);
      
      // إعادة تعيين النموذج بعد 3 ثواني
      setTimeout(() => {
        setFormData({
          charityName: '',
          contactPerson: '',
          phone: '',
          email: '',
          charityId: '',
          charityType: 'registered',
          beneficiariesCount: '',
          foodType: 'cooked',
          quantity: '',
          deliveryDate: '',
          deliveryTime: '',
          address: '',
          city: '',
          district: '',
          specialNeeds: '',
          notes: ''
        });
        setSubmitSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({
        submit: language === 'ar' ? 'حدث خطأ أثناء الإرسال' : 'An error occurred during submission'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // معالجة الإلغاء
  const handleCancel = () => {
    setFormData({
      charityName: '',
      contactPerson: '',
      phone: '',
      email: '',
      charityId: '',
      charityType: 'registered',
      beneficiariesCount: '',
      foodType: 'cooked',
      quantity: '',
      deliveryDate: '',
      deliveryTime: '',
      address: '',
      city: '',
      district: '',
      specialNeeds: '',
      notes: ''
    });
    setErrors({});
  };

  // الحصول على تاريخ اليوم بتهيئة YYYY-MM-DD
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // الحصول على الحد الأدنى للتاريخ (اليوم + 1)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="charity-request-form">
      {submitSuccess ? (
        <div className="success-message">
          <div className="success-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <h3>{language === 'ar' ? 'تم إرسال الطلب بنجاح!' : 'Request submitted successfully!'}</h3>
          <p>
            {language === 'ar' 
              ? 'شكراً لتسجيل طلبك. سنقوم بمراجعته والرد عليك خلال 24 ساعة.'
              : 'Thank you for submitting your request. We will review it and get back to you within 24 hours.'}
          </p>
        </div>
      ) : (
        <>
          <div className="form-header">
            <h2>{language === 'ar' ? 'طلب مساعدة غذائية' : 'Food Assistance Request'}</h2>
            <p>
              {language === 'ar' 
                ? 'يرجى ملء النموذج أدناه لطلب مساعدة غذائية لمحتاجيكم. سيتم الرد على طلبكم خلال 24 ساعة.'
                : 'Please fill out the form below to request food assistance for your beneficiaries. We will respond to your request within 24 hours.'}
            </p>
          </div>
          
          {errors.submit && (
            <div className="alert alert-error">
              <i className="fas fa-exclamation-circle"></i>
              {errors.submit}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {/* معلومات الجمعية */}
            <div className="form-section">
              <h3>
                <i className="fas fa-building"></i>
                {language === 'ar' ? 'معلومات الجمعية' : 'Charity Information'}
              </h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="charityName">
                    {language === 'ar' ? 'اسم الجمعية *' : 'Charity Name *'}
                  </label>
                  <input
                    type="text"
                    id="charityName"
                    name="charityName"
                    value={formData.charityName}
                    onChange={handleChange}
                    placeholder={language === 'ar' ? 'أدخل اسم الجمعية' : 'Enter charity name'}
                    className={errors.charityName ? 'error' : ''}
                  />
                  {errors.charityName && <span className="error-message">{errors.charityName}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="charityType">
                    {language === 'ar' ? 'نوع الجمعية *' : 'Charity Type *'}
                  </label>
                  <select
                    id="charityType"
                    name="charityType"
                    value={formData.charityType}
                    onChange={handleChange}
                  >
                    <option value="registered">{language === 'ar' ? 'جمعية مسجلة' : 'Registered Charity'}</option>
                    <option value="non-registered">{language === 'ar' ? 'مبادرة غير مسجلة' : 'Non-registered Initiative'}</option>
                    <option value="mosque">{language === 'ar' ? 'مسجد' : 'Mosque'}</option>
                    <option value="other">{language === 'ar' ? 'أخرى' : 'Other'}</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="charityId">
                    {language === 'ar' ? 'رقم السجل (إن وجد)' : 'Registration Number (if any)'}
                  </label>
                  <input
                    type="text"
                    id="charityId"
                    name="charityId"
                    value={formData.charityId}
                    onChange={handleChange}
                    placeholder={language === 'ar' ? 'رقم السجل التجاري/الخيري' : 'Commercial/Charity registration number'}
                  />
                </div>
              </div>
            </div>
            
            {/* معلومات الاتصال */}
            <div className="form-section">
              <h3>
                <i className="fas fa-user"></i>
                {language === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}
              </h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contactPerson">
                    {language === 'ar' ? 'اسم المسؤول *' : 'Contact Person *'}
                  </label>
                  <input
                    type="text"
                    id="contactPerson"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    placeholder={language === 'ar' ? 'اسم المسؤول عن الاستلام' : 'Name of person responsible for receiving'}
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
              
              <div className="form-row">
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
                    placeholder={language === 'ar' ? 'example@charity.org' : 'example@charity.org'}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>
            </div>
            
            {/* تفاصيل الطلب */}
            <div className="form-section">
              <h3>
                <i className="fas fa-utensils"></i>
                {language === 'ar' ? 'تفاصيل الطلب' : 'Request Details'}
              </h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="beneficiariesCount">
                    {language === 'ar' ? 'عدد المستفيدين *' : 'Number of Beneficiaries *'}
                  </label>
                  <select
                    id="beneficiariesCount"
                    name="beneficiariesCount"
                    value={formData.beneficiariesCount}
                    onChange={handleChange}
                    className={errors.beneficiariesCount ? 'error' : ''}
                  >
                    <option value="">{language === 'ar' ? 'اختر عدد المستفيدين' : 'Select number of beneficiaries'}</option>
                    {beneficiariesOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {language === 'ar' ? option.ar : option.en}
                      </option>
                    ))}
                  </select>
                  {errors.beneficiariesCount && <span className="error-message">{errors.beneficiariesCount}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="foodType">
                    {language === 'ar' ? 'نوع الطعام المطلوب *' : 'Requested Food Type *'}
                  </label>
                  <select
                    id="foodType"
                    name="foodType"
                    value={formData.foodType}
                    onChange={handleChange}
                  >
                    {foodTypes.map(type => (
                      <option key={type.id} value={type.id}>
                        {language === 'ar' ? type.ar : type.en}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="quantity">
                    {language === 'ar' ? 'الكمية التقريبية (اختياري)' : 'Approximate Quantity (Optional)'}
                  </label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder={language === 'ar' ? 'مثال: 50 وجبة، 20 كيلو' : 'e.g., 50 meals, 20 kg'}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="specialNeeds">
                    {language === 'ar' ? 'احتياجات خاصة (اختياري)' : 'Special Needs (Optional)'}
                  </label>
                  <input
                    type="text"
                    id="specialNeeds"
                    name="specialNeeds"
                    value={formData.specialNeeds}
                    onChange={handleChange}
                    placeholder={language === 'ar' ? 'مثل: طعام لمرضى السكري، أطعمة للأطفال' : 'e.g., Diabetic food, baby food'}
                  />
                </div>
              </div>
            </div>
            
            {/* تفاصيل التوصيل */}
            <div className="form-section">
              <h3>
                <i className="fas fa-truck"></i>
                {language === 'ar' ? 'تفاصيل التوصيل' : 'Delivery Details'}
              </h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="deliveryDate">
                    {language === 'ar' ? 'تاريخ التوصيل *' : 'Delivery Date *'}
                  </label>
                  <input
                    type="date"
                    id="deliveryDate"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                    min={getMinDate()}
                    className={errors.deliveryDate ? 'error' : ''}
                  />
                  {errors.deliveryDate && <span className="error-message">{errors.deliveryDate}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="deliveryTime">
                    {language === 'ar' ? 'وقت التوصيل *' : 'Delivery Time *'}
                  </label>
                  <input
                    type="time"
                    id="deliveryTime"
                    name="deliveryTime"
                    value={formData.deliveryTime}
                    onChange={handleChange}
                    className={errors.deliveryTime ? 'error' : ''}
                  />
                  {errors.deliveryTime && <span className="error-message">{errors.deliveryTime}</span>}
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
                    placeholder={language === 'ar' ? 'اسم الحي أو المنطقة' : 'District or area name'}
                  />
                </div>
              </div>
              
              <div className="form-group full-width">
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
            </div>
            
            {/* ملاحظات إضافية */}
            <div className="form-section">
              <h3>
                <i className="fas fa-sticky-note"></i>
                {language === 'ar' ? 'ملاحظات إضافية' : 'Additional Notes'}
              </h3>
              
              <div className="form-group full-width">
                <label htmlFor="notes">
                  {language === 'ar' ? 'ملاحظات أو تعليمات خاصة (اختياري)' : 'Additional Notes or Special Instructions (Optional)'}
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder={language === 'ar' 
                    ? 'أي معلومات إضافية تساعدنا في خدمتكم بشكل أفضل...' 
                    : 'Any additional information to help us serve you better...'}
                  rows="4"
                />
              </div>
            </div>
            
            {/* معلومات مهمة */}
            <div className="important-info">
              <h4>
                <i className="fas fa-info-circle"></i>
                {language === 'ar' ? 'معلومات مهمة' : 'Important Information'}
              </h4>
              <ul>
                <li>
                  {language === 'ar' 
                    ? 'سيتم الرد على طلبكم خلال 24 ساعة عمل'
                    : 'We will respond to your request within 24 working hours'}
                </li>
                <li>
                  {language === 'ar' 
                    ? 'يرجى التأكد من صحة معلومات الاتصال'
                    : 'Please ensure contact information is accurate'}
                </li>
                <li>
                  {language === 'ar' 
                    ? 'يجب أن يكون شخص مسؤول متواجد في وقت التوصيل'
                    : 'A responsible person must be available at delivery time'}
                </li>
                <li>
                  {language === 'ar' 
                    ? 'جميع الوجبات مقدمة بحسب توفرها'
                    : 'All meals are provided based on availability'}
                </li>
              </ul>
            </div>
            
            {/* أزرار الإرسال */}
            <div className="form-actions">
              <button 
                type="button" 
                className="btn btn-outline"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              
              <button 
                type="submit" 
                className="btn btn-primary"
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
                    {language === 'ar' ? 'إرسال الطلب' : 'Submit Request'}
                  </>
                )}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default CharityRequestForm;
