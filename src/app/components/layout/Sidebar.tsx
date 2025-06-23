"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const modules = [
	{
		name: "Dashboard",
		path: "/dashboard",
		icon: (
			// Tabler: layout-dashboard
			<svg
				width="20"
				height="20"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth="1.5"
			>
				<rect x="4" y="4" width="7" height="7" rx="1.5" />
				<rect x="13" y="4" width="7" height="3.5" rx="1.5" />
				<rect x="13" y="9.5" width="7" height="10.5" rx="1.5" />
				<rect x="4" y="13" width="7" height="7" rx="1.5" />
			</svg>
		),
	},
	{
		name: "Strategy",
		path: "/strategy",
		icon: (
			// Tabler: chart-bar
			<svg
				width="20"
				height="20"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth="1.5"
			>
				<path d="M3 21V3m0 18h18" />
				<rect x="7" y="13" width="3" height="5" rx="1.5" />
				<rect x="12" y="9" width="3" height="9" rx="1.5" />
				<rect x="17" y="5" width="3" height="13" rx="1.5" />
			</svg>
		),
	},
	{
		name: "Trades",
		path: "/trades",
		icon: (
			<span
				style={{
					display: "inline-flex",
					alignItems: "center",
					justifyContent: "center",
					width: 20,
					height: 20,
					borderRadius: "3px",
					border: "1.5px solid currentColor",
				}}
			>
				<svg
					width="15"
					height="15"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth="1.5"
				>
					<circle cx="6" cy="7" r="1.5" />
					<circle cx="6" cy="12" r="1.5" />
					<circle cx="6" cy="17" r="1.5" />
					<line x1="10" y1="7" x2="20" y2="7" />
					<line x1="10" y1="12" x2="20" y2="12" />
					<line x1="10" y1="17" x2="20" y2="17" />
				</svg>
			</span>
		),
	},
	{
		name: "Pricing",
		path: "/pricing",
		icon: (
			<span
				style={{
					display: "inline-flex",
					alignItems: "center",
					justifyContent: "center",
					width: 20,
					height: 20,
					borderRadius: "50%",
					border: "1.5px solid currentColor",
					fontWeight: 700,
					fontSize: 12,
					fontFamily: "inherit",
					lineHeight: 0,
				}}
			>
				₹
			</span>
		),
	},
	{
		name: "Settings",
		path: "/settings",
		icon: (
			// Tabler: settings-cog (no circle border)
			<svg
				width="20"
				height="20"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth="1.5"
			>
				<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7-3a7 7 0 0 0-.2-1.6l1.5-1.2a1 1 0 0 0 .2-1.3l-1.4-2.4a1 1 0 0 0-1.2-.5l-1.7.7a7.1 7.1 0 0 0-1.4-.8l-.3-1.8A1 1 0 0 0 13 3h-2a1 1 0 0 0-1 .8l-.3 1.8a7.1 7.1 0 0 0-1.4.8l-1.7-.7a1 1 0 0 0-1.2.5l-1.4 2.4a1 1 0 0 0 .2 1.3l1.5 1.2A7 7 0 0 0 5 12c0 .5.1 1.1.2 1.6l-1.5 1.2a1 1 0 0 0-.2 1.3l1.4 2.4a1 1 0 0 0 1.2.5l1.7-.7c.4.3.9.6 1.4.8l.3 1.8a1 1 0 0 0 1 .8h2a1 1 0 0 0 1-.8l.3-1.8c.5-.2 1-.5 1.4-.8l1.7.7a1 1 0 0 0 1.2-.5l1.4-2.4a1 1 0 0 0-.2-1.3l-1.5-1.2c.1-.5.2-1.1.2-1.6z" />
			</svg>
		),
	},
];

export default function Sidebar() {
	const pathname = usePathname();
	const [collapsed, setCollapsed] = useState(false);

	return (
		<aside
			className={`h-screen bg-[#0B1742] flex flex-col justify-between py-8 px-4 fixed left-0 top-0 z-40 transition-all duration-300 ${
				collapsed ? "w-20" : "w-64"
			}`}
		>
			<div>
				<div className={`mb-12 flex items-center gap-3 px-2 transition-all duration-300 relative ${collapsed ? "justify-center" : ""}`}>
					<img
						src="/images/logo-circle.svg"
						alt="Logo"
						className="h-16 w-16"
					/>
					{!collapsed && (
						<span className="text-2xl font-extralight text-white font-serif">Nextun</span>
					)}
					{/* Arrow button absolutely positioned to the right of the sidebar header */}
					<button
						onClick={() => setCollapsed((c) => !c)}
						className="flex items-center justify-center text-white shadow rounded-md  absolute top-1/2 -translate-y-1/2"
						style={{
							right: collapsed ? '-30px' : '-30px',
							width: '32px',
							height: '32px',
							zIndex: 50,
							boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
							background: '#0B1742',
						}}
						aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
					>
						{collapsed ? (
							// Right arrow (expand)
							<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2">
								<path d="M10 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						) : (
							// Left arrow (collapse)
							<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2">
								<path d="M14 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						)}
					</button>
				</div>
				<nav>
					<ul className="space-y-2">
						{modules.map((mod) => (
							<li key={mod.path}>
								<Link
									href={mod.path}
									className={`flex items-center gap-3 px-4 py-3 rounded-lg transition font-normal text-base hover:bg-[#1A2552] ${
										pathname === mod.path
											? "bg-[#1A2552] text-white"
											: "text-[#B0B8D1]"
									} ${collapsed ? "justify-center px-0" : ""}`}
									style={{ fontFamily: 'Inter, sans-serif' }}
								>
									<span className="text-xl">{mod.icon}</span>
									{!collapsed && mod.name}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
			<div className="px-2 flex flex-col gap-2">
				{!collapsed && (
					<button className="flex items-center gap-2 text-[#B0B8D1] hover:text-white px-4 py-2 rounded-lg transition w-full">
						<svg
							width="20"
							height="20"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth="1.5"
						>
							<path d="M17 16l4-4m0 0l-4-4m4 4H7" />
							<rect x="3" y="5" width="4" height="14" rx="2" />
						</svg>
						Log Out
					</button>
				)}
			</div>
		</aside>
	);
}
