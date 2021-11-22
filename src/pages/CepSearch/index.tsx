import './styles.css';

import ResultCard from 'components/ResultCard';
import { useState } from 'react';
import axios from 'axios';

type FormDate ={
  cep: string;
}

type Address = {
  logradouro: string;
  localidade: string; 
}

const CepSearch = () => {

  const [formData, setFormData] = useState<FormDate>({
    cep: ''
  });

  const [addres, setAddress] = useState<Address>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
   const name = event.target.name;
   const value = event.target.value;

   // Peega os dados de formulario e atualiza os dados..
   setFormData( { ...formData, [name]: value });
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    
    axios.get(`https://viacep.com.br/ws/${formData.cep}/json/`)
      .then((response) =>{
        setAddress(response.data);
        console.log(response.data);
      })
      .catch((error) => {
          setAddress(undefined);
          console.log(error);
      });
  }
  return (
    <div className="cep-search-container">
      <h1 className="text-primary">Search CEP</h1>
      <div className="container search-container">
        <form onSubmit ={handleSubmit}>
          <div className="form-container">
            <input
              type="text"
              name="cep"
              value={formData.cep}
              className="search-input"
              placeholder="CEP (only numbers)"
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary search-button">
              Search
            </button>
          </div>
        </form>

        { addres &&
        <>
        <ResultCard title="Logradouro" description={addres.logradouro} />
        <ResultCard title="Localidade" description={addres.localidade} />
        </>}

      </div>
    </div>
  );
};

export default CepSearch;
