import React, { useState } from 'react';
import { View, Text, TextInput, Image, FlatList, TouchableOpacity } from 'react-native';

const SearchPage = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
        // Aqui você pode implementar a lógica de busca dos usuários com base no searchText
        // e atualizar os resultados na variável searchResults
        // Exemplo:
        const results = [
            {
                id: 1,
                name: 'John Doe',
                country: 'USA',
                destination: 'Brazil',
                image: require('../assets/profile.png'),
            },
            {
                id: 2,
                name: 'Jane Smith',
                country: 'Canada',
                destination: 'Spain',
                image: require('../assets/profile.png'),
            },
            // Adicione mais resultados aqui
        ];
        setSearchResults(results);
    };

    const renderUserItem = ({ item }) => (
        <View style={styles.user}>
            <Image source={item.image} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
            <View>
                <Text>{item.name}</Text>
                <Text>Origin: {item.country}</Text>
                <Text>Destination: {item.destination}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.viewsearch}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o nome do usuário"
                    value={searchText}
                    onChangeText={setSearchText}
                />
                <TouchableOpacity onPress={handleSearch}>
                    <Image source={require('../assets/search.png')} style={styles.search} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={searchResults}
                renderItem={renderUserItem}
                keyExtractor={(item) => item.id.toString()}
            />
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

            <View style={footerStyles.divider} />

            <TouchableOpacity onPress={handleSearchPage} style={footerStyles.footerItem}>
                <Text style={footerStyles.footerText}>Search</Text>
            </TouchableOpacity>

            <View style={footerStyles.divider} />

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
        backgroundColor:'#30FFAE',
    },
    input: {
        top: 80,
        width: 328,
        height: 43,
        borderColor: '#2B8B5D',
        borderWidth: 2,
        borderRadius: 5,
        marginBottom: 100,
        paddingLeft: 10,
        fontSize: 15,
        backgroundColor: '#fff',
    },
    search: {
        width: 20,
        height: 20,
        marginHorizontal: 5,
        top: 30,
    },
    viewsearch: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        width: 350,
        borderRadius: 10,
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
    divider: {
        width: 1,
        height: '70%',
        backgroundColor: 'white',
        opacity: 0.6,
    },
};

export default SearchPage;