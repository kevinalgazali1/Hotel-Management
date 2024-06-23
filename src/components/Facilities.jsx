// Facilities.js
import React from "react";

const Facilities = ({ facilities }) => {
  return (
    <section className='py-24'>
    <div className="container mx-auto lg:px-0">
    <div className='text-center'>
      <div className='font-tertiary uppercase text-[15px] tracking-[6px]'>Hotel & Spa Adina</div>
      <h2 className='font-primary text-[45px] mb-4'>Facilities</h2>
      </div>
      <div className="facilities-list flex flex-col gap-4">
        {facilities.map((facility) => (
          <div key={facility.id_fasilitas} className="facility-item mb-12 bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={`http://localhost:5000/uploads/${facility.gambar_fasilitas}`} alt={facility.nama_fasilitas} className="w-full h-full object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{facility.nama_fasilitas}</h3>
              <p>{facility.deskripsi}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </section>
  );
};

export default Facilities;
