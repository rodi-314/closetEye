import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const formatDate = (date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export default function OutfitCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date()); 

  const handleNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(selectedDate.getDate() + 1);
    setSelectedDate(nextDay);
  };

  const handlePreviousDay = () => {
    const previousDay = new Date(selectedDate);
    previousDay.setDate(selectedDate.getDate() - 1);
    setSelectedDate(previousDay);
  };

  const handleViewAll = () => {
    console.log("View All Outfits");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.calender}>
            <Image source={require('./../../assets/images/calender.png')} style={styles.calendarIcon}/>
            <Text style={styles.title}>Calendar</Text>
        </View>
        <TouchableOpacity onPress={handleViewAll} style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dateNavigator}>
        <TouchableOpacity onPress={handlePreviousDay}>
          <Text style={styles.arrow}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
        <TouchableOpacity onPress={handleNextDay}>
          <Text style={styles.arrow}>&gt;</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.outfitDisplay}>
        <Text style={styles.outfitText}>Outfit for {formatDate(selectedDate)}</Text>
        {/* Display outfit information here */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor:'#e4e2ec',
    borderRadius:40,
    marginTop:10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
  },
  calendarIcon: {
    width: 30,
    height: 30
  },
  calender: {
    display:'flex',
    flexDirection: 'row',
    gap:5
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
  },
  viewAllButton: {
    paddingHorizontal: 10,  
  },
  viewAllText: {
    fontSize: 16,
    fontFamily: 'outfit',
    color: '#0000ff'  
  },
  dateNavigator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
    marginBottom: 20,
  },
  dateText: {
    marginHorizontal: 10,
    fontSize: 15,
    fontFamily: 'outfit-bold',
  },
  arrow: {
    fontSize: 24,
    fontFamily: 'outfit-bold',
    color: '#555',
  },
  outfitDisplay: {
    alignItems: 'center',
  },
  outfitText: {
    fontSize: 16,
    fontFamily: 'outfit',
  }
});
