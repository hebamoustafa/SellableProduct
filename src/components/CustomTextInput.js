import React, {PureComponent} from 'react';
import {Platform, View, Text, TextInput} from 'react-native';

export default class CustomTextInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={[styles.wrapper, this.props.style]}>
        <TextInput
          style={[styles.txtStyle, this.props.txtInputStyle]}
          onChangeText={(text) => this.props.callback(text)}
          value={this.props.value}
          placeholder={this.props.placeholder}
          keyboardType={this.props.keyboardType}
          editable={this.props.editable}
        />
        {this.props.percentage && <Text style={[styles.txtStyle, this.props.txtInputStyle]}>%</Text>}
      </View>
    );
  }
}

const styles = {
  wrapper: {
    padding: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#f0f1f3',
    borderColor: '#f0f1f3',
    borderWidth: 1,
    borderRadius: 10,
  },
  txtStyle: {
    fontSize: 16,
    padding: 0,
  },
};
