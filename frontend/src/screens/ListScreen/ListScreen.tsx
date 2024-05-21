import React, {useEffect, useState} from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import {Grid} from '@mui/material'
import {useNavigate} from 'react-router-dom'

import {DefaultRoutes} from '../../conf/projectConstant.ts'
import {
  RandomProfileResponse,
  SavedProfileResponse,
} from '../../models/profile.model.ts'
import {apis} from '../../conf/projectConstant.ts'

export interface ListPageProps {
  showHistory?: boolean
}

interface ProfileItem {
  thumbnail: string
  name: string
  gender: string
  country: string
  phoneNumber: string
  email: string
}

const ListScreen = (props: ListPageProps): JSX.Element => {
  const navigate = useNavigate()

  const [profiles, setProfiles] = useState<
    RandomProfileResponse[] | SavedProfileResponse[] | undefined
  >()

  useEffect(() => {
    props?.showHistory ? loadDataFromHistory() : loadRandomData()
  }, [props?.showHistory])

  const navigateToProfile = (profile: SavedProfileResponse) => {
    navigate(
      `${DefaultRoutes.Profile}?id=${encodeURIComponent(profile.userId)}`,
      {
        state: {profile},
      },
    )
  }

  const loadRandomData = async (): Promise<void> => {
    const response = await fetch(apis.GET_RANDOM_USERS('10'))
    const body = await response.json()
    const randomProfiles: RandomProfileResponse[] = body.results
    setProfiles(randomProfiles)
  }

  const loadDataFromHistory = async (): Promise<void> => {
    const response = await fetch(apis.GET_ALL_HISTORY_USERS)
    const body = await response.json()

    const savedProfiles: SavedProfileResponse[] = body.data
    setProfiles(savedProfiles)
  }

  const toSavedProfileResponse = (
    profile: RandomProfileResponse | SavedProfileResponse,
  ): SavedProfileResponse => {
    if (!(profile as RandomProfileResponse).login) {
      return profile as SavedProfileResponse
    }

    const _profile = props?.showHistory
      ? (profile as SavedProfileResponse)
      : (profile as RandomProfileResponse)
    let profileId, name
    if (profile as SavedProfileResponse) {
      profileId = {userId: _profile.userId}
      name = _profile.name as string
    }
    if (profile as RandomProfileResponse) {
      profileId = {
        id: {
          name: _profile?.id?.name,
          value: _profile?.id?.value,
        },
      }
      name =
        `${_profile?.name?.title} ${_profile?.name?.first} ${_profile?.name?.last}` as string
    }

    return {
      ...profileId,
      name,
      gender: _profile.gender,
      email: _profile.email,
      phone: _profile.phone,
      dob: _profile.dob,
      picture: {
        large: _profile.picture.large,
        thumbnail: _profile.picture.thumbnail,
      },
      address: {
        street: 'location' in _profile ? _profile.location.street : '',
        city: 'location' in _profile ? _profile.location.city : '',
        state: 'location' in _profile ? _profile.location.state : '',
        country: 'location' in _profile ? _profile.location.country : '',
      },
    }
  }

  const renderItems = (): JSX.Element[] | undefined => {
    return profiles.map(
      (profile: RandomProfileResponse | SavedProfileResponse) => {
        profile = toSavedProfileResponse(profile)
        const item: ProfileItem = {
          name: profile.name,
          thumbnail: profile.picture.thumbnail,
          country: profile.address.country,
          email: profile.email,
          gender: profile.gender,
          phoneNumber: profile.phone,
        }

        return (
          <React.Fragment key={item.email}>
            <ListItem
              sx={[
                {
                  '&:hover': {
                    cursor: 'pointer',
                  },
                },
              ]}
              alignItems="flex-start"
              onClick={() => navigateToProfile(profile as SavedProfileResponse)}
            >
              <ListItemAvatar>
                <Avatar alt={item.name} src={item.thumbnail} />
              </ListItemAvatar>
              <ListItemText
                primary={item.name}
                secondary={
                  <>
                    {`${item.country} ${item.gender}`} <br />
                    <Typography
                      sx={{display: 'inline'}}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {item.phoneNumber} <br />
                      {item.email}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        )
      },
    )
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{minHeight: '100vh'}}
    >
      {!profiles || !profiles.length ? (
        <Typography sx={{color: 'black'}} variant="h1">
          No data
        </Typography>
      ) : (
        <List>{renderItems()}</List>
      )}
    </Grid>
  )
}

export default ListScreen
