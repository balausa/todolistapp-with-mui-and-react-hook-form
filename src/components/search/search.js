import { TextField } from "@mui/material";

const Search = (props) => {
    const { onChange, value } = props;

    return <TextField      
            label="Поиск"
            variant="standard"
            size="1000"   
                          
            type='search' 
            value={value} 
            onChange={onChange} 
            sx={{mb:'1.5rem', width: '25rem'}}/>;
};

export default Search;