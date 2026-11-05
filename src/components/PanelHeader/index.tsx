import { useState } from 'react'
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'

import { AccountCircleOutlined } from '@mui/icons-material'

type PanelHeaderProps = {
  title: string
  userName?: string
  onProfileClick?: () => void
  onLogout?: () => void
}

export default function PanelHeader({
  title,
  userName = 'Usuário',
  onProfileClick,
  onLogout,
}: PanelHeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleProfileClick = () => {
    handleClose()
    onProfileClick?.()
  }

  const handleLogout = () => {
    handleClose()
    onLogout?.()
  }

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: '#2C382F',
        color: '#FFFFFF',
        height: 64,
        justifyContent: 'center',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ minHeight: '64px !important', px: { xs: 2, md: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '-0.5px',
            }}
          >
            URBANA
          </Typography>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: '#465448', mx: 1 }}
          />

          <Typography
            variant="body2"
            sx={{ color: '#D8DED7', fontWeight: 500 }}
          >
            {title}
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton
          onClick={handleProfileMenu}
          aria-label="Menu do usuário"
          sx={{ p: 0.5 }}
        >
          <Avatar
            sx={{
              width: 34,
              height: 34,
              bgcolor: '#465448',
              color: '#FFFFFF',
            }}
          >
            <AccountCircleOutlined />
          </Avatar>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600 }}
            >
              {userName}
            </Typography>
          </Box>

          <Divider />

          {onProfileClick && (
            <MenuItem onClick={handleProfileClick}>
              Minha conta
            </MenuItem>
          )}

          {onLogout && (
            <MenuItem onClick={handleLogout}>
              Sair
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  )
}