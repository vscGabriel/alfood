/** @format */

import { useState, useEffect } from "react";
import {
	AppBar,
	Button,
	Container,
	IconButton,
	Link,
	Toolbar,
	Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/system";
import MenuItem from "@mui/material/MenuItem";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	height: 100,
	bgcolor: "white",
	border: "1px solid #000",
	boxShadow: 24,
	p: 4,
};

const pages = ["Restaurantes", "Pratos"];

export default function NavAdm() {
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<AppBar position='static' color='transparent'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<BusinessCenterIcon
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
						ADM ALFOOD
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
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<Typography textAlign='center'>{page}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<BusinessCenterIcon
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
						ADM ALFOOD
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map((page) => (
							<Link
								component={RouterLink}
								to={
									page === "Restaurantes"
										? "/admin/Restaurantes"
										: `/admin/${page}`
								}
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
					<Link component={RouterLink} to='/' underline='none'>
						<Button sx={{ color: "black" }}>Sair</Button>
					</Link>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
