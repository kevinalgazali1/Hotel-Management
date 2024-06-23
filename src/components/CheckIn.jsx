import React, { useState } from 'react';
// datepicker
import DatePicker from 'react-datepicker';
// datepicker css
import 'react-datepicker/dist/react-datepicker.css';
import '../datepicker.css';
// icons
import { BsCalendar } from 'react-icons/bs';
// date-fns
import { format } from 'date-fns';

const CheckIn = ({ onChange }) => {
  const [startDate, setStartDate] = useState(null);

  const handleDateChange = (date) => {
    setStartDate(date);
    const formattedDate = format(date, 'yyyy-MM-dd');
    console.log("Tanggal Check-In yang dipilih:", formattedDate); // Tambahkan log untuk debugging
    onChange({ target: { value: formattedDate } }); // Panggil onChange dengan format yang sesuai
  };

  return (
    <div className='relative flex items-center justify-end h-full'>
      {/* icon */}
      <div className='absolute z-10 pr-8'>
        <div>
          <BsCalendar className='text-accent text-base' />
        </div>
      </div>
      <DatePicker
        className='w-full h-full'
        selected={startDate}
        placeholderText='Check In'
        onChange={handleDateChange}
      />
    </div>
  );
};

export default CheckIn;
