import React  from 'react';
import Header from './components/header/header';
import Basket from './components/basket/basket';
import Snack from './components/snack/snack'
import { items } from './components/data/data';
import { Container } from '@mui/material';
import TodoList from './components/todo-list/todo-list';
import { useState } from 'react';
const App = () => {

  const [isCartOpen, setCartOpen] = useState(false);
  const [order, setOrder] = useState([]);
  const [search, setSearch] = useState('');
  const [isSnackOpen, setSnackOpen] = useState(false);
  const [todos, setTodos] = useState(items);  
  
    const toggleProperty = (arr, id, propName) => {
        const idx = arr.findIndex((item) => item.id === id);
        const oldItem = arr[idx];
        const value = !oldItem[propName];  
        const item = { ...arr[idx], [propName]: value } ;
        return [
          ...arr.slice(0, idx),
          item,
          ...arr.slice(idx + 1)
        ];
    };

    const onChecked = (id) => {
        const doneTodo = toggleProperty(todos, id, 'done');
        setTodos(doneTodo);
    };

    const onImportant = (id) => {        
        const importantTodo = toggleProperty(todos, id, 'important');
        setTodos(importantTodo);
    };
  
    
    const onDelete = (id) => {
        const idx = todos.findIndex((todo) => todo.id === id);
        const remainingTodos = [
            ...todos.slice(0, idx),
            ...todos.slice(idx + 1)
          ];
          setTodos(remainingTodos);
    };

    const handleChange = (e) => {
        if (!e.target.value) {
          setTodos(items);
          setSearch('');
          return;
        }

        setSearch(e.target.value);
        setTodos(todos.filter((item) =>
              item.label.toLowerCase().includes(e.target.value.toLowerCase())
        ));
    };

    const addToOrder = (goodsItem) => {
        let quantity = 1;
        const indexInOrder = order.findIndex(
            (item) => item.id === goodsItem.id
        );

        if (indexInOrder > -1) {
            quantity = order[indexInOrder].quantity + 1;

            setOrder(order.map((item) => {
                    if (item.id !== goodsItem.id) return item;

                    return {
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity,
                    };
                }),
            );
        } else {
            setOrder([
                    ...order,
                    {
                        id: goodsItem.id,
                        name: goodsItem.name,
                        price: goodsItem.price,
                        quantity,
                    },
                ],
            );
        }
        setSnackOpen(true); 
    };

    const removeFromOrder = (goodsItem) => {   
        setOrder(order.filter((item) => item.id !== goodsItem));
    };      
  
    return (
            <>
            <Header 
                handleCart={()=>setCartOpen(true)}
                orderLen={order.length}
                value={search}
                onChange={handleChange}
            />
            <Container
                sx={{mt: '1rem'}}
            >
          
            <TodoList
                        items={ todos }  
                        onChecked={onChecked}
                        onImportant={onImportant}
                        onDelete={onDelete} 
            />              
            </Container>
            <Basket 
              order={order}
              removeFromOrder={removeFromOrder}
              cartOpen={isCartOpen}
              closeCart={()=>setCartOpen()}
            />
            <Snack 
            isOpen={isSnackOpen}
            handleClose={()=> setSnackOpen(false)}/>
            </>
          );
  };

export default App;