import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ActivityScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={210} name="school-outline" style={styles.headerImage} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">About TeachApp</ThemedText>
      </ThemedView>
      <ThemedText style={styles.description}>
        TeachApp is a revolutionary platform that leverages the engaging concept of TikTok to make learning fun and interactive. Dive into short, educational videos that make absorbing information quick and enjoyable.
      </ThemedText>

      <Collapsible title="Engaging Content">
        <ThemedText>
          Our app features a continuous stream of short, educational videos designed to capture your attention and facilitate quick learning.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Cross-Platform Support">
        <ThemedText>
          TeachApp is available on Android, iOS, and the web, providing a seamless experience across all your devices.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Interactive Learning">
        <ThemedText>
          Interact with content through likes, comments, and shares. Participate in quizzes and challenges to reinforce your learning.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Customizable Experience">
        <ThemedText>
          Personalize your learning journey with customizable settings and a tailored content feed based on your interests and progress.
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
  },
  headerImage: {
    alignSelf: 'center',
    marginVertical: 20,
    color: '#fff',
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  description: {
    marginHorizontal: 20,
    marginVertical: 10,
    fontSize: 16,
  },
});
