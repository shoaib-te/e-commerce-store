import React from 'react'

function Newslitterbox() {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., send email to server)
        alert('Thank you for subscribing!');
        e.target.reset(); // Reset the form after submission
    };
  return (
    <div className='  '>
        <div className='text-center mb-5'>
            <h2 className='text-2xl font-medium mb-2'>Subscribe to our Newsletter</h2>
            <p className='text-gray-600'>Get the latest updates on new products and upcoming sales</p>
        </div>
        <div className='flex justify-center'>
            <form className='flex flex-col sm:flex-row gap-4' onSubmit={handleSubmit}>
            <input type="email" placeholder='Enter your email' className='px-4 py-2 w-64 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400' />
            <button className='px-4 py-2 bg-gray-800 text-white rounded-r-md hover:bg-gray-700 transition-colors duration-300'>Subscribe</button>
            </form>
        </div>
      
    </div>
  )
}

export default Newslitterbox
