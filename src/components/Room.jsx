import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowsFullscreen, BsPeople } from 'react-icons/bs';

const Room = ({ room }) => {
  const { id_kamar, nomor_kamar, tipe_kamar, harga, status_ketersediaan, jumlah_tamu, gambar } = room;

  return (
    <div className='bg-white shadow-2xl min-h-[600px] group'>
      <div className='overflow-hidden'>
        <img className='group-hover:scale-110 transition-all duration-300 w-full' src={`http://localhost:5000/uploads/${gambar}`} alt={tipe_kamar} />
      </div>
      <div className='bg-white shadow-lg max-w-[300px] mx-auto h-[60px] -translate-y-1/2 flex justify-center items-center uppercase font-tertiary tracking-[1px] font-semibold text-base'>
        <div className='flex justify-between w-[80%]'>
          <div className='flex items-center gap-x-2'>
            <div className='text-accent'>
              <BsArrowsFullscreen className='text-[15px]'/>
            </div>
            <div className='flex gap-x-1'>
              <div>Number</div>
              <div>{nomor_kamar}</div>
            </div>
          </div>
          <div className='flex items-center gap-x-2'>
            <div className='text-accent'>
              <BsPeople className='text-[18px]'/>
            </div>
            <div className='flex gap-x-1'>
              <div>Max People</div>
              <div>{jumlah_tamu}</div>
            </div>
          </div>
        </div>
      </div>
      <div className='text-center'>
        <Link to={`/rooms/${id_kamar}?number=${nomor_kamar}&name=${tipe_kamar}&price=${harga}&image=${gambar}`}>
          <h3 className='h3'>{tipe_kamar}</h3>
        </Link>

        <p className='max-w-[300px] mx-auto mb-3 lg:mb-6'>{status_ketersediaan}</p>
      </div>
      <Link to={`/rooms/${id_kamar}?number=${nomor_kamar}&name=${tipe_kamar}&price=${harga}&image=${gambar}`} className='btn btn-secondary btn-sm max-w-[240px] mx-auto'>
        Book now from ${harga}
      </Link>
    </div>
  );
};

export default Room;
