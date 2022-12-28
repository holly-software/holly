import React, { useState } from "react";
import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Link,
} from "@mui/material";
import {
	Dashboard as DashboardIcon,
	People as PeopleIcon,
	ReceiptLong as ReceiptLongIcon,
	Logout as LogoutIcon,
} from "@mui/icons-material";

function Root() {
	return (
		<Box sx={{ display: "flex", flexDirection: "row" }}>
			<Nav />
		</Box>
	);
}

// TODO: make this responsive
function Nav() {
	const NavLink: React.FC<{
		to: string;
		name: string;
		icon: React.ReactNode;
	}> = ({ to, name, icon }) => (
		<ListItem component={Link} to={to} disablePadding>
			<ListItemButton>
				<ListItemIcon>{icon}</ListItemIcon>
				<ListItemText primary={name} />
			</ListItemButton>
		</ListItem>
	);

	const drawerWidth = 240;
	const drawerContent = (
		<Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
			<nav aria-label="main data indexes">
				<List>
					<NavLink to="/dashboard" name="Dashboard" icon={<DashboardIcon />} />
					<NavLink to="/people" name="People" icon={<PeopleIcon />} />
					<NavLink to="/passes" name="Passes" icon={<ReceiptLongIcon />} />
				</List>
			</nav>
			<Box sx={{ flexGrow: 1 }} />
			<nav aria-label="dashboard settings and actions">
				<List>
					<NavLink to="/logout" name="Logout" icon={<LogoutIcon />} />
				</List>
			</nav>
		</Box>
	);

	return (
		<Drawer
			variant="permanent"
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				[`& .MuiDrawer-paper`]: {
					width: drawerWidth,
					boxSizing: "border-box",
				},
			}}
		>
			{drawerContent}
		</Drawer>
	);
}

export default Root;
