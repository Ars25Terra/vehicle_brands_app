import React from 'react'
import { Button } from "@mui/material/";

interface IProps {
  caption: string
}

interface IActions {
  onClick: () => void
}

const ButtonComponent = (props: IProps & IActions): JSX.Element => {
  return <Button
        variant={'contained'}
        onClick={(_) => props.onClick()}>
        {props.caption}
      </Button>
}

export default ButtonComponent
