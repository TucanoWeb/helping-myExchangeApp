import React, { useState } from 'react';
import { View, Text, TextInput, Image, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../config/firebase';

const SearchPage = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [filterType, setFilterType] = useState('users'); // users, schools, airlines
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        let query = db.collection(filterType);

        if (filterType === 'users' && searchText !== '') {
            query = query.where('Name', '==', searchText);
            query = query.where('DateArrival', '==', searchText);
            query = query.where('Origin City', '==', searchText);
            query = query.where('Destination City', '==', searchText);
        }

        if (filterType === 'schools' && searchText !== '') {
            query = query.where('School', '==', searchText);
            query = query.where('City', '==', searchText);
            query = query.where('Country', '==', searchText);
        }
        
        if (filterType === 'airlines' && searchText !== '') {
            query = query.where('Airline', '==', searchText);
        }

        const querySnapshot = await query.get();
        const results = [];
        querySnapshot.forEach(doc => {
            const data = doc.data();
            results.push({
                id: doc.id,
                ...data,
            });
        });

        setSearchResults(results);
    };

    const renderUserItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('UserDetail', { userId: item.id })}>
            <View style={styles.user}>
                <Image source={require('../../assets/profile.png')} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
                <View>
                    <Text>{item.Name}</Text>
                    <Text>Origem: {item['Origin City']}</Text>
                    <Text>Destino: {item['Destination City']}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Search..."
                    value={searchText}
                    onChangeText={setSearchText}
                />
                <TouchableOpacity onPress={handleSearch}>
                    <Image source={require('../../assets/search.png')} style={styles.searchIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={filterType}
                    style={styles.pickerStyle}
                    onValueChange={(itemValue) => setFilterType(itemValue)}>
                    <Picker.Item label="Users" value="users" />
                    <Picker.Item label="Schools" value="schools" />
                    <Picker.Item label="Airlines" value="airlines" />
                </Picker>
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

const Footer = ({ navigation }) => {
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
        backgroundColor: '#30FFAE',
        paddingTop: 50, // Adicionado espaço no topo do contêiner
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%', // Defina a largura com base no tamanho desejado
    },
    pickerContainer: {
        width: '40%', // Alinha a largura do picker com a barra de busca
        marginTop: 10, // Adiciona um espaço entre a barra de busca e o picker
    },
    pickerStyle: {
        width: '100%', // Faz o picker ocupar toda a largura do contêiner
        height: 50,
        backgroundColor: '#fff',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5,
    },
    input: {
        flex: 1, // O input ocupa todo o espaço exceto o necessário para o ícone de busca
        height: 50,
        borderColor: '#2B8B5D',
        borderWidth: 2,
        borderRadius: 15,
        paddingLeft: 15,
        paddingRight: 50, // Adicionado espaço no final do input para o texto não sobrepor o ícone de busca
        fontSize: 15,
        backgroundColor: '#fff',
        marginRight: 10, // Espaço entre o input e o ícone de busca
    },
    searchIcon: {
        width: 30,
        height: 30,
        marginLeft: -50, // Posiciona o ícone de busca sobre o input
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
        backgroundColor: '#30ff91',
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