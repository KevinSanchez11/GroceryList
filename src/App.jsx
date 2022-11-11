import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

//SAVE BASKET DATA
const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [alert, setAlert] = useState({ show: false, msg: ''});

  //SUBMIT ITEMS
  const handleSubmit = (event) => {
    event.preventDefault();
    showAlert(true, 'item added');
    const newItem = { id: new Date().getTime().toString(), title: name };

    setList([...list, newItem]);
    setName('');
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  const showAlert = (show = false, msg = '') => {
    setAlert({ show, msg });
  };

  const clearList = () => {
    showAlert(true, 'empty list');
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, 'item removed');
    setList(list.filter((item) => item.id !== id));
  };
  
  

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert}/>}

        <h3>grocery list</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <button type='submit' className='submit-btn'>
           submit
          </button>
        </div>
      </form>
      <div className='grocery-container'> 
          <List items={list} removeItem={removeItem} />
          <button className='clear-btn' onClick={clearList}>
            delete all
          </button>
        </div>
  
    </section>
  );
}

export default App;