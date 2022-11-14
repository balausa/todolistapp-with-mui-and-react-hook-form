import React from 'react';
import { useState } from 'react';
import { AppBar, IconButton, Toolbar, Typography,Badge } from '@mui/material';
import { ShoppingBasket } from '@mui/icons-material';
import Search from '../search/search';
import SearchIcon from '@mui/icons-material/Search';
function Header({ handleCart, orderLen, onChange }) {

const [search, setSearch]= useState('');

const onSearchChange=(e)=>{
      const term = e.target.value;
        setSearch(term);
        onChange(term);
  }

  return (
    <AppBar position="static">
        <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
                My TodoList
            </Typography>   
            <SearchIcon />     
            <Search
                    value={search}
                    onChange={onSearchChange}
                />                 
            <IconButton
              color="inherit"
              onClick={handleCart}
            >
              <Badge
              color="secondary"
              badgeContent={orderLen}
              >
                <ShoppingBasket/>
              </Badge>
            </IconButton>
        </Toolbar>
    </AppBar>
  )
}

export default Header

