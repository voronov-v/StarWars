import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
//@ts-ignore
import ZoomUs from 'react-native-zoom-us';

const zoomUserType = 2; // 2 - pro user
const config = {
  zoom: {
    appKey: 'U3nES2ReEHebuWZKkqiSTbpqVERto0w0UNfP', // TODO: appKey
    appSecret: 'xfeTzUfJndUbuNyr6VuUS6x3JuVH8SwC6Yvy', // TODO appSecret
    domain: 'zoom.us',
  },
};

export class GraphScreen extends Component {
  zakTokenRaw = ''; // TODO: meeting zak
  meetingNo = '451991324'; // TODO: meeting number

  async componentDidMount() {
    try {
      const initializeResult = await ZoomUs.initialize(
        config.zoom.appKey,
        config.zoom.appSecret,
        config.zoom.domain,
      );
      console.warn({ initializeResult });
    } catch (e) {
      console.warn({ e });
    }
  }

  async start() {
    const zakToken = decodeURIComponent(this.zakTokenRaw);
    const displayName = 'Test mentor';

    // TODO recieve user's details from zoom API? WOUT: webinar user is different
    const userId = 'null'; // NOTE: no need for userId when using zakToken
    const userType = zoomUserType;
    const zoomToken = 'null'; // NOTE: no need for userId when using zakToken

    const zoomAccessToken = zakToken;

    try {
      const startMeetingResult = await ZoomUs.startMeeting(
        displayName,
        this.meetingNo,
        userId,
        userType,
        zoomAccessToken,
        zoomToken,
      );
      console.warn({ startMeetingResult });
    } catch (e) {
      console.warn({ e });
    }
  }

  async join() {
    const displayName = 'Test student';

    try {
      const joinMeetingResult = await ZoomUs.joinMeeting(
        displayName,
        this.meetingNo,
      );
      console.warn({ joinMeetingResult });
    } catch (e) {
      console.warn({ e });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.start()}
          title="Start example meeting"
        />
        <Text>-------</Text>
        <Button
          onPress={() => this.join()}
          title="Join example meeting"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

// import React, { useRef } from 'react';
// import Video from 'react-native-video';
// import { StyleSheet, View, Text } from 'react-native';
//
// // Within your render function, assuming you have a file called
// // "background.mp4" in your project. You can include multiple videos
// // on a single screen if you like.
//
//
// export const GraphScreen = () => {
//   const player = useRef(null);
//
//   return (
//
//     <View>
//       <Video source={{ uri: 'background' }}   // Can be a URL or a local file.
//              ref={player}                                      // Store reference
//              onBuffer={() => {
//                return (
//                  <View>
//                    <Text>on buffer</Text>
//                  </View>
//                );
//              }}                // Callback when remote video is buffering
//              onError={() => {
//                return (
//                  <View>
//                    <Text>onError</Text>
//                  </View>
//                );
//              }}               // Callback when video cannot be loaded
//              style={styles.backgroundVideo}/>
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   backgroundVideo: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//   },
// });
