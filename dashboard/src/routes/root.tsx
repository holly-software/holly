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
import { Navigate, Outlet, useLoaderData, useLocation } from "react-router-dom";
import { db, getUser } from "../utils/firebase";
import { User as FBUser } from "firebase/auth";
import { Typesaurus } from "typesaurus";
import { User } from "@holly/schema";
import AuthContext, { AuthContextVal } from "../utils/auth-context";

type LoaderData = {
	authCtx: AuthContextVal;
};

function Root() {
	const { authCtx } = useLoaderData() as LoaderData;
	const location = useLocation();

	if (!authCtx) {
		return <Navigate to="/auth/login" state={{ from: location }} replace />;
	}

	return (
		<AuthContext.Provider value={authCtx}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					height: "100vh",
					width: "100vw",
				}}
			>
				<Nav />
				<Outlet />
			</Box>
		</AuthContext.Provider>
	);
}

export async function loader(): Promise<LoaderData> {
	const firebaseUser = await getUser();

	return {
		authCtx: firebaseUser && {
			firebase: firebaseUser,
			document: await db.users.get(db.users.id(firebaseUser.uid)),
		},
	};
}

// TODO: make this responsive
function Nav() {
	const NavLink: React.FC<{
		to: string;
		name: string;
		icon: React.ReactNode;
	}> = ({ to, name, icon }) => (
		// @ts-ignore
		<ListItem component={Link} to={to} color="inherit" disablePadding>
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
					<NavLink to="/auth/logout" name="Log Out" icon={<LogoutIcon />} />
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
