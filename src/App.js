import React  from 'react';
import Header from './components/header/header';
import Basket from './components/basket/basket';
import Snack from './components/snack/snack'
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { TextField } from "@mui/material";
import { Alert, AlertTitle } from '@mui/material';
import { items } from './components/data/data';
import { Container } from '@mui/material';
import TodoList from './components/todo-list/todo-list';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
const App = () => {

  const [isCartOpen, setCartOpen] = useState(false);
  const [order, setOrder] = useState([]);
  const [isSnackOpen, setSnackOpen] = useState(false);
  const [todos, setTodos] = useState(items);
  const [visibleTodos, setVisibleTodos] = useState('');
  
  const {
        register, 
        formState:{
        errors, isValid
        },
        handleSubmit,
        reset
        } = useForm({
        mode: "onBlur"
        }
        );
    
    const onSubmit=(data)=>{
        if(data.label.trim() ==='') return;
        const newItem= createItem(data);
        setTodos([...todos,newItem])
        reset();        
        setSnackOpen(true);
    }
    
    const createItem=(data)=> {
        return {
          id: todos.length+1,
          label: data.label,
          important: false,
          done: false,
          created: new Date()
        };
      }

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
    
    const onChangeLabel=(id,changedLabel)=>{
        const idx = todos.findIndex((todo) => todo.id === id);
        const currentTodo = todos.filter((item)=>item.id===id);
        currentTodo[0].label = changedLabel;
        const changedTodos = [
            ...todos.slice(0, idx),
            ...currentTodo,
            ...todos.slice(idx + 1)
          ];
          setTodos(changedTodos);
    }

    const handleChange = (todos,visibleTodos) => {
        if (visibleTodos.length === 0) {
         return todos;
        }

        return todos.filter((item) =>{
              return item.label.toLowerCase().includes(visibleTodos.toLowerCase());
        });
    };  
    
    const onChange=(term)=>{
        setVisibleTodos(term);
    }
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
  
    const visibleItems= handleChange(todos,visibleTodos);

    return (
            <>
            <Header 
                handleCart={()=>setCartOpen(true)}
                orderLen={order.length}
                onChange={onChange}
            />
            <Container
                sx={{mt: '1rem'}}
            >
            <form
             onSubmit={handleSubmit(onSubmit)}>
            <TextField      
            label="New entry"
            variant="standard"                    
            type='search' 
            sx={{mb:'1.5rem', width: '25rem'}}
            {...register('label',
            {required:"Невозможно добавить пустой запись(Пожалуйста,заполните поле)",
            minLength: {
                value: 2,
                message: 'Минимум 3 символа'
            },
             maxLength:{
                value: 32,
                message:'Запись должна содержать максимум 32 символа'
             }
             })}/>
            <IconButton sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined" disabled={!isValid}>
            <CheckCircleIcon color="primary" fontSize="large"/>                 
            </IconButton>             
            </form>
            {errors?.label && <>
                      <Alert severity="error">
                      <AlertTitle>{errors?.label.message || "Error!"}</AlertTitle>         
                      </Alert>   
                      </>}    
            <TodoList
                        items={ visibleItems }  
                        onChecked={onChecked}
                        onImportant={onImportant}
                        onDelete={onDelete} 
                        onChangeLabel={onChangeLabel}
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