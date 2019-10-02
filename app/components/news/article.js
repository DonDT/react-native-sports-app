import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import Moment from "moment";

class ArticleComponent extends Component {
  formatText(content) {
    const text = content.replace(/<p>/g, "").replace(/<\/p>/g, "");
    return text;
  }

  render() {
    const params = this.props.navigation.state.params;

    return (
      <ScrollView style={{ backgroundColor: "#F0F0F0" }}>
        <Image
          style={{ height: 250 }}
          source={{ uri: params.image }}
          resizeMode="cover"
        />
        <View style={styles.articleContainer}>
          <View>
            <Text style={styles.articleTitle}>{params.title}</Text>
            <Text style={styles.articleData}>
              {params.team}- Posted at {Moment(params.date).format("d MMMM")}
            </Text>
          </View>
          <View style={styles.articleContent}>
            <Text style={styles.articleText}>
              {this.formatText(params.content)}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  articleContainer: {
    padding: 10
  },
  articleTitle: {
    fontSize: 23,
    color: "#323232",
    fontFamily: "Roboto-Bold"
  },
  articleData: {
    fontSize: 12,
    color: "#828282",
    fontFamily: "Roboto-Light"
  },
  articleContent: {
    marginTop: 30
  },
  articleText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Roboto-Light"
  }
});

export default ArticleComponent;
