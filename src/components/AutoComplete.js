import React, {PureComponent} from 'react';
import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';

export default class AutoComplete extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      isVisible: false,
      selected_cat: null,
      category: '',
    };
  }

  renderItem = (item) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        key={item.id}
        onPress={() => this.selectCategory(item)}>
        <Text
          style={styles.txtItemStyle}
          onPress={() => this.selectCategory(item)}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  selectCategory = (item) => {
    this.setState({selected_cat: item, category: item.name, isVisible: false});
    this.input.blur();
    this.props.callback(item);
  };

  filterData = (text) => {
    if (text === undefined) {
      this.setState({data: this.props.data, isVisible: true});
    } else if (text.trim() === '') {
      this.setState({data: this.props.data, category: text, isVisible: true});
    } else {
      var newArr = [];
      this.props.data.forEach((element) => {
        if (element.name.indexOf(text.toLowerCase()) > -1) {
          newArr.push(element);
        }
      });
      if (newArr.length > 0) {
        this.setState({data: newArr, category: text, isVisible: true});
      } else {
        this.setState({category: text, isVisible: false});
      }
    }
  };

  render() {
    return (
      <View>
        <View style={[styles.txtContainer, this.props.style]}>
          <TextInput
            ref={(input) => {
              this.input = input;
            }}
            style={styles.txtStyle}
            onChangeText={(text) => this.filterData(text)}
            onTouchStart={() => this.filterData()}
            onBlur={() => this.setState({isVisible: false})}
            placeholder={this.props.placeholder}
            value={this.state.category}
          />
        </View>
        {this.state.isVisible && (
          <View style={styles.flatListContainer}>
            <FlatList
              data={this.state.data}
              renderItem={({item}) => this.renderItem(item)}
              keyExtractor={(item) => item.id}
              keyboardShouldPersistTaps='always'
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = {
  txtContainer: {
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#f0f1f3',
    borderColor: '#f0f1f3',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  txtStyle: {
    fontSize: 16,
    padding: 0,
  },
  flatListContainer: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.25,
    elevation: 1,
    borderColor: '#f0f1f3',
    borderWidth: 1,
  },
  itemContainer: {
    padding: 10,
  },
  txtItemStyle: {
    fontSize: 16,
  },
};
