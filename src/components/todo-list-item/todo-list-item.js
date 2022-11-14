import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { TextField,Divider,Button } from "@mui/material";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const TodoListItem = (props) => {
  const { id, important, done, created, label, onChangeLabel, onDelete, onChecked, onImportant } =props; 
  const isImportant = important ? '#DDA0DD' : 'none';
  const isDone= done ? 'line-through' : 'none';
  const labelId = `checkbox-list-secondary-label-${id}`;
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 420,
    height: 400,
    bgcolor: '#F5F5DC',
    border: '2px solid #F0E68C',
    boxShadow: 25,
    borderRadius: '20px',
    pt: 2,
    px: 4,
    pb: 3,
  };
  const [open, setOpen] = React.useState(false);
  const [changedLabel,setLabel] = React.useState(label);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onChange=(e)=>{
    setLabel(e.target.value);
    onChangeLabel(id,e.target.value);
  }
  return (   
         <><ListItem sx={{fontWeight:800, height: 50, bgcolor:isImportant , textDecoration: isDone} } 
            key={id}            
            secondaryAction={  
              <>   
              <IconButton 
                  aria-label="important"
                  size='large'
                  onClick={onChecked}>                 
                <DoneIcon color="primary"/>               
              </IconButton>                       
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
              onClick={handleOpen}>                       
              <ListItemText id={labelId} primary={label}>
              </ListItemText>              
            </ListItemButton>            
            </ListItem>            
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box sx={{ ...style }}>              
                  <Divider sx={{color:'#191970 ', fontSize: "20px"}} textAlign="center">
                  Информация о задаче:
                  </Divider>
                  <Typography sx={{color:'#4169E1'}} variant="h6" component="h6">
                      Дата создания: {created.toLocaleString()}
                  </Typography> 
                  <Typography sx={{color:'#000080'}} variant="h6" component="h6">            
                      Статус: { done ? 'Сделано' : 'Не сделано'}
                  </Typography> 
                  <Typography sx={{color:'#FF0000'}} variant="h6" component="h6">      
                      Важность: { important ? 'Важно' : 'Не важно'}  
                  </Typography> 
                  <br/>
                  <Typography sx={{color:'#0000CD'}} variant="h5" component="h2">
                      Задача:                
                  </Typography>
                  <TextField      
                  value={changedLabel}
                  onChange={onChange}
                  variant="outlined"                    
                  type='text' 
                  sx={{mb:'2rem', width: '22rem'}}
                  />           
                  <Button 
                  variant="outlined"
                  onClick={handleClose}>
                  Закрыть
                  </Button>
              </Box>            
            </Modal>
            </>
          );
  };

export default TodoListItem;
