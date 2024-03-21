import React, { useState, useEffect } from 'react';
import { TextInput, TouchableOpacity, Text, Platform, KeyboardAvoidingView, ScrollView, Modal, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ArrowLeftIcon } from 'react-native-heroicons/solid';

import DatePicker from '@react-native-community/datetimepicker';

import useAuth from '../hooks/useAuth';

import { collection, getDoc } from 'firebase/firestore';
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../config/firebase';

import * as ImagePicker from 'expo-image-picker';

const EditProfilePage = () => {
    const navigation = useNavigation();
    const {user} = useAuth();

    const [showSchoolPicker, setShowSchoolPicker] = useState(false);
    const [selectedSchool, setSelectedSchool] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showDatePickerArrival, setShowDatePickerArrival] = useState(false);

    const [dataForm, setDataForm] = useState({
        name: "",
        birthdate: new Date(),
        destinationCity: "",
        dateArrival: "",
        originCity: "",
        whatsapp: "",
        school: [],
        airlines: "",
        photo: "",
    })

    const saveProfile = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        try {
            if(docSnap.exists()) {
                await updateDoc(docRef, {
                    Name: dataForm.name,
                    Birthdate: dataForm.birthdate.toISOString(),
                    Destination_city: dataForm.destinationCity,
                    Date_arrival: dataForm.dateArrival,
                    Origin_city: dataForm.originCity,
                    Whatsapp: `${dataForm.whatsapp}`,
                    School: dataForm.school,
                    Airlines: dataForm.airlines,
                    Photo: dataForm.photo,
                })
            } else {
                await setDoc(docRef, {
                    Name: dataForm.name,
                    Birthdate: dataForm.birthdate.toISOString(),
                    Destination_city: dataForm.destinationCity,
                    Date_arrival: dataForm.dateArrival,
                    Origin_city: dataForm.originCity,
                    Whatsapp: `${dataForm.whatsapp}`,
                    School: dataForm.school,
                    Airlines: dataForm.airlines,
                    Photo: dataForm.photo,
                })
            }
            console.log('Profile saved!');
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error saving profile:', error);
        }
    };

    function onChangeForm(key, value) {
        setDataForm(prev => ({
          ...prev,
          [key]: value
        }))
        console.log(dataForm)
      }

    const handleChoosePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          console.log(result);
      
          if (!result.canceled) {
            onChangeForm("photo", result.assets[0].uri);
          }
        }

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios');
        onChangeForm("birthdate", selectedDate || dataForm.birthdate);
    };

    const handleDateArrivalChange = (event, selectedDate) => {
        setShowDatePickerArrival(Platform.OS === 'ios');
        onChangeForm("dateArrival", selectedDate || dataForm.dateArrival);
    };

    // useEffect(() => {
    //     const fetchSchools = async () => {
    //         const querySnapshot = await getDocs(collection(db, "schools"));
    //         const schoolsArray = querySnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().School }));
    //         setSchool(schoolsArray);
    //     };
    
    //     fetchSchools();
    // }, []);

    const handleSelectSchool = (schoolName) => {
        setSelectedSchool(schoolName);
        setShowSchoolPicker(false);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
            
            <ScrollView contentContainerStyle={styles.contentContainer}>
            
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.buttonBack}>
                    <ArrowLeftIcon size="25" color="black" />
                </TouchableOpacity>
            
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={dataForm.name}
                    onChangeText={e => onChangeForm("name", e)}
                />
            
                <TouchableOpacity 
                style={[styles.input, styles.datePickerInput]} 
                onPress={() => setShowDatePicker(true)}
                    >
                    
                    <Text style={[styles.dateText, { color: dataForm.birthdate instanceof Date && dataForm.birthdate.toDateString() !== new Date().toDateString() ? 'black' : '#A9A9A9' }]}
                        >
                        
                        {dataForm.birthdate instanceof Date && dataForm.birthdate.toDateString() !== new Date().toDateString() ? dataForm.birthdate.toDateString() : 'Birthdate'}
                    </Text>
                </TouchableOpacity>

                {showDatePicker && (
                    <DatePicker
                        value={dataForm.birthdate}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleDateChange}
                    />
                )}

                <TextInput
                    style={styles.input}
                    placeholder="Destination City"
                    value={dataForm.destinationCity}
                    onChangeText={e => onChangeForm("destinationCity", e)}
                />

                <TouchableOpacity 
                style={[styles.input, styles.datePickerInput]} 
                onPress={() => setShowDatePickerArrival(true)}
                    >
                    <Text style={[styles.dateText, { color: dataForm.dateArrival ? 'black' : '#A9A9A9' }]}>
                        {dataForm.dateArrival  ? dataForm.dateArrival.toDateString() : 'Date Arrival'}
                    </Text>
                </TouchableOpacity>

                {showDatePickerArrival && (
                    <DatePicker
                        value={dataForm.dateArrival || new Date()}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleDateArrivalChange}
                    />
                )}

                <TextInput
                    style={styles.input}
                    placeholder="Origin City"
                    value={dataForm.originCity}
                    onChangeText={e => onChangeForm("originCity", e)}
                />

                <TextInput
                    style={styles.whatsappInput}
                    placeholder="WhatsApp number"
                    value={dataForm.whatsapp}
                    onChangeText={e => onChangeForm("whatsapp", e)}
                    keyboardType="phone-pad"
                />

                <TouchableOpacity onPress={() => setShowSchoolPicker(true)} style={styles.input}>
                    <Text style={[styles.dateText2, { color: selectedSchool ? 'black' : '#A9A9A9' }]}>
                        {selectedSchool || "School"}
                    </Text>
                </TouchableOpacity>
                <Modal
                    visible={showSchoolPicker}
                    animationType="slide"
                    onRequestClose={() => setShowSchoolPicker(false)}>
                    <FlatList
                        data={dataForm.school}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleSelectSchool(item.name)}>
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </Modal>


                <TextInput
                    style={styles.input}
                    placeholder="Airlines"
                    value={dataForm.airlines}
                    onChangeText={e => onChangeForm("airlines", e)}
                />

                <TouchableOpacity style={styles.uploadButton} onPress={handleChoosePhoto}>
                    <Text style={styles.uploadButtonText}>{dataForm.photo ? 'Photo Selected' : 'Upload your photo'}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={saveProfile} style={styles.button}>
                    <Text style={styles.buttonText}>SAVE</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = {
    contentContainer: {
        flexGrow: 1,
        alignItems: 'center', // Alinha os filhos do ScrollView no centro do eixo transversal (horizontal)
        justifyContent: 'center', // Justifica o conteúdo no centro do eixo principal (vertical)
        backgroundColor: '#30FFAE',
        padding: 20,
    },
    buttonBack: {
        alignSelf: 'flex-start',
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    input: {
        width: '100%',
        height: 43,
        borderColor: '#2B8B5D',
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 15,
        paddingLeft: 10,
        fontSize: 15,
        backgroundColor: '#fff',
    },
    button: {
        width: '50%', // Button width is half of the container width
        height: 37,
        backgroundColor: '#2B8B5D',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15, // Add space above the button
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    datePickerInput: {
        justifyContent: 'center', // Center the text inside the input
        height: 43, // Set the input height
        marginTop: 15, // Add space between inputs
    },
    dateText: {
        fontSize: 15,
        paddingLeft: 0,
        justifyContent: 'center'
    },
    dateText2: {
        fontSize: 15,
        paddingLeft: 0,
        justifyContent: 'center',
        marginTop: 8
    },
    phoneSection: {
        flexDirection: 'row',
        width: '100%',
        height: 43,
        borderColor: '#2B8B5D',
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 15,
        backgroundColor: '#fff',
        paddingLeft: 10,
    },
    countryPickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        flex: 1,
        height: '100%',
    },
    countryCodeText: {
        fontSize: 15,
        marginLeft: 10,
        color: 'black',
    },
    whatsappInput: {
        width: '100%',
        height: 43,
        borderColor: '#2B8B5D',
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 15,
        paddingLeft: 10,
        fontSize: 15,
        backgroundColor: '#fff',
    },
    uploadButton: {
        width: '100%',
        height: 43,
        borderColor: '#2B8B5D',
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 15,
        justifyContent: 'center', // Centraliza o texto verticalmente
        backgroundColor: '#fff',
    },
    uploadButtonText: {
        fontSize: 15,
        color: '#A9A9A9',
        paddingLeft: 10,
    },
};

export default EditProfilePage;
