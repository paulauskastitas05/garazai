import { useEffect, useState, ChangeEvent, FormEvent } from 'react';

interface Garage {
  id: number;
  garage_name: string;
  garage_address: string;
  owner_name: string;
  image_path?: string;
}

interface FormData {
  garage_id: string;
  garage_name: string;
  garage_address: string;
}

export default function AdminDashboard() {
  const [garages, setGarages] = useState<Garage[]>([]);
  const [formData, setFormData] = useState<FormData>({
    garage_id: '',
    garage_name: '',
    garage_address: ''
  });

  useEffect(() => {
    // Fetch the list of garages from the API
    fetch('../../api/garazai')
      .then((res) => res.json())
      .then((data) => setGarages(data.garages));
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch('../../api/garazuAtnaujinimas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message);
      // Optionally refetch the garages to refresh the UI
    } else {
      alert('Error: ' + result.message);
    }
  };

  return (
    <div>
      <h1>Administratoriaus panelė</h1>
      <h2>Atnaujinti garažo informaciją</h2>

      <table>
        <thead>
          <tr>
            <th>Garažo pavadinimas</th>
            <th>Adresas</th>
            <th>Savininkas</th>
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {garages.map((garage) => (
            <tr key={garage.id}>
              <td>{garage.garage_name}</td>
              <td>{garage.garage_address}</td>
              <td>{garage.owner_name}</td>
              <td>
                <button onClick={() => setFormData({
                  garage_id: String(garage.id),
                  garage_name: garage.garage_name,
                  garage_address: garage.garage_address
                })}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {formData.garage_id && (
        <form onSubmit={handleSubmit}>
          <h3>Redaguoti garažą</h3>
          <label>
            Garažo pavadinimas:
            <input
              type="text"
              name="garage_name"
              value={formData.garage_name}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Garažo adresas:
            <input
              type="text"
              name="garage_address"
              value={formData.garage_address}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="submit">Atnaujinti</button>
        </form>
      )}
    </div>
  );
}
