import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadForm from '../../components/UploadForm/UploadForm';
import StyleSelector from '../../components/StyleSelector/StyleSelector';
import SceneSelector from '../../components/SceneSelector/SceneSelector';
import { initEmailService, sendFormToAdmin, validateEmail } from '../../services/email/emailService';

const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    image: null,
    style: 'bairbie', // default style
    scene: 'fashion', // default scene
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    initEmailService();
  }, []);

  const handleImageUpload = (imageData) => {
    setFormData({
      ...formData,
      image: imageData
    });
    // Clear image-related errors
    if (errors.image) {
      setErrors({
        ...errors,
        image: undefined
      });
    }
  };

  const handleStyleChange = (styleId) => {
    setFormData({
      ...formData,
      style: styleId
    });
  };

  const handleSceneChange = (sceneId) => {
    setFormData({
      ...formData,
      scene: sceneId
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear field-related errors
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate image
    if (!formData.image) {
      newErrors.image = 'Please upload a photo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendFormToAdmin(formData);
      
      if (result.success) {
        setSubmitSuccess(true);
        // Save email to session storage for display on success page
        sessionStorage.setItem('userEmail', formData.email);
        navigate('/success');
      } else {
        setErrors({
          ...errors,
          submit: result.message
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({
        ...errors,
        submit: 'Error submitting form. Please try again later.'
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Title */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">AI Doll Image Generator</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload your photo, choose a style and scene, and we'll create a unique doll image for you!
        </p>
      </div>
      
      {/* Features Section */}
      <section id="features" className="mb-16">
        <h2 className="text-2xl font-bold text-dark mb-8 text-center">Amazing Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-dark mb-2">Photo Upload</h3>
            <p className="text-gray-600">
              Easily upload your high-resolution photos. Front-facing photos without obstruction work best.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-dark mb-2">Multiple Styles</h3>
            <p className="text-gray-600">
              Choose from different doll styles including Barbie, Ken, Superhero, and more.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-dark mb-2">Scene Customization</h3>
            <p className="text-gray-600">
              Select from various scenes and themes like Winter, Fashion, Christmas, Spring Festival, and Halloween.
            </p>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="mb-16">
        <h2 className="text-2xl font-bold text-dark mb-8 text-center">How It Works</h2>
        <div className="relative">
          {/* Connection line - only visible on medium screens and up */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 z-0"></div>
          
          <div className="space-y-12 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right">
                <h3 className="text-xl font-semibold text-dark mb-2">1. Upload Photo</h3>
                <p className="text-gray-600">
                  Upload your high-quality front-facing photo with clear facial visibility.
                </p>
              </div>
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="md:w-1/2 md:pl-12 md:text-left"></div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right"></div>
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="md:w-1/2 md:pl-12 md:text-left">
                <h3 className="text-xl font-semibold text-dark mb-2">2. Choose Style and Scene</h3>
                <p className="text-gray-600">
                  Select from various doll styles and scene themes to create your perfect combination.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right">
                <h3 className="text-xl font-semibold text-dark mb-2">3. Submit Request</h3>
                <p className="text-gray-600">
                  Fill in your name and email, then submit your request.
                </p>
              </div>
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                3
              </div>
              <div className="md:w-1/2 md:pl-12 md:text-left"></div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right"></div>
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                4
              </div>
              <div className="md:w-1/2 md:pl-12 md:text-left">
                <h3 className="text-xl font-semibold text-dark mb-2">4. Processing</h3>
                <p className="text-gray-600">
                  We process your request, which typically takes 1-2 business days.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right">
                <h3 className="text-xl font-semibold text-dark mb-2">5. Receive Your Creation</h3>
                <p className="text-gray-600">
                  Once completed, we'll send your doll image to you via email.
                </p>
              </div>
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                5
              </div>
              <div className="md:w-1/2 md:pl-12 md:text-left"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Form Section */}
      <section id="creation-form" className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-dark mb-6 text-center">Create Your Doll Image</h2>
        
        <form onSubmit={handleSubmit}>
          <UploadForm onImageUpload={handleImageUpload} />
          {errors.image && <p className="mt-1 text-red-500 text-sm">{errors.image}</p>}
          
          <StyleSelector selected={formData.style} onChange={handleStyleChange} />
          
          <SceneSelector selected={formData.scene} onChange={handleSceneChange} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-dark text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:outline-none transition ${
                  errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary/20'
                }`}
                placeholder="Your name"
              />
              {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-dark text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:outline-none transition ${
                  errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary/20'
                }`}
                placeholder="Your email address"
              />
              {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
            </div>
          </div>
          
          <div className="mb-8">
            <label htmlFor="notes" className="block text-dark text-sm font-medium mb-2">Notes (Optional)</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:outline-none transition"
              rows="3"
              placeholder="Any special requests or instructions"
            ></textarea>
          </div>
          
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-primary hover:bg-primary/90 text-white font-medium text-lg px-8 py-3 rounded-lg transition shadow-md ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Processing...' : 'Create My Doll Image'}
            </button>
            
            {errors.submit && <p className="mt-4 text-red-500 text-sm">{errors.submit}</p>}
            
            <p className="mt-4 text-sm text-gray-500">
              After submission, we'll process your request within 1-2 business days and send results via email.
            </p>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Home; 