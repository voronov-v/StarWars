import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LoginButton } from 'react-native-fbsdk';

export class FBLoginButton extends Component {
  render() {
    return (
      <View>
        <LoginButton
          //@ts-ignore
          publishPermissions={['email']}
          onLoginFinished={(error, result) => {
            if (error) {
              //@ts-ignore
              console.log('Login failed with error: ' + error.message);
            } else if (result.isCancelled) {
              console.log('Login was cancelled');
            } else {
              console.log('Login was successful with permissions: ' + result.grantedPermissions);
            }
          }}
          onLogoutFinished={() => console.log('User logged out')}
        />
      </View>
    );
  }
}

export class FBScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Welcome to the Facebook SDK for React Native!</Text>
        <FBLoginButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  label: {
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: 48,
  },
});
