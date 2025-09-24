import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import HomeIcon from "@mui/icons-material/Home"
import GroupIcon from "@mui/icons-material/Group"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import MenuIcon from "@mui/icons-material/Menu"
import MuiAppBar from "@mui/material/AppBar"
import Divider from "@mui/material/Divider"
import MuiDrawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { styled, useTheme } from "@mui/material/styles"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}))

const Menu = () => {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const menuItems = [
    { text: "Inicio", icon: <HomeIcon />, path: "/" },
    { text: "Ver estudiantes", icon: <GroupIcon />, path: "/estudiantes" },
    {
      text: "Agregar estudiante",
      icon: <PersonAddIcon />,
      path: "/estudiantes/nuevo",
    },
  ]


  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <>
      <AppBar position="fixed" open={open} sx={{ background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)', boxShadow: 3 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 3, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700, letterSpacing: 1 }}>
            Gestión de Estudiantes
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} PaperProps={{ sx: { background: 'linear-gradient(180deg, #e3f2fd 0%, #bbdefb 100%)', borderRight: 0 } }}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ mt: 2 }}>
          {menuItems.map((i) => (
            <ListItem key={i.text} disablePadding sx={{ display: "block", mb: 1 }}>
              <Link to={i.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    borderRadius: 2,
                    background: location.pathname === i.path ? '#90caf9' : 'transparent',
                    '&:hover': {
                      background: '#e3f2fd',
                    },
                    justifyContent: open ? 'initial' : 'center',
                    transition: 'background 0.2s',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: 'center',
                      mr: open ? 2 : 'auto',
                      color: location.pathname === i.path ? '#1976d2' : '#1565c0',
                    }}
                  >
                    {i.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={i.text}
                    sx={{
                      opacity: open ? 1 : 0,
                      fontWeight: location.pathname === i.path ? 700 : 400,
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  )
}

export default Menu
