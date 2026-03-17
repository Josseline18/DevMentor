import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#F3F4F8"
	},

	container: {
		flex: 1,
		backgroundColor: "#F3F4F8",
		paddingHorizontal: 16
	},

	header: {
		paddingTop: 25,   //aqui
		paddingBottom: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},

	headerIconButton: {
		width: 36,
		height: 36,
		alignItems: "center",
		justifyContent: "center"
	},

	headerTitle: {
		fontSize: 22,
		fontWeight: "700",
		color: "#121826"
	},

	list: {
		flex: 1
	},

	listContent: {
		paddingTop: 8,
		paddingBottom: 24,
		gap: 14
	},

	reviewCard: {
		backgroundColor: "#FFFFFF",
		borderRadius: 12,
		paddingVertical: 14,
		paddingHorizontal: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.06,
		shadowRadius: 4,
		elevation: 2
	},

	topRow: {
		flexDirection: "row",
		alignItems: "center"
	},

	avatar: {
		width: 52,
		height: 52,
		borderRadius: 26,
		marginRight: 10,
		backgroundColor: "#E8EBF2"
	},

	userMeta: {
		flex: 1
	},

	studentName: {
		fontSize: 17,
		fontWeight: "700",
		color: "#182033"
	},

	timeAgo: {
		marginTop: 2,
		fontSize: 14,
		color: "#8C94A8"
	},

	middleRow: {
		marginTop: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end"
	},

	starsRow: {
		flexDirection: "row",
		alignItems: "center"
	},

	starIcon: {
		marginRight: 2
	},

	advisorMeta: {
		flexShrink: 1,
		alignItems: "flex-start",
		marginLeft: 10
	},

	advisorLabel: {
		fontSize: 14,
		color: "#8C94A8"
	},

	advisorName: {
		marginTop: 2,
		fontSize: 17,
		color: "#141D2F",
		fontWeight: "700"
	},

	commentText: {
		marginTop: 12,
		fontSize: 17,
		lineHeight: 22,
		color: "#80889B"
	},

	footer: {
		paddingTop: 8,
		paddingBottom: 35   //aqui
	},

	footerMessage: {
		fontSize: 26,
		lineHeight: 34,
		fontWeight: "500",
		color: "#737A8D",
		marginBottom: 14
	},

	writeButton: {
		backgroundColor: "#1E5BE0",
		minHeight: 56,
		borderRadius: 12,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.16,
		shadowRadius: 5,
		elevation: 4
	},

	writeButtonText: {
		color: "#FFFFFF",
		fontSize: 18,
		fontWeight: "700"
	}
});
