import { useState } from 'react';
import axios from 'axios';

const PropertiesForm = () => {
  const [property, setProperty] = useState({
    name: '',
    address: '',
    state: 'Libre',

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({
      ...property,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/properties', property);
    if (res.status === 200) {
      location.href = "/properties"; 
    } else {
      alert("Error en el registro");
    }
  };

  return (
    <div className='m-8'>
      <h2 className="text-2xl font-extrabold text-gray-400 hover:text-gray-800">Properties</h2>
      <form onSubmit={handleSubmit} className='px-8 pt-6 pb-8 mb-4 rounded-md shadow-md bg-gray-50'>
        <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="name">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={property.name}
          onChange={handleChange}
          className='bg-green-100 border border-green-300 text-gray-900 text-xs rounded-lg block w-full p-2.5'
          placeholder="Input name"
        />

        <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="address">
          Address
        </label>
        <input
          type="text"
          name="address"
          value={property.address}
          onChange={handleChange}
          className='bg-green-100 border border-green-300 text-gray-900 text-xs rounded-lg block w-full p-2.5'
          placeholder="Input address"
        />

        <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="state">
          State
        </label>
        <select
          name="state"
          value={property.state}
          onChange={handleChange}
          className='bg-green-100 border border-green-300 text-gray-900 text-xs rounded-lg block w-full p-2.5'
        >
          <option value="Libre">Libre</option>
          <option value="Ocupada">Ocupada</option>
          <option value="Mantenimiento">Mantenimiento</option>
        </select>

        {/* Add more input fields for other property details as needed */}

        <button className='bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded mt-5'>
          Guardar
        </button>
      </form>
    </div>
  );
};

export default PropertiesForm;