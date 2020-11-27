import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Dimensions } from 'react-native';
import Data from './Data';
import { Transition, Transitioning } from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

const transition = (
  <Transition.Together>
    <Transition.In type='fade' durationMs={200} />
    <Transition.Change />
    <Transition.Out type='fade' durationMs={200} />
  </Transition.Together>
);

export default function App() {
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const ref = React.useRef();

  return (
    
    <Transition.View
      ref={ref}
      transition={transition}
      style={styles.container}
    >
      <LinearGradient
                colors={['#5E4ACF', '#1e1e1e','#5E4ACF']}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: Dimensions.get('window').height,
                  }}
            />
      
      
      <StatusBar hidden />
      {Data.map(({ bg, color, category, subCategories }, index) => {
        return (
          <TouchableOpacity
            key={category}
            onPress={() => {
              ref.current.animateNextTransition();
              setCurrentIndex(index === currentIndex ? null : index);
            }}
            style={styles.cardContainer}
            activeOpacity={0.9}
          >
            <View style={[styles.card, { backgroundColor: bg }]}>
              <Animatable.Text animation="zoomInUp" style={[styles.heading, { color }]}>{category}</Animatable.Text>
              {index === currentIndex && (
                <Animatable.View animation="zoomIn" style={styles.subCategoriesList}>
                  {subCategories.map((subCategory) => (
                    <Text key={subCategory} style={[styles.body, { color }]}>
                      {subCategory}
                    </Text>
                  ))}
                </Animatable.View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </Transition.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181C23',
    justifyContent: 'center',
    marginVertical: 10,
    
  },
  cardContainer: {
    flexGrow: 1,
    marginVertical: 10,
    marginHorizontal:10,
  },
  card: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#FFF',
    marginHorizontal: '6%',
    borderRadius: 30
  },
  heading: {
    fontSize: 25,
    fontWeight: '900',
    textTransform: 'uppercase',
    textAlign: 'center',
    letterSpacing: -2,
  },
  body: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    textAlign: 'center',
  },
  subCategoriesList: {
    marginTop: 20,
  },
});
