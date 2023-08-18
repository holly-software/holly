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
	useTheme,
	useMediaQuery,
	SwipeableDrawer,
	IconButton,
} from "@mui/material";
import {
	Dashboard as DashboardIcon,
	People as PeopleIcon,
	ReceiptLong as ReceiptLongIcon,
	Logout as LogoutIcon,
	Menu as MenuIcon,
} from "@mui/icons-material";
import { Navigate, Outlet, useLoaderData, useLocation } from "react-router-dom";
import { db, getUser } from "../utils/firebase";
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
		// @ts-ignore - because it can't verify the user document exists
		authCtx: firebaseUser && {
			firebase: firebaseUser,
			document: await db.users.get(db.users.id(firebaseUser.uid)),
		},
	};
}

// TODO: make this not shit on mobile
function Nav() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const [mobileOpen, setMobileOpen] = useState(false);

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
					{/* <NavLink to="/dashboard" name="Dashboard" icon={<DashboardIcon />} /> */}
					<NavLink to="/passes" name="Passes" icon={<ReceiptLongIcon />} />
					<NavLink to="/people" name="People" icon={<PeopleIcon />} />
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

	return isMobile ? (
		<>
			<IconButton
				color="inherit"
				aria-label="open drawer"
				edge="start"
				onClick={() => setMobileOpen(true)}
				sx={{
					position: "absolute",
					top: "4px",
					left: "16px",
				}}
			>
				<MenuIcon />
			</IconButton>
			<SwipeableDrawer
				variant="temporary"
				open={mobileOpen}
				onOpen={() => setMobileOpen(true)}
				onClose={() => setMobileOpen(false)}
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
			</SwipeableDrawer>
		</>
	) : (
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
