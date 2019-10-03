import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Button
} from "react-native";
import Video from "react-native-video";
import Icon from "react-native-vector-icons/dist/Ionicons";
import { connect } from "react-redux";
import { autoSignIn } from "../../store/actions/user_actions";
import { getTokens, setTokens } from "../../utils/misc";

class GameArticleComponent extends Component {
  state = {
    loading: true,
    isAuth: true
  };

  manageState(loading, isAuth) {
    this.setState({
      loading,
      isAuth
    });
  }

  componentDidMount() {
    const User = this.props.User;

    getTokens(value => {
      if (value[0][1] === null) {
        this.manageState(false, false);
      } else {
        this.props.dispatch(autoSignIn(value[1][1])).then(() => {
          !User.auth.token
            ? this.manageState(false, false)
            : setTokens(User.auth, () => {
                this.manageState(false, true);
              });
        });
      }
    });
  }

  render() {
    const params = this.props.navigation.state.params;

    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <ScrollView style={{ backgroundColor: "#F0F0F0" }}>
          {this.state.isAuth ? (
            <View>
              <Video
                source={{ uri: params.play }}
                muted={false}
                controls={true}
                paused={true}
                style={{ width: "100%", height: 250 }}
              />
            </View>
          ) : (
            <View style={styles.notAuth}>
              <Icon name="md-sad" size={80} color="#d5d5d5" />
              <Text style={styles.noAuthText}>
                We are sorry, you need to be registered/ Logged in to see this
                game
              </Text>
              <Button
                title="Login/ Register"
                onPress={() => this.props.navigation.navigate("Auth")}
              />
            </View>
          )}
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  notAuth: {
    flex: 1,
    margin: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  noAuthText: {
    fontFamily: "Roboto-Light"
  }
});

function mapStateToProps(state) {
  return {
    User: state.User
  };
}

export default connect(mapStateToProps)(GameArticleComponent);

// Videos
//http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4
//http://testinrnative.ferdinandwolf.com/video.mp4
