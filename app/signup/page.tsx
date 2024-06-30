import { Box } from "@mui/material"
import FormSignUp from "./FormSignUp"

const SignUpPage = () => {
  return (
    <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center', m: 3, flexDirection: 'column'}}>
      <FormSignUp />
    </Box>
  )
}

export default SignUpPage
