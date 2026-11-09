import { Link } from 'react-router'
import {
  AppBar,
  Box,
  Divider,
  Toolbar,
  Typography,
} from '@mui/material'
import { UserRound } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

type PanelHeaderProps = {
  title: string
}

export default function PanelHeader({ title }: PanelHeaderProps) {
  const { user } = useAuth()

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

        <Link
          to="/meus-dados"
          className="flex min-h-11 items-center gap-2 text-[13px] font-medium text-[#E8EBE6] no-underline transition-colors hover:text-[#A9B9A9]"
        >
          <UserRound size={21} />
          <span className="max-[1024px]:hidden">{user.authenticated ? user.name : "Minha Conta"}</span>
        </Link>
      </Toolbar>
    </AppBar>
  )
}