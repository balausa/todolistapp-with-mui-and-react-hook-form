import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const TodoListItem = (props) => {
 
  const { id, important,done, label, onDelete, onChecked, onImportant } =props; 
  const isImportant = important ? '#DDA0DD' : 'none';
  const isDone= done ? 'line-through' : 'none';
  const labelId = `checkbox-list-secondary-label-${id}`;
  
  return (   
         <ListItem sx={{fontWeight:800, height: 50, bgcolor:isImportant , textDecoration: isDone} } 
            key={id}            
            secondaryAction={  
              <>        
              <Checkbox
               edge="start"
               onClick={onChecked}
              inputProps={{ 'aria-labelledby': labelId }}
             />           
              <IconButton 
                  aria-label="important"
                  size='large'
                  onClick={onImportant}>                 
                <PriorityHighIcon color="secondary"/>               
              </IconButton>
              <IconButton 
                  aria-label="delete"
                  size='large'
                  onClick={onDelete}>                 
                <DeleteIcon color="error"/>               
              </IconButton>
               
              </>
            }
            disablePadding
          >
            <ListItemButton
              onClick={()=>console.log('аааа')}>     
                      
              <ListItemText id={labelId} primary={label}>
              </ListItemText>
              
            </ListItemButton>
            
            </ListItem>
          );
  };

export default TodoListItem;
