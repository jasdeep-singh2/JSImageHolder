import { Container } from "@mui/material";
import JSTextField from "../TextField";

export default function JSContainer(){
    return (
        <Container>
            <JSTextField
                label="Image Url"
                size="large"
                width="66%"
            />
            <JSTextField
                label="width"
                size="medium"
                width="30%"
            />
            <JSTextField
                label="height"
                size="medium"
                width="30%"
            />
        </Container>
    );
}