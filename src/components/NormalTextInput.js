import React, {PureComponent} from 'react';
import {Platform, View, Text, TextInput} from 'react-native';

export default class NormalTextInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <TextInput
          style={[styles.txtStyle, this.props.style]}
          onChangeText={(text) => this.props.callback(text)}
          value={this.props.title}
          placeholder={this.props.placeholder}
        />
      </View>
    );
  }
}

const styles = {
  wrapper: {
    padding: 2,
    borderBottomColor: '#d1d5da',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  txtStyle: {
    fontSize: 16,
    padding: 0,
  },
};
