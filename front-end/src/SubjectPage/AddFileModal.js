
import AddIcon from '@mui/icons-material/Add';
import React, { useState , useRef, useEffect} from 'react'
import {FormControl, Input, Form, Button, FormGroup, Box, TextField, Grid, Typography, Modal} from '@mui/material'
import axios from 'axios'
import Dropzone from 'react-dropzone';
import {ChatState} from '../Context/ChatProvider'
import {getSender} from '../Config/ChatLogics'
const AddFileModal = (props) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    const {subjectId} = props;
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {user, selectedChat} = ChatState();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null); // state for storing actual image
    const [fileType, setFileType] = useState('');
    const [filesList, setFilesList] = useState([]);
    const [state, setState] = useState({
        title: '',
        description: ''
    });
    const [previewSrc, setPreviewSrc] = useState('');
    const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
    const dropRef = useRef();
    const handleInputChange = (event) => {
        setState({
          ...state,
          [event.target.name]: event.target.value
        });
      };

      const onDrop = (files) => {
        const [uploadedFile] = files;
        setFile(uploadedFile);

        const fileReader = new FileReader();
        fileReader.onload = () => {
          setPreviewSrc(fileReader.result);
        };
        fileReader.readAsDataURL(uploadedFile);
        setIsPreviewAvailable(uploadedFile.name.match(/.(jpeg|jpg|png)$/));
        dropRef.current.style.border = '2px dashed #e9ebeb';
      };

      const updateBorder = (dragState) => {
        if (dragState === 'over') {
          dropRef.current.style.border = '2px solid #000';
        } else if (dragState === 'leave') {
          dropRef.current.style.border = '2px dashed #e9ebeb';
        }
      };

      const handleOnSubmit = async (event) => {
        event.preventDefault();

        try {
          const { title, description } = state;

          if (title.trim() !== '' && description.trim() !== '') {
            if (file) {
              const formData = new FormData();
              formData.append('file', file);
              formData.append('title', title);
              formData.append('description', description);
              formData.append('fileType', fileType);
              formData.append('subjectId', props.subjectId )


              await axios.post(`/api/file/upload`, formData, {
                headers: {
                    "Content-Type":'multipart/form-data',

                }
              });
              console.log(formData);

            } else {
              console.log('Please select a file to add.');
            }
          } else {
            console.log('Please enter all the field values.');
          }
        } catch (error) {
          console.log("ERROR")
        }
      };


    return (
        <div>
         <Button style={{backgroundColor:"green", margin:"1% 0%",marginLeft:"auto"}}variant="contained" startIcon={<AddIcon/>} onClick={handleOpen}>
                Add New Material
            </Button>
        <Modal
            open={open}
            onClose={handleClose}>
            <Box sx={style}>
            <FormControl >
            <TextField name="title" type="text" value={state.title || ''} onChange={handleInputChange} placeholder="Add title"/>
            <TextField name="description" type="text"  value={state.description || ''}onChange={handleInputChange} placeholder="Add Description"/>
            <div className="upload-section">
  <Dropzone onDrop={onDrop}
  onDragEnter={() => updateBorder('over')}
  onDragLeave={() => updateBorder('leave')}>
    {({ getRootProps, getInputProps }) => (
      <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
        <input {...getInputProps()} />
        <p>Drag and drop a file OR click here to select a file</p>
        {file && (
          <div>
            <strong>Selected file:</strong> {file.name}
          </div>
        )}
      </div>
    )}
  </Dropzone>
  {previewSrc ? (
    isPreviewAvailable ? (
      <div className="image-preview">
        <img className="preview-image" src={previewSrc} alt="Preview" style={{width:"20%"}}/>
      </div>
    ) : (
      <div className="preview-message">
        <p>No preview available for this file</p>
      </div>
    )
  ) : (
    <Box height="3%" width="3%">
      <p>Image preview will be shown here after selection</p>
    </Box>
  )}
</div>
                  <label for="firstname">Upload</label>

                <select value = {fileType} onChange={(e)=> setFileType(e.target.value)}>
                  <option> Material </option>
                  <option> Assignment </option>
                  <option> Note </option>
                </select>

                <Button onClick={handleOnSubmit} type="submit" >Submit</Button>
                <Button type="reset" >Reset</Button>
            </FormControl>

            </Box>

        </Modal>
            
        </div>
    )
}

export default AddFileModal
