/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useCallback } from 'react'
import { Avatar, Button, Typography } from '@material-ui/core'
import Modal from '@material-ui/core/Modal'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

import { useStyles, useStyleModal } from '../profilePage/ProfilePreferencesPage.styles'
import { validationSchema } from '../../../utils/ValidationSchemes'
import { updateUserAvatar, IUpdateAvatarActionPayload } from '../../../actions/prefAndProfileActions'
import { RootState } from '../../../reducers/index'
import {config} from '../../../config'

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

    const updateAvatar = useCallback(() => {
        handleOpen()
    },[handleOpen])

    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        file: '',
      },
      validationSchema: validationSchema.validationFile,
      onSubmit: (values) => {
        console.log(values)
        if (values.file === null) { return }
        const data : IUpdateAvatarActionPayload = {avatarBlob: values.file}
          dispatch(updateUserAvatar(data))
          handleClose()
          setEnter(false)
      }
    })

    const handleChange = useCallback((e) => {
          formik.setFieldValue('file', e.currentTarget.files[0])
    },[formik])

    const handleClose = useCallback(() => {
      setOpen(false)
    // if file does not pass validation and modal window is closed, form is cleared
      formik.resetForm()
    }, [setOpen, formik])

    const body = (
      <div  className={modalClass.paper} >
        <h2 id="simple-modal-title">
          Please, upload your new avatar
        </h2>
        {formik.values.file ? 
          <Typography component="p">
        {/*use ts-ignore here as we dont type formik file values in before*/}
          {/*@ts-ignore */}
            {formik.values.file.name }
          </Typography>
           : ''}
        <br />
        <form className="modal" encType="multipart/form-data" onSubmit={formik.handleSubmit} >
          <input
            accept="image/*"
            color="primary" 
            id="file"
            name="file"
            onBlur={formik.handleBlur}
            onChange={handleChange}
            style={{ display: 'none', }}
            type="file"
          />
        <label htmlFor="file">
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
        <br/>
        <Typography className={classes.errorMessage}>
          { formik.errors ? formik.errors.file : ''}
        </Typography>
        {formik.values.file ? <img className={classes.imageThumb} 
          src={URL.createObjectURL(formik.values.file)} /> : '' }
      </div>
      )

    return (
      <form className="avatarAndButton"  
          onMouseEnter={mouseEnter} 
          onMouseLeave={mouseLeave}
          >
          <Avatar className={classes.large} src={(avatar === '/media/') ? '' : (config.baseUrl + avatar)} />
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