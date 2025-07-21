
import React, { FormEvent, useState } from 'react';
import Image from 'next/image';

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (employeeData: EmployeeData) => void;
}

interface EmployeeData {
  name: string;
  email: string;
  avatar: string;
  department: string;
}

const EmployeeModal= ({ isOpen, onClose, onSubmit }: EmployeemodalProps) => {
  const [formData, setFormData] = useState<EmployeeData>({
    name: '',
    email: '',
    avatar: '',
    department: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', email: '', avatar: '', department: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">თანამშრომლის დამატება</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              სახელი*
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="flex items-center mt-1">
              <span className="text-green-500 text-sm">✓</span>
              <span className="text-xs text-gray-500 ml-1">სავალდებულო ველების შევსება</span>
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              მეილი*
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="flex items-center mt-1">
              <span className="text-green-500 text-sm">✓</span>
              <span className="text-xs text-gray-500 ml-1">მეილის ვალიდაცია</span>
            </div>
          </div>

          {/* Avatar Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ავატარი*
            </label>
            <div className="border-2 border-dashed border-purple-300 rounded-lg p-4 text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center overflow-hidden">
                {formData.avatar ? (
                 <Image src={formData.avatar} alt="Avatar" width={64} height={64} className="w-[64px] h-[64px] object-cover" />
                ) : (
                  <span className="text-gray-400">👤</span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      setFormData(prev => ({ ...prev, avatar: e.target?.result as string }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="hidden"
                id="avatar-upload"
              />
              <label
                htmlFor="avatar-upload"
                className="cursor-pointer text-purple-600 hover:text-purple-800"
              >
                Upload Image
              </label>
            </div>
          </div>

          {/* Department Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              დეპარტამენტი*
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">აირჩიეთ დეპარტამენტი</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              გაუქმება
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              თანამშრომლის დამატება
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;