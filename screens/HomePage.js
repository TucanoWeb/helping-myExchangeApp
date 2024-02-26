import React, {useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signOut } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';

export default function HomePage() {
    const navigation = useNavigation();
    /* const [name, setName] = useState('');

    useEffect(() => {
        const fetchName = async () => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setName(docSnap.data().name);
                } else {
                    console.log("No such document!");
                }
            }
        };

        fetchName();
    }, []); */

    const handleLogout = async ()=>{
      await signOut(auth);
    }
    const user = {
        name: "Vagner Pires",
        age: 33,
        city: 'Dublin',
        arrivalDate: '01-07-2024',
        school: 'Dorset College',
        airlines: 'KLM',
        originCity: 'Novo Hamburgo',
        originCountry: 'Brazil',
    };
    const handleEditProfile = async ()=>{
        await navigation.navigate('EditProfile');
    };
    
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={handleLogout} style={styles.logout}>
            <Text style={styles.editButtonText}>LOGOUT</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
            <Text style={styles.editButtonText}>MY PROFILE</Text>
        </TouchableOpacity>
        <Image source={require('../assets/profile.png')} style={styles.userPhoto} />
        <Text style={[styles.userName, styles.userAge]}>{user.name} - {user.age}</Text>
        <View style={styles.separator}></View>
        <Image source={require('../assets/flag.png')} style={styles.userCountry} />
        <Text style={styles.userCity}>{user.city}</Text>
        <Text style={styles.userArrivalDate}>Arrival Date: {user.arrivalDate}</Text>
        <Text style={styles.userSchool}>School: {user.school}</Text>
        <Text style={styles.userAirlines}>Airline: {user.airlines}</Text>
        <View style={styles.separator2}></View>
        <Text style={styles.userOriginCity}>{user.originCity}</Text>
        <Text style={styles.userOriginCountry}>{user.originCountry}</Text>
        <Image source={require('../assets/whatsapp.png')} style={styles.whatsappLogo} />
        <Footer navigation={navigation} />
      </SafeAreaView>
    )
}

const Footer = ({navigation}) => {
    const handleHomePage = () => {
        navigation.navigate('Home');
    };

    const handleSearchPage = () => {
        navigation.navigate('Search');
    };

    const handleFavoritesPage = () => {
        navigation.navigate('Favorites');
    };

    return (
        <View style={footerStyles.container}>
            <TouchableOpacity onPress={handleHomePage} style={footerStyles.footerItem}>
                <Text style={footerStyles.footerText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSearchPage} style={footerStyles.footerItem}>
                <Text style={footerStyles.footerText}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleFavoritesPage} style={footerStyles.footerItem}>
                <Text style={footerStyles.footerText}>Favorites</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#30FFAE',
    },
    editButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        padding: 2,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        zIndex: 1,
    },
    editButtonText: {
        color: 'black',
        fontWeight: 'bold',
    },
    logout: {
        position: 'absolute',
        marginTop: 50,
        right: 20,
        padding: 2,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        zIndex: 1,
    },
    userPhoto: {
        position: 'absolute',
        width: 390,
        height: 390,
        marginBottom: 2,
        marginTop: 75,
        zIndex: 0,
    },
    userName: {
        position: 'absolute',
        fontSize: 32,
        marginTop: 470,
        marginBottom: 0,
        left: 30,
        color: 'black',
    },
    separator: {
        position: 'absolute',
        width: 335,
        height: 1,
        backgroundColor: 'black',
        marginTop: 520,
    },
    userCountry: {
        position: 'absolute',
        width: 80,
        height: 50,
        marginTop: 560,
        left: 40,
    },
    userCity: {
        position: 'absolute',
        marginTop: 530,
        fontSize: 15,
        left: 150,
        color: 'black',
    },
    userArrivalDate: {
        position: 'absolute',
        marginTop: 555,
        fontSize: 15,
        left: 150,
        color: 'black',
    },
    userSchool: {
        position: 'absolute',
        marginTop: 580,
        fontSize: 15,
        left: 150,
        color: 'black',
    },
    userAirlines: {
        position: 'absolute',
        marginTop: 605,
        fontSize: 15,
        left: 150,
        color: 'black',
    },
    separator2: {
        position: 'absolute',
        width: 335,
        height: 1,
        backgroundColor: 'black',
        marginTop: 640,
    },
    userOriginCity: {
        position: 'absolute',
        marginTop: 660,
        fontSize: 15,
        left: 50,
        color: 'black',
    },
    userOriginCountry: {
        position: 'absolute',
        marginTop: 680,
        fontSize: 15,
        left: 50,
        color: 'black',
    },
    whatsappLogo: {
        position: 'absolute',
        width: 50,
        height: 50,
        marginTop: 660,
        left: 300,
    },
};

const footerStyles = {
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#2b8b5d',
        marginBottom: 0,
        width: '100%',
        height: 50,
        position: 'absolute',
        bottom: 0,
    },
    footerItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerText: {
        color: 'white',
        fontWeight: 'bold',
    },
};