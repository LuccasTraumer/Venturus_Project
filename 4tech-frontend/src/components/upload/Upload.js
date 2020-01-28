import React, { Fragment, useState } from 'react';
import {Grid, Paper, InputBase, Button} from '@material-ui/core'
import { DropzoneArea } from 'material-ui-dropzone'

import './Upload.css'

const Upload = () => {

    const [comment,setComments] = useState('')
    const [image,setImage] = useState([]);
;
    return(
        <Fragment>
            <Grid item xs={12} className="grid postcard">
                <Paper className="paper">
                    <form className="form">
                        <InputBase 
                        fullWidth
                        placeholder="Add commnet..."
                        value={comment}
                        onChange={(event) => setComments(event.target.value)} />
                        <DropzoneArea 
                            dropzoneText = "Select or Drop your image"
                            dropzoneClass = "droparea"
                            filesLimit={1}
                            onChange = {(files) => setImage(files)}
                            acceptedFiles = {['image/*']}
                            showAlerts = {false}
                        />
                        <Button
                        className="postbutton"
                        type="submit"
                        color="primary"
                        disabled={image.length === 0} > POST </Button>
                    </form>

                </Paper>

            </Grid>
        </Fragment>

    );
}


export default Upload;