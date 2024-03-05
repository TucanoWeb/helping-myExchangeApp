import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';

const FavoritesPage = ({ navigation }) => {
  // Simulação de dados de usuários favoritos, substitua pela sua lógica de obtenção de dados do Firestore
  const [favorites, setFavorites] = useState([
    {
      id: '1',
      name: 'Alice Johnson',
      originCity: 'New York',
      destinationCity: 'Los Angeles',
      image: require('../assets/profile.png'), // Substitua pelo caminho do ícone de perfil
    },
    // Adicione mais usuários favoritos aqui
  ]);

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('UserHome', { userId: item.id })}>
      <View style={styles.user}>
        <Image source={item.image} style={styles.userImage} />
        <View>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userDetails}>Origem: {item.originCity}</Text>
          <Text style={styles.userDetails}>Destino: {item.destinationCity}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FAVORITES</Text>
      </View>
      <FlatList
        data={favorites}
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => item.id}
      />
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#30FFAE', // Adjust the color to match the provided image
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    backgroundColor: '#30FFAE', // Adjust the color to match the provided image
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    width: 350,
    borderRadius: 10,
    backgroundColor: '#30ff91',
    left: 25,
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    color: 'black',
    flex: 1,
    paddingHorizontal: 10,
  },
  userDetails: {
    color: 'black',
    paddingHorizontal: 10,
  },
  // Estilos adicionais conforme necessário
});

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

export default FavoritesPage;

/* import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const FavoritesPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FAVORITES</Text>
      </View>
      <UserSection />
      <Footer navigation={navigation} />
    </View>
  );
};

const UserSection = () => {
    return (
      <View style={styles.userSection}>
        <Image
          source={require('../assets/profile.png')} // Replace with your user icon image path
          style={styles.userIcon}
        />
        <Text style={styles.userName}>Name</Text>
        <TouchableOpacity>
          <Image
            source={require('../assets/flag.png')} // Replace with your add icon image path
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../assets/icon.png')} // Replace with your remove icon image path
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#30FFAE', // Adjust the color to match the provided image
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    backgroundColor: '#30FFAE', // Adjust the color to match the provided image
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#30ff91', // Adjust the color to match the provided image
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    fontSize: 18,
    color: 'black',
    flex: 1,
    paddingHorizontal: 10,
  },
  icon: {
    width: 30,
    height: 30,
  }
});

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

export default FavoritesPage; */