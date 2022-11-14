import { Close } from "@mui/icons-material";
import { IconButton, ListItem, Typography } from "@mui/material";

const BasketItem = ({removeFromOrder,id,label,important,done,created,quantity}) => {
    return (
            <ListItem sx={{ bgcolor:'#FAFAD2'}}>
            <Typography
            variant="body1"
            >
            Задача: {label} 
            <br/>
            Создано:{created.toLocaleString()}
            <br/>
            Важность: { important ? 'Важно' : 'Не важно'} 
            <br/>
            Статус: { done ? 'Сделано' : 'Не сделано'}
            </Typography>
            <IconButton
                onClick={() => removeFromOrder(id)}
            >
               <Close/>
            </IconButton>
        </ListItem>

    );
};

export default BasketItem;