'use client';

import { useEffect, useState } from 'react';
import Select from 'react-select';
import Header from '../../components/Header';
import Footer from '../../components/Footer'; 
import styles from './AdminDashboard.module.css';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [garages, setGarages] = useState([]);
  const [message, setMessage] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingGarageId, setEditingGarageId] = useState(null);

  const availableTools = [
    { value: 'Grąžtas', label: 'Grąžtas' },
    { value: 'Plaktukas', label: 'Plaktukas' },
    { value: 'Pjūklas', label: 'Pjūklas' },
    { value: 'Veržliaraktis', label: 'Veržliaraktis' },
    { value: 'Oro kompresorius', label: 'Oro kompresorius' },
  ];

  const lithuanianCities = [
    { value: 'Vilnius', label: 'Vilnius' },
    { value: 'Kaunas', label: 'Kaunas' },
    { value: 'Klaipėda', label: 'Klaipėda' },
    { value: 'Šiauliai', label: 'Šiauliai' },
    { value: 'Panevėžys', label: 'Panevėžys' },
    { value: 'Alytus', label: 'Alytus' },
    { value: 'Marijampolė', label: 'Marijampolė' },
    { value: 'Mažeikiai', label: 'Mažeikiai' },
    { value: 'Jonava', label: 'Jonava' },
    { value: 'Utena', label: 'Utena' },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        if (response.ok) {
          setUsers(data);
        } else {
          setMessage('Nepavyko užkrauti vartotojų.');
        }
      } catch (error) {
        setMessage('Nepavyko užkrauti vartotojų.');
      }
    };

    const fetchGarages = async () => {
      try {
        const response = await fetch('/api/garages');
        const data = await response.json();
        if (response.ok) {
          setGarages(data);
        } else {
          setMessage('Nepavyko užkrauti garažų.');
        }
      } catch (error) {
        setMessage('Nepavyko užkrauti garažų.');
      }
    };

    fetchUsers();
    fetchGarages();
  }, []);

  const handleSaveUser = async (id) => {
    const user = users.find((user) => user.id === id);
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: user.name, role: user.role }),
      });
      if (response.ok) {
        setEditingUserId(null);
      } else {
        setMessage('Nepavyko atnaujinti vartotojo.');
      }
    } catch (error) {
      setMessage('Nepavyko atnaujinti vartotojo.');
    }
  };

  const handleSaveGarage = async (id) => {
    const garage = garages.find((garage) => garage.id === id);
    try {
      const response = await fetch(`/api/garages/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: garage.name,
          address: garage.address,
          city: garage.city,
          tools: garage.tools,  // Ensure tools are an array
        }),
      });

      if (response.ok) {
        setEditingGarageId(null);
        setMessage('Garage updated successfully');
      } else {
        setMessage('Failed to update garage');
      }
    } catch (error) {
      setMessage('Failed to update garage');
      console.error('Error updating garage:', error);
    }
  };

  return (
    <div>
      <Header />

      <div className={styles.adminContainer}>
        <h1 className={styles.headingPrimary}>Admino puslapis</h1>

        {message && <p className={styles.errorMessage}>{message}</p>}

        <h2 className={styles.headingSecondary}>Vartotojai</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Vardas</th>
              <th>Email</th>
              <th>Rolė</th>
              <th>Veiksmai</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5">Nėra vartotojų</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {editingUserId === user.id ? (
                      <input
                        type="text"
                        value={user.name}
                        onChange={(e) => setUsers(
                          users.map(u => u.id === user.id ? { ...u, name: e.target.value } : u)
                        )}
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td>{user.email}</td>
                  <td>
                    {editingUserId === user.id ? (
                      <select
                        value={user.role}
                        onChange={(e) =>
                          setUsers(users.map((u) => (u.id === user.id ? { ...u, role: e.target.value } : u)))
                        }
                      >
                        <option value="admin">admin</option>
                        <option value="renter">renter</option>
                        <option value="user">user</option>
                      </select>
                    ) : (
                      user.role
                    )}
                  </td>
                  <td>
                    {editingUserId === user.id ? (
                      <button onClick={() => handleSaveUser(user.id)}>Išsaugoti</button>
                    ) : (
                      <button onClick={() => setEditingUserId(user.id)}>Redaguoti</button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <h2 className={styles.headingSecondary}>Garažai</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Pavadinimas</th>
              <th>Adresas</th>
              <th>Miestas</th>
              <th>Įrankiai</th>
              <th>Nuotraukos</th>
              <th>Veiksmai</th>
            </tr>
          </thead>
          <tbody>
            {garages.length === 0 ? (
              <tr>
                <td colSpan="7">Nėra garažų</td>
              </tr>
            ) : (
              garages.map((garage) => {
                const images = JSON.parse(garage.images || '[]');
                const garageTools = garage.tools ? JSON.parse(garage.tools) : []; // Parsing tools array

                return (
                  <tr key={garage.id}>
                    <td>{garage.id}</td>
                    <td>
                      {editingGarageId === garage.id ? (
                        <input
                          type="text"
                          value={garage.name}
                          onChange={(e) => setGarages(
                            garages.map(g => g.id === garage.id ? { ...g, name: e.target.value } : g)
                          )}
                        />
                      ) : (
                        garage.name
                      )}
                    </td>
                    <td>
                      {editingGarageId === garage.id ? (
                        <input
                          type="text"
                          value={garage.address}
                          onChange={(e) => setGarages(
                            garages.map(g => g.id === garage.id ? { ...g, address: e.target.value } : g)
                          )}
                        />
                      ) : (
                        garage.address
                      )}
                    </td>
                    <td>
                      {editingGarageId === garage.id ? (
                        <Select
                          value={{ value: garage.city, label: garage.city }}
                          onChange={(option) =>
                            setGarages(garages.map(g => g.id === garage.id ? { ...g, city: option.value } : g))
                          }
                          options={lithuanianCities}
                          placeholder="Pasirinkite miestą"
                        />
                      ) : (
                        garage.city
                      )}
                    </td>
                    <td>
                      {editingGarageId === garage.id ? (
                        <Select
                          isMulti
                          value={garageTools.map(tool => ({ value: tool, label: tool }))}
                          onChange={(selectedOptions) =>
                            setGarages(
                              garages.map(g =>
                                g.id === garage.id
                                  ? { ...g, tools: selectedOptions.map(option => option.value) }
                                  : g
                              )
                            )
                          }
                          options={availableTools}
                          placeholder="Pasirinkite įrankius"
                        />
                      ) : (
                        garageTools.length > 0 ? garageTools.join(', ') : 'Įrankių nėra'
                      )}
                    </td>
                    <td>
                      <div className={styles.garageImages}>
                        {images.slice(0, 3).map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`Garage ${index + 1}`}
                            className={styles.garageImage}
                          />
                        ))}
                      </div>
                    </td>
                    <td>
                      {editingGarageId === garage.id ? (
                        <button onClick={() => handleSaveGarage(garage.id)}>Išsaugoti</button>
                      ) : (
                        <button onClick={() => setEditingGarageId(garage.id)}>Redaguoti</button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  );
}
