import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles, ui } from "../Styles/reviewStyles";

const reviews = [
	{
		id: "1",
		studentName: "Monserrat Garcia",
		timeAgo: "hace 2 minutos",
		rating: 4,
		advisorName: "Cesar Ivan Jimenez",
		comment: "Buen asesor, gracias por su ayuda pase mi examen de POO"
	},
	{
		id: "2",
		studentName: "Camila Yazmin",
		timeAgo: "hace 2 semanas",
		rating: 5,
		advisorName: "Limber de Jesus Morales",
		comment: "Excelente asesor, me ayudó mucho con mis dudas"
	},
    {
		id: "3",
		studentName: "Dayana Rodriguez",
		timeAgo: "hace 1 mes",
		rating: 2,
		advisorName: "Edgar Alejandro Rodriguez",
		comment: "Pesimo asesor, no me ayudó en nada y me hizo perder tiempo"
	}
];

function Stars({ rating }) {
	return (
		<View style={styles.starsRow}>
			{[1, 2, 3, 4, 5].map((value) => (
				<Ionicons
					key={value}
					name={value <= rating ? "star" : "star-outline"}
					size={ui.star}
					color={value <= rating ? "#1E5BE0" : "#C8CDD8"}
					style={styles.starIcon}
				/>
			))}
		</View>
	);
}

export default function ReviewScreen({ navigation }) {
	const insets = useSafeAreaInsets();

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<View style={[styles.header, { paddingTop: insets.top + 6 }]}>
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate("DevMentor"))}
						style={styles.headerIconButton}
					>
							<Ionicons name="chevron-back" size={ui.iconBack} color="#1E5BE0" />
					</TouchableOpacity>

					<Text style={styles.headerTitle}>Reseñas</Text>

					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => navigation.navigate("DevMentor")}
						style={styles.headerIconButton}
					>
							<Ionicons name="home-outline" size={ui.iconHome} color="#1E5BE0" />
					</TouchableOpacity>
				</View>

				<ScrollView
					style={styles.list}
					contentContainerStyle={styles.listContent}
					showsVerticalScrollIndicator={false}
				>
					{reviews.map((review) => (
						<View key={review.id} style={styles.reviewCard}>
							<View style={styles.topRow}>
								<Image
									source={require("../../assets/icons/user.png")}
									style={styles.avatar}
								/>
								<View style={styles.userMeta}>
									<Text style={styles.studentName}>{review.studentName}</Text>
									<Text style={styles.timeAgo}>{review.timeAgo}</Text>
								</View>
							</View>

							<View style={styles.middleRow}>
								<Stars rating={review.rating} />
								<View style={styles.advisorMeta}>
									<Text style={styles.advisorLabel}>Asesor</Text>
									<Text style={styles.advisorName}>{review.advisorName}</Text>
								</View>
							</View>

							<Text style={styles.commentText}>{review.comment}</Text>
						</View>
					))}
				</ScrollView>

				<View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
					<Text style={styles.footerMessage}>
						¡Programa una asesoría para habilitar la opción de escribir una reseña!
					</Text>
					<TouchableOpacity
						style={styles.writeButton}
						activeOpacity={0.85}
						onPress={() => navigation.navigate("WriteReviewScreen")}
					>
						<Ionicons name="create-outline" size={ui.iconWrite} color="#FFFFFF" />
						<Text style={styles.writeButtonText}>Escribir una reseña</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}
