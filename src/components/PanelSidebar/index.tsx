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
  AdminPanelSettingsOutlined,
  CategoryOutlined,
  Inventory2Outlined,
  LocalOfferOutlined,
  PeopleAltOutlined,
  PointOfSaleOutlined,
  SecurityOutlined,
  StorefrontOutlined,
  WarehouseOutlined,
} from '@mui/icons-material'

import { NavLink } from 'react-router'

type PanelSidebarProps = {
  onClose: () => void
  variant: 'manager' | 'admin'
}

const SIDEBAR_WIDTH = 248
const HEADER_HEIGHT = 64

const menuItems = {
  manager: [
    {
      label: 'Produtos',
      path: '/painel/produtos',
      icon: Inventory2Outlined,
    },
    {
      label: 'Categorias',
      path: '/painel/categorias',
      icon: CategoryOutlined,
    },
    {
      label: 'Marcas',
      path: '/painel/marcas',
      icon: LocalOfferOutlined,
    },
    {
      label: 'Vendas',
      path: '/painel/vendas',
      icon: PointOfSaleOutlined,
    },
    {
      label: 'Estoque',
      path: '/painel/estoque',
      icon: WarehouseOutlined,
    },
  ],
  admin: [
    {
      label: 'Usuários',
      path: '/painel/usuarios',
      icon: PeopleAltOutlined,
    },
    {
      label: 'Papéis',
      path: '/painel/papeis',
      icon: AdminPanelSettingsOutlined,
    },
    {
      label: 'Permissões',
      path: '/painel/permissoes',
      icon: SecurityOutlined,
    },
  ],
}

export default function PanelSidebar({
  onClose,
  variant,
}: PanelSidebarProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const items = menuItems[variant]

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
        {items.map((item) => {
          const Icon = item.icon

          return (
            <ListItemButton
              key={item.path}
              component={NavLink}
              to={item.path}
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
                <Icon />
              </ListItemIcon>

              <ListItemText
                primary={item.label}
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
          )
        })}
      </List>

      <Divider sx={{ borderColor: '#465448' }} />

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
            top: `${HEADER_HEIGHT}px`,
            height: `calc(100% - ${HEADER_HEIGHT}px)`,
            boxSizing: 'border-box',
            borderRight: 'none',
            bgcolor: '#2C382F',
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
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        position: 'sticky',
        top: `${HEADER_HEIGHT}px`,
        overflowY: 'auto',
        bgcolor: '#2C382F',
      }}
    >
      {content}
    </Box>
  )
}