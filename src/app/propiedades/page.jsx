"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

async function loadProperties() {
  try {
    const response = await axios.get('/api/properties');
    return response.data;
  } catch (error) {
    console.error('Error loading properties:', error);
    return [];
  }
}

function PropertiesList() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const propertiesData = await loadProperties();
      setProperties(propertiesData);
    };
    fetchProperties();
  }, []);

  const deleteProperty = async (propertyId) => {
    try {
      if (confirm('¿Estás seguro de que quieres eliminar esta propiedad?')) {
        const res = await axios.delete(`/api/properties/${propertyId}`);
        if (res.status === 204) {
          // Actualiza el estado de las propiedades después de una eliminación exitosa
          setProperties((prevProperties) =>
            prevProperties.filter((property) => property.id !== propertyId)
          );
        }
      }
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-extrabold dark:text-white m-8">
        Propiedades {' '}
        <a href="/properties/new" className="bg-blue-500
         hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 
         rounded mt-5">
          Nuevo
        </a>
      </h2>
      <div className='shadow-md rounded-md px-8 pt-6 pb-8 mb-4'>
        <table className='min-w-full text-left text-sm font-light'>
          <thead>
            <tr className='border-b font-medium bg-gray-300'>
              <th>Options</th>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="whitespace-nowrap px-6 py-4">
                  <button
                    className="text-white bg-red-500 hover:bg-red-700 py-2 px-3 rounded"
                    onClick={() => deleteProperty(property.id)}
                  >
                    Delete
                  </button>
                </td>
                <td className="whitespace-nowrap px-6 py-4">{property.id}</td>
                <td className="whitespace-nowrap px-6 py-4">{property.name}</td>
                <td className="whitespace-nowrap px-6 py-4">{property.address}</td>
                <td className="whitespace-nowrap px-6 py-4">{property.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PropertiesList;