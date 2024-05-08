import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import BigArticleList from '../../components/article-list/BigArticleList'
import { TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { icons, COLORS } from '../../constants';
import { useRouter } from 'expo-router';

const SearchPage = () => {
  const router = useRouter()
  const route = useRoute();
  const { keyword } = route.params //This has compile error but can run without problem
  const [searchValue, setSearchValue] = useState('');
  const [articles, setArticles] = useState([]);

  const fetchArticlesByKeyword = async (keyword) => {
    // This is an empty function. Replace this with your actual data fetching logic.
    const data = [];
    setArticles(data);
  };

  const handleSearch = async () => {
    // Only navigate if searchValue is not empty
    if (searchValue.trim() !== '') {
      await fetchArticlesByKeyword(searchValue);
      router.replace("/search/" + searchValue);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchValue}
          onChangeText={text => setSearchValue(text)}
        />
        <TouchableOpacity onPress={handleSearch}>
          <icons.notification fill={COLORS.iconColor} />
        </TouchableOpacity>
      </View>
      <BigArticleList articles={articles} scrollEnabled={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    width: '70%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    margin: 10,
    shadowColor: COLORS.gray2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 100,
    elevation: 5,
  },

});

export default SearchPage;
