"use client";
import { useState } from "react";
import { tabs } from "@/utils/constants";
import { useAuth } from "@/context/AuthContext";
import BookingHistory from "@/components/ui/BookingHistory";

export default function page() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("Profile");
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    birthday: user?.birthday || "",
    identity: user?.identity || "",
    married: user?.married || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-[#f5f5f5] min-h-[calc(100vh-160px)]">
      {/* Tabs */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-8 px-4 py-3 text-sm font-medium">
          {
            tabs.map((tab)=>(
              <button 
                key={tab}
                className={`pb-2 cursor-pointer border-b-2 transition ${
                  activeTab === tab 
                    ? 'text-[#f74565] border-[#f74565]' 
                    : 'text-gray-600 border-transparent hover:text-black'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))
          }
        </div>
      </div>

      {/* Profile Content */}
      {activeTab === "Profile" && (
        <div className="max-w-7xl mx-auto px-4 py-5">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-[#2d3e50] to-[#f74565] text-white p-5 rounded-lg flex items-center gap-5 mb-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-xl font-bold text-[#f74565] flex-shrink-0">
              {user?.name?.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-semibold">Hi, {user?.name}</h2>
            </div>
          </div>

          {/* Account Details */}
          <div className="bg-white rounded-lg p-5 mb-6">
            <h3 className="text-base font-semibold mb-4 text-gray-800">Account Details</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Email Address</p>
                  <p className="text-gray-900 font-medium text-sm">{user?.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Verified</span>
                  <button className="text-red-500 text-lg">✕</button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Mobile Number</p>
                  <p className="text-gray-900 font-medium text-sm">+91 - {user?.phone || "Not provided"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Verified</span>
                  <button className="text-red-500 text-lg">✕</button>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div className="bg-white rounded-lg p-5">
            <h3 className="text-base font-semibold mb-4 text-gray-800">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label className="block text-xs text-gray-700 mb-1.5">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#f74565]"
                  placeholder="First Name"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-xs text-gray-700 mb-1.5">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#f74565]"
                  placeholder="Last Name"
                />
              </div>

              {/* Birthday */}
              <div>
                <label className="block text-xs text-gray-700 mb-1.5">Birthday (Optional)</label>
                <input
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#f74565]"
                />
              </div>

              {/* Identity */}
              <div>
                <label className="block text-xs text-gray-700 mb-1.5">Identity (Optional)</label>
                <div className="flex gap-2">
                  <select
                    name="identity"
                    value={formData.identity}
                    onChange={handleChange}
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#f74565]"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <button className="px-3 py-2 text-sm bg-[#f74565] text-white rounded font-medium hover:bg-[#e63a52]">
                    Save
                  </button>
                </div>
              </div>

              {/* Married */}
              <div>
                <label className="block text-xs text-gray-700 mb-1.5">Married? (Optional)</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFormData({ ...formData, married: "Yes" })}
                    className={`flex-1 py-2 text-sm rounded font-medium transition ${
                      formData.married === "Yes"
                        ? "bg-gray-800 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setFormData({ ...formData, married: "No" })}
                    className={`flex-1 py-2 text-sm rounded font-medium transition ${
                      formData.married === "No"
                        ? "bg-[#f74565] text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Your Orders Tab */}
      {activeTab === "Your Orders" && (
        <div className="max-w-7xl mx-auto px-4 py-5">
          <BookingHistory/>
        </div>
      )}
    </div>
  );
}

