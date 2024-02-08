import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const FavoritesPage = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Favorites Page</Text>
            {/* Add your favorite-related content here */}
            <Footer navigation={navigation} />
        </View>
    );
};

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

export default FavoritesPage;