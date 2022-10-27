import React from 'react'
import { Button } from '@mui/material/'

interface IProps {
  /**
   * Button Caption
   */
  caption: string
}

interface IActions {
  /**
   * On Click Button Event
   */
  onClick: () => void
}

/**
 * Button Component
 */
const ButtonComponent = (props: IProps & IActions): JSX.Element => {
  return (
    <Button variant={'contained'} onClick={() => props.onClick()}>
      {props.caption}
    </Button>
  )
}

export default ButtonComponent
