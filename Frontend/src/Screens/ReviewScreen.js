import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles, ui } from "../Styles/reviewStyles";
import { getResenas } from "../services/reviewService";

const toTimeAgo = (isoDate) => {
	if (!isoDate) return "fecha no disponible";

	const createdAt = new Date(isoDate);
	if (Number.isNaN(createdAt.getTime())) return "fecha no disponible";

	const diffInSeconds = Math.max(0, Math.floor((Date.now() - createdAt.getTime()) / 1000));

	if (diffInSeconds < 60) return "hace unos segundos";

	const diffInMinutes = Math.floor(diffInSeconds / 60);
	if (diffInMinutes < 60) return `hace ${diffInMinutes} minuto${diffInMinutes === 1 ? "" : "s"}`;

	const diffInHours = Math.floor(diffInMinutes / 60);
	if (diffInHours < 24) return `hace ${diffInHours} hora${diffInHours === 1 ? "" : "s"}`;

	const diffInDays = Math.floor(diffInHours / 24);
	if (diffInDays < 30) return `hace ${diffInDays} dia${diffInDays === 1 ? "" : "s"}`;

	const diffInMonths = Math.floor(diffInDays / 30);
	if (diffInMonths < 12) return `hace ${diffInMonths} mes${diffInMonths === 1 ? "" : "es"}`;

	const diffInYears = Math.floor(diffInMonths / 12);
	return `hace ${diffInYears} ano${diffInYears === 1 ? "" : "s"}`;
};

const normalizeReview = (review) => ({
	id: String(review.idResena),
	studentName: review.nombreUsuario || `Usuario #${review.idUsuario}`,
	timeAgo: toTimeAgo(review.fechaCreacion),
	rating: Number(review.calificacion || 0),
	advisorName: review.nombreAsesor || `Asesor #${review.idUsuarioAuth || review.idAsesor}`,
	comment: review.comentario || "Sin comentario",
});

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
	const [reviews, setReviews] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [loadError, setLoadError] = useState("");

	const loadReviews = useCallback(async () => {
		try {
			setLoadError("");
			const rows = await getResenas();
			setReviews(rows.map(normalizeReview));
		} catch (error) {
			setLoadError(error.message || "No se pudieron cargar las reseñas");
		} finally {
			setIsLoading(false);
		}
	}, []);

	useFocusEffect(
		useCallback(() => {
			setIsLoading(true);
			loadReviews();
		}, [loadReviews])
	);

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<View style={[styles.header, { paddingTop: insets.top + 6 }]}>
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => {
							if (navigation.canGoBack()) {
								navigation.goBack();
								return;
							}

							navigation.navigate("DevMentor");
						}}
						style={styles.headerIconButton}
					>
							<Ionicons name="chevron-back" size={ui.iconBack} color="#1E5BE0" />
					</TouchableOpacity>

					<Text style={styles.headerTitle}>Reseñas</Text>

					<TouchableOpacity
						activeOpacity={0.8}
						onPress={loadReviews}
						style={styles.headerIconButton}
					>
							<Ionicons name="refresh" size={ui.iconHome} color="#1E5BE0" />
					</TouchableOpacity>
				</View>

				<ScrollView
					style={styles.list}
					contentContainerStyle={styles.listContent}
					showsVerticalScrollIndicator={false}
				>
					{isLoading && <Text style={styles.commentText}>Cargando reseñas...</Text>}

					{!isLoading && Boolean(loadError) && (
						<Text style={styles.commentText}>{loadError}</Text>
					)}

					{!isLoading && !loadError && reviews.length === 0 && (
						<Text style={styles.commentText}>Aun no hay reseñas registradas.</Text>
					)}

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
						Comparte tu experiencia para ayudar a otros estudiantes.
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
