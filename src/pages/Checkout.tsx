"use client";

import { useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size: string;
}

interface CheckoutProps {
  cart: CartItem[];
}

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  country: string;
}

export default function Checkout({ cart }: CheckoutProps): ReactNode {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    country: "Nigeria",
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    alert("Order placed successfully! (This is a demo)");
    navigate("/");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-12">CHECKOUT</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Checkout Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <input
                type="email"
                name="email"
                placeholder="Email or mobile phone number"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border-2 border-blue-500 px-4 py-3 text-sm"
              />
              <label className="flex items-center gap-2 mt-3">
                <input type="checkbox" />
                <span className="text-sm">Email me with news and offers</span>
              </label>
            </div>

            {/* Delivery */}
            <div>
              <h3 className="text-lg font-bold mb-4">Delivery</h3>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 text-sm mb-4"
              >
                <option>Nigeria</option>
                <option>Ghana</option>
                <option>Kenya</option>
              </select>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name (optional)"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-3 text-sm"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 px-4 py-3 text-sm"
                />
              </div>

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-3 text-sm mb-4"
              />

              <input
                type="text"
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full border border-gray-300 px-4 py-3 text-sm mb-4"
              />

              <div className="grid grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 px-4 py-3 text-sm"
                />
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-3 text-sm"
                >
                  <option>State</option>
                  <option>Lagos</option>
                  <option>Abuja</option>
                </select>
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-3 text-sm"
                />
              </div>

              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-3 text-sm"
              />

              <label className="flex items-center gap-2 mt-4">
                <input type="checkbox" />
                <span className="text-sm">
                  Save this information for next time
                </span>
              </label>
            </div>

            {/* Shipping */}
            <div>
              <h3 className="text-lg font-bold mb-4">Shipping method</h3>
              <label className="flex items-center gap-3 border border-gray-300 p-4 cursor-pointer">
                <input type="radio" name="shipping" defaultChecked />
                <span className="text-sm">
                  Standard (5-7 business days) - Free
                </span>
              </label>
            </div>

            {/* Payment */}
            <div>
              <h3 className="text-lg font-bold mb-4">Payment</h3>
              <label className="flex items-center gap-3 border border-gray-300 p-4 cursor-pointer mb-3">
                <input type="radio" name="payment" defaultChecked />
                <span className="text-sm">Card</span>
              </label>

              <input
                type="text"
                placeholder="Card number"
                className="w-full border border-gray-300 px-4 py-3 text-sm mb-4"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Expiration date (MM / YY)"
                  className="border border-gray-300 px-4 py-3 text-sm"
                />
                <input
                  type="text"
                  placeholder="Security code"
                  className="border border-gray-300 px-4 py-3 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 font-medium hover:bg-gray-800"
            >
              Place order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-gray-50 p-6 rounded">
            <h3 className="text-lg font-bold mb-6">Order Summary</h3>

            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex justify-between text-sm"
                >
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>
                    ₦{(item.price * item.quantity).toLocaleString()}.00
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₦{subtotal.toLocaleString()}.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
