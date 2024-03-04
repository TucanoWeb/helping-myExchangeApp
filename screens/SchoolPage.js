import React from 'react';
import { StyleSheet, View, Text, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const SchoolPage = () => {
  // Substitua isso pelo seu estado e lógica de comentários
  const comments = [
    { id: '1', name: 'Kristin Watson', comment: 'blablablablabla', rating: 4 },
    // ...outros comentários
  ];

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <Image source={require('../assets/profile.png')} style={styles.profilePic} />
      <View style={styles.commentText}>
        <Text style={styles.commentName}>{item.name}</Text>
        <Text>{item.comment}</Text>
      </View>
      <FontAwesome name="star" size={24} color="gold" />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.userDetails}>
        <Image source={require('../assets/flag.png')} style={styles.userImage} />
        <Text style={styles.rating}>4.5</Text>
        <Text style={styles.reviews}>273 Reviews</Text>
      </View>
      <Text style={styles.schoolTitle}>School</Text>
      <Text style={styles.location}>CITY, COUNTRY</Text>
      <View style={styles.actions}>
        <TouchableOpacity>
          <FontAwesome name="heart-o" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="phone" size={24} color="green" />
        </TouchableOpacity>
      </View>
      <View style={styles.commentSection}>
        <TextInput style={styles.commentInput} placeholder="Write a comment" />
        <FlatList
          data={comments}
          renderItem={renderComment}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#30FFAE',
  },
  userDetails: {
    alignItems: 'center',
    marginVertical: 20,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#cccccc',
  },
  rating: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'gold',
  },
  reviews: {
    color: 'grey',
  },
  schoolTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 10,
  },
  location: {
    color: 'grey',
    marginHorizontal: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  commentSection: {
    flex: 1,
    paddingHorizontal: 10,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentText: {
    flex: 1,
  },
  commentName: {
    fontWeight: 'bold',
  },
  // Adicione mais estilos conforme necessário
});

export default SchoolPage;
