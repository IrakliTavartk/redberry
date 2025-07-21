import { EmployeeModalProps } from "@/types/propTypes";
import { EmployeeData } from "@/types/types";
import { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "12px",
    padding: "0",
    width: "500px",
    maxWidth: "90vw",
    maxHeight: "90vh",
    overflow: "visible",
  },
};

// Make sure to set this in your main App component
// Modal.setAppElement("#root");

const EmployeeModal = ({ isOpen, onClose, onSubmit }: EmployeeModalProps) => {
  const [formData, setFormData] = useState<EmployeeData>({
    name: "",
    email: "",
    position: "",
    avatar: null,
  });

  const [errors, setErrors] = useState<Partial<EmployeeData>>({});
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  const validateForm = (): boolean => {
    const newErrors: Partial<EmployeeData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "სახელი აუცილებელია";
    } else if (formData.name.length < 2) {
      newErrors.name = "სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს";
    }

    if (!formData.email.trim()) {
      newErrors.email = "იმეილი აუცილებელია";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "იმეილის ფორმატი არასწორია";
    }

    if (!formData.position.trim()) {
      newErrors.position = "თანამდებობა აუცილებელია";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof EmployeeData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        avatar: file,
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      position: "",
      avatar: null,
    });
    setErrors({});
    setAvatarPreview("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={customStyles}
      contentLabel="თანამშრომლის შექმნა"
    >
      <div className="p-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">
            თანამშრომლის დამატება
          </h2>
          <button
            onClick={handleClose}
            className="text-2xl font-light text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Email Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                სახელი*
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="შეიყვანეთ სახელი"
              />
              {errors.name && (
                <div className="mt-1 flex items-center">
                  <span className="mr-1 text-xs text-green-500">✓</span>
                  <span className="text-xs text-red-500">{errors.name}</span>
                </div>
              )}
              {!errors.name && formData.name && (
                <div className="mt-1 flex items-center">
                  <span className="mr-1 text-xs text-green-500">✓</span>
                  <span className="text-xs text-green-600">
                    მინიმუმ 2 სიმბოლო
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                იმეილი*
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="შეიყვანეთ იმეილი"
              />
              {errors.email && (
                <div className="mt-1 flex items-center">
                  <span className="mr-1 text-xs text-green-500">✓</span>
                  <span className="text-xs text-red-500">{errors.email}</span>
                </div>
              )}
              {!errors.email && formData.email && (
                <div className="mt-1 flex items-center">
                  <span className="mr-1 text-xs text-green-500">✓</span>
                  <span className="text-xs text-green-600">სწორი ფორმატი</span>
                </div>
              )}
            </div>
          </div>

          {/* Avatar Upload */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              აუატრი*
            </label>
            <div className="flex flex-col items-center">
              <div className="mb-2 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-300">
                    <span className="text-xs text-gray-500">📷</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                id="avatar-upload"
              />
              <label
                htmlFor="avatar-upload"
                className="cursor-pointer text-sm text-blue-600 hover:text-blue-800"
              >
                📷 ფოტოს ატვირთვა
              </label>
            </div>
          </div>

          {/* Position */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              თანამდებობა*
            </label>
            <select
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.position ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">აირჩიეთ თანამდებობა</option>
              <option value="developer">დეველოპერი</option>
              <option value="designer">დიზაინერი</option>
              <option value="manager">მენეჯერი</option>
              <option value="analyst">ანალიტიკოსი</option>
              <option value="tester">ტესტერი</option>
              <option value="devops">DevOps</option>
            </select>
            {errors.position && (
              <span className="mt-1 text-xs text-red-500">
                {errors.position}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-md border border-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-50"
            >
              გაუქმება
            </button>
            <button
              type="submit"
              className="rounded-md bg-purple-600 px-6 py-2 text-white transition-colors hover:bg-purple-700"
            >
              დამატება თანამშრომლად
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EmployeeModal;
