import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchCorrectAnswer } from '@/redux/reducers/correctAnswerSlice';
import * as Animatable from 'react-native-animatable';

interface Option {
  id: string;
  answer: string;
}

interface User {
  name: string;
  avatar: string;
}

interface Question {
  id: number;
  playlist: string;
  description: string;
  image: string;
  question: string;
  options: Option[];
  user: User;
}

interface MCQCardProps {
  question: Question;
}

const { width, height } = Dimensions.get('window');

const MCQCard: React.FC<MCQCardProps> = ({ question }) => {
  const dispatch = useDispatch<AppDispatch>();
  const correctOptions = useSelector((state: RootState) => state.correctAnswer.correctOptions);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleOptionClick = (optionId: string) => {
    setSelectedOption(optionId);
    dispatch(fetchCorrectAnswer(question.id)).then((result) => {
      const isCorrect = result.payload.some((option: Option) => option.id === optionId);
      setIsCorrect(isCorrect);
    });
  };

  const getOptionStyle = (optionId: string) => {
    if (selectedOption === optionId) {
      if (correctOptions.length === 0) {
        return styles.selectedOption;
      } else if (correctOptions.some((option) => option.id === optionId)) {
        return styles.correctOption;
      } else {
        return styles.incorrectOption;
      }
    }
    return styles.option;
  };

  return (
    <ImageBackground source={{ uri: question.image }} style={styles.card}>
      <View style={styles.overlay}>
        <Text style={styles.questionText}>{question.question}</Text>
        <View style={styles.optionsContainer}>
          {question.options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={getOptionStyle(option.id)}
              onPress={() => handleOptionClick(option.id)}
              disabled={selectedOption !== null}
            >
              <Text style={styles.optionText}>{option.answer}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.userText}>{question.user.name}</Text>
          <Text style={styles.descriptionText}>{question.description}</Text>
          <Text style={styles.playlistText}>{question.playlist}</Text>
        </View>
        <View style={styles.rightIcons}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: question.user.avatar }} style={styles.avatar} />
            <View style={styles.plusIcon}>
              <Ionicons name="add" size={16} color="#fff" />
            </View>
          </View>
          <TouchableOpacity style={styles.iconContainer}>
            <Ionicons name="heart-outline" size={30} color="#fff" />
            <Text style={styles.iconText}>87</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Ionicons name="chatbubble-outline" size={30} color="#fff" />
            <Text style={styles.iconText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Ionicons name="bookmark-outline" size={30} color="#fff" />
            <Text style={styles.iconText}>203</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Ionicons name="share-outline" size={30} color="#fff" />
            <Text style={styles.iconText}>17</Text>
          </TouchableOpacity>
        </View>
        {selectedOption && isCorrect !== null && (
          <Animatable.View
            animation="bounceIn"
            style={isCorrect ? styles.thumbUp : styles.thumbDown}
          >
            <Ionicons
              name={isCorrect ? 'thumbs-up' : 'thumbs-down'}
              size={60}
              color={isCorrect ? 'green' : 'red'}
            />
          </Animatable.View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    width,
    height,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'space-between',
    paddingBottom: 60,
  },
  questionText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 60,
  },
  optionsContainer: {
    marginTop: 20,
    alignItems: 'center',
    paddingRight: 65,
  },
  option: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    width: '90%',
  },
  selectedOption: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    width: '90%',
  },
  correctOption: {
    backgroundColor: 'rgba(0,255,0,0.7)',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    width: '90%',
  },
  incorrectOption: {
    backgroundColor: 'rgba(255,0,0,0.7)',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    width: '90%',
  },
  optionText: {
    color: '#000',
    fontSize: 18,
  },
  bottomContainer: {
    padding: 20,
  },
  userText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
  playlistText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
  rightIcons: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },
  plusIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#ff4500',
    borderRadius: 50,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  iconText: {
    color: '#fff',
    fontSize: 14,
  },
  thumbUp: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
    zIndex: 1,
  },
  thumbDown: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
    zIndex: 1,
  },
});

export default MCQCard;
