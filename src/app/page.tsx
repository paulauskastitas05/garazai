'use client'

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import "../../api/loginAPI"
import "../../api/registerAPI"

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

    const response = await fetch('/api/updateGarage', {
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
      <header>
        <title>Garažu nuomos sistema</title>      
        <div className="container mx-auto flex items-center border-b-2 px-6 py-2 h-24">
          <div className="grow">
          <h1>Garažų nuomos sistema</h1>
          </div>
          <div className="grow">
            <div className="flex items-center jistify-center gap-2 md:gap-8">
                Home
                Home
                Home
                Home
            </div>
          </div>
          <div className="grow">
              <link href="../../api/loginAPI">Prisijungti</link>
              Registracija
          </div>
        </div>
      </header>
    </div>
  );
}
