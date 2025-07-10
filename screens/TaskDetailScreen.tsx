import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { getStatusColor } from '@/utils/taskUtils';
import { colors, spacing, borderRadius, shadows } from '@/theme/colors';

export const TaskDetailScreen = ({ route }: any) => {
    const { task } = route.params;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.title}>{task.title}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(task.status) }]}>
                        <Text style={styles.statusText}>{task.status.toUpperCase()}</Text>
                    </View>
                </View>

                {task.description && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.description}>{task.description}</Text>
                    </View>
                )}

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Dates</Text>
                    <Text style={styles.dateText}>
                        Created: {format(new Date(task.createdAt), 'dd.MM.yyyy HH:mm')}
                    </Text>
                    {task.dueDate && (
                        <Text style={styles.dateText}>
                            Due: {format(new Date(task.dueDate), 'dd.MM.yyyy HH:mm')}
                        </Text>
                    )}
                </View>

                {task.location && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Location</Text>
                        <Text style={styles.locationText}>📍 {task.location}</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    card: {
        backgroundColor: colors.surface,
        margin: spacing.md,
        padding: spacing.lg,
        borderRadius: borderRadius.lg,
        ...shadows.md,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.lg,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.textPrimary,
        flex: 1,
        marginRight: spacing.md,
    },
    statusBadge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.full,
    },
    statusText: {
        color: colors.textInverse,
        fontSize: 12,
        fontWeight: 'bold',
    },
    section: {
        marginBottom: spacing.lg,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.textPrimary,
        marginBottom: spacing.sm,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: colors.textSecondary,
    },
    dateText: {
        fontSize: 16,
        color: colors.textSecondary,
        marginBottom: spacing.xs,
    },
    locationText: {
        fontSize: 16,
        color: colors.textSecondary,
    },
});