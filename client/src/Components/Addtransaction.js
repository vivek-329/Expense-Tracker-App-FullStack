import React ,{useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';

export const  Addtransaction = () =>{
    const [text, setText] = useState('');
    const [amount, setAmount, ] = useState(0);
    const [category, setCategory] = useState('');

    
    const { addTransaction } = useContext(GlobalContext);

    const onSubmit = e => {
        e.preventDefault();
    
        const newTransaction = {
          id: Math.floor(Math.random() * 100000000),
          text,
          amount: +amount,
          category
      
        };
        
        addTransaction(newTransaction);
      };
  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit} >
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)}  placeholder="Enter text..." />
        </div>
         <div className="form-control">
          <label htmlFor="amount"
            >Amount <br />
            (negative - expense, positive - income)</label
          >
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}  placeholder="Enter amount..." />
        </div>
        <div className="form-control">
                    <label htmlFor="category">Category</label>
                    <select className='category' value={category} onChange={(e) => setCategory(e.target.value)}>
                       <option value="" disabled>Select category</option>
                        <option value="Food">Food</option>
                       <option value="Transport">Transport</option>
                       <option value="Entertainment">Entertainment</option>
                       <option value="Salary">Salary</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                
        
        <button className="btn">Add transaction</button>
        
      </form>   
    </>
)
 
}