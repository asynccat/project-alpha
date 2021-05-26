import React from 'react'
import { useFormik } from 'formik'
import { CardActions, Button, TextField} from '@material-ui/core'
import Collapsible from 'react-collapsible'
import * as Yup from 'yup'
import {useDispatch} from 'react-redux'

 import {updateUserPassword,
 userPreferencesRequestFailed} from '../../actions/prefAndProfileActions'
  import {useStyles} from './ProfilePreferencesPage.styles'



export default function PasswordChangeForm (): React.ReactElement {
    const classes = useStyles()
    const dispatch = useDispatch()
    
    const validationSchema = Yup.object({
      oldPassword: Yup.string()
      .required('Enter your old password'),
      newPassword: Yup.string()
      .required('Enter your new password')
      .notOneOf([Yup.ref('oldPassword')], 'Old and new passwords must be different'),
      confirmPassword: Yup.string()
      .required('Confirm your password')
      .oneOf([Yup.ref('newPassword')], 'Passwords do not match')
    })

    const formik = useFormik({
      initialValues: {
        oldPassword: '', 
        newPassword: '', 
        confirmPassword: ''
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        try {
          dispatch(updateUserPassword(values))
      } catch (error) {
          dispatch(userPreferencesRequestFailed(error))
      }
      },
    })
    return (
      <Collapsible className="collapsible" trigger="Change Password&nbsp; &gt;">
            <br />
            <form onSubmit={formik.handleSubmit}>
            <TextField
              className={classes.textfields}
              error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
              helperText={formik.touched.oldPassword && formik.errors.oldPassword}
              id="oldPassword"
              label="Old Password"
              name="oldPassword"
              onChange={formik.handleChange}
              value={formik.values.oldPassword}
              variant="outlined"
            />

            <TextField
              className={classes.textfields}
              error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
              helperText={formik.touched.newPassword && formik.errors.newPassword}
              id="newPassword"
              label="New Password"
              name="newPassword"
              onChange={formik.handleChange}
              value={formik.values.newPassword}
              variant="outlined"
            />
        
        <TextField
              className={classes.textfields}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              variant="outlined"
            />
            <CardActions className={classes.actionButton}>
                <Button className="buttons" color="primary" 
                data-testid="submitButton" type="submit" variant="contained">
                change Password
                </Button>
            </CardActions>
            </form>
      </Collapsible>
    )
}