import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Platform } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { doc, updateDoc } from "firebase/firestore"; // Ensure 'doc' is imported
import { db } from '../config/firebase';
import CountryPicker from 'react-native-country-picker-modal';
import { launchImageLibrary } from 'react-native-image-picker';
import DatePicker from '@react-native-community/datetimepicker'; // Ensure DatePicker is imported from the correct library

const EditProfilePage = () => {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [birthdate, setBirthdate] = useState(new Date());
    const [destinationCity, setDestinationCity] = useState('');
    const [dateArrival, setDateArrival] = useState('');
    const [originCity, setOriginCity] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [school, setSchool] = useState('');
    const [airlines, setAirlines] = useState('');
    const [photo, setPhoto] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);

    const saveProfile = async () => {
        try {
            await updateDoc(doc(db, "users", "yourUserId"), { // Replace "yourUserId" with the actual user ID
                Name: name,
                Birthdate: birthdate.toISOString(),
                Destination_city: destinationCity,
                Date_arrival: dateArrival,
                Origin_city: originCity,
                Whatsapp: `${countryCode}${whatsapp}`,
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

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.buttonBack}>
                <ArrowLeftIcon size="20" color="black" />
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
                <Text>{birthdate instanceof Date ? birthdate.toDateString() : 'Select a date'}</Text>
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
            <TextInput
                style={styles.input}
                placeholder="Date Arrival"
                value={dateArrival}
                onChangeText={setDateArrival}
            />
            <TextInput
                style={styles.input}
                placeholder="Origin City"
                value={originCity}
                onChangeText={setOriginCity}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CountryPicker
                    onSelect={country => setCountryCode(country.cca2)}
                    withFlag
                    withCallingCodeButton
                    withFilter
                    withCallingCode
                />
                <TextInput
                    style={[styles.input, { flexGrow: 1 }]}
                    placeholder="Whatsapp"
                    value={whatsapp}
                    onChangeText={setWhatsapp}
                    keyboardType="phone-pad"
                />
            </View>
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
            <TouchableOpacity style={styles.input} onPress={handleChoosePhoto}>
                <Text>{photo ? 'Photo Selected' : 'Upload your photo'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={saveProfile} style={styles.button}>
                <Text style={styles.buttonText}>SAVE</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'#30FFAE',
    },
    buttonBack: {
        top: 50,
        width: 40,
        height: 30,
        backgroundColor: 'white',
        borderRadius: 5,
        left: -140,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    input: {
        top: 90,
        width: 328,
        height: 43,
        borderColor: '#2B8B5D',
        borderWidth: 2,
        borderRadius: 5,
        marginBottom: 20,
        paddingLeft: 10,
        fontSize: 15,
        backgroundColor: '#fff',
    },
    button: {
        top: 100,
        width: 110,
        height: 37,
        backgroundColor: '#2B8B5D',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
};

export default EditProfilePage;
