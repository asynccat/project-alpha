/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/jsx-no-bind */
import React, { useState, useCallback } from 'react'
import { Avatar, Button, Typography } from '@material-ui/core'
import Modal from '@material-ui/core/Modal'
import { useFormik } from 'formik'
import {useDispatch, useSelector } from 'react-redux'

import { useStyles, useStyleModal } from '../profilePage/ProfilePreferencesPage.styles'
import {validationSchema} from '../../../utils/ValidationSchemes'
import {updateUserAvatar,
  userPreferencesRequestFailed} from '../../../actions/prefAndProfileActions'
  import {RootState} from '../../../reducers/index'

export const PreferencesPageAvatar = (): React.ReactElement => {
    const avatar = useSelector((state: RootState) => state.operatePreferencesDataReducer.avatar)  
    const dispatch = useDispatch() 
    
    const [enter, setEnter] = useState(false)
    const [open, setOpen] = useState(false)
  
    const mouseEnter = useCallback(() => setEnter(true),[])
    const mouseLeave = useCallback(() => setEnter(false),[])

    const classes = useStyles()
    const modalClass = useStyleModal()
    
    const handleOpen = useCallback(() => setOpen(true), [setOpen])
    const handleClose = useCallback(() => setOpen(false), [setOpen])

    const updateAvatar = useCallback(() => {
        handleOpen()
    },[handleOpen])

    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        file: null
      },
      validationSchema: validationSchema.validationFile,
      onSubmit: (values) => {
        const data = new FormData()
        if (values.file !== null) {
          //@ts-ignore
          data.append('avatar', values.file, values.file.name)
        }
        try {
          //@ts-ignore
          dispatch(updateUserAvatar(data))
          } catch (error) {
          dispatch(userPreferencesRequestFailed(error))
          }
          handleClose()
      }
    })

    const body = (
      <div  className={modalClass.paper} >
        <h2 id="simple-modal-title">
          Please, upload your new avatar
        </h2>
        <Typography component="p">
       {/*@ts-ignore*/}
          {formik.values.file ? formik?.values?.file?.name : ''}
        </Typography>
        <br />
        <form className="modal" encType="multipart/form-data" onSubmit={formik.handleSubmit} >
          <input
          accept="image/*"
          color="primary"
          id="icon-button-file" 
          name="avatar"
          onChange={(event) => {
          if (event.currentTarget.files !== null) {
            formik.setFieldValue('file', event.currentTarget.files[0])
            formik.setFieldTouched('avatar', true, false )
          }
          }}
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
        { formik.values.file? 
            <Button  color="primary"
                size="large"
                type="submit"
                variant="contained">Save new avatar
            </Button> : '' }
        </form>
      </div>
      )

    return (
      <form className="avatarAndButton"  
          onMouseEnter={mouseEnter} 
          onMouseLeave={mouseLeave}
          >
          <Avatar className={classes.large} src={avatar} />
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
      </form>
     )
}