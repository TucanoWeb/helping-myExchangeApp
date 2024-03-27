import React, { useState } from 'react';
import { View, Text, TextInput, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../config/firebase'; // Garanta que db esteja sendo importado corretamente conforme mostrado anteriormente
import { collection, query, where, getDocs } from 'firebase/firestore';

const SearchPage = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [filterType, setFilterType] = useState(query(collection(db, "users"))); // Pode ser 'users', 'schools', ou 'airlines'
    const [searchResults, setSearchResults] = useState([]);
    const [filter, setFilter] = useState([])

    // const [query, setQuery] = useState(query(collection(db, "users")))

    const handleSearch = async () => {
        if (searchText.trim() === '') {
            setSearchResults([]);
            return;
        }


    if(searchText !== ""){
        setFilter(searchResults.filter(fil => fil.toLowerCase().includes(searchText.toLowerCase())))
    }


    // const queryFunc = (key) => {
    //     setQuery(query(collection(db, key)))
    // }

        // let q = query(collection(db, "users"), where("Name", "==", searchText))

        // switch (filterType) {
        //     case 'users':
        //         q = query(collection(db, "users"), where("Name", "==", searchText));
        //         break;
        //     case 'schools':
        //         q = query(collection(db, "schools"), where("School", "==", searchText));
        //         break;
        //     case 'airlines':
        //         q = query(collection(db, "airlines"), where("Airline", "==", searchText));
        //         break;
        //     default:
        //         console.error('Filter type not supported');
        //         return;
        // }

        try {
            const querySnapshot = await getDocs(filterType);
            const results = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setSearchResults(results);
        } catch (error) {
            console.error("Error searching: ", error);
        }
    };

    const renderUserItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('UserHome', { userId: item.id })}>
            <View style={styles.user}>
                <Image
                    source={item.Photo ? { uri: item.Photo } : require('../../assets/profile.png')}
                    style={styles.imageStyle}
                />
                <View>
                    <Text>{item.Name}</Text>
                    {item['Origin_city'] && <Text>Origin: {item['Origin_city']}</Text>}
                    {item['Destination_city'] && <Text>Destination: {item['Destination_city']}</Text>}
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
                <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                    <Image source={require('../../assets/search.png')} style={styles.searchIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={filterType}
                    style={styles.pickerStyle}
                    onValueChange={(itemValue) => setFilterType(query(collection(db, itemValue)))}
                >
                    <Picker.Item label="Users" value="users" />
                    <Picker.Item label="Schools" value="schools" />
                    <Picker.Item label="Airlines" value="airlines" />
                </Picker>
            </View>
            <FlatList
                data={searchText === "" ? searchResults : filter}
                renderItem={renderUserItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <Footer navigation={navigation} />
        </View>
    );
};

const Footer = ({ navigation }) => {
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

// Adicionei o StyleSheet para organizar melhor os estilos.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#30FFAE',
        paddingTop: 50,
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
    },
    pickerContainer: {
        width: '40%',
        marginTop: 10,
    },
    pickerStyle: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5,
    },
    input: {
        flex: 1,
        height: 50,
        borderColor: '#2B8B5D',
        borderWidth: 2,
        borderRadius: 15,
        paddingLeft: 15,
        paddingRight: 50,
        fontSize: 15,
        backgroundColor: '#fff',
        marginRight: 10,
    },
    searchIcon: {
        position: 'absolute',
        width: 30,
        height: 30,
        right: 20,
        top: -15,
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
        width: 350,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
        top: 20,
    },
    imageStyle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
});

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