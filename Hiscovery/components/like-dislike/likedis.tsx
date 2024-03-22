import React, { useState } from 'react';
import { View, TouchableOpacity, Animated, Text, Image } from 'react-native';

const LikeDislikeComponent: React.FC = () => {
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [disliked, setDisliked] = useState<boolean>(false);
  const [dislikeCount, setDislikeCount] = useState<number>(0);
  const [scaleAnim] = useState<Animated.Value>(new Animated.Value(1));

  const handleLikePress = () => {
    setLiked(true);
    setDisliked(false);
    setLikeCount(likeCount + 1);
    animateButton();
  };

  const handleDislikePress = () => {
    setLiked(false);
    setDisliked(true);
    setDislikeCount(dislikeCount + 1);
    animateButton();
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.8, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start();
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity onPress={handleLikePress} activeOpacity={0.8}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Image source={ (liked? require('../../assets/icons/like_filled.png'): require('../../assets/icons/like_outline.png')) } style={{ width: 24, height: 24 }} />
        </Animated.View>
      </TouchableOpacity>
      <Text style={{ color: '#DF4771', marginHorizontal: 8 }}>{likeCount}</Text>
      <TouchableOpacity onPress={handleDislikePress} activeOpacity={0.8}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Image source={(disliked? require('../../assets/icons/dislike_filled.png'): require('../../assets/icons/dislike_outline.png')) } style={{ width: 24, height: 24 }} />
        </Animated.View>
      </TouchableOpacity>
      <Text style={{ color: '#DF4771', marginHorizontal: 8 }}>{dislikeCount}</Text>
    </View>
  );
};

export default LikeDislikeComponent;
