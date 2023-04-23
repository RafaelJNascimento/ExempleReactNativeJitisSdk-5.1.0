import React, { useState } from 'react';
import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import JitsiMeet, { JitsiMeetView } from '@vidit-me/react-native-jitsi-meet';

const ExempleReactNativeJitsiMeet = () => {

    const [joinMeeting, setJoinMeeting] = useState(false);
    const [room, setRoom] = useState('rafaelTesteJitsi');
    const [name, setName] = useState('rafael');
    const [email, setEmail] = useState('rafael@gmail.com');

    const startJitsiAsNativeController = async (controller) => {
        if (controller) {
            await JitsiMeet.launchJitsiMeetView({
                room,
                serverUrl: `https://meet.jit.si/${room}`,
                userInfo: {
                    name,
                    email
                },
                options: {
                    audioMuted: false,
                    audioOnly: false,
                    videoMuted: false
                },
                meetFeatureFlags: {
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
                },
            });
        }
    }

    const viewJitsi = () => <JitsiMeetView
        onConferenceTerminated={e => {
            console.log('terminou')
            setJoinMeeting(false)
        }}
        onConferenceJoined={() => {
            console.log('entrou')
        }}
        onConferenceWillJoin={() => {
            
        }}
        style={styles.container}
    />

    return (
        <SafeAreaView
            style={styles.containe}>
            <StatusBar
                animated={true}
                backgroundColor="#000"
                barStyle={'light-content'} />
            {
                !joinMeeting ?
                    <View style={styles.body}>
                        <View
                            style={{
                                flex: 1,
                                height: '100%',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <TextInput
                                style={styles.input}
                                onChangeText={setRoom}
                                placeholder={'insira o nome da sala'}
                                value={room}
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={setName}
                                placeholder={'insira seu nome'}
                                value={name}
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={setEmail}
                                placeholder={'insira seu email'}
                                value={email}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    setJoinMeeting(true);
                                    startJitsiAsNativeController(true);
                                }}
                                style={styles.button}>
                                <Text>Abrir chamada de vídeo</Text>
                            </TouchableOpacity>
                        </View>
                    </View> : viewJitsi()
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    containe: {
        flex: 1,
    },
    body: {
        flex: 1,
        backgroundColor: '#d3d3d3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: 180,
        borderWidth: 1,
        padding: 10,
        margin: 5,
    },
    button: {
        height: 40,
        width: 180,
        margin: 5,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
    }
});

export default ExempleReactNativeJitsiMeet;