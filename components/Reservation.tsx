'use client';

import { useState } from 'react';

export default function Reservation() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    person: '1-person',
    date: '',
    time: '08:00am',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    // Form submission logic can be added here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Enhanced Form Section */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 border border-neutral-200 hover:shadow-2xl transition-shadow duration-300">
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full mb-4 sm:mb-6">
                <ion-icon name="calendar" className="text-primary text-3xl sm:text-4xl"></ion-icon>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black text-neutral-900 mb-3 sm:mb-4">
                Book A Table
              </h2>
              <p className="text-sm sm:text-base text-neutral-600">
                Call us at <a href="tel:+14072032499" className="text-primary font-bold hover:text-primary-dark transition-colors">+1 (407) 203-2499</a> or fill out the form below
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative group">
                  <ion-icon name="person" className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-xl group-focus-within:text-primary transition-colors pointer-events-none"></ion-icon>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name" 
                    required
                    autoComplete="name"
                    className="w-full pl-12 pr-4 py-3.5 text-sm sm:text-base border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-neutral-50 focus:bg-white" 
                  />
                </div>
                <div className="relative group">
                  <ion-icon name="call" className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-xl group-focus-within:text-primary transition-colors pointer-events-none"></ion-icon>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number" 
                    required
                    autoComplete="tel"
                    className="w-full pl-12 pr-4 py-3.5 text-sm sm:text-base border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-neutral-50 focus:bg-white" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="relative group">
                  <ion-icon name="people" className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-xl group-focus-within:text-primary transition-colors pointer-events-none z-10"></ion-icon>
                  <select 
                    name="person" 
                    value={formData.person}
                    onChange={handleChange}
                    className="w-full pl-12 pr-10 py-3.5 text-sm sm:text-base border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all appearance-none bg-neutral-50 focus:bg-white cursor-pointer"
                  >
                  <option value="1-person">1 Person</option>
                    <option value="2-person">2 People</option>
                    <option value="3-person">3 People</option>
                    <option value="4-person">4 People</option>
                    <option value="5-person">5 People</option>
                    <option value="6-person">6 People</option>
                    <option value="7-person">7+ People</option>
                  </select>
                  <ion-icon name="chevron-down" className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 text-lg pointer-events-none"></ion-icon>
                </div>

                <div className="relative group">
                  <ion-icon name="calendar" className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-xl group-focus-within:text-primary transition-colors pointer-events-none"></ion-icon>
                  <input 
                    type="date" 
                    name="date" 
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3.5 text-sm sm:text-base border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-neutral-50 focus:bg-white cursor-pointer" 
                  />
                </div>

                <div className="relative group sm:col-span-1">
                  <ion-icon name="time" className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-xl group-focus-within:text-primary transition-colors pointer-events-none z-10"></ion-icon>
                  <select 
                    name="time" 
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full pl-12 pr-10 py-3.5 text-sm sm:text-base border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all appearance-none bg-neutral-50 focus:bg-white cursor-pointer"
                  >
                    <option value="08:00am">08:00 AM</option>
                    <option value="09:00am">09:00 AM</option>
                    <option value="10:00am">10:00 AM</option>
                    <option value="11:00am">11:00 AM</option>
                    <option value="12:00pm">12:00 PM</option>
                    <option value="01:00pm">01:00 PM</option>
                    <option value="02:00pm">02:00 PM</option>
                    <option value="03:00pm">03:00 PM</option>
                    <option value="04:00pm">04:00 PM</option>
                    <option value="05:00pm">05:00 PM</option>
                    <option value="06:00pm">06:00 PM</option>
                    <option value="07:00pm">07:00 PM</option>
                    <option value="08:00pm">08:00 PM</option>
                    <option value="09:00pm">09:00 PM</option>
                    <option value="10:00pm">10:00 PM</option>
                </select>
                  <ion-icon name="chevron-down" className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 text-lg pointer-events-none"></ion-icon>
                </div>
              </div>

              <div className="relative group">
                <ion-icon name="chatbubble-ellipses" className="absolute left-4 top-4 text-neutral-400 text-xl group-focus-within:text-primary transition-colors pointer-events-none"></ion-icon>
                <textarea 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Special requests or message (optional)" 
                  autoComplete="off" 
                  rows={4}
                  className="w-full pl-12 pr-4 py-3.5 text-sm sm:text-base border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-y bg-neutral-50 focus:bg-white min-h-[120px]" 
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full px-6 sm:px-8 py-4 sm:py-5 bg-primary text-white font-bold text-base sm:text-lg rounded-xl shadow-lg hover:bg-primary-dark hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Book A Table</span>
                <ion-icon name="arrow-forward" className="text-xl"></ion-icon>
              </button>
            </form>
          </div>

          {/* Enhanced Contact Info Section */}
          <div className="space-y-6 sm:space-y-8">
            {/* Contact Cards */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 border border-neutral-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex flex-col items-center gap-4">
                <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                  <ion-icon name="call" className="text-primary text-2xl sm:text-3xl"></ion-icon>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-900">Call Us</h3>
                <a 
                  href="tel:+14072032499" 
                  className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-secondary text-white font-semibold text-sm sm:text-base rounded-md shadow-lg hover:bg-secondary-dark hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 text-center"
                >
                  Call us – +1 (407) 203-2499
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 border border-neutral-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                  <ion-icon name="location" className="text-primary text-2xl sm:text-3xl"></ion-icon>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2">Location</h3>
                  <address className="text-base sm:text-lg text-neutral-700 leading-relaxed not-italic">
                    Restaurant St, Delicious City,<br />
              London 9578, UK
            </address>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-gradient-to-br from-primary/5 via-white to-primary/5 rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 border-2 border-primary/20">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-xl mb-4">
                  <ion-icon name="time" className="text-primary text-2xl sm:text-3xl"></ion-icon>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-neutral-900 mb-4">Opening Hours</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-neutral-200">
                  <div className="flex items-center gap-3">
                    <ion-icon name="sunny" className="text-primary text-xl"></ion-icon>
                    <span className="font-bold text-neutral-900">Lunch</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-neutral-800">11:00 AM - 2:30 PM</p>
                    <p className="text-xs text-neutral-600">Monday to Friday</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-neutral-200">
                  <div className="flex items-center gap-3">
                    <ion-icon name="moon" className="text-primary text-xl"></ion-icon>
                    <span className="font-bold text-neutral-900">Dinner</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-neutral-800">05:00 PM - 10:00 PM</p>
                    <p className="text-xs text-neutral-600">Monday to Friday</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 border border-neutral-200">
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-4 text-center">Follow Us</h3>
              <div className="flex items-center justify-center gap-4">
                <a href="#" className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95">
                  <ion-icon name="logo-facebook" className="text-primary hover:text-white text-xl sm:text-2xl transition-colors"></ion-icon>
                </a>
                <a href="#" className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95">
                  <ion-icon name="logo-instagram" className="text-primary hover:text-white text-xl sm:text-2xl transition-colors"></ion-icon>
                </a>
                <a href="#" className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95">
                  <ion-icon name="logo-twitter" className="text-primary hover:text-white text-xl sm:text-2xl transition-colors"></ion-icon>
                </a>
                <a href="#" className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95">
                  <ion-icon name="logo-youtube" className="text-primary hover:text-white text-xl sm:text-2xl transition-colors"></ion-icon>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

