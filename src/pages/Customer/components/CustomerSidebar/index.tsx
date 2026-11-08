import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import {
  AccountCircleOutlined,
  StorefrontOutlined,
  DashboardOutlined,
} from '@mui/icons-material'

import { NavLink } from 'react-router'
import { useAuth } from '@/hooks/useAuth'

type CustomerSidebarProps = {
  onClose: () => void
}

const SIDEBAR_WIDTH = 248
// const HEADER_HEIGHT = 133

export default function CustomerSidebar({
  onClose,
}: CustomerSidebarProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const { user } = useAuth()

  const canAccessPanel = user?.roles.some((role) =>
    ['ROLE_MANAGER', 'ROLE_ADMIN'].includes(role),
  )

  const panelPath = user?.roles.includes('ROLE_ADMIN')
    ? '/painel/usuarios'
    : '/painel/produtos'

  const handleNavigation = () => {
    if (isMobile) {
      onClose()
    }
  }

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: '#2C382F',
        color: '#D8DED7',
      }}
    >
      <List sx={{ px: 1.5, py: 2, flex: 1 }}>
        <ListItemButton
          component={NavLink}
          to="/meus-dados"
          end
          onClick={handleNavigation}
          sx={{
            minHeight: 44,
            mb: 0.5,
            px: 1.5,
            borderRadius: 1.5,
            color: '#D8DED7',
            '&.active': {
              bgcolor: '#465448',
              color: '#FFFFFF',
            },
            '&:hover': {
              bgcolor: '#3A493D',
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 40,
              color: 'inherit',
            }}
          >
            <AccountCircleOutlined />
          </ListItemIcon>

          <ListItemText
            primary="Meus dados"
            slotProps={{
              primary: {
                sx: {
                  fontSize: 14,
                  fontWeight: 500,
                },
              },
            }}
          />
        </ListItemButton>
      </List>

      <Divider sx={{ borderColor: '#465448' }} />

      {canAccessPanel && (
        <Box sx={{ p: 1.5 }}>
          <ListItemButton
            component={NavLink}
            to={panelPath}
            onClick={handleNavigation}
            sx={{
              minHeight: 44,
              mb: 0.5,
              px: 1.5,
              borderRadius: 1.5,
              color: '#D8DED7',
              '&:hover': {
                bgcolor: '#3A493D',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
              <DashboardOutlined />
            </ListItemIcon>

            <ListItemText
              primary="Acessar painel"
              slotProps={{
                primary: {
                  sx: {
                    fontSize: 14,
                    fontWeight: 500,
                  },
                },
              }}
            />
          </ListItemButton>
        </Box>
      )}

      <Box sx={{ p: 1.5 }}>
        <ListItemButton
          component={NavLink}
          to="/"
          onClick={handleNavigation}
          sx={{
            minHeight: 44,
            px: 1.5,
            borderRadius: 1.5,
            color: '#D8DED7',
            '&:hover': {
              bgcolor: '#3A493D',
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 40,
              color: 'inherit',
            }}
          >
            <StorefrontOutlined />
          </ListItemIcon>

          <ListItemText
            primary="Voltar à loja"
            slotProps={{
              primary: {
                sx: {
                  fontSize: 14,
                  fontWeight: 500,
                },
              },
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  )

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
            top: '133px',
            height: 'calc(100dvh - 133px)',
            boxSizing: 'border-box',
            borderRight: 'none',
            bgcolor: '#2C382F',
        
            '@media (max-width: 640px)': {
              top: '123px',
              height: 'calc(100dvh - 123px)',
            },
          },
        }}
      >
        {content}
      </Drawer>
    )
  }

  return (
    <Box
      component="aside"
      sx={{
        width: SIDEBAR_WIDTH,
        minWidth: SIDEBAR_WIDTH,
        height: 'calc(100vh - 133px)',
        position: 'sticky',
        top: '133px',
        overflowY: 'auto',
        bgcolor: '#2C382F',
      }}
    >
      {content}
    </Box>
  )
}