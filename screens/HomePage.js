import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';

export default function HomePage() {
    const navigation = useNavigation();

    const handleLogout = async ()=>{
      await signOut(auth);
    }
    const user = {
        name: 'Vagner Pires',
        city: 'Dublin',
        arrivalDate: '01-07-2024',
        originCity: 'Novo Hamburgo',
        originCountry: 'Brazil',
    };
    const handleEditProfile = async ()=>{
        // Navegar para a página de edição do perfil
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
        <Text style={styles.userName}>{user.name}</Text>
        <View style={styles.separator}></View>
        <Image source={require('../assets/flag.png')} style={styles.userCountry} />
        <Text style={styles.userCity}>{user.city}</Text>
        <Text style={styles.userArrivalDate}>Arrival Date: {user.arrivalDate}</Text>
        <View style={styles.separator}></View>
        <Text style={styles.userOriginCity}>{user.originCity}</Text>
        <Text style={styles.userOriginCountry}>{user.originCountry}</Text>
        <Image source={require('../assets/whatsapp.png')} style={styles.whatsappLogo} />
        <Footer navigation={navigation} />
      </SafeAreaView>
    )
}

const Footer = ({navigation}) => {
    const handleHomePage = () => {
        // Navegar para a homepage
        navigation.navigate('Home');
    };

    const handleSearchPage = () => {
        // Navegar para a página de busca
        navigation.navigate('Search');
    };

    const handleFavoritesPage = () => {
        // Navegar para a página de favoritos
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
        width: 390,
        height: 390,
        marginBottom: 2,
        marginTop: 20,
        zIndex: 0,
    },
    userName: {
        fontSize: 32,
        marginTop: 10,
        marginBottom: 0,
        left: -80,
        color: 'black',
    },
    separator: {
        width: 335,
        height: 1,
        backgroundColor: 'black',
        marginVertical: 20,
    },
    userCountry: {
        width: 80,
        height: 50,
        marginTop: 0,
        left: -110,
    },
    userCity: {
        position: 'absolute',
        marginTop: 570,
        fontSize: 15,
        left: 150,
        color: 'black',
    },
    userArrivalDate: {
        position: 'absolute',
        marginTop: 590,
        fontSize: 15,
        left: 150,
        color: 'black',
    },
    userOriginCity: {
        position: 'absolute',
        marginTop: 655,
        fontSize: 15,
        left: 50,
        color: 'black',
    },
    userOriginCountry: {
        position: 'absolute',
        marginTop: 675,
        fontSize: 15,
        left: 50,
        color: 'black',
    },
    whatsappLogo: {
        position: 'absolute',
        width: 50,
        height: 50,
        marginTop: 650,
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