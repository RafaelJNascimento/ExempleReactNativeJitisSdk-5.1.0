import React, { useEffect, useState } from 'react';
import JitsiMeet, { JitsiMeetView } from '@vidit-me/react-native-jitsi-meet';

import {
  View,
  Text,
  Modal,
  StatusBar,
  StyleSheet,
  BackHandler,
  ActivityIndicator,
} from 'react-native';

function App(props) {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    startJitsiAsNativeController()
  }, []);

  const startJitsiAsNativeController = async () => {

    const url = props.url; // can also be only room name and will connect to jitsi meet servers
    const userInfo = {
      displayName: 'Rafael José do Nascimento',
      email: 'eng.rafaeljosedonascimento@gmail.com',
      avatar: 'https:/gravatar.com/avatar/rafaeljosev10'
    };
    const options = {
      audioMuted: false,
      audioOnly: false,
      videoMuted: false,
      subject: "",
      token: ""
    }
    const meetFeatureFlags = {
      addPeopleEnabled: true,
      calendarEnabled: true,
      callIntegrationEnabled: true,
      chatEnabled: true,
      closeCaptionsEnabled: true,
      inviteEnabled: true,
      androidScreenSharingEnabled: true,
      liveStreamingEnabled: true,
      meetingNameEnabled: true,
      meetingPasswordEnabled: true,
      pipEnabled: true,
      kickOutEnabled: true,
      conferenceTimerEnabled: true,
      videoShareButtonEnabled: true,
      recordingEnabled: true,
      reactionsEnabled: true,
      raiseHandEnabled: true,
      tileViewEnabled: true,
      toolboxAlwaysVisible: false,
      toolboxEnabled: true,
      welcomePageEnabled: false,
    }

    await JitsiMeet.launchJitsiMeetView({
      room: 'rafaelTesteJitsi',
      serverUrl: url,
      userInfo,
      options,
      meetFeatureFlags,
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#000"
        barStyle={"light-content"} />
      {
        !isLoading && props.joinMeeting &&
        <JitsiMeetView
          onConferenceTerminated={e => {
              props.setJoinMeeting(false);
              setIsLoading(false);
          }
          }
          onConferenceJoined={() => setIsLoading(false)}
          onConferenceWillJoin={() => setIsLoading(true)}
          style={styles.container}
        />
      }
      <Modal
        animationType="fade"
        transparent={false}
        visible={isLoading && props.joinMeeting}
        onRequestClose={() => { }}>
        <View style={styles.containerLoading}>
          <View style={styles.boxWrapper}>
            <Text style={styles.textLoading}>
              {"esperando o servidor"}
            </Text>
            <ActivityIndicator color={'#000'} />
          </View>
        </View>
      </Modal>
    </View>
  )
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  boxWrapper: {
    flexDirection: 'row',
    height: 50,
    width: '80%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLoading: {
    flex: 1,
    backgroundColor: 'rgba(0, 0 , 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLoading: {
    color: '#000',
    fontSize: 16,
    marginRight: 10,
  },
})
