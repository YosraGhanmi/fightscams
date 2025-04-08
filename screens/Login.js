
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {TouchableOpacity, Image } from 'react-native';
export default function Login({navigation}) {
  const GoHome = ()=>{
    navigation.navigate('Home');
  }
  const GoHomePage = ()=>{
    navigation.navigate('HomePage');
  }
  return (
    <View style={styles.container}>
      {/* Background with topography lines */}
      <View style={styles.topSection}>
        <View style={styles.topographyBackground} />
      </View>

      {/* Wave separator */}
      <View style={styles.waveSeparator} />

      {/* Bottom section with login options */}
      <View style={styles.bottomSection}>
        <Text style={styles.loginText}>Login</Text>

        {/* Google login button */}
        <TouchableOpacity style={styles.googleButton} onPress={GoHomePage}>
          
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Guest login button */}
        <TouchableOpacity style={styles.guestButton} onPress={GoHome}>
          <Text style={styles.guestButtonText}>Continue as guest</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSection: {
    height: '70%',
    backgroundColor: '#FF8475',
    position: 'relative',
    overflow: 'hidden',
  },
  topographyBackground: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1,
  },
  waveSeparator: {
    height: 50,
    backgroundColor: '#fff',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    marginTop: -50,
    zIndex: 10,
  },
  bottomSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  loginText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 16,
    justifyContent: 'center',
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  guestButton: {
    padding: 16,
    backgroundColor: '#FF8475',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});
