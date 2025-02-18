import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { ThemedButton } from '../components/ThemedButton';
import { ThemedTextInput } from '../components/ThemedTextInput';

export default function ScorecardScreen() {
  const router = useRouter();

  const [gameDate, setGameDate] = useState('');
  const [facility, setFacility] = useState('');
  const [selected, setSelected] = useState<number | null>(null); // Track the selected circle

  const options = ["9 hole", "18 hole", "27 hole", "36 hole"];
  // Needs handleHole logic
  const handleHole = (index: number) => {
    setSelected(index);
  };
  // Needs handleGame logic
  const handleGame = () => {
    if (!gameDate.trim() || !facility.trim() || !selected) {
      Alert.alert("Missing Fields", "Please fill in all required fields before submitting.");
      return;
    }
    console.log('gameDate', gameDate);
    console.log('facility', facility); 
  };

  const [teamMembers, setTeamMembers] = useState(['Current User']);
  const [newMember, setNewMember] = useState('');

  const addMember = () => {
    if (newMember.trim() !== '') {
      setTeamMembers([...teamMembers, newMember.trim()]);
      setNewMember('');
    }
  };

  const removeMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  return (
    // PLACE SCROLLVIEW AND THEMEDVIEW CONTAINER BY DEFAULT IN ALL SCREENS
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Scorecard Screen</ThemedText>

        {/* Game Date Section */}
        <ThemedText type="body">Game Date</ThemedText>
        <ThemedTextInput
          placeholder="Enter Game Date"
          value={gameDate}
          style={styles.gameTitles}
          onChangeText={setGameDate}
        />

        {/* Facility Name Section */}
        <ThemedText type="body">Facility Name</ThemedText>
        <ThemedTextInput
          placeholder="Please enter a location"
          value={facility}
          style={styles.gameTitles}
          onChangeText={setFacility}
        />

        {/* Hole Selection Section */}
        <ThemedText type="body">Hole Selection</ThemedText>
        <ThemedView style={styles.grid}>
          {options.map((option, index) => (
            <ThemedView key={index} style={styles.itemContainer}>
              <TouchableOpacity
                style={[styles.circle, selected === index && styles.selected]}
                onPress={() => handleHole(index)}
              />
              <ThemedText type="body">{option}</ThemedText>
            </ThemedView>
          ))}
        </ThemedView>

        {/* Team Members Section */}
        <ThemedText type="body">Team Members</ThemedText>
        <ThemedView style={styles.listContainer}>
          {teamMembers.map((member, index) => (
            <ThemedView key={index} style={styles.memberContainer}>
              <ThemedText type="body" style={styles.teamber}>{member}</ThemedText>
              <TouchableOpacity style={styles.removeButton} onPress={() => removeMember(index)}>
                <ThemedText type="body" style={styles.remove}>Remove</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          ))}
        </ThemedView>

        <ThemedView style={styles.addMemberContainer}>
          <ThemedTextInput 
            placeholder="Add new member"
            value={newMember}
            onChangeText={setNewMember}
          /> 
          <ThemedButton style={styles.buttonContainer} onPress={addMember} title="Add" />
        </ThemedView>

        <ThemedButton onPress={router.back} style={styles.goBack} title="Go Back" />
        <ThemedButton onPress={() => {
            router.push({
              pathname: "/screens/session",
              params: {
                gameDate,
                facility,
                selected,
                teamMembers: JSON.stringify(teamMembers),
              },
            });
          }}
          style={styles.goSubmit} title="Submit" />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    paddingBottom: 70,
  },
  goBack: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    marginTop: 50,
  },
  goSubmit: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    marginTop: 50,
  },
  gameTitles: {
    width: 300,
    marginBottom: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: 500,
    height: 50,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 25,
    backgroundColor: '#ccc',
    margin: 10,
  },
  selected: {
    backgroundColor: '#218838',
  },
  selectedText: {
    marginTop: 20,
    fontSize: 18,
  },
  teamber: {
    marginRight: 10, 
  },
  listContainer: { 
    flexWrap: 'wrap', 
    marginTop: 20,
    marginBottom: 20,
    fontSize: 18,   
  },
  memberContainer: {
    flexDirection: 'row',  
    justifyContent: 'space-between',  
    alignItems: 'center', 
    borderBottomColor: '#ccc',  
    marginBottom: 10, 
    width: '100%', 
    paddingLeft: 50,
    paddingRight: 50,
  },
  addMemberContainer: { 
    alignItems: 'center',  
    marginTop: 10, 
  },
  removeButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 5, 
    justifyContent: 'center',  
    alignItems: 'center', 
  }, 
  remove: { 
    textAlign: 'center', 
  },    
  buttonContainer: { 
    marginBottom: 20,   
  },
});
