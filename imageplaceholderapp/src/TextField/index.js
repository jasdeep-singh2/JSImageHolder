import { TextField } from "@mui/material"

export default function JSTextField(props)
{
    const {label, size, width} = props;
    return(
        <TextField id="outlined-basic" label={label} variant="outlined" size={size} sx={{ m:4, width:width}}/>
    );
}
