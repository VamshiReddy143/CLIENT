import { useState } from 'react'
import SearchPage from '../SearchPage'

function App() {
  const [formData, setFormData] = useState({
    marketplaceName: '',
    ownerName: '',
    email: '',
    invoiceNumber: '',
    invoiceDate: '',
    dueDate: '',
    vendorName: '',
    contactEmail: '',
    phoneNumber: '',
    address: '',
    spaceHighlights: '',
    totalPrice: '',
    paymentMethod: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen bg-white lg:px-10">
    <SearchPage/>
      <div className="max-w-3xl mx-auto mt-15">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Marketplace Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[13px] text-gray-800 mb-2">
                Marketplace Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="marketplaceName"
                value={formData.marketplaceName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#F9F9F9] border-0 text-gray-700 text-sm rounded-lg focus:outline-none"
                required
                placeholder="Downtown Vendor Hub"
              />
            </div>
            <div>
              <label className="block text-[13px] text-gray-800 mb-2">
                Market Owner&apos;s Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#F9F9F9] border-0 text-gray-700 text-sm rounded-lg focus:outline-none"
                required
                placeholder="Timothy"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[13px] text-gray-800 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#F9F9F9] border-0 text-gray-700 text-sm rounded-lg focus:outline-none"
                required
                placeholder="Timothy@Gmail.Com"
              />
            </div>
            <div>
              <label className="block text-[13px] text-gray-800 mb-2">
                Invoice Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#F9F9F9] border-0 text-gray-700 text-sm rounded-lg focus:outline-none"
                required
                placeholder="INV 2023503"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[13px] text-gray-800 mb-2">
                Invoice Date <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="invoiceDate"
                value={formData.invoiceDate}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#F9F9F9] border-0 text-gray-700 text-sm rounded-lg focus:outline-none"
                required
                placeholder="23 . 02 . 2023"
              />
            </div>
            <div>
              <label className="block text-[13px] text-gray-800 mb-2">
                Due Date <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#F9F9F9] border-0 text-gray-700 text-sm rounded-lg focus:outline-none"
                required
                placeholder="15 . 03 . 2023"
              />
            </div>
          </div>

          {/* Vendor Details */}
          <div className="mt-10">
            <h3 className="text-[15px] md:text-[17px] lg:text-[20px] font-bold text-gray-900 mb-6">Vendor Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[13px] text-gray-800 mb-2">
                  Vendor Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="vendorName"
                  value={formData.vendorName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F9F9F9] border-0 text-gray-700 text-sm rounded-lg focus:outline-none"
                  required
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-[13px] text-gray-800 mb-2">
                  Contact Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F9F9F9] border-0 text-gray-700 text-sm rounded-lg focus:outline-none"
                  required
                  placeholder="Johndoe@Gmail.Com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-[13px] text-gray-800 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F9F9F9] border-0 text-gray-700 text-sm rounded-lg focus:outline-none"
                  required
                  placeholder="+971 234 456633"
                />
              </div>
              <div>
                <label className="block text-[13px] text-gray-800 mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F9F9F9] border-0 text-gray-700 text-sm rounded-lg focus:outline-none"
                  required
                  placeholder="XYZ"
                />
              </div>
            </div>
          </div>

          {/* Rental Space Detail */}
          <div className="mt-10">
            <h3 className="text-[15px] md:text-[17px] lg:text-[20px] font-bold text-gray-900 mb-6">Rental Space Detail</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[13px] text-gray-800 mb-2">
                  Space Highlights
                </label>
                <textarea
                  name="spaceHighlights"
                  value={formData.spaceHighlights}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-[#F9F9F9] border-0 text-gray-700 text-sm rounded-lg focus:outline-none resize-none"
                  placeholder="Fully Furnished&#13;&#10;200 Sq. Ft&#13;&#10;Near Metro&#13;&#10;Prime Location&#13;&#10;High Foot Traffic&#13;&#10;Flexible Lease&#13;&#10;Business-Friendly&#13;&#10;24/7 Security"
                />
              </div>
              <div>
                <label className="block text-[13px] text-gray-800 mb-2">
                  Total Price
                </label>
                <input
                  type="text"
                  name="totalPrice"
                  value={formData.totalPrice} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F9F9F9] border-0 text-gray-700 text-sm rounded-lg focus:outline-none"
                  placeholder="$1,466"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mt-6">
            <label className="block text-[13px] text-gray-800 mb-2">
              Payment Method (PayPal, Stripe, Credit Card, Etc.)
            </label>
            {/* <input
              type="text"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#F9F9F9] border-0 text-gray-700 text-sm rounded-lg focus:outline-none"
            /> */}
          </div>

          {/* Submit Button */}
          <div className="mt-10">
            <button
              type="submit"
              className="w-full bg-[#FF6B00] text-white py-4 px-4 rounded-lg hover:bg-[#FF5500] focus:outline-none transition-colors text-sm font-medium"
            >
              Send Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App