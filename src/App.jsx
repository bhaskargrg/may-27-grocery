import React, { useEffect, useState } from 'react'
import List from './List'
import Alert from './Alert'


function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({show:false,msg:'',type:''});
  const handleSubmit=(e)=>{
     e.preventDefault();
     if (!name) {
       // Show alert if the name is empty
       showAlert(true,"danger","Please enter a value");
       return;
     }
     else if(name && isEditing){
          setList(list.map((e)=>{
            if(e.id==editID){
              return {...e,name:name}
            }
            return e;
          }))
          setName("");
          setEditID(null);
          setIsEditing(false);
          showAlert(true, "success", "value changed");
     }
     // Add item to list with unique id
     else{
       setList([...list, { id: new Date().getTime().toString(), name }]);
       setName("");
       // Reset alert
       showAlert( true, "success","Items added to the list" );
     }
  }
    const showAlert=(show=false,type='',msg='')=>{
        setAlert({show,type,msg});
    }
    const clearList=()=>{
      setList([]);
      showAlert(true,'danger','Items deleted');
    }
    const removeItem=(id)=>{
        showAlert(true,'danger','Item deleted');
        setList(list.filter((item)=>item.id!==id))
    }
    const editItem=(id)=>{
        const specificItem=list.find((e)=>e.id===id);
        setIsEditing(true);
        setEditID(id);
        setName(specificItem.name);
    }
       useEffect(() => {
         // Retrieve list from local storage on component mount
         const storedList = JSON.parse(localStorage.getItem("groceryList"));
         if (storedList) {
           setList(storedList);
         }
       }, []);
  return (
    <section className="section-center">
      <form action="" className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            name=""
            id=""
            className="grocery"
            placeholder="e.g eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List list={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            Clear item
          </button>
        </div>
      )}
    </section>
  );
}

export default App