import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';

const HistoryForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const { timePeriods, interestOptions } = api;

  const onSubmit = (data) => {
    setSubmitting(true);
    
    // Convert interests array to comma-separated string for URL
    const interestsParam = data.interests.join(',');
    
    // Navigate to results page with query parameters
    navigate({
      pathname: '/results',
      search: `?region=${encodeURIComponent(data.region)}&period=${encodeURIComponent(data.period)}&interests=${encodeURIComponent(interestsParam)}`
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
          Region or Country
        </label>
        <input
          id="region"
          type="text"
          className={`input-field ${errors.region ? 'border-red-500' : ''}`}
          placeholder="e.g. Italy, Ottoman Empire, East Asia"
          {...register('region', { required: true })}
        />
        {errors.region && (
          <p className="mt-1 text-sm text-red-600">Please enter a region or country</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="period" className="block text-sm font-medium text-gray-700 mb-1">
          Time Period
        </label>
        <select
          id="period"
          className={`select-field ${errors.period ? 'border-red-500' : ''}`}
          {...register('period', { required: true })}
        >
          <option value="">Select a time period</option>
          {timePeriods.map((period) => (
            <option key={period.value} value={period.value}>
              {period.label}
            </option>
          ))}
        </select>
        {errors.period && (
          <p className="mt-1 text-sm text-red-600">Please select a time period</p>
        )}
      </div>

      <div className="mb-6">
        <fieldset>
          <legend className="block text-sm font-medium text-gray-700 mb-2">
            Areas of Interest (select at least one)
          </legend>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {interestOptions.map((interest) => (
              <div key={interest.value} className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id={interest.value}
                    type="checkbox"
                    className="checkbox-field"
                    value={interest.value}
                    {...register('interests', { required: true })}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor={interest.value} className="text-gray-700">
                    {interest.label}
                  </label>
                </div>
              </div>
            ))}
          </div>
          {errors.interests && (
            <p className="mt-1 text-sm text-red-600">Please select at least one area of interest</p>
          )}
        </fieldset>
      </div>

      <div>
        <button
          type="submit"
          className="btn-primary w-full cursor-pointer"
          disabled={submitting}
        >
          {submitting ? 'Exploring...' : 'Explore Historical Era'}
        </button>
      </div>
    </form>
  );
};

export default HistoryForm;