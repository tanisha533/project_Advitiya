import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

const DonorSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    user_type: '',
    other_type: '',
    phone_number: '',
    postal_code: '',
    colony: '',
    city: '',
    state: '',
    agreed_to_terms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate required fields
    if (!formData.agreed_to_terms) {
      setError('You must agree to the terms and conditions');
      return;
    }

    if (formData.user_type === 'other' && !formData.other_type) {
      setError('Please specify your type when selecting "Others"');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/donor/signup/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.status === 'success') {
        setSuccess('Registration successful! Please check your email.');
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          user_type: '',
          other_type: '',
          phone_number: '',
          postal_code: '',
          colony: '',
          city: '',
          state: '',
          agreed_to_terms: false
        });
        navigate('/login');
      }
    } catch (err) {
      console.error('Registration error:', err.response?.data);
      if (err.response?.data?.errors) {
        // Handle validation errors
        const errorMessages = Object.entries(err.response.data.errors)
          .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
          .join('\n');
        setError(errorMessages);
      } else {
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8 relative">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          Donor Registration
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Join our network of donors making a difference in the world.
        </p>
      </div>

      {error && (
        <div className="mx-auto mt-4 max-w-xl text-center text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="mx-auto mt-4 max-w-xl text-center text-green-600">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first_name" className="block text-sm font-semibold leading-6 text-gray-900">
              First name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="first_name"
                id="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="last_name" className="block text-sm font-semibold leading-6 text-gray-900">
              Last name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="last_name"
                id="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="user_type" className="block text-sm font-semibold leading-6 text-gray-900">
              What describes you?
            </label>
            <div className="mt-2.5">
              <select
                name="user_type"
                id="user_type"
                value={formData.user_type}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">Select Type</option>
                <option value="farmer">Farmer</option>
                <option value="retailer">Retailer</option>
                <option value="business">Business Owner</option>
                <option value="donor">Donor</option>
                <option value="other">Others</option>
              </select>
            </div>
          </div>

          {formData.user_type === 'other' && (
            <div className="sm:col-span-2">
              <label htmlFor="other_type" className="block text-sm font-semibold leading-6 text-gray-900">
                Please specify
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="other_type"
                  id="other_type"
                  value={formData.other_type}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          )}

          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="password" className="block text-sm font-semibold leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2.5 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                title="Must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
                className="block w-full rounded-md border-0 px-3.5 py-2 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="phone_number" className="block text-sm font-semibold leading-6 text-gray-900">
              Phone number
            </label>
            <div className="mt-2.5">
              <input
                type="tel"
                name="phone_number"
                id="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
                pattern="^\+?[1-9]\d{9,14}$"
                title="Please enter a valid phone number"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="+919876543210"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="postal_code" className="block text-sm font-semibold leading-6 text-gray-900">
              Postal Code
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="postal_code"
                id="postal_code"
                value={formData.postal_code}
                onChange={handleChange}
                required
                pattern="^\d{6}$"
                title="Please enter a valid 6-digit postal code"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="colony" className="block text-sm font-semibold leading-6 text-gray-900">
              Colony/Area
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="colony"
                id="colony"
                value={formData.colony}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-semibold leading-6 text-gray-900">
              City
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="city"
                id="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-semibold leading-6 text-gray-900">
              State
            </label>
            <div className="mt-2.5">
              <select
                name="state"
                id="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">Select State</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi">Delhi</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex items-center gap-x-3">
            <input
              type="checkbox"
              name="agreed_to_terms"
              id="agreed_to_terms"
              checked={formData.agreed_to_terms}
              onChange={handleChange}
              required
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label htmlFor="agreed_to_terms" className="text-sm leading-6 text-gray-600">
              By selecting this, you agree to our{' '}
              <a href="#" className="font-semibold text-indigo-600">privacy&nbsp;policy</a>.
            </label>
          </div>
        </div>

        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default DonorSignup;
