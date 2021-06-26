/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/jsx-no-bind */
import React, { useState, useCallback } from 'react'
import { Avatar, Button } from '@material-ui/core'
import Modal from '@material-ui/core/Modal'

import { useStyles, useStyleModal } from '../profilePage/ProfilePreferencesPage.styles'
import { operateUserDataRequest } from '../../../api/HttpClientInstance'

export const PreferencesPageAvatar = (): React.ReactElement => {
    const [enter, setEnter] = useState(false)
    const [open, setOpen] = useState(false)
    const [selectedFile, setSelectedFile] = useState(false)
  
    const mouseEnter = useCallback(() => setEnter(true),[])
    const mouseLeave = useCallback(() => setEnter(false),[])

    const classes = useStyles()
    const modalClass = useStyleModal()
    
    const handleOpen = useCallback(() => setOpen(true), [setOpen])
    const handleClose = useCallback(() => setOpen(false), [setOpen])

    const updateAvatar = useCallback(() => {
        handleOpen()
    },[handleOpen])

    const setSelected = (e: React.SyntheticEvent) => {
        //@ts-ignore
        console.log(e.target.files[0])
        //@ts-ignore
        setSelectedFile(e.target.files[0])
    }

    const sendFileToBackend = async() => {
        console.log(selectedFile)
        try {
        //@ts-ignore
            await operateUserDataRequest.uploadNewAvatar(selectedFile)
        } catch (e) {
           console.log(e)
        }
    }

    const body = (
        <div  className={modalClass.paper} >
          <h2 id="simple-modal-title">
            Please, upload your new avatar
          </h2>
          <form className="modal" encType="multipart/form-data">
          <input
          accept="image/*"
          color="primary"
          id="icon-button-file"
          onChange={setSelected}
          style={{ display: 'none', }}
          type="file"
        />
        <label htmlFor="icon-button-file">
          <Button
            color="primary"
            component="span"
            size="large"
            variant="contained"
          > Upload new avatar
          </Button> &nbsp; &nbsp;
        </label>
          {selectedFile? 
            <Button  color="primary"
                component="span"
                onClick={sendFileToBackend}
                size="large"
                variant="contained">Save new avatar
            </Button> : ''}
          </form>
        </div>
      )

    return (
        <div className="avatarAndButton"  
            onMouseEnter={mouseEnter} 
            onMouseLeave={mouseLeave}
            >
            <Avatar className={classes.large} />
            <div className={enter ? classes.manipulationVisible : classes.manipulationHidden} 
                onClick={updateAvatar}> Update avatar 
            </div>
            <Modal
                aria-describedby="simple-modal-description"
                aria-labelledby="simple-modal-title"
                onClose={handleClose}
                open={open}
            >
                {body}
            </Modal>
        </div>
     )
}