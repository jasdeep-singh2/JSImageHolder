import { Container } from "@mui/material";
import { TextField } from "@mui/material"
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

export default function JSContainer() {

    const UnsplashAPI = `https://api.unsplash.com/search/photos?client_id=KQayXZo-vnlbHXMtIG-MJZOwhbtT2Vb7NR0ezqeDP34`;

    const [inputValue, setInputValue] = useState('random');
    const [results, setResult]= useState([])
    const [activeModalIndex, setActiveModalIndex] = useState(null);


    const handleOpen = (index) => {
        setActiveModalIndex(index)
    }
    const handleClose = () => {
        setActiveModalIndex(null);
      };

    const imgStyle = {
        padding: "10px",
        width:"200px",
        height: "200px",
        cursor:"pointer"
      };
    
    const boxStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "40%",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        };

    const modalImageStyle={
        width:'100%',
        height:'500px'
    };

    useEffect(()=>{
       searchByKeyword()
    })

    function searchByKeyword(){
        const UnsplashAPIWithKeyword = UnsplashAPI + `&query=${inputValue}`
        fetch(UnsplashAPIWithKeyword)
        .then(res => res.json())
        .then(data => {
            if((data!== null || data !== undefined) && data.results.length>0){
                setResult(data.results)
            }
        })
    }

    function handleInputChange(event) {
        setInputValue(event.target.value);
    }

    return (
        <Container>
            <TextField
                id="outlined-basic"
                label="Keyword"
                variant="outlined"
                value={inputValue}
                onChange={handleInputChange}
                sx={{ m: 4, width: "66%" }} />

             <Button 
               variant="outlined"
               onClick = {searchByKeyword}
               sx={{ m: 4, width: "66%" }}
               >
                Search Image</Button>

            <br/>
            {results.map((item, index) =>
                    <>
                    <img src={item.urls.small} style={imgStyle} onClick={() => handleOpen(index)}/>
                    <Modal
                        open={activeModalIndex === index}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                        <Box sx={boxStyle}>
                            <img src={item.urls.regular} style={modalImageStyle} />
                            <TextField
                                id="outlined-basic"
                                label="Regular"
                                variant="outlined"
                                value={item.urls.regular}
                                sx={{ mt: 4, width: "85%" }}
                                />
                            <CopyToClipboard text={item.urls.regular} >
                                <Button variant="outlined" sx={{ mt: 4, height:55}} title="copy to clipboard" >
                                <ContentPasteIcon />
                            </Button>
                            </CopyToClipboard>
                            
                            <TextField
                                id="outlined-basic"
                                label="Full"
                                variant="outlined"
                                value={item.urls.regular}
                                sx={{ mt: 4, width: "85%" }}
                                />
                            <CopyToClipboard text={item.urls.full}>
                                <Button variant="outlined" sx={{ mt: 4, height:55}} title="copy to clipboard" >
                                <ContentPasteIcon />
                            </Button>
                            </CopyToClipboard>
                        </Box>
                    </Modal>
                    </>
            )}

        </Container>
    );
}