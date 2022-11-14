import React from 'react';
import List from '@mui/material/List';
import TodoListItem from '../todo-list-item/todo-list-item';

const TodoList = (props) => {
  const { items, onDelete, onChecked, onImportant,onChangeLabel,label } = props;  

  return (
        <List dense sx={{ width: '100%', maxHeight: 1500,maxWidth: 700, bgcolor: 'background.paper'}}>
          {items.map((item) => {
          return (
              <TodoListItem
                            key={item.id}
                            { ...item }    
                            onChecked={() => onChecked(item.id)}              
                            onImportant={() => onImportant(item.id)}              
                            onDelete={() => onDelete(item.id)}    
                            onChangeLabel={onChangeLabel}                        
              >
              </TodoListItem>
            )})}
        </List>
      );
};


export default TodoList;
