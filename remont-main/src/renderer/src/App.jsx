
import { useEffect, useState } from 'react';
import electronLogo from './assets/electron.svg';

function App() {
  const [data, setData] = useState({
    products: [],
    productTypes: [],
    partners: [],
    partnerProducts: []
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await window.api.getAllData();
      console.log(result)
      setData(result);
    };

    fetchData();
  }, []);

  return (
    
    <div className='box'>
      
        {data.partners.map((p) => (
          <div key='key'>
            <div className='minibox'>
            <div>{p.partners_type} | {p.partners_name}</div>
            <div>{p.partners_name_director}</div>
            <div>+7 {p.partners_namber}</div>
            <div>Рейтинг:{p.partners_reiting}</div>
            </div>
          </div>
        ))}
      
    </div>
    
  );
}

export default App;