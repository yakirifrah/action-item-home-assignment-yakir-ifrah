import {useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import SaveIcon from '@mui/icons-material/Save'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Stack from '@mui/material/Stack'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {IconButton} from '@mui/material'
import {SavedProfileResponse} from '../../models/profile.model.ts'
import {apis} from '../../conf/projectConstant.ts'
import useQuery from '../../hooks/useQuery.tsx'

export interface ProfilePageInfo {
  name: string
  email: string
  gender: string
  phone: string
  largePicture: string
  date: string
  age: number
  address: {
    street: {number: number; name: string}
    city: string
    state: string
    country: string
  }
}

const ProfileScreen = (): JSX.Element => {
  const navigate = useNavigate()
  const {
    state: {profile},
  } = useLocation()
  const query = useQuery()

  const [currentProfile] = useState<ProfilePageInfo>(() =>
    castToProfilePageInfo(profile),
  )
  const [profileName, setProfileName] = useState<string | undefined>(
    currentProfile.name,
  )

  function castToProfilePageInfo(
    profile: SavedProfileResponse,
  ): ProfilePageInfo {
    const _profile: SavedProfileResponse = profile as SavedProfileResponse
    return {
      name: _profile.name,
      gender: _profile.gender,
      email: _profile.email,
      largePicture: _profile.picture.large,
      phone: _profile.phone,
      date: _profile.dob.date,
      age: _profile.dob.age,
      address: {
        street: {
          number: _profile.address.street.number,
          name: _profile.address.street.name,
        },
        country: _profile.address.country,
        city: _profile.address.city,
        state: _profile.address.state,
      },
    }
  }

  const backPage = () => {
    navigate(-1)
  }

  const saveProfile = async () => {
    const response = await fetch(apis.CREATE_USER(query.get('id') as string), {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        ...profile,
        name: profileName,
      }),
    })

    if (response.status === 200) {
      alert('Saved successfully')
    } else {
      console.error('error saving profile:', response)
    }
  }

  const updateProfile = async () => {
    console.log(query.get('id'))
    const response = await fetch(apis.UPDATE_USER(query.get('id') as string), {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        ...profile,
        name: profileName,
      }),
    })

    if (response.status === 201) {
      alert('Updated successfully')
    } else {
      console.error('error update profile:', response)
    }
  }

  const deleteProfile = async () => {
    const response = await fetch(apis.DELETE_USER(query.get('id') as string), {
      method: 'DELETE',
    })

    if (response.status === 200) {
      alert('Deleted successfully')
    } else {
      console.error('error deleting profile:', response)
    }
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={backPage}>
            <ArrowBackIcon htmlColor={'white'} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            Profile
          </Typography>
        </Toolbar>
      </AppBar>
      <Stack
        sx={{paddingLeft: '200px', paddingRight: '200px', paddingTop: '35px'}}
      >
        <Grid container direction={'column'} sx={{gap: '34px'}}>
          <Grid item>
            <Avatar
              alt={currentProfile?.name}
              src={currentProfile?.largePicture}
              sx={{width: 100, height: 100, margin: 'auto 10px auto 10px'}}
            />
          </Grid>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': {m: 1, width: '25ch'},
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                value={profileName}
                label="name"
                name="name"
                onChange={changeEvent =>
                  setProfileName(changeEvent.target.value)
                }
              />
              <TextField
                id="outlined-read-only-input"
                label="Gender"
                value={currentProfile?.gender}
                disabled
              />
              <TextField
                id="outlined-read-only-input"
                label="Age"
                value={currentProfile?.age}
                disabled
              />
              <TextField
                id="outlined-read-only-input"
                label="Date"
                value={currentProfile?.date}
                disabled
              />
              <TextField
                id="outlined-read-only-input"
                label="Email"
                value={`${currentProfile?.email}`}
                disabled
              />
              <TextField
                id="outlined-read-only-input"
                label="Phone"
                value={`${currentProfile?.phone}`}
                disabled
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="outlined-read-only-input"
                label="Street"
                value={`${currentProfile?.address?.street.number} ${currentProfile?.address.street.name}`}
                disabled
              />
              <TextField
                id="outlined-read-only-input"
                label="City"
                value={`${currentProfile?.address.city}`}
                disabled
              />
              <TextField
                id="outlined-read-only-input"
                label="State"
                value={`${currentProfile?.address.state}`}
                disabled
              />
            </div>
          </Box>
        </Grid>
        <br />
        <footer>
          <Box>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={saveProfile}
                >
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={updateProfile}
                >
                  Update
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  onClick={deleteProfile}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Box>
        </footer>
      </Stack>
    </>
  )
}

export default ProfileScreen
