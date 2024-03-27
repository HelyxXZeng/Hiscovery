import React, { useEffect, useState } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import RNPickerSelect from 'react-native-picker-select';
import { COLORS } from '../../constants/theme';

const ModalCalendar = ({ visible, selectedDate, onSelectDate }) => {
    const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());
    const [inSelectedDate, setInSelectedDate] = useState(selectedDate)
    const handleYearChange = (year) => {
        setSelectedYear(year);
        setInSelectedDate(new Date(year, selectedDate.getMonth() + 1, 1))
    };

    const handleDateChange = (date) => {
        setInSelectedDate(new Date(date))
        onSelectDate(new Date(date));
        // onClose();
    };

    const yearItems = Array.from({ length: 100 }, (_, i) => ({ label: `${2024 - i}`, value: 2024 - i }));

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <RNPickerSelect
                        onValueChange={handleYearChange}
                        items={yearItems}
                        style={pickerSelectStyles}
                        placeholder={{ label: "Select a year...", value: null }}
                    />
                    <Calendar
                        style={styles.calendar}
                        initialDate={`${selectedYear}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`}
                        onDayPress={(day) => handleDateChange(day.dateString)}
                        theme={{
                            backgroundColor: COLORS.primary,
                            calendarBackground: COLORS.primary,
                            textSectionTitleColor: COLORS.secondary,
                            selectedDayBackgroundColor: COLORS.darkRed,
                            selectedDayTextColor: COLORS.primary,
                            todayTextColor: COLORS.darkRed,
                            dayTextColor: COLORS.secondary,
                            textDisabledColor: COLORS.gray2
                        }}
                        markedDates={{
                            [inSelectedDate.toISOString().substring(0, 10)]: { selected: true }
                        }}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.gray2,
        opacity: 0.8
    },
    modalView: {
        margin: 20,
        backgroundColor: COLORS.gray,
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.7,
        shadowRadius: 20,
        elevation: 5
    },
    calendar: {
        padding: 15,
        width: 300,
        borderRadius: 20,
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        // Your styles
    },
    inputAndroid: {
        // Your styles
    },
});

export default ModalCalendar;
