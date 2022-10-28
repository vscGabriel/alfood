/** @format */

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

const pages = ["Home", "Restaurantes"];

import estilos from "./NavBar.module.scss";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

const NavBar = () => {
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position='static' color='transparent'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<LocalDiningIcon
						sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
					/>
					<Typography
						variant='h6'
						noWrap
						component='a'
						href='/'
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}>
						ALFOOD
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}>
							{pages.map((page) => (
								<Link
									component={RouterLink}
									to={page === "Home" ? "/" : `/${page}`}
									underline='none'>
									<Button
										style={{ color: "black" }}
										variant='text'
										key={page}
										onClick={handleCloseNavMenu}
										sx={{ my: 2, color: "white", display: "block" }}>
										{page}
									</Button>
								</Link>
							))}
						</Menu>
					</Box>
					<LocalDiningIcon
						sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
					/>
					<Typography
						variant='h5'
						noWrap
						component='a'
						href=''
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}>
						ALFOOD
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map((page) => (
							<Link
								component={RouterLink}
								to={page === "Home" ? "/" : `/${page}`}
								underline='none'>
								<Button
									style={{ color: "black" }}
									variant='text'
									key={page}
									onClick={handleCloseNavMenu}
									sx={{ my: 2, color: "white", display: "block" }}>
									{page}
								</Button>
							</Link>
						))}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title='Open settings'>
							<Link component={RouterLink} to='/admin/restaurantes'>
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<VpnKeyIcon fontSize='small' titleAccess='Acesso restrito' />
								</IconButton>
							</Link>
						</Tooltip>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
		// <nav className={estilos.Link}>
		// 	<ul>
		// 		<li>
		// 			<Link to='/'>Home</Link>
		// 		</li>
		// 		<li>
		// 			<Link to='/restaurantes'>Restaurantes</Link>
		// 		</li>
		// 	</ul>
		// </nav>
	);
};

export default NavBar;
