import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { Card } from "react-native-paper";
import { useState } from "react";
import { styles } from "../Styles/AdminStyle";

const sampleReports = [
    { id: 1, type: "Lenguaje inapropiado en una review", user: "John Doe", date: "2026-01-15", status: "Pendiente" },
    { id: 2, type: "Tutor no se presento", user: "Jane Smith", date: "2026-01-14", status: "Pendiente" },
    { id: 3, type: "Estudiante no se presento", user: "Mike Johnson", date: "2026-01-13", status: "Resuelto" },
    { id: 4, type: "Contenido inapropiado", user: "Sarah Williams", date: "2026-01-12", status: "Pendiente" },
    { id: 5, type: "Lenguaje inapropiado en una review", user: "Tom Brown", date: "2026-01-11", status: "Resuelto" },
];

export default function Admin({ navigation }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("Todos");

    const filteredReports = sampleReports.filter((report) => {
        const matchesSearch = 
            report.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.user.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "Todos" || report.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reports</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <View style={styles.filterContainer}>
                <TouchableOpacity 
                    style={[styles.filterButton, statusFilter === "Todos" && styles.filterButtonActive]}
                    onPress={() => setStatusFilter("Todos")}
                >
                    <Text style={styles.filterButtonText}>Todos</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.filterButton, statusFilter === "Pendiente" && styles.filterButtonActive]}
                    onPress={() => setStatusFilter("Pendiente")}
                >
                    <Text style={styles.filterButtonText}>Pendiente</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.filterButton, statusFilter === "Resuelto" && styles.filterButtonActive]}
                    onPress={() => setStatusFilter("Resuelto")}
                >
                    <Text style={styles.filterButtonText}>Resuelto</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {filteredReports.map((report) => (
                    <Card key={report.id} style={styles.reportCard}>
                        <Card.Content>
                            <View style={styles.reportHeader}>
                                <Text style={styles.reportType}>{report.type}</Text>
                                <Text 
                                    style={[
                                        styles.reportStatus,
                                        report.status === "Pendiente" ? styles.statusPending : styles.statusResolved
                                    ]}
                                >
                                    {report.status}
                                </Text>
                            </View>
                            <Text style={styles.reportUser}>Reportado por: {report.user}</Text>
                            <Text style={styles.reportDate}>{report.date}</Text>
                            <TouchableOpacity style={styles.viewButton}>
                                <Text style={styles.viewButtonText}>Mirar Detalles</Text>
                            </TouchableOpacity>
                        </Card.Content>
                    </Card>
                ))}
            </ScrollView>
        </View>
    );
}