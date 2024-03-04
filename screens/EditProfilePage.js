import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Text, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../config/firebase';
import { launchImageLibrary } from 'react-native-image-picker';
import DatePicker from '@react-native-community/datetimepicker';

const EditProfilePage = () => {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [birthdate, setBirthdate] = useState(new Date());
    const [destinationCity, setDestinationCity] = useState('');
    const [dateArrival, setDateArrival] = useState('');
    const [originCity, setOriginCity] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [school, setSchool] = useState('');
    const [airlines, setAirlines] = useState('');
    const [photo, setPhoto] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showDatePickerArrival, setShowDatePickerArrival] = useState(false);

    const saveProfile = async () => {
        try {
            await updateDoc(doc(db, "users", "yourUserId"), {
                Name: name,
                Birthdate: birthdate.toISOString(),
                Destination_city: destinationCity,
                Date_arrival: dateArrival,
                Origin_city: originCity,
                Whatsapp: `${whatsapp}`,
                School: school,
                Airlines: airlines,
                Photo: photo,
            });
            console.log('Profile saved!');
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error saving profile:', error);
        }
    };

    const handleChoosePhoto = () => {
        launchImageLibrary({ noData: true }, response => {
            if (response.assets) {
                setPhoto(response.assets[0].uri);
            }
        });
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios');
        setBirthdate(selectedDate || birthdate);
    };

    const handleDateArrivalChange = (event, selectedDate) => {
        setShowDatePickerArrival(Platform.OS === 'ios');
        setDateArrival(selectedDate || dateArrival);
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
                value={name}
                onChangeText={setName}
            />
            <TouchableOpacity style={[styles.input, styles.datePickerInput]} onPress={() => setShowDatePicker(true)}>
                <Text style={[styles.dateText, { color: birthdate instanceof Date && birthdate.toDateString() !== new Date().toDateString() ? 'black' : '#A9A9A9' }]}>
                        {birthdate instanceof Date && birthdate.toDateString() !== new Date().toDateString() ? birthdate.toDateString() : 'Birthdate'}
                </Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DatePicker
                    value={birthdate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                />
            )}
            <TextInput
                style={styles.input}
                placeholder="Destination City"
                value={destinationCity}
                onChangeText={setDestinationCity}
            />
            <TouchableOpacity style={[styles.input, styles.datePickerInput]} onPress={() => setShowDatePickerArrival(true)}>
                <Text style={[styles.dateText, { color: dateArrival ? 'black' : '#A9A9A9' }]}>
                    {dateArrival ? dateArrival.toDateString() : 'Date Arrival'}
                </Text>
            </TouchableOpacity>
            {showDatePickerArrival && (
                <DatePicker
                    value={dateArrival || new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateArrivalChange}
                />
            )}
            <TextInput
                style={styles.input}
                placeholder="Origin City"
                value={originCity}
                onChangeText={setOriginCity}
            />
            <TextInput
                style={styles.whatsappInput}
                placeholder="WhatsApp number"
                value={whatsapp}
                onChangeText={setWhatsapp}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="School"
                value={school}
                onChangeText={setSchool}
            />
            <TextInput
                style={styles.input}
                placeholder="Airlines"
                value={airlines}
                onChangeText={setAirlines}
            />
            <TouchableOpacity style={styles.uploadButton} onPress={handleChoosePhoto}>
            <Text style={styles.uploadButtonText}>{photo ? 'Photo Selected' : 'Upload your photo'}</Text>
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
